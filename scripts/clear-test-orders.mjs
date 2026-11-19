// One-off: delete the pre-launch test orders (by explicit ID) and the events tied to them.
import { readFileSync } from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
initializeApp({ credential: cert(JSON.parse(readFileSync(".secrets/firebase-admin.json", "utf8"))), projectId: "virag-a96a6" });
const db = getFirestore();
const ids = process.argv.slice(2);
if (!ids.length) throw new Error("usage: node scripts/clear-test-orders.mjs <orderId...>");
let n = 0;
for (const id of ids) {
  await db.collection("orders").doc(id).delete(); n++;
  for (const field of ["orderId", "order_id"]) {
    const s = await db.collection("events").where(field, "==", id).get();
    for (const d of s.docs) { await d.ref.delete(); n++; }
  }
}
for (const name of ["e2e-test", "live-config-check"]) {
  const s = await db.collection("events").where("agentName", "==", name).get();
  for (const d of s.docs) { await d.ref.delete(); n++; }
}
const idem = await db.collection("idempotency").get();
for (const d of idem.docs) { if (ids.includes(d.data().orderId)) { await d.ref.delete(); n++; } }
console.log("deleted docs:", n);
