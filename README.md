# FlowPilot

FlowPilot is a production-ready Astro tool site with free browser-based utilities for creators, developers, and marketers. It includes dedicated SEO pages for tools, category pages, structured data, sitemap output, robots configuration, and lightweight launch checks.

## Tech Stack

- Astro
- Tailwind CSS
- Hono
- Cloudflare Pages ready

## Local Development

Project instructions prefer Astro background mode for the dev server:

```bash
npm install
npx astro dev --background
```

Useful background server commands:

```bash
npx astro dev status
npx astro dev logs
npx astro dev stop
```

The standard dev script is also available:

```bash
npm run dev
```

## Build

```bash
npm run build
```

The production output is generated in `dist`.

## SEO And Link Checks

Run these after `npm run build`:

```bash
npm run check:seo
npm run check:links
```

`check:seo` verifies title, meta description, canonical, H1, JSON-LD coverage, duplicate titles, and localhost leaks in built HTML.

`check:links` verifies internal links in built HTML resolve to files in `dist` and flags localhost or legacy `/tools#...` links.

## Cloudflare Pages Deployment

Use these settings:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: follow `package.json` `engines` (`>=22.12.0`)

## Site URL And Domain Changes

The site URL is centralized in:

```text
src/config/site.ts
```

To replace the placeholder domain:

1. Update `siteConfig.url`.
2. Confirm `astro.config.mjs` imports `siteConfig.url`.
3. Run `npm run build`.
4. Confirm `dist/robots.txt` points to the expected sitemap URL.
5. Confirm generated canonical URLs and JSON-LD use the new domain.

## Analytics Placeholder

Analytics are disabled by default. The placeholder component lives at:

```text
src/components/Analytics.astro
```

It is included by `BaseLayout.astro`, but it does not load any third-party script unless explicitly enabled.

Environment variables reserved for future use:

```bash
PUBLIC_ANALYTICS_ENABLED=true
PUBLIC_ANALYTICS_PROVIDER=plausible
```

Do not add real analytics tokens directly to the repository.

## Project Structure

- `src/pages`: Astro pages, including home, tools, category/tool routes, 404, about, privacy, and robots.
- `src/components`: UI components, layout pieces, tool workspace, navigation, footer, and analytics placeholder.
- `src/config`: shared site configuration.
- `src/scripts`: browser-side tool workspace script.
- `lib/tools`: tool registry and browser-local utility logic.
- `scripts`: post-build SEO and link check scripts.
- `serve`: Hono server structure retained for backend/API compatibility.

## Launch Checklist

See [docs/launch-checklist.md](docs/launch-checklist.md).
