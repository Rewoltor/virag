import type { Metadata } from "next";
import Link from "next/link";
import { getOrder } from "@/lib/orders";
import { tierById, DELIVERY } from "@/lib/config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Order received", robots: { index: false } };

export default async function Success({ searchParams }: { searchParams: Promise<{ order_id?: string }> }) {
  const { order_id } = await searchParams;
  const order = order_id ? await getOrder(order_id).catch(() => null) : null;
  const tier = order ? tierById(order.tier) : undefined;
  return (
    <main>
      <div className="wrap narrow">
        <h1>Thank you — she&apos;s going to love it.</h1>
        {order ? (
          <>
            <p className="answer">
              Order <code>{order.id}</code>: {tier?.name} (${order.amountUsd}) for delivery on <strong>{order.deliveryDate}</strong> ({DELIVERY.window}) in Manhattan. Status:{" "}
              <strong>{order.status === "awaiting_payment" ? "confirming payment…" : order.status}</strong>.
            </p>
            <p className="muted">
              A florist will arrange it fresh and write your card by hand. Agents can check status at <code>/api/orders/{order.id}</code>.
            </p>
          </>
        ) : (
          <p>Your payment was received. You&apos;ll get a receipt by email.</p>
        )}
        <p>
          <Link href="/">Back home</Link>
        </p>
      </div>
    </main>
  );
}
