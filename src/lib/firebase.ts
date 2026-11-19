import { cert, getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

let db: Firestore | null = null;

function credential() {
  // Vercel: base64 of the service-account JSON. Local: .secrets/firebase-admin.json.
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (b64) return cert(JSON.parse(Buffer.from(b64, "base64").toString("utf8")));
  const local = path.join(process.cwd(), ".secrets", "firebase-admin.json");
  if (existsSync(local)) return cert(JSON.parse(readFileSync(local, "utf8")));
  return applicationDefault();
}

export function getDb(): Firestore {
  if (db) return db;
  const app = getApps()[0] ?? initializeApp({ credential: credential(), projectId: process.env.FIREBASE_PROJECT_ID || "virag-a96a6" });
  db = getFirestore(app);
  try {
    db.settings({ preferRest: true, ignoreUndefinedProperties: true });
  } catch {
    // already configured (dev hot reload)
  }
  return db;
}
