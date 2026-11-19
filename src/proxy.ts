import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { contextFromRequest, logEvent } from "@/lib/track";

/**
 * 1) Logs every page/API/MCP request server-side, so agents that never run JavaScript
 *    are still counted (GA4 only sees browsers that execute its script).
 * 2) Protects /admin with HTTP Basic auth.
 */
export function proxy(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    const pass = process.env.ADMIN_PASSWORD;
    const auth = req.headers.get("authorization") || "";
    const given = auth.startsWith("Basic ") ? Buffer.from(auth.slice(6), "base64").toString().split(":").slice(1).join(":") : "";
    if (!pass || given !== pass) {
      return new NextResponse("Authentication required", { status: 401, headers: { "www-authenticate": 'Basic realm="virag-admin"' } });
    }
    return NextResponse.next();
  }

  // Skip client-side navigation/prefetch requests from our own pages (not real visits).
  if (req.headers.get("next-router-prefetch") || req.headers.get("rsc")) return NextResponse.next();

  const ctx = contextFromRequest(req, pathname);
  event.waitUntil(
    logEvent("request", ctx, {
      path: pathname.slice(0, 200),
      method: req.method,
      query: req.nextUrl.search.slice(0, 200) || undefined,
    }),
  );
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|api/stripe/webhook|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|woff2?)$).*)"],
};
