# FlowPilot Launch Checklist

Use this checklist after deploying FlowPilot to its production domain.

## Domain And HTTPS

- Bind the real production domain.
- Confirm HTTPS works without certificate warnings.
- Confirm HTTP redirects to HTTPS if supported by the hosting setup.
- Confirm `src/config/site.ts` uses the production URL.

## Open Key Pages

- Open `/`.
- Open `/tools`.
- Open `/tools/hash`.
- Open `/tools/encoding`.
- Open `/tools/developer`.
- Open `/tools/text`.
- Open at least five tool pages:
  - `/tools/md5-generator`
  - `/tools/sha256-generator`
  - `/tools/base64-encoder-decoder`
  - `/tools/json-formatter-minifier`
  - `/tools/word-counter`
- Open `/about`.
- Open `/privacy`.
- Open `/robots.txt`.
- Open `/sitemap-index.xml`.

## Search Engine Submission

- Add the domain in Google Search Console.
- Submit the sitemap URL shown in `/robots.txt`.
- Use URL inspection for the home page and request indexing if appropriate.
- Add the site in Bing Webmaster Tools.
- Submit the same sitemap URL in Bing Webmaster Tools.

## Robots And Sitemap

- Confirm `/robots.txt` does not block crawling.
- Confirm the sitemap contains the home page, `/tools`, category pages, tool pages, `/about`, and `/privacy`.
- Confirm the sitemap does not contain localhost URLs.
- Confirm the sitemap does not contain hash URLs.
- Confirm the sitemap does not contain `/404`.

## One Week After Launch

Review search console data:

- Indexed pages.
- Impressions.
- Clicks.
- Top queries.
- Pages with crawl or indexing errors.
- Sitemap discovery status.

Use the findings to prioritize content improvements and technical fixes.
