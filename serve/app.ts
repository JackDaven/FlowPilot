import { Hono } from "hono";
import { cors } from "hono/cors";
import { ok } from "./lib/http";
import { rateLimit } from "./middleware/rate-limit";
import { cosmosRoutes } from "./routes/cosmos";
import { healthRoutes } from "./routes/health";
import { moduleRoutes } from "./routes/modules";
import { appsRoutes } from "./routes/apps";
import { stubRoutes } from "./routes/stubs";
import type { AppEnv } from "./types";

const app = new Hono<AppEnv>().basePath("/api");

app.use("*", cors({
  origin: (origin) => origin || "*",
  allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowHeaders: ["content-type", "authorization"]
}));
app.use("*", rateLimit());

app.get("/", (c) => {
  return c.json(ok({
    service: "flowpilot-api",
    version: "0.1.0"
  }));
});

app.route("/health", healthRoutes);
app.route("/modules", moduleRoutes);
app.route("/routes", appsRoutes);
app.route("/cosmos", cosmosRoutes);
app.route("/", stubRoutes);

app.notFound((c) => c.json({
  ok: false,
  code: "NOT_FOUND"
}, 404));

app.onError((error, c) => {
  console.error(error);
  return c.json({
    ok: false,
    code: "INTERNAL_ERROR"
  }, 500);
});

export default app;
