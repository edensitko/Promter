/**
 * Prompt generation engine — replicates the CLI's generate-site logic
 * entirely on the client side using embedded prompt data.
 *
 * Given a preset name (and optional customizations from the question engine),
 * it:
 * 1. Loads the preset config
 * 2. Resolves randomized prompt pools (pick_one, pick_n) — optionally overridden by user preferences
 * 3. Reads each resolved prompt's full markdown content
 * 4. Combines them with the same header format as the CLI
 * 5. Appends user-specific context from the questionnaire
 * 6. Returns the full generated markdown string
 */

import {
  promptFiles,
  presetConfigs,
  type PromptEntry,
  type PresetConfig,
} from "@/data/embedded-prompts";
import type { PromptCustomization } from "@/lib/question-engine";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Resolve prompt entries, optionally preferring specific choices.
 * If preferredUiStyles is given, pick_one/pick_n pools containing UI files will prefer them.
 * If preferredAnimations is given, pick_n pools containing animation files will use them.
 */
function resolvePrompts(
  entries: PromptEntry[],
  customization?: PromptCustomization
): string[] {
  const resolved: string[] = [];

  for (const entry of entries) {
    if (typeof entry === "string") {
      resolved.push(entry);
    } else if (entry && typeof entry === "object") {
      if ("pick_one" in entry && Array.isArray(entry.pick_one)) {
        const pool = entry.pick_one;

        // Try to match user's preferred UI styles
        if (customization?.preferredUiStyles?.length) {
          const preferred = pool.find((p) =>
            customization.preferredUiStyles!.some((s) => p.includes(`${s}-ui`))
          );
          if (preferred) {
            resolved.push(preferred);
            continue;
          }
        }

        resolved.push(pickRandom(pool));
      } else if (
        "pick_n" in entry &&
        entry.pick_n &&
        Array.isArray(entry.pick_n.from)
      ) {
        const count = Math.min(
          entry.pick_n.count || 1,
          entry.pick_n.from.length
        );
        const pool = entry.pick_n.from;

        // Try to prefer user's UI style choices for UI pools
        if (customization?.preferredUiStyles?.length && pool.some((p) => p.includes("ui/"))) {
          const preferred = customization.preferredUiStyles
            .map((style) => pool.find((p) => p.includes(`${style}-ui`)))
            .filter(Boolean) as string[];
          const remaining = pool.filter((p) => !preferred.includes(p));
          const shuffledRemaining = remaining.sort(() => Math.random() - 0.5);
          const selected = [...preferred, ...shuffledRemaining].slice(0, count);
          resolved.push(...selected);
          continue;
        }

        // Try to prefer user's animation choices
        if (customization?.preferredAnimations && pool.some((p) => p.includes("animations/"))) {
          const preferred = customization.preferredAnimations
            .map((anim) => pool.find((p) => p.includes(anim)))
            .filter(Boolean) as string[];
          const remaining = pool.filter((p) => !preferred.includes(p));
          const shuffledRemaining = remaining.sort(() => Math.random() - 0.5);
          const selected = [...preferred, ...shuffledRemaining].slice(0, count);
          resolved.push(...selected);
          continue;
        }

        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        resolved.push(...shuffled.slice(0, count));
      }
    }
  }

  // Add preferred 3D effects if not already included
  if (customization?.preferred3DEffects) {
    for (const effect of customization.preferred3DEffects) {
      const path = `3d/${effect}.md`;
      if (!resolved.includes(path) && promptFiles[path]) {
        resolved.push(path);
      }
    }
  }

  return resolved;
}

function buildHeader(
  preset: PresetConfig,
  name: string,
  resolvedPaths: string[],
  customization?: PromptCustomization
): string {
  const lines: string[] = [
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

  // Add user-specific customization context
  if (customization?.extraContext) {
    lines.push(
      ``,
      `## User Requirements`,
      ``,
      `The user provided the following specific requirements. Incorporate these into every aspect of the design:`,
      ``,
      customization.extraContext
    );
  }

  return lines.join("\n");
}

export interface GenerationResult {
  markdown: string;
  presetName: string;
  presetConfig: PresetConfig;
  resolvedPaths: string[];
  sizeKB: number;
  promptCount: number;
}

/**
 * Generate the full combined prompt for a given preset name.
 * Optionally accepts customization from the question engine.
 * This is the same output as `generate-site <preset-name> --stdout`.
 */
export function generatePrompt(
  presetName: string,
  customization?: PromptCustomization
): GenerationResult | null {
  const preset = presetConfigs[presetName];
  if (!preset || !preset.prompts) return null;

  const resolvedPaths = resolvePrompts(preset.prompts, customization);

  const promptContents: string[] = [];
  let loadedCount = 0;

  for (const promptPath of resolvedPaths) {
    const content = promptFiles[promptPath];
    if (content) {
      promptContents.push(content);
      loadedCount++;
    }
  }

  if (loadedCount === 0) return null;

  const separator = "\n\n---\n\n";
  const header = buildHeader(preset, presetName, resolvedPaths, customization);
  const combined = header + separator + promptContents.join(separator);

  return {
    markdown: combined,
    presetName,
    presetConfig: preset,
    resolvedPaths,
    sizeKB: Math.round((combined.length / 1024) * 10) / 10,
    promptCount: loadedCount,
  };
}

/**
 * Get all available preset names.
 */
export function getAvailablePresets(): string[] {
  return Object.keys(presetConfigs).sort();
}

/**
 * Categorize the resolved prompt paths for display.
 */
export function categorizePrompts(
  paths: string[]
): { category: string; path: string; name: string }[] {
  return paths.map((p) => {
    const parts = p.split("/");
    const category =
      parts[0] === "ui"
        ? "UI Style"
        : parts[0] === "layouts"
          ? "Layout"
          : parts[0] === "animations"
            ? "Animation"
            : parts[0] === "3d"
              ? "3D Effect"
              : "Other";
    const name = parts[parts.length - 1].replace(".md", "");
    return { category, path: p, name };
  });
}
