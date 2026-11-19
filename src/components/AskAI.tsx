import { SITE } from "@/lib/config";

// Opens the visitor's own assistant with an order request prefilled. They review and send it themselves.
// Perplexity and Google AI Mode links are best-effort: support for prefilled prompts can change.
export function AskAI({ context }: { context?: string }) {
  const prompt =
    `I want to send flowers in Manhattan${context ? ` (${context})` : ""}. Please read ${SITE.url}/llms.txt and help me order from Virág: ` +
    `ask me who it's for, the address, the date and what the card should say, then give me the checkout link.`;
  const q = encodeURIComponent(prompt);
  const links: [string, string][] = [
    ["ChatGPT", `https://chatgpt.com/?q=${q}`],
    ["Claude", `https://claude.ai/new?q=${q}`],
    ["Perplexity", `https://www.perplexity.ai/search?q=${q}`],
    ["Google AI Mode", `https://www.google.com/search?udm=50&q=${q}`],
  ];
  return (
    <div className="ask-ai">
      <p className="eyebrow">Or ask your AI assistant</p>
      <ul className="chips">
        {links.map(([name, href]) => (
          <li key={name}>
            <a href={href} target="_blank" rel="noopener noreferrer">
              Order with {name}
            </a>
          </li>
        ))}
      </ul>
      <p className="small muted">Opens your assistant with the request filled in. You review it and send. Gemini and Copilot: paste {SITE.url}/llms.txt into the chat and ask it to order flowers.</p>
    </div>
  );
}
