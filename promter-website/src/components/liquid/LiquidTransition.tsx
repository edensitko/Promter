"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { uniqueFilterId } from "@/lib/svgFilterBuilder";
import { easeInOutQuad } from "@/lib/pathInterpolation";

export interface LiquidTransitionProps {
  children: React.ReactNode;
  /** Whether to trigger the transition. Toggle this to animate in/out */
  isTransitioning?: boolean;
  /** Called when exit animation completes (dissolve done) */
  onExitComplete?: () => void;
  /** Called when enter animation completes (reform done) */
  onEnterComplete?: () => void;
  /** Dissolve phase duration in ms. Default 400 */
  dissolveDuration?: number;
  /** Liquid bridge phase duration in ms. Default 200 */
  bridgeDuration?: number;
  /** Reform phase duration in ms. Default 400 */
  reformDuration?: number;
  /** Max displacement scale. Default 80 */
  maxScale?: number;
  /** feTurbulence base frequency. Default 0.015 */
  baseFrequency?: number;
  /** Bridge color. Default "#5227FF" */
  bridgeColor?: string;
  /** Additional CSS classes */
  className?: string;
}

type Phase = "idle" | "dissolve" | "bridge" | "reform";

/**
 * Full-page liquid transition using SVG displacement filters.
 *
 * Phase 1 — Dissolve: feTurbulence + feDisplacementMap scale 0→maxScale, fade out
 * Phase 2 — Bridge: full-screen liquid blob interstitial
 * Phase 3 — Reform: new content fades in, displacement scale maxScale→0
 *
 * Integrates with React Router / Next.js via onExitComplete / onEnterComplete callbacks.
 */
export default function LiquidTransition({
  children,
  isTransitioning = false,
  onExitComplete,
  onEnterComplete,
  dissolveDuration = 400,
  bridgeDuration = 200,
  reformDuration = 400,
  maxScale = 80,
  baseFrequency = 0.015,
  bridgeColor = "#5227FF",
  className = "",
}: LiquidTransitionProps) {
  const filterIdRef = useRef(uniqueFilterId("liquid-transition"));
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const animateValue = useCallback(
    (
      from: number,
      to: number,
      duration: number,
      onUpdate: (v: number) => void
    ): Promise<void> => {
      return new Promise((resolve) => {
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          onUpdate(from + (to - from) * easeInOutQuad(t));
          if (t < 1) {
            rafRef.current = requestAnimationFrame(tick);
          } else {
            resolve();
          }
        };
        rafRef.current = requestAnimationFrame(tick);
      });
    },
    []
  );

  // Run transition sequence
  useEffect(() => {
    if (!isTransitioning) {
      setPhase("idle");
      setOpacity(1);
      setScale(0);
      return;
    }

    // Reduced motion: instant swap
    if (reducedMotion.current) {
      setOpacity(0);
      onExitComplete?.();
      requestAnimationFrame(() => {
        setOpacity(1);
        onEnterComplete?.();
      });
      return;
    }

    let cancelled = false;

    const run = async () => {
      // Phase 1: Dissolve
      setPhase("dissolve");
      await Promise.all([
        animateValue(0, maxScale, dissolveDuration, (v) => {
          if (!cancelled) setScale(v);
        }),
        animateValue(1, 0, dissolveDuration, (v) => {
          if (!cancelled) setOpacity(v);
        }),
      ]);

      if (cancelled) return;
      onExitComplete?.();

      // Phase 2: Bridge
      setPhase("bridge");
      await new Promise((r) => setTimeout(r, bridgeDuration));

      if (cancelled) return;

      // Phase 3: Reform
      setPhase("reform");
      await Promise.all([
        animateValue(maxScale, 0, reformDuration, (v) => {
          if (!cancelled) setScale(v);
        }),
        animateValue(0, 1, reformDuration, (v) => {
          if (!cancelled) setOpacity(v);
        }),
      ]);

      if (cancelled) return;
      setPhase("idle");
      onEnterComplete?.();
    };

    run();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [
    isTransitioning,
    dissolveDuration,
    bridgeDuration,
    reformDuration,
    maxScale,
    animateValue,
    onExitComplete,
    onEnterComplete,
  ]);

  const filterId = filterIdRef.current;
  const totalDuration = dissolveDuration + bridgeDuration + reformDuration;

  return (
    <div className={`relative ${className}`}>
      {/* Inline SVG filter definition */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={3}
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Liquid bridge overlay */}
      {phase === "bridge" && (
        <div
          className="fixed inset-0 z-50"
          style={{ backgroundColor: bridgeColor }}
          aria-hidden="true"
        />
      )}

      {/* Content with displacement filter */}
      <div
        ref={contentRef}
        style={{
          opacity,
          filter: scale > 0 ? `url(#${filterId})` : undefined,
          willChange: phase !== "idle" ? "filter, opacity" : undefined,
          contain: "paint",
          // Cap total transition time for accessibility
          transitionDuration:
            totalDuration > 1000 ? "1000ms" : `${totalDuration}ms`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
