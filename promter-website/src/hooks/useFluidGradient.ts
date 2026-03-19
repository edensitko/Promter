"use client";

import { useEffect, useRef, useCallback } from "react";

interface GradientBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
}

export interface UseFluidGradientOptions {
  /** Array of CSS color strings for gradient blobs. Default 5 colors */
  colors?: string[];
  /** Animation speed multiplier. Default 1 */
  speed?: number;
  /** Gaussian blur amount in px. Default 80 */
  blur?: number;
  /** Whether the first blob follows the cursor. Default true */
  interactive?: boolean;
  /** Lerp smoothing factor for mouse tracking (0-1). Default 0.05 */
  lerpFactor?: number;
}

export interface UseFluidGradientReturn {
  /** Attach this ref to a <canvas> element */
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  /** Bind to the container's onMouseMove if interactive */
  onMouseMove?: (e: React.MouseEvent) => void;
}

export function useFluidGradient({
  colors = ["#5227FF", "#7cff67", "#ff5277", "#ffb347", "#47d1ff"],
  speed = 1,
  blur = 80,
  interactive = true,
  lerpFactor = 0.05,
}: UseFluidGradientOptions = {}): UseFluidGradientReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blobsRef = useRef<GradientBlob[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Static fallback: draw a single frame then stop
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = canvas.parentElement?.getBoundingClientRect();
        if (rect) {
          canvas.width = rect.width;
          canvas.height = rect.height;
        }
        // Simple static gradient
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize blobs
    blobsRef.current = colors.map((color) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5 * speed,
      vy: (Math.random() - 0.5) * 0.5 * speed,
      color,
      radius: Math.max(canvas.width, canvas.height) * 0.3,
    }));

    let lastTime = 0;

    const animate = (time: number) => {
      const dt = lastTime === 0 ? 1 : Math.min((time - lastTime) / 16, 3);
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = `blur(${blur}px)`;

      const blobs = blobsRef.current;
      for (let i = 0; i < blobs.length; i++) {
        const blob = blobs[i];

        // Ambient motion
        blob.x += blob.vx * dt;
        blob.y += blob.vy * dt;

        // Bounce off edges
        if (blob.x < -blob.radius * 0.5) blob.vx = Math.abs(blob.vx);
        if (blob.x > canvas.width + blob.radius * 0.5)
          blob.vx = -Math.abs(blob.vx);
        if (blob.y < -blob.radius * 0.5) blob.vy = Math.abs(blob.vy);
        if (blob.y > canvas.height + blob.radius * 0.5)
          blob.vy = -Math.abs(blob.vy);

        // First blob follows cursor
        if (interactive && i === 0) {
          const targetX = mouseRef.current.x * canvas.width;
          const targetY = mouseRef.current.y * canvas.height;
          blob.x += (targetX - blob.x) * lerpFactor;
          blob.y += (targetY - blob.y) * lerpFactor;
        }

        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        gradient.addColorStop(0, blob.color + "CC");
        gradient.addColorStop(1, blob.color + "00");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.filter = "none";
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [colors, speed, blur, interactive, lerpFactor]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        };
      }
    },
    []
  );

  return {
    canvasRef,
    onMouseMove: interactive ? onMouseMove : undefined,
  };
}
