import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const distDir = "dist";
const issues = [];

const walkHtml = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(path);
    return entry.isFile() && entry.name.endsWith(".html") ? [path] : [];
  });
};

const htmlPathFor = (href) => {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return join(distDir, "index.html");
  const normalized = clean.replace(/^\/+/, "").replace(/\/$/, "");
  if (normalized.endsWith(".html")) return join(distDir, normalized);
  return join(distDir, normalized, "index.html");
};

if (!existsSync(distDir)) {
  console.error("dist directory does not exist. Run npm run build first.");
  process.exit(1);
}

for (const file of walkHtml(distDir)) {
  const html = readFileSync(file, "utf8");
  const rel = relative(distDir, file).replaceAll("\\", "/");

  if (/localhost|127\.0\.0\.1/i.test(html)) {
    issues.push(`${rel}: contains localhost or 127.0.0.1`);
  }

  const hrefs = [...html.matchAll(/\shref=["']([^"']+)["']/gi)].map((match) => match[1]);
  for (const href of hrefs) {
    if (/^(https?:)?\/\//i.test(href) || /^(mailto|tel):/i.test(href)) continue;
    if (href.startsWith("#")) continue;
    if (href.startsWith("/_astro/") || href.startsWith("/favicon")) continue;

    if (/^\/tools#[^/]/.test(href)) {
      issues.push(`${rel}: contains legacy tool hash link ${href}`);
      continue;
    }

    if (!href.startsWith("/")) continue;
    const target = htmlPathFor(href);
    if (!existsSync(target)) {
      issues.push(`${rel}: broken internal link ${href}`);
    }
  }
}

if (issues.length) {
  console.error("Link check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Link check passed for ${walkHtml(distDir).length} HTML files.`);
