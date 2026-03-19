#!/usr/bin/env node

/**
 * Build-time script: reads all prompt .md files and preset .yaml files
 * from the parent ai-website-presets project and generates a TypeScript
 * data file that the website can import at build time.
 *
 * Run: node scripts/embed-prompts.js
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const ROOT = path.resolve(__dirname, "../..");
const PROMPTS_DIR = path.join(ROOT, "prompts");
const PRESETS_DIR = path.join(ROOT, "presets");
const OUTPUT_FILE = path.join(__dirname, "../src/data/embedded-prompts.ts");

// ── Read all prompt markdown files ──────────────────────────────────────────

function readAllPrompts() {
  const prompts = {};

  function walk(dir, prefix = "") {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, prefix ? `${prefix}/${entry.name}` : entry.name);
      } else if (entry.name.endsWith(".md")) {
        const key = prefix ? `${prefix}/${entry.name}` : entry.name;
        prompts[key] = fs.readFileSync(fullPath, "utf-8");
      }
    }
  }

  walk(PROMPTS_DIR);
  return prompts;
}

// ── Read all preset YAML files ──────────────────────────────────────────────

function readAllPresets() {
  const presets = {};
  const files = fs
    .readdirSync(PRESETS_DIR)
    .filter((f) => f.endsWith(".yaml"))
    .sort();

  for (const file of files) {
    const name = file.replace(".yaml", "");
    const content = fs.readFileSync(path.join(PRESETS_DIR, file), "utf-8");
    presets[name] = yaml.load(content);
  }

  return presets;
}

// ── Generate TypeScript output ──────────────────────────────────────────────

const prompts = readAllPrompts();
const presets = readAllPresets();

const output = `// AUTO-GENERATED — do not edit manually.
// Run: node scripts/embed-prompts.js

/**
 * All prompt markdown files keyed by their path (e.g. "ui/modern-ui.md").
 */
export const promptFiles: Record<string, string> = ${JSON.stringify(prompts, null, 2)};

/**
 * All preset configurations parsed from YAML, keyed by preset name.
 */
export const presetConfigs: Record<string, PresetConfig> = ${JSON.stringify(presets, null, 2)};

export interface PickOneEntry {
  pick_one: string[];
}

export interface PickNEntry {
  pick_n: {
    count: number;
    from: string[];
  };
}

export type PromptEntry = string | PickOneEntry | PickNEntry;

export interface PresetConfig {
  name: string;
  description: string;
  category: string;
  prompts: PromptEntry[];
  settings?: Record<string, string | boolean | number>;
  metadata?: {
    difficulty?: string;
    estimated_components?: number;
    tags?: string[];
  };
}
`;

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, output, "utf-8");

// ── Generate public JSON API for external consumers (e.g. EC2 bot) ──────

const API_DIR = path.join(__dirname, "../public/api");
fs.mkdirSync(API_DIR, { recursive: true });

fs.writeFileSync(
  path.join(API_DIR, "prompts.json"),
  JSON.stringify({ prompts }, null, 2),
  "utf-8"
);

fs.writeFileSync(
  path.join(API_DIR, "presets.json"),
  JSON.stringify({ presets }, null, 2),
  "utf-8"
);

console.log(`✓ Embedded ${Object.keys(prompts).length} prompts`);
console.log(`✓ Embedded ${Object.keys(presets).length} presets`);
console.log(`✓ Written to: ${OUTPUT_FILE}`);
console.log(`✓ Public API: ${API_DIR}/prompts.json, presets.json`);
