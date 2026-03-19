"use client";

import {
  Shuffle,
  Puzzle,
  Paintbrush,
  Box,
  MonitorSmartphone,
  Terminal,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const features = [
  {
    icon: Shuffle,
    title: "Randomized Variations",
    description:
      "Every generation is unique. Presets use pick_one and pick_n to randomly combine UI styles, animations, and effects.",
  },
  {
    icon: Puzzle,
    title: "Modular Prompt System",
    description:
      "30+ individual prompts for UI styles, layouts, animations, and 3D effects that snap together like building blocks.",
  },
  {
    icon: Paintbrush,
    title: "More than 10 UI Design Systems",
    description:
      "From glassmorphism to brutalist, minimal to futuristic — each with complete color palettes, typography, and component specs.",
  },
  {
    icon: Box,
    title: "3D & Immersive Effects",
    description:
      "Add Three.js heroes, product viewers, 3D cards, and animated backgrounds for truly immersive experiences.",
  },
  {
    icon: MonitorSmartphone,
    title: "Production Ready",
    description:
      "Generated prompts include responsive behavior, accessibility requirements, TypeScript, and semantic HTML specs.",
  },
  {
    icon: Terminal,
    title: "CLI & AI Chat",
    description:
      "Use the CLI for instant generation, or describe what you want in plain English and let our AI pick the perfect recipe.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Everything you need to generate{" "}
              <span className="gradient-text">stunning websites</span>
            </h2>
            <p className="mt-4 text-white/40 text-lg">
              A complete prompt engineering toolkit — modular, randomizable,
              and battle-tested across hundreds of generations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 80}>
              <div className="glass rounded-2xl p-4 sm:p-6 lg:p-7 h-full group hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-3 sm:mb-5 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-300">
                  <f.icon size={18} className="text-primary-light sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xs sm:text-base font-semibold text-white mb-1 sm:mb-2">
                  {f.title}
                </h3>
                <p className="text-[11px] sm:text-sm text-white/40 leading-relaxed">
                  {f.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
