"use client";

import { Copy, FileText, Layers, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function HowToUse() {
  return (
    <section className="py-10 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              How to Use Your Generated Prompt
            </h2>
            <p className="text-sm text-white/40 max-w-2xl mx-auto">
              Copy the prompt and use it with any AI assistant, add it to your
              skills library, or integrate it into your existing workflow.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Method 1: Direct Paste */}
          <ScrollReveal>
            <div className="glass rounded-2xl p-6 ring-1 ring-white/[0.06] h-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 ring-1 ring-white/[0.06]">
                <Copy size={18} className="text-primary-light" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">
                Paste into Any AI Chat
              </h3>
              <p className="text-xs text-white/35 leading-relaxed mb-4">
                The simplest way to use your prompt. Copy and paste directly into
                your favorite AI tool.
              </p>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary-light text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-primary/20">
                    1
                  </span>
                  <p className="text-xs text-white/45 leading-relaxed">
                    Click{" "}
                    <span className="text-white/70 font-medium">
                      Copy Full Prompt
                    </span>{" "}
                    after generating
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary-light text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-primary/20">
                    2
                  </span>
                  <p className="text-xs text-white/45 leading-relaxed">
                    Open{" "}
                    <span className="text-white/70 font-medium">
                      ChatGPT, Claude, Gemini
                    </span>
                    , or any AI chat
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary-light text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-primary/20">
                    3
                  </span>
                  <p className="text-xs text-white/45 leading-relaxed">
                    Paste the prompt and hit send &mdash; the AI will generate
                    your complete website
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-[10px] text-white/25 font-mono leading-relaxed">
                  Works with: ChatGPT &middot; Claude &middot; Gemini &middot;
                  Copilot &middot; Mistral &middot; DeepSeek
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Method 2: AI Code Editors */}
          <ScrollReveal>
            <div className="glass rounded-2xl p-6 ring-1 ring-white/[0.06] h-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4 ring-1 ring-white/[0.06]">
                <FileText size={18} className="text-accent" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">
                Add to AI Code Editors
              </h3>
              <p className="text-xs text-white/35 leading-relaxed mb-4">
                Use the prompt as a skill, custom instruction, or project rule in
                your AI-powered code editor.
              </p>
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[11px] font-semibold text-white/60 mb-1">
                    Cursor
                  </p>
                  <p className="text-[10px] text-white/30 leading-relaxed">
                    Save as{" "}
                    <span className="font-mono text-white/45">
                      .cursor/rules/website.md
                    </span>{" "}
                    in your project, or add to{" "}
                    <span className="text-white/45">Settings &rarr; Rules</span>{" "}
                    as a project rule
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[11px] font-semibold text-white/60 mb-1">
                    Claude Code
                  </p>
                  <p className="text-[10px] text-white/30 leading-relaxed">
                    Save as{" "}
                    <span className="font-mono text-white/45">CLAUDE.md</span>{" "}
                    in your project root, or paste directly into a conversation
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[11px] font-semibold text-white/60 mb-1">
                    Windsurf / Copilot
                  </p>
                  <p className="text-[10px] text-white/30 leading-relaxed">
                    Add to{" "}
                    <span className="font-mono text-white/45">
                      .windsurfrules
                    </span>{" "}
                    or{" "}
                    <span className="font-mono text-white/45">
                      .github/copilot-instructions.md
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Method 3: Existing Projects */}
          <ScrollReveal>
            <div className="glass rounded-2xl p-6 ring-1 ring-white/[0.06] h-full">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD93D]/20 to-[#FFD93D]/5 flex items-center justify-center mb-4 ring-1 ring-white/[0.06]">
                <Layers size={18} className="text-[#FFD93D]/80" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">
                Add to Existing Projects
              </h3>
              <p className="text-xs text-white/35 leading-relaxed mb-4">
                Integrate the prompt into your project&apos;s skills library or
                use the CLI tool for automation.
              </p>
              <div className="space-y-3">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[11px] font-semibold text-white/60 mb-1">
                    As a Skill File
                  </p>
                  <p className="text-[10px] text-white/30 leading-relaxed">
                    Save the{" "}
                    <span className="font-mono text-white/45">.md</span> file to
                    a{" "}
                    <span className="font-mono text-white/45">/prompts</span> or{" "}
                    <span className="font-mono text-white/45">/skills</span>{" "}
                    folder in your project. Reference it whenever you need to
                    scaffold new pages or components.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[11px] font-semibold text-white/60 mb-1">
                    CLI Tool
                  </p>
                  <p className="text-[10px] text-white/30 leading-relaxed font-mono">
                    npx promter generate startup-landing --output
                    ./prompts/landing.md
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                  <p className="text-[11px] font-semibold text-white/60 mb-1">
                    Combine with Your Stack
                  </p>
                  <p className="text-[10px] text-white/30 leading-relaxed">
                    Prepend project-specific context (tech stack, design tokens,
                    component library) to the prompt for results tailored to your
                    codebase.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Pro tip */}
        <ScrollReveal>
          <div className="mt-6 glass rounded-2xl p-5 ring-1 ring-white/[0.06] flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 ring-1 ring-accent/20">
              <Sparkles size={14} className="text-accent" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white/70 mb-1">
                Pro Tip
              </p>
              <p className="text-xs text-white/35 leading-relaxed">
                For the best results, paste the prompt into an AI code editor
                like <span className="text-white/55">Cursor</span> or{" "}
                <span className="text-white/55">Claude Code</span> within an
                empty project folder. The AI will generate the full file
                structure, components, and styling in one go. Use{" "}
                <span className="text-white/55">Re-roll</span> to get different
                module combinations from the same preset &mdash; each generation
                picks random UI styles, animations, and effects for unique
                results.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
