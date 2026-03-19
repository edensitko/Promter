"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Paintbrush, LayoutGrid, Zap, Box, Layers,
  ArrowLeft, Copy, Check, Monitor, Smartphone, Code2,
  type LucideIcon,
} from "lucide-react";

const categoryMeta: Record<string, { label: string; icon: LucideIcon; color: string; gradient: string }> = {
  ui: { label: "UI Styles", icon: Paintbrush, color: "#8b5cf6", gradient: "from-violet-600/30 via-purple-500/20 to-fuchsia-500/30" },
  layouts: { label: "Layouts", icon: LayoutGrid, color: "#3b82f6", gradient: "from-blue-600/30 via-cyan-500/20 to-sky-500/30" },
  animations: { label: "Animations", icon: Zap, color: "#f59e0b", gradient: "from-amber-600/30 via-orange-500/20 to-yellow-500/30" },
  "3d": { label: "3D Effects", icon: Box, color: "#ec4899", gradient: "from-pink-600/30 via-rose-500/20 to-red-500/30" },
};

function formatName(name: string): string {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

interface PromptData {
  path: string;
  category: string;
  name: string;
  content: string;
}

export default function PromptDetail({ prompt }: { prompt: PromptData }) {
  const [copied, setCopied] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const meta = categoryMeta[prompt.category] || { label: prompt.category, icon: Layers, color: "#fff", gradient: "from-gray-600/30 to-gray-500/30" };
  const Icon = meta.icon;
  const sizeKB = Math.round((prompt.content.length / 1024) * 10) / 10;
  const lineCount = prompt.content.split("\n").length;
  const firstHeading = prompt.content.split("\n").find((l) => l.startsWith("# "));
  const title = firstHeading ? firstHeading.replace(/^#+\s*/, "") : formatName(prompt.name);
  const imagePath = `/prompts/${prompt.category}/${prompt.name}.png`;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasImage(true);
    img.onerror = () => setHasImage(false);
    img.src = imagePath;
  }, [imagePath]);

  // Extract key sections from content for the preview
  const contentLines = prompt.content.split("\n");
  const sections = contentLines
    .filter((l) => l.startsWith("## "))
    .map((l) => l.replace(/^##\s*/, ""))
    .slice(0, 8);

  function handleCopy() {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      {/* Back */}
      <Link
        href="/resources"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        All Prompts
      </Link>

      {/* Preview Image */}
      <div className="glass rounded-2xl ring-1 ring-white/[0.08] overflow-hidden mb-4 relative">
        {hasImage ? (
          /* Real screenshot */
          <div className="relative">
            <p className="text-sm font-medium text-white/40 px-4 pt-4 pb-3">Example image from prompt :</p>
            <img
              src={imagePath}
              alt={`${title} preview`}
              className="w-full h-auto object-cover"
            />
            {/* Floating badges */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <Monitor size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">Desktop</span>
              </div>
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <Smartphone size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">Mobile</span>
              </div>
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <Code2 size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">{lineCount} lines</span>
              </div>
            </div>
          </div>
        ) : (
          /* Mock wireframe fallback */
          <div className={`relative h-[240px] sm:h-[300px] bg-gradient-to-br ${meta.gradient} overflow-hidden`}>
            <div className="absolute inset-0 opacity-[0.04] rounded-2xl" style={{
              backgroundImage: `linear-gradient(${meta.color}40 1px, transparent 1px), linear-gradient(90deg, ${meta.color}40 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }} />
            <div
              className="absolute top-1/2 left-1/2 rounded-2xl -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-20 blur-[80px]"
              style={{ background: meta.color }}
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
                      <span className="text-[9px] text-white/25 font-mono truncate">{prompt.path}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#0d0d1a]/95 backdrop-blur-sm p-4 h-[180px] sm:h-[220px] overflow-hidden relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded" style={{ background: `${meta.color}30` }} />
                      <div className="w-16 h-2 rounded-full bg-white/10" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-2 rounded-full bg-white/[0.06]" />
                      <div className="w-10 h-2 rounded-full bg-white/[0.06]" />
                      <div className="w-14 h-5 rounded-md" style={{ background: `${meta.color}25` }} />
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center mt-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: `${meta.color}20` }}>
                      <Icon size={14} style={{ color: meta.color }} />
                    </div>
                    <div className="w-48 h-3 rounded-full bg-white/15 mb-2" />
                    <div className="w-36 h-3 rounded-full mb-3" style={{ background: `${meta.color}20` }} />
                    <div className="w-56 h-2 rounded-full bg-white/[0.06] mb-1" />
                    <div className="w-44 h-2 rounded-full bg-white/[0.06] mb-4" />
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-6 rounded-md" style={{ background: `${meta.color}30` }} />
                      <div className="w-20 h-6 rounded-md bg-white/[0.06] ring-1 ring-white/[0.08]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="rounded-lg bg-white/[0.03] ring-1 ring-white/[0.04] p-2">
                        <div className="w-4 h-4 rounded mb-1.5" style={{ background: `${meta.color}15` }} />
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
                <span className="text-[9px] text-white/40">Desktop</span>
              </div>
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <Smartphone size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">Mobile</span>
              </div>
              <div className="glass rounded-lg px-2.5 py-1.5 ring-1 ring-white/[0.08] flex items-center gap-1.5">
                <Code2 size={10} className="text-white/40" />
                <span className="text-[9px] text-white/40">{lineCount} lines</span>
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
            style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30` }}
          >
            <Icon size={24} style={{ color: meta.color }} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[10px] font-medium px-2 py-1 rounded-md"
                style={{ backgroundColor: `${meta.color}20`, color: meta.color }}
              >
                {meta.label}
              </span>
              <span className="text-[10px] text-white/20 font-mono">{sizeKB} KB</span>
              <span className="text-[10px] text-white/20 font-mono">{lineCount} lines</span>
            </div>
          </div>
        </div>

        {/* Sections overview */}
        {sections.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {sections.map((section) => (
              <span
                key={section}
                className="text-[10px] px-2 py-1 rounded-md bg-white/[0.04] text-white/35 ring-1 ring-white/[0.06]"
              >
                {section}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Prompt"}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="glass rounded-2xl ring-1 ring-white/[0.06] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
            <span className="ml-2 text-[11px] text-white/25 font-mono">{prompt.path}</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-[11px] font-medium text-primary/60 hover:text-primary transition-colors"
          >
            {copied ? "Copied!" : "Copy all"}
          </button>
        </div>
        <div className="max-h-[600px] overflow-y-auto p-5 bg-black/20">
          <pre className="text-xs text-white/50 font-mono whitespace-pre-wrap leading-relaxed">
            {prompt.content}
          </pre>
        </div>
      </div>
    </div>
  );
}
