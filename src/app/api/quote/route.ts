import { after } from "next/server";
import { DELIVERY, LIMITS, SITE, tierById } from "@/lib/config";
import { capacity } from "@/lib/orders";
import { checkDeliveryDate, isManhattanZip } from "@/lib/delivery";
import { contextFromRequest, logEvent } from "@/lib/track";
import { json, preflight, readBody } from "@/lib/http";

export const dynamic = "force-dynamic";

/** Check whether we can deliver a tier to a ZIP on a date. No side effects besides logging. */
export async function POST(req: Request) {
  const body = await readBody(req);
  return json(await quote(body, req), 200);
}

export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  return json(await quote(Object.fromEntries(p.entries()), req), 200);
}

async function quote(body: Record<string, unknown>, req: Request) {
  const tier = tierById(String(body.tier || ""));
  const zip = String(body.zip || "");
  const date = checkDeliveryDate(body.delivery_date ? String(body.delivery_date) : undefined);
  const cap = await capacity();
  const problems: string[] = [];
  if (!tier) problems.push("tier must be one of: sweet, romantic, grand");
  if (!isManhattanZip(zip)) problems.push(`zip ${zip || "(missing)"} is outside our delivery area (${DELIVERY.area}, ZIP ${DELIVERY.zipMin}-${DELIVERY.zipMax})`);
  if (!date.ok) problems.push(date.error);
  else if (!cap.availableDates.includes(date.date)) problems.push(`${date.date} is fully booked`);
  if (cap.soldOut) problems.push(`sold out: pilot limited to ${LIMITS.maxPaidOrders} orders; waitlist at ${SITE.url}/sold-out`);

  const ctx = contextFromRequest(req);
  after(() => logEvent("quote", ctx, { tier: tier?.id, zip: zip.slice(0, 10), ok: problems.length === 0 }));

  return {
    deliverable: problems.length === 0,
    problems,
    tier: tier?.id,
    total_usd: tier?.priceUsd,
    total_includes: "flowers, handwritten card, delivery, tax",
    delivery_date: date.ok ? date.date : undefined,
    alternative_dates: cap.availableDates.slice(0, 7),
    next_step: problems.length === 0 ? `POST ${SITE.url}/api/orders` : undefined,
  };
}

export const OPTIONS = preflight;
