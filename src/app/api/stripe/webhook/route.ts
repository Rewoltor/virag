import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { markExpired, markPaid } from "@/lib/orders";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers.get("stripe-signature");
  if (!secret || !sig) return new Response("webhook not configured", { status: 400 });

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await req.text(), sig, secret);
  } catch (e) {
    return new Response(`bad signature: ${(e as Error).message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session.metadata?.order_id;
  if (!orderId) return new Response("ignored", { status: 200 });

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded":
      if (session.payment_status === "paid") await markPaid(orderId, { amountTotal: session.amount_total, email: session.customer_details?.email });
      break;
    case "checkout.session.expired":
      await markExpired(orderId);
      break;
  }
  return new Response("ok", { status: 200 });
}
