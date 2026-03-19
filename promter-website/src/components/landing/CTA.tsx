"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const Grainient = dynamic(() => import("@/components/ui/Grainient"), {
  ssr: false,
});

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="rounded-3xl ring-1 ring-white/[0.08] text-center relative overflow-hidden">
            {/* Grainient background */}
            <div className="absolute inset-0">
              <Grainient
                color1="#3b82f6"
                color2="#8b5cf6"
                color3="#ec4899"
                timeSpeed={0.15}
                colorBalance={0}
                warpStrength={1}
                warpFrequency={4}
                warpSpeed={1.5}
                warpAmplitude={60}
                blendAngle={0}
                blendSoftness={0.08}
                rotationAmount={400}
                noiseScale={2}
                grainAmount={0.08}
                grainScale={2}
                grainAnimated={false}
                contrast={1.3}
                gamma={1}
                saturation={1}
                centerX={0}
                centerY={0}
                zoom={0.9}
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Subtle gradient border top */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-10" />

            <div className="relative z-10 p-8 sm:p-12 lg:p-16">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.08] backdrop-blur-sm flex items-center justify-center mx-auto mb-6 ring-1 ring-white/[0.12]">
                <Sparkles size={24} className="text-primary-light" />
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to build something{" "}
                <span className="gradient-text">amazing</span>?
              </h2>

              <p className="text-sm sm:text-base text-white/50 max-w-lg mx-auto mb-8 leading-relaxed">
                Explore our full library of prompt modules — UI styles, layouts,
                animations, and 3D effects. Copy, combine, and create.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Browse All Prompts
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="#generate"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium text-white/70 rounded-xl bg-white/[0.08] backdrop-blur-sm ring-1 ring-white/[0.12] hover:text-white hover:bg-white/[0.12] transition-all duration-200"
                >
                  Try the AI Generator
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
