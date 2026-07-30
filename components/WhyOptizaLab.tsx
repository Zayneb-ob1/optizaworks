"use client";

import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { Gauge, Headphones, ScanFace, ShieldCheck } from "lucide-react";
import { useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

type Reason = {
  label: string;
  labelFr: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  icon: typeof ScanFace;
};

const reasons: Reason[] = [
  {
    label: "Custom solutions",
    labelFr: "Solutions sur mesure",
    title: "Designed around you.",
    titleFr: "Conçues autour de vous.",
    description:
      "Your users, workflows, and goals shape the solution. We never force a project into a recycled template.",
    descriptionFr:
      "Vos utilisateurs, vos processus et vos objectifs façonnent la solution. Nous n’imposons jamais un modèle recyclé à votre projet.",
    icon: ScanFace,
  },
  {
    label: "Fast delivery",
    labelFr: "Livraison rapide",
    title: "Progress without the fog.",
    titleFr: "Avancer en toute clarté.",
    description:
      "Focused build cycles, visible milestones, and direct communication keep every project moving with purpose.",
    descriptionFr:
      "Des cycles ciblés, des jalons visibles et une communication directe permettent à chaque projet d’avancer efficacement.",
    icon: Gauge,
  },
  {
    label: "Security first",
    labelFr: "La sécurité d’abord",
    title: "Protected from the start.",
    titleFr: "Protégé dès le départ.",
    descriptionFr:
      "La sécurité est intégrée à l’architecture, au développement, à l’infrastructure et à la mise en production, jamais ajoutée à la fin.",
    description:
      "Security is built into architecture, development, infrastructure, and release—not added at the end.",
    icon: ShieldCheck,
  },
  {
    label: "Ongoing support",
    labelFr: "Accompagnement continu",
    title: "We stay after launch.",
    titleFr: "Nous restons à vos côtés après le lancement.",
    description:
      "The team that understands your product remains available to monitor, improve, and help it grow.",
    descriptionFr:
      "L’équipe qui connaît votre produit reste disponible pour le superviser, l’améliorer et accompagner son évolution.",
    icon: Headphones,
  },
];

function PromiseDial({ selected, active, reducedMotion }: { selected: number; active: boolean; reducedMotion: boolean }) {
  const { t } = useLanguage();
  const CurrentIcon = reasons[selected].icon;
  const circumference = 2 * Math.PI * 132;
  const quarter = circumference / 4;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[310px] sm:max-w-[360px]">
      <div className="absolute inset-[8%] rounded-full border border-primary/10 bg-white shadow-[0_24px_60px_rgba(50,16,68,0.08)]" />
      <m.div
        aria-hidden="true"
        className="absolute inset-[16%] rounded-full border border-dashed border-accent/20"
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 30, ease: "linear", repeat: active ? Infinity : 0 }}
      />

      <svg aria-hidden="true" viewBox="0 0 300 300" className="absolute inset-0 h-full w-full -rotate-90 overflow-visible">
        <circle cx="150" cy="150" r="132" fill="none" stroke="#321044" strokeOpacity="0.06" strokeWidth="2" />
        <m.circle
          cx="150"
          cy="150"
          r="132"
          fill="none"
          stroke="#6A0DAD"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${quarter * 0.72} ${circumference - quarter * 0.72}`}
          animate={{ rotate: selected * 90 }}
          transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 20 }}
          style={{ transformOrigin: "150px 150px" }}
        />
      </svg>

      {[0, 1, 2, 3].map((index) => {
        const positions = [
          "left-1/2 top-[5.4%] -translate-x-1/2",
          "right-[5.4%] top-1/2 -translate-y-1/2",
          "bottom-[5.4%] left-1/2 -translate-x-1/2",
          "left-[5.4%] top-1/2 -translate-y-1/2",
        ];
        const isSelected = selected === index;

        return (
          <m.span
            key={index}
            aria-hidden="true"
            className={`absolute z-10 flex h-6 w-6 items-center justify-center rounded-full border ${positions[index]} ${
              isSelected
                ? "border-accent bg-accent shadow-[0_0_0_6px_rgba(106,13,173,0.09)]"
                : "border-primary/10 bg-white"
            }`}
            animate={{ scale: isSelected ? 1 : 0.78 }}
            transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 22 }}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white" : "bg-primary/20"}`} />
          </m.span>
        );
      })}

      <div className="absolute inset-[27%] flex items-center justify-center rounded-full bg-neutral-100 text-center">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={reasons[selected].label}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.94, y: -4 }}
            transition={{ duration: reducedMotion ? 0 : 0.28 }}
            className="flex flex-col items-center px-3"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_10px_24px_rgba(50,16,68,0.18)]">
              <CurrentIcon size={20} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span className="mt-4 text-[9px] font-bold uppercase tracking-[0.17em] text-accent">
              0{selected + 1} / 04
            </span>
            <span className="mt-1 text-xs font-semibold text-primary sm:text-sm">
              {t(reasons[selected].label, reasons[selected].labelFr)}
            </span>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function WhyOptizaLab() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "100px 0px", amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const animationsActive = inView && !reducedMotion;

  return (
    <section ref={sectionRef} id="why-optiza" aria-labelledby="why-heading" className="bg-neutral-50 py-24 sm:py-32">
      <div className="site-container">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Why OptizaWorks?", "Pourquoi OptizaWorks ?")}
            </p>
            <h2 id="why-heading" className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-primary sm:text-5xl">
              {t(
                "Clear thinking, built into every layer.",
                "Une vision claire, intégrée à chaque niveau.",
              )}
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-neutral-500 lg:justify-self-end">
            {t(
              "A practical technology partner from the first decision to every release that follows.",
              "Un partenaire technologique pragmatique, de la première décision à chaque mise en production.",
            )}
          </p>
        </div>

        <div className="mt-14 grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <PromiseDial selected={selected} active={animationsActive} reducedMotion={Boolean(reducedMotion)} />

          <div className="border-y border-primary/10">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              const isSelected = selected === index;

              return (
                <m.button
                  layout
                  key={reason.label}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelected(index)}
                  className="relative block w-full cursor-pointer border-b border-primary/10 px-1 py-5 text-left outline-none last:border-b-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-3 sm:py-6"
                >
                  {isSelected && (
                    <m.span
                      layoutId="why-active-background"
                      className="absolute inset-x-0 inset-y-2 rounded-2xl bg-white shadow-[0_16px_45px_rgba(50,16,68,0.07)]"
                      transition={{ type: "spring", stiffness: 250, damping: 28 }}
                    />
                  )}

                  <div className="relative flex items-center gap-4 px-3 sm:gap-6 sm:px-5">
                    <span className={`text-[10px] font-bold tracking-[0.16em] ${isSelected ? "text-accent" : "text-primary/65"}`}>
                      0{index + 1}
                    </span>
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                        isSelected ? "bg-primary text-white" : "bg-primary/[0.05] text-primary/45"
                      }`}
                    >
                      <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-accent/70">
                        {t(reason.label, reason.labelFr)}
                      </span>
                      <span className="mt-1 block text-lg font-semibold tracking-[-0.025em] text-primary sm:text-xl">
                        {t(reason.title, reason.titleFr)}
                      </span>
                    </span>
                  </div>

                  <span className="relative ml-[4.1rem] block max-w-xl px-3 pb-2 pt-3 text-sm leading-7 text-neutral-500 sm:ml-[5.75rem] sm:px-5">
                    {t(reason.description, reason.descriptionFr)}
                  </span>
                </m.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
