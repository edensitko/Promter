/**
 * SVG filter builder utilities.
 * Provides typed config interfaces and React-friendly props for inline SVG filters.
 */

let _counter = 0;

/**
 * Generates a unique filter ID string safe for SVG id attributes.
 */
export function uniqueFilterId(prefix: string = "liquid-filter"): string {
  return `${prefix}-${++_counter}-${Math.random().toString(36).slice(2, 7)}`;
}

/* ── Gooey filter ─────────────────────────────────────────────── */

export interface GooeyFilterConfig {
  /** SVG filter id attribute */
  id: string;
  /** Gaussian blur radius — controls merge distance (8-12 for production) */
  blur?: number;
  /** Alpha channel contrast multiplier (default 18) */
  alphaThreshold?: number;
  /** Alpha channel offset (default -7) */
  alphaOffset?: number;
}

export const GOOEY_DEFAULTS = {
  blur: 10,
  alphaThreshold: 18,
  alphaOffset: -7,
} as const;

/**
 * Returns the feColorMatrix `values` string for a gooey filter.
 */
export function gooeyMatrixValues(
  threshold: number = GOOEY_DEFAULTS.alphaThreshold,
  offset: number = GOOEY_DEFAULTS.alphaOffset
): string {
  return `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${threshold} ${offset}`;
}

/* ── Displacement filter ──────────────────────────────────────── */

export interface DisplacementFilterConfig {
  id: string;
  /** Displacement scale — 0 = no effect, 80 = heavy distortion */
  scale?: number;
  /** feTurbulence base frequency (default 0.015) */
  baseFrequency?: number;
  /** feTurbulence octave count (default 3) */
  numOctaves?: number;
  /** Turbulence type */
  turbulenceType?: "fractalNoise" | "turbulence";
}

export const DISPLACEMENT_DEFAULTS = {
  scale: 0,
  baseFrequency: 0.015,
  numOctaves: 3,
  turbulenceType: "fractalNoise" as const,
};

/* ── Turbulence filter ────────────────────────────────────────── */

export interface TurbulenceFilterConfig {
  id: string;
  baseFrequency?: number;
  numOctaves?: number;
  turbulenceType?: "fractalNoise" | "turbulence";
  seed?: number;
  /** Displacement scale applied after turbulence */
  scale?: number;
}

export const TURBULENCE_DEFAULTS = {
  baseFrequency: 0.01,
  numOctaves: 3,
  turbulenceType: "fractalNoise" as const,
  seed: 0,
  scale: 0,
};
