import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, audienceOf, guideBySlug } from "@/content/guides";
import { CARD_MESSAGES } from "@/content/cards";
import { SITE, tierById } from "@/lib/config";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { AskAI } from "@/components/AskAI";

export const dynamicParams = false;
export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const g = guideBySlug((await params).slug);
  if (!g) return {};
  return { title: g.title, description: g.description, alternates: { canonical: `/guides/${g.slug}` }, openGraph: { title: g.title, description: g.description, type: "article" } };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();
  const tier = tierById(g.tier)!;
  const isCardGuide = g.slug === "what-to-write-on-a-flower-card";
  const cardSet = g.occasion ? CARD_MESSAGES[g.occasion] : undefined;
  const updated = "2026-11-19";

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.description,
          dateModified: updated,
          author: { "@type": "Organization", name: SITE.legalName },
          publisher: { "@type": "Organization", name: SITE.legalName },
          mainEntityOfPage: `${SITE.url}/guides/${g.slug}`,
        }}
      />
      <JsonLd data={faqSchema(g.faq)} />
      <article className="wrap narrow">
        <p className="small muted">
          <Link href="/guides">Guides</Link> · Updated {updated}
        </p>
        <h1>{g.title}</h1>
        <p className="answer">{g.answer}</p>

        {g.blocks.map((b, i) => (
          <section key={i}>
            {b.h2 ? <h2>{b.h2}</h2> : null}
            {b.p?.map((p, j) => <p key={j}>{p}</p>)}
            {b.ul ? (
              <ul>
                {b.ul.map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        {isCardGuide
          ? Object.entries(CARD_MESSAGES).map(([key, set]) => (
              <section key={key}>
                <h2>{set.label}</h2>
                <ul>
                  {set.messages.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </section>
            ))
          : cardSet && (
              <section>
                <h2>More card messages: {cardSet.label.toLowerCase()}</h2>
                <ul>
                  {cardSet.messages.slice(0, 4).map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </section>
            )}

        <div className="card featured" style={{ marginTop: 28 }}>
          <span className="pill">Recommended</span>
          <h3>
            {tier.name} — ${tier.priceUsd} all-in
          </h3>
          <p className="muted small" style={{ margin: 0 }}>
            {tier.description}
          </p>
          <Link className="btn" href={`/order?tier=${tier.id}`}>
            Send the {tier.name}
          </Link>
        </div>

        <AskAI context={g.title} />

        <h2>FAQ</h2>
        {g.faq.map((f) => (
          <div key={f.q}>
            <h3>{f.q}</h3>
            <p className="muted">{f.a}</p>
          </div>
        ))}

        <h2>Related</h2>
        <ul>
          {[...GUIDES.filter((o) => o.slug !== g.slug && audienceOf(o) === audienceOf(g)), ...GUIDES.filter((o) => audienceOf(o) !== audienceOf(g))]
            .slice(0, 6)
            .map((o) => (
              <li key={o.slug}>
                <Link href={`/guides/${o.slug}`}>{o.title}</Link>
              </li>
            ))}
        </ul>
      </article>
    </main>
  );
}
