import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const distDir = "dist";
const issues = [];
const titleMap = new Map();

const walkHtml = (dir) => {
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(path);
    return entry.isFile() && entry.name.endsWith(".html") ? [path] : [];
  });
};

if (!existsSync(distDir)) {
  console.error("dist directory does not exist. Run npm run build first.");
  process.exit(1);
}

for (const file of walkHtml(distDir)) {
  const html = readFileSync(file, "utf8");
  const rel = relative(distDir, file).replaceAll("\\", "/");
  const route = rel === "index.html" ? "/" : `/${rel.replace(/\/index\.html$/, "")}`;
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch?.[1]?.trim() ?? "";

  if (!title) issues.push(`${rel}: missing or empty <title>`);
  else titleMap.set(title, [...(titleMap.get(title) ?? []), rel]);

  if (!/<meta\s+name=["']description["']\s+content=["'][^"']+["']/i.test(html)) {
    issues.push(`${rel}: missing meta description`);
  }

  if (!/<link\s+rel=["']canonical["']\s+href=["'][^"']+["']/i.test(html)) {
    issues.push(`${rel}: missing canonical link`);
  }

  if (!/<h1[\s>]/i.test(html)) {
    issues.push(`${rel}: missing H1`);
  }

  if ((route.startsWith("/tools") || route === "/" || route === "/about" || route === "/privacy") && !/application\/ld\+json/i.test(html)) {
    issues.push(`${rel}: missing JSON-LD`);
  }

  if (/localhost|127\.0\.0\.1/i.test(html)) {
    issues.push(`${rel}: contains localhost or 127.0.0.1`);
  }
}

for (const [title, files] of titleMap) {
  if (files.length > 1) issues.push(`duplicate title "${title}" in ${files.join(", ")}`);
}

if (issues.length) {
  console.error("SEO check failed:");
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`SEO check passed for ${walkHtml(distDir).length} HTML files.`);
