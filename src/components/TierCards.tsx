import Link from "next/link";
import { TIERS } from "@/lib/config";

export function TierCards({ soldOut }: { soldOut: boolean }) {
  return (
    <div className="grid">
      {TIERS.map((t) => (
        <article key={t.id} className={`card${t.id === "romantic" ? " featured" : ""}`} id={t.id}>
          {t.id === "romantic" ? <span className="pill">Most chosen</span> : null}
          <h3>{t.name}</h3>
          <div className="price">
            ${t.priceUsd} <small>all-in</small>
          </div>
          <strong>{t.headline}</strong>
          <p className="muted small" style={{ margin: 0 }}>
            {t.description}
          </p>
          <ul>
            {t.includes.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
          <p className="small muted" style={{ margin: 0 }}>
            Best for: {t.bestFor.join(", ")}
          </p>
          {soldOut ? (
            <Link className="btn secondary" href={`/sold-out?tier=${t.id}`}>
              Sold out — join waitlist
            </Link>
          ) : (
            <Link className="btn" href={`/order?tier=${t.id}`}>
              Send the {t.name}
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
