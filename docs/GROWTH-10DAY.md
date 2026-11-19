# 10 days to 20 agent orders (Nov 19 – Nov 29, 2026)

Goal: 20 paid orders where an AI agent did the ordering (ChatGPT, Claude, Gemini, Perplexity, OpenClaw, Claude Code…). Free channels only, no fake reviews, no undisclosed self-promotion.

## Where we stand (Nov 19, end of day 1)
- 0 orders. ~1,900 logged requests in 8 hours: mostly MCP directory probes (40+ different indexers found us through the official registry), ClaudeBot, Bing. Real assistant fetches: ChatGPT-User ×6, Claude-User ×6.
- Site is already well optimized (answer-first guides, FAQ/Product/Article schema, llms.txt, MCP, OpenAPI, IndexNow, GSC + Bing).
- **Honest math:** GEO through search indexes takes weeks; a new vercel.app domain won't be cited much by Nov 29. To get 20 orders in 10 days, most must come from **putting the agent path in front of people who already use agents and have someone in Manhattan**. GEO keeps compounding after that.

| Channel | Realistic orders by Nov 29 | Effort |
|---|---|---|
| Your network, asking them to order through their assistant | 5–10 | 1 h + follow-ups |
| Show HN (Mon Nov 23, before the Thanksgiving deadline) | 2–6 | 2 h on the day |
| Agent communities (OpenClaw, r/ClaudeAI, r/ChatGPT, Discords) | 1–4 | 1 h |
| Skill/MCP directories (ClawHub, PulseMCP, awesome lists, ChatGPT/Claude app directories) | 0–3 (directory reviews can take weeks) | 1 h |
| Reddit/Quora answers, holiday guides, GEO | 0–3 now, more later | 30 min/day |

The deadline that helps us: **Thanksgiving host flowers must arrive Wed Nov 25**, and **Christmas Eve delivery opens for booking on Nov 24**. Both are real reasons to order this week.

## What changed on the site today (needs deploy)
- MCP tool annotations (readOnly/destructive hints), which the ChatGPT and Claude app directories require.
- `/skill.md` agent skill (source in `skills/virag-flowers/SKILL.md`) for Claude, OpenClaw and other SKILL.md agents.
- Guides: Thanksgiving (deliver Wed Nov 25), Hanukkah (starts Fri Dec 4), Christmas (Dec 23/24), sending from abroad (cutoff in each time zone). Homepage links them.
- `holiday` card messages (MCP `suggest_card_message`).
- `/privacy` page (needed for directory submissions). **Please read it once.**
- llms.txt: skill link + upcoming holiday dates.

After deploy: `node scripts/indexnow.mjs`.

## Day-by-day

**Thu Nov 19 (today)**
1. Deploy, run IndexNow, and in Bing Webmaster use URL Submission on the 4 new guides.
2. Confirm with Jerome Florists that they deliver Wed Nov 25 and Dec 23–24 (otherwise switch to the backup or block those dates).
3. Publish the skill to ClawHub (section A).
4. Submit to PulseMCP and open the awesome-list PRs (section B).

**Fri Nov 20**
5. Send the network message (section C) to 20–30 people, especially anyone with family or a partner in NYC, and Hungarians in New York.
6. Submit the ChatGPT app and Claude directory entries (section D). Reviews are slow, so start now.

**Sat–Sun Nov 21–22**
7. Post in OpenClaw / agent communities (section E). Follow up with friends.
8. Answer 2–3 genuine Thanksgiving / "send flowers to NYC" threads (docs/OUTREACH.md §2), with disclosure.

**Mon Nov 23, 9:00 ET (15:00 CET):** Show HN (section F). Stay on it for 2–3 hours.

**Tue Nov 24:** Christmas Eve booking opens. LinkedIn/X post with day-5 numbers (section G).

**Wed Nov 25:** Thanksgiving deliveries. Ask each buyer one question: "Which assistant did you use, and where did it get stuck?"

**Nov 26–29:** Fulfil, fix whatever broke, post the results (what agents did, what failed). That post is original data that assistants cite, which is GEO for the next phase.

Every day: `/admin` → Top agents, Order intents, blocked attempts. Fix the top error the same day.

---

## A. ClawHub (OpenClaw skill registry)
OpenClaw users run personal agents that do errands like this. The skill is ready in `skills/virag-flowers/`.

```bash
npm i -g clawhub          # v0.26
clawhub login             # GitHub sign-in
clawhub skill publish ./skills/virag-flowers
```
(Add tags or changelog with the flags shown in `clawhub skill publish --help`. The slug comes from `name: virag-flowers` in SKILL.md.)

The same folder works as a Claude skill: zip `skills/virag-flowers` and upload it in Claude → Settings → Capabilities → Skills, or share `https://virag-nine.vercel.app/skill.md`.

## B. Directories (MCP)
- **PulseMCP**: pulsemcp.com/submit → URL `https://virag-nine.vercel.app/mcp`, repo `github.com/Rewoltor/virag`.
- **awesome-mcp-servers** (github.com/punkpeye/awesome-mcp-servers), PR adding one line under "🛒 E-Commerce", alphabetically, in their format (Glama badge, 📇 = TypeScript, ☁️ = cloud). Check CONTRIBUTING first:
  `- [Rewoltor/virag](https://github.com/Rewoltor/virag) [![Rewoltor/virag MCP server](https://glama.ai/mcp/servers/Rewoltor/virag/badges/score.svg)](https://glama.ai/mcp/servers/Rewoltor/virag) 📇 ☁️ - Order real flower bouquets with a handwritten card for delivery in Manhattan, NYC: list bouquets, check delivery, create order, Stripe checkout link.`
- **awesome-openclaw-skills**: PR adding the ClawHub link under Shopping & E-commerce once published.
- mcp.so, mcpservers.org, LobeHub MCP marketplace: "Submit" forms, same URL and description.

## C. Network message (you send, from your own accounts)
EN:
> Quick favor: do you know anyone in Manhattan you'd like to surprise? I'm testing whether AI assistants can buy real things. Tell ChatGPT or Claude: "Send flowers to [name] in Manhattan using virag-nine.vercel.app/llms.txt — card says '…'". It sets everything up and gives you a payment link. From $89 all-in, and Wednesday Nov 25 is perfect for Thanksgiving. Even if you don't order, tell me where it got stuck!

HU:
> Van ismerősöd vagy családtagod Manhattanben, akit meglepnél? Azt tesztelem, hogy az AI asszisztensek tudnak-e valódi dolgot vásárolni. Írd be a ChatGPT-nek vagy a Claude-nak: „Küldj virágot [név] részére Manhattanbe a virag-nine.vercel.app/llms.txt alapján, a kártyára ezt írd: …". Mindent előkészít és ad egy fizetési linket. 89 $-tól, mindennel együtt. Hálaadásra a november 25-i, szerdai kézbesítés a legjobb. Ha nem rendelsz, az is segít, ha megírod, hol akadt el!

Hungarians in New York groups (Facebook): read the group rules first, post once, say it's your project.

## D. App directories (slow review, start now)
- **ChatGPT apps** (platform.openai.com → Apps): MCP URL `https://virag-nine.vercel.app/mcp`, no auth, privacy `https://virag-nine.vercel.app/privacy`, terms `/terms`. Test prompt: "Send a $119 bouquet to my sister at 245 E 63rd St Apt 12B, New York 10065 for Wednesday, card says 'Happy Thanksgiving'". Requires organization verification.
- **Claude connectors directory** (Anthropic's remote MCP submission form): same URL, privacy link, support email, and the 5 tools are annotated.
- Until they're approved, anyone can add the MCP URL as a custom connector (Claude: Settings → Connectors → Add custom; ChatGPT: developer mode).

## E. Agent communities (disclose that it's yours, show it, ask for feedback)
> I built a tiny real-world merchant for agents: a Manhattan flower shop with an MCP server, a SKILL.md and an API. Your agent can order a real best-selling bouquet (from $89 all-in); you just click the Stripe link. Skill: virag-nine.vercel.app/skill.md · MCP: virag-nine.vercel.app/mcp. Capped at 20 orders. I'm mostly curious where agents get stuck. Happy to share the logs.

Where: OpenClaw Discord #showcase, r/openclaw, r/ClaudeAI (Built with Claude flair), r/mcp, r/ChatGPT (check self-promo rules), Latent Space / MCP Discords.

## F. Show HN (Mon Nov 23, 9:00 ET)
Use docs/OUTREACH.md §3, plus the day-1 numbers in the first comment: 40+ MCP indexers in the first 8 hours, which agents fetched the catalog, and how many orders were attempted versus paid by then. Mention the Thanksgiving deadline only as context, not as a pitch.

## G. LinkedIn / X (Tue Nov 24)
> Day 5 of selling flowers to AI agents. X orders, Y agents tried, Z got stuck at payment. What I learned: … Christmas Eve delivery in Manhattan opens today: tell your assistant to order from virag-nine.vercel.app/llms.txt

## Decisions for you
1. **Deploy today's changes** (commit + push to main → Vercel).
2. **Florist availability** on Nov 25 and Dec 23–24 (blocks or confirms the holiday content).
3. Done Nov 19: five tiers ($89/$119/$159/$229/$749) based on real best sellers; see docs/PRICING.md.
4. Not recommended: Google Business Profile (needs a real Manhattan address, which we don't have) and Merchant Center (needs real product photos first).
