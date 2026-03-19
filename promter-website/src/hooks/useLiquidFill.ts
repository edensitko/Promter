"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export interface UseLiquidFillOptions {
  /** Duration (ms) for the fill rise on hover. Default 500 */
  fillDuration?: number;
  /** Duration (ms) for the drain on hover-out. Default 600 */
  drainDuration?: number;
  /** Wave amplitude in px. Default 8 */
  waveAmplitude?: number;
  /** Wave cycle speed multiplier. Default 1 */
  waveSpeed?: number;
}

export interface UseLiquidFillReturn {
  /** Current fill progress 0 → 1 */
  fillProgress: number;
  /** Whether the target is currently hovered */
  isHovered: boolean;
  /** Bind these to the target element */
  handlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  /** Continuously incrementing wave phase (radians) for wave animation */
  waveOffset: number;
}

export function useLiquidFill({
  fillDuration = 500,
  drainDuration = 600,
  waveSpeed = 1,
}: UseLiquidFillOptions = {}): UseLiquidFillReturn {
  const [isHovered, setIsHovered] = useState(false);
  const fillRef = useRef(0);
  const [fillProgress, setFillProgress] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const rafRef = useRef<number>(0);
  const waveRafRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  // Fill / drain animation
  useEffect(() => {
    if (reducedMotion.current) {
      const v = isHovered ? 1 : 0;
      fillRef.current = v;
      setFillProgress(v);
      return;
    }

    const target = isHovered ? 1 : 0;
    const duration = isHovered ? fillDuration : drainDuration;
    const startVal = fillRef.current;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // cubic ease-in-out
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const current = startVal + (target - startVal) * eased;
      fillRef.current = current;
      setFillProgress(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovered, fillDuration, drainDuration]);

  // Continuous wave phase
  useEffect(() => {
    if (reducedMotion.current) return;

    const animateWave = (now: number) => {
      setWaveOffset(now / 1000 * waveSpeed * Math.PI * 2);
      waveRafRef.current = requestAnimationFrame(animateWave);
    };
    waveRafRef.current = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(waveRafRef.current);
  }, [waveSpeed]);

  const onMouseEnter = useCallback(() => setIsHovered(true), []);
  const onMouseLeave = useCallback(() => setIsHovered(false), []);

  return {
    fillProgress,
    isHovered,
    handlers: { onMouseEnter, onMouseLeave },
    waveOffset,
  };
}
