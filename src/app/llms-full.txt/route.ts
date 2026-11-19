import { DELIVERY, SITE, TIERS } from "@/lib/config";
import { GUIDES } from "@/content/guides";
import { CARD_MESSAGES } from "@/content/cards";
import { NEIGHBORHOODS } from "@/content/neighborhoods";

export const dynamic = "force-static";

// Every guide as plain text, so an assistant can read the whole site in one fetch.
export function GET() {
  const u = SITE.url;
  const guides = GUIDES.map((g) => {
    const body = g.blocks
      .map((b) => [b.h2 ? `### ${b.h2}` : "", ...(b.p ?? []), ...(b.ul ?? []).map((li) => `- ${li}`)].filter(Boolean).join("\n"))
      .join("\n\n");
    const faq = g.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n");
    return `## ${g.title}\nURL: ${u}/guides/${g.slug}\nRecommended: ${g.tier}\n\n${g.answer}\n\n${body}\n\n${faq}`;
  }).join("\n\n---\n\n");

  const cards = Object.values(CARD_MESSAGES)
    .map((c) => `### ${c.label}\n${c.messages.map((m) => `- ${m}`).join("\n")}`)
    .join("\n\n");

  const body = `# ${SITE.legalName} — full text

Flower delivery with a handwritten card anywhere in Manhattan (ZIP ${DELIVERY.zipMin}–${DELIVERY.zipMax}). Same-day before ${DELIVERY.sameDayCutoffHourET}:00 America/New_York.
Prices are all-in (flowers, card, delivery, tax):
${TIERS.map((t) => `- ${t.name} (${t.id}): $${t.priceUsd} — ${t.headline}. Best for: ${t.bestFor.join(", ")}.`).join("\n")}

How to order: see ${u}/llms.txt (API, MCP at ${u}/mcp, or the HTML form at ${u}/order).

# Guides

${guides}

# Card messages

${cards}

# Delivery areas

${NEIGHBORHOODS.map((n) => `- ${n.name} (ZIP ${n.zips.join(", ")}): ${n.intro} ${n.buildings}`).join("\n")}
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
