"use client";

import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import type { NavigationDirection, TransitionType } from "./types";
import { getTransitionVariant } from "./variants";

interface PageTransitionProps {
  children: React.ReactNode;
  transitionType: TransitionType;
  direction: NavigationDirection;
  reducedMotion: boolean;
  className?: string;
}

export default function PageTransition({
  children,
  transitionType,
  direction,
  reducedMotion,
  className = "",
}: PageTransitionProps) {
  const effectiveType = reducedMotion ? "fade" : transitionType;
  const variant = getTransitionVariant(effectiveType);

  const variants: Variants = useMemo(() => {
    if (!variant) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
      };
    }

    const duration = reducedMotion
      ? 0.15
      : (variant.transition?.duration ?? 0.3);
    const ease = variant.transition?.ease ?? "easeInOut";

    const animateState = { ...variant.animate };
    const nestedTransition = animateState.transition;
    delete animateState.transition;

    return {
      initial: variant.initial(direction),
      animate: {
        ...animateState,
        transition: {
          duration,
          ease,
          delay: variant.transition?.delay ?? 0,
          ...(typeof nestedTransition === "object"
            ? (nestedTransition as Record<string, unknown>)
            : {}),
        },
      },
      exit: {
        ...variant.exit(direction),
        transition: {
          duration: reducedMotion ? 0.1 : duration * 0.8,
          ease,
        },
      },
    };
  }, [variant, direction, reducedMotion]);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}
