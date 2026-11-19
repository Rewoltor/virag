import type { Guide } from "./guides";

// Seasonal guides for the 2026 holidays, plus ordering from abroad. Dates are checked; update every season.

const ORDER =
  "Virág delivers anywhere in Manhattan (ZIP 10001–10282): $89, $119, $159, $229 or $749 all-in, including a card with your message, delivery and tax. Same-day if you pay before 11:00 New York time; you can also book any date up to 30 days ahead.";

export const SEASON_GUIDES: Guide[] = [
  {
    slug: "thanksgiving-flowers-manhattan",
    audience: "family",
    title: "Thanksgiving Flowers in Manhattan (2026): Deliver Wednesday, Nov 25",
    description:
      "Thanksgiving 2026 is Thursday, November 26. When to deliver flowers to a Manhattan host or to family you can't visit, what to send, and what to write on the card.",
    answer:
      "Thanksgiving 2026 is Thursday, November 26, and we don't deliver that day. Send host flowers on Wednesday, November 25, so they are on the table before guests arrive, or a thank-you bouquet on Friday, November 27. Choose warm autumn colors in a low arrangement that won't block faces across the table.",
    tier: "sweet",
    occasion: "holiday",
    blocks: [
      {
        h2: "Which day to deliver",
        ul: [
          "Wednesday, Nov 25: host flowers. The host can arrange them before the cooking starts. Order by Wednesday 11:00 New York time at the latest, or book ahead now.",
          "Thursday, Nov 26 (Thanksgiving): no deliveries. Florists and couriers are closed.",
          "Friday, Nov 27: a thank-you after the dinner, or flowers for family you couldn't be with.",
          "Our pilot takes only 4 deliveries per day, so book Wednesday early.",
        ],
      },
      {
        h2: "What to send",
        ul: [
          "For a host: Petite ($89) or Sweet ($119), gift-boxed bouquets. For something already arranged in a vase with a handwritten card, Classic ($159).",
          "For your mom or the family you're missing: Classic ($159) or Romantic ($229). Both arrive arranged and look generous on the table.",
          "Keep it low and lightly scented. Tall or strongly scented flowers compete with the food.",
          "Cut flowers are a better host gift than a potted plant: the host doesn't have to find a place for it.",
        ],
      },
      {
        h2: "Card messages",
        ul: [
          "\"Thank you for having me. The table, the people, all of it. Happy Thanksgiving.\"",
          "\"Wish I were at the table with you this year. Save me a slice.\"",
          "\"Grateful for you, this year and every year.\"",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [
      { q: "Can flowers be delivered on Thanksgiving Day in Manhattan?", a: "Not by us: Thursday, November 26, 2026 is a no-delivery day. Deliver on Wednesday, November 25 (best for a host) or Friday, November 27." },
      { q: "Should I bring flowers or send them ahead?", a: "Send them ahead. Flowers handed over at the door give the host a job at the busiest moment. Delivered the day before, they're already arranged." },
      { q: "Can I order Thanksgiving flowers from Europe?", a: "Yes. Pay online in USD. For same-day delivery on Wednesday, pay before 11:00 New York time, which is 17:00 in Paris, Berlin or Budapest and 16:00 in London." },
    ],
  },
  {
    slug: "hanukkah-flowers-manhattan",
    audience: "family",
    title: "Hanukkah Flowers in Manhattan (2026): Dates and What to Send",
    description:
      "Hanukkah 2026 begins at sundown on Friday, December 4 and ends at nightfall on Saturday, December 12. When to deliver flowers in Manhattan and what to send.",
    answer:
      "Hanukkah 2026 starts at sundown on Friday, December 4 and ends at nightfall on Saturday, December 12. Because the first night falls on Friday, many families light candles just before Shabbat, so deliver flowers on Friday morning or on any weekday during the eight nights. White and blue flowers are a thoughtful nod to the holiday.",
    tier: "sweet",
    occasion: "holiday",
    blocks: [
      {
        h2: "When to deliver",
        ul: [
          "Friday, Dec 4 (morning): arrives before the first candle and before Shabbat.",
          "Monday, Dec 7 to Friday, Dec 11: any weekday works. Hanukkah gifts are often spread across the eight nights.",
          "Saturday is Shabbat. Many observant households prefer not to receive deliveries then, so avoid Saturday, Dec 5 and Saturday, Dec 12 unless you know they don't mind.",
        ],
      },
      {
        h2: "What to send",
        ul: [
          "White and blue: white roses, hydrangea, delphinium or iris. Mention \"white and blue\" in the delivery notes.",
          "Petite ($89) or Sweet ($119) for friends and colleagues; Classic ($159) or Romantic ($229) for a partner or parents.",
          "Keep the card warm and simple. \"Happy Hanukkah\" or \"Chag Sameach\" are both right.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [
      { q: "When does Hanukkah start in 2026?", a: "At sundown on Friday, December 4, 2026. The last (eighth) candle is lit on Friday, December 11, and the holiday ends at nightfall on Saturday, December 12 (source: Hebcal)." },
      { q: "Are flowers an appropriate Hanukkah gift?", a: "Yes. Flowers are a common gift for a host or for family during Hanukkah. Avoid Saturday delivery for observant households." },
    ],
  },
  {
    slug: "christmas-flowers-manhattan",
    audience: "anyone",
    title: "Christmas Flowers in Manhattan: Book Dec 23 or 24 Now",
    description:
      "How to send Christmas flowers in Manhattan: book delivery for December 23 or 24 (there are no deliveries on Dec 25), what to send, and what to write.",
    answer:
      "There are no flower deliveries in Manhattan on Christmas Day from us, so book December 23 or Christmas Eve, December 24. Our pilot takes only a few deliveries per day and you can book up to 30 days ahead, so reserve the date now. Red and white roses with greenery read festive; a lush Romantic arrangement is the most popular choice.",
    tier: "romantic",
    occasion: "holiday",
    blocks: [
      {
        h2: "Timing",
        ul: [
          "Dec 23: safest. Most people are home and buildings are fully staffed.",
          "Dec 24: the classic choice. The morning works best; doormen and offices close early.",
          "Dec 25: no deliveries.",
          "Booking opens 30 days before the delivery date. For Dec 24 that's from Nov 24.",
        ],
      },
      {
        h2: "What to send",
        ul: [
          "For a partner: Romantic ($229), premium red roses in a vase. Or the statement rose bouquet (Grand Gesture, $749) if you're apart for the holidays.",
          "For your mom or family: Classic ($159), arranged and ready to display.",
          "For a host or a friend: Petite ($89) or Sweet ($119).",
          "We never include lilies (toxic to cats). If the home has pets, keep it to roses and greenery.",
        ],
      },
      {
        h2: "Card messages",
        ul: [
          "\"Merry Christmas from far away. Next year, I'm bringing these in person.\"",
          "\"For the person who makes the holidays feel like home.\"",
          "\"Merry Christmas. I love you more than this city loves its tree.\"",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [
      { q: "Can I get flowers delivered on Christmas Day in NYC?", a: "Not from us: December 25 is a no-delivery day. Book December 23 or the morning of December 24." },
      { q: "How early should I order Christmas flowers?", a: "As soon as booking opens (30 days before delivery). Our pilot accepts only a few deliveries per day, and Christmas Eve fills first." },
    ],
  },
  {
    slug: "send-flowers-to-manhattan-from-abroad",
    audience: "anyone",
    title: "How to Send Flowers to Manhattan From Abroad (UK, Europe, India, Australia)",
    description:
      "Send flowers to someone in Manhattan from another country: how payment works, and the same-day cutoff in London, Paris, Berlin, Dubai, India, Singapore and Sydney.",
    answer:
      "You can send flowers to Manhattan from any country. Pay online in US dollars with a normal Visa, Mastercard or Amex, give the recipient's address, apartment number and phone, and pick a date. For same-day delivery, pay before 11:00 New York time: in winter that is 16:00 in London, 17:00 in Paris or Berlin, 21:30 in India and 03:00 the next day in Sydney.",
    tier: "sweet",
    occasion: "long_distance",
    blocks: [
      {
        h2: "Same-day cutoff in your time zone (Nov 2026 to early March 2027)",
        ul: [
          "New York: 11:00",
          "London: 16:00",
          "Paris, Berlin, Budapest, Madrid, Rome: 17:00",
          "Dubai: 20:00",
          "India: 21:30",
          "Singapore and Hong Kong: 00:00 (midnight)",
          "Tokyo: 01:00 the next day",
          "Sydney: 03:00 the next day",
          "From mid-March, US daylight saving time shifts these by an hour for a few weeks. If in doubt, book the next day.",
        ],
      },
      {
        h2: "What you need",
        ul: [
          "Recipient's full name and mobile number. The courier calls if they can't get in.",
          "Street address, apartment number, and how to get in (doorman, buzzer name, office floor).",
          "A card with a foreign billing address works. The price is charged in USD, so your bank may add a small currency fee.",
          "Your AI assistant can do this for you. Tell it who, where, when and the card text, and it returns a secure Stripe payment link.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [
      { q: "Can I pay with a non-US card?", a: "Yes. Checkout is on Stripe and accepts international Visa, Mastercard and Amex. The price is in USD and already includes delivery and tax." },
      { q: "Will the recipient know the price?", a: "No. The card carries only your message and your name." },
      { q: "What if the recipient isn't home?", a: "Doorman buildings hold flowers at the desk. Otherwise the courier calls the recipient's phone to arrange access, which is why the phone number is required." },
    ],
  },
];
