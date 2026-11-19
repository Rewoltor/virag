# Virág

Flower ordering built for AI agents. Pilot to test demand: Manhattan only, 3 price tiers ($119 / $229 / $749 all-in), max 20 paid orders, manual fulfilment.

- Plan & decisions: [docs/PLAN.md](docs/PLAN.md)
- Original idea: [docs/idea.md](docs/idea.md)
- Promotion kit: [docs/PROMOTION.md](docs/PROMOTION.md)

## Stack
Next.js 16 on Vercel · Firestore (`virag-a96a6`, us-east4) · Stripe Checkout · Telegram bot · server-side agent tracking + GA4 · MCP server.

## Surfaces
| Path | For |
|---|---|
| `/`, `/order`, `/guides/*`, `/faq` | Humans + browser agents (works without JS) |
| `GET /api/catalog`, `POST /api/quote`, `POST /api/orders`, `GET /api/orders/{id}`, `POST /api/waitlist` | API agents |
| `/mcp` | MCP clients (Streamable HTTP) |
| `/llms.txt`, `/openapi.json`, `/.well-known/mcp.json`, `/sitemap.xml` | Discovery |
| `/admin` | Owner dashboard: funnel, agent traffic, blocked intents, orders (Basic auth, `ADMIN_PASSWORD`) |
| `POST /api/stripe/webhook` | Stripe → marks paid / expired, sends Telegram |

## Order flow
`POST /api/orders` → validates (Manhattan ZIP, date, caps) → reserves a slot in a Firestore transaction → creates Stripe Checkout (30 min) → returns `checkout_url`.
Webhook `checkout.session.completed` → `paid` → Telegram message with all fulfilment details. Expired checkouts free the slot.
Caps: `MAX_ORDERS` total, `MAX_ORDERS_PER_DAY` per delivery date. Over cap → `sold_out` / `date_full`, logged as a demand signal.

## Local dev
```bash
npm install
cp .env.example .env.local   # fill in; Firestore key can live in .secrets/firebase-admin.json
npm run dev
node scripts/recent-events.mjs   # last 25 tracked events
```
