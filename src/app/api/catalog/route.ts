import { after } from "next/server";
import { DELIVERY, LIMITS, SITE } from "@/lib/config";
import { capacity, tiersForApi } from "@/lib/orders";
import { contextFromRequest, logEvent } from "@/lib/track";
import { json, preflight } from "@/lib/http";
import { earliestDeliveryDate } from "@/lib/delivery";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const cap = await capacity();
  const ctx = contextFromRequest(req);
  after(() => logEvent("catalog_fetch", ctx, { remaining: cap.remaining }));
  return json({
    merchant: SITE.legalName,
    what_we_sell: "Fresh flower bouquets with a handwritten card, delivered in Manhattan, New York.",
    currency: "USD",
    prices_are_all_inclusive: true,
    tiers: tiersForApi(),
    delivery: {
      area: DELIVERY.area,
      zip_range: `${DELIVERY.zipMin}-${DELIVERY.zipMax}`,
      window: DELIVERY.window,
      same_day_cutoff: `${DELIVERY.sameDayCutoffHourET}:00 America/New_York`,
      earliest_date: earliestDeliveryDate(),
      available_dates: cap.availableDates.slice(0, 14),
    },
    availability: {
      sold_out: cap.soldOut,
      orders_remaining: cap.remaining,
      note: `Pilot program limited to ${LIMITS.maxPaidOrders} orders and ${LIMITS.maxOrdersPerDeliveryDate} deliveries per day.`,
    },
    how_to_order: {
      api: `POST ${SITE.url}/api/orders (JSON) → returns checkout_url. Open it to pay (Stripe), or give it to your user.`,
      mcp: `${SITE.url}/mcp (Streamable HTTP) — tools: list_bouquets, check_delivery, create_order, get_order_status, suggest_card_message`,
      web_form: `${SITE.url}/order`,
      openapi: `${SITE.url}/openapi.json`,
    },
    policies: `${SITE.url}/faq`,
  });
}

export const OPTIONS = preflight;
