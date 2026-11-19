import type { Metadata } from "next";
import { LIMITS, TIERS } from "@/lib/config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Fully booked — join the waitlist", robots: { index: false } };

export default async function SoldOut({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return (
    <main>
      <div className="wrap narrow">
        <h1>We&apos;re fully booked.</h1>
        <p className="lede">
          Our Manhattan pilot is limited to {LIMITS.maxPaidOrders} orders so every bouquet gets personal attention. Leave your email and we&apos;ll tell you the moment we reopen.
        </p>
        {sp.joined ? <p className="notice">You&apos;re on the list. Thank you!</p> : null}
        {sp.error ? <p className="notice error">Please enter a valid email.</p> : null}
        <form className="order" method="post" action="/api/waitlist">
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <div className="row">
            <label>
              Bouquet you wanted
              <select name="tier" defaultValue={sp.tier || ""}>
                <option value="">—</option>
                {TIERS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} (${t.priceUsd})
                  </option>
                ))}
              </select>
            </label>
            <label>
              Delivery ZIP
              <input name="zip" inputMode="numeric" maxLength={5} />
            </label>
          </div>
          <button className="btn" type="submit">
            Join the waitlist
          </button>
        </form>
        <p className="small muted">
          Agents: <code>POST /api/waitlist</code> with <code>{`{"email": "...", "tier": "romantic", "zip": "10003"}`}</code>.
        </p>
      </div>
    </main>
  );
}
