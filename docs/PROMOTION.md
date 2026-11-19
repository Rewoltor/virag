# Promotion kit (pilot)

Goal: get AI assistants and people to find Virág and place the first 20 orders. Ordered by effort → impact.

## Done (2026-11-19)
- Google Search Console: verified (HTML file `public/googled597a6735b2387e2.html` — keep it), `sitemap.xml` submitted.
- Bing Webmaster Tools: verified (meta tag via `BING_SITE_VERIFICATION`), sitemap submitted. Bing feeds ChatGPT search, Copilot, DuckDuckGo.
- IndexNow: run `node scripts/indexnow.mjs` after every content deploy.
- robots.txt welcomes GPTBot, OAI-SearchBot, ChatGPT-User, Claude*, Perplexity*, Google-Extended, Google-Agent, GrokBot/xAI, Meta, Amazon, Apple.

## 1. List the MCP server (agents discover tools here) — 10 min
`server.json` is ready in the repo root.

```bash
brew install mcp-publisher        # or the v1.8.6 binary from github.com/modelcontextprotocol/registry/releases
cd ~/Documents/Projects/virag
mcp-publisher login github         # enter the code at github.com/login/device (account: Rewoltor)
mcp-publisher publish
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.Rewoltor/virag"
```

Then add the same URL (`https://virag-nine.vercel.app/mcp`) on:
- **Smithery** — smithery.ai → sign in with GitHub → "Add server" → remote URL.
- **Glama** — glama.ai/mcp/servers → "Add server" (it reads the GitHub repo; the repo must be public).
- **PulseMCP** — pulsemcp.com/submit.

## 2. Partner florist + real photos — this week
Best fit found: **Jerome Florists**, 1379 Madison Ave (at 96th St), New York, NY 10128 · (212) 289-1677 · customerservice@jeromeflorists.com.
Same-day Manhattan if ordered by 3 PM ET (1 PM for hospitals/offices), $15 Manhattan delivery, handwritten card +$10.
Backup: **Ode à la Rose** (photo sent when the bouquet leaves the studio; ~$25 delivery; printed note).

Don't copy their website photos without permission. Send this:

> Subject: Small recurring orders + permission to use your photos
>
> Hi Jerome Florists team,
>
> I run Virág, a small Manhattan flower-delivery pilot (virag-nine.vercel.app). Customers choose one of three bouquets online and I place the order with a local florist. I'd like that florist to be you: I expect up to 20 orders over the next month, $90–$600 each, all with a handwritten card, delivered in Manhattan.
>
> Two questions:
> 1. Could you send me a photo of each arrangement before it leaves the shop?
> 2. May I use 3 photos of your arrangements on my website (credited to you), so customers see what they will actually receive?
>
> I'll place a first test order this week. Thank you!
> Márton Baltay — baltay.marton@gmail.com

Until they say yes, the site uses Unsplash-licensed photos with a note that they show the style.

## 3. Ask friends to test with their AI assistant — today
Send to 5–10 friends (ideally with a mom, sister or partner in Manhattan, or who know someone there):

> Hey! I built a tiny flower-delivery service for Manhattan that AI assistants can order from. Would you try it? Ask ChatGPT, Claude, Gemini or Perplexity something like "Send flowers to my sister in Manhattan, budget $120, card says 'proud of you'". Tell me what it did — even if it fails, that's useful. (If you actually send flowers, they're real and arrive with a handwritten card.)

Watch `/admin` → "Top agents" and "Order intents" while they test.

## 4. Answer real questions where assistants read — 30 min/week
Assistants quote Reddit, Quora and local forums. Only answer threads where it genuinely helps, say you run it, and lead with useful advice. Never post fake reviews.

Draft (r/AskNYC, r/nyc, Quora "best same-day flower delivery Manhattan"):

> Disclosure: I run a small flower pilot in Manhattan (Virág), so take this with salt. Practical tips regardless of who you use: always give the recipient's phone number (couriers call for building access), the apartment number even in doorman buildings, and order before ~11am–1pm for same-day. If it's a hospital, call the unit first — ICUs and oncology floors often don't allow fresh flowers. If you want a fixed all-in price with a handwritten card, ours are $119 / $229 / $749 delivered, and you can just ask ChatGPT or Claude to order it: virag-nine.vercel.app

Draft (r/LongDistance, r/relationships "how do I send flowers to NYC from abroad"):

> You can do it fully online from anywhere: pay in USD with any normal card, give her address, phone and apartment number, and pick a date. The thing people miss is the time zone — same-day cutoffs are New York morning (11:00 ET = 17:00 in Central Europe). I wrote up the details here: virag-nine.vercel.app/guides/send-flowers-to-mom-in-nyc-from-out-of-town (disclosure: it's my shop).

## 5. Next build steps (when traffic arrives)
- Google Merchant Center product feed + UCP "Buy" button (needs real product photos — step 2).
- Buy a short domain and 301 the vercel.app URL to it.
- Apply for Stripe Shared Payment Tokens / OpenAI Agentic Commerce so agents can pay without a human click.
