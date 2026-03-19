export type TransitionType =
  | "fade"
  | "slide"
  | "scale"
  | "clip"
  | "cover"
  | "stagger"
  | "none";

export type NavigationDirection = "forward" | "backward";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TransitionVariantConfig {
  initial: (direction: NavigationDirection) => Record<string, any>;
  animate: Record<string, any>;
  exit: (direction: NavigationDirection) => Record<string, any>;
  transition?: {
    duration?: number;
    ease?: number[] | string;
    delay?: number;
  };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface RouteTransitionMeta {
  transition?: TransitionType;
  sharedElementId?: string;
}

export interface TransitionContextValue {
  direction: NavigationDirection;
  transitionType: TransitionType;
  isTransitioning: boolean;
  setTransitionType: (type: TransitionType) => void;
  prefersReducedMotion: boolean;
}

export interface SharedElementRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface SharedElementState {
  id: string;
  rect: SharedElementRect;
  element: HTMLElement;
}
