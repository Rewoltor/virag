import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "node:fs";
initializeApp({ credential: cert(JSON.parse(readFileSync(process.argv[2] || ".secrets/firebase-admin.json", "utf8"))) });
const db = getFirestore(); db.settings({ preferRest: true });
const s = await db.collection("events").orderBy("ts", "desc").limit(25).get();
for (const d of s.docs) { const e = d.data(); console.log(e.type.padEnd(24), (e.channel||"").padEnd(14), (e.agent||"").padEnd(26), e.path || e.tool || e.code || ""); }
