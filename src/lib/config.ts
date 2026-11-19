// Single source of truth for what we sell, where, and the pilot limits.
// Every surface (HTML, JSON API, MCP, llms.txt, JSON-LD) reads from here.

export const SITE = {
  name: "Virág",
  legalName: "Virág Flowers",
  tagline: "Flowers for her, delivered in Manhattan. Built so your AI assistant can order in one step.",
  // SITE_URL wins; on Vercel fall back to the production domain Vercel provides automatically.
  url: (
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
  ).replace(/\/$/, ""),
  supportEmail: process.env.SUPPORT_EMAIL || "hello@virag.flowers",
  currency: "usd",
  timezone: "America/New_York",
} as const;

export type TierId = "sweet" | "romantic" | "grand";

export interface Tier {
  id: TierId;
  name: string;
  priceUsd: number; // all-in: flowers + handwritten card + delivery + tax
  headline: string;
  description: string;
  includes: string[];
  bestFor: string[];
}

export const TIERS: Tier[] = [
  {
    id: "sweet",
    name: "Sweet",
    priceUsd: 119,
    headline: "A beautiful seasonal bouquet",
    description:
      "A hand-tied bouquet of about 20 seasonal stems (roses, ranunculus, tulips or peonies depending on the season) in soft pinks and whites, arranged by a Manhattan florist on the delivery day.",
    includes: ["~20 fresh seasonal stems", "Handwritten card with your message", "Delivery anywhere in Manhattan", "Tax and fees included"],
    bestFor: ["Just because", "Thank you", "A bad week", "Third date", "Get well"],
  },
  {
    id: "romantic",
    name: "Romantic",
    priceUsd: 229,
    headline: "Two dozen premium roses or a lush arrangement",
    description:
      "Twenty-four long-stem premium roses (red by default; tell us in the card note if she prefers pink or white) or an equivalent lush designer arrangement, with a handwritten card.",
    includes: ["24 premium long-stem roses or designer arrangement", "Handwritten card with your message", "Delivery anywhere in Manhattan", "Tax and fees included"],
    bestFor: ["Anniversary", "Birthday", "Apology", "Valentine's Day", "Big news"],
  },
  {
    id: "grand",
    name: "Grand Gesture",
    priceUsd: 749,
    headline: "100 long-stem roses — the unforgettable one",
    description:
      "One hundred long-stem roses in a statement arrangement or luxury box, hand-delivered with a premium handwritten card. The bouquet people photograph.",
    includes: ["100 long-stem roses, statement arrangement or luxury box", "Premium handwritten card", "Priority delivery anywhere in Manhattan", "Tax and fees included"],
    bestFor: ["Proposal", "Big anniversary", "Serious apology", "Winning her back", "Milestone birthday"],
  },
];

export const tierById = (id: string): Tier | undefined => TIERS.find((t) => t.id === id);

// Pilot limits — configurable via env so they can change without a deploy-code change.
export const LIMITS = {
  maxPaidOrders: Number(process.env.MAX_ORDERS || 20),
  maxOrdersPerDeliveryDate: Number(process.env.MAX_ORDERS_PER_DAY || 4),
  checkoutMinutes: 30, // Stripe minimum session lifetime; slot is reserved meanwhile
  cardMessageMaxChars: 300,
  maxDaysAhead: 30,
};

export const DELIVERY = {
  area: "Manhattan, New York, NY",
  zipMin: 10001,
  zipMax: 10282, // all Manhattan ZIP codes fall in 10001–10282
  sameDayCutoffHourET: 11, // order and pay before 11:00 America/New_York for same-day delivery
  window: "10:00–18:00 local time",
  blackoutDates: ["2026-11-26", "2026-12-25", "2027-01-01"],
};
