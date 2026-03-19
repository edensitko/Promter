"use client";

import { gooeyMatrixValues, GOOEY_DEFAULTS } from "@/lib/svgFilterBuilder";

interface GooeyFilterProps {
  /** Unique filter id — reference via `filter: url(#id)` */
  id: string;
  /** Gaussian blur stdDeviation (8-12 recommended for production) */
  blur?: number;
  /** Alpha contrast multiplier in the feColorMatrix */
  alphaThreshold?: number;
  /** Alpha offset in the feColorMatrix */
  alphaOffset?: number;
}

export default function GooeyFilter({
  id,
  blur = GOOEY_DEFAULTS.blur,
  alphaThreshold = GOOEY_DEFAULTS.alphaThreshold,
  alphaOffset = GOOEY_DEFAULTS.alphaOffset,
}: GooeyFilterProps) {
  return (
    <svg
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blur}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values={gooeyMatrixValues(alphaThreshold, alphaOffset)}
            result="gooey"
          />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}
