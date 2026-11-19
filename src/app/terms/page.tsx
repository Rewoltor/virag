import type { Metadata } from "next";
import { SITE } from "@/lib/config";

export const metadata: Metadata = { title: "Terms", robots: { index: false } };

export default function Terms() {
  return (
    <main>
      <div className="wrap narrow">
        <h1>Terms (pilot)</h1>
        <p className="muted">Draft terms for the Virág pilot. To be replaced with reviewed terms before scaling.</p>
        <ol>
          <li>Virág arranges delivery of flower bouquets in Manhattan, New York through partner florists.</li>
          <li>Prices are in USD and include flowers, card, delivery and tax. Payment is taken by Stripe at checkout.</li>
          <li>Flowers are natural and seasonal; substitutions of equal or greater value in the same style may occur.</li>
          <li>Orders can be cancelled for a full refund until they are sent to the florist. Failed or damaged deliveries are refunded in full.</li>
          <li>Orders placed by AI agents are made on behalf of the person who pays at checkout; that person is the customer.</li>
          <li>Recipient details are used only to fulfil the order.</li>
          <li>
            Contact: <a href={`mailto:${SITE.supportEmail}`}>{SITE.supportEmail}</a>
          </li>
        </ol>
      </div>
    </main>
  );
}
