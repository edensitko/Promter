"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";

export interface LiquidButtonProps {
  children: React.ReactNode;
  /** Color scheme */
  colors?: {
    base: string;
    fill: string;
    text: string;
    fillText: string;
  };
  /** Animation speed multiplier. Default 1 */
  speed?: number;
  /** Wave amplitude in px. Default 8 */
  waveAmplitude?: number;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * A button that fills from the bottom with an animated liquid wave on hover.
 * Text color inverts via mix-blend-mode as the wave passes.
 */
export default function LiquidButton({
  children,
  colors = {
    base: "#1a1a2e",
    fill: "#5227FF",
    text: "#ffffff",
    fillText: "#ffffff",
  },
  speed = 1,
  waveAmplitude = 8,
  className = "",
  onClick,
}: LiquidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dims, setDims] = useState({ w: 200, h: 56 });
  const [isHovered, setIsHovered] = useState(false);
  const [fillY, setFillY] = useState(100);
  const [wavePhase, setWavePhase] = useState(0);
  const fillRafRef = useRef<number>(0);
  const waveRafRef = useRef<number>(0);
  const fillValRef = useRef(100);
  const reducedMotion = useRef(false);

  // Measure button dimensions
  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const el = buttonRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) {
        setDims({ w: Math.round(width), h: Math.round(height) });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fill / drain animation
  useEffect(() => {
    if (reducedMotion.current) {
      const v = isHovered ? -5 : 100;
      fillValRef.current = v;
      setFillY(v);
      return;
    }

    const target = isHovered ? -5 : 100;
    const duration = isHovered ? 500 / speed : 600 / speed;
    const startVal = fillValRef.current;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const v = startVal + (target - startVal) * eased;
      fillValRef.current = v;
      setFillY(v);
      if (t < 1) fillRafRef.current = requestAnimationFrame(animate);
    };

    fillRafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(fillRafRef.current);
  }, [isHovered, speed]);

  // Continuous wave phase
  useEffect(() => {
    if (reducedMotion.current) return;

    const tick = (now: number) => {
      setWavePhase(now / 1000 * speed);
      waveRafRef.current = requestAnimationFrame(tick);
    };
    waveRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(waveRafRef.current);
  }, [speed]);

  // SVG wave path
  const wavePath = useMemo(() => {
    const { w, h } = dims;
    const amp = waveAmplitude;
    const yBase = (fillY / 100) * h;
    const steps = 24;

    let d = `M0 ${h}L0 ${yBase}`;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * w;
      const y =
        yBase +
        Math.sin((x / w) * Math.PI * 2 + wavePhase * Math.PI * 2) * amp;
      d += `L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    d += `L${w} ${h}Z`;
    return d;
  }, [dims, fillY, wavePhase, waveAmplitude]);

  return (
    <button
      ref={buttonRef}
      onMouseEnter={useCallback(() => setIsHovered(true), [])}
      onMouseLeave={useCallback(() => setIsHovered(false), [])}
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer px-8 py-4 rounded-xl font-semibold text-lg transition-colors ${className}`}
      style={{
        backgroundColor: colors.base,
        color: colors.text,
        border: `2px solid ${colors.fill}`,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        aria-hidden="true"
      >
        <path d={wavePath} fill={colors.fill} />
      </svg>
      <span
        className="relative z-10"
        style={{ mixBlendMode: "difference", color: colors.fillText }}
      >
        {children}
      </span>
    </button>
  );
}
