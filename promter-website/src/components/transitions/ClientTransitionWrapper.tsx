"use client";

import TransitionLayout from "./TransitionLayout";
import RouteTransition from "./RouteTransition";
import type { TransitionType } from "./types";

interface ClientTransitionWrapperProps {
  children: React.ReactNode;
  defaultTransition?: TransitionType;
}

export default function ClientTransitionWrapper({
  children,
  defaultTransition = "fade",
}: ClientTransitionWrapperProps) {
  return (
    <TransitionLayout defaultTransition={defaultTransition}>
      <RouteTransition>{children}</RouteTransition>
    </TransitionLayout>
  );
}
