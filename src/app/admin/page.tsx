import type { Metadata } from "next";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { Timestamp } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase";
import { capacity, listOrders, setStatus, type OrderStatus } from "@/lib/orders";
import { LIMITS, tierById } from "@/lib/config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false } };

type Ev = { type: string; channel: string; agent: string; path?: string; ts?: Timestamp; tier?: string; zip?: string; deliveryDate?: string; agentName?: string; tool?: string; code?: string; ipHash?: string };

async function requireAdmin() {
  const auth = (await headers()).get("authorization") || "";
  const given = auth.startsWith("Basic ") ? Buffer.from(auth.slice(6), "base64").toString().split(":").slice(1).join(":") : "";
  if (!process.env.ADMIN_PASSWORD || given !== process.env.ADMIN_PASSWORD) throw new Error("unauthorized");
}

async function updateStatus(formData: FormData) {
  "use server";
  await requireAdmin();
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as OrderStatus;
  if (!["placed", "delivered", "refunded", "cancelled"].includes(status)) return;
  await setStatus(id, status);
  revalidatePath("/admin");
}

const daysAgo = (days: number) => Timestamp.fromMillis(Date.now() - days * 86400_000);

function count<T>(items: T[], key: (t: T) => string) {
  const m = new Map<string, number>();
  for (const i of items) m.set(key(i), (m.get(key(i)) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

export default async function Admin({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  await requireAdmin();
  const days = Math.min(90, Math.max(1, Number((await searchParams).days) || 30));
  const since = daysAgo(days);
  const snap = await getDb().collection("events").where("ts", ">=", since).orderBy("ts", "desc").limit(20000).get();
  const events = snap.docs.map((d) => d.data() as Ev);
  const [orders, cap] = await Promise.all([listOrders(200), capacity()]);

  const requests = events.filter((e) => e.type === "request");
  const nonBot = requests.filter((e) => !["ai_crawler", "search_crawler"].includes(e.channel));
  const agentish = (e: Ev) => ["ai_assistant", "browser_agent", "api_client", "mcp_client"].includes(e.channel);
  const funnel: [string, number][] = [
    ["Requests (all)", requests.length],
    ["Human page views", requests.filter((e) => e.channel === "human").length],
    ["Agent requests (assistant/browser/API/MCP)", requests.filter(agentish).length],
    ["Unique visitors/day (non-crawler)", new Set(nonBot.map((e) => `${e.ipHash}:${e.ts?.toDate().toISOString().slice(0, 10)}`)).size],
    ["Catalog fetches", events.filter((e) => e.type === "catalog_fetch").length],
    ["MCP tool calls", events.filter((e) => e.type === "mcp_tool_call").length],
    ["Quotes", events.filter((e) => e.type === "quote").length],
    ["Orders created (checkout started)", events.filter((e) => e.type === "order_created").length],
    ["Orders rejected (validation)", events.filter((e) => e.type === "order_rejected").length],
    ["⚠️ Blocked — sold out", events.filter((e) => e.type === "order_blocked_sold_out").length],
    ["Paid", events.filter((e) => e.type === "checkout_completed").length],
    ["Waitlist signups", events.filter((e) => e.type === "waitlist_signup").length],
  ];
  const intents = events.filter((e) => ["order_created", "order_blocked_sold_out"].includes(e.type));

  return (
    <main>
      <div className="wrap">
        <h1>Admin</h1>
        <p className="muted">
          Last {days} days · <a href="?days=1">1d</a> · <a href="?days=7">7d</a> · <a href="?days=30">30d</a> · <a href="?days=90">90d</a> · {events.length} events
        </p>
        <div className="grid">
          <div className="card">
            <span className="muted small">Slots left</span>
            <span className="stat">
              {cap.remaining}/{LIMITS.maxPaidOrders}
            </span>
          </div>
          <div className="card">
            <span className="muted small">Paid orders</span>
            <span className="stat">{orders.filter((o) => ["paid", "placed", "delivered"].includes(o.status)).length}</span>
          </div>
          <div className="card">
            <span className="muted small">Order intents (created + blocked)</span>
            <span className="stat">{intents.length}</span>
          </div>
          <div className="card">
            <span className="muted small">Intents from agents</span>
            <span className="stat">{intents.filter((e) => e.channel !== "human").length}</span>
          </div>
        </div>

        <h2>Funnel</h2>
        <table>
          <tbody>
            {funnel.map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>
                  <strong>{v}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid" style={{ marginTop: 12 }}>
          <div>
            <h2>Requests by channel</h2>
            <table>
              <tbody>
                {count(requests, (e) => e.channel).map(([k, v]) => (
                  <tr key={k}>
                    <td>{k}</td>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2>Top agents</h2>
            <table>
              <tbody>
                {count(requests.filter((e) => e.channel !== "human"), (e) => e.agent)
                  .slice(0, 15)
                  .map(([k, v]) => (
                    <tr key={k}>
                      <td>{k}</td>
                      <td>{v}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2>Top pages</h2>
            <table>
              <tbody>
                {count(nonBot, (e) => e.path || "-")
                  .slice(0, 15)
                  .map(([k, v]) => (
                    <tr key={k}>
                      <td>{k}</td>
                      <td>{v}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <h2>Order intents (incl. blocked)</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>When</th>
                <th>Type</th>
                <th>Tier</th>
                <th>ZIP</th>
                <th>Date</th>
                <th>Channel / agent</th>
              </tr>
            </thead>
            <tbody>
              {intents.slice(0, 100).map((e, i) => (
                <tr key={i}>
                  <td>{e.ts?.toDate().toISOString().slice(0, 16).replace("T", " ")}</td>
                  <td>{e.type === "order_blocked_sold_out" ? "🚫 blocked" : "created"}</td>
                  <td>{e.tier}</td>
                  <td>{e.zip}</td>
                  <td>{e.deliveryDate}</td>
                  <td>
                    {e.channel} / {e.agentName || e.agent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Orders</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Status</th>
                <th>Tier</th>
                <th>Deliver</th>
                <th>Recipient</th>
                <th>Card</th>
                <th>Via</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <code>{o.id}</code>
                  </td>
                  <td>{o.status}</td>
                  <td>
                    {tierById(o.tier)?.name} ${o.amountUsd}
                  </td>
                  <td>{o.deliveryDate}</td>
                  <td>
                    {o.recipient.name}
                    <br />
                    {o.recipient.phone}
                    <br />
                    {o.recipient.address1}
                    {o.recipient.address2 ? `, ${o.recipient.address2}` : ""}, {o.recipient.zip}
                    {o.recipient.instructions ? (
                      <>
                        <br />
                        <em>{o.recipient.instructions}</em>
                      </>
                    ) : null}
                  </td>
                  <td>
                    “{o.cardMessage}” — {o.senderName}
                  </td>
                  <td>
                    {o.channel}
                    <br />
                    {o.agentName || o.agent}
                  </td>
                  <td>
                    {["paid", "placed"].includes(o.status) ? (
                      <form action={updateStatus} style={{ display: "flex", gap: 6 }}>
                        <input type="hidden" name="id" value={o.id} />
                        <select name="status" defaultValue={o.status === "paid" ? "placed" : "delivered"}>
                          <option value="placed">placed</option>
                          <option value="delivered">delivered</option>
                          <option value="refunded">refunded</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                        <button className="btn" style={{ padding: "6px 10px" }}>
                          Save
                        </button>
                      </form>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small muted">Refunds: issue them in the Stripe dashboard, then mark the order refunded here.</p>
      </div>
    </main>
  );
}
