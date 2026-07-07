import { Hono } from "hono";
import { ok } from "../lib/http";
import type { AppEnv } from "../types";

export const healthRoutes = new Hono<AppEnv>();

healthRoutes.get("/", (c) => {
  return c.json(ok({
    service: "flowpilot-api",
    runtime: "cloudflare",
    status: "ok",
    bindings: {
      kv: Boolean(c.env.COSMOS_KV),
      d1: Boolean(c.env.DB),
      r2: Boolean(c.env.BUCKET)
    }
  }));
});
