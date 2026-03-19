"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { NavigationDirection } from "../types";

/**
 * Tracks navigation direction by maintaining a history stack.
 * Compares current path depth & position to determine forward/backward.
 */
export function useNavigationDirection(): NavigationDirection {
  const pathname = usePathname();
  const historyStack = useRef<string[]>([]);
  const [direction, setDirection] = useState<NavigationDirection>("forward");

  useEffect(() => {
    const stack = historyStack.current;
    const prevIndex = stack.lastIndexOf(pathname);

    if (prevIndex !== -1 && prevIndex < stack.length - 1) {
      // Going back to a page we've seen before
      historyStack.current = stack.slice(0, prevIndex + 1);
      setDirection("backward");
    } else {
      // Going forward
      stack.push(pathname);
      setDirection("forward");
    }
  }, [pathname]);

  return direction;
}
