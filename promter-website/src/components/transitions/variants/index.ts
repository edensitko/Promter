import type { TransitionType, TransitionVariantConfig } from "../types";
import { fadeTransition } from "./fadeTransition";
import { slideTransition } from "./slideTransition";
import { scaleTransition } from "./scaleTransition";
import { clipTransition } from "./clipTransition";
import { coverTransition } from "./coverTransition";
import { staggerTransition } from "./staggerTransition";

export { staggerChildVariants } from "./staggerTransition";

export const transitionVariants: Record<
  Exclude<TransitionType, "none">,
  TransitionVariantConfig
> = {
  fade: fadeTransition,
  slide: slideTransition,
  scale: scaleTransition,
  clip: clipTransition,
  cover: coverTransition,
  stagger: staggerTransition,
};

export function getTransitionVariant(
  type: TransitionType
): TransitionVariantConfig | null {
  if (type === "none") return null;
  return transitionVariants[type] ?? fadeTransition;
}
