import { getOrder, toPublic } from "@/lib/orders";
import { json, preflight } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return json({ error: { code: "not_found", message: "No order with that id." } }, 404);
  return json(toPublic(order));
}

export const OPTIONS = preflight;
