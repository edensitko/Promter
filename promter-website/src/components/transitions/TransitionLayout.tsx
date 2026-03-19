"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutGroup } from "framer-motion";
import {
  TransitionContext,
  SharedElementRegistryContext,
  type SharedElementRegistry,
} from "./TransitionContext";
import type {
  NavigationDirection,
  SharedElementState,
  TransitionContextValue,
  TransitionType,
} from "./types";

interface TransitionLayoutProps {
  children: React.ReactNode;
  defaultTransition?: TransitionType;
}

/**
 * Root wrapper that provides transition context to all child routes.
 * Place in your root layout wrapping {children}.
 */
export default function TransitionLayout({
  children,
  defaultTransition = "fade",
}: TransitionLayoutProps) {
  const pathname = usePathname();
  const [transitionType, setTransitionType] =
    useState<TransitionType>(defaultTransition);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Navigation direction tracking
  const historyStack = useRef<string[]>([]);
  const [direction, setDirection] = useState<NavigationDirection>("forward");

  // Detect reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Track direction on route change
  useEffect(() => {
    const stack = historyStack.current;
    const prevIndex = stack.lastIndexOf(pathname);

    if (prevIndex !== -1 && prevIndex < stack.length - 1) {
      historyStack.current = stack.slice(0, prevIndex + 1);
      setDirection("backward");
    } else {
      stack.push(pathname);
      setDirection("forward");
    }

    // Mark transitioning, clear after animation duration
    setIsTransitioning(true);
    const timeout = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Scroll to top on forward navigation, restore on back
  useEffect(() => {
    if (direction === "forward") {
      window.scrollTo(0, 0);
    }
  }, [pathname, direction]);

  // Shared element registry
  const elementsRef = useRef(new Map<string, SharedElementState>());

  const registry: SharedElementRegistry = useMemo(
    () => ({
      register: (id: string, state: SharedElementState) => {
        elementsRef.current.set(id, state);
      },
      unregister: (id: string) => {
        elementsRef.current.delete(id);
      },
      get: (id: string) => elementsRef.current.get(id),
      getAll: () => elementsRef.current,
    }),
    []
  );

  const setType = useCallback((type: TransitionType) => {
    setTransitionType(type);
  }, []);

  const contextValue: TransitionContextValue = useMemo(
    () => ({
      direction,
      transitionType,
      isTransitioning,
      setTransitionType: setType,
      prefersReducedMotion,
    }),
    [direction, transitionType, isTransitioning, setType, prefersReducedMotion]
  );

  // Announce route change to screen readers
  const announceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (announceRef.current) {
      const pageName =
        pathname === "/"
          ? "Home"
          : pathname
              .split("/")
              .filter(Boolean)
              .pop()
              ?.replace(/-/g, " ") ?? "page";
      announceRef.current.textContent = `Navigated to ${pageName}`;
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={contextValue}>
      <SharedElementRegistryContext.Provider value={registry}>
        <LayoutGroup>
          {/* Screen reader route announcer */}
          <div
            ref={announceRef}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
            style={{
              position: "absolute",
              width: 1,
              height: 1,
              padding: 0,
              margin: -1,
              overflow: "hidden",
              clip: "rect(0, 0, 0, 0)",
              whiteSpace: "nowrap",
              borderWidth: 0,
            }}
          />
          {children}
        </LayoutGroup>
      </SharedElementRegistryContext.Provider>
    </TransitionContext.Provider>
  );
}
