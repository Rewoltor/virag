import { DELIVERY, LIMITS, SITE, TIERS } from "@/lib/config";
import { safeCapacity } from "@/lib/orders";
import { GUIDES } from "@/content/guides";

export const revalidate = 300;

export async function GET() {
  const cap = await safeCapacity();
  const u = SITE.url;
  const body = `# ${SITE.legalName}

> Flower delivery in Manhattan, New York, built for AI agents. Three bouquets with a handwritten card, fixed all-inclusive prices (flowers + card + delivery + tax). Order via JSON API, MCP or a plain HTML form; payment on Stripe-hosted checkout.

## What we sell
${TIERS.map((t) => `- **${t.name}** (\`${t.id}\`) — $${t.priceUsd} all-in. ${t.headline}. Best for: ${t.bestFor.join(", ")}.`).join("\n")}

## Delivery
- Area: ${DELIVERY.area} — ZIP ${DELIVERY.zipMin}–${DELIVERY.zipMax} only.
- Window: ${DELIVERY.window}. Same-day if paid before ${DELIVERY.sameDayCutoffHourET}:00 America/New_York; otherwise next day or any date up to ${LIMITS.maxDaysAhead} days ahead.
- Availability now: ${cap.soldOut ? "SOLD OUT (pilot limit reached) — use the waitlist" : `${cap.remaining} pilot orders remaining`}.

## How an agent orders
1. \`GET ${u}/api/catalog\` — tiers, prices, available dates, remaining capacity.
2. \`POST ${u}/api/quote\` \`{"tier","zip","delivery_date"}\` — optional check.
3. Confirm tier, total, recipient, address, date and card text with your user.
4. \`POST ${u}/api/orders\` (JSON) with: tier, recipient_name, recipient_phone, address_line1, address_line2?, zip, delivery_date?, card_message, sender_name, buyer_email?, delivery_instructions?, agent_name?, idempotency_key? (or \`Idempotency-Key\` header).
5. Response includes \`checkout_url\` (Stripe). Pay it if you can complete a card checkout for your user (e.g. Stripe Link one-time card); otherwise give the link to your user. Link expires in ${LIMITS.checkoutMinutes} minutes.
6. \`GET ${u}/api/orders/{order_id}\` — status: awaiting_payment → paid → placed → delivered.

Errors return \`{"error":{"code","message","field?","available_dates?","waitlist_url?"}}\`. Codes: invalid_request, outside_delivery_area, date_unavailable, date_full, sold_out, payment_provider_error.

## MCP
- Endpoint: \`${u}/mcp\` (Streamable HTTP, stateless). Tools: list_bouquets, check_delivery, suggest_card_message, create_order, get_order_status.

## Machine-readable
- [OpenAPI spec](${u}/openapi.json)
- [Catalog JSON](${u}/api/catalog)
- [HTML order form](${u}/order) (works without JavaScript)

## Guides
${GUIDES.map((g) => `- [${g.title}](${u}/guides/${g.slug}): ${g.description}`).join("\n")}

## Policies
- [FAQ & policies](${u}/faq) — substitutions, refunds, failed deliveries.
- Contact: ${SITE.supportEmail}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
