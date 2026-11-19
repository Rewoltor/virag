import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Checkout cancelled", robots: { index: false } };

export default function Cancelled() {
  return (
    <main>
      <div className="wrap narrow">
        <h1>No problem — nothing was charged.</h1>
        <p className="muted">Your slot is held for a few more minutes if you change your mind.</p>
        <p>
          <Link className="btn" href="/order">
            Start again
          </Link>
        </p>
      </div>
    </main>
  );
}
