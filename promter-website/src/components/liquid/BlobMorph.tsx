"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useBlobPath } from "@/hooks/useBlobPath";

export interface BlobMorphProps {
  /** Number of control points. Default 8 */
  points?: number;
  /** Base blob radius. Default 150 */
  radius?: number;
  /** Radial variance (0-1). Default 0.25 */
  variance?: number;
  /** Morph cycle duration in ms. Default 5000 */
  morphDuration?: number;
  /** Number of shapes to cycle through. Default 4 */
  shapeCount?: number;
  /** Fill color or gradient. Default "#5227FF" */
  fill?: string;
  /** Optional gradient colors for a layered depth effect */
  layerColors?: string[];
  /** Layer opacity values (matching layerColors length). Default [0.3, 0.5, 0.7, 1] */
  layerOpacities?: number[];
  /** Blur amount for soft ambient effect. Default 0 (no blur) */
  blur?: number;
  /** Whether blob center follows cursor. Default false */
  interactive?: boolean;
  /** SVG viewBox width. Default 400 */
  width?: number;
  /** SVG viewBox height. Default 400 */
  height?: number;
  /** Additional CSS classes */
  className?: string;
}

/**
 * An SVG blob that continuously morphs between organic shapes.
 * Supports layered blobs at different scales/opacities for depth,
 * and optional cursor-tracking.
 */
export default function BlobMorph({
  points = 8,
  radius = 150,
  variance = 0.25,
  morphDuration = 5000,
  shapeCount = 4,
  fill = "#5227FF",
  layerColors,
  layerOpacities,
  blur = 0,
  interactive = false,
  width = 400,
  height = 400,
  className = "",
}: BlobMorphProps) {
  const cx = width / 2;
  const cy = height / 2;

  const { path: mainPath } = useBlobPath({
    points,
    radius,
    variance,
    morphDuration,
    shapeCount,
    cx,
    cy,
  });

  // Additional layers with offset timing (slightly different params)
  const layers = layerColors || [];
  const opacities = layerOpacities || [0.3, 0.5, 0.7, 1];
  const layerPaths = layers.map((_, i) =>
    useBlobPath({
      points,
      radius: radius * (0.8 + i * 0.1),
      variance: variance * (1 + i * 0.15),
      morphDuration: morphDuration + i * 800,
      shapeCount,
      cx,
      cy,
    })
  );

  // Cursor tracking
  const svgRef = useRef<SVGSVGElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!interactive || reducedMotion.current) return;
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const my = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      setOffset({ x: mx, y: my });
    },
    [interactive]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="presentation"
      aria-hidden="true"
      style={{ filter: blur > 0 ? `blur(${blur}px)` : undefined }}
    >
      {/* Layered blobs for depth */}
      {layerPaths.map((layer, i) => (
        <path
          key={i}
          d={layer.path}
          fill={layers[i]}
          opacity={opacities[i] ?? 0.5}
          transform={`translate(${offset.x * (0.5 + i * 0.2)}, ${offset.y * (0.5 + i * 0.2)})`}
          style={{ transition: "transform 0.3s ease-out" }}
        />
      ))}

      {/* Main blob */}
      <path
        d={mainPath}
        fill={fill}
        opacity={layers.length > 0 ? (opacities[layers.length] ?? 1) : 1}
        transform={`translate(${offset.x}, ${offset.y})`}
        style={{ transition: "transform 0.3s ease-out" }}
      />
    </svg>
  );
}
