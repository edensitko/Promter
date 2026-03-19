import type { TransitionVariantConfig } from "../types";

export const scaleTransition: TransitionVariantConfig = {
  initial: () => ({
    scale: 1.05,
    opacity: 0,
  }),
  animate: {
    scale: 1,
    opacity: 1,
  },
  exit: () => ({
    scale: 0.95,
    opacity: 0,
  }),
  transition: {
    duration: 0.4,
    ease: [0.32, 0.72, 0, 1],
  },
};
