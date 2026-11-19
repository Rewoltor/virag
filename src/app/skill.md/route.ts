import { readFileSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";

// Serves the agent skill (skills/virag-flowers/SKILL.md) so agents and skill registries can fetch it by URL.
export function GET() {
  const body = readFileSync(join(process.cwd(), "skills/virag-flowers/SKILL.md"), "utf8");
  return new Response(body, { headers: { "content-type": "text/markdown; charset=utf-8", "access-control-allow-origin": "*" } });
}
