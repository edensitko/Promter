"use client";

import { motion } from "framer-motion";
import { useSharedElement } from "./hooks/useSharedElement";

interface SharedElementProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrap an element that should morph between pages during shared-element transitions.
 * Use the same `id` on both the source and destination pages.
 */
export default function SharedElement({
  id,
  children,
  className = "",
}: SharedElementProps) {
  const { ref } = useSharedElement(id);

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      layoutId={id}
      className={className}
      transition={{
        layout: {
          duration: 0.4,
          ease: [0.32, 0.72, 0, 1],
        },
      }}
    >
      {children}
    </motion.div>
  );
}
