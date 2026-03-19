"use client";

import { useFluidGradient } from "@/hooks/useFluidGradient";

export interface FluidGradientProps {
  /** Array of CSS color strings for the gradient blobs */
  colors?: string[];
  /** Animation speed multiplier. Default 1 */
  speed?: number;
  /** Gaussian blur amount in px for soft blending. Default 80 */
  blur?: number;
  /** Whether the first blob tracks cursor position. Default true */
  interactive?: boolean;
  /** Lerp smoothing factor for mouse tracking (0-1). Default 0.05 */
  lerpFactor?: number;
  /** Additional CSS classes on the container */
  className?: string;
}

/**
 * A living gradient background that flows and shifts like liquid.
 *
 * Renders 3-5 radial gradient blobs on a Canvas element, each moving
 * along smooth paths with bounce physics. Optionally, one blob follows
 * the cursor with lerp smoothing.
 *
 * For performance: uses Canvas 2D API with requestAnimationFrame and
 * delta-time calculations. The canvas filter property handles the blur.
 *
 * Respects prefers-reduced-motion by rendering a single static gradient frame.
 */
export default function FluidGradient({
  colors,
  speed,
  blur,
  interactive,
  lerpFactor,
  className = "",
}: FluidGradientProps) {
  const { canvasRef, onMouseMove } = useFluidGradient({
    colors,
    speed,
    blur,
    interactive,
    lerpFactor,
  });

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseMove={onMouseMove}
      role="presentation"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
