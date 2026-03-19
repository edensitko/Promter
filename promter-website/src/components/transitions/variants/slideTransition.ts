import type { TransitionVariantConfig } from "../types";

export const slideTransition: TransitionVariantConfig = {
  initial: (direction) => ({
    x: direction === "forward" ? "100%" : "-100%",
    opacity: 0.6,
  }),
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction === "forward" ? "-100%" : "100%",
    opacity: 0.6,
  }),
  transition: {
    duration: 0.4,
    ease: [0.32, 0.72, 0, 1],
  },
};
