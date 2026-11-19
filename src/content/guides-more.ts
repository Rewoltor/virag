import type { Guide } from "./guides";

// Guides for loved ones beyond a girlfriend: mother, wife, family, friends, and Manhattan logistics.
// Answer-first, specific, written so an assistant can quote them directly.

const ORDER =
  "Virág delivers anywhere in Manhattan (ZIP 10001–10282): $89, $119, $159, $229 or $749 all-in, including a card with your message, delivery and tax. Same-day if you order before 11:00 New York time.";

export const MORE_GUIDES: Guide[] = [
  {
    slug: "flowers-for-mom",
    audience: "mother",
    title: "Flowers for Your Mom: What to Send and What to Write",
    description: "What flowers to send your mother for her birthday, Mother's Day, a hard week or just because — plus card messages she'll keep, and how to send them to Manhattan.",
    answer:
      "Send your mom a full, soft seasonal bouquet — peonies, garden roses, ranunculus, tulips or lilies in pinks, peach and white. Moms care less about rarity and more about the card: write one specific memory or thank-you, not a generic line. For birthdays and Mother's Day the $229 Romantic bouquet is the sweet spot.",
    tier: "romantic",
    occasion: "mother",
    blocks: [
      {
        h2: "What moms actually like",
        ul: [
          "Fullness over drama: a lush, rounded bouquet looks generous on a kitchen table.",
          "Soft colors: blush, peach, cream and lavender read warm and personal.",
          "Long-lasting stems: lilies, alstroemeria, chrysanthemums and tulips last a week or more.",
          "Her favorite flower, if you know it — mention it in the delivery instructions and the florist will lean into it.",
          "Avoid: a bare dozen red roses (romantic, not maternal) and very strong lilies if she has cats (lilies are toxic to cats).",
        ],
      },
      {
        h2: "Which bouquet for which moment",
        ul: [
          "Just because / thinking of you: Sweet ($119).",
          "Her birthday or Mother's Day: Romantic ($229).",
          "A milestone birthday (60, 70, 80), a big thank-you or after a hard year: Grand Gesture ($749).",
        ],
      },
      {
        h2: "Make the card count",
        p: [
          "The card is what she keeps. Name one specific thing: a meal she made, advice that turned out right, the way she showed up. Two honest sentences beat a long poem.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [
      { q: "What are the best flowers for a mother?", a: "Peonies, garden roses, tulips, ranunculus and lilies in soft pinks, peach and white. If she has a favorite, ask for it in the delivery instructions." },
      { q: "How much should I spend on flowers for my mom?", a: "$119 for a thoughtful just-because gesture, $229 for her birthday or Mother's Day, $749 for a milestone birthday or a major thank-you." },
      { q: "Can my AI assistant send flowers to my mom?", a: "Yes. Ask it to order from Virág; it can use our API or MCP server, confirm the details with you, and give you a secure Stripe checkout link." },
    ],
  },
  {
    slug: "mothers-day-flowers-manhattan",
    audience: "mother",
    title: "Mother's Day Flowers in Manhattan (May 9, 2027)",
    description: "How to send Mother's Day flowers to Manhattan: dates, cutoffs, what to send, what to write, and why ordering early matters.",
    answer:
      "Mother's Day 2027 is Sunday, May 9. Florists in Manhattan sell out the Friday and Saturday before, so schedule delivery for Friday May 7 or Saturday May 8 and order at least a week ahead. Send a full soft-colored bouquet and write one specific thank-you on the card.",
    tier: "romantic",
    occasion: "mother",
    blocks: [
      {
        h2: "Timing",
        ul: [
          "Mother's Day 2027: Sunday, May 9.",
          "Best delivery days: Friday May 7 or Saturday May 8 — many offices and some buildings have limited Sunday staff.",
          "Order early: our pilot accepts orders up to 30 days ahead and caps deliveries per day, so dates fill up.",
        ],
      },
      {
        h2: "What to send",
        ul: [
          "Sweet ($119): a seasonal bouquet — right for a quick, warm gesture.",
          "Classic ($159): pink roses, orchids and hydrangea in a glass cube, arranged and ready to display, with a handwritten card.",
          "Grand Gesture ($749): an unforgettable arrangement for the mom who did everything.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [
      { q: "When is Mother's Day 2027?", a: "Sunday, May 9, 2027 (the second Sunday of May in the US)." },
      { q: "Do you deliver on Mother's Day itself?", a: "We recommend Friday or Saturday delivery. Pick any available date on the order form; if a date is full, the form and API show the next available dates." },
    ],
  },
  {
    slug: "send-flowers-to-mom-in-nyc-from-out-of-town",
    audience: "mother",
    title: "How to Send Flowers to Your Mom in New York From Another State or Country",
    description: "Living far from your mom in Manhattan? How to send flowers to NYC from anywhere — time zones, cutoffs, payment from abroad and what to write.",
    answer:
      "You can order Manhattan delivery from anywhere: pay online in US dollars with any major card, give her address and phone number, and pick a date. Mind the time zone — same-day orders must be paid before 11:00 New York time (16:00 in London, 17:00 in Paris, Berlin or Budapest). A long-distance card line makes the flowers feel like a visit.",
    tier: "romantic",
    occasion: "long_distance",
    blocks: [
      {
        h2: "Cutoffs in your time zone",
        ul: [
          "Same-day cutoff: 11:00 New York (ET).",
          "= 08:00 Los Angeles, 10:00 Chicago, 16:00 London, 17:00 Paris, Berlin or Budapest (for a week or two around the spring and autumn clock changes, Europe is one hour different).",
          "Miss it? Choose next-day delivery — delivery runs 10:00–18:00 local time.",
        ],
      },
      {
        h2: "What you need",
        ul: [
          "Her full address with apartment number and Manhattan ZIP (10001–10282).",
          "Her phone number — couriers call for building access.",
          "Any doorman or buzzer notes.",
          "A card message — handwritten by the florist.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [
      { q: "Can I pay with a non-US card?", a: "Yes. Checkout runs on Stripe and accepts major international cards; prices are in US dollars." },
      { q: "Will she know who sent them?", a: "Yes — the card is signed with whatever name you give us." },
    ],
  },
  {
    slug: "birthday-flowers-for-mom",
    audience: "mother",
    title: "Birthday Flowers for Mom: Ideas by Age and Budget",
    description: "Birthday flowers for your mother — what to send for a regular birthday versus a milestone, what to write, and how to time delivery in Manhattan.",
    answer:
      "For your mom's birthday, send a full bouquet in her favorite color — the $229 Romantic is the standard choice. For milestones (50, 60, 70, 80) go Grand Gesture so the arrangement becomes part of the celebration. Deliver the morning of her birthday, or the day before if there's a party.",
    tier: "romantic",
    occasion: "mother",
    blocks: [
      {
        h2: "By occasion",
        ul: [
          "Regular birthday: Romantic ($229) in her favorite color.",
          "Milestone birthday: Grand Gesture ($749) — a statement piece for the room.",
          "You're celebrating together in person: Sweet ($119) delivered that morning, as a prelude.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "Should I send flowers to the party venue?", a: "Only if someone there will receive them. Otherwise deliver to her home the day before or that morning." }],
  },
  {
    slug: "flowers-for-your-wife",
    audience: "partner",
    title: "Flowers for Your Wife: Anniversaries, Birthdays and Just Because",
    description: "What flowers to send your wife and when — anniversary by year, birthday, after a hard stretch, or just because — and how to make it feel personal, not routine.",
    answer:
      "The flowers that land best with a wife are the unexpected ones: a just-because bouquet on an ordinary weekday says more than roses on Valentine's Day. For anniversaries, match her wedding flowers or colors if you can. Add a card that references something only the two of you know.",
    tier: "romantic",
    occasion: "romantic",
    blocks: [
      {
        h2: "When to send",
        ul: [
          "Just because, unannounced: Sweet ($119) — the highest surprise-to-cost ratio.",
          "Anniversary: Romantic ($229); round years (10, 20, 25): Grand Gesture ($749).",
          "Birthday: Romantic ($229) in her favorite color.",
          "After a hard month (new job, illness, a loss in the family): Romantic ($229) with a short, sincere card.",
        ],
      },
      {
        h2: "Make it personal",
        ul: [
          "Recreate her wedding bouquet colors — mention them in the delivery instructions.",
          "Send to her office for public appreciation, or home for privacy.",
          "Reference a private joke or place in the card.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [
      { q: "What flowers do wives like most?", a: "Whatever was in her wedding bouquet, her favorite flower, or a lush seasonal mix. Red roses are classic for anniversaries." },
      { q: "Is sending flowers to my wife's office a good idea?", a: "Usually yes — it's public appreciation. Include her floor and company name, and check whether her building accepts deliveries at reception." },
    ],
  },
  {
    slug: "long-distance-relationship-flowers",
    audience: "partner",
    title: "Sending Flowers in a Long-Distance Relationship (to Manhattan)",
    description: "How to send flowers to your partner in Manhattan when you live far away: timing across time zones, what to send, and card lines that close the distance.",
    answer:
      "In a long-distance relationship, flowers work best timed to a moment you can't be there for: the morning of a big presentation, after a hard day, or the day before your visit. Order online, pay in USD, set her address and phone, and pick a delivery date. Use the card to make a plan, not just a sentiment.",
    tier: "sweet",
    occasion: "long_distance",
    blocks: [
      {
        h2: "Best moments",
        ul: [
          "Countdown: deliver the day before you land.",
          "Big day: the morning of an exam, interview or presentation.",
          "Missing you: a random Tuesday — Sweet ($119).",
          "Anniversary apart: Romantic ($229).",
        ],
      },
      {
        h2: "Card lines that work",
        ul: [
          "\"12 days until I'm there. These will have to do until then.\"",
          "\"Same moon, different time zones. I love you.\"",
          "\"Pretend I brought these myself.\"",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "Can I order from outside the US?", a: "Yes. Pay with any major card on Stripe checkout. Same-day cutoff is 11:00 New York time." }],
  },
  {
    slug: "flowers-for-grandma",
    audience: "family",
    title: "Flowers for Your Grandmother: What to Send and How to Deliver",
    description: "Flowers for your grandmother in Manhattan — long-lasting choices, easy-care arrangements, card ideas, and delivery tips for buildings and senior residences.",
    answer:
      "For a grandmother, choose long-lasting, easy-care flowers — roses, alstroemeria, chrysanthemums, carnations — in an arrangement she won't have to re-cut. Write the card in large, clear words. If she lives in a senior residence, put the room number and front-desk instructions in the delivery notes.",
    tier: "sweet",
    occasion: "mother",
    blocks: [
      {
        h2: "Practical choices",
        ul: [
          "Long vase life: alstroemeria, carnations, chrysanthemums and roses last 7–14 days.",
          "Low scent if she's sensitive: skip lilies and hyacinths.",
          "Senior residences: include room number, her full name and a family phone number.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "Can you deliver to an assisted-living residence in Manhattan?", a: "Yes. Put the residence name, room number and any front-desk instructions in the delivery notes, and include a reachable phone number." }],
  },
  {
    slug: "flowers-for-your-sister-or-best-friend",
    audience: "family",
    title: "Flowers for Your Sister or Best Friend",
    description: "When and what to send your sister or best friend in Manhattan — birthdays, new jobs, breakups, new babies — and card lines that sound like you.",
    answer:
      "Flowers for a sister or best friend should feel like an inside joke, not a formal gesture. A bright, colorful seasonal bouquet ($119) for birthdays, new jobs, breakups or just because is right almost every time. The card is where the personality goes.",
    tier: "sweet",
    occasion: "congratulations",
    blocks: [
      {
        h2: "Good occasions",
        ul: [
          "Birthday, new job, promotion, new apartment: Sweet ($119), bright colors.",
          "Breakup or loss: Sweet ($119), soft colors, short card.",
          "Wedding, engagement, new baby: Romantic ($229).",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "Is it weird to send flowers to a friend?", a: "No — friends rarely receive flowers, which is exactly why it lands." }],
  },
  {
    slug: "new-baby-flowers-manhattan",
    audience: "family",
    title: "Flowers for a New Baby or New Mom in Manhattan",
    description: "Sending flowers for a new baby: hospital rules, when to deliver home instead, what to send and what to write to new parents.",
    answer:
      "Many Manhattan maternity wards limit or discourage flowers, and new parents go home within one to three days — so deliver to their home a few days after they're back. Choose a low-scent bouquet in soft colors. Write to the new mom, not just about the baby.",
    tier: "sweet",
    occasion: "new_baby",
    blocks: [
      {
        h2: "Hospital or home?",
        ul: [
          "Home, 3–7 days after birth, is almost always better: someone is there, and the flowers last.",
          "If you must send to a hospital, call the unit first — rules vary and change.",
          "Low scent only: newborns and recovering moms don't need strong lilies.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "Can I send flowers to a Manhattan maternity ward?", a: "Policies vary by hospital and unit. Call ahead; delivering home a few days later is more reliable." }],
  },
  {
    slug: "get-well-flowers-manhattan-hospital",
    audience: "logistics",
    title: "Get-Well Flowers to a Manhattan Hospital: Rules and Tips",
    description: "Sending get-well flowers to a hospital in Manhattan — which units don't allow flowers, what details the courier needs, and better alternatives.",
    answer:
      "ICUs, oncology, transplant and other immunocompromised units usually don't allow fresh flowers, so call the unit before ordering. For general wards, give the patient's full name, room number and the hospital's main address; deliveries go through the front desk or mailroom. If in doubt, send flowers home for when they're discharged.",
    tier: "sweet",
    occasion: "get_well",
    blocks: [
      {
        h2: "Before you order",
        ul: [
          "Call the unit: many ICU, oncology and transplant floors ban fresh flowers.",
          "Have the patient's full legal name and room number.",
          "Low-scent flowers only — strong scents bother shared rooms.",
          "Discharged soon? Deliver home instead.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "Do you deliver to hospitals in Manhattan?", a: "Yes, to hospitals that accept flower deliveries. Include the patient name, room number and unit in the delivery notes." }],
  },
  {
    slug: "sympathy-flowers-manhattan",
    audience: "family",
    title: "Sympathy Flowers in Manhattan: What to Send and What to Write",
    description: "How to send sympathy flowers to a home in Manhattan — appropriate colors, timing, and short card messages for someone who is grieving.",
    answer:
      "For sympathy, send a calm white and green arrangement to the family's home rather than the funeral home, a few days after the loss when the first wave of support has passed. Keep the card short and personal: name the person who died, or simply say you're thinking of them.",
    tier: "sweet",
    occasion: "sympathy",
    blocks: [
      {
        h2: "Guidance",
        ul: [
          "Colors: white, cream and green — quiet, not festive.",
          "Timing: a few days to a week after the loss; flowers later in the month are remembered.",
          "Where: the family's home. For services, ask the funeral home about their delivery rules first.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "What should I write on a sympathy card with flowers?", a: "Keep it short: \"Thinking of you and your family.\" or \"With love, and with you in this.\" Mentioning the person who died by name is often appreciated." }],
  },
  {
    slug: "thank-you-flowers",
    audience: "anyone",
    title: "Thank-You Flowers: When They're Worth It and What to Write",
    description: "When thank-you flowers are the right gesture — hosts, mentors, coworkers, family — what to send, and thank-you card messages that sound genuine.",
    answer:
      "Thank-you flowers are worth it when someone gave you time, not just a favor: hosting you, mentoring you, helping through a move or a crisis. A $119 seasonal bouquet with a specific two-line card is right for almost every case. Name exactly what they did.",
    tier: "sweet",
    occasion: "thank_you",
    blocks: [
      {
        h2: "Good reasons to say thank you with flowers",
        ul: [
          "A weekend at someone's place, or a dinner they hosted.",
          "A mentor or boss who went out of their way.",
          "A friend who helped you move, or showed up when it mattered.",
          "Your parents, for no single reason at all.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "How much should thank-you flowers cost?", a: "$119 is right for most thank-yous. Go bigger only for something truly significant." }],
  },
  {
    slug: "flowers-to-a-manhattan-hotel",
    audience: "logistics",
    title: "How to Send Flowers to a Hotel in Manhattan",
    description: "Sending flowers to someone staying in a Manhattan hotel: the details you need, timing around check-in, and how to make sure they reach the room.",
    answer:
      "To send flowers to a Manhattan hotel, give the hotel name and street address, the guest's name exactly as on the reservation, and their check-in date. Deliver after check-in day starts so the front desk can match the guest. Most hotels hold flowers at the front desk or bring them to the room.",
    tier: "sweet",
    occasion: "romantic",
    blocks: [
      {
        h2: "Checklist",
        ul: [
          "Hotel name + street address + ZIP.",
          "Guest name as booked (and the booking name if different).",
          "Arrival date — never deliver before the guest is registered.",
          "The guest's mobile number.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "Will the hotel accept flowers before check-in?", a: "Some will hold them; many won't match a guest before arrival. Deliver on or after the check-in date." }],
  },
  {
    slug: "flower-delivery-nyc-apartment-doorman",
    audience: "logistics",
    title: "Flower Delivery to a NYC Apartment: Doormen, Walk-ups and Buzzers",
    description: "How flower delivery works for Manhattan apartments — doorman buildings, walk-ups, buzzers, and the details that prevent a failed delivery.",
    answer:
      "Most failed flower deliveries in Manhattan are building problems, not florist problems. Always give the apartment number, the recipient's phone and a note on access: doorman (leave with the front desk), walk-up (buzzer name) or office (floor and company). With a phone number, the courier can call when no one answers.",
    tier: "sweet",
    occasion: "just_because",
    blocks: [
      {
        h2: "By building type",
        ul: [
          "Doorman / concierge: the doorman signs and holds them; tell the recipient so they ask at the desk.",
          "Walk-up: buzzer name and apartment; the courier calls the recipient's phone if no answer.",
          "Office: company name, floor, and reception hours.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "What happens if nobody is home?", a: "The courier calls the recipient. If they can't deliver, we reschedule with you at no cost when the address was correct." }],
  },
  {
    slug: "graduation-flowers-nyc",
    audience: "family",
    title: "Graduation Flowers in NYC: Timing and What to Send",
    description: "Sending graduation flowers in Manhattan — Columbia, NYU, The New School and more — when to deliver, and what to write.",
    answer:
      "Commencement venues don't accept flower deliveries, so send graduation flowers to the graduate's apartment the day before or the evening after the ceremony. A bright Sweet bouquet ($119) works for friends and siblings; parents and partners often choose Romantic ($229).",
    tier: "sweet",
    occasion: "congratulations",
    blocks: [
      {
        h2: "Timing",
        ul: [
          "Day before commencement: the flowers are there for photos.",
          "Evening after: a quiet congratulations once the crowds are gone.",
          "Never to the ceremony venue — couriers can't reach a graduate in a crowd.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "Can you deliver to a dorm?", a: "Many university residence halls only accept packages through a mailroom. Use the graduate's mailroom address and phone, or a private apartment." }],
  },
  {
    slug: "flowers-after-a-first-date",
    audience: "partner",
    title: "Should You Send Flowers After a First Date?",
    description: "Is sending flowers after a first date romantic or too much? When it works, what to send, and what to write so it feels light, not intense.",
    answer:
      "After a first date, flowers work only if the date went clearly well and you keep it small: a modest seasonal bouquet, no red roses, and a light, specific card that references the date. Send them the next day or two, not that night.",
    tier: "sweet",
    occasion: "new_relationship",
    blocks: [
      {
        h2: "Rules of thumb",
        ul: [
          "Small and seasonal — Sweet ($119).",
          "No red roses yet.",
          "Reference something from the date: \"Still thinking about that terrible jazz bar.\"",
          "Only send to an address she's given you.",
        ],
      },
      { p: [ORDER] },
    ],
    faq: [{ q: "Are flowers after a first date too much?", a: "Not if they're small and the card is light. A huge bouquet can feel intense — save that for later." }],
  },
];
