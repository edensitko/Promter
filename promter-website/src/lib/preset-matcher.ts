import { presets, type Preset } from "@/data/presets";

interface MatchResult {
  preset: Preset;
  score: number;
  matchedKeywords: string[];
  reasoning: string;
}

const synonyms: Record<string, string[]> = {
  startup: ["startup", "saas", "tech company", "app"],
  ecommerce: ["ecommerce", "e-commerce", "store", "shop", "sell", "products", "buy", "retail", "online store", "marketplace"],
  dashboard: ["dashboard", "admin", "analytics", "panel", "data", "metrics", "charts"],
  portfolio: ["portfolio", "showcase", "projects", "work", "personal site"],
  blog: ["blog", "articles", "posts", "writing", "content", "magazine", "news"],
  restaurant: ["restaurant", "food", "menu", "dining", "cafe", "bar", "bistro", "eatery"],
  gaming: ["gaming", "game", "esports", "play", "gamer"],
  crypto: ["crypto", "bitcoin", "trading", "defi", "blockchain", "web3", "ethereum"],
  nft: ["nft", "collectible", "digital art", "web3", "mint"],
  agency: ["agency", "studio", "creative", "design agency"],
  photography: ["photography", "photographer", "gallery", "photos", "images"],
  developer: ["developer", "programmer", "engineer", "coder", "dev"],
  corporate: ["corporate", "business", "company", "enterprise", "professional"],
  consultant: ["consultant", "freelance", "freelancer", "independent"],
  landing: ["landing page", "landing", "homepage", "conversion"],
  modern: ["modern", "clean", "sleek", "contemporary"],
  dark: ["dark", "dark mode", "dark theme", "night"],
  "3d": ["3d", "three-dimensional", "immersive", "interactive"],
  ai: ["ai", "artificial intelligence", "machine learning", "ml"],
  product: ["product", "launch", "announcement", "release"],
};

function tokenize(input: string): string[] {
  return input.toLowerCase().replace(/[^a-z0-9\s-]/g, "").split(/\s+/).filter(Boolean);
}

function findMatchingKeywords(input: string, preset: Preset): string[] {
  const lowerInput = input.toLowerCase();
  const matched: Set<string> = new Set();

  for (const tag of preset.tags) {
    if (lowerInput.includes(tag)) {
      matched.add(tag);
    }
  }

  for (const [key, syns] of Object.entries(synonyms)) {
    for (const syn of syns) {
      if (lowerInput.includes(syn)) {
        for (const tag of preset.tags) {
          if (tag === key || tag.includes(key) || key.includes(tag)) {
            matched.add(syn);
          }
        }
        if (preset.name.toLowerCase().includes(key) || preset.id.includes(key)) {
          matched.add(syn);
        }
      }
    }
  }

  return Array.from(matched);
}

function scorePreset(input: string, preset: Preset): number {
  const tokens = tokenize(input);
  const lowerInput = input.toLowerCase();
  let score = 0;

  for (const tag of preset.tags) {
    if (lowerInput.includes(tag)) score += 10;
    for (const token of tokens) {
      if (tag.includes(token)) score += 5;
      if (token.includes(tag)) score += 3;
    }
  }

  if (lowerInput.includes(preset.category)) score += 8;
  if (lowerInput.includes(preset.name.toLowerCase())) score += 15;

  for (const [, syns] of Object.entries(synonyms)) {
    for (const syn of syns) {
      if (lowerInput.includes(syn)) {
        for (const tag of preset.tags) {
          if (syns.includes(tag)) score += 7;
        }
      }
    }
  }

  if (lowerInput.includes("3d") || lowerInput.includes("immersive")) {
    if (preset.effects3d.length > 0) score += 12;
  }

  if (lowerInput.includes("simple") || lowerInput.includes("basic") || lowerInput.includes("easy")) {
    if (preset.difficulty === "beginner") score += 8;
    if (preset.difficulty === "advanced") score -= 5;
  }

  if (lowerInput.includes("advanced") || lowerInput.includes("complex") || lowerInput.includes("powerful")) {
    if (preset.difficulty === "advanced") score += 6;
  }

  return score;
}

function generateReasoning(preset: Preset, matchedKeywords: string[]): string {
  const parts: string[] = [];

  parts.push(`**${preset.name}** is the best match for your request.`);

  if (matchedKeywords.length > 0) {
    parts.push(`It covers: ${matchedKeywords.slice(0, 4).join(", ")}.`);
  }

  const uiStyle = preset.uiStyles[Math.floor(Math.random() * preset.uiStyles.length)];
  parts.push(`I'll use the **${uiStyle}** UI style with the **${preset.layouts[0].replace("-layout", "")}** layout.`);

  if (preset.animations.length > 0) {
    const anims = preset.animations.slice(0, 2).map((a) => a.replace("-", " "));
    parts.push(`Adding ${anims.join(" and ")} for polish.`);
  }

  if (preset.effects3d.length > 0) {
    parts.push(`Includes ${preset.effects3d.length} 3D effect(s) for an immersive experience.`);
  }

  parts.push(`Estimated ~${preset.estimatedComponents} components using ${preset.framework} + ${preset.cssFramework}.`);

  return parts.join(" ");
}

export interface MatchOutput {
  topMatch: MatchResult;
  alternatives: MatchResult[];
  selectedPrompts: {
    category: string;
    name: string;
    description: string;
  }[];
}

export function matchPresets(userInput: string): MatchOutput {
  const scored: MatchResult[] = presets
    .map((preset) => {
      const matchedKeywords = findMatchingKeywords(userInput, preset);
      const score = scorePreset(userInput, preset);
      return {
        preset,
        score,
        matchedKeywords,
        reasoning: generateReasoning(preset, matchedKeywords),
      };
    })
    .sort((a, b) => b.score - a.score);

  const topMatch = scored[0];
  const alternatives = scored.slice(1, 4).filter((s) => s.score > 0);

  const selectedPrompts = buildPromptList(topMatch.preset);

  return { topMatch, alternatives, selectedPrompts };
}

function buildPromptList(preset: Preset): { category: string; name: string; description: string }[] {
  const prompts: { category: string; name: string; description: string }[] = [];

  const uiStyle = preset.uiStyles[Math.floor(Math.random() * preset.uiStyles.length)];
  prompts.push({
    category: "UI Style",
    name: `${uiStyle}-ui`,
    description: `${capitalize(uiStyle)} design system with color palette, typography, and component styling`,
  });

  for (const layout of preset.layouts) {
    prompts.push({
      category: "Layout",
      name: layout,
      description: `${capitalize(layout.replace("-layout", ""))} page structure with sections, grids, and responsive behavior`,
    });
  }

  const animCount = Math.min(2, preset.animations.length);
  const shuffled = [...preset.animations].sort(() => Math.random() - 0.5);
  for (let i = 0; i < animCount; i++) {
    prompts.push({
      category: "Animation",
      name: shuffled[i],
      description: `${capitalize(shuffled[i].replace(/-/g, " "))} for micro-interactions and visual polish`,
    });
  }

  for (const effect of preset.effects3d.slice(0, 1)) {
    prompts.push({
      category: "3D Effect",
      name: effect,
      description: `${capitalize(effect.replace(/-/g, " "))} for immersive depth and interactivity`,
    });
  }

  return prompts;
}

function capitalize(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}
