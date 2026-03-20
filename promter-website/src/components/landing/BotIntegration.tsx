"use client";

import { Bot, Globe, Code2, Terminal, Copy, Check } from "lucide-react";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const pythonSnippet = `import requests
import anthropic

# Fetch all prompts from Promter
prompts = requests.get("https://promter.dev/api/prompts.json").json()
presets = requests.get("https://promter.dev/api/presets.json").json()

# Pick a prompt module
ui_prompt = prompts["prompts"]["ui/modern-ui.md"]

# Send to Claude to generate a website
client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    messages=[{
        "role": "user",
        "content": f"{ui_prompt}\\n\\nBuild me a landing page using this style."
    }]
)
print(message.content[0].text)`;

const curlSnippet = `# Fetch all prompt modules
curl https://promter.dev/api/prompts.json

# Fetch all preset/template configs
curl https://promter.dev/api/presets.json`;

const nodeSnippet = `const res = await fetch("https://promter.dev/api/prompts.json");
const { prompts } = await res.json();

// Get a specific prompt by path
const glassmorphism = prompts["ui/glassmorphism-ui.md"];
const heroLayout = prompts["layouts/landing-layout.md"];

// Combine modules into one prompt
const fullPrompt = [glassmorphism, heroLayout].join("\\n\\n");`;

export default function BotIntegration() {
  const [activeTab, setActiveTab] = useState<"python" | "curl" | "node">("python");
  const [copied, setCopied] = useState(false);

  const snippets = { python: pythonSnippet, curl: curlSnippet, node: nodeSnippet };

  function handleCopy() {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <section id="bot-api" className="py-24 lg:py-32 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(ellipse, rgba(0, 212, 170, 0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Bot & API Access
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Use with your{" "}
              <span className="gradient-text">AI bot or server</span>
            </h2>
            <p className="mt-4 text-white/40 text-lg max-w-2xl mx-auto">
              All prompts are available as public JSON endpoints. Fetch them from any bot,
              script, or server — no API key required.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {/* Endpoints */}
          <ScrollReveal>
            <div className="glass rounded-2xl p-5 ring-1 ring-white/[0.06] h-full">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center ring-1 ring-white/[0.06]">
                  <Globe size={16} className="text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-white">Public Endpoints</h3>
              </div>

              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-accent/70 bg-accent/10 px-1.5 py-0.5 rounded">GET</span>
                    <span className="text-[11px] font-mono text-white/60">/api/prompts.json</span>
                  </div>
                  <p className="text-[10px] text-white/30">All prompt MD files — UI styles, layouts, animations, 3D effects.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-accent/70 bg-accent/10 px-1.5 py-0.5 rounded">GET</span>
                    <span className="text-[11px] font-mono text-white/60">/api/presets.json</span>
                  </div>
                  <p className="text-[10px] text-white/30">All template configs — module combinations, categories, metadata.</p>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-bold text-accent/70 bg-accent/10 px-1.5 py-0.5 rounded">GET</span>
                    <span className="text-[11px] font-mono text-white/60">/api/skill.md</span>
                  </div>
                  <p className="text-[10px] text-white/30">Bot skill file — system prompt for website generation.</p>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-[9px] text-white/25 leading-relaxed">
                  No auth &middot; No rate limits &middot; Static &middot; Updated on deploy
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Use cases */}
          <ScrollReveal>
            <div className="glass rounded-2xl p-5 ring-1 ring-white/[0.06] h-full">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-white/[0.06]">
                  <Bot size={16} className="text-primary-light" />
                </div>
                <h3 className="text-sm font-semibold text-white">Use Cases</h3>
              </div>

              <div className="space-y-2.5">
                {[
                  { title: "Bot on EC2 / Server", desc: "Fetch prompts, feed to a model, auto-generate full websites." },
                  { title: "CI/CD Pipeline", desc: "Pull latest prompts to scaffold new projects automatically." },
                  { title: "Discord / Slack Bot", desc: "Users request websites from chat — bot fetches & generates." },
                  { title: "Custom Agent", desc: "Autonomous agent picks prompts based on requirements." },
                ].map((item) => (
                  <div key={item.title} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                    <p className="text-[11px] font-semibold text-white/60 mb-0.5">{item.title}</p>
                    <p className="text-[10px] text-white/30 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Skill Install */}
          <ScrollReveal>
            <div className="glass rounded-2xl p-5 ring-1 ring-white/[0.06] h-full">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF8A65]/20 to-[#FF8A65]/5 flex items-center justify-center ring-1 ring-white/[0.06]">
                  <Terminal size={16} className="text-[#FF8A65]" />
                </div>
                <h3 className="text-sm font-semibold text-white">Install Skill</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent/10 text-accent text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-accent/20">1</span>
                  <div className="flex-1">
                    <p className="text-[10px] text-white/40 mb-1.5">Claude Code:</p>
                    <div className="rounded-lg bg-black/20 border border-white/[0.05] px-2.5 py-2">
                      <code className="text-[10px] font-mono text-white/50 break-all">curl -o CLAUDE.md https://promter.dev/api/skill.md</code>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent/10 text-accent text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-accent/20">2</span>
                  <div className="flex-1">
                    <p className="text-[10px] text-white/40 mb-1.5">Cursor:</p>
                    <div className="rounded-lg bg-black/20 border border-white/[0.05] px-2.5 py-2">
                      <code className="text-[10px] font-mono text-white/50 break-all">curl -o .cursor/rules/promter.md https://promter.dev/api/skill.md</code>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-accent/10 text-accent text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-accent/20">3</span>
                  <div className="flex-1">
                    <p className="text-[10px] text-white/40 mb-1.5">Then ask:</p>
                    <div className="rounded-lg bg-black/20 border border-white/[0.05] px-2.5 py-2">
                      <code className="text-[10px] font-mono text-white/50 italic">&quot;Build me a SaaS landing page&quot;</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                <p className="text-[9px] text-white/25">
                  Works with: <span className="text-white/35">Claude Code</span> &middot; <span className="text-white/35">Cursor</span> &middot; <span className="text-white/35">Windsurf</span> &middot; <span className="text-white/35">Copilot</span>
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Code example */}
        <ScrollReveal>
          <div className="glass rounded-2xl ring-1 ring-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <Code2 size={14} className="text-white/30" />
                <div className="flex gap-1">
                  {(["python", "node", "curl"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-primary/20 text-white"
                          : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                      }`}
                    >
                      {tab === "node" ? "Node.js" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/[0.04]"
              >
                {copied ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="p-5 bg-black/20 overflow-x-auto">
              <pre className="text-xs text-white/50 font-mono whitespace-pre leading-relaxed">
                {snippets[activeTab]}
              </pre>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
