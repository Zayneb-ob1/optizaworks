"use client";

import { LazyMotion } from "framer-motion";

const loadMotionFeatures = () =>
  import("@/components/motion-features").then((module) => module.default);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {children}
    </LazyMotion>
  );
}
