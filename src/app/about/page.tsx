import type { Metadata } from "next";
import Link from "next/link";
import { DELIVERY, LIMITS, SITE, TIERS } from "@/lib/config";
import { JsonLd } from "@/components/JsonLd";
import { businessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Virág: a Manhattan flower delivery pilot",
  description: "Who runs Virág, how orders are fulfilled by Manhattan florists, what the pilot limits are, and how to reach us.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main>
      <JsonLd data={businessSchema()} />
      <article className="wrap narrow">
        <h1>About Virág</h1>
        <p className="answer">
          Virág (Hungarian for &quot;flower&quot;) is a small pilot that sells five best-selling flower bouquets from New York florists for delivery in Manhattan, with fixed all-in prices and a card with your message. It is built so
          that AI assistants can order as easily as people can. Last updated 2026-11-19.
        </p>

        <h2>How an order works</h2>
        <ol>
          <li>You (or your AI assistant) choose a bouquet, a date and a card message, and pay on Stripe&apos;s hosted checkout.</li>
          <li>We place your order with a partner florist in Manhattan, who arranges it fresh and writes your card by hand.</li>
          <li>The florist delivers it between {DELIVERY.window}. We confirm by email and handle any problem personally.</li>
        </ol>

        <h2>Prices at a glance</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Bouquet</th>
                <th>Price (all-in)</th>
                <th>What you get</th>
                <th>Best for</th>
              </tr>
            </thead>
            <tbody>
              {TIERS.map((t) => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>${t.priceUsd}</td>
                  <td>{t.headline}</td>
                  <td>{t.bestFor.slice(0, 3).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Pilot limits</h2>
        <p>
          This is a demand test. We accept at most {LIMITS.maxPaidOrders} orders in total and {LIMITS.maxOrdersPerDeliveryDate} deliveries per day, in Manhattan only (ZIP {DELIVERY.zipMin}–{DELIVERY.zipMax}).
          When the limit is reached, the site stays online and you can join the waitlist.
        </p>

        <h2>Contact</h2>
        <p>
          <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a> · <Link href="/faq">FAQ and policies</Link> · <Link href="/terms">Terms</Link> · <a href="/llms.txt">llms.txt</a>
        </p>
      </article>
    </main>
  );
}
