import { absoluteUrl } from "../config/site";

export const GET = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap-index.xml")}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
