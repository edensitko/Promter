"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { usePageTransition } from "./hooks/usePageTransition";
import PageTransition from "./PageTransition";

interface RouteTransitionProps {
  children: React.ReactNode;
  className?: string;
  mode?: "wait" | "sync" | "popLayout";
}

/**
 * Wraps page content and animates between route changes.
 * Place inside TransitionLayout, wrapping the page {children}.
 */
export default function RouteTransition({
  children,
  className = "",
  mode = "wait",
}: RouteTransitionProps) {
  const pathname = usePathname();
  const { direction, transitionType, prefersReducedMotion } =
    usePageTransition();

  return (
    <AnimatePresence mode={mode} initial={false}>
      <PageTransition
        key={pathname}
        transitionType={transitionType}
        direction={direction}
        reducedMotion={prefersReducedMotion}
        className={className}
      >
        {children}
      </PageTransition>
    </AnimatePresence>
  );
}
