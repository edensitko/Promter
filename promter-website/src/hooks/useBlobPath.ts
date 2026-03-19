"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  generateBlobPath,
  pathToArray,
  interpolatePaths,
  arrayToPath,
  easeInOutCubic,
} from "@/lib/pathInterpolation";

export interface UseBlobPathOptions {
  /** Number of control points per blob shape. Default 8 */
  points?: number;
  /** Base radius in SVG units. Default 100 */
  radius?: number;
  /** Radial variance factor (0-1). Default 0.2 */
  variance?: number;
  /** Duration of each morph transition in ms. Default 5000 */
  morphDuration?: number;
  /** Number of shapes to cycle through. Default 4 */
  shapeCount?: number;
  /** Center X. Default 0 */
  cx?: number;
  /** Center Y. Default 0 */
  cy?: number;
}

export interface UseBlobPathReturn {
  /** Current interpolated SVG path string */
  path: string;
  /** All generated target paths */
  paths: string[];
  /** Restart the morph cycle */
  regenerate: () => void;
}

export function useBlobPath({
  points = 8,
  radius = 100,
  variance = 0.2,
  morphDuration = 5000,
  shapeCount = 4,
  cx = 0,
  cy = 0,
}: UseBlobPathOptions = {}): UseBlobPathReturn {
  const [targetPaths] = useState(() =>
    Array.from({ length: shapeCount }, (_, i) =>
      generateBlobPath(points, radius, variance, i * 1000, cx, cy)
    )
  );

  const [currentPath, setCurrentPath] = useState(targetPaths[0]);
  const rafRef = useRef<number>(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const startAnimation = useCallback(() => {
    if (reducedMotion.current) return () => {};

    const pathArrays = targetPaths.map(pathToArray);
    let fromIdx = 0;
    let toIdx = 1;
    let startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / morphDuration, 1);
      const eased = easeInOutCubic(t);

      const interpolated = interpolatePaths(
        pathArrays[fromIdx],
        pathArrays[toIdx],
        eased
      );
      setCurrentPath(arrayToPath(interpolated));

      if (t >= 1) {
        fromIdx = toIdx;
        toIdx = (toIdx + 1) % targetPaths.length;
        startTime = now;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [targetPaths, morphDuration]);

  useEffect(() => {
    const cleanup = startAnimation();
    return cleanup;
  }, [startAnimation]);

  const regenerate = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    startAnimation();
  }, [startAnimation]);

  return { path: currentPath, paths: targetPaths, regenerate };
}
