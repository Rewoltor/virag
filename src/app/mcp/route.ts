import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { DELIVERY, LIMITS, SITE, TIERS, tierById } from "@/lib/config";
import { capacity, createOrder, getOrder, orderInputSchema, tiersForApi, toPublic } from "@/lib/orders";
import { applyTierZipRule, checkDeliveryDate, earliestDeliveryDate, isManhattanZip } from "@/lib/delivery";
import { contextFromRequest, logEvent, type TrackContext } from "@/lib/track";
import { CARD_MESSAGES, OCCASIONS } from "@/content/cards";

export const dynamic = "force-dynamic";

const text = (data: unknown) => ({ content: [{ type: "text" as const, text: typeof data === "string" ? data : JSON.stringify(data, null, 2) }] });

function buildHandler(ctx: TrackContext) {
  const track = (tool: string, extra: Record<string, unknown> = {}) => logEvent("mcp_tool_call", ctx, { tool, ...extra });

  return createMcpHandler(
    (server) => {
      server.registerTool(
        "list_bouquets",
        {
          title: "List flower bouquets",
          annotations: { title: "List flower bouquets", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
          description:
            `List the ${TIERS.length} flower bouquets Virág delivers in Manhattan, NYC (${TIERS.map((t) => `${t.name} $${t.priceUsd}`).join(", ")}). Each is a best seller from a New York florist. Prices include flowers, a card with the user's message, delivery and tax. Also returns delivery rules and how many pilot orders remain.`,
          inputSchema: z.object({}),
        },
        async () => {
          const cap = await capacity();
          await track("list_bouquets");
          return text({
            tiers: tiersForApi(),
            delivery: { area: DELIVERY.area, zip_range: `${DELIVERY.zipMin}-${DELIVERY.zipMax}`, window: DELIVERY.window, earliest_date: earliestDeliveryDate(), same_day_cutoff: `${DELIVERY.sameDayCutoffHourET}:00 America/New_York` },
            availability: { sold_out: cap.soldOut, orders_remaining: cap.remaining, available_dates: cap.availableDates.slice(0, 14) },
            guidance:
              "Pick a tier from the user's budget and occasion. Under $100 or a small thank-you/host gift → petite; around $120 → sweet; mom, birthday or a handwritten card in a ready-to-display arrangement → classic; anniversary/apology/romance → romantic; proposal or big gesture → grand. Petite and sweet arrive gift-boxed (no vase) with a printed card. Confirm the total with the user before create_order.",
          });
        },
      );

      server.registerTool(
        "check_delivery",
        {
          title: "Check delivery availability",
          annotations: { title: "Check delivery availability", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
          description: "Check if a bouquet can be delivered to a ZIP code on a date. Pass the tier: petite and sweet go same-day only below 125th St. Use before create_order.",
          inputSchema: z.object({
            tier: z.enum(TIERS.map((t) => t.id) as [string, ...string[]]).optional().describe("Bouquet id, e.g. sweet"),
            zip: z.string().describe("5-digit ZIP code of the recipient"),
            delivery_date: z.string().optional().describe("YYYY-MM-DD (New York time). Omit for earliest."),
          }),
        },
        async ({ tier, zip, delivery_date }) => {
          const cap = await capacity();
          const checked = checkDeliveryDate(delivery_date);
          const t = tier ? tierById(tier) : undefined;
          const date = checked.ok && t ? applyTierZipRule(t, zip, checked.date, !!delivery_date) : checked;
          const problems: string[] = [];
          if (!isManhattanZip(zip)) problems.push(`ZIP ${zip} is outside our delivery area (Manhattan only, ${DELIVERY.zipMin}-${DELIVERY.zipMax}).`);
          if (!date.ok) problems.push(date.error);
          else if (!cap.availableDates.includes(date.date)) problems.push(`${date.date} is fully booked.`);
          if (cap.soldOut) problems.push(`Sold out: the pilot is limited to ${LIMITS.maxPaidOrders} orders. Waitlist: ${SITE.url}/sold-out`);
          await track("check_delivery", { zip: zip.slice(0, 10), ok: problems.length === 0 });
          return text({ deliverable: problems.length === 0, problems, delivery_date: date.ok ? date.date : undefined, alternative_dates: cap.availableDates.slice(0, 7) });
        },
      );

      server.registerTool(
        "suggest_card_message",
        {
          title: "Suggest card messages",
          annotations: { title: "Suggest card messages", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
          description: `Get ready-made messages for the card. Occasions: ${OCCASIONS.join(", ")}. Personalize one with details the user shared before ordering.`,
          inputSchema: z.object({ occasion: z.enum(OCCASIONS as [string, ...string[]]).describe("Occasion key") }),
        },
        async ({ occasion }) => {
          await track("suggest_card_message", { occasion });
          return text(CARD_MESSAGES[occasion]);
        },
      );

      server.registerTool(
        "create_order",
        {
          title: "Create a flower order",
          annotations: { title: "Create a flower order", readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
          description:
            "Create an order and get a secure Stripe checkout_url. The order is confirmed only after payment at checkout_url (pay it yourself if you are able to complete a card checkout for your user, otherwise give the link to your user). Always confirm tier, total price, recipient, address, date and card text with the user first. Reuse idempotency_key on retries.",
          inputSchema: orderInputSchema,
        },
        async (input) => {
          const r = await createOrder(input, ctx);
          await track("create_order", { ok: r.ok, code: r.ok ? undefined : r.error.code });
          if (!r.ok) return { ...text({ error: r.error }), isError: true };
          return text({
            ...r.order,
            checkout_url: r.checkout_url,
            next_step: `Pay $${tierById(r.order.tier)!.priceUsd} at checkout_url before ${r.order.checkout_expires_at}. After payment, call get_order_status to confirm status 'paid'.`,
          });
        },
      );

      server.registerTool(
        "get_order_status",
        {
          title: "Get order status",
          annotations: { title: "Get order status", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
          description: "Status of an order: awaiting_payment, paid, placed (sent to florist), delivered, expired, refunded.",
          inputSchema: z.object({ order_id: z.string().describe("The order_id returned by create_order (starts with vg_)") }),
        },
        async ({ order_id }) => {
          const o = await getOrder(order_id);
          await track("get_order_status", { found: !!o });
          if (!o) return { ...text({ error: { code: "not_found", message: "No order with that id." } }), isError: true };
          return text(toPublic(o));
        },
      );
    },
    {
      serverInfo: { name: "virag-flowers", version: "1.0.0" },
      instructions:
        "Virág delivers best-selling flower bouquets with a card message in Manhattan, New York (five tiers, $89–$749 all-in). Typical flow: list_bouquets → check_delivery → suggest_card_message (optional) → confirm with user → create_order → user pays at checkout_url → get_order_status.",
    },
  );
}

async function handle(req: Request) {
  const ctx = contextFromRequest(req, "/mcp");
  return buildHandler(ctx)(req);
}

export { handle as GET, handle as POST, handle as DELETE };
