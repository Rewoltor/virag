import { createHash, randomBytes } from "node:crypto";
import { z } from "zod";
import { FieldValue, type Transaction } from "firebase-admin/firestore";
import { getDb } from "./firebase";
import { DELIVERY, LIMITS, SITE, TIERS, tierById, type TierId } from "./config";
import { availableDates, checkDeliveryDate, isManhattanZip } from "./delivery";
import { getStripe } from "./stripe";
import { notifyOwner } from "./telegram";
import { logEvent, type TrackContext } from "./track";

// ---------- Input schema (shared by JSON API, HTML form and MCP) ----------

export const orderInputSchema = z.object({
  tier: z.enum(["sweet", "romantic", "grand"]).describe("Which bouquet: sweet ($119), romantic ($229) or grand ($749). All prices include card, delivery and tax."),
  recipient_name: z.string().trim().min(1).max(80).describe("Full name of the person receiving the flowers."),
  recipient_phone: z.string().trim().min(7).max(25).describe("Recipient's US phone number. The courier calls it for building access."),
  address_line1: z.string().trim().min(3).max(120).describe("Street address in Manhattan, e.g. '245 E 19th St'."),
  address_line2: z.string().trim().max(60).optional().describe("Apartment, floor, company or suite."),
  zip: z.string().trim().describe("5-digit Manhattan ZIP code (10001–10282)."),
  delivery_date: z.string().trim().optional().describe("YYYY-MM-DD in New York time. Omit for the earliest available date."),
  card_message: z.string().trim().max(LIMITS.cardMessageMaxChars).default("").describe("Text handwritten on the card, max 300 characters."),
  sender_name: z.string().trim().min(1).max(60).describe("How the card is signed, e.g. 'Love, Daniel'."),
  buyer_email: z.string().trim().email().optional().describe("Buyer's email for the receipt and delivery confirmation."),
  delivery_instructions: z.string().trim().max(200).optional().describe("Doorman, buzzer code, 'leave with front desk', etc."),
  agent_name: z.string().trim().max(60).optional().describe("Optional: name of the AI agent/app placing the order (helps us support you)."),
  idempotency_key: z.string().trim().max(100).optional().describe("Optional: reuse the same key when retrying so the order is never created twice."),
});

export type OrderInput = z.infer<typeof orderInputSchema>;

export type OrderStatus = "reserving" | "awaiting_payment" | "paid" | "placed" | "delivered" | "expired" | "cancelled" | "refunded" | "failed";

export interface OrderDoc {
  id: string;
  status: OrderStatus;
  tier: TierId;
  amountUsd: number;
  recipient: { name: string; phone: string; address1: string; address2?: string; zip: string; instructions?: string };
  deliveryDate: string;
  cardMessage: string;
  senderName: string;
  buyerEmail?: string;
  agentName?: string;
  channel: string;
  agent: string;
  idempotencyKey?: string;
  stripeSessionId?: string;
  checkoutUrl?: string;
  expiresAtMs: number;
  createdAt?: unknown;
  paidAt?: unknown;
}

export type ApiError = {
  code: "invalid_request" | "outside_delivery_area" | "date_unavailable" | "date_full" | "sold_out" | "payment_provider_error" | "not_found";
  message: string;
  field?: string;
  available_dates?: string[];
  waitlist_url?: string;
};

export type CreateOrderResult =
  | { ok: true; order: PublicOrder; checkout_url: string; reused: boolean }
  | { ok: false; status: number; error: ApiError };

export interface PublicOrder {
  order_id: string;
  status: OrderStatus;
  tier: TierId;
  amount_usd: number;
  delivery_date: string;
  delivery_area: string;
  checkout_expires_at?: string;
}

const ACTIVE: OrderStatus[] = ["reserving", "awaiting_payment", "paid", "placed", "delivered"];
const ordersCol = () => getDb().collection("orders");

function newOrderId() {
  return "vg_" + randomBytes(9).toString("base64url");
}

export function toPublic(o: OrderDoc): PublicOrder {
  return {
    order_id: o.id,
    status: o.status,
    tier: o.tier,
    amount_usd: o.amountUsd,
    delivery_date: o.deliveryDate,
    delivery_area: DELIVERY.area,
    checkout_expires_at: o.status === "awaiting_payment" ? new Date(o.expiresAtMs).toISOString() : undefined,
  };
}

function normalizePhone(p: string): string | null {
  const digits = p.replace(/\D/g, "");
  const d = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return d.length === 10 ? `+1${d}` : null;
}

/** Orders that currently hold a slot: paid ones plus unexpired checkouts. */
function holdsSlot(o: OrderDoc, now: number) {
  if (o.status === "reserving" || o.status === "awaiting_payment") return o.expiresAtMs > now;
  return ACTIVE.includes(o.status);
}

async function activeOrders(tx?: Transaction): Promise<OrderDoc[]> {
  const q = ordersCol().where("status", "in", ACTIVE);
  const snap = tx ? await tx.get(q) : await q.get();
  return snap.docs.map((d) => d.data() as OrderDoc);
}

export async function capacity(now = Date.now()) {
  const held = (await activeOrders()).filter((o) => holdsSlot(o, now));
  const perDate: Record<string, number> = {};
  for (const o of held) perDate[o.deliveryDate] = (perDate[o.deliveryDate] || 0) + 1;
  const remaining = Math.max(0, LIMITS.maxPaidOrders - held.length);
  const dates = availableDates().filter((d) => (perDate[d] || 0) < LIMITS.maxOrdersPerDeliveryDate);
  return { remaining, soldOut: remaining === 0, availableDates: dates, perDate };
}

/** For pages: never fail rendering because the database is unreachable. */
export async function safeCapacity() {
  try {
    return await capacity();
  } catch (e) {
    console.error("[capacity] failed", e);
    return { remaining: LIMITS.maxPaidOrders, soldOut: false, availableDates: availableDates(), perDate: {} as Record<string, number> };
  }
}

export function validate(raw: unknown): { ok: true; input: OrderInput; phone: string; date: string } | { ok: false; status: number; error: ApiError } {
  const parsed = orderInputSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { ok: false, status: 400, error: { code: "invalid_request", message: `${issue.path.join(".")}: ${issue.message}`, field: String(issue.path[0] ?? "") } };
  }
  const input = parsed.data;
  if (!isManhattanZip(input.zip))
    return { ok: false, status: 422, error: { code: "outside_delivery_area", field: "zip", message: `We currently deliver only in Manhattan (ZIP ${DELIVERY.zipMin}–${DELIVERY.zipMax}). ${input.zip} is outside our area.` } };
  const phone = normalizePhone(input.recipient_phone);
  if (!phone) return { ok: false, status: 400, error: { code: "invalid_request", field: "recipient_phone", message: "recipient_phone must be a 10-digit US number." } };
  const date = checkDeliveryDate(input.delivery_date);
  if (!date.ok) return { ok: false, status: 422, error: { code: "date_unavailable", field: "delivery_date", message: date.error, available_dates: availableDates().slice(0, 7) } };
  return { ok: true, input, phone, date: date.date };
}

export async function createOrder(raw: unknown, ctx: TrackContext): Promise<CreateOrderResult> {
  const v = validate(raw);
  if (!v.ok) {
    await logEvent("order_rejected", ctx, { code: v.error.code, field: v.error.field, ...summarize(raw) });
    return v;
  }
  const { input, phone, date } = v;
  const tier = tierById(input.tier)!;
  const db = getDb();
  const now = Date.now();

  // Idempotency: same key → same order (and same checkout link while it is valid).
  const idemRef = input.idempotency_key
    ? db.collection("idempotency").doc(createHash("sha256").update(input.idempotency_key).digest("hex"))
    : null;
  if (idemRef) {
    const existing = await idemRef.get();
    if (existing.exists) {
      const o = (await ordersCol().doc(existing.data()!.orderId).get()).data() as OrderDoc | undefined;
      if (o && o.checkoutUrl && (o.status !== "awaiting_payment" || o.expiresAtMs > now)) {
        return { ok: true, order: toPublic(o), checkout_url: o.checkoutUrl, reused: true };
      }
    }
  }

  const id = newOrderId();
  const expiresAtMs = now + (LIMITS.checkoutMinutes + 1) * 60_000;
  const order: OrderDoc = {
    id,
    status: "reserving",
    tier: tier.id,
    amountUsd: tier.priceUsd,
    recipient: { name: input.recipient_name, phone, address1: input.address_line1, address2: input.address_line2 || undefined, zip: input.zip, instructions: input.delivery_instructions || undefined },
    deliveryDate: date,
    cardMessage: input.card_message,
    senderName: input.sender_name,
    buyerEmail: input.buyer_email,
    agentName: input.agent_name,
    channel: ctx.channel,
    agent: ctx.agent,
    idempotencyKey: input.idempotency_key,
    expiresAtMs,
  };

  // Reserve a slot atomically. The capacity doc serialises concurrent reservations.
  const capRef = db.collection("meta").doc("capacity");
  const reservation = await db.runTransaction(async (tx) => {
    await tx.get(capRef);
    const held = (await activeOrders(tx)).filter((o) => holdsSlot(o, now));
    if (held.length >= LIMITS.maxPaidOrders) return { ok: false as const, reason: "sold_out" as const };
    const sameDay = held.filter((o) => o.deliveryDate === date).length;
    if (sameDay >= LIMITS.maxOrdersPerDeliveryDate) return { ok: false as const, reason: "date_full" as const };
    tx.set(capRef, { updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    tx.set(ordersCol().doc(id), { ...order, createdAt: FieldValue.serverTimestamp() });
    if (idemRef) tx.set(idemRef, { orderId: id, createdAt: FieldValue.serverTimestamp() });
    return { ok: true as const };
  });

  if (!reservation.ok) {
    const cap = await capacity();
    if (reservation.reason === "sold_out") {
      await logEvent("order_blocked_sold_out", ctx, { tier: tier.id, amountUsd: tier.priceUsd, zip: input.zip, deliveryDate: date, agentName: input.agent_name });
      await notifyOwner(`🚫 Blocked (sold out): ${tier.name} $${tier.priceUsd} → ${input.zip} on ${date}\nvia ${ctx.channel} / ${input.agent_name || ctx.agent}`);
      return {
        ok: false,
        status: 409,
        error: { code: "sold_out", message: `This pilot is fully booked (${LIMITS.maxPaidOrders} orders). Join the waitlist and we will email you when we reopen.`, waitlist_url: `${SITE.url}/sold-out?tier=${tier.id}` },
      };
    }
    await logEvent("order_rejected", ctx, { code: "date_full", tier: tier.id, zip: input.zip, deliveryDate: date });
    return { ok: false, status: 409, error: { code: "date_full", field: "delivery_date", message: `${date} is fully booked. Choose another date.`, available_dates: cap.availableDates.slice(0, 7) } };
  }

  // Create the hosted Stripe Checkout session.
  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: SITE.currency,
            unit_amount: tier.priceUsd * 100,
            product_data: {
              name: `${SITE.name} ${tier.name} — ${tier.headline}`,
              description: `Delivery ${date} in Manhattan to ${input.recipient_name}. Handwritten card included.`,
            },
          },
        },
      ],
      customer_email: input.buyer_email,
      expires_at: Math.floor(expiresAtMs / 1000),
      client_reference_id: id,
      metadata: { order_id: id, tier: tier.id, delivery_date: date },
      payment_intent_data: { metadata: { order_id: id }, description: `Virág order ${id}` },
      success_url: `${SITE.url}/order/success?order_id=${id}`,
      cancel_url: `${SITE.url}/order/cancelled?order_id=${id}`,
    });
    await ordersCol().doc(id).update({ status: "awaiting_payment", stripeSessionId: session.id, checkoutUrl: session.url });
    order.status = "awaiting_payment";
    await logEvent("order_created", ctx, { orderId: id, tier: tier.id, amountUsd: tier.priceUsd, zip: input.zip, deliveryDate: date, agentName: input.agent_name });
    return { ok: true, order: toPublic(order), checkout_url: session.url!, reused: false };
  } catch (e) {
    console.error("[orders] stripe error", e);
    await ordersCol().doc(id).update({ status: "failed" });
    return { ok: false, status: 502, error: { code: "payment_provider_error", message: "Could not start checkout. Please retry in a minute." } };
  }
}

function summarize(raw: unknown) {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return { tier: typeof r.tier === "string" ? r.tier.slice(0, 20) : undefined, zip: typeof r.zip === "string" ? r.zip.slice(0, 10) : undefined };
}

export async function getOrder(id: string): Promise<OrderDoc | null> {
  if (!/^vg_[A-Za-z0-9_-]{8,20}$/.test(id)) return null;
  const snap = await ordersCol().doc(id).get();
  return snap.exists ? (snap.data() as OrderDoc) : null;
}

/** Called from the Stripe webhook. Idempotent. */
export async function markPaid(orderId: string, info: { amountTotal: number | null; email?: string | null }) {
  const ref = ordersCol().doc(orderId);
  const changed = await getDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return null;
    const o = snap.data() as OrderDoc;
    if (o.status === "paid" || o.status === "placed" || o.status === "delivered") return null;
    tx.update(ref, { status: "paid", paidAt: FieldValue.serverTimestamp(), buyerEmail: o.buyerEmail || info.email || undefined });
    return o;
  });
  if (!changed) return;
  const o = changed;
  const tier = tierById(o.tier)!;
  const ctx: TrackContext = { channel: o.channel as TrackContext["channel"], agent: o.agent, ua: "", ipHash: "" };
  await logEvent("checkout_completed", ctx, { orderId, tier: o.tier, amountUsd: (info.amountTotal ?? 0) / 100 });
  const cap = await capacity();
  await notifyOwner(
    [
      `💐 NEW ORDER ${orderId}`,
      `${tier.name} — $${(info.amountTotal ?? o.amountUsd * 100) / 100} PAID`,
      `Deliver: ${o.deliveryDate} (${DELIVERY.window})`,
      ``,
      `To: ${o.recipient.name}  ${o.recipient.phone}`,
      `${o.recipient.address1}${o.recipient.address2 ? ", " + o.recipient.address2 : ""}, New York, NY ${o.recipient.zip}`,
      o.recipient.instructions ? `Note: ${o.recipient.instructions}` : "",
      ``,
      `Card: "${o.cardMessage}"`,
      `Signed: ${o.senderName}`,
      ``,
      `Buyer: ${o.buyerEmail || info.email || "-"}`,
      `Via: ${o.channel} / ${o.agentName || o.agent}`,
      `Slots left: ${cap.remaining}/${LIMITS.maxPaidOrders}`,
      `Admin: ${SITE.url}/admin`,
    ]
      .filter((l) => l !== "")
      .join("\n"),
  );
}

export async function markExpired(orderId: string) {
  const ref = ordersCol().doc(orderId);
  await getDb().runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return;
    const o = snap.data() as OrderDoc;
    if (o.status === "awaiting_payment" || o.status === "reserving") tx.update(ref, { status: "expired" });
  });
  const o = await getOrder(orderId);
  if (o) await logEvent("checkout_expired", { channel: o.channel as TrackContext["channel"], agent: o.agent, ua: "", ipHash: "" }, { orderId, tier: o.tier });
}

export async function setStatus(orderId: string, status: OrderStatus) {
  await ordersCol().doc(orderId).update({ status, [`${status}At`]: FieldValue.serverTimestamp() });
}

export async function listOrders(limit = 100): Promise<OrderDoc[]> {
  const snap = await ordersCol().orderBy("createdAt", "desc").limit(limit).get();
  return snap.docs.map((d) => d.data() as OrderDoc);
}

export const tiersForApi = () =>
  TIERS.map((t) => ({
    id: t.id,
    name: t.name,
    price_usd: t.priceUsd,
    price_includes: "flowers, handwritten card, delivery, tax",
    headline: t.headline,
    description: t.description,
    includes: t.includes,
    best_for: t.bestFor,
    order_url: `${SITE.url}/order?tier=${t.id}`,
  }));
