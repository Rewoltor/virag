import { readFileSync } from "node:fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
initializeApp({ credential: cert(JSON.parse(readFileSync(".secrets/firebase-admin.json", "utf8"))), projectId: "virag-a96a6" });
const db = getFirestore();
for (const c of ["orders", "idempotency", "meta", "waitlist"]) {
  const s = await db.collection(c).get();
  console.log(`\n${c}: ${s.size}`);
  s.docs.forEach((d) => { const x = d.data(); console.log(" ", d.id, x.status ?? "", x.recipient?.name ?? "", x.stripeSessionId?.slice(0, 8) ?? "", x.createdAt?.toDate?.().toISOString?.() ?? ""); });
}
