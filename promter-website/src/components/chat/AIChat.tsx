"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send, Sparkles, Bot, User, Copy, Check, Download,
  Layers, Paintbrush, LayoutGrid, Zap, Box,
  ChevronDown, ChevronUp, FileText, RefreshCw,
  ArrowRight, CheckCircle2, Circle,
} from "lucide-react";
import {
  analyzeInitialInput,
  getNextQuestion,
  processAnswer,
  buildGatheringSummary,
  buildPromptCustomization,
  type GatheredData,
  type Question,
  type QuestionOption,
} from "@/lib/question-engine";
import { generatePrompt, categorizePrompts, type GenerationResult } from "@/lib/prompt-generator";
import { categories } from "@/data/presets";
import { matchPresets } from "@/lib/preset-matcher";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  generation?: GenerationResult;
  isTyping?: boolean;
  /** Question for the user to answer */
  question?: Question;
  /** Progress bar value 0-100 */
  progress?: number;
  /** Summary of gathered data so far */
  gatheringSummary?: string;
}

type ConversationPhase = "idle" | "gathering" | "ready" | "generated";

// ─── Starter suggestions ─────────────────────────────────────────────────────

const suggestions = [
  "I need a SaaS landing page",
  "Build me a crypto trading dashboard",
  "Create a photography portfolio",
  "I want an online store",
  "A blog for my tech articles",
  "Restaurant website with menu",
  "Gaming site with 3D effects",
  "AI analytics dashboard",
];

const categoryIcons: Record<string, typeof Layers> = {
  "UI Style": Paintbrush,
  Layout: LayoutGrid,
  Animation: Zap,
  "3D Effect": Box,
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [expandedPrompt, setExpandedPrompt] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [phase, setPhase] = useState<ConversationPhase>("idle");
  const [gatheredData, setGatheredData] = useState<GatheredData | null>(null);
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll only within the chat container, not the whole page
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // ─── Handle initial description ──────────────────────────────────────────

  const startGathering = useCallback((query: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: query,
    };

    // Add typing indicator
    const typingId = (Date.now() + 1).toString();
    const typingMsg: Message = {
      id: typingId,
      role: "assistant",
      content: "",
      isTyping: true,
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setInput("");

    setTimeout(() => {
      // Analyze what we can extract from the initial description
      const initialData = analyzeInitialInput(query);
      setGatheredData(initialData);
      setPhase("gathering");

      // Get the first question
      const engineResult = getNextQuestion(initialData);

      if (engineResult.readyToGenerate) {
        // Very detailed description — skip to generation
        triggerGeneration(initialData, typingId);
        return;
      }

      // Build acknowledgment message
      const summary = buildGatheringSummary(initialData);
      let ack = `Great, let me help you build the perfect prompt!\n\n`;

      if (summary) {
        ack += `Here's what I picked up from your description:\n${summary}\n\n`;
      }

      ack += `I have a few questions to make sure the prompt is exactly right.`;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === typingId
            ? {
                ...m,
                content: ack,
                isTyping: false,
                progress: engineResult.progress,
              }
            : m
        )
      );

      // Ask the first question after a brief pause
      setTimeout(() => {
        askQuestion(engineResult.nextQuestion!, initialData, engineResult.progress);
      }, 600);
    }, 800);
  }, []);

  // Auto-submit pending recipe from templates page
  const hasAutoSubmitted = useRef(false);
  useEffect(() => {
    if (hasAutoSubmitted.current) return;
    const pending = localStorage.getItem("pendingRecipe");
    if (pending && phase === "idle" && messages.length === 0) {
      hasAutoSubmitted.current = true;
      localStorage.removeItem("pendingRecipe");
      startGathering(pending);
    }
  }, [phase, messages.length, startGathering]);

  // ─── Ask a question ──────────────────────────────────────────────────────

  function askQuestion(question: Question, data: GatheredData, progress: number) {
    const qMsg: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: question.text,
      question,
      progress,
      gatheringSummary: buildGatheringSummary(data),
    };
    setMessages((prev) => [...prev, qMsg]);
    setMultiSelect([]);
  }

  // ─── Handle option selection ─────────────────────────────────────────────

  function handleOptionClick(question: Question, option: QuestionOption) {
    if (question.allowMultiple) {
      // Toggle in multi-select
      setMultiSelect((prev) =>
        prev.includes(option.value)
          ? prev.filter((v) => v !== option.value)
          : [...prev, option.value]
      );
    } else {
      // Single select — submit immediately
      submitAnswer(question, option.value, option.label);
    }
  }

  function handleMultiSubmit(question: Question) {
    if (multiSelect.length === 0) return;
    const labels = multiSelect
      .map((v) => question.options.find((o) => o.value === v)?.label || v)
      .join(", ");
    submitAnswer(question, multiSelect, labels);
  }

  function submitAnswer(question: Question, answer: string | string[], displayText: string) {
    if (!gatheredData) return;

    // Add user's answer as a message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: displayText,
    };

    const typingId = (Date.now() + 1).toString();
    const typingMsg: Message = {
      id: typingId,
      role: "assistant",
      content: "",
      isTyping: true,
    };

    setMessages((prev) => [...prev, userMsg, typingMsg]);

    setTimeout(() => {
      // Update gathered data
      const updatedData = processAnswer(gatheredData, question.id, answer);
      setGatheredData(updatedData);

      // Check what's next
      const engineResult = getNextQuestion(updatedData);

      if (engineResult.readyToGenerate) {
        // We have enough — generate!
        triggerGeneration(updatedData, typingId);
      } else {
        // Ask the next question
        const nextQ = engineResult.nextQuestion!;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === typingId
              ? {
                  ...m,
                  content: nextQ.text,
                  isTyping: false,
                  question: nextQ,
                  progress: engineResult.progress,
                  gatheringSummary: buildGatheringSummary(updatedData),
                }
              : m
          )
        );
        setMultiSelect([]);
      }
    }, 500 + Math.random() * 400);
  }

  // ─── Handle free text answer to a question ───────────────────────────────

  function handleTextSubmit() {
    const text = input.trim();
    if (!text) return;

    // Find the last question in messages
    const lastQuestion = [...messages].reverse().find((m) => m.question);
    if (lastQuestion?.question && phase === "gathering") {
      submitAnswer(lastQuestion.question, text, text);
      setInput("");
    } else if (phase === "idle") {
      startGathering(text);
    } else if (phase === "generated") {
      // Start a new conversation
      setPhase("idle");
      setGatheredData(null);
      startGathering(text);
    }
  }

  // ─── Skip to generation ──────────────────────────────────────────────────

  function handleSkipToGenerate() {
    if (!gatheredData) return;

    const typingId = Date.now().toString();
    const typingMsg: Message = {
      id: typingId,
      role: "assistant",
      content: "",
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMsg]);

    setTimeout(() => {
      triggerGeneration(gatheredData, typingId);
    }, 500);
  }

  // ─── Generate the prompt ─────────────────────────────────────────────────

  function triggerGeneration(data: GatheredData, replaceMessageId: string) {
    const customization = buildPromptCustomization(data);
    const generation = generatePrompt(customization.presetId, customization);

    if (!generation) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === replaceMessageId
            ? { ...m, content: "Something went wrong generating the prompt. Please try again.", isTyping: false }
            : m
        )
      );
      return;
    }

    setPhase("generated");

    const prompts = categorizePrompts(generation.resolvedPaths);
    const p = generation.presetConfig;
    const catLabel = categories[p.category as keyof typeof categories]?.label || p.category;

    let response = `Your prompt is ready!\n\n`;
    response += `**${p.name}** (${catLabel})\n`;
    response += `${p.description}\n\n`;
    response += `I've assembled **${generation.promptCount} prompt modules** into a single cohesive prompt (${generation.sizeKB} KB):\n`;

    for (const pr of prompts) {
      response += `\n- **${pr.category}:** ${pr.name}`;
    }

    // Show what was customized
    const summary = buildGatheringSummary(data);
    if (summary) {
      response += `\n\n**Your requirements baked in:**\n${summary}`;
    }

    response += `\n\nCopy the full prompt below and paste into any AI coding assistant (ChatGPT, Claude, Cursor, Copilot).`;

    setMessages((prev) =>
      prev.map((m) =>
        m.id === replaceMessageId
          ? { ...m, content: response, generation, isTyping: false, progress: 100 }
          : m
      )
    );
  }

  // ─── Actions ─────────────────────────────────────────────────────────────

  function handleCopyFull(msgId: string, markdown: string) {
    navigator.clipboard.writeText(markdown);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2500);
  }

  function handleDownload(generation: GenerationResult) {
    const blob = new Blob([generation.markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prompt-${generation.presetName}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleRegenerate(msgId: string, presetName: string) {
    const customization = gatheredData ? buildPromptCustomization(gatheredData) : undefined;
    const newGeneration = generatePrompt(presetName, customization);
    if (!newGeneration) return;

    const prompts = categorizePrompts(newGeneration.resolvedPaths);

    let response = `Re-rolled! Here's a fresh combination:\n\n`;
    response += `**${newGeneration.presetConfig.name}** — ${newGeneration.promptCount} modules (${newGeneration.sizeKB} KB):\n`;

    for (const pr of prompts) {
      response += `\n- **${pr.category}:** ${pr.name}`;
    }

    response += `\n\nNew prompt ready — different module combination this time!`;

    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId
          ? { ...m, content: response, generation: newGeneration }
          : m
      )
    );
    setExpandedPrompt(null);
  }

  function handleStartOver() {
    setMessages([]);
    setPhase("idle");
    setGatheredData(null);
    setMultiSelect([]);
    setExpandedPrompt(null);
  }

  // ─── Render ──────────────────────────────────────────────────────────────

  const isExpanded = messages.length > 0;

  // Check if the most recent assistant message has a question (for showing skip button)
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant" && !m.isTyping);
  const hasActiveQuestion = lastAssistantMsg?.question != null;
  const canSkip = phase === "gathering" && gatheredData &&
    (gatheredData.websiteType || gatheredData.industry) &&
    hasActiveQuestion;

  return (
    <section id="generate" className="pt-8 pb-8 lg:pb-24 relative">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, rgba(108, 99, 255, 0.5) 0%, rgba(0, 212, 170, 0.2) 50%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div className="mx-auto max-w-4xl px-4 sm:px-3 lg:px-4 relative">

        {/* ─── Compact Input (idle state) ─────────────────────────────── */}
        {!isExpanded && (
          <ScrollReveal>
            <div className="max-w-2xl mx-auto">
              {/* Label */}
              <div className="text-center mb-2">
                <h3 className="text-sm sm:text-xl font-bold text-white ">
                  Describe your website and get a tailored AI prompt in seconds
                </h3>
                
              </div>

              {/* Input field */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTextSubmit();
                }}
                className="relative"
              >
                <div
                  className="rounded-2xl p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 transition-all duration-300"
                  style={{
                    boxShadow: "0 0 12px rgba(59,130,246,0.25), 0 0 24px rgba(139,92,246,0.2), 0 0 40px rgba(236,72,153,0.15)",
                  }}
                >
                  <div className="flex items-center gap-3 px-5 py-4 rounded-[15px] bg-[#12121a]">
                    <Sparkles size={18} className="text-primary-light flex-shrink-0" />
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="A SaaS landing page with glassmorphism and 3D effects..."
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0"
                      aria-label="Send message"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                </div>
              </form>

              {/* Suggestion pills */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => startGathering(s)}
                    className="text-[11px] text-white/40 px-3 py-1.5 rounded-full glass hover:bg-white/[0.08] hover:text-white/70 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Hint */}
              <p className="text-center text-[11px] text-white/15 mt-4">
                Powered locally &middot; Nothing sent to a server
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* ─── Expanded Chat (after first message) ────────────────────── */}
        {isExpanded && (
          <div
            className="glass rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 glow-primary ring-1 ring-white/[0.08]"
            style={{ animation: "fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            {/* Chat header */}
            <div className="px-6 py-3.5 border-b border-white/[0.06] flex items-center gap-3 bg-white/[0.02]">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">AI Prompt Builder</p>
                <p className="text-[11px] text-white/30 truncate">
                  {phase === "gathering" && "Gathering your requirements..."}
                  {phase === "ready" && "Ready to generate your prompt"}
                  {phase === "generated" && "Prompt generated — copy and use!"}
                  {phase === "idle" && "Describe your website to get started"}
                </p>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <button
                  onClick={handleStartOver}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors px-2.5 py-1 rounded-lg hover:bg-white/[0.04]"
                >
                  Start over
                </button>
                <span className="flex items-center gap-1.5 text-xs text-accent/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Online
                </span>
              </div>
            </div>

            {/* Messages area */}
            <div ref={scrollAreaRef} className="px-6 py-6 min-h-[300px] max-h-[600px] overflow-y-auto space-y-5 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  style={{ animation: "fadeInUp 0.3s ease" }}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot size={14} className="text-primary-light" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "max-w-[80%] bg-primary/20 border border-primary/20 text-white"
                        : "max-w-full w-full glass-bright text-white/80"
                    }`}
                  >
                    {msg.isTyping ? (
                      <div className="flex items-center gap-1.5 py-1 px-1">
                        <span className="w-2 h-2 rounded-full bg-white/40 typing-dot" />
                        <span className="w-2 h-2 rounded-full bg-white/40 typing-dot" />
                        <span className="w-2 h-2 rounded-full bg-white/40 typing-dot" />
                      </div>
                    ) : (
                      <>
                        {/* Progress bar */}
                        {msg.progress != null && msg.progress < 100 && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] text-white/30 font-medium">
                                Gathering details
                              </span>
                              <span className="text-[10px] text-accent/60 font-mono">
                                {msg.progress}%
                              </span>
                            </div>
                            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                                style={{ width: `${msg.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Response text */}
                        <div className="text-sm leading-relaxed whitespace-pre-line">
                          {msg.content.split("**").map((part, j) =>
                            j % 2 === 1 ? (
                              <strong key={j} className="text-white font-semibold">{part}</strong>
                            ) : (
                              <span key={j}>{part}</span>
                            )
                          )}
                        </div>

                        {/* Question subtitle */}
                        {msg.question?.subtext && (
                          <p className="text-xs text-white/25 mt-1.5">{msg.question.subtext}</p>
                        )}

                        {/* Question options */}
                        {msg.question && (
                          <div className="mt-3 space-y-2">
                            <div className="flex flex-wrap gap-2">
                              {msg.question.options.map((opt) => {
                                const isSelected = msg.question!.allowMultiple
                                  ? multiSelect.includes(opt.value)
                                  : false;

                                return (
                                  <button
                                    key={opt.value}
                                    onClick={() => handleOptionClick(msg.question!, opt)}
                                    className={`
                                      group flex items-center gap-2 text-xs px-3 py-2 rounded-xl
                                      border transition-all duration-200
                                      ${
                                        isSelected
                                          ? "bg-primary/20 border-primary/40 text-white"
                                          : "glass border-white/[0.06] text-white/50 hover:bg-white/[0.06] hover:text-white/80 hover:border-white/[0.12]"
                                      }
                                    `}
                                  >
                                    {msg.question!.allowMultiple && (
                                      isSelected
                                        ? <CheckCircle2 size={13} className="text-accent" />
                                        : <Circle size={13} className="text-white/20 group-hover:text-white/40" />
                                    )}
                                    {opt.icon && <span className="text-sm">{opt.icon}</span>}
                                    <span className="font-medium">{opt.label}</span>
                                    {opt.description && (
                                      <span className="text-white/25 hidden sm:inline">
                                        — {opt.description}
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Multi-select confirm button */}
                            {msg.question.allowMultiple && multiSelect.length > 0 && (
                              <button
                                onClick={() => handleMultiSubmit(msg.question!)}
                                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                              >
                                <ArrowRight size={13} />
                                Continue with {multiSelect.length} selected
                              </button>
                            )}

                            {/* Free text hint */}
                            {msg.question.allowFreeText && (
                              <p className="text-[10px] text-white/20 mt-1">
                                Or type your own answer below
                              </p>
                            )}
                          </div>
                        )}

                        {/* Full prompt output */}
                        {msg.generation && (
                          <div className="mt-4 space-y-3">
                            {/* Module summary pills */}
                            <div className="flex flex-wrap gap-1.5">
                              {categorizePrompts(msg.generation.resolvedPaths).map((pr, idx) => {
                                const Icon = categoryIcons[pr.category] || Layers;
                                return (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 text-[10px] font-medium text-white/40 px-2 py-1 rounded-md bg-white/[0.04]"
                                    style={{ animation: `slideIn 0.3s ease ${idx * 80}ms both` }}
                                  >
                                    <Icon size={10} className="text-primary/50" />
                                    {pr.name}
                                  </span>
                                );
                              })}
                              <span className="text-[10px] text-white/20 px-2 py-1">
                                {msg.generation.sizeKB} KB &middot; {msg.generation.promptCount} modules
                              </span>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => handleCopyFull(msg.id, msg.generation!.markdown)}
                                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white rounded-lg bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                              >
                                {copiedId === msg.id ? (
                                  <Check size={13} className="text-accent" />
                                ) : (
                                  <Copy size={13} />
                                )}
                                {copiedId === msg.id ? "Copied to clipboard!" : "Copy Full Prompt"}
                              </button>
                              <button
                                onClick={() => handleDownload(msg.generation!)}
                                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white/60 rounded-lg glass hover:bg-white/[0.06] hover:text-white transition-all duration-200"
                              >
                                <Download size={13} />
                                Download .md
                              </button>
                              <button
                                onClick={() => handleRegenerate(msg.id, msg.generation!.presetName)}
                                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white/60 rounded-lg glass hover:bg-white/[0.06] hover:text-white transition-all duration-200"
                              >
                                <RefreshCw size={13} />
                                Re-roll
                              </button>
                              <button
                                onClick={() =>
                                  setExpandedPrompt(expandedPrompt === msg.id ? null : msg.id)
                                }
                                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white/60 rounded-lg glass hover:bg-white/[0.06] hover:text-white transition-all duration-200"
                              >
                                <FileText size={13} />
                                {expandedPrompt === msg.id ? "Hide" : "Preview"} Prompt
                                {expandedPrompt === msg.id ? (
                                  <ChevronUp size={12} />
                                ) : (
                                  <ChevronDown size={12} />
                                )}
                              </button>
                            </div>

                            {/* Full prompt preview */}
                            {expandedPrompt === msg.id && (
                              <div
                                className="mt-2 rounded-xl overflow-hidden border border-white/[0.06]"
                                style={{ animation: "fadeInUp 0.3s ease" }}
                              >
                                <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.04]">
                                  <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/40" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/40" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/40" />
                                    <span className="ml-2 text-[10px] text-white/25 font-mono">
                                      prompt-{msg.generation.presetName}.md
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-white/20">
                                    {msg.generation.sizeKB} KB
                                  </span>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto p-4 bg-black/20">
                                  <pre className="text-xs text-white/50 font-mono whitespace-pre-wrap leading-relaxed">
                                    {msg.generation.markdown}
                                  </pre>
                                </div>
                                <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-t border-white/[0.04]">
                                  <span className="text-[10px] text-white/20">
                                    {msg.generation.markdown.split("\n").length} lines &middot;{" "}
                                    {msg.generation.markdown.length.toLocaleString()} chars
                                  </span>
                                  <button
                                    onClick={() => handleCopyFull(msg.id, msg.generation!.markdown)}
                                    className="text-[10px] font-medium text-primary/60 hover:text-primary transition-colors"
                                  >
                                    {copiedId === msg.id ? "Copied!" : "Copy all"}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User size={14} className="text-white/50" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom bar: input + skip button */}
            <div className="px-5 py-4 border-t border-white/[0.06] bg-white/[0.02] space-y-2">
              {/* Skip to generate button */}
              {canSkip && (
                <div className="flex justify-center">
                  <button
                    onClick={handleSkipToGenerate}
                    className="text-xs text-accent/50 hover:text-accent/80 px-4 py-1.5 rounded-lg hover:bg-accent/[0.06] transition-all duration-200 flex items-center gap-1.5 font-medium"
                  >
                    <Sparkles size={12} />
                    Skip remaining questions &amp; generate now
                  </button>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTextSubmit();
                }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 relative rounded-xl p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500"
                  style={{
                    boxShadow: "0 0 12px rgba(59,130,246,0.25), 0 0 24px rgba(139,92,246,0.2), 0 0 40px rgba(236,72,153,0.15)",
                  }}
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      phase === "gathering"
                        ? "Type your answer or click an option above..."
                        : "Describe another website to build..."
                    }
                    className="w-full bg-[#12121a] rounded-[11px] px-4 py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:bg-[#15131f] transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}
