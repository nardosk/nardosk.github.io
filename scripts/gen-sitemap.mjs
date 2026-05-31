// Generates public/sitemap.xml from the static routes plus every project in
// src/lib/projects.json. Wired as the npm `prebuild` step so the sitemap always
// matches the routes that get prerendered. Output is deterministic (no dates) so
// rebuilds don't churn the file.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = "https://nardos.et";

const projects = JSON.parse(readFileSync(resolve(root, "src/lib/projects.json"), "utf8"));

const routes = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "yearly" },
  { path: "/contact", priority: "0.6", changefreq: "yearly" },
  ...projects.map((p) => ({
    path: `/work/${p.slug}`,
    priority: "0.8",
    changefreq: "yearly",
  })),
];

const body = routes
  .map(
    ({ path, priority, changefreq }) =>
      `  <url>\n` +
      `    <loc>${SITE_URL}${path}</loc>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml);
console.log(`wrote public/sitemap.xml (${routes.length} urls)`);
