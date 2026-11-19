import type { Metadata } from "next";
import Link from "next/link";
import { AUDIENCES, GUIDES, audienceOf, type Audience } from "@/content/guides";

export const metadata: Metadata = {
  title: "Flower guides: what to send her, your mom or anyone you love",
  description: "Practical guides for sending flowers to your girlfriend, wife, mom, grandmother or friends: what to send, what to write on the card, how much to spend, and delivery in Manhattan.",
  alternates: { canonical: "/guides" },
};

export default function Guides() {
  return (
    <main>
      <div className="wrap narrow">
        <h1>Flower guides</h1>
        <p className="lede">Straight answers for people who want to get it right the first time.</p>
        {(Object.keys(AUDIENCES) as Audience[]).map((a) => (
          <section key={a}>
            <h2>{AUDIENCES[a]}</h2>
            {GUIDES.filter((g) => audienceOf(g) === a).map((g) => (
              <article key={g.slug} style={{ marginBottom: 18 }}>
                <h3>
                  <Link href={`/guides/${g.slug}`}>{g.title}</Link>
                </h3>
                <p className="muted small" style={{ margin: 0 }}>
                  {g.description}
                </p>
              </article>
            ))}
          </section>
        ))}
        <p>
          <Link href="/delivery">Delivery areas by Manhattan neighborhood →</Link>
        </p>
      </div>
    </main>
  );
}
