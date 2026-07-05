import { Hono } from "hono";
import { ok, sanitize } from "../lib/http";
import type { AppEnv } from "../types";

export const cosmosRoutes = new Hono<AppEnv>();

cosmosRoutes.post("/preset", async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const preset = {
    mode: sanitize(body.mode, 24),
    seed: Number(body.seed || 0),
    speed: Number(body.speed || 1),
    trail: Number(body.trail || 0.09),
    gravity: Number(body.gravity || 1),
    updatedAt: new Date().toISOString()
  };

  if (c.env.COSMOS_KV) {
    await c.env.COSMOS_KV.put("preset:latest", JSON.stringify(preset));
  }

  return c.json(ok({
    preset,
    persisted: Boolean(c.env.COSMOS_KV)
  }));
});

cosmosRoutes.get("/preset", async (c) => {
  if (!c.env.COSMOS_KV) {
    return c.json(ok({
      preset: null,
      persisted: false
    }));
  }

  const preset = await c.env.COSMOS_KV.get("preset:latest", "json");
  return c.json(ok({
    preset,
    persisted: true
  }));
});
