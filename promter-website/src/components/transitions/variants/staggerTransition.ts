import type { TransitionVariantConfig } from "../types";

export const staggerTransition: TransitionVariantConfig = {
  initial: () => ({
    opacity: 0,
    y: 20,
  }),
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: () => ({
    opacity: 0,
    y: -20,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  }),
  transition: {
    duration: 0.35,
    ease: [0.32, 0.72, 0, 1],
  },
};

/** Apply to child elements inside a stagger transition page */
export const staggerChildVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
  },
};
