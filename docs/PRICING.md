# Pricing and sourcing (5 tiers, set Nov 19, 2026)

Every tier maps to a real best seller from a NYC florist. Prices were checked on the shops' own sites on Nov 19, 2026. Re-check before each order; prices and availability change.

Assumptions: NY sales tax 8.875% on flowers + delivery; Stripe plus currency conversion ≈ 4.5% + $0.30 of our price.

| Tier | Our price | Fulfil with | Florist price | Delivery | Est. cost incl. tax | Est. margin |
|---|---|---|---|---|---|---|
| Petite | $89 | UrbanStems **The Sorbet** (pink and cream roses; 4.8★, 424 reviews; on their Best Sellers page) | $68 | free (listed as free delivery) | $74 | ~$11 |
| Sweet | $119 | UrbanStems **The Margot** (first on their Best Sellers page, 536 reviews) | $90 | free | $98 | ~$15 |
| Classic | $159 | Jerome Florists **Eliana**, Small (Best Sellers #2) | $100 | $15 | $125 | ~$26 |
| Romantic | $229 | Jerome Florists **Red Explorer Roses**, Small (or **Pink Roses** Small for pink) | $150 | $15 | $180 | ~$39 |
| Grand Gesture | $749 | Jerome Florists **Mother of All Bouquets**, Small, with vase | $550 | $15 | $615 | ~$100 |

Backups if sold out:
- Petite: UrbanStems The Firecracker ($74, 917 reviews) or The Unicorn ($60).
- Sweet: UrbanStems The Peace ($74) or The Peony ($94).
- Classic: Jerome Kakovatos / Light Spring / Viridescence Small ($100).
- Romantic: Jerome Mondial (white roses) Small ($150).

## Differences customers see
- **Petite and Sweet** (UrbanStems): arrive wrapped in a gift box, no vase, **printed** card. Same-day only below 125th St (UrbanStems same-day zone; their cutoff is about 1 PM ET, ours is 11:00). The site and API move upper-Manhattan ZIPs (`UPPER_MANHATTAN_ZIPS` in `src/lib/config.ts`) to the next day automatically.
- **Classic, Romantic, Grand** (Jerome): arranged in a vase or cube, **handwritten** card, same-day anywhere in Manhattan (their cutoff is 3 PM ET).

## Why the old tiers changed
- The old Sweet ($119 via Jerome) would have lost ~$12 per order: Jerome's cheapest best sellers are $100 + $15 delivery + tax.
- "24 roses for $229" and "100 roses for $749" weren't backed by a best-selling product at a price that covers cost. Jerome's dozen-rose arrangements start at $150 (Small), and a medium is $300. So the copy now describes the actual best-selling arrangement and makes no stem-count promises.

Sources: jeromeflorists.com/collections/best-sellers, urbanstems.com/collections/best-sellers (Nov 19, 2026).
