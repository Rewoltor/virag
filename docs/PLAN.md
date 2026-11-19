# Virág — Pilot Plan (v0.1, 2026-11-19)

**Agreed 2026-11-19:** Manhattan only · $119 / $229 / $749 · owner in CET (next-day default, same-day before 11:00 ET).

**Goal:** test whether AI agents (and the people behind them) will buy flowers from a site built for agents.
**Not the goal:** build a marketplace. Fulfilment is manual (concierge). Max 20 paid orders.

---

## 1. Decisions (proposed)

| Topic | Decision | Why |
|---|---|---|
| Market | **Manhattan only** (ZIP 10001–10282), Brooklyn as optional add-on | NY has the highest per-capita Claude usage of any state (2.68x); densest florist + courier supply; florists deliver themselves. Palo Alto is suburban and low-volume → vetoed. SF = city #2 if pilot works. |
| Fulfilment | Owner re-orders from a partner florist's own site/phone, florist delivers | No Uber needed. Florists include delivery + card. Uber Direct (~$8 + $5 NYC surcharge) only as backup. |
| Delivery window | **Next-day default**, same-day if paid before 11:00 ET | Florist cutoffs are 12–1 PM ET; gives buffer for manual handling across time zones. |
| Order cap | **20 paid orders total + 4/day** (both configurable) | Keep the 20. The daily cap protects against a single spike you can't fulfil. |
| Sold-out behaviour | Site + API stay live, return `sold_out`, **log full intent** (tier, ZIP, date, agent type) and offer waitlist | This *is* the demand signal. |
| Payments | **Stripe Checkout (hosted)**, test → live | Works for humans, browser agents, and agents with Stripe Link wallet one-time cards. Never accept raw card data via our API (PCI). |
| Agent-native pay (phase 2) | Stripe Shared Payment Tokens / ACP | Still private preview; apply in parallel, don't block launch. |
| Notifications | **Telegram bot + email** | Signal has no bot API (needs signal-cli on an always-on server + a separate number). Not worth it for a pilot. |
| Stack | **Next.js on Vercel + Firestore** | SSR/static pages for GEO, API routes + MCP on same deploy, Firestore transaction for the atomic order counter. Scales to zero, ~$0/mo. |
| Analytics | **GA4 (humans) + server-side logging of every request (agents)** | Most agents/crawlers do **not** run JavaScript → GA4 alone misses them. Server logs classify user-agents (ChatGPT-User, OAI-SearchBot, Claude-User, PerplexityBot, …) and forward to GA4 via Measurement Protocol. |

## 2. Pricing (all-in: flowers + handwritten card + delivery)

| Tier | Price | What | Est. cost (flowers + delivery) | Stripe ~3% | Margin |
|---|---|---|---|---|---|
| **Sweet** | **$119** | Seasonal hand-tied bouquet, ~20 stems | ~$75 + $20 | $4 | ~$20 |
| **Romantic** | **$229** | Large arrangement or 2 dozen premium roses | ~$165 + $20 | $7 | ~$37 |
| **Grand Gesture** | **$749** | 100 long-stem roses / luxury box + upgraded card | ~$560 + $25 | $22 | ~$140 |

Market reference: Manhattan same-day delivery fees $18–$35; quality bouquets start ~$90–$110; luxury arrangements $250–$350+.
20 orders ≈ **$400–$1,200 gross margin.** This is a test budget, not a business. The real output is the data.

Add-ons (optional, v1.1): premium greeting card upgrade, chocolates. Keep v1 to 3 SKUs — fewer choices = easier for agents.

## 3. How agents will buy (surfaces)

Everything describes the same 3 SKUs and the same order flow.

1. **Plain HTML site** — server-rendered, works with JS off. Order form = simple POST → redirect to Stripe Checkout. Browser agents (ChatGPT agent, Claude in Chrome, Comet) can complete it.
2. **JSON API** + `/openapi.json`
   - `GET  /api/catalog` → tiers, prices, delivery zone, cutoffs, `orders_remaining`
   - `POST /api/quote` → validates ZIP + date
   - `POST /api/orders` (idempotency key) → returns `checkout_url` (agent pays or hands link to the human)
   - `GET  /api/orders/{id}` → status
3. **MCP server** at `/mcp` — tools: `list_bouquets`, `check_delivery`, `create_order`, `get_order_status`, `suggest_card_message`.
4. **`/llms.txt`** — one page: what we sell, where, prices, "to order: call X or POST Y".
5. **JSON-LD** on every page: `Florist`/`LocalBusiness`, `Product` + `Offer` (with `availability` flipping to `SoldOut`), `FAQPage`.

Agent-friendly details: deterministic prices, explicit cutoffs, clear error messages, idempotent order creation, recipient phone required (for building access).

## 4. GEO content (launch with ~15 pages, answer-first, specific)

Hub: *"Flowers for your girlfriend — Manhattan delivery, ordered by you or your AI assistant."*
- What flowers to send your girlfriend (by situation)
- Apology flowers: what to send + what to write
- Anniversary / birthday / first-date / "just because" / she had a bad week / congratulations / get well
- Roses: what each color means (and which to avoid)
- What to write on the card — 50 ready messages by situation
- How much should I spend on flowers? (maps to the 3 tiers)
- Same-day flower delivery Manhattan: cutoffs, how it works
- How to have your AI assistant send flowers (ChatGPT, Claude, Gemini) — instructions + copy-paste prompt
- Forgot her birthday? last-minute guide
- FAQ (substitutions, delivery failures, refunds)

Distribution (GEO alone is slow — weeks to months to be indexed/cited):
- Google Search Console + **Bing Webmaster Tools** (ChatGPT search leans on Bing) + IndexNow
- Submit MCP server to the official MCP Registry + Smithery/other directories
- Seed posts (Reddit/X/HN): "I let my AI agent order flowers for my girlfriend" — drives the humans who instruct agents

## 5. Tracking & success criteria

Logged per event (Firestore + GA4): `page_view`, `agent_visit` (by agent family), `catalog_fetch`, `mcp_tool_call`, `quote`, `order_created`, `checkout_completed`, `order_blocked_sold_out`, `waitlist_signup`. Each tagged `channel = human | browser_agent | api_agent | mcp_agent | crawler`.

Simple `/admin` page (password) showing the funnel + blocked attempts.

**Decide before launch (30-day window):**
- ≥ 300 agent visits (non-crawler) → discovery works
- ≥ 30 order intents (paid + blocked) → demand exists
- ≥ 5 paid orders initiated by an agent → worth building v2

## 6. Fulfilment SOP (manual)

1. Telegram ping: tier, recipient, address, phone, delivery date, card text, paid amount.
2. Place order on partner florist's site (primary + backup), paste card text, pay with own card.
3. Mark order `placed` in `/admin` → optional email to buyer.
4. Mark `delivered` when florist confirms.
5. Failure → full refund in Stripe, apology email.

Florist shortlist to verify (call/test-order before launch): Ode à la Rose (all Manhattan, ~$18 delivery), UrbanStems (cheaper, national), 1–2 independent Manhattan florists for Grand Gesture tier.

## 7. Risks

- **No traffic** (biggest risk). Agents won't find a brand-new domain quickly. Mitigation: seeding + MCP directories + content.
- **Agents stop at payment** and hand off to the human — expected. Hosted checkout link handles it; we measure both.
- **Quality variance** across florists → describe bouquets as "florist's choice in X palette", allow substitutions.
- **Time zone** if you're not in New York → next-day default + 11:00 ET same-day cutoff.
- **Legal/tax** — deferred per your call. Minimum: terms + refund policy page, Stripe live-mode business info.

## 8. Build order (after questions answered)

1. Repo scaffold (Next.js, Vercel, Firestore, env)
2. Catalog + order flow + Stripe Checkout + webhook + atomic counter + caps
3. Telegram + email notifications
4. Agent surfaces: API, OpenAPI, MCP, llms.txt, JSON-LD
5. Logging/agent classification + GA4 + admin funnel
6. GEO content pages
7. Test-mode end-to-end order (by me, as an agent) → go live

## Sources
- Claude usage by state: https://www.visualcapitalist.com/mapped-where-americans-use-claude-ai-the-most/
- Microsoft AI diffusion by metro (Q1 2026): https://www.microsoft.com/en-us/research/wp-content/uploads/2026/05/Microsoft-US-AI-Diffusion-Report-2026-Q1.pdf
- Stripe Link agent wallet: https://docs.stripe.com/agentic-commerce/link-agent-wallet/use-link-wallet-pay-online , https://techcrunch.com/2026/04/30/stripe-link-digital-wallet-ai-agents-shopping/
- Shared Payment Tokens (preview): https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens
- ChatGPT Instant Checkout scaled back (Mar 2026): https://rye.com/blog/openai-chatgpt-checkout-agentic-commerce
- Uber Direct pricing / NYC surcharge: https://merchants.ubereats.com/us/en/services/uber-direct/ , https://www.uber.com/us/en/legal/uber-direct-shopify-order-form/
- NYC florist prices/fees: https://www.odealarose.com/faq/faq-nyc , https://tjflowersandevents.com/blogs/tj-flowers-blog/nyc-flower-arrangement-cost-price-guide , https://www.floom.com/us/florists/manhattan/bouquets-flower-shop
- GEO practices: https://helloretail.com/en/blog/geo-for-ecommerce-guide/
