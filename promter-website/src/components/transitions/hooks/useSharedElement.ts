"use client";

import { useCallback, useContext, useEffect, useRef } from "react";
import { SharedElementRegistryContext } from "../TransitionContext";

/**
 * Register an element for shared-element transitions.
 * Attach the returned ref to the DOM element that should morph between pages.
 */
export function useSharedElement(id: string) {
  const registry = useContext(SharedElementRegistryContext);
  const ref = useRef<HTMLElement>(null);

  const captureRect = useCallback(() => {
    const el = ref.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !registry) return;

    registry.register(id, {
      id,
      rect: el.getBoundingClientRect(),
      element: el,
    });

    return () => {
      registry.unregister(id);
    };
  }, [id, registry]);

  return { ref, captureRect };
}
