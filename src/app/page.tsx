import Image from "next/image";
import Link from "next/link";
import { DELIVERY, LIMITS, TIERS } from "@/lib/config";
import { safeCapacity } from "@/lib/orders";
import { businessSchema, faqSchema, productSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, TierCards } from "@/components/TierCards";
import { AskAI } from "@/components/AskAI";
import { GUIDES } from "@/content/guides";
import { IMAGES } from "@/content/images";

export const revalidate = 60;

const HOME_FAQ = [
  { q: "Where do you deliver?", a: `Anywhere in Manhattan, New York (ZIP ${DELIVERY.zipMin}–${DELIVERY.zipMax}), between ${DELIVERY.window}.` },
  { q: "Can I get same-day delivery?", a: `Yes — order and pay before ${DELIVERY.sameDayCutoffHourET}:00 New York time. After that, the earliest delivery is the next day.` },
  { q: "What does the price include?", a: "Fresh flowers, a handwritten card with your message, delivery in Manhattan and tax. No extra fees at checkout." },
  { q: "Can my AI assistant order for me?", a: "Yes. Agents can use our JSON API (/api/orders), our MCP server (/mcp) or the plain HTML order form. Payment is on Stripe's hosted checkout." },
];

const RECIPIENTS: [string, string][] = [
  ["Girlfriend", "/guides/what-flowers-to-send-your-girlfriend"],
  ["Wife", "/guides/flowers-for-your-wife"],
  ["Mom", "/guides/flowers-for-mom"],
  ["Mother's Day", "/guides/mothers-day-flowers-manhattan"],
  ["Grandma", "/guides/flowers-for-grandma"],
  ["Sister or best friend", "/guides/flowers-for-your-sister-or-best-friend"],
  ["Sending from abroad", "/guides/send-flowers-to-mom-in-nyc-from-out-of-town"],
  ["Your neighborhood", "/delivery"],
];

const Icon = ({ d }: { d: string }) => (
  <span className="icon" aria-hidden="true">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  </span>
);
const ICONS = {
  card: "M4 6h16v12H4zM4 7l8 6 8-6",
  flower: "M12 21v-8M12 13c-3 0-5-2.5-5-6 2 0 3.5.8 5 2.5C13.5 7.8 15 7 17 7c0 3.5-2 6-5 6zM12 9.5V4M9 17c-2 0-3.5-1-4-3 2 0 3.5.6 4.5 1.8M15 17c2 0 3.5-1 4-3-2 0-3.5.6-4.5 1.8",
  door: "M6 21V4h12v17M3 21h18M14 12.5v1",
};

export default async function Home() {
  const cap = await safeCapacity();
  return (
    <main className="home">
      <JsonLd data={businessSchema()} />
      {TIERS.map((t) => (
        <JsonLd key={t.id} data={productSchema(t, cap.soldOut)} />
      ))}
      <JsonLd data={faqSchema(HOME_FAQ)} />

      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Manhattan · same-day before {DELIVERY.sameDayCutoffHourET}:00 ET</p>
            <h1>Fresh flowers, a handwritten card, at her door.</h1>
            <p className="lede">
              Three seasonal bouquets, delivered anywhere in Manhattan. One price with everything included. Order in a minute — or ask your AI assistant to do it.
            </p>
            <div className="hero-actions">
              <Link className="btn" href={cap.soldOut ? "/sold-out" : "/order"}>
                {cap.soldOut ? "Join the waitlist" : "Send flowers"} <Arrow />
              </Link>
              <a className="text-link" href="#bouquets">
                See the bouquets
              </a>
            </div>
            <p className="small muted">
              {cap.soldOut
                ? `Our pilot is fully booked (${LIMITS.maxPaidOrders} orders).`
                : `Pilot: ${cap.remaining} of ${LIMITS.maxPaidOrders} orders left · earliest delivery ${cap.availableDates[0]}`}
            </p>
          </div>
          <div className="hero-img">
            <Image src={IMAGES.hero.src} alt={IMAGES.hero.alt} fill priority sizes="(max-width: 860px) 100vw, 52vw" />
          </div>
        </div>
      </section>

      <section className="band" id="bouquets">
        <div className="wrap">
          <div className="band-head">
            <p className="eyebrow">The bouquets</p>
            <Link href="/order" className="text-link">
              Order <Arrow />
            </Link>
          </div>
          <TierCards soldOut={cap.soldOut} />
          <p className="band-note">Photos show the style. Each bouquet is arranged fresh on the day from what&apos;s in season.</p>
        </div>
      </section>

      <section className="how">
        <div className="wrap">
          <p className="eyebrow center">How it works</p>
          <h2 className="center">Chosen by you. Arranged by hand. Delivered.</h2>
          <div className="steps">
            <div className="step">
              <Icon d={ICONS.card} />
              <div>
                <h3>1. Choose</h3>
                <p>Pick a bouquet, the date, and what the card should say.</p>
              </div>
            </div>
            <div className="step">
              <Icon d={ICONS.flower} />
              <div>
                <h3>2. We arrange</h3>
                <p>A Manhattan florist makes it fresh and writes your card by hand.</p>
              </div>
            </div>
            <div className="step">
              <Icon d={ICONS.door} />
              <div>
                <h3>3. It arrives</h3>
                <p>At her door between {DELIVERY.window}. Doormen, offices and hotels too.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="photo-band">
        <Image src={IMAGES.band.src} alt="" fill sizes="100vw" />
        <div className="photo-band-inner">
          <p className="eyebrow">For the people you love</p>
          <span className="rule" />
          <Link className="btn light" href={cap.soldOut ? "/sold-out" : "/order"}>
            Send flowers <Arrow />
          </Link>
        </div>
      </section>

      <div className="wrap narrow content">
        <h2>Who are the flowers for?</h2>
        <ul className="chips">
          {RECIPIENTS.map(([label, href]) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>

        <h2>Compare the bouquets</h2>
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

        <h2>Let your AI assistant order</h2>
        <p>
          Fixed all-in prices, a <a href="/api/catalog">JSON catalog</a>, an ordering API, an MCP server at <code>/mcp</code> and <a href="/llms.txt">llms.txt</a>. Your assistant
          prepares the order and gets a secure checkout link — you approve and pay. <Link href="/guides/ask-your-ai-assistant-to-send-flowers">How it works</Link>
        </p>
        <AskAI />

        <h2>Not sure what to send?</h2>
        <ul className="link-list">
          {GUIDES.slice(0, 8).map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`}>{g.title}</Link>
            </li>
          ))}
        </ul>
        <p>
          <Link href="/guides" className="text-link">
            All guides <Arrow />
          </Link>
        </p>

        <h2>Questions</h2>
        {HOME_FAQ.map((f) => (
          <div key={f.q} className="faq">
            <h3>{f.q}</h3>
            <p className="muted">{f.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
