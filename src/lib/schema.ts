import { DELIVERY, SITE, TIERS, type Tier } from "./config";

export const businessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Florist",
  "@id": `${SITE.url}/#business`,
  name: SITE.legalName,
  url: SITE.url,
  email: SITE.supportEmail,
  description: SITE.tagline,
  areaServed: { "@type": "City", name: "Manhattan, New York" },
  priceRange: "$119–$749",
  currenciesAccepted: "USD",
  paymentAccepted: "Credit card, Apple Pay, Google Pay (via Stripe)",
  makesOffer: TIERS.map((t) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name: `${t.name} bouquet` }, price: t.priceUsd, priceCurrency: "USD" })),
});

export const productSchema = (t: Tier, soldOut: boolean) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: `${SITE.name} ${t.name} — ${t.headline}`,
  description: `${t.description} Price includes flowers, ${t.card} card, delivery in Manhattan and tax.`,
  brand: { "@type": "Brand", name: SITE.name },
  sku: t.id,
  category: "Flowers > Bouquets",
  offers: {
    "@type": "Offer",
    url: `${SITE.url}/order?tier=${t.id}`,
    price: t.priceUsd,
    priceCurrency: "USD",
    availability: soldOut ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
    seller: { "@id": `${SITE.url}/#business` },
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "USD" },
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "US", addressRegion: "NY", postalCodeRange: { "@type": "PostalCodeRangeSpecification", postalCodeBegin: String(DELIVERY.zipMin), postalCodeEnd: String(DELIVERY.zipMax) } },
      deliveryTime: { "@type": "ShippingDeliveryTime", handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" }, transitTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" } },
    },
  },
});

export const faqSchema = (faq: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
