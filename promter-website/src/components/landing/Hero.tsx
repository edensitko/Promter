"use client";

import dynamic from "next/dynamic";

const Aurora = dynamic(() => import("@/components/ui/Aurora"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative pt-26 pb-6 overflow-hidden">
      {/* Aurora WebGL background with CSS fallback */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          height: "100%",
          background: "radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 10%, rgba(236,72,153,0.1) 0%, transparent 50%)",
        }}
      >
        <Aurora
          colorStops={["#3b82f6", "#8b5cf6", "#ec4899"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
        {/* Fade to site background at the bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--color-surface))",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative">
        <div
          className="max-w-3xl mx-auto text-center"
          style={{ animation: "fadeInUp 0.8s ease" }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass text-xs font-medium text-white/70 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            15 presets &middot; 30+ prompt modules &middot; Infinite variations
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
            Describe it.{" "}
            <span className="gradient-text"> Prompt that.</span>
          </h1>

          <p className="mt-6 text-sm lg:text-lg text-white/45 max-w-md mx-auto leading-relaxed">
            Tell our AI what website you need and get a production-ready prompt
            for any AI coding assistant — in seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
