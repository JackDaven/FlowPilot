import { Hono } from "hono";
import { ok } from "../lib/http";
import { modules } from "../modules";
import type { AppEnv } from "../types";

export const moduleRoutes = new Hono<AppEnv>();

moduleRoutes.get("/", (c) => {
  return c.json(ok({ modules }));
});
