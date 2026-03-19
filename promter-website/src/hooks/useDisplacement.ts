"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { uniqueFilterId } from "@/lib/svgFilterBuilder";
import { easeInOutQuad } from "@/lib/pathInterpolation";

export interface UseDisplacementOptions {
  /** Maximum displacement scale (0 = none, 80 = heavy). Default 80 */
  maxScale?: number;
  /** Animation duration in ms. Default 400 */
  duration?: number;
  /** Custom easing function (0→1 input, 0→1 output) */
  easing?: (t: number) => number;
}

export interface UseDisplacementReturn {
  /** Current displacement scale value — pass to DisplacementFilter's `scale` prop */
  scale: number;
  /** Stable unique filter id */
  filterId: string;
  /** Animate scale from 0 → maxScale */
  trigger: () => Promise<void>;
  /** Animate scale from maxScale → 0 */
  reverse: () => Promise<void>;
  /** Whether an animation is currently running */
  isAnimating: boolean;
}

export function useDisplacement({
  maxScale = 80,
  duration = 400,
  easing = easeInOutQuad,
}: UseDisplacementOptions = {}): UseDisplacementReturn {
  const [scale, setScale] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const rafRef = useRef<number>(0);
  const filterIdRef = useRef(uniqueFilterId("displacement"));

  const animateTo = useCallback(
    (from: number, to: number): Promise<void> => {
      return new Promise((resolve) => {
        cancelAnimationFrame(rafRef.current);
        setIsAnimating(true);
        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / duration, 1);
          const eased = easing(t);
          setScale(from + (to - from) * eased);

          if (t < 1) {
            rafRef.current = requestAnimationFrame(tick);
          } else {
            setIsAnimating(false);
            resolve();
          }
        };

        rafRef.current = requestAnimationFrame(tick);
      });
    },
    [duration, easing]
  );

  const trigger = useCallback(
    () => animateTo(0, maxScale),
    [animateTo, maxScale]
  );

  const reverse = useCallback(
    () => animateTo(maxScale, 0),
    [animateTo, maxScale]
  );

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return {
    scale,
    filterId: filterIdRef.current,
    trigger,
    reverse,
    isAnimating,
  };
}
