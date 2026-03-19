"use client";

import { useRef, useEffect } from "react";
import { uniqueFilterId } from "@/lib/svgFilterBuilder";
import { gooeyMatrixValues, GOOEY_DEFAULTS } from "@/lib/svgFilterBuilder";

export interface GooeyContainerProps {
  children: React.ReactNode;
  /** Gaussian blur radius — controls the merge distance between children. Default 10 */
  blur?: number;
  /** Alpha contrast threshold (higher = sharper edges). Default 18 */
  alphaThreshold?: number;
  /** Alpha offset. Default -7 */
  alphaOffset?: number;
  /** Additional CSS classes */
  className?: string;
  /** Inline style overrides */
  style?: React.CSSProperties;
}

/**
 * SVG filter-based gooey container that makes child elements appear to
 * merge and separate like sticky liquid when they overlap.
 *
 * The core technique: feGaussianBlur blurs all children, then feColorMatrix
 * re-sharpens edges with high contrast on the alpha channel. When children
 * are close enough, their blurred edges merge and the color matrix resharpens
 * them into a connected gooey shape.
 *
 * Works beautifully for navigation indicators, toggle groups, and decorative blobs.
 * Apply CSS `transform: translate()` to children to animate merge/separate.
 *
 * Important: `blur` (stdDeviation) above 15 can be expensive — keep between 8-12 for production.
 * Do not apply to text or interactive controls where clarity is critical.
 */
export default function GooeyContainer({
  children,
  blur = GOOEY_DEFAULTS.blur,
  alphaThreshold = GOOEY_DEFAULTS.alphaThreshold,
  alphaOffset = GOOEY_DEFAULTS.alphaOffset,
  className = "",
  style,
}: GooeyContainerProps) {
  const filterIdRef = useRef(uniqueFilterId("gooey"));
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const filterId = filterIdRef.current;

  return (
    <div className={`relative ${className}`} style={style}>
      {/* Inline SVG filter definition */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id={filterId}>
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

      {/* Filtered container */}
      <div
        style={{
          filter: reducedMotion.current ? undefined : `url(#${filterId})`,
          willChange: "filter",
          contain: "paint",
        }}
      >
        {children}
      </div>
    </div>
  );
}
