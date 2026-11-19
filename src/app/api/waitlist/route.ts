import { joinWaitlist } from "@/lib/waitlist";
import { contextFromRequest } from "@/lib/track";
import { json, preflight, readBody } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await readBody(req);
  const r = await joinWaitlist(body, contextFromRequest(req));
  const isForm = (req.headers.get("content-type") || "").includes("form");
  if (isForm) return Response.redirect(new URL(r.ok ? "/sold-out?joined=1" : "/sold-out?error=email", req.url).toString(), 303);
  return r.ok ? json({ ok: true, message: "You're on the waitlist." }, 201) : json({ error: { code: "invalid_request", message: r.message } }, 400);
}

export const OPTIONS = preflight;
