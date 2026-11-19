import { SITE } from "@/lib/config";

export const dynamic = "force-static";

// Served at /.well-known/mcp.json (see next.config.ts rewrite) for MCP server discovery.
export function GET() {
  return Response.json(
    {
      name: "virag-flowers",
      description: "Order flower bouquets with a handwritten card for delivery in Manhattan, NYC.",
      endpoint: `${SITE.url}/mcp`,
      transport: "streamable-http",
      authentication: "none",
      tools: ["list_bouquets", "check_delivery", "suggest_card_message", "create_order", "get_order_status"],
      documentation: `${SITE.url}/llms.txt`,
    },
    { headers: { "access-control-allow-origin": "*" } },
  );
}
