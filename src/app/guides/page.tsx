import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/content/guides";

export const metadata: Metadata = {
  title: "Flower guides: what to send her, what to write",
  description: "Practical guides for sending flowers to your girlfriend: what to send for every occasion, what to write on the card, how much to spend, and same-day delivery in Manhattan.",
};

export default function Guides() {
  return (
    <main>
      <div className="wrap narrow">
        <h1>Flower guides</h1>
        <p className="lede">Straight answers for people who want to get it right the first time.</p>
        {GUIDES.map((g) => (
          <article key={g.slug} style={{ marginBottom: 22 }}>
            <h3>
              <Link href={`/guides/${g.slug}`}>{g.title}</Link>
            </h3>
            <p className="muted small" style={{ margin: 0 }}>
              {g.description}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
