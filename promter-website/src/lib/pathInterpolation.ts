/**
 * Path interpolation utilities for liquid/blob animations.
 * Provides functions to generate organic blob paths, interpolate between them,
 * and convert between SVG path strings and numeric arrays.
 */

/**
 * Interpolates between two numeric arrays element-wise.
 */
export function interpolatePaths(
  a: number[],
  b: number[],
  t: number
): number[] {
  const len = Math.min(a.length, b.length);
  const result = new Array<number>(len);
  for (let i = 0; i < len; i++) {
    result[i] = a[i] + (b[i] - a[i]) * t;
  }
  return result;
}

/**
 * Seeded pseudo-random number generator (deterministic).
 */
function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed + index * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Generates an organic blob SVG path string using polar coordinates
 * with randomized radial offsets for an organic feel.
 *
 * @param points  Number of control points on the blob perimeter (8-12 recommended)
 * @param radius  Base radius in SVG units
 * @param variance Radial variance factor (0-1, e.g. 0.2 = up to 20% offset)
 * @param seed    Deterministic seed for reproducible shapes
 * @param cx      Center X offset
 * @param cy      Center Y offset
 */
export function generateBlobPath(
  points: number,
  radius: number,
  variance: number,
  seed: number = 0,
  cx: number = 0,
  cy: number = 0
): string {
  const angleStep = (Math.PI * 2) / points;
  const coords: [number, number][] = [];

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep;
    const r = radius * (1 + (seededRandom(seed, i) - 0.5) * 2 * variance);
    coords.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }

  return pointsToSmoothPath(coords);
}

/**
 * Converts an array of 2D points to a smooth closed cubic bezier SVG path
 * using Catmull-Rom to Cubic Bezier conversion.
 */
export function pointsToSmoothPath(points: [number, number][]): string {
  const n = points.length;
  if (n < 3) return "";

  let d = "";
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    // Catmull-Rom tangent → cubic bezier control points
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    if (i === 0) {
      d += `M${p1[0].toFixed(2)},${p1[1].toFixed(2)}`;
    }
    d += `C${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`;
  }

  return d + "Z";
}

/**
 * Extracts all numeric values from an SVG path string into a flat array.
 * Used to prepare paths for interpolation.
 */
export function pathToArray(path: string): number[] {
  const nums = path.match(/-?\d+\.?\d*/g);
  return nums ? nums.map(Number) : [];
}

/**
 * Converts a flat numeric array back to a closed cubic bezier SVG path string.
 * Inverse of pathToArray for blob paths (M...C...C...Z format).
 */
export function arrayToPath(arr: number[]): string {
  if (arr.length < 8) return "";

  let d = `M${arr[0].toFixed(2)},${arr[1].toFixed(2)}`;
  let i = 2;
  while (i + 5 < arr.length) {
    d += `C${arr[i].toFixed(2)},${arr[i + 1].toFixed(2)} ${arr[i + 2].toFixed(2)},${arr[i + 3].toFixed(2)} ${arr[i + 4].toFixed(2)},${arr[i + 5].toFixed(2)}`;
    i += 6;
  }
  return d + "Z";
}

/**
 * Ease-in-out cubic easing function.
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Ease-in-out quadratic easing function.
 */
export function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
