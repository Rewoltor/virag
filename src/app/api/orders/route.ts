import { createOrder } from "@/lib/orders";
import { contextFromRequest } from "@/lib/track";
import { json, preflight, readBody } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await readBody(req);
  const result = await createOrder(body, contextFromRequest(req));
  if (!result.ok) return json({ error: result.error }, result.status);
  return json(
    {
      ...result.order,
      checkout_url: result.checkout_url,
      idempotent_replay: result.reused,
      payment_instructions:
        "Payment is by card on Stripe's secure hosted checkout. If you can complete checkout for your user, open checkout_url and pay; otherwise send checkout_url to your user to pay. The order is confirmed once paid. The link expires at checkout_expires_at.",
      status_url: `/api/orders/${result.order.order_id}`,
    },
    result.reused ? 200 : 201,
  );
}

export const OPTIONS = preflight;
