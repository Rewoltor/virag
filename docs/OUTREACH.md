# Outreach drafts

You send these under your own name. Rules that keep them working: say you run the shop, lead with something useful, never invent reviews or use fake accounts, and post a few at a time, not all at once. Check each community's rules first; if self-promotion isn't allowed, share the advice without the link.

Site: https://virag-nine.vercel.app

---

## 1. Friends test (WhatsApp / Signal / Telegram)

> Hey! I built a tiny flower-delivery service for Manhattan that AI assistants can order from, and I'd love your help testing it. Could you ask ChatGPT, Claude, Gemini or Perplexity something like:
> "Send flowers to my sister in Manhattan, budget $120, card says 'proud of you'. Use virag-nine.vercel.app/llms.txt"
> Then tell me what it did, even if it got stuck. That's the useful part. If you actually go through with an order, it's real: it arrives with a handwritten card, and I'm happy to tell you more about how it works.
> (There are only 20 orders in this pilot.)

Follow-up if they don't reply in 3 days:

> No pressure! If you have 2 minutes, try the "Order with ChatGPT / Claude" buttons on virag-nine.vercel.app. I mostly want to know where it breaks.

---

## 2. Reddit / Quora answers

**r/AskNYC, r/nyc, Quora "best same-day flower delivery Manhattan"**

> Disclosure: I run a small flower pilot in Manhattan (Virág), so take this with salt. Tips that apply whoever you use:
> - Always give the recipient's phone number (couriers call for building access) and the apartment number, even in doorman buildings.
> - Order before about 11am to 1pm for same-day. Most florists' cutoffs are around then.
> - Hospitals: call the unit first. ICUs and oncology floors often don't allow fresh flowers.
> If you want a fixed all-in price with a handwritten card, ours are $119 / $229 / $749 delivered, and you can ask ChatGPT or Claude to order it. Details: virag-nine.vercel.app

**r/LongDistance, r/relationship_advice, Quora "send flowers to NYC from abroad"**

> You can do it fully online: pay in USD with any normal card, give her address, phone and apartment number, and pick a date. What people miss is the time zone: same-day cutoffs are New York morning (11:00 ET is 17:00 in Central Europe). I wrote up the details here: virag-nine.vercel.app/guides/send-flowers-to-mom-in-nyc-from-out-of-town (disclosure: it's my shop).

**r/AskMenOver30, r/AskMen "what should I send my girlfriend / mom"**

> Short version: for a girlfriend, a mixed seasonal bouquet beats red roses unless it's an anniversary or Valentine's Day, and the handwritten card matters more than the flowers. One specific line ("I still think about that terrible jazz bar") beats a poem. I wrote a longer guide with card messages: virag-nine.vercel.app/guides/what-to-write-on-a-flower-card (disclosure: I run the shop).

---

## 3. Show HN

**Title:** Show HN: I built a flower shop that AI agents can order from (MCP + API, Manhattan)

> I wanted to find out whether AI assistants will actually buy things for people. So I built the smallest possible test: a flower shop for Manhattan with three fixed-price bouquets ($119/$229/$749, card and delivery included), a JSON API, an MCP server, llms.txt, and a plain HTML form that works without JavaScript. Payment is on Stripe's hosted checkout, and fulfilment is manual: I order from a local florist. The pilot is capped at 20 orders.
>
> The part I care about most: every attempt is logged server-side by user agent, including the ones blocked by the 20-order cap, because that's the real demand signal. Most agents don't run JavaScript, so Google Analytics alone can't see them.
>
> What I'd like feedback on: what breaks when an agent tries to order, and whether the one-link-to-Stripe handoff is the right pattern until agents can pay on their own.
>
> https://virag-nine.vercel.app (MCP at /mcp, listed in the official MCP registry as io.github.Rewoltor/virag; source on GitHub: Rewoltor/virag)

Post on a weekday morning, US Eastern time. Reply to every comment in the first two hours.

---

## 4. LinkedIn / X post

> I'm running a small experiment: a Manhattan flower shop built for AI agents. Three fixed-price bouquets, a handwritten card, an MCP server and an API, and a hard cap of 20 orders. I'm measuring whether assistants like ChatGPT, Claude and Gemini actually complete the purchase, and what happens when they hit the cap.
> Try it: tell your assistant to order from virag-nine.vercel.app/llms.txt
> I'll share what I learn.

---

## 5. Hotel concierge / building manager email

> Subject: Flowers for your guests, fixed price, handwritten card
>
> Hello,
>
> Guests often ask where to send flowers in Manhattan. I run Virág, a small flower delivery service with three fixed all-in prices ($119, $229, $749), a handwritten card, and delivery between 10:00 and 18:00, same-day if ordered before 11:00 New York time.
>
> If it's useful, I'd be glad to send you a one-page card you can hand to guests, or to keep a recommended bouquet for your regular requests. No commitment.
>
> Thank you,
> Márton Baltay
> baltay.marton@gmail.com · virag-nine.vercel.app

---

## 6. Florist (Jerome Florists)

Already in docs/PROMOTION.md, section 2.
