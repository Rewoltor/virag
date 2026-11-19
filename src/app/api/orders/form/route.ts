import { createOrder } from "@/lib/orders";
import { contextFromRequest } from "@/lib/track";
import { readBody } from "@/lib/http";

export const dynamic = "force-dynamic";

/** Plain HTML form target (works with JavaScript disabled). Redirects to Stripe Checkout. */
export async function POST(req: Request) {
  const body = await readBody(req);
  const result = await createOrder(body, contextFromRequest(req));
  const origin = new URL(req.url).origin;
  if (result.ok) return Response.redirect(result.checkout_url, 303);
  if (result.error.code === "sold_out") return Response.redirect(`${origin}/sold-out?tier=${encodeURIComponent(String(body.tier || ""))}`, 303);
  const back = new URL("/order", origin);
  for (const [k, v] of Object.entries(body)) if (typeof v === "string" && k !== "idempotency_key") back.searchParams.set(k, v.slice(0, 300));
  back.searchParams.set("error", result.error.message);
  return Response.redirect(back.toString(), 303);
}
