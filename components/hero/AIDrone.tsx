"use client";

import { AnimatePresence, m, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type AIDroneProps = {
  active: boolean;
  mobile: boolean;
  reducedMotion: boolean;
  x: MotionValue<number>;
  y: MotionValue<number>;
};

export default function AIDrone({ active, mobile, reducedMotion, x, y }: AIDroneProps) {
  const { t } = useLanguage();
  const [scanning, setScanning] = useState(false);
  const [hologram, setHologram] = useState(false);
  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scanEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hologramTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hologramEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearTimers = () => {
      for (const timer of [scanTimer, scanEndTimer, hologramTimer, hologramEndTimer]) {
        if (timer.current) clearTimeout(timer.current);
        timer.current = null;
      }
    };

    if (!active || mobile || reducedMotion) {
      clearTimers();
      setScanning(false);
      setHologram(false);
      return clearTimers;
    }

    const scheduleScan = () => {
      scanTimer.current = setTimeout(() => {
        setScanning(true);
        scanEndTimer.current = setTimeout(() => {
          setScanning(false);
          scheduleScan();
        }, 1700);
      }, 7000 + Math.random() * 5000);
    };

    const scheduleHologram = () => {
      hologramTimer.current = setTimeout(() => {
        setHologram(true);
        hologramEndTimer.current = setTimeout(() => {
          setHologram(false);
          scheduleHologram();
        }, 2000);
      }, 15000 + Math.random() * 5000);
    };

    scheduleScan();
    scheduleHologram();
    return clearTimers;
  }, [active, mobile, reducedMotion]);

  if (mobile) return null;

  return (
    <m.div
      style={{ x, y }}
      animate={!active || reducedMotion ? { rotate: 0 } : { rotate: 360 }}
      transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      className="pointer-events-none absolute inset-[8%] z-30 rounded-full will-change-transform"
      aria-hidden="true"
    >
      <m.div
        animate={!active || reducedMotion ? { rotate: 0, y: 0 } : { rotate: -360, y: [0, -5, 0] }}
        transition={{ rotate: { duration: 34, repeat: Infinity, ease: "linear" }, y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute left-[4%] top-1/2 h-12 w-20 -translate-y-1/2 will-change-transform"
      >
        <div className="absolute left-1/2 top-1/2 h-7 w-10 -translate-x-1/2 -translate-y-1/2 rounded-[45%] border border-cyan-200/35 bg-[#090d1d] shadow-[inset_0_0_12px_rgba(96,165,250,0.18)]">
          <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/50 bg-blue-500 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
          <span className="absolute left-2 top-1.5 h-1 w-1 rounded-full bg-fuchsia-300" />
          <span className="absolute right-2 top-1.5 h-1 w-1 rounded-full bg-cyan-200" />
        </div>
        <div className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 bg-gradient-to-l from-cyan-300/70 to-transparent" />
        <div className="absolute right-0 top-1/2 h-px w-6 -translate-y-1/2 bg-gradient-to-r from-fuchsia-300/70 to-transparent" />
        <span className="absolute left-0 top-[18px] h-3 w-3 rounded-full border border-cyan-200/30 bg-[#080c17]" />
        <span className="absolute right-0 top-[18px] h-3 w-3 rounded-full border border-fuchsia-200/30 bg-[#080c17]" />

        <AnimatePresence>
          {scanning && (
            <m.span
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: [0, 0.55, 0.2], scaleY: 1, rotate: [-28, -42, -28] }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="absolute left-1/2 top-[65%] h-28 w-px origin-top bg-gradient-to-b from-cyan-200 via-blue-400/55 to-transparent"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {hologram && (
            <m.div
              initial={{ opacity: 0, scale: 0.72, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.78, x: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-[72px] top-[-36px] w-40 overflow-hidden rounded-lg border border-cyan-200/25 bg-[#07111d]/95 p-2.5 text-left shadow-[0_0_22px_rgba(34,211,238,0.13)]"
            >
              <div className="flex items-center justify-between font-mono text-[6px] uppercase tracking-[0.14em] text-cyan-200/70">
                <span>{t("AI telemetry", "Télémétrie IA")}</span>
                <span className="text-emerald-300">{t("● live", "● actif")}</span>
              </div>
              <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
                <div className="space-y-1.5">
                  {[82, 57, 72, 44].map((width, index) => (
                    <m.span
                      key={width}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: index * 0.08, duration: 0.3 }}
                      className={`block h-px origin-left ${index % 2 ? "bg-fuchsia-300/45" : "bg-cyan-200/55"}`}
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
                <div className="relative h-8 w-8 rounded-full border border-blue-300/20">
                  <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200" />
                  <span className="absolute left-1 top-1 h-1 w-1 rounded-full bg-fuchsia-300" />
                  <span className="absolute bottom-1 right-1 h-1 w-1 rounded-full bg-blue-300" />
                </div>
              </div>
              <p className="mt-2 font-mono text-[6px] text-slate-500">network.sync(100%)</p>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
}
