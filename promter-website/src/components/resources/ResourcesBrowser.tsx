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
  Search,
  Layers,
} from "lucide-react";
import { promptFiles } from "@/data/embedded-prompts";

// ─── Helpers ────────────────────────────────────────────────────────────────

interface PromptItem {
  path: string;
  category: string;
  name: string;
  content: string;
  sizeKB: number;
  lineCount: number;
}

const categoryMeta: Record<
  string,
  { label: string; icon: typeof Layers; color: string }
> = {
  ui: { label: "UI Styles", icon: Paintbrush, color: "#8b5cf6" },
  layouts: { label: "Layouts", icon: LayoutGrid, color: "#3b82f6" },
  animations: { label: "Animations", icon: Zap, color: "#f59e0b" },
  "3d": { label: "3D Effects", icon: Box, color: "#ec4899" },
};

function buildItems(): PromptItem[] {
  return Object.entries(promptFiles).map(([path, content]) => {
    const parts = path.split("/");
    const category = parts[0];
    const name = parts[parts.length - 1].replace(".md", "");
    return {
      path,
      category,
      name,
      content,
      sizeKB: Math.round((content.length / 1024) * 10) / 10,
      lineCount: content.split("\n").length,
    };
  });
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function ResourcesBrowser() {
  const shuffledRef = useRef<PromptItem[] | null>(null);
  const allItems = useMemo(() => {
    if (!shuffledRef.current) {
      shuffledRef.current = shuffle(buildItems());
    }
    return shuffledRef.current;
  }, []);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const cats = new Map<string, number>();
    for (const item of allItems) {
      cats.set(item.category, (cats.get(item.category) || 0) + 1);
    }
    return cats;
  }, [allItems]);

  const filtered = useMemo(() => {
    let items = allItems;
    if (activeCategory !== "all") {
      items = items.filter((i) => i.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.path.toLowerCase().includes(q) ||
          i.content.toLowerCase().includes(q)
      );
    }
    // Deduplicate by path
    const seen = new Set<string>();
    return items.filter((i) => {
      if (seen.has(i.path)) return false;
      seen.add(i.path);
      return true;
    });
  }, [allItems, activeCategory, search]);

  function handleCopy(path: string, content: string) {
    navigator.clipboard.writeText(content);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2500);
  }

  const totalSize = useMemo(
    () =>
      Math.round(
        allItems.reduce((sum, i) => sum + i.content.length, 0) / 1024
      ),
    [allItems]
  );

  const uniqueCount = useMemo(() => {
    const seen = new Set<string>();
    allItems.forEach((i) => seen.add(i.path));
    return seen.size;
  }, [allItems]);

  return (
    <div>
      {/* Stats bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
        {[
          { label: "Total Modules", value: uniqueCount },
          { label: "Categories", value: categories.size },
          { label: "Total Size", value: `${totalSize} KB` },
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
            placeholder="Search prompts..."
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
            All ({uniqueCount})
          </button>
          {Array.from(categories.entries()).map(([cat, count]) => {
            const meta = categoryMeta[cat] || {
              label: cat,
              icon: Layers,
              color: "#fff",
            };
            const Icon = meta.icon;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 text-xs font-medium px-3.5 py-2.5 rounded-xl border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary/20 border-primary/40 text-white"
                    : "glass border-white/[0.06] text-white/50 hover:bg-white/[0.06] hover:text-white/80"
                }`}
              >
                <Icon size={13} style={{ color: meta.color }} />
                {meta.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Prompt cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((item) => {
          const meta = categoryMeta[item.category] || {
            label: item.category,
            icon: Layers,
            color: "#fff",
          };
          const Icon = meta.icon;
          const isExpanded = expandedPath === item.path;
          const isCopied = copiedPath === item.path;

          // Extract first heading line as subtitle
          const firstHeading = item.content
            .split("\n")
            .find((l) => l.startsWith("# "));
          const subtitle = firstHeading
            ? firstHeading.replace(/^#+\s*/, "")
            : "";

          return (
            <div
              key={item.path}
              className="glass rounded-2xl ring-1 ring-white/[0.06] overflow-hidden transition-all duration-200 hover:ring-white/[0.10]"
            >
              {/* Card header */}
              <div className="flex items-center gap-3 px-5 py-4">
                <Link
                  href={`/prompts/${item.name}`}
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${meta.color}15`,
                    border: `1px solid ${meta.color}30`,
                  }}
                >
                  <Icon size={16} style={{ color: meta.color }} />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/prompts/${item.name}`} className="text-sm font-semibold text-white truncate block hover:text-primary transition-colors">
                    {formatName(item.name)}
                  </Link>
                  <p className="text-[11px] text-white/30 truncate">
                    {subtitle || item.path}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[10px] text-white/20 font-mono">
                    {item.sizeKB} KB
                  </span>
                  <button
                    onClick={() => handleCopy(item.path, item.content)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                    title="Copy prompt"
                  >
                    {isCopied ? (
                      <Check size={14} className="text-accent" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      setExpandedPath(isExpanded ? null : item.path)
                    }
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                    title={isExpanded ? "Collapse" : "Expand"}
                  >
                    {isExpanded ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div className="border-t border-white/[0.04]">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
                      <span className="ml-2 text-[10px] text-white/25 font-mono">
                        {item.path}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-white/20">
                        {item.lineCount} lines
                      </span>
                      <button
                        onClick={() => handleCopy(item.path, item.content)}
                        className="text-[10px] font-medium text-primary/60 hover:text-primary transition-colors"
                      >
                        {isCopied ? "Copied!" : "Copy all"}
                      </button>
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto p-4 bg-black/20">
                    <pre className="text-xs text-white/50 font-mono whitespace-pre-wrap leading-relaxed">
                      {item.content}
                    </pre>
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
            No prompts found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
