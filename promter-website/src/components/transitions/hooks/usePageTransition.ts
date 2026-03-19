"use client";

import { useContext } from "react";
import { TransitionContext } from "../TransitionContext";
import type { TransitionContextValue } from "../types";

/**
 * Hook for programmatic transition control.
 * Access current transition state and override transition type.
 */
export function usePageTransition(): TransitionContextValue {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error(
      "usePageTransition must be used within a <TransitionLayout>"
    );
  }
  return ctx;
}
