"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
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
  FileText,
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
  Search,
  Layers,
  Paintbrush,
  LayoutGrid,
  Zap,
  Box,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import {
  presets,
  categories as presetCategories,
  type PresetCategory,
  type Preset,
} from "@/data/presets";

// ─── Icon Map ────────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
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
  FileText,
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
};

const difficultyColors: Record<string, { bg: string; text: string }> = {
  beginner: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  intermediate: { bg: "bg-amber-500/15", text: "text-amber-400" },
  advanced: { bg: "bg-rose-500/15", text: "text-rose-400" },
};

const moduleMeta: Record<string, { label: string; icon: LucideIcon; color: string }> = {
  ui: { label: "UI Styles", icon: Paintbrush, color: "#8b5cf6" },
  layouts: { label: "Layouts", icon: LayoutGrid, color: "#3b82f6" },
  animations: { label: "Animations", icon: Zap, color: "#f59e0b" },
  "3d": { label: "3D Effects", icon: Box, color: "#ec4899" },
};

function formatModuleName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function TemplatesBrowser() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of presets) {
      counts.set(p.category, (counts.get(p.category) || 0) + 1);
    }
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let items = presets;
    if (activeCategory !== "all") {
      items = items.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return items;
  }, [activeCategory, search]);

  function buildRecipeText(preset: Preset): string {
    const lines: string[] = [];
    lines.push(`# ${preset.name}`);
    lines.push(`# ${preset.description}`);
    lines.push("");
    lines.push(`Category: ${preset.category}`);
    lines.push(`Difficulty: ${preset.difficulty}`);
    lines.push(`Estimated Components: ${preset.estimatedComponents}`);
    lines.push(`Framework: ${preset.framework} + ${preset.cssFramework}`);
    lines.push("");
    if (preset.uiStyles.length) {
      lines.push(`UI Styles: ${preset.uiStyles.join(", ")}`);
    }
    if (preset.layouts.length) {
      lines.push(`Layouts: ${preset.layouts.join(", ")}`);
    }
    if (preset.animations.length) {
      lines.push(`Animations: ${preset.animations.join(", ")}`);
    }
    if (preset.effects3d.length) {
      lines.push(`3D Effects: ${preset.effects3d.join(", ")}`);
    }
    lines.push("");
    lines.push(`Tags: ${preset.tags.join(", ")}`);
    return lines.join("\n");
  }

  function handleCopy(preset: Preset) {
    navigator.clipboard.writeText(buildRecipeText(preset));
    setCopiedId(preset.id);
    setTimeout(() => setCopiedId(null), 2500);
  }

  return (
    <div>
      {/* Stats bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {[
          { label: "Templates", value: presets.length },
          { label: "Categories", value: Object.keys(presetCategories).length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass rounded-xl px-5 py-3 ring-1 ring-white/[0.06] text-center"
          >
            <p className="text-lg font-bold text-white">{stat.value}</p>
            <p className="text-[10px] text-white/30 uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-2.5 rounded-xl border transition-all duration-200 ${
              activeCategory === "all"
                ? "bg-primary/20 border-primary/40 text-white"
                : "glass border-white/[0.06] text-white/50 hover:bg-white/[0.06] hover:text-white/80"
            }`}
          >
            <Layers size={13} />
            All ({presets.length})
          </button>
          {(Object.keys(presetCategories) as PresetCategory[]).map((cat) => {
            const meta = presetCategories[cat];
            const count = categoryCounts.get(cat) || 0;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-2.5 rounded-xl border transition-all duration-200 ${
                  activeCategory === cat
                    ? "text-white"
                    : "glass border-white/[0.06] text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                }`}
                style={
                  activeCategory === cat
                    ? {
                        backgroundColor: `${meta.color}25`,
                        borderColor: `${meta.color}50`,
                      }
                    : undefined
                }
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                {meta.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Template cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((preset) => {
          const Icon = iconMap[preset.icon] || Sparkles;
          const catMeta = presetCategories[preset.category];
          const diff = difficultyColors[preset.difficulty];
          const isExpanded = expandedId === preset.id;
          const isCopied = copiedId === preset.id;
          const totalModules =
            preset.uiStyles.length +
            preset.layouts.length +
            preset.animations.length +
            preset.effects3d.length;

          return (
            <div
              key={preset.id}
              className="glass rounded-2xl ring-1 ring-white/[0.06] overflow-hidden group hover:ring-white/[0.12] transition-all duration-200 flex flex-col"
            >
              {/* Card header */}
              <div className="px-5 pt-5 pb-4">
                <div className="flex items-start gap-3 mb-3">
                  <Link
                    href={`/templates/${preset.id}`}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${catMeta.color}15`,
                      border: `1px solid ${catMeta.color}30`,
                    }}
                  >
                    <Icon size={18} style={{ color: catMeta.color }} />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/templates/${preset.id}`} className="text-sm font-semibold text-white truncate block hover:text-primary transition-colors">
                      {preset.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="text-[9px] font-medium px-1.5 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${catMeta.color}20`,
                          color: catMeta.color,
                        }}
                      >
                        {catMeta.label}
                      </span>
                      <span
                        className={`text-[9px] font-medium px-1.5 py-0.5 rounded-md ${diff.bg} ${diff.text}`}
                      >
                        {preset.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/40 leading-relaxed mb-3">
                  {preset.description}
                </p>

                {/* Module count pills */}
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

                {/* Footer row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/20 font-mono">
                      ~{preset.estimatedComponents} components
                    </span>
                    <span className="text-[10px] text-white/15">·</span>
                    <span className="text-[10px] text-white/20 font-mono">
                      {totalModules} modules
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(preset)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                      title="Copy recipe"
                    >
                      {isCopied ? (
                        <Check size={13} className="text-accent" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        setExpandedId(isExpanded ? null : preset.id)
                      }
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                      title={isExpanded ? "Collapse" : "View details"}
                    >
                      {isExpanded ? (
                        <ChevronUp size={13} />
                      ) : (
                        <ChevronDown size={13} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="border-t border-white/[0.04] px-5 py-4 bg-white/[0.02] flex-1">
                  {/* Module lists */}
                  {(
                    [
                      { key: "uiStyles", label: "UI Styles", meta: moduleMeta.ui },
                      { key: "layouts", label: "Layouts", meta: moduleMeta.layouts },
                      { key: "animations", label: "Animations", meta: moduleMeta.animations },
                      { key: "effects3d", label: "3D Effects", meta: moduleMeta["3d"] },
                    ] as const
                  ).map(({ key, label, meta }) => {
                    const items = preset[key];
                    if (!items.length) return null;
                    const ModIcon = meta.icon;
                    return (
                      <div key={key} className="mb-3 last:mb-0">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <ModIcon size={11} style={{ color: meta.color }} />
                          <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider">
                            {label}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {items.map((item) => (
                            <span
                              key={item}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-white/40 ring-1 ring-white/[0.06]"
                            >
                              {formatModuleName(item)}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Tags */}
                  <div className="mt-3 pt-3 border-t border-white/[0.04]">
                    <div className="flex flex-wrap gap-1">
                      {preset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[9px] text-white/20 font-mono bg-white/[0.04] rounded px-1.5 py-0.5">
                      {preset.framework}
                    </span>
                    <span className="text-[9px] text-white/20 font-mono bg-white/[0.04] rounded px-1.5 py-0.5">
                      {preset.cssFramework}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-sm text-white/30">
            No templates found matching your search.
          </p>
        </div>
      )}

      {/* Link to resources */}
      <div className="text-center mt-10">
        <Link
          href="/resources"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary/70 hover:text-primary transition-colors"
        >
          Browse individual prompt modules
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
