"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Paintbrush,
  LayoutGrid,
  Zap,
  Box,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
  FileText,
  LayoutTemplate,
  Rocket,
  LayoutDashboard,
  Building2,
  UserCheck,
  Sparkles,
  Palette,
  ShoppingBag,
  Gem,
  BrainCircuit,
  Bitcoin,
  Code2,
  Camera,
  Gamepad2,
  UtensilsCrossed,
  Music,
  Home,
  HeartPulse,
  GraduationCap,
  Users,
  Dumbbell,
  Plane,
  TrendingUp,
  CalendarDays,
  Newspaper,
  Pizza,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { promptFiles } from "@/data/embedded-prompts";
import {
  presets,
  categories as presetCategories,
  type PresetCategory,
  type Preset,
} from "@/data/presets";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ─── Shared Helpers ─────────────────────────────────────────────────────────

function formatName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const promptCategoryMeta: Record<
  string,
  { label: string; icon: LucideIcon; color: string }
> = {
  ui: { label: "UI Styles", icon: Paintbrush, color: "#8b5cf6" },
  layouts: { label: "Layouts", icon: LayoutGrid, color: "#3b82f6" },
  animations: { label: "Animations", icon: Zap, color: "#f59e0b" },
  "3d": { label: "3D Effects", icon: Box, color: "#ec4899" },
};

// ─── Prompt Helpers ─────────────────────────────────────────────────────────

interface PromptItem {
  path: string;
  category: string;
  name: string;
  content: string;
  sizeKB: number;
}

function buildPromptItems(): PromptItem[] {
  const seen = new Set<string>();
  return Object.entries(promptFiles)
    .filter(([path]) => {
      if (seen.has(path)) return false;
      seen.add(path);
      return true;
    })
    .map(([path, content]) => {
      const parts = path.split("/");
      return {
        path,
        category: parts[0],
        name: parts[parts.length - 1].replace(".md", ""),
        content,
        sizeKB: Math.round((content.length / 1024) * 10) / 10,
      };
    });
}

// ─── Template Helpers ───────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  Rocket, LayoutDashboard, Building2, UserCheck, Sparkles, Palette,
  ShoppingBag, Gem, BrainCircuit, Bitcoin, Code2, Camera, Gamepad2,
  UtensilsCrossed, FileText, Music, Home, HeartPulse, GraduationCap,
  Users, Dumbbell, Plane, TrendingUp, CalendarDays, Newspaper, Pizza, Briefcase,
};

const difficultyColors: Record<string, { bg: string; text: string }> = {
  beginner: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  intermediate: { bg: "bg-amber-500/15", text: "text-amber-400" },
  advanced: { bg: "bg-rose-500/15", text: "text-rose-400" },
};

function buildRecipeText(preset: Preset): string {
  const lines: string[] = [
    `# ${preset.name}`,
    `# ${preset.description}`,
    "",
    `Category: ${preset.category}`,
    `Difficulty: ${preset.difficulty}`,
    `Estimated Components: ${preset.estimatedComponents}`,
    `Framework: ${preset.framework} + ${preset.cssFramework}`,
    "",
  ];
  if (preset.uiStyles.length) lines.push(`UI Styles: ${preset.uiStyles.join(", ")}`);
  if (preset.layouts.length) lines.push(`Layouts: ${preset.layouts.join(", ")}`);
  if (preset.animations.length) lines.push(`Animations: ${preset.animations.join(", ")}`);
  if (preset.effects3d.length) lines.push(`3D Effects: ${preset.effects3d.join(", ")}`);
  lines.push("", `Tags: ${preset.tags.join(", ")}`);
  return lines.join("\n");
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function PresetsShowcase() {
  const [tab, setTab] = useState<"prompts" | "templates">("prompts");

  // Prompt state
  const shuffledPromptsRef = useRef<PromptItem[] | null>(null);
  const allPrompts = useMemo(() => {
    if (!shuffledPromptsRef.current) {
      shuffledPromptsRef.current = shuffle(buildPromptItems());
    }
    return shuffledPromptsRef.current;
  }, []);
  const [promptCategory, setPromptCategory] = useState<string>("all");
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  const promptCategories = useMemo(() => {
    const cats = new Map<string, number>();
    for (const item of allPrompts) {
      cats.set(item.category, (cats.get(item.category) || 0) + 1);
    }
    return cats;
  }, [allPrompts]);

  const filteredPrompts = useMemo(() => {
    const items = promptCategory === "all" ? allPrompts : allPrompts.filter((i) => i.category === promptCategory);
    return items.slice(0, 15);
  }, [allPrompts, promptCategory]);

  // Template state
  const [templateCategory, setTemplateCategory] = useState<string>("all");
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const templateCategoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of presets) {
      counts.set(p.category, (counts.get(p.category) || 0) + 1);
    }
    return counts;
  }, []);

  const shuffledPresetsRef = useRef<Preset[] | null>(null);
  const shuffledPresets = useMemo(() => {
    if (!shuffledPresetsRef.current) {
      shuffledPresetsRef.current = shuffle([...presets]);
    }
    return shuffledPresetsRef.current;
  }, []);

  const filteredTemplates = useMemo(() => {
    const items = templateCategory === "all" ? shuffledPresets : shuffledPresets.filter((p) => p.category === templateCategory);
    return items.slice(0, 15);
  }, [shuffledPresets, templateCategory]);

  function handleCopyPrompt(path: string, content: string) {
    navigator.clipboard.writeText(content);
    setCopiedPrompt(path);
    setTimeout(() => setCopiedPrompt(null), 2500);
  }

  function handleCopyTemplate(preset: Preset) {
    navigator.clipboard.writeText(buildRecipeText(preset));
    setCopiedTemplate(preset.id);
    setTimeout(() => setCopiedTemplate(null), 2500);
  }

  return (
    <section id="presets" className="py-24 lg:py-32 relative">
      {/* Background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(ellipse, rgba(108, 99, 255, 0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Prompt Library
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              ready-to-use{" "}
              <span className="gradient-text">
                {tab === "prompts" ? "prompt modules" : "templates"}
              </span>
            </h2>
            <p className="mt-4 text-white/40 text-sm sm:text-lg">
              {tab === "prompts"
                ? "UI styles, layouts, animations, and 3D effects — browse, preview, and copy any module directly."
                : "Complete website recipes that combine multiple prompt modules with built-in randomization."}
            </p>
          </div>
        </ScrollReveal>

        {/* Toggle */}
        <ScrollReveal>
          <div className="flex items-center justify-center mb-10">
            <div className="inline-flex items-center glass rounded-xl p-1 ring-1 ring-white/[0.08]">
              <button
                onClick={() => setTab("prompts")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  tab === "prompts"
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <FileText size={15} />
                Prompts
              </button>
              <button
                onClick={() => setTab("templates")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  tab === "templates"
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <LayoutTemplate size={15} />
                Templates
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── Prompts Tab ──────────────────────────────────────────────── */}
        {tab === "prompts" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 mb-10">
              {Array.from(promptCategories.entries()).map(([cat, count]) => {
                const meta = promptCategoryMeta[cat] || { label: cat, icon: Layers, color: "#fff" };
                const Icon = meta.icon;
                return (
                  <div
                    key={cat}
                    className="glass rounded-xl px-2 py-2 sm:px-4 sm:py-2.5 ring-1 ring-white/[0.06] flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2"
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Icon size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: meta.color }} />
                      <span className="text-xs sm:text-sm font-semibold text-white">{count}+</span>
                    </div>
                    <span className="text-[9px] sm:text-xs text-white/30">{meta.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-10">
              <button
                onClick={() => setPromptCategory("all")}
                className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  promptCategory === "all"
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "glass text-white/50 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Layers size={14} />
                All
              </button>
              {Array.from(promptCategories.entries()).map(([cat]) => {
                const meta = promptCategoryMeta[cat] || { label: cat, icon: Layers, color: "#fff" };
                const Icon = meta.icon;
                return (
                  <button
                    key={cat}
                    onClick={() => setPromptCategory(cat)}
                    className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                      promptCategory === cat
                        ? "text-white shadow-lg"
                        : "glass text-white/50 hover:text-white hover:bg-white/[0.06]"
                    }`}
                    style={
                      promptCategory === cat
                        ? { backgroundColor: meta.color, boxShadow: `0 8px 25px ${meta.color}33` }
                        : undefined
                    }
                  >
                    <Icon size={14} />
                    {meta.label}
                  </button>
                );
              })}
            </div>

            {/* Prompt cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              {filteredPrompts.map((item, i) => {
                const meta = promptCategoryMeta[item.category] || { label: item.category, icon: Layers, color: "#fff" };
                const Icon = meta.icon;
                const isExpanded = expandedPrompt === item.path;
                const isCopied = copiedPrompt === item.path;
                const firstHeading = item.content.split("\n").find((l) => l.startsWith("# "));
                const subtitle = firstHeading ? firstHeading.replace(/^#+\s*/, "") : item.path;

                return (
                  <ScrollReveal key={item.path} delay={i * 30}>
                    <div className="glass rounded-2xl ring-1 ring-white/[0.06] overflow-hidden group hover:ring-white/[0.10] transition-all duration-200 h-full flex flex-col">
                      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 sm:py-4">
                        <Link
                          href={`/prompts/${item.name}`}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30` }}
                        >
                          <Icon size={16} style={{ color: meta.color }} />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <Link href={`/prompts/${item.name}`} className="text-sm font-semibold text-white truncate block hover:text-primary transition-colors">{formatName(item.name)}</Link>
                          <p className="text-[11px] text-white/25 truncate">{subtitle}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className="text-[10px] text-white/20 font-mono mr-1">{item.sizeKB} KB</span>
                          <button
                            onClick={() => handleCopyPrompt(item.path, item.content)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                            title="Copy prompt"
                          >
                            {isCopied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                          </button>
                          <button
                            onClick={() => setExpandedPrompt(isExpanded ? null : item.path)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                            title={isExpanded ? "Collapse" : "Preview"}
                          >
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="border-t border-white/[0.04] flex-1">
                          <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02]">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-red-400/40" />
                              <span className="w-2 h-2 rounded-full bg-yellow-400/40" />
                              <span className="w-2 h-2 rounded-full bg-green-400/40" />
                              <span className="ml-2 text-[10px] text-white/20 font-mono">{item.path}</span>
                            </div>
                            <button
                              onClick={() => handleCopyPrompt(item.path, item.content)}
                              className="text-[10px] font-medium text-primary/60 hover:text-primary transition-colors"
                            >
                              {isCopied ? "Copied!" : "Copy all"}
                            </button>
                          </div>
                          <div className="max-h-[300px] overflow-y-auto p-4 bg-black/20">
                            <pre className="text-[11px] text-white/45 font-mono whitespace-pre-wrap leading-relaxed">
                              {item.content}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* View all link */}
            <div className="text-center mt-10">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary/70 hover:text-primary transition-colors"
              >
                View all library with search
                <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}

        {/* ─── Templates Tab ────────────────────────────────────────────── */}
        {tab === "templates" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 mb-10">
              {[
                { label: "Templates", value: presets.length },
                { label: "Categories", value: Object.keys(presetCategories).length },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-xl px-2 py-2 sm:px-4 sm:py-2.5 ring-1 ring-white/[0.06] flex flex-col items-center gap-0.5"
                >
                  <span className="text-xs sm:text-sm font-semibold text-white">{stat.value}+</span>
                  <span className="text-[9px] sm:text-xs text-white/30">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <button
                onClick={() => setTemplateCategory("all")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  templateCategory === "all"
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "glass text-white/50 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Layers size={14} />
                All
              </button>
              {(Object.keys(presetCategories) as PresetCategory[]).map((cat) => {
                const meta = presetCategories[cat];
                const count = templateCategoryCounts.get(cat) || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setTemplateCategory(cat)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      templateCategory === cat
                        ? "text-white shadow-lg"
                        : "glass text-white/50 hover:text-white hover:bg-white/[0.06]"
                    }`}
                    style={
                      templateCategory === cat
                        ? { backgroundColor: meta.color, boxShadow: `0 8px 25px ${meta.color}33` }
                        : undefined
                    }
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: meta.color }} />
                    {meta.label}
                  </button>
                );
              })}
            </div>

            {/* Template cards grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredTemplates.map((preset, i) => {
                const Icon = iconMap[preset.icon] || Sparkles;
                const catMeta = presetCategories[preset.category];
                const diff = difficultyColors[preset.difficulty];
                const isExpanded = expandedTemplate === preset.id;
                const isCopied = copiedTemplate === preset.id;
                const totalModules =
                  preset.uiStyles.length + preset.layouts.length + preset.animations.length + preset.effects3d.length;

                return (
                  <ScrollReveal key={preset.id} delay={i * 30}>
                    <div className="glass rounded-2xl ring-1 ring-white/[0.06] overflow-hidden group hover:ring-white/[0.12] transition-all duration-200 flex flex-col h-full">
                      <div className="px-5 pt-5 pb-4">
                        <div className="flex items-start gap-3 mb-3">
                          <Link
                            href={`/templates/${preset.id}`}
                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background: `${catMeta.color}15`, border: `1px solid ${catMeta.color}30` }}
                          >
                            <Icon size={18} style={{ color: catMeta.color }} />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <Link href={`/templates/${preset.id}`} className="text-sm font-semibold text-white truncate block hover:text-primary transition-colors">{preset.name}</Link>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className="text-[9px] font-medium px-1.5 py-0.5 rounded-md"
                                style={{ backgroundColor: `${catMeta.color}20`, color: catMeta.color }}
                              >
                                {catMeta.label}
                              </span>
                              <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-md ${diff.bg} ${diff.text}`}>
                                {preset.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-white/40 leading-relaxed mb-3">{preset.description}</p>

                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {preset.uiStyles.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[9px] text-white/30 bg-white/[0.04] rounded-md px-1.5 py-0.5">
                              <Paintbrush size={8} style={{ color: "#8b5cf6" }} />
                              {preset.uiStyles.length} UI
                            </span>
                          )}
                          {preset.layouts.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[9px] text-white/30 bg-white/[0.04] rounded-md px-1.5 py-0.5">
                              <LayoutGrid size={8} style={{ color: "#3b82f6" }} />
                              {preset.layouts.length} Layout
                            </span>
                          )}
                          {preset.animations.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[9px] text-white/30 bg-white/[0.04] rounded-md px-1.5 py-0.5">
                              <Zap size={8} style={{ color: "#f59e0b" }} />
                              {preset.animations.length} Anim
                            </span>
                          )}
                          {preset.effects3d.length > 0 && (
                            <span className="inline-flex items-center gap-1 text-[9px] text-white/30 bg-white/[0.04] rounded-md px-1.5 py-0.5">
                              <Box size={8} style={{ color: "#ec4899" }} />
                              {preset.effects3d.length} 3D
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-white/20 font-mono">~{preset.estimatedComponents} components</span>
                            <span className="text-[10px] text-white/15">·</span>
                            <span className="text-[10px] text-white/20 font-mono">{totalModules} modules</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleCopyTemplate(preset)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                              title="Copy recipe"
                            >
                              {isCopied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                            </button>
                            <button
                              onClick={() => setExpandedTemplate(isExpanded ? null : preset.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                              title={isExpanded ? "Collapse" : "View details"}
                            >
                              {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-white/[0.04] px-5 py-4 bg-white/[0.02] flex-1">
                          {(
                            [
                              { key: "uiStyles", label: "UI Styles", meta: promptCategoryMeta.ui },
                              { key: "layouts", label: "Layouts", meta: promptCategoryMeta.layouts },
                              { key: "animations", label: "Animations", meta: promptCategoryMeta.animations },
                              { key: "effects3d", label: "3D Effects", meta: promptCategoryMeta["3d"] },
                            ] as const
                          ).map(({ key, label, meta }) => {
                            const items = preset[key];
                            if (!items.length) return null;
                            const ModIcon = meta.icon;
                            return (
                              <div key={key} className="mb-3 last:mb-0">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                  <ModIcon size={11} style={{ color: meta.color }} />
                                  <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">{label}</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {items.map((item) => (
                                    <span
                                      key={item}
                                      className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/40 ring-1 ring-white/[0.06]"
                                    >
                                      {formatName(item)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                          <div className="mt-3 pt-3 border-t border-white/[0.04]">
                            <div className="flex flex-wrap gap-1">
                              {preset.tags.map((tag) => (
                                <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary/50">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* View all link */}
            <div className="text-center mt-10">
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary/70 hover:text-primary transition-colors"
              >
                View all templates
                <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
