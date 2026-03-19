"use client";

import { Star, StarHalf } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const row1 = [
  {
    name: "Alex Chen",
    role: "Full-Stack Developer",
    avatar: "AC",
    color: "#8b5cf6",
    stars: 5,
    text: "This saved me hours of prompt engineering. I just picked a preset, hit generate, and pasted into Cursor — had a full landing page in minutes.",
  },
  {
    name: "Sarah Kim",
    role: "Freelance Designer",
    avatar: "SK",
    color: "#3b82f6",
    stars: 4.5,
    text: "The modular approach is genius. I mix UI styles and animations to get exactly the vibe I want. Every generation feels unique.",
  },
  {
    name: "Marcus Rivera",
    role: "Startup Founder",
    avatar: "MR",
    color: "#ec4899",
    stars: 4.5,
    text: "We used this to prototype 5 different landing page concepts in one afternoon. The AI chat made it effortless to customize each one.",
  },
  {
    name: "Priya Sharma",
    role: "Frontend Engineer",
    avatar: "PS",
    color: "#10b981",
    stars: 4,
    text: "Finally a tool that understands what developers actually need. The TypeScript and accessibility specs in every prompt are a game changer.",
  },
  {
    name: "Tom Wilson",
    role: "Indie Hacker",
    avatar: "TW",
    color: "#f97316",
    stars: 4.5,
    text: "Shipped 3 landing pages in a single weekend using these presets. The randomized variations mean every site looks different. Incredible.",
  },
];

const row2 = [
  {
    name: "Emma Johansson",
    role: "Creative Developer",
    avatar: "EJ",
    color: "#f59e0b",
    stars: 5,
    text: "The 3D effects and animation modules are incredible. I generated an immersive portfolio site that blew my client away.",
  },
  {
    name: "David Park",
    role: "Agency Lead",
    avatar: "DP",
    color: "#00D4AA",
    stars: 4.5,
    text: "We've integrated the CLI into our workflow. Every new client project starts with a generated prompt — it's become our secret weapon.",
  },
  {
    name: "Lisa Thompson",
    role: "Product Designer",
    avatar: "LT",
    color: "#6C63FF",
    stars: 5,
    text: "The glassmorphism + aurora UI combo with scroll animations created the most beautiful SaaS page I've ever built. Absolutely love it.",
  },
  {
    name: "Jake Miller",
    role: "CTO at Launchpad",
    avatar: "JM",
    color: "#ef4444",
    stars: 4,
    text: "We evaluated a dozen prompt tools. This is the only one with proper modular architecture. The pick_n randomization is brilliant engineering.",
  },
  {
    name: "Nina Costa",
    role: "UX Developer",
    avatar: "NC",
    color: "#06b6d4",
    stars: 5,
    text: "I love how each UI style module includes full design tokens — colors, spacing, typography. It's like having a senior designer on call 24/7.",
  },
];

function TestimonialCard({ t }: { t: (typeof row1)[0] }) {
  return (
    <div className="glass rounded-xl p-3.5 ring-1 ring-white/[0.06] w-[260px] sm:w-[280px] flex-shrink-0">
      <div className="flex items-center gap-0.5 mb-2">
        {Array.from({ length: Math.floor(t.stars) }).map((_, j) => (
          <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />
        ))}
        {t.stars % 1 !== 0 && (
          <StarHalf size={10} className="text-yellow-400 fill-yellow-400" />
        )}
      </div>
      <p className="text-xs text-white/50 leading-relaxed mb-3">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold flex-shrink-0"
          style={{ backgroundColor: `${t.color}30`, color: t.color }}
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-[11px] font-semibold text-white">{t.name}</p>
          <p className="text-[9px] text-white/30">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: (typeof row1);
  direction: "left" | "right";
  duration: number;
}) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      {/* Side shadows */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, var(--color-surface), transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, var(--color-surface), transparent)" }} />

      <div
        className="flex gap-3"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          width: "max-content",
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-10 lg:py-32 relative">
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(236, 72, 153, 0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-14 px-4">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Loved by developers{" "}
              <span className="gradient-text">worldwide</span>
            </h2>
            <p className="mt-4 text-white/40 text-lg">
              See what builders are saying about Promter.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          <MarqueeRow items={row1} direction="left" duration={60} />
          <MarqueeRow items={row2} direction="right" duration={70} />
        </div>
      </div>
    </section>
  );
}
