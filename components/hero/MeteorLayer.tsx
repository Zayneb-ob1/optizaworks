"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Meteor = { id: number; top: number; left: number; length: number };

export default function MeteorLayer({ active, mobile, reducedMotion }: { active: boolean; mobile: boolean; reducedMotion: boolean }) {
  const [meteor, setMeteor] = useState<Meteor | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      if (timer.current) clearTimeout(timer.current);
      if (endTimer.current) clearTimeout(endTimer.current);
      timer.current = null;
      endTimer.current = null;
    };
    if (!active || mobile || reducedMotion) {
      clearTimers();
      setMeteor(null);
      return clearTimers;
    }

    const schedule = () => {
      timer.current = setTimeout(() => {
        setMeteor({
          id: Date.now(),
          top: 8 + Math.random() * 24,
          left: 62 + Math.random() * 28,
          length: 90 + Math.random() * 55,
        });
        endTimer.current = setTimeout(() => {
          setMeteor(null);
          schedule();
        }, 900);
      }, 20000 + Math.random() * 20000);
    };

    schedule();
    return clearTimers;
  }, [active, mobile, reducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {meteor && (
          <m.span
            key={meteor.id}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: -250, y: 155, opacity: [0, 0.75, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.78, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute h-px origin-right -rotate-[32deg] bg-gradient-to-l from-white via-cyan-200/70 to-transparent will-change-transform"
            style={{ top: `${meteor.top}%`, left: `${meteor.left}%`, width: meteor.length }}
          >
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_7px_rgba(165,243,252,0.9)]" />
          </m.span>
        )}
      </AnimatePresence>
    </div>
  );
}
