import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NEIGHBORHOODS, neighborhoodBySlug } from "@/content/neighborhoods";
import { GUIDES } from "@/content/guides";
import { DELIVERY, SITE, TIERS } from "@/lib/config";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = neighborhoodBySlug((await params).slug);
  if (!n) return {};
  const title = `Flower Delivery ${n.name}, Manhattan — Same Day`;
  const description = `Send flowers with your card message to the ${n.name} (ZIP ${n.zips.join(", ")}). $89, $119, $159, $229 or $749 all-in. Same-day before ${DELIVERY.sameDayCutoffHourET}:00 ET. Order online, by API or via your AI assistant.`;
  return { title, description, alternates: { canonical: `/delivery/${n.slug}` }, openGraph: { title, description } };
}

export default async function NeighborhoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const n = neighborhoodBySlug((await params).slug);
  if (!n) notFound();
  const faq = [
    { q: `Do you deliver flowers to the ${n.name}?`, a: `Yes. We deliver to every address in ${n.name} (ZIP ${n.zips.join(", ")}), ${DELIVERY.window}.` },
    { q: `Can I get same-day flower delivery in ${n.name}?`, a: `Yes, if you order before ${DELIVERY.sameDayCutoffHourET}:00 New York time. After that, choose next-day delivery.` },
    { q: "How much does flower delivery cost?", a: `Nothing extra. Prices are all-in: ${TIERS.map((t) => `${t.name} $${t.priceUsd}`).join(", ")} — flowers, card, delivery and tax included.` },
    { q: "Can my AI assistant order for me?", a: `Yes. Assistants can use our JSON API (${SITE.url}/api/catalog), our MCP server (${SITE.url}/mcp) or the plain HTML order form.` },
  ];

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Flower delivery",
          name: `Flower delivery in ${n.name}, Manhattan`,
          provider: { "@type": "Florist", name: SITE.legalName, url: SITE.url },
          areaServed: { "@type": "Place", name: `${n.name}, Manhattan, New York, NY`, address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY", addressCountry: "US", postalCode: n.zips[0] } },
          offers: TIERS.map((t) => ({ "@type": "Offer", name: t.name, price: t.priceUsd, priceCurrency: "USD", url: `${SITE.url}/order?tier=${t.id}` })),
        }}
      />
      <JsonLd data={faqSchema(faq)} />
      <article className="wrap narrow">
        <p className="small muted">
          <Link href="/delivery">Delivery areas</Link> · Manhattan
        </p>
        <h1>Flower delivery in {n.name}</h1>
        <p className="answer">
          {n.intro} Five best-selling bouquets, all-in: {TIERS.map((t) => `${t.name} $${t.priceUsd}`).join(" · ")} — card, delivery and tax included. Same-day if you order before {DELIVERY.sameDayCutoffHourET}:00 New York
          time.
        </p>

        <h2>ZIP codes we cover here</h2>
        <p>{n.zips.join(" · ")}</p>

        <h2>What delivery is like in {n.name}</h2>
        <p>{n.buildings}</p>
        <ul>
          {n.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <h2>Nearby</h2>
        <p className="muted">{n.places.join(" · ")}</p>

        <h2>Choose a bouquet</h2>
        {TIERS.map((t) => (
          <div className="card" key={t.id} style={{ marginBottom: 12 }}>
            <h3 style={{ marginTop: 0 }}>
              {t.name} — ${t.priceUsd} all-in
            </h3>
            <p className="muted small">{t.headline}. Best for: {t.bestFor.join(", ")}.</p>
            <Link className="btn" href={`/order?tier=${t.id}`}>
              Send the {t.name} to {n.name}
            </Link>
          </div>
        ))}

        <h2>FAQ</h2>
        {faq.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p className="muted">{f.a}</p>
          </div>
        ))}

        <h2>Helpful guides</h2>
        <ul>
          {["flower-delivery-nyc-apartment-doorman", "flowers-for-mom", "what-flowers-to-send-your-girlfriend", "same-day-flower-delivery-manhattan", "what-to-write-on-a-flower-card"]
            .map((s) => GUIDES.find((g) => g.slug === s))
            .filter((g) => g !== undefined)
            .map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`}>{g.title}</Link>
              </li>
            ))}
        </ul>
        <p className="small muted">
          Other areas:{" "}
          {NEIGHBORHOODS.filter((o) => o.slug !== n.slug).map((o, i) => (
            <span key={o.slug}>
              {i ? " · " : ""}
              <Link href={`/delivery/${o.slug}`}>{o.name}</Link>
            </span>
          ))}
        </p>
      </article>
    </main>
  );
}
