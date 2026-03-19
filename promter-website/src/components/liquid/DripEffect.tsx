"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { uniqueFilterId } from "@/lib/svgFilterBuilder";

export interface DripEffectProps {
  children: React.ReactNode;
  /** Trigger mode: "scroll" reacts to scroll position, "hover" reacts to mouse */
  trigger?: "scroll" | "hover";
  /** Maximum drip displacement scale. Default 40 */
  intensity?: number;
  /** Number of teardrop drip elements. Default 3 */
  dripCount?: number;
  /** Drip color (should match element background). Default "#5227FF" */
  dripColor?: string;
  /** Drip animation duration in ms. Default 1000 */
  dripDuration?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Elements appear to melt or drip on scroll or hover interaction.
 * Uses an SVG displacement filter on the bottom portion plus
 * animated teardrop pseudo-elements that scale and drop downward.
 */
export default function DripEffect({
  children,
  trigger = "scroll",
  intensity = 40,
  dripCount = 3,
  dripColor = "#5227FF",
  dripDuration = 1000,
  className = "",
}: DripEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const filterIdRef = useRef(uniqueFilterId("drip"));
  const [progress, setProgress] = useState(0);
  const [dripPhases, setDripPhases] = useState<number[]>(
    Array(dripCount).fill(0)
  );
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Scroll-based trigger
  useEffect(() => {
    if (trigger !== "scroll" || reducedMotion.current) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const ratio = entry.intersectionRatio;
          setProgress(Math.min(ratio * 2, 1));
        } else {
          setProgress(0);
        }
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  // Hover trigger
  const onMouseEnter = useCallback(() => {
    if (trigger !== "hover" || reducedMotion.current) return;
    setProgress(1);
    // Trigger drip animations with staggered timing
    dripPhases.forEach((_, i) => {
      setTimeout(() => {
        setDripPhases((prev) => {
          const next = [...prev];
          next[i] = 1;
          return next;
        });
      }, i * 150);
    });
  }, [trigger, dripPhases.length]);

  const onMouseLeave = useCallback(() => {
    if (trigger !== "hover") return;
    setProgress(0);
    setDripPhases(Array(dripCount).fill(0));
  }, [trigger, dripCount]);

  const filterId = filterIdRef.current;
  const scale = progress * intensity;

  // Generate teardrop positions evenly across width
  const drips = Array.from({ length: dripCount }, (_, i) => ({
    left: `${((i + 1) / (dripCount + 1)) * 100}%`,
    delay: i * 150,
    active: dripPhases[i] === 1,
  }));

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ contain: "paint" }}
    >
      {/* Inline SVG filter */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
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

      {/* Content with displacement */}
      <div
        style={{
          filter: scale > 0 ? `url(#${filterId})` : undefined,
          willChange: scale > 0 ? "filter" : undefined,
        }}
      >
        {children}
      </div>

      {/* Teardrop drip elements */}
      {drips.map((drip, i) => (
        <svg
          key={i}
          className="absolute pointer-events-none"
          width="16"
          height="24"
          viewBox="0 0 16 24"
          aria-hidden="true"
          style={{
            left: drip.left,
            bottom: 0,
            transform: `translate(-50%, ${drip.active ? "100%" : "0%"}) scaleY(${drip.active ? 1.5 : 0})`,
            opacity: drip.active ? 1 : 0,
            transition: `transform ${dripDuration}ms cubic-bezier(0.55, 0.085, 0.68, 0.53) ${drip.delay}ms, opacity ${dripDuration * 0.3}ms ease ${drip.delay + dripDuration * 0.7}ms`,
          }}
        >
          {/* Teardrop shape */}
          <path
            d="M8 0C8 0 0 10 0 16C0 20.4 3.6 24 8 24C12.4 24 16 20.4 16 16C16 10 8 0 8 0Z"
            fill={dripColor}
          />
        </svg>
      ))}
    </div>
  );
}
