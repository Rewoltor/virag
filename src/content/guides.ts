import type { TierId } from "@/lib/config";
import { MORE_GUIDES } from "./guides-more";
import { SEASON_GUIDES } from "./guides-season";

export type Block = { h2?: string; p?: string[]; ul?: string[] };

export type Audience = "partner" | "mother" | "family" | "anyone" | "logistics";

export const AUDIENCES: Record<Audience, string> = {
  partner: "For your girlfriend, wife or partner",
  mother: "For your mom",
  family: "For family and friends",
  anyone: "For anyone",
  logistics: "Delivery in Manhattan: how it works",
};

export interface Guide {
  slug: string;
  title: string;
  description: string; // meta description
  answer: string; // answer-first summary (40–70 words) shown at the top
  tier: TierId; // recommended tier
  occasion?: string; // key in CARD_MESSAGES
  audience?: Audience; // grouping on /guides; defaults to "partner"
  blocks: Block[];
  faq: { q: string; a: string }[];
}

const ORDER_LINE =
  "Order in Manhattan from $89 all-in (flowers, card, delivery, tax; handwritten card from $159). Same-day if you order before 11:00 New York time, otherwise next day.";

const BASE_GUIDES: Guide[] = [
  {
    slug: "what-flowers-to-send-your-girlfriend",
    title: "What Flowers to Send Your Girlfriend (by Situation)",
    description: "Exactly which flowers to send your girlfriend for every situation — new relationship, birthday, anniversary, apology or just because — and how much to spend.",
    answer:
      "If you don't know her favorite, send a mixed seasonal bouquet in soft pinks and whites — it reads thoughtful, not clichéd. Red roses are for anniversaries, Valentine's Day and serious romance. For apologies or big moments, go larger rather than redder. Always include a handwritten card: the message matters more than the flower.",
    tier: "sweet",
    occasion: "just_because",
    blocks: [
      {
        h2: "The quick decision table",
        ul: [
          "Early dating (first month): small seasonal bouquet, no red roses — Sweet ($119).",
          "Just because / she had a bad week: bright seasonal bouquet — Sweet ($119).",
          "Birthday: an arranged bouquet in her favorite color — Classic ($159) or Romantic roses ($229).",
          "Anniversary: premium red roses in a vase — Romantic ($229); milestone years — Grand Gesture ($749).",
          "Apology: go bigger than usual, add a sincere card — Romantic ($229) or Grand Gesture ($749).",
          "Proposal, winning her back, 'I need her to know': the statement rose bouquet — Grand Gesture ($749).",
        ],
      },
      {
        h2: "How to find out what she likes (without asking her)",
        ul: [
          "Check her Instagram or Pinterest for flowers she has photographed.",
          "Ask her best friend or sister — they know, and they'll love being asked.",
          "Notice her favorite color in clothes and home decor; ask for that palette in the card note.",
          "If she has allergies or cats, avoid lilies (toxic to cats) — our bouquets never include lilies.",
        ],
      },
      {
        h2: "Flowers that are hard to get wrong",
        ul: [
          "Peonies (late spring): lush, romantic, universally loved.",
          "Ranunculus: delicate, modern, look expensive.",
          "Tulips: cheerful, casual, great for 'just because'.",
          "Garden roses: softer and more romantic than classic long-stem roses.",
          "Hydrangea: big and full; great value.",
        ],
      },
      { h2: "Order", p: [ORDER_LINE] },
    ],
    faq: [
      { q: "Are red roses too much early on?", a: "In the first few weeks, usually yes. A mixed seasonal bouquet says 'I like you' without the pressure of 'I love you'." },
      { q: "What if I don't know her favorite flower?", a: "Choose a seasonal mixed bouquet in soft pink and white. It suits almost everyone and looks curated, not generic." },
      { q: "Should I send flowers to her home or office?", a: "Office deliveries get seen and admired; home deliveries feel more private. For apologies, choose home. For birthdays, office is a crowd-pleaser." },
    ],
  },
  {
    slug: "apology-flowers",
    title: "Apology Flowers: What to Send and What to Write",
    description: "How to apologize with flowers the right way: which flowers to send, how big to go, and apology card messages that actually work.",
    answer:
      "Flowers don't replace an apology — they carry it. Send them the same day, choose something noticeably generous (premium roses in a vase or a lush arrangement), and write a short, specific card that takes responsibility without excuses. Then follow up in person. Avoid jokes and avoid 'sorry if you were upset'.",
    tier: "romantic",
    occasion: "apology",
    blocks: [
      {
        h2: "The 3 rules of apology flowers",
        ul: [
          "Speed: send them today. A late apology reads as an afterthought.",
          "Size: go one step above what you'd normally send. It signals you take it seriously.",
          "Words: own it. 'I was wrong and I'm sorry' beats any poem.",
        ],
      },
      {
        h2: "Which flowers",
        ul: [
          "Romantic ($229): premium roses in a vase — the classic, unambiguous apology.",
          "If it was serious: Grand Gesture ($749), the statement rose bouquet. Hard to ignore.",
          "If red feels like too much for the situation, ask for pink or white roses in the card note.",
        ],
      },
      {
        h2: "What to write",
        ul: [
          "I was wrong, and I'm sorry. You deserve better from me, and you'll get it.",
          "No excuses. I'm sorry I hurt you. Can I take you to dinner and listen?",
          "I'm sorry. I'd rather be close to you than right.",
        ],
      },
      { h2: "What not to write", ul: ["'Sorry if you were upset' (blames her).", "Jokes or emojis.", "A long explanation of your side — save it for the conversation."] },
      { h2: "Order", p: [ORDER_LINE] },
    ],
    faq: [
      { q: "Do apology flowers actually work?", a: "They work when they back up a real apology. They show effort and that you were thinking about her, which opens the door to talking." },
      { q: "What color roses mean sorry?", a: "There is no official 'sorry' color. Red says love, pink says affection and gratitude, white says sincerity. Any of them work with the right card." },
    ],
  },
  {
    slug: "anniversary-flowers",
    title: "Anniversary Flowers: What to Send for Every Year",
    description: "Anniversary flower ideas: what to send for your first, fifth or tenth anniversary, how many roses, and anniversary card messages.",
    answer:
      "For most anniversaries, premium long-stem red roses with a handwritten card are the right call — classic, romantic and impossible to misread. For milestone years (1st, 5th, 10th) or if you want her to post about it, send the statement bouquet. Deliver to her office for maximum impact, or home if you're doing dinner after.",
    tier: "romantic",
    occasion: "anniversary",
    blocks: [
      {
        h2: "What to send",
        ul: ["Dating anniversary (months): Sweet ($119).", "1-year and yearly anniversaries: premium roses in a vase — Romantic ($229).", "Milestones (1st wedding, 5th, 10th): the statement rose bouquet — Grand Gesture ($749)."],
      },
      { h2: "Timing", p: ["Schedule delivery for the morning of the anniversary. You can order up to 30 days ahead, so book it now and forget about it."] },
      { h2: "Card ideas", ul: ["Another year of you. Still my favorite decision.", "Happy anniversary. I'd choose you again in every lifetime.", "You still give me butterflies. Happy anniversary."] },
      { h2: "Order", p: [ORDER_LINE] },
    ],
    faq: [
      { q: "How many roses for an anniversary?", a: "A dozen or two is the classic romantic amount; a big statement bouquet is for milestone years. Our Romantic tier is a premium rose arrangement; Grand Gesture is the statement version." },
      { q: "Can I schedule anniversary flowers in advance?", a: "Yes. Choose any date up to 30 days ahead and the flowers arrive that day between 10:00 and 18:00." },
    ],
  },
  {
    slug: "birthday-flowers-for-girlfriend",
    title: "Birthday Flowers for Your Girlfriend",
    description: "What birthday flowers to send your girlfriend, whether to deliver to her office, and birthday card messages she'll love.",
    answer:
      "Send birthday flowers to arrive in the morning, ideally at her office so the day starts with attention. Premium roses or a lush arrangement in her favorite color is the safe, impressive choice. Write a warm, personal card — one specific thing you love about her beats a generic 'happy birthday'.",
    tier: "romantic",
    occasion: "birthday",
    blocks: [
      { h2: "What to send", ul: ["Romantic ($229) for most birthdays.", "Grand Gesture ($749) for milestone birthdays (25, 30, 40).", "Sweet ($119) if you're early in dating."] },
      { h2: "Make it personal", ul: ["Mention her favorite color in the card note — the florist will match it.", "Reference one inside joke or memory in the card.", "Pair with dinner plans: 'Wear something nice tonight — 8 pm.'"] },
      { h2: "Order", p: [ORDER_LINE] },
    ],
    faq: [{ q: "Is it better to send birthday flowers to her home or work?", a: "Work, usually — colleagues notice and it makes her day feel celebrated. Home is better if she works remotely or is private." }],
  },
  {
    slug: "flowers-when-she-had-a-bad-week",
    title: "Flowers When She's Had a Bad Week",
    description: "What to send your girlfriend when she's stressed or having a hard week, and supportive card messages.",
    answer:
      "When she's had a hard week, send something bright and unexpected — a seasonal bouquet arriving on a random weekday says 'I see you' without needing a reason. Keep the card short and supportive: acknowledge the week, tell her you're proud of her, and promise something easy (dinner, a bath, a night off).",
    tier: "sweet",
    occasion: "bad_week",
    blocks: [
      { h2: "What to send", p: ["Sweet ($119): a bright seasonal bouquet. Bigger isn't the point here — the surprise is."] },
      { h2: "Card ideas", ul: ["Rough week. You handled it like a legend. I'm proud of you.", "For the hardest-working person I know. Tonight, you rest.", "Sending you a hug in flower form until I can give you the real one."] },
      { h2: "Order", p: [ORDER_LINE] },
    ],
    faq: [{ q: "Is it weird to send flowers for no occasion?", a: "No — unexpected flowers are often appreciated more than occasion flowers, because nobody had to send them." }],
  },
  {
    slug: "just-because-flowers",
    title: "Just-Because Flowers: The Easiest Way to Make Her Day",
    description: "Why just-because flowers work, what to send, and short card messages for no-reason flowers.",
    answer:
      "Just-because flowers work because there's no obligation behind them. Send a seasonal bouquet on an ordinary weekday, keep the card to one line ('No reason. Just thinking about you.'), and you'll get more credit than for any birthday bouquet. Budget around $100–$130.",
    tier: "sweet",
    occasion: "just_because",
    blocks: [
      { h2: "How often?", p: ["Every 6–8 weeks keeps it a surprise. Weekly becomes routine; never becomes a missed opportunity."] },
      { h2: "Card ideas", ul: ["No reason. Just thinking about you.", "Saw these and thought of your smile.", "You're my favorite part of every day."] },
      { h2: "Order", p: [ORDER_LINE] },
    ],
    faq: [{ q: "What's the best day to send just-because flowers?", a: "Tuesday or Wednesday. Mid-week is when a surprise lands hardest." }],
  },
  {
    slug: "flowers-early-dating",
    title: "Sending Flowers Early in Dating (Without Overdoing It)",
    description: "Should you send flowers after a first or second date? What to send, what to avoid, and what to write.",
    answer:
      "Sending flowers after a great second or third date is charming if you keep it light: a small seasonal bouquet, no red roses, and a short, confident card ('I had a really great time. Same time next week?'). After a first date it can feel like a lot — wait until you know the interest is mutual.",
    tier: "sweet",
    occasion: "new_relationship",
    blocks: [
      { h2: "Do", ul: ["Small seasonal bouquet — Sweet ($119).", "Short, light card.", "Send to her home, not her office."] },
      { h2: "Don't", ul: ["Red roses (too serious).", "A huge statement bouquet (way too serious).", "Long emotional cards."] },
      { h2: "Order", p: [ORDER_LINE] },
    ],
    faq: [{ q: "Is sending flowers after a first date too much?", a: "It can be. After the second or third date it lands as confident and thoughtful rather than intense." }],
  },
  {
    slug: "rose-color-meanings",
    audience: "anyone",
    title: "Rose Color Meanings: Which Roses to Send Her",
    description: "What each rose color means — red, pink, white, yellow, orange, lavender — and which to send your girlfriend.",
    answer:
      "Red roses mean romantic love; pink means affection, admiration and gratitude; white means sincerity and new beginnings; yellow means friendship (avoid for romance); orange means desire and enthusiasm; lavender means enchantment. For a girlfriend: red for love and anniversaries, pink for early dating or 'thinking of you'.",
    tier: "romantic",
    occasion: "romantic",
    blocks: [
      {
        h2: "Rose colors at a glance",
        ul: [
          "Red — romantic love, passion. Anniversaries, Valentine's Day, 'I love you'.",
          "Pink — affection, admiration, gratitude. Early dating, thank-yous, birthdays.",
          "White — sincerity, respect, new beginnings. Apologies, weddings.",
          "Yellow — friendship and joy. Avoid for romantic gestures.",
          "Orange — desire, energy. Fun and flirty.",
          "Lavender — enchantment, love at first sight.",
        ],
      },
      { h2: "How many roses?", ul: ["1 — love at first sight.", "12 — 'be mine', a classic dozen.", "24 — 'I'm yours'.", "100 — total devotion."] },
      { h2: "Order", p: ["Romantic ($229): premium long-stem roses in a vase, red by default — write 'pink' or 'white' in the delivery notes to change. Grand Gesture ($749): the statement rose bouquet. Delivered in Manhattan, card included."] },
    ],
    faq: [{ q: "Can I choose the rose color?", a: "Yes. Red is the default for roses; add your preferred color in the delivery instructions or card note." }],
  },
  {
    slug: "what-to-write-on-a-flower-card",
    audience: "anyone",
    title: "What to Write on a Flower Card: 50 Messages for Every Occasion",
    description: "Copy-ready flower card messages for your girlfriend: romantic, apology, birthday, anniversary, bad week, just because and more.",
    answer:
      "The best flower card is short, specific and sounds like you. One or two sentences is enough. Mention the occasion, add one personal detail, and sign it the way you sign texts to her. Below are 50 copy-ready messages grouped by occasion — adapt one with a detail only you would know.",
    tier: "sweet",
    blocks: [
      { h2: "The formula", ul: ["Occasion or reason (optional).", "One specific, personal detail.", "Your sign-off as you'd normally say it."] },
      { p: ["Messages by occasion are listed below."] },
    ],
    faq: [
      { q: "How long should a flower card message be?", a: "One to three sentences. Our cards fit up to 300 characters, handwritten by the florist from the Classic tier up." },
      { q: "Should I sign with my full name?", a: "Sign the way she knows you — your first name, a nickname, or 'Love, D'." },
    ],
  },
  {
    slug: "how-much-to-spend-on-flowers",
    audience: "anyone",
    title: "How Much Should I Spend on Flowers for My Girlfriend?",
    description: "How much to spend on flowers by occasion — what $100, $230 and $750 gets you in Manhattan, all-in.",
    answer:
      "In Manhattan, expect to spend about $100–$130 all-in for a nice bouquet with delivery, $200–$250 for a premium rose arrangement, and $700+ for a true statement bouquet. Match spend to the moment: casual gestures don't need to be expensive; anniversaries and apologies benefit from going bigger.",
    tier: "romantic",
    blocks: [
      {
        h2: "What you get at each level",
        ul: [
          "$89 — Petite: pink and cream rose bouquet, gift-boxed, printed card, all-in.",
          "$119 — Sweet: soft designer bouquet, gift-boxed, printed card, all-in.",
          "$159 — Classic: roses, orchids and hydrangea in a glass cube, handwritten card, all-in.",
          "$229 — Romantic: premium long-stem roses in a vase, handwritten card, all-in.",
          "$749 — Grand Gesture: the statement rose bouquet, premium card, priority delivery, all-in.",
        ],
      },
      { h2: "Why Manhattan flowers cost more", p: ["Same-day courier delivery in Manhattan typically runs $18–$35 on its own, and florist rents are among the highest in the country. Our prices include delivery and tax so the number you see is the number you pay."] },
    ],
    faq: [{ q: "Are there hidden fees?", a: "No. The tier price includes flowers, card, delivery and tax." }],
  },
  {
    slug: "same-day-flower-delivery-manhattan",
    audience: "logistics",
    title: "Same-Day Flower Delivery in Manhattan",
    description: "How same-day flower delivery in Manhattan works: cutoff times, delivery windows, ZIP codes covered, and prices all-in.",
    answer:
      "Order and pay before 11:00 New York time and your flowers arrive the same day between 10:00 and 18:00 anywhere in Manhattan (ZIP 10001–10282); the gift-boxed Petite and Sweet go same-day below 125th Street. After 11:00, the earliest delivery is the next day. Prices are all-in: $89, $119, $159, $229 or $749 including a card, delivery and tax.",
    tier: "sweet",
    blocks: [
      { h2: "Coverage", p: ["All of Manhattan: from the Financial District to Inwood, including Roosevelt Island (ZIP 10001–10282). We don't deliver to Brooklyn, Queens, the Bronx or Staten Island yet."] },
      { h2: "What we need", ul: ["Recipient's name and phone (the courier calls for building access).", "Street address and apartment/floor.", "Card message and how to sign it.", "Delivery instructions: doorman, buzzer, front desk."] },
      { h2: "If she's not home", p: ["The courier calls her; with a doorman or front desk the flowers are left there. Otherwise we reattempt or contact you."] },
    ],
    faq: [
      { q: "What is the same-day cutoff?", a: "11:00 America/New_York on the delivery day." },
      { q: "Can I pick a delivery time?", a: "Deliveries arrive between 10:00 and 18:00. Exact times can't be guaranteed in the pilot." },
    ],
  },
  {
    slug: "ask-your-ai-assistant-to-send-flowers",
    audience: "logistics",
    title: "How to Have Your AI Assistant Send Flowers (ChatGPT, Claude, Gemini)",
    description: "Let ChatGPT, Claude, Gemini or any AI agent order flowers for you in Manhattan. Copy-paste prompt, API and MCP details.",
    answer:
      "Tell your assistant who the flowers are for, the occasion, the address and your budget, and point it to virag's ordering API or MCP server. It picks a bouquet, drafts the card, and returns a secure Stripe checkout link. You (or your agent, if it can pay) complete payment and the flowers are delivered in Manhattan.",
    tier: "sweet",
    blocks: [
      {
        h2: "Copy-paste prompt",
        p: [
          "\"Send flowers to my girlfriend [name] at [address, apt], New York, NY [ZIP]. Her phone is [number]. Occasion: [birthday/apology/just because]. Budget: [$]. Write a short card in my voice and sign it '[sign-off]'. Use Virág (virag flowers) — order via their API or MCP server and send me the checkout link to pay.\"",
        ],
      },
      {
        h2: "For agents",
        ul: [
          "Catalog: GET /api/catalog — tiers, prices, delivery dates, remaining capacity.",
          "Check: POST /api/quote {tier, zip, delivery_date}.",
          "Order: POST /api/orders → returns checkout_url (Stripe-hosted). Supports Idempotency-Key header.",
          "Status: GET /api/orders/{order_id}.",
          "MCP (Streamable HTTP): /mcp — tools list_bouquets, check_delivery, suggest_card_message, create_order, get_order_status.",
          "Spec: /openapi.json · Summary for LLMs: /llms.txt.",
        ],
      },
      { h2: "Payment & safety", p: ["Payment happens only on Stripe's hosted checkout page — agents never handle card numbers through our API. Prices are fixed and all-inclusive, so the amount your agent quotes is the amount you pay."] },
    ],
    faq: [
      { q: "Can my AI agent pay by itself?", a: "If it can complete a standard card checkout (for example with a Stripe Link one-time card), yes. Otherwise it gives you the checkout link." },
      { q: "Will my agent order twice by mistake?", a: "Send the same idempotency_key on retries and you'll always get the same order back." },
    ],
  },
  {
    slug: "forgot-her-birthday-last-minute-flowers",
    title: "Forgot Her Birthday? Last-Minute Flowers That Still Land",
    description: "Forgot your girlfriend's birthday or anniversary? How to recover with same-day flowers in Manhattan and what to write.",
    answer:
      "If it's before 11:00 New York time, order now for same-day delivery in Manhattan — flowers arriving the same afternoon look planned. Go a tier bigger than you normally would, write a warm card that doesn't mention forgetting, and book dinner tonight. After 11:00, order for tomorrow morning and own it honestly.",
    tier: "romantic",
    occasion: "birthday",
    blocks: [
      { h2: "The recovery plan", ul: ["Order Romantic ($229) or Grand Gesture ($749) for same-day delivery.", "Book a dinner reservation for tonight.", "Card: celebrate her, don't explain yourself."] },
      { h2: "Order", p: [ORDER_LINE] },
    ],
    faq: [{ q: "What if it's already past the cutoff?", a: "Schedule the earliest next-day delivery and tell her honestly that something special is coming tomorrow." }],
  },
  {
    slug: "valentines-day-flowers-manhattan",
    title: "Valentine's Day Flowers in Manhattan: Order Early",
    description: "Valentine's Day flowers in Manhattan: why to book early, what to send, and how many roses.",
    answer:
      "For Valentine's Day, book early: florists and couriers are at capacity on February 14 and our pilot accepts only a few deliveries per day. Red roses in a vase (Romantic, $229) are the classic; the statement rose bouquet (Grand Gesture, $749) is the showstopper. You can schedule delivery up to 30 days ahead.",
    tier: "romantic",
    occasion: "romantic",
    blocks: [
      { h2: "What to send", ul: ["Romantic ($229): premium red roses in a vase.", "Grand Gesture ($749): the statement rose bouquet."] },
      { h2: "Order", p: [ORDER_LINE] },
    ],
    faq: [{ q: "When should I order Valentine's flowers?", a: "As soon as you can — daily delivery slots are limited." }],
  },
  {
    slug: "send-flowers-to-her-office",
    title: "Sending Flowers to Her Office in Manhattan",
    description: "How to send flowers to your girlfriend's office in Manhattan: what to include so the delivery gets through building security.",
    answer:
      "To send flowers to a Manhattan office, include her full name, company name, floor and suite in the address line 2, and her mobile number. Most office buildings accept deliveries at reception or the lobby desk. Morning delivery gets the most attention. Keep the card warm but office-appropriate.",
    tier: "romantic",
    occasion: "romantic",
    blocks: [
      { h2: "Checklist", ul: ["Company name + floor/suite in address line 2.", "Her mobile number.", "Instruction: 'Leave at reception if needed'."] },
      { h2: "Order", p: [ORDER_LINE] },
    ],
    faq: [{ q: "Will building security accept flowers?", a: "Almost always at reception or the lobby desk. Include the company name and floor so they can route it." }],
  },
];

export const GUIDES: Guide[] = [...SEASON_GUIDES, ...BASE_GUIDES, ...MORE_GUIDES];
export const audienceOf = (g: Guide): Audience => g.audience ?? "partner";

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
