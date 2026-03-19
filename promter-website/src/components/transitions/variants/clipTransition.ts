import type { TransitionVariantConfig } from "../types";

export const clipTransition: TransitionVariantConfig = {
  initial: () => ({
    clipPath: "circle(0% at 50% 50%)",
    opacity: 1,
  }),
  animate: {
    clipPath: "circle(150% at 50% 50%)",
    opacity: 1,
  },
  exit: () => ({
    clipPath: "circle(0% at 50% 50%)",
    opacity: 1,
  }),
  transition: {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
  },
};
