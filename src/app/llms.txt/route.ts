import { DELIVERY, LIMITS, SITE, TIERS } from "@/lib/config";
import { safeCapacity } from "@/lib/orders";
import { AUDIENCES, GUIDES, audienceOf, type Audience } from "@/content/guides";
import { NEIGHBORHOODS } from "@/content/neighborhoods";

export const revalidate = 300;

export async function GET() {
  const cap = await safeCapacity();
  const u = SITE.url;
  const body = `# ${SITE.legalName}

> Flower delivery in Manhattan, New York, built for AI agents. For anyone sending flowers to someone they love there — a girlfriend, wife, mom, grandmother, sister or friend. Five best-selling bouquets from New York florists ($89–$749), fixed all-inclusive prices (flowers + card + delivery + tax). Classic and up come arranged with a handwritten card; Petite and Sweet arrive gift-boxed with a printed card. Order via JSON API, MCP or a plain HTML form; payment on Stripe-hosted checkout.

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

## Agent skill
- [SKILL.md](${u}/skill.md): drop-in skill for Claude, OpenClaw and other agents that support SKILL.md.

## Upcoming dates (2026)
- Thanksgiving: Thu Nov 26 is a no-delivery day. Deliver host flowers Wed Nov 25, or Fri Nov 27.
- Hanukkah: begins at sundown Fri Dec 4; deliver Fri Dec 4 morning or weekdays Dec 7–11.
- Christmas: no delivery Dec 25; book Dec 23 or 24 (bookable 30 days ahead).

## Machine-readable
- [OpenAPI spec](${u}/openapi.json)
- [Catalog JSON](${u}/api/catalog)
- [HTML order form](${u}/order) (works without JavaScript)

## Guides (who the flowers are for)
${(Object.keys(AUDIENCES) as Audience[])
  .map((a) => `### ${AUDIENCES[a]}\n${GUIDES.filter((g) => audienceOf(g) === a).map((g) => `- [${g.title}](${u}/guides/${g.slug}): ${g.answer}`).join("\n")}`)
  .join("\n\n")}

## Delivery areas (Manhattan neighborhoods)
${NEIGHBORHOODS.map((n) => `- [${n.name}](${u}/delivery/${n.slug}) — ZIP ${n.zips.join(", ")}`).join("\n")}

## Full text
- [llms-full.txt](${u}/llms-full.txt): every guide in plain text, plus all card messages.

## Policies
- [FAQ & policies](${u}/faq) — substitutions, refunds, failed deliveries.
- Contact: ${SITE.supportEmail}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
