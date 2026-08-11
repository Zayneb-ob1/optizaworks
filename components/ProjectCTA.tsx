"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ScrollReveal from "@/components/ScrollReveal";

function ClimbingRobot({ active }: { active: boolean }) {
  const loop = active ? Infinity : 0;

  return (
    <m.svg
      aria-hidden="true"
      viewBox="0 0 104 146"
      className="h-[132px] w-[94px] overflow-visible sm:h-[142px] sm:w-[102px]"
      initial={false}
      animate={active ? { rotate: [-1.2, 1.4, -1.2] } : { rotate: 0 }}
      transition={{ duration: 5.8, ease: "easeInOut", repeat: loop }}
      style={{ transformOrigin: "53px 8px" }}
    >
      <defs>
        <linearGradient id="cta-robot-shell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.56" stopColor="#eef4ff" />
          <stop offset="1" stopColor="#cdd9ef" />
        </linearGradient>
        <linearGradient id="cta-robot-screen" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#18122c" />
          <stop offset="1" stopColor="#321044" />
        </linearGradient>
        <linearGradient id="cta-rope" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#6A0DAD" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0.9" />
        </linearGradient>
        <filter id="cta-robot-shadow" x="-35%" y="-25%" width="180%" height="190%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#321044" floodOpacity="0.18" />
        </filter>
      </defs>

      <circle cx="53" cy="7" r="4" fill="#ffffff" stroke="#6A0DAD" strokeWidth="2" />
      <circle cx="53" cy="7" r="1.25" fill="#60a5fa" />
      <path
        d="M53 11 C53 29 43 48 28 65"
        fill="none"
        stroke="url(#cta-rope)"
        strokeLinecap="round"
        strokeWidth="1.7"
      />

      <m.g
        filter="url(#cta-robot-shadow)"
        initial={false}
        animate={active ? { y: [0, -3, 0, 2, 0] } : { y: 0 }}
        transition={{ duration: 4.8, ease: "easeInOut", repeat: loop }}
      >
        <m.g
          initial={false}
          animate={active ? { rotate: [0, 2.6, 0, -1.4, 0] } : { rotate: 0 }}
          transition={{ duration: 6.2, ease: "easeInOut", repeat: loop }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 80%" }}
        >
          <path
            d="M33 57 C33 48 40 43 51 43 H61 C73 43 80 50 79 60 L78 72 C77 80 70 84 59 84 H49 C38 84 31 78 32 69 Z"
            fill="url(#cta-robot-shell)"
            stroke="#ffffff"
            strokeWidth="1.4"
          />
          <path
            d="M38 58 C40 52 45 49 53 49 H61 C69 49 74 53 74 61 L73 68 C72 74 68 78 60 78 H50 C42 78 37 73 38 66 Z"
            fill="url(#cta-robot-screen)"
          />
          <path d="M34 61 H30 C28 61 27 63 27 66 V69 C27 72 29 73 32 73" fill="none" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
          <circle cx="28" cy="67" r="2.2" fill="#60a5fa" />

          <m.g
            initial={false}
            animate={active ? { scaleY: [1, 1, 0.08, 1, 1] } : { scaleY: 1 }}
            transition={{ duration: 4.2, times: [0, 0.78, 0.82, 0.87, 1], repeat: loop, ease: "easeInOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect x="46" y="60" width="5" height="7" rx="2.5" fill="#67e8f9" />
            <rect x="63" y="60" width="5" height="7" rx="2.5" fill="#67e8f9" />
          </m.g>
          <path d="M51 70 C54 73 59 73 62 70" fill="none" stroke="#a5f3fc" strokeLinecap="round" strokeWidth="1.5" />
          <path d="M45 54 C49 51 53 51 56 52" fill="none" stroke="#ffffff" strokeLinecap="round" strokeOpacity="0.48" />
        </m.g>

        <path
          d="M41 82 C35 86 32 94 33 104 L35 118 C36 125 42 129 51 129 H62 C71 129 76 124 77 116 L78 101 C78 91 73 85 67 82 Z"
          fill="url(#cta-robot-shell)"
          stroke="#ffffff"
          strokeWidth="1.5"
        />
        <rect x="43" y="91" width="25" height="22" rx="9" fill="#e8f0ff" stroke="#c7d7f2" />
        <m.circle
          cx="55.5"
          cy="102"
          r="4.4"
          fill="#6A0DAD"
          initial={false}
          animate={active ? { opacity: [0.7, 1, 0.7], scale: [0.9, 1.12, 0.9] } : { opacity: 0.85, scale: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: loop }}
          style={{ transformOrigin: "55.5px 102px" }}
        />
        <circle cx="55.5" cy="102" r="1.8" fill="#bfdbfe" />

        <path d="M40 86 C34 83 28 78 27 71" fill="none" stroke="#dce8f8" strokeWidth="8" strokeLinecap="round" />
        <path d="M40 86 C34 83 28 78 27 71" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.55" />
        <circle cx="27" cy="68" r="5.5" fill="url(#cta-robot-shell)" stroke="#ffffff" />
        <path d="M25 67 C28 63 31 62 33 64" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />

        <m.g
          initial={false}
          animate={active ? { rotate: [0, -4.5, 0, -2, 0] } : { rotate: 0 }}
          transition={{ duration: 3.8, ease: "easeInOut", repeat: loop }}
          style={{ transformBox: "fill-box", transformOrigin: "7% 42%" }}
        >
          <path d="M72 88 C82 89 86 96 91 101" fill="none" stroke="#dce8f8" strokeWidth="8" strokeLinecap="round" />
          <path d="M72 88 C82 89 86 96 91 101" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.55" />
          <circle cx="93" cy="103" r="5.3" fill="url(#cta-robot-shell)" stroke="#ffffff" />
          <path d="M95 102 L102 99" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
          <path d="M96 105 L102 105" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
        </m.g>

        <path d="M44 127 L41 136" stroke="#d6e1f2" strokeWidth="8" strokeLinecap="round" />
        <path d="M67 127 L70 135" stroke="#d6e1f2" strokeWidth="8" strokeLinecap="round" />
        <path d="M37 137 C39 133 45 133 48 137" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        <path d="M65 137 C68 133 74 133 77 137" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
        <path d="M39 137 H48 M66 137 H77" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      </m.g>
    </m.svg>
  );
}

export default function ProjectCTA() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "120px 0px", amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const active = inView && !reducedMotion;

  return (
    <section ref={sectionRef} aria-labelledby="project-cta-heading" className="overflow-hidden bg-neutral-50 pb-16 pt-4 sm:pb-20 sm:pt-6">
      <div className="site-container">
        <ScrollReveal className="relative isolate overflow-hidden px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-80 [background-image:radial-gradient(circle_at_16%_20%,rgba(106,13,173,0.10),transparent_26%),radial-gradient(circle_at_84%_78%,rgba(59,130,246,0.11),transparent_27%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(rgba(50,16,68,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(50,16,68,0.08)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
          />

          <h2 id="project-cta-heading" className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-5xl">
            {t("Have a project in mind?", "Vous avez un projet en tête ?")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-700">
            {t(
              "Tell us where you want to go. We will help you find the clearest way to build it.",
              "Dites-nous où vous voulez aller. Nous vous aiderons à définir le chemin le plus clair pour le concrétiser.",
            )}
          </p>

          <div className="mt-6 flex justify-center pt-10 sm:pt-12">
            <m.div
              className="group relative"
              whileHover={reducedMotion ? undefined : { y: -2 }}
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
            >
              <div className="pointer-events-none absolute -left-[66px] -top-[73px] z-20 select-none sm:-left-[72px] sm:-top-[80px]">
                <ClimbingRobot active={active} />
              </div>

              <m.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-4 -bottom-3 h-6 rounded-full bg-accent/20"
                animate={active ? { scaleX: [0.92, 1.05, 0.92], opacity: [0.2, 0.35, 0.2] } : { opacity: 0.2 }}
                transition={{ duration: 3.2, ease: "easeInOut", repeat: active ? Infinity : 0 }}
              />

              <Link
                href="/contact"
                className="relative z-10 inline-flex min-h-14 items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-accent to-[#4f46e5] px-7 py-4 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(106,13,173,0.25)] transition-shadow duration-300 hover:shadow-[0_18px_40px_rgba(106,13,173,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4"
              >
                {t("Start a conversation", "Démarrer la conversation")}
                <m.span
                  aria-hidden="true"
                  animate={active ? { x: [0, 3, 0] } : { x: 0 }}
                  transition={{ duration: 1.8, ease: "easeInOut", repeat: active ? Infinity : 0, repeatDelay: 1.2 }}
                >
                  <ArrowRight size={17} />
                </m.span>
              </Link>
            </m.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
