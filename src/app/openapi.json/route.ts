import { z } from "zod";
import { SITE } from "@/lib/config";
import { orderInputSchema } from "@/lib/orders";

export const dynamic = "force-static";

export function GET() {
  const orderInput = z.toJSONSchema(orderInputSchema, { io: "input" });
  const error = {
    type: "object",
    properties: {
      error: {
        type: "object",
        properties: {
          code: { type: "string", enum: ["invalid_request", "outside_delivery_area", "date_unavailable", "date_full", "sold_out", "payment_provider_error", "not_found"] },
          message: { type: "string" },
          field: { type: "string" },
          available_dates: { type: "array", items: { type: "string" } },
          waitlist_url: { type: "string" },
        },
      },
    },
  };
  const order = {
    type: "object",
    properties: {
      order_id: { type: "string" },
      status: { type: "string", enum: ["awaiting_payment", "paid", "placed", "delivered", "expired", "cancelled", "refunded"] },
      tier: { type: "string" },
      amount_usd: { type: "number" },
      delivery_date: { type: "string" },
      delivery_area: { type: "string" },
      checkout_expires_at: { type: "string" },
    },
  };
  const spec = {
    openapi: "3.1.0",
    info: {
      title: `${SITE.legalName} ordering API`,
      version: "1.0.0",
      description:
        "Order best-selling flower bouquets with a card message for delivery in Manhattan, NYC (from $89 all-in). Prices are all-inclusive. Creating an order returns a Stripe-hosted checkout_url; the order is confirmed once paid. No authentication required.",
    },
    servers: [{ url: SITE.url }],
    paths: {
      "/api/catalog": { get: { operationId: "getCatalog", summary: "Bouquets, prices, delivery rules and remaining capacity", responses: { "200": { description: "Catalog" } } } },
      "/api/quote": {
        post: {
          operationId: "checkDelivery",
          summary: "Check whether a tier can be delivered to a ZIP on a date",
          requestBody: { content: { "application/json": { schema: { type: "object", properties: { tier: { type: "string" }, zip: { type: "string" }, delivery_date: { type: "string" } } } } } },
          responses: { "200": { description: "Quote" } },
        },
      },
      "/api/orders": {
        post: {
          operationId: "createOrder",
          summary: "Create an order and get a Stripe checkout_url",
          parameters: [{ name: "Idempotency-Key", in: "header", required: false, schema: { type: "string" } }],
          requestBody: { required: true, content: { "application/json": { schema: orderInput } } },
          responses: {
            "201": { description: "Order created", content: { "application/json": { schema: { allOf: [order, { type: "object", properties: { checkout_url: { type: "string" } } }] } } } },
            "200": { description: "Idempotent replay of an existing order" },
            "400": { description: "Invalid request", content: { "application/json": { schema: error } } },
            "409": { description: "Sold out or date full", content: { "application/json": { schema: error } } },
            "422": { description: "Outside delivery area or date unavailable", content: { "application/json": { schema: error } } },
          },
        },
      },
      "/api/orders/{order_id}": {
        get: {
          operationId: "getOrderStatus",
          summary: "Order status",
          parameters: [{ name: "order_id", in: "path", required: true, schema: { type: "string" } }],
          responses: { "200": { description: "Order", content: { "application/json": { schema: order } } }, "404": { description: "Not found" } },
        },
      },
      "/api/waitlist": {
        post: {
          operationId: "joinWaitlist",
          summary: "Join the waitlist when sold out",
          requestBody: { content: { "application/json": { schema: { type: "object", required: ["email"], properties: { email: { type: "string" }, tier: { type: "string" }, zip: { type: "string" }, agent_name: { type: "string" } } } } } },
          responses: { "201": { description: "Joined" } },
        },
      },
    },
  };
  return Response.json(spec, { headers: { "access-control-allow-origin": "*" } });
}
