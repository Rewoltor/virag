// Photos: Unsplash License (free for commercial use, no permission needed). Served from Unsplash's CDN.
// Shown as examples of style; every bouquet is arranged fresh from what's in season.
const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const IMAGES = {
  hero: { src: u("1497276236755-0f85ba99a126"), alt: "A full bouquet of soft pink garden roses" },
  band: { src: u("1582794543139-8ac9cb0f7b11"), alt: "Close-up of pink garden roses" },
  tiers: {
    sweet: { src: u("1523693916903-027d144a2b7d"), alt: "A hand-tied bouquet of pastel seasonal flowers wrapped in paper" },
    romantic: { src: u("1548094967-e25a127d1f6d"), alt: "A round bouquet of two dozen red roses" },
    grand: { src: u("1494972308805-463bc619d34e"), alt: "A large mass of deep red long-stem roses" },
  },
} as const;
