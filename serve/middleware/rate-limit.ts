import type { MiddlewareHandler } from "hono";
import type { AppEnv } from "../types";

export const rateLimit = (): MiddlewareHandler<AppEnv> => {
  return async (c, next) => {
    const kv = c.env.COSMOS_KV;
    if (!kv) return next();

    const ip = c.req.header("cf-connecting-ip") || c.req.header("x-forwarded-for") || "local";
    const bucket = `rate:${ip}:${Math.floor(Date.now() / 60000)}`;
    const count = Number((await kv.get(bucket)) || 0) + 1;

    if (count === 1) {
      await kv.put(bucket, "1", { expirationTtl: 90 });
    } else {
      await kv.put(bucket, String(count), { expirationTtl: 90 });
    }

    if (count > 120) {
      return c.json({ ok: false, code: "RATE_LIMITED" }, 429);
    }

    return next();
  };
};
