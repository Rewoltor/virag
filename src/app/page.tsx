import Link from "next/link";
import { DELIVERY, LIMITS, TIERS } from "@/lib/config";
import { safeCapacity } from "@/lib/orders";
import { businessSchema, faqSchema, productSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { TierCards } from "@/components/TierCards";
import { GUIDES } from "@/content/guides";

export const revalidate = 60;

const HOME_FAQ = [
  { q: "Where do you deliver?", a: `Anywhere in Manhattan, New York (ZIP ${DELIVERY.zipMin}–${DELIVERY.zipMax}), between ${DELIVERY.window}.` },
  { q: "Can I get same-day delivery?", a: `Yes — order and pay before ${DELIVERY.sameDayCutoffHourET}:00 New York time. After that, the earliest delivery is the next day.` },
  { q: "What does the price include?", a: "Fresh flowers, a handwritten card with your message, delivery in Manhattan and tax. No extra fees at checkout." },
  { q: "Can my AI assistant order for me?", a: "Yes. Agents can use our JSON API (/api/orders), our MCP server (/mcp) or the plain HTML order form. Payment is on Stripe's hosted checkout." },
];

export default async function Home() {
  const cap = await safeCapacity();
  return (
    <main>
      <JsonLd data={businessSchema()} />
      {TIERS.map((t) => (
        <JsonLd key={t.id} data={productSchema(t, cap.soldOut)} />
      ))}
      <JsonLd data={faqSchema(HOME_FAQ)} />
      <div className="wrap">
        <span className="pill">Manhattan · same-day before 11:00 ET</span>
        <h1>Flowers for her, handled.</h1>
        <p className="lede">
          Three beautiful bouquets with a handwritten card, delivered anywhere in Manhattan. One price, everything included. Order in a minute — or tell your AI assistant
          to do it.
        </p>
        <p className="answer">
          <strong>Quick pick:</strong> just because or a bad week → <a href="#sweet">Sweet $119</a>. Birthday, anniversary or an apology →{" "}
          <a href="#romantic">Romantic $229</a>. Proposal or a gesture she&apos;ll never forget → <a href="#grand">Grand Gesture $749</a>.
        </p>
        {cap.soldOut ? (
          <p className="notice error">
            Our pilot is fully booked ({LIMITS.maxPaidOrders} orders). <Link href="/sold-out">Join the waitlist</Link> and we&apos;ll email you when we reopen.
          </p>
        ) : (
          <p className="small muted">
            Pilot program: only {cap.remaining} of {LIMITS.maxPaidOrders} orders left. Earliest delivery: {cap.availableDates[0]}.
          </p>
        )}

        <h2>Choose a bouquet</h2>
        <TierCards soldOut={cap.soldOut} />

        <h2>How it works</h2>
        <ol>
          <li>Pick a bouquet and tell us who it&apos;s for, where, when and what the card should say.</li>
          <li>Pay securely on Stripe (card, Apple Pay, Google Pay).</li>
          <li>A Manhattan florist arranges it fresh, writes your card by hand and delivers it between {DELIVERY.window}.</li>
        </ol>

        <h2>Let your AI assistant order</h2>
        <p>
          Built for agents: fixed all-in prices, a <a href="/api/catalog">JSON catalog</a>, an ordering API with idempotency, an MCP server at <code>/mcp</code>, and{" "}
          <a href="/llms.txt">llms.txt</a>. Your assistant gets a secure checkout link — you approve and pay. <Link href="/guides/ask-your-ai-assistant-to-send-flowers">How it works →</Link>
        </p>

        <h2>Not sure what to send?</h2>
        <ul>
          {GUIDES.slice(0, 8).map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`}>{g.title}</Link>
            </li>
          ))}
        </ul>
        <p>
          <Link href="/guides">All guides →</Link>
        </p>

        <h2>Questions</h2>
        {HOME_FAQ.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p className="muted">{f.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
