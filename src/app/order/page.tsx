import type { Metadata } from "next";
import { randomUUID } from "node:crypto";
import Link from "next/link";
import { redirect } from "next/navigation";
import { DELIVERY, LIMITS, TIERS } from "@/lib/config";
import { safeCapacity } from "@/lib/orders";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Order flowers — Manhattan delivery",
  description: "Order a best-selling bouquet with your card message for delivery in Manhattan. $89, $119, $159, $229 or $749 all-in. Works without JavaScript; AI agents welcome.",
};

type SP = Record<string, string | string[] | undefined>;

export default async function OrderPage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  const v = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const cap = await safeCapacity();
  if (cap.soldOut) redirect(`/sold-out?tier=${encodeURIComponent(v("tier"))}`);
  const selected = TIERS.some((t) => t.id === v("tier")) ? v("tier") : "romantic";

  return (
    <main>
      <div className="wrap narrow">
        <h1>Send flowers</h1>
        <p className="muted">
          Manhattan only (ZIP {DELIVERY.zipMin}–{DELIVERY.zipMax}). Same-day if paid before {DELIVERY.sameDayCutoffHourET}:00 New York time. {cap.remaining} of {LIMITS.maxPaidOrders}{" "}
          pilot orders left.
        </p>
        {v("error") ? <p className="notice error">{v("error")}</p> : null}

        <form className="order" method="post" action="/api/orders/form" aria-label="Flower order form">
          <input type="hidden" name="idempotency_key" value={randomUUID()} />
          <fieldset>
            <legend>1. Bouquet</legend>
            {TIERS.map((t) => (
              <label key={t.id} className="radio-tier">
                <input type="radio" name="tier" value={t.id} defaultChecked={t.id === selected} required />
                <span>
                  <strong>
                    {t.name} — ${t.priceUsd}
                  </strong>{" "}
                  <span className="muted">all-in</span>
                  <br />
                  <span className="small muted">{t.headline}</span>
                </span>
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>2. Recipient</legend>
            <div className="row">
              <label>
                Her name
                <input name="recipient_name" required maxLength={80} defaultValue={v("recipient_name")} autoComplete="off" />
              </label>
              <label>
                Her phone <span className="hint">courier calls for building access</span>
                <input name="recipient_phone" type="tel" required defaultValue={v("recipient_phone")} placeholder="(212) 555-0123" />
              </label>
            </div>
            <label>
              Street address
              <input name="address_line1" required maxLength={120} defaultValue={v("address_line1")} placeholder="245 E 19th St" />
            </label>
            <div className="row">
              <label>
                Apt / floor / company
                <input name="address_line2" maxLength={60} defaultValue={v("address_line2")} placeholder="Apt 4B" />
              </label>
              <label>
                ZIP (Manhattan)
                <input name="zip" required inputMode="numeric" pattern="\d{5}" maxLength={5} defaultValue={v("zip")} placeholder="10003" />
              </label>
            </div>
            <label>
              Delivery instructions <span className="hint">doorman, buzzer, front desk, rose color…</span>
              <input name="delivery_instructions" maxLength={200} defaultValue={v("delivery_instructions")} />
            </label>
          </fieldset>

          <fieldset>
            <legend>3. Date & card</legend>
            <label>
              Delivery date
              <select name="delivery_date" defaultValue={v("delivery_date") || cap.availableDates[0]}>
                {cap.availableDates.map((d) => (
                  <option key={d} value={d}>
                    {new Date(`${d}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" })}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Card message <span className="hint">handwritten by the florist, max {LIMITS.cardMessageMaxChars} characters · <Link href="/guides/what-to-write-on-a-flower-card">ideas</Link></span>
              <textarea name="card_message" maxLength={LIMITS.cardMessageMaxChars} defaultValue={v("card_message")} />
            </label>
            <div className="row">
              <label>
                Sign the card as
                <input name="sender_name" required maxLength={60} defaultValue={v("sender_name")} placeholder="Love, Daniel" />
              </label>
              <label>
                Your email <span className="hint">receipt & delivery confirmation</span>
                <input name="buyer_email" type="email" defaultValue={v("buyer_email")} />
              </label>
            </div>
          </fieldset>

          <button className="btn" type="submit">
            Continue to secure payment
          </button>
          <p className="small muted" style={{ margin: 0 }}>
            You&apos;ll pay on Stripe. Your slot is held for {LIMITS.checkoutMinutes} minutes.
          </p>
        </form>
      </div>
    </main>
  );
}
