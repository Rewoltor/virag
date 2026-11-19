import Image from "next/image";
import Link from "next/link";
import { TIERS } from "@/lib/config";
import { IMAGES } from "@/content/images";

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function TierCards({ soldOut }: { soldOut: boolean }) {
  return (
    <div className="bouquets">
      {TIERS.map((t) => {
        const img = IMAGES.tiers[t.id];
        const href = soldOut ? `/sold-out?tier=${t.id}` : `/order?tier=${t.id}`;
        return (
          <article key={t.id} className="bouquet" id={t.id}>
            <Link href={href} className="bouquet-img" aria-label={`${soldOut ? "Join the waitlist for" : "Send"} the ${t.name}`}>
              <Image src={img.src} alt={img.alt} fill sizes="(max-width: 720px) 100vw, 33vw" />
            </Link>
            <div className="bouquet-body">
              <div>
                <h3>
                  {t.name} <span className="price">${t.priceUsd}</span>
                </h3>
                <p>{t.headline}. Card, delivery and tax included.</p>
              </div>
              <Link href={href} className="circle" aria-label={soldOut ? `Join the waitlist for ${t.name}` : `Order ${t.name}`}>
                <Arrow />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export { Arrow };
