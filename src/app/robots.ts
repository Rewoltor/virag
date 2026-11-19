import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

// Explicitly welcome AI search and assistant crawlers — being found by agents is the point.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/order/success", "/order/cancelled"] },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Google-Agent", "Googlebot", "Applebot", "Applebot-Extended", "Bingbot", "DuckAssistBot", "meta-externalagent", "meta-externalfetcher", "GrokBot", "xAI-Grok", "Grok-DeepSearch", "xAI-SearchBot", "MistralAI-User", "Amazonbot"],
        allow: "/",
        disallow: ["/admin"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
