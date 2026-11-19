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

export type TierId = "petite" | "sweet" | "classic" | "romantic" | "grand";

export interface Tier {
  id: TierId;
  name: string;
  priceUsd: number; // all-in: flowers + card + delivery + tax
  headline: string;
  description: string;
  includes: string[];
  bestFor: string[];
  card: "handwritten" | "printed";
  vase: boolean; // false = arrives wrapped in a gift box
  sameDayAboveHarlem: boolean; // false = same-day only below 125th St (see UPPER_MANHATTAN_ZIPS)
}

// Each tier is a real best seller from a NYC florist; sourcing, costs and margins are in docs/PRICING.md.
export const TIERS: Tier[] = [
  {
    id: "petite",
    name: "Petite",
    priceUsd: 89,
    headline: "A pink and cream rose bouquet, gift-boxed",
    description:
      "A hand-tied bouquet of delicate pink and creamy white roses, one of New York's best-selling small bouquets. It arrives wrapped in a gift box with a printed card carrying your message. No vase included.",
    includes: ["Hand-tied pink and cream rose bouquet", "Printed card with your message", "Gift box (no vase)", "Delivery and tax included"],
    bestFor: ["Just because", "Thank you", "Host gift", "Early dating", "A bad week"],
    card: "printed",
    vase: false,
    sameDayAboveHarlem: false,
  },
  {
    id: "sweet",
    name: "Sweet",
    priceUsd: 119,
    headline: "A soft, airy designer bouquet, gift-boxed",
    description:
      "A light, airy designer bouquet in soft tones with roses, seasonal blooms and textured greenery, modeled on one of New York's best-selling bouquets. It arrives wrapped in a gift box with a printed card carrying your message. No vase included.",
    includes: ["Designer bouquet in soft tones", "Printed card with your message", "Gift box (no vase)", "Delivery and tax included"],
    bestFor: ["Just because", "Birthday", "Thank you", "Get well", "Thanksgiving host"],
    card: "printed",
    vase: false,
    sameDayAboveHarlem: false,
  },
  {
    id: "classic",
    name: "Classic",
    priceUsd: 159,
    headline: "Pink roses, orchids and hydrangea in a glass cube",
    description:
      "A lush arrangement of hot-pink roses, blush cymbidium orchids, white lisianthus and hydrangea in a leaf-lined glass cube, one of a Manhattan florist's best sellers. Arranged on the delivery day, ready to display, with a handwritten card.",
    includes: ["Florist arrangement in a glass cube (no vase needed)", "Handwritten card with your message", "Delivery anywhere in Manhattan", "Tax included"],
    bestFor: ["Birthday", "Mom", "Monthly anniversary", "Thank you", "Holidays"],
    card: "handwritten",
    vase: true,
    sameDayAboveHarlem: true,
  },
  {
    id: "romantic",
    name: "Romantic",
    priceUsd: 229,
    headline: "A premium rose arrangement in a vase",
    description:
      "Premium long-stem roses arranged in a clean vase with lush greenery, red by default (write pink, white or yellow in the delivery notes). A best seller from a Manhattan florist, arranged on the delivery day, with a handwritten card.",
    includes: ["Premium long-stem roses in a vase", "Handwritten card with your message", "Delivery anywhere in Manhattan", "Tax included"],
    bestFor: ["Anniversary", "Birthday", "Apology", "Valentine's Day", "Big news"],
    card: "handwritten",
    vase: true,
    sameDayAboveHarlem: true,
  },
  {
    id: "grand",
    name: "Grand Gesture",
    priceUsd: 749,
    headline: "The statement rose bouquet, the one people photograph",
    description:
      "A generous, dramatic bouquet of premium pink and white roses in a vase, a Manhattan florist's statement best seller. Ask for all red in the delivery notes and we'll request it. Premium handwritten card and priority delivery.",
    includes: ["Statement bouquet of premium roses in a vase", "Premium handwritten card", "Priority delivery anywhere in Manhattan", "Tax included"],
    bestFor: ["Proposal", "Big anniversary", "Serious apology", "Winning her back", "Milestone birthday"],
    card: "handwritten",
    vase: true,
    sameDayAboveHarlem: true,
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

// Upper Manhattan ZIPs (mostly above 125th St): gift-boxed tiers go next-day here, not same-day.
export const UPPER_MANHATTAN_ZIPS = ["10027", "10030", "10031", "10032", "10033", "10034", "10035", "10037", "10039", "10040"];

/** Lowest all-in price, for copy like "from $89". */
export const FROM_PRICE = Math.min(...TIERS.map((t) => t.priceUsd));
