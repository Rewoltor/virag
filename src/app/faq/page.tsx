import type { Metadata } from "next";
import { DELIVERY, LIMITS, SITE } from "@/lib/config";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "FAQ & policies",
  description: "Delivery area, same-day cutoff, substitutions, refunds and how AI agents can order from Virág.",
};

const FAQ = [
  { q: "Where do you deliver?", a: `Manhattan only, ZIP codes ${DELIVERY.zipMin}–${DELIVERY.zipMax}, including Roosevelt Island.` },
  { q: "When will the flowers arrive?", a: `On the date you choose, between ${DELIVERY.window}. Same-day delivery is available if you pay before ${DELIVERY.sameDayCutoffHourET}:00 New York time.` },
  { q: "What's included in the price?", a: "Flowers, a handwritten card with your message, delivery in Manhattan and tax. No extra fees." },
  { q: "Will the bouquet look exactly like the description?", a: "Flowers are seasonal and arranged fresh by hand, so exact stems vary. The florist may substitute flowers of equal or greater value in the same style and palette. Roses tiers are always roses." },
  { q: "What if she isn't home?", a: "The courier calls the recipient. With a doorman or front desk, flowers are left there. Otherwise we reattempt or contact you." },
  { q: "Can I cancel?", a: "Yes, for a full refund until the order has been sent to the florist (usually the morning of delivery). Email us with your order id." },
  { q: "What if something goes wrong?", a: "If the flowers arrive damaged, late by more than a day, or not at all, we refund you in full. Email us with your order id." },
  { q: "Why is there an order limit?", a: `This is a pilot. We cap it at ${LIMITS.maxPaidOrders} orders and ${LIMITS.maxOrdersPerDeliveryDate} deliveries per day so every order is handled personally.` },
  { q: "How do AI agents order?", a: "Via the JSON API (POST /api/orders), the MCP server (/mcp) or the HTML form at /order. Each order returns a Stripe-hosted checkout link. Agents never send card data to us." },
  { q: "How do you handle my data?", a: "We use recipient details only to deliver the order. Payments are processed by Stripe; we never see full card numbers." },
];

export default function Faq() {
  return (
    <main>
      <JsonLd data={faqSchema(FAQ)} />
      <div className="wrap narrow">
        <h1>FAQ & policies</h1>
        {FAQ.map((f) => (
          <section key={f.q}>
            <h3 style={{ marginTop: 24 }}>{f.q}</h3>
            <p className="muted">{f.a}</p>
          </section>
        ))}
        <p>
          Questions: <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
        </p>
      </div>
    </main>
  );
}
