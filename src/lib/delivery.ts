import { DELIVERY, LIMITS, UPPER_MANHATTAN_ZIPS, type Tier } from "./config";

/** Current date (YYYY-MM-DD) and hour in New York. */
export function nowInNewYork(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, hour: Number(get("hour")) };
}

function addDays(isoDate: string, days: number): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function isManhattanZip(zip: string): boolean {
  if (!/^\d{5}$/.test(zip)) return false;
  const n = Number(zip);
  return n >= DELIVERY.zipMin && n <= DELIVERY.zipMax;
}

/** Earliest deliverable date given the same-day cutoff. */
export function earliestDeliveryDate(now = new Date()): string {
  const ny = nowInNewYork(now);
  let d = ny.hour < DELIVERY.sameDayCutoffHourET ? ny.date : addDays(ny.date, 1);
  while (DELIVERY.blackoutDates.includes(d)) d = addDays(d, 1);
  return d;
}

export function availableDates(now = new Date()): string[] {
  const first = earliestDeliveryDate(now);
  const out: string[] = [];
  for (let i = 0; i < LIMITS.maxDaysAhead; i++) {
    const d = addDays(first, i);
    if (!DELIVERY.blackoutDates.includes(d)) out.push(d);
  }
  return out;
}

export type DateCheck = { ok: true; date: string } | { ok: false; error: string };

export function checkDeliveryDate(date: string | undefined, now = new Date()): DateCheck {
  const earliest = earliestDeliveryDate(now);
  if (!date) return { ok: true, date: earliest };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, error: "delivery_date must be YYYY-MM-DD" };
  if (date < earliest)
    return { ok: false, error: `Earliest available delivery date is ${earliest} (same-day cutoff is ${DELIVERY.sameDayCutoffHourET}:00 New York time).` };
  if (DELIVERY.blackoutDates.includes(date)) return { ok: false, error: `No deliveries on ${date}.` };
  const last = addDays(earliest, LIMITS.maxDaysAhead);
  if (date > last) return { ok: false, error: `We take orders up to ${LIMITS.maxDaysAhead} days ahead (last date ${last}).` };
  return { ok: true, date };
}

/**
 * Gift-boxed tiers go same-day only below 125th St. Returns the date to use (bumped to the next
 * day when the caller didn't ask for one) or an error when the caller explicitly asked for today.
 */
export function applyTierZipRule(tier: Tier, zip: string, date: string, explicit: boolean, now = new Date()): DateCheck {
  const today = nowInNewYork(now).date;
  if (tier.sameDayAboveHarlem || date !== today || !UPPER_MANHATTAN_ZIPS.includes(zip)) return { ok: true, date };
  const next = availableDates(now).find((d) => d > today);
  if (!explicit && next) return { ok: true, date: next };
  return { ok: false, error: `${tier.name} is delivered same-day only below 125th Street. For ZIP ${zip} the earliest date is ${next}. Or choose Classic, Romantic or Grand Gesture for same-day.` };
}
