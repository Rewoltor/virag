import { createHash } from "node:crypto";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "./firebase";

/**
 * Who is visiting? Most AI agents and crawlers never execute JavaScript, so GA4 alone
 * cannot see them. We classify every request server-side from its user-agent and headers.
 */
export type Channel =
  | "human"
  | "browser_agent" // an agent driving a real browser (ChatGPT agent, Claude in Chrome, headless)
  | "ai_assistant" // user-initiated fetch by an assistant (ChatGPT-User, Claude-User, Perplexity-User)
  | "ai_crawler" // AI search/training crawlers
  | "search_crawler" // classic search engines
  | "api_client" // scripts / SDKs hitting the API directly
  | "mcp_client"
  | "unknown";

const AGENT_PATTERNS: [RegExp, string, Channel][] = [
  [/ChatGPT-User/i, "openai:chatgpt-user", "ai_assistant"],
  [/OAI-SearchBot/i, "openai:searchbot", "ai_crawler"],
  [/GPTBot/i, "openai:gptbot", "ai_crawler"],
  [/Claude-User/i, "anthropic:claude-user", "ai_assistant"],
  [/Claude-SearchBot/i, "anthropic:searchbot", "ai_crawler"],
  [/ClaudeBot|anthropic-ai/i, "anthropic:claudebot", "ai_crawler"],
  [/Perplexity-User/i, "perplexity:user", "ai_assistant"],
  [/PerplexityBot/i, "perplexity:bot", "ai_crawler"],
  [/MistralAI-User/i, "mistral:user", "ai_assistant"],
  [/DuckAssistBot/i, "duckduckgo:assist", "ai_assistant"],
  [/meta-externalfetcher/i, "meta:fetcher", "ai_assistant"],
  [/meta-externalagent/i, "meta:agent", "ai_crawler"],
  [/Google-CloudVertexBot|Gemini/i, "google:gemini", "ai_assistant"],
  [/Amazonbot/i, "amazon:bot", "ai_crawler"],
  [/Applebot/i, "apple:bot", "ai_crawler"],
  [/cohere-ai|cohere-training/i, "cohere", "ai_crawler"],
  [/YouBot/i, "you.com", "ai_crawler"],
  [/Bytespider/i, "bytedance", "ai_crawler"],
  [/CCBot/i, "commoncrawl", "ai_crawler"],
  [/Googlebot|Google-InspectionTool|Storebot-Google/i, "google:bot", "search_crawler"],
  [/bingbot|BingPreview/i, "bing:bot", "search_crawler"],
  [/DuckDuckBot|YandexBot|Baiduspider/i, "other:search", "search_crawler"],
  [/HeadlessChrome|Playwright|Puppeteer|Browserbase|Steel|browser-use/i, "headless-browser", "browser_agent"],
  [/python-requests|python-httpx|aiohttp|axios|node-fetch|undici|curl\/|Wget|Go-http-client|okhttp|Java\/|libwww|HTTPie|PostmanRuntime|^node$/i, "http-library", "api_client"],
  [/bot|crawler|spider|scraper/i, "other:bot", "ai_crawler"],
];

export function classify(ua: string, headers: Headers, pathname: string): { channel: Channel; agent: string } {
  // Agents signing requests with Web Bot Auth (e.g. ChatGPT agent sends Signature-Agent: chatgpt.com)
  const sigAgent = headers.get("signature-agent");
  if (sigAgent) return { channel: "browser_agent", agent: `signed:${sigAgent.replace(/"/g, "").slice(0, 60)}` };

  if (pathname === "/mcp" || pathname.startsWith("/mcp/")) {
    const m = AGENT_PATTERNS.find(([re]) => re.test(ua));
    return { channel: "mcp_client", agent: m ? m[1] : (ua.split(/[\s/]/)[0] || "unknown").slice(0, 40) };
  }
  for (const [re, agent, channel] of AGENT_PATTERNS) if (re.test(ua)) return { channel, agent };
  if (!ua) return { channel: "unknown", agent: "no-ua" };
  if (/Mozilla\/5\.0/.test(ua)) return { channel: "human", agent: "browser" };
  return { channel: pathname.startsWith("/api/") ? "api_client" : "unknown", agent: ua.slice(0, 40) };
}

export type EventType =
  | "request"
  | "catalog_fetch"
  | "quote"
  | "order_created"
  | "order_rejected"
  | "order_blocked_sold_out"
  | "checkout_completed"
  | "checkout_expired"
  | "waitlist_signup"
  | "mcp_tool_call";

export interface TrackContext {
  channel: Channel;
  agent: string;
  ua: string;
  ipHash: string;
  country?: string;
  city?: string;
  referer?: string;
}

export function contextFromRequest(req: Request, pathname?: string): TrackContext {
  const h = req.headers;
  const p = pathname ?? new URL(req.url).pathname;
  const ua = h.get("user-agent") || "";
  const { channel, agent } = classify(ua, h, p);
  const ip = (h.get("x-forwarded-for") || "").split(",")[0].trim();
  const day = new Date().toISOString().slice(0, 10);
  // Daily-salted hash: counts unique visitors per day without storing IPs.
  const ipHash = ip ? createHash("sha256").update(`${day}:${ip}:${process.env.IP_SALT || "virag"}`).digest("hex").slice(0, 16) : "";
  return {
    channel,
    agent,
    ua: ua.slice(0, 300),
    ipHash,
    country: h.get("x-vercel-ip-country") || undefined,
    city: decodeURIComponent(h.get("x-vercel-ip-city") || "") || undefined,
    referer: h.get("referer")?.slice(0, 300) || undefined,
  };
}

/** Write an event to Firestore and (optionally) GA4. Never throws. */
export async function logEvent(type: EventType, ctx: TrackContext, data: Record<string, unknown> = {}): Promise<void> {
  try {
    await Promise.all([
      getDb()
        .collection("events")
        .add({ type, ts: FieldValue.serverTimestamp(), ...ctx, ...data }),
      sendToGa4(type, ctx, data),
    ]);
  } catch (e) {
    console.error("[track] failed", type, e);
  }
}

/** Server-side GA4 (Measurement Protocol) so agent traffic shows up in GA4 too. */
async function sendToGa4(type: EventType, ctx: TrackContext, data: Record<string, unknown>) {
  const id = process.env.GA4_MEASUREMENT_ID;
  const secret = process.env.GA4_API_SECRET;
  if (!id || !secret) return;
  // Human page views are measured by the client-side gtag; skip them here to avoid double counting.
  if (type === "request" && ctx.channel === "human") return;
  const params: Record<string, string | number> = { channel: ctx.channel, agent: ctx.agent };
  for (const [k, v] of Object.entries(data)) if (typeof v === "string" || typeof v === "number") params[k] = typeof v === "string" ? v.slice(0, 100) : v;
  await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${id}&api_secret=${secret}`, {
    method: "POST",
    body: JSON.stringify({
      client_id: ctx.ipHash || `anon.${Date.now()}`,
      events: [{ name: type === "request" ? "agent_visit" : type, params }],
    }),
  }).catch(() => {});
}
