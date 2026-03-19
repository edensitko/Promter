#!/usr/bin/env node

/**
 * Generates a sitemap.xml in public/ at build time.
 * Run: node scripts/generate-sitemap.js
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const SITE_URL = "https://promter.dev";
const ROOT = path.resolve(__dirname, "../..");
const PROMPTS_DIR = path.join(ROOT, "prompts");
const PRESETS_DIR = path.join(ROOT, "presets");
const OUTPUT = path.join(__dirname, "../public/sitemap.xml");

const today = new Date().toISOString().split("T")[0];

// Collect prompt names
function getPromptNames() {
  const names = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(path.join(dir, entry.name));
      else if (entry.name.endsWith(".md")) names.push(entry.name.replace(".md", ""));
    }
  }
  walk(PROMPTS_DIR);
  return [...new Set(names)];
}

// Collect preset IDs
function getPresetIds() {
  return fs
    .readdirSync(PRESETS_DIR)
    .filter((f) => f.endsWith(".yaml"))
    .map((f) => f.replace(".yaml", ""));
}

const staticPages = [
  { url: "/", priority: "1.0", freq: "weekly" },
  { url: "/templates/", priority: "0.9", freq: "weekly" },
  { url: "/resources/", priority: "0.9", freq: "weekly" },
  { url: "/privacy/", priority: "0.3", freq: "yearly" },
  { url: "/terms/", priority: "0.3", freq: "yearly" },
];

const presetIds = getPresetIds();
const promptNames = getPromptNames();

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

for (const page of staticPages) {
  xml += `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.freq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
}

for (const id of presetIds) {
  xml += `  <url>
    <loc>${SITE_URL}/templates/${id}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

for (const name of promptNames) {
  xml += `  <url>
    <loc>${SITE_URL}/prompts/${name}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
}

xml += `</urlset>\n`;

fs.writeFileSync(OUTPUT, xml, "utf-8");
console.log(`✓ Sitemap: ${staticPages.length + presetIds.length + promptNames.length} URLs → ${OUTPUT}`);
