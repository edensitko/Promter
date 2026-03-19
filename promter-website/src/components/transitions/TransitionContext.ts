"use client";

import { createContext } from "react";
import type { TransitionContextValue, SharedElementState } from "./types";

export const TransitionContext = createContext<TransitionContextValue | null>(
  null
);

export interface SharedElementRegistry {
  register: (id: string, state: SharedElementState) => void;
  unregister: (id: string) => void;
  get: (id: string) => SharedElementState | undefined;
  getAll: () => Map<string, SharedElementState>;
}

export const SharedElementRegistryContext =
  createContext<SharedElementRegistry | null>(null);
