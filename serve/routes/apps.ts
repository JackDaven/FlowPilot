import { Hono } from "hono";

const appsRoutes = new Hono();

appsRoutes.get("/", (c) => {
  return c.json({
    news: "http://localhost:4322",
    ai: "http://localhost:4323"
  });
});

export { appsRoutes };