import type { Metadata } from "next";
import Link from "next/link";
import { NEIGHBORHOODS } from "@/content/neighborhoods";
import { DELIVERY } from "@/lib/config";

export const metadata: Metadata = {
  title: "Manhattan flower delivery areas",
  description: "We deliver best-selling bouquets with your card message to every Manhattan neighborhood (ZIP 10001–10282). Same-day before 11:00 ET. See delivery notes for each area.",
  alternates: { canonical: "/delivery" },
};

export default function DeliveryAreas() {
  return (
    <main>
      <div className="wrap narrow">
        <h1>Where we deliver in Manhattan</h1>
        <p className="lede">
          Every address in Manhattan, ZIP {DELIVERY.zipMin}–{DELIVERY.zipMax}, {DELIVERY.window}. Same-day if you order before {DELIVERY.sameDayCutoffHourET}:00 New York time. We don&apos;t deliver to Brooklyn,
          Queens, the Bronx, Staten Island or New Jersey yet.
        </p>
        {NEIGHBORHOODS.map((n) => (
          <article key={n.slug} style={{ marginBottom: 18 }}>
            <h3>
              <Link href={`/delivery/${n.slug}`}>Flower delivery in {n.name}</Link>
            </h3>
            <p className="muted small" style={{ margin: 0 }}>
              ZIP {n.zips.join(", ")} · {n.intro}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
