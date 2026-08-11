"use client";

import { m, useReducedMotion } from "framer-motion";
import { Children } from "react";

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function ScrollReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={false}
      whileInView={
        reducedMotion
          ? undefined
          : { opacity: [0, 1], y: [16, 0] }
      }
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: revealEase }}
    >
      {children}
    </m.div>
  );
}

export function StaggerReveal({
  children,
  className,
  itemClassName,
}: {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={false}
      whileInView={reducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.075,
          },
        },
      }}
    >
      {Children.map(children, (child) => (
        <m.div
          className={itemClassName}
          variants={{
            visible: {
              opacity: [0, 1],
              y: [14, 0],
              transition: {
                duration: 0.45,
                ease: revealEase,
              },
            },
          }}
        >
          {child}
        </m.div>
      ))}
    </m.div>
  );
}
