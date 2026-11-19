export const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, OPTIONS",
  "access-control-allow-headers": "content-type, idempotency-key, x-agent-name",
};

export function json(data: unknown, status = 200, extra: Record<string, string> = {}) {
  return Response.json(data, { status, headers: { ...CORS, "cache-control": "no-store", ...extra } });
}

export function preflight() {
  return new Response(null, { status: 204, headers: CORS });
}

/** Accept JSON or form-encoded bodies. Header idempotency-key / x-agent-name are merged in. */
export async function readBody(req: Request): Promise<Record<string, unknown>> {
  const type = req.headers.get("content-type") || "";
  let body: Record<string, unknown> = {};
  try {
    if (type.includes("application/json")) body = (await req.json()) ?? {};
    else if (type.includes("form")) body = Object.fromEntries((await req.formData()).entries());
    else {
      const text = await req.text();
      body = text ? JSON.parse(text) : {};
    }
  } catch {
    body = {};
  }
  // Empty strings from HTML forms mean "not provided".
  for (const k of Object.keys(body)) if (body[k] === "") delete body[k];
  const idem = req.headers.get("idempotency-key");
  if (idem && !body.idempotency_key) body.idempotency_key = idem;
  const agent = req.headers.get("x-agent-name");
  if (agent && !body.agent_name) body.agent_name = agent;
  return body;
}
