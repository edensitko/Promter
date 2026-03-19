"use client";

import {
  Rocket, LayoutDashboard, Building2, UserCheck, Sparkles, Palette,
  ShoppingBag, Gem, BrainCircuit, Bitcoin, Code2, Camera, Gamepad2,
  UtensilsCrossed, FileText, Music, Home, HeartPulse, GraduationCap,
  Users, Dumbbell, Plane, TrendingUp, CalendarDays, Newspaper, Pizza,
  Briefcase, Paintbrush, LayoutGrid, Zap, Box, ArrowLeft, Copy, Check,
  Monitor, Smartphone, Layers as LayersIcon,
  type LucideIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type Preset, categories as presetCategories } from "@/data/presets";

const iconMap: Record<string, LucideIcon> = {
  Rocket, LayoutDashboard, Building2, UserCheck, Sparkles, Palette,
  ShoppingBag, Gem, BrainCircuit, Bitcoin, Code2, Camera, Gamepad2,
  UtensilsCrossed, FileText, Music, Home, HeartPulse, GraduationCap,
  Users, Dumbbell, Plane, TrendingUp, CalendarDays, Newspaper, Pizza, Briefcase,
};

const moduleMeta: Record<string, { label: string; icon: LucideIcon; color: string }> = {
  ui: { label: "UI Styles", icon: Paintbrush, color: "#8b5cf6" },
  layouts: { label: "Layouts", icon: LayoutGrid, color: "#3b82f6" },
  animations: { label: "Animations", icon: Zap, color: "#f59e0b" },
  "3d": { label: "3D Effects", icon: Box, color: "#ec4899" },
};

const difficultyColors: Record<string, { bg: string; text: string }> = {
  beginner: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  intermediate: { bg: "bg-amber-500/15", text: "text-amber-400" },
  advanced: { bg: "bg-rose-500/15", text: "text-rose-400" },
};

function formatName(name: string): string {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildRecipeText(preset: Preset): string {
  const lines: string[] = [
    `# ${preset.name}`, `# ${preset.description}`, "",
    `Category: ${preset.category}`, `Difficulty: ${preset.difficulty}`,
    `Estimated Components: ${preset.estimatedComponents}`,
    `Framework: ${preset.framework} + ${preset.cssFramework}`, "",
  ];
  if (preset.uiStyles.length) lines.push(`UI Styles: ${preset.uiStyles.join(", ")}`);
  if (preset.layouts.length) lines.push(`Layouts: ${preset.layouts.join(", ")}`);
  if (preset.animations.length) lines.push(`Animations: ${preset.animations.join(", ")}`);
  if (preset.effects3d.length) lines.push(`3D Effects: ${preset.effects3d.join(", ")}`);
  lines.push("", `Tags: ${preset.tags.join(", ")}`);
  return lines.join("\n");
}

export default function TemplateDetail({ preset }: { preset: Preset }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const Icon = iconMap[preset.icon] || Sparkles;
  const catMeta = presetCategories[preset.category];
  const diff = difficultyColors[preset.difficulty];
  const totalModules = preset.uiStyles.length + preset.layouts.length + preset.animations.length + preset.effects3d.length;
  const imagePath = `/templates/${preset.id}.png`;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
    img.src = imagePath;
  }, [imagePath]);

  function handleCopy() {
    const recipe = buildRecipeText(preset);
    localStorage.setItem("pendingRecipe", recipe);
    setCopied(true);
    router.push("/#generate");
  }

  // Build mock section cards from modules
  const allModules = [
    ...preset.uiStyles.map((m) => ({ name: m, color: "#8b5cf6" })),
    ...preset.layouts.map((m) => ({ name: m, color: "#3b82f6" })),
    ...preset.animations.slice(0, 3).map((m) => ({ name: m, color: "#f59e0b" })),
    ...preset.effects3d.slice(0, 2).map((m) => ({ name: m, color: "#ec4899" })),
  ].slice(0, 6);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* Back */}
      <Link
        href="/templates"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        All Templates
      </Link>

      {/* Preview Image */}
      <div className="glass rounded-2xl ring-1 ring-white/[0.08] overflow-hidden mb-6 relative">
        {hasImage ? (
          <div className="relative">
            <p className="text-sm font-medium text-white/40 px-4 pt-4 pb-3">Example image from template :</p>
            <img
              src={imagePath}
              alt={`${preset.name} preview`}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <Monitor size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">~{preset.estimatedComponents} components</span>
              </div>
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <LayersIcon size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">{totalModules} modules</span>
              </div>
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <Smartphone size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">Responsive</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative h-[280px] sm:h-[340px] overflow-hidden" style={{
            background: `linear-gradient(135deg, ${catMeta.color}20 0%, transparent 50%, ${catMeta.color}10 100%)`,
          }}>
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `linear-gradient(${catMeta.color}40 1px, transparent 1px), linear-gradient(90deg, ${catMeta.color}40 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }} />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-[80px]"
              style={{ background: catMeta.color }}
            />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[85%] max-w-[520px]">
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/[0.08]">
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#1a1a2e]/90 backdrop-blur-sm border-b border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                  </div>
                  <div className="flex-1 mx-2">
                    <div className="bg-white/[0.06] rounded-md px-3 py-1 flex items-center gap-2">
                      <Monitor size={10} className="text-white/20" />
                      <span className="text-[9px] text-white/25 font-mono truncate">promter.dev/templates/{preset.id}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0d0d1a]/95 backdrop-blur-sm p-4 h-[180px] sm:h-[220px] overflow-hidden relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded" style={{ background: `${catMeta.color}30` }} />
                      <div className="w-16 h-2 rounded-full bg-white/10" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-2 rounded-full bg-white/[0.06]" />
                      <div className="w-10 h-2 rounded-full bg-white/[0.06]" />
                      <div className="w-14 h-5 rounded-md" style={{ background: `${catMeta.color}25` }} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center mt-1">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${catMeta.color}20` }}>
                      <Icon size={14} style={{ color: catMeta.color }} />
                    </div>
                    <div className="w-44 h-3 rounded-full bg-white/15 mb-1.5" />
                    <div className="w-32 h-3 rounded-full mb-3" style={{ background: `${catMeta.color}20` }} />
                    <div className="w-52 h-2 rounded-full bg-white/[0.06] mb-1" />
                    <div className="w-40 h-2 rounded-full bg-white/[0.06] mb-3" />
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 mt-1">
                    {allModules.slice(0, 3).map((mod, i) => (
                      <div key={i} className="rounded-lg bg-white/[0.03] ring-1 ring-white/[0.04] p-2">
                        <div className="w-4 h-4 rounded mb-1.5" style={{ background: `${mod.color}15` }} />
                        <div className="w-full h-1.5 rounded-full bg-white/[0.06] mb-1" />
                        <div className="w-3/4 h-1.5 rounded-full bg-white/[0.04]" />
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0d0d1a] to-transparent" />
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <Monitor size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">~{preset.estimatedComponents} components</span>
              </div>
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <LayersIcon size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">{totalModules} modules</span>
              </div>
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <Smartphone size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">Responsive</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="glass rounded-2xl ring-1 ring-white/[0.08] p-6 sm:p-8 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${catMeta.color}15`, border: `1px solid ${catMeta.color}30` }}
          >
            <Icon size={24} style={{ color: catMeta.color }} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{preset.name}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[10px] font-medium px-2 py-1 rounded-md"
                style={{ backgroundColor: `${catMeta.color}20`, color: catMeta.color }}
              >
                {catMeta.label}
              </span>
              <span className={`text-[10px] font-medium px-2 py-1 rounded-md ${diff.bg} ${diff.text}`}>
                {preset.difficulty}
              </span>
              <span className="text-[10px] text-white/20 font-mono">~{preset.estimatedComponents} components</span>
              <span className="text-[10px] text-white/20 font-mono">{totalModules} modules</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-white/50 leading-relaxed mb-6">{preset.description}</p>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Redirecting..." : "Copy Recipe to Generate"}
        </button>
      </div>

      {/* Module sections */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {(
          [
            { key: "uiStyles", metaKey: "ui" },
            { key: "layouts", metaKey: "layouts" },
            { key: "animations", metaKey: "animations" },
            { key: "effects3d", metaKey: "3d" },
          ] as const
        ).map(({ key, metaKey }) => {
          const items = preset[key];
          if (!items.length) return null;
          const meta = moduleMeta[metaKey];
          const ModIcon = meta.icon;
          return (
            <div key={key} className="glass rounded-2xl ring-1 ring-white/[0.06] p-5">
              <div className="flex items-center gap-2 mb-3">
                <ModIcon size={14} style={{ color: meta.color }} />
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">{meta.label}</span>
                <span className="text-[10px] text-white/25 ml-auto">{items.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Link
                    key={item}
                    href={`/prompts/${item}`}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] text-white/45 ring-1 ring-white/[0.06] hover:text-white hover:bg-white/[0.08] transition-all duration-200"
                  >
                    {formatName(item)}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tags */}
      <div className="glass rounded-2xl ring-1 ring-white/[0.06] p-5 mb-6">
        <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Tags</p>
        <div className="flex flex-wrap gap-1.5">
          {preset.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-primary/10 text-primary/50">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="glass rounded-2xl ring-1 ring-white/[0.06] p-5">
        <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">Tech Stack</p>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/30 font-mono bg-white/[0.04] rounded-lg px-3 py-1.5">{preset.framework}</span>
          <span className="text-xs text-white/30 font-mono bg-white/[0.04] rounded-lg px-3 py-1.5">{preset.cssFramework}</span>
        </div>
      </div>
    </div>
  );
}
