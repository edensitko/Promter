import type { TransitionVariantConfig } from "../types";

export const coverTransition: TransitionVariantConfig = {
  initial: (direction) => ({
    y: direction === "forward" ? "100%" : "-100%",
    opacity: 1,
  }),
  animate: {
    y: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    y: direction === "forward" ? "-100%" : "100%",
    opacity: 1,
  }),
  transition: {
    duration: 0.45,
    ease: [0.32, 0.72, 0, 1],
  },
};
