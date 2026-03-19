#!/usr/bin/env node

/**
 * generate-site CLI
 *
 * A command-line tool that loads a preset YAML file, reads all referenced
 * prompt markdown files, and combines them into a single unified prompt
 * ready to feed to an AI coding assistant.
 *
 * Every run creates a dedicated project folder inside generated/ and saves
 * the prompt with a unique timestamped filename so nothing is ever overwritten.
 *
 * Usage:
 *   generate-site <preset-name>                   Create folder + save prompt
 *   generate-site <preset-name> --stdout           Output to stdout only (no folder)
 *   generate-site <preset-name> --output <file>    Write to a specific file path
 *   generate-site --list                           List all available presets
 */

const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

// ── ANSI color helpers ──────────────────────────────────────────────────────

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
};

const c = (color, text) => `${colors[color]}${text}${colors.reset}`;

// ── Path resolution ─────────────────────────────────────────────────────────

const ROOT_DIR = path.resolve(__dirname, "..");
const PRESETS_DIR = path.join(ROOT_DIR, "presets");
const PROMPTS_DIR = path.join(ROOT_DIR, "prompts");
const GENERATED_DIR = path.join(ROOT_DIR, "generated");

// ── Timestamp helper ────────────────────────────────────────────────────────

/**
 * Returns a filesystem-safe timestamp string, e.g. "2026-03-15-153012"
 */
function getTimestamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds()),
  ].join("-");
}

// ── Parse CLI arguments ─────────────────────────────────────────────────────

const args = process.argv.slice(2);

// Show help when no arguments are provided
if (args.length === 0) {
  printUsage();
  process.exit(0);
}

// Handle --list flag: display all available presets
if (args.includes("--list")) {
  listPresets();
  process.exit(0);
}

// The first positional argument is the preset name
const presetName = args.find((arg) => !arg.startsWith("--"));

if (!presetName) {
  console.error(c("red", "Error: No preset name provided.\n"));
  printUsage();
  process.exit(1);
}

// Check for --stdout flag (legacy behavior: output to terminal only)
const stdoutOnly = args.includes("--stdout");

// Check for --output flag and its value
const outputIndex = args.indexOf("--output");
const outputFile = outputIndex !== -1 ? args[outputIndex + 1] : null;

if (outputIndex !== -1 && !outputFile) {
  console.error(c("red", "Error: --output flag requires a file path.\n"));
  process.exit(1);
}

// ── Main execution ──────────────────────────────────────────────────────────

generateSite(presetName, outputFile, stdoutOnly);

// ── Functions ───────────────────────────────────────────────────────────────

/**
 * Pick a random element from an array.
 */
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Resolve the final list of prompt paths from a preset.
 *
 * Supports three formats inside the prompts array:
 *
 *   1. Plain string        → always included
 *      - "layouts/landing-layout.md"
 *
 *   2. Object with "pick_one" → one is randomly chosen
 *      - pick_one:
 *          - ui/modern-ui.md
 *          - ui/minimal-ui.md
 *          - ui/glassmorphism-ui.md
 *
 *   3. Object with "pick_n"  → N are randomly chosen (no repeats)
 *      - pick_n:
 *          count: 2
 *          from:
 *            - animations/hover-effects.md
 *            - animations/scroll-animations.md
 *            - animations/animated-cards.md
 */
function resolvePrompts(promptsArray) {
  const resolved = [];

  for (const entry of promptsArray) {
    if (typeof entry === "string") {
      // Plain string — always include
      resolved.push(entry);
    } else if (entry && typeof entry === "object") {
      if (Array.isArray(entry.pick_one)) {
        // pick_one: randomly select one from the list
        const chosen = pickRandom(entry.pick_one);
        resolved.push(chosen);
      } else if (entry.pick_n && Array.isArray(entry.pick_n.from)) {
        // pick_n: randomly select N items (no repeats)
        const count = Math.min(entry.pick_n.count || 1, entry.pick_n.from.length);
        const shuffled = [...entry.pick_n.from].sort(() => Math.random() - 0.5);
        resolved.push(...shuffled.slice(0, count));
      }
    }
  }

  return resolved;
}

/**
 * Main function: loads a preset, resolves randomized prompt pools,
 * reads all selected prompts, combines them, and outputs the result.
 *
 * Default behavior: creates a project folder inside generated/ and saves
 * the prompt file with a unique name so every run is preserved.
 *
 * --stdout: prints to stdout only (no folder created)
 * --output <file>: writes to a specific file path (no folder created)
 */
function generateSite(name, output, stdoutOnly) {
  // Step 1: Load the preset YAML file
  const presetPath = path.join(PRESETS_DIR, `${name}.yaml`);

  if (!fs.existsSync(presetPath)) {
    console.error(c("red", `Error: Preset "${name}" not found.`));
    console.error(c("dim", `Looked for: ${presetPath}`));
    console.error(c("yellow", '\nRun with --list to see available presets.'));
    process.exit(1);
  }

  console.error(c("cyan", `\n📦 Loading preset: ${c("bold", name)}`));

  const presetContent = fs.readFileSync(presetPath, "utf-8");
  const preset = yaml.load(presetContent);

  if (!preset || !preset.prompts || !Array.isArray(preset.prompts)) {
    console.error(c("red", "Error: Preset is missing a valid 'prompts' array."));
    process.exit(1);
  }

  console.error(c("dim", `   Description: ${preset.description || "N/A"}`));

  // Step 2: Resolve randomized prompt pools into a concrete list
  const resolvedPaths = resolvePrompts(preset.prompts);
  console.error(c("dim", `   Resolved: ${resolvedPaths.length} prompts (from ${preset.prompts.length} slots)\n`));

  // Step 3: Load each resolved prompt file
  const promptContents = [];
  let loadedCount = 0;

  for (const promptPath of resolvedPaths) {
    const fullPath = path.join(PROMPTS_DIR, promptPath);

    if (!fs.existsSync(fullPath)) {
      console.error(c("yellow", `   ⚠ Prompt not found: ${promptPath} (skipping)`));
      continue;
    }

    const content = fs.readFileSync(fullPath, "utf-8");
    promptContents.push(content);
    loadedCount++;
    console.error(c("green", `   ✓ Loaded: ${promptPath}`));
  }

  if (loadedCount === 0) {
    console.error(c("red", "\nError: No prompts were loaded. Check the preset file."));
    process.exit(1);
  }

  // Step 4: Combine all prompts into a single output
  const separator = "\n\n---\n\n";
  const header = buildHeader(preset, name, resolvedPaths);
  const combinedPrompt = header + separator + promptContents.join(separator);

  // Step 5: Output the result
  if (stdoutOnly) {
    // --stdout flag: print to terminal only, no files created
    process.stdout.write(combinedPrompt);
    console.error(c("green", `\n✅ Combined prompt sent to stdout.`));
    console.error(c("dim", `   Total size: ${(combinedPrompt.length / 1024).toFixed(1)} KB`));
  } else if (output) {
    // --output flag: write to the specific path provided
    const outputPath = path.resolve(output);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, combinedPrompt, "utf-8");
    console.error(c("green", `\n✅ Combined prompt written to: ${outputPath}`));
    console.error(c("dim", `   Total size: ${(combinedPrompt.length / 1024).toFixed(1)} KB`));
  } else {
    // Default: create a project folder inside generated/ with a unique prompt file
    const timestamp = getTimestamp();
    const projectDir = path.join(GENERATED_DIR, `${name}-${timestamp}`);
    const promptFileName = `prompt-${name}-${timestamp}.md`;
    const promptFilePath = path.join(projectDir, promptFileName);

    // Create the project folder
    fs.mkdirSync(projectDir, { recursive: true });

    // Save the prompt file
    fs.writeFileSync(promptFilePath, combinedPrompt, "utf-8");

    console.error(c("green", `\n✅ Project folder created:`));
    console.error(c("bold", `   ${projectDir}/`));
    console.error(c("green", `\n   Prompt saved as: ${c("bold", promptFileName)}`));
    console.error(c("dim", `   Total size: ${(combinedPrompt.length / 1024).toFixed(1)} KB`));
  }

  console.error(c("dim", `   Prompts loaded: ${loadedCount}/${resolvedPaths.length}\n`));
}

/**
 * Build a header section that provides context about the preset.
 */
function buildHeader(preset, name, resolvedPaths) {
  const lines = [
    `# Website Generation Prompt`,
    ``,
    `> Generated using the **${name}** preset from ai-website-presets.`,
    ``,
    `**Preset:** ${preset.name || name}`,
    `**Description:** ${preset.description || "N/A"}`,
    `**Category:** ${preset.category || "N/A"}`,
  ];

  if (preset.settings) {
    lines.push(``, `## Settings`);
    for (const [key, value] of Object.entries(preset.settings)) {
      lines.push(`- **${key.replace(/_/g, " ")}:** ${value}`);
    }
  }

  // Show which prompts were selected (useful when pools are randomized)
  lines.push(``, `## Selected Prompts`);
  for (const p of resolvedPaths) {
    lines.push(`- ${p}`);
  }

  lines.push(
    ``,
    `## Instructions`,
    ``,
    `Use the following design system prompts together to generate a cohesive, complete website.`,
    `Each section below defines a specific aspect of the design — combine them all into your implementation.`
  );

  return lines.join("\n");
}

/**
 * List all available presets in the presets directory.
 */
function listPresets() {
  console.log(c("cyan", `\n📋 Available Presets\n`));

  if (!fs.existsSync(PRESETS_DIR)) {
    console.error(c("red", "Error: Presets directory not found."));
    process.exit(1);
  }

  const files = fs
    .readdirSync(PRESETS_DIR)
    .filter((f) => f.endsWith(".yaml"))
    .sort();

  if (files.length === 0) {
    console.log(c("dim", "   No presets found.\n"));
    return;
  }

  for (const file of files) {
    const name = file.replace(".yaml", "");
    const content = fs.readFileSync(path.join(PRESETS_DIR, file), "utf-8");
    const preset = yaml.load(content);
    const description = preset.description || "No description";
    const category = preset.category || "—";
    const promptCount = preset.prompts ? preset.prompts.length : 0;

    console.log(
      `   ${c("bold", name.padEnd(28))} ${c("dim", category.padEnd(14))} ${c("dim", `${promptCount} prompts`)}   ${description}`
    );
  }

  console.log(c("dim", `\n   Total: ${files.length} presets\n`));
}

/**
 * Print usage instructions.
 */
function printUsage() {
  console.log(`
${c("bold", "generate-site")} — AI Website Preset Prompt Generator

${c("cyan", "USAGE:")}
  generate-site <preset-name>                  Create project folder + save prompt
  generate-site <preset-name> --stdout         Output to terminal only
  generate-site <preset-name> --output <file>  Write to a specific file
  generate-site --list                         List all available presets

${c("cyan", "EXAMPLES:")}
  generate-site startup-landing
  generate-site agency-website
  generate-site ecommerce-modern --output my-prompt.md
  generate-site startup-landing --stdout
  generate-site --list

${c("cyan", "WHAT HAPPENS:")}
  By default, each run creates a new folder inside ${c("bold", "generated/")} with a
  unique timestamped prompt file, so nothing is ever overwritten:

  ${c("dim", "generated/")}
  ${c("dim", "  startup-landing-2026-03-15-143022/")}
  ${c("dim", "    prompt-startup-landing-2026-03-15-143022.md")}
  ${c("dim", "  agency-website-2026-03-15-151200/")}
  ${c("dim", "    prompt-agency-website-2026-03-15-151200.md")}

${c("cyan", "WORKFLOW:")}
  1. Choose a preset (or create your own in presets/)
  2. Run generate-site to create a project folder with the prompt
  3. Feed the prompt to your AI coding assistant
  4. Build the website inside the project folder
`);
}
