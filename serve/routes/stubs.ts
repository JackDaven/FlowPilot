import { Hono } from "hono";
import { notReady } from "../lib/http";
import { modules } from "../modules";
import type { AppEnv } from "../types";

export const stubRoutes = new Hono<AppEnv>();

for (const module of modules) {
  const routePath = module.apiBase.replace(/^\/api/, "");

  stubRoutes.all(routePath, (c) => c.json(notReady(module.id), 501));
  stubRoutes.all(`${routePath}/*`, (c) => c.json(notReady(module.id), 501));
}
