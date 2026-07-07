import { Hono } from "hono";

const appsRoutes = new Hono();

appsRoutes.get("/", (c) => {
  return c.json({
    news: "/news",
    ai: "/ai-gallery"
  });
});

export { appsRoutes };