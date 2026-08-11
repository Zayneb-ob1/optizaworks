"use client";

import { useEffect } from "react";

type LenisInstance = InstanceType<(typeof import("lenis"))["default"]>;

export default function SmoothScroll() {
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let lenis: LenisInstance | null = null;
    let frame = 0;
    let loading = false;
    let disposed = false;
    let idleCallback: number | null = null;
    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

    function stopFrame() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }

    function startFrame() {
      if (!lenis || frame || document.hidden || motionQuery.matches || mobileQuery.matches) return;
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    function destroyLenis() {
      stopFrame();
      lenis?.destroy();
      lenis = null;
    }

    async function initialize() {
      if (disposed || loading || lenis || motionQuery.matches || mobileQuery.matches) return;
      loading = true;
      try {
        const { default: Lenis } = await import("lenis");
        if (disposed || motionQuery.matches || mobileQuery.matches) return;
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        startFrame();
      } catch {
        // Native scrolling remains available if the optional chunk cannot load.
      } finally {
        loading = false;
      }
    }

    function cancelScheduledInitialize() {
      if (idleCallback !== null) {
        window.cancelIdleCallback(idleCallback);
        idleCallback = null;
      }
      if (fallbackTimer !== null) {
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }
    }

    function scheduleInitialize() {
      if (disposed || loading || lenis || motionQuery.matches || mobileQuery.matches) return;
      cancelScheduledInitialize();

      if ("requestIdleCallback" in window) {
        idleCallback = window.requestIdleCallback(
          () => {
            idleCallback = null;
            void initialize();
          },
          { timeout: 1200 },
        );
        return;
      }

      fallbackTimer = setTimeout(() => {
        fallbackTimer = null;
        void initialize();
      }, 200);
    }

    function handleVisibility() {
      if (document.hidden) stopFrame();
      else startFrame();
    }

    function handlePreferenceChange() {
      if (motionQuery.matches || mobileQuery.matches) {
        cancelScheduledInitialize();
        destroyLenis();
      } else {
        scheduleInitialize();
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handlePreferenceChange);
    mobileQuery.addEventListener("change", handlePreferenceChange);
    scheduleInitialize();

    return () => {
      disposed = true;
      cancelScheduledInitialize();
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handlePreferenceChange);
      mobileQuery.removeEventListener("change", handlePreferenceChange);
      destroyLenis();
    };
  }, []);

  return null;
}
