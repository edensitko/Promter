"use client";

import { useMemo } from "react";

export interface WaveDividerProps {
  /** Color of the section above */
  topColor?: string;
  /** Color of the section below */
  bottomColor?: string;
  /** Number of wave layers (1-4). Default 3 */
  layers?: number;
  /** Maximum wave amplitude in px. Default 30 */
  amplitude?: number;
  /** Animation speed multiplier. Default 1 */
  speed?: number;
  /** Total divider height in px. Default 120 */
  height?: number;
  /** Additional CSS classes */
  className?: string;
}

interface WaveLayerConfig {
  amplitude: number;
  duration: number;
  opacity: number;
  color: string;
  yOffset: number;
}

function interpolateColor(c1: string, c2: string, t: number): string {
  const hex = (s: string) => parseInt(s, 16);
  const r1 = hex(c1.slice(1, 3)),
    g1 = hex(c1.slice(3, 5)),
    b1 = hex(c1.slice(5, 7));
  const r2 = hex(c2.slice(1, 3)),
    g2 = hex(c2.slice(3, 5)),
    b2 = hex(c2.slice(5, 7));
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `rgb(${r},${g},${b})`;
}

/**
 * Animated SVG wave section divider with multiple layers.
 * Each layer has a unique amplitude, speed, and opacity for depth.
 * Uses CSS translateX animation on double-width paths for seamless looping.
 */
export default function WaveDivider({
  topColor = "#1a1a2e",
  bottomColor = "#0f0f23",
  layers = 3,
  amplitude = 30,
  speed = 1,
  height = 120,
  className = "",
}: WaveDividerProps) {
  const layerCount = Math.max(1, Math.min(4, layers));

  const layerConfigs = useMemo<WaveLayerConfig[]>(() => {
    return Array.from({ length: layerCount }, (_, i) => {
      const t = layerCount === 1 ? 1 : i / (layerCount - 1);
      return {
        // Back layers: large amplitude, slow. Front layers: small, fast
        amplitude: amplitude * (1 - t * 0.6),
        duration: (20 - t * 12) / speed,
        opacity: 0.3 + t * 0.7,
        color: interpolateColor(topColor, bottomColor, t),
        yOffset: t * (height * 0.3),
      };
    });
  }, [layerCount, amplitude, speed, topColor, bottomColor, height]);

  // Generate a double-width wave path for seamless horizontal looping
  const generateWavePath = (amp: number, yOff: number) => {
    // Path is 2x viewport width (200% in viewBox) so we can translate -50%
    const w = 2000; // double width in viewBox units
    const h = height;
    const baseline = h * 0.4 + yOff;
    const segments = 16;
    const segW = w / segments;

    let d = `M0 ${h}`;
    d += `L0 ${baseline}`;

    for (let i = 0; i <= segments; i++) {
      const x = i * segW;
      const y =
        baseline + Math.sin((i / (segments / 2)) * Math.PI * 2) * amp;
      if (i === 0) {
        d += `Q${x} ${y}`;
      } else {
        const cpx = x - segW / 2;
        const cpy =
          baseline +
          Math.sin(((i - 0.5) / (segments / 2)) * Math.PI * 2) * amp;
        d += ` ${cpx} ${cpy} ${x} ${y}`;
      }
    }

    d += `L${w} ${h}Z`;
    return d;
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
      role="presentation"
      aria-hidden="true"
    >
      {/* Inline keyframes */}
      <style>
        {layerConfigs
          .map(
            (_, i) => `
          @keyframes wave-slide-${i} {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `
          )
          .join("")}
      </style>

      {layerConfigs.map((layer, i) => (
        <svg
          key={i}
          className="absolute bottom-0 left-0 h-full"
          style={{
            width: "200%",
            opacity: layer.opacity,
            animation: `wave-slide-${i} ${layer.duration}s linear infinite`,
            willChange: "transform",
          }}
          viewBox={`0 0 2000 ${height}`}
          preserveAspectRatio="none"
        >
          <path
            d={generateWavePath(layer.amplitude, layer.yOffset)}
            fill={layer.color}
          />
        </svg>
      ))}
    </div>
  );
}
