"use client";

import { DISPLACEMENT_DEFAULTS } from "@/lib/svgFilterBuilder";

interface DisplacementFilterProps {
  /** Unique filter id */
  id: string;
  /** Displacement scale — animate this value for dissolve/reform effects */
  scale?: number;
  /** feTurbulence base frequency */
  baseFrequency?: number;
  /** feTurbulence octave count */
  numOctaves?: number;
  /** Turbulence noise type */
  turbulenceType?: "fractalNoise" | "turbulence";
}

export default function DisplacementFilter({
  id,
  scale = DISPLACEMENT_DEFAULTS.scale,
  baseFrequency = DISPLACEMENT_DEFAULTS.baseFrequency,
  numOctaves = DISPLACEMENT_DEFAULTS.numOctaves,
  turbulenceType = DISPLACEMENT_DEFAULTS.turbulenceType,
}: DisplacementFilterProps) {
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
