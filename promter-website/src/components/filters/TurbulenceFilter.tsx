"use client";

import { TURBULENCE_DEFAULTS } from "@/lib/svgFilterBuilder";

interface TurbulenceFilterProps {
  /** Unique filter id */
  id: string;
  /** feTurbulence base frequency */
  baseFrequency?: number;
  /** feTurbulence octave count */
  numOctaves?: number;
  /** Turbulence noise type */
  turbulenceType?: "fractalNoise" | "turbulence";
  /** Noise seed for variation */
  seed?: number;
  /** Displacement scale applied after turbulence */
  scale?: number;
}

export default function TurbulenceFilter({
  id,
  baseFrequency = TURBULENCE_DEFAULTS.baseFrequency,
  numOctaves = TURBULENCE_DEFAULTS.numOctaves,
  turbulenceType = TURBULENCE_DEFAULTS.turbulenceType,
  seed = TURBULENCE_DEFAULTS.seed,
  scale = TURBULENCE_DEFAULTS.scale,
}: TurbulenceFilterProps) {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter id={id}>
          <feTurbulence
            type={turbulenceType}
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
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
  );
}
