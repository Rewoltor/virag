import { z } from "zod";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "./firebase";
import { logEvent, type TrackContext } from "./track";
import { notifyOwner } from "./telegram";

export const waitlistSchema = z.object({
  email: z.string().trim().email(),
  tier: z.enum(["sweet", "romantic", "grand"]).optional(),
  zip: z.string().trim().max(10).optional(),
  note: z.string().trim().max(300).optional(),
  agent_name: z.string().trim().max(60).optional(),
});

export async function joinWaitlist(raw: unknown, ctx: TrackContext) {
  const parsed = waitlistSchema.safeParse(raw);
  if (!parsed.success) return { ok: false as const, message: "A valid email is required." };
  const w = parsed.data;
  await getDb().collection("waitlist").add({ ...w, channel: ctx.channel, agent: ctx.agent, createdAt: FieldValue.serverTimestamp() });
  await logEvent("waitlist_signup", ctx, { tier: w.tier, zip: w.zip, agentName: w.agent_name });
  await notifyOwner(`📝 Waitlist: ${w.tier || "-"} ${w.zip || ""} via ${ctx.channel}/${w.agent_name || ctx.agent}`);
  return { ok: true as const };
}
