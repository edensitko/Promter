"use client";

import { MessageSquare, Cpu, FileCode, Copy } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Describe Your Website",
    description:
      "Tell the AI what you need in plain English — 'I want a crypto dashboard' or 'Build me a photography portfolio.'",
  },
  {
    icon: Cpu,
    number: "02",
    title: "Answer Smart Questions",
    description:
      "The AI asks targeted follow-up questions about style, features, colors, animations, and more to understand exactly what you need.",
  },
  {
    icon: FileCode,
    number: "03",
    title: "Tailored Prompt Generated",
    description:
      "Your answers are combined with the best-matching preset modules into a comprehensive, personalized design spec — typically 5,000+ words.",
  },
  {
    icon: Copy,
    number: "04",
    title: "Paste & Build",
    description:
      "Copy the prompt into ChatGPT, Claude, Cursor, or any AI assistant. It generates a complete, cohesive website.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-10 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              From idea to website in{" "}
              <span className="gradient-text">4 steps</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30" />

          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 120}>
              <div className="text-center relative">
                <div className="w-14 h-14 rounded-2xl glass-bright mx-auto mb-5 flex items-center justify-center relative">
                  <step.icon size={22} className="text-primary-light" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent text-[10px] font-bold text-white flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/35 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
