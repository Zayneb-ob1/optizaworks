"use client";

import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  CloudCog,
  Code2,
  Cpu,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import AIDrone from "@/components/hero/AIDrone";
import CosmicCanvas from "@/components/hero/CosmicCanvas";
import MeteorLayer from "@/components/hero/MeteorLayer";

const satellites = [
  {
    title: "Web Engineering",
    titleFr: "Ingénierie web",
    label: "Interface layer",
    labelFr: "Couche interface",
    icon: Code2,
    position: "left-[2%] top-[16%]",
    delay: 0,
    tilt: -4,
    accent: "cyan",
  },
  {
    title: "AI & Data",
    titleFr: "IA et données",
    label: "Intelligence layer",
    labelFr: "Couche intelligence",
    icon: BrainCircuit,
    position: "right-[14%] top-[19%]",
    delay: 0.8,
    tilt: 4,
    accent: "blue",
  },
  {
    title: "Cloud Systems",
    titleFr: "Systèmes cloud",
    label: "Infrastructure layer",
    labelFr: "Couche infrastructure",
    icon: CloudCog,
    position: "bottom-[17%] right-[13%]",
    delay: 1.5,
    tilt: 3,
    accent: "violet",
  },
  {
    title: "Cybersecurity",
    titleFr: "Cybersécurité",
    label: "Protection layer",
    labelFr: "Couche protection",
    icon: ShieldCheck,
    position: "bottom-[15%] left-[4%]",
    delay: 2.1,
    tilt: -3,
    accent: "purple",
  },
] as const;

const accentClasses = {
  cyan: "border-cyan-300/20 text-cyan-200 group-hover:border-cyan-200/45",
  blue: "border-blue-300/20 text-blue-200 group-hover:border-blue-200/45",
  violet: "border-violet-300/20 text-violet-200 group-hover:border-violet-200/45",
  purple: "border-fuchsia-300/20 text-fuchsia-200 group-hover:border-fuchsia-200/45",
};

function SatelliteCard({
  item,
  x,
  y,
  reducedMotion,
}: {
  item: (typeof satellites)[number];
  x: MotionValue<number>;
  y: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const { t } = useLanguage();
  const Icon = item.icon;
  return (
    <m.div
      style={{ x, y }}
      className={`absolute z-40 hidden w-40 will-change-transform sm:block lg:w-44 ${item.position}`}
    >
      <m.article
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -9, 0],
                rotate: [item.tilt, item.tilt * 0.45, item.tilt],
              }
        }
        transition={{ duration: 5.6 + item.delay, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        whileHover={reducedMotion ? undefined : { scale: 1.035, y: -5 }}
        className={`group pointer-events-auto relative overflow-hidden rounded-2xl border bg-[#080d1c]/88 p-3.5 shadow-[0_18px_50px_-26px_rgba(0,0,0,0.9)] transition-colors duration-300 lg:p-4 ${accentClasses[item.accent]}`}
      >
        <span className="absolute right-2 top-2 h-1 w-1 rounded-full bg-current opacity-80" />
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-current/20 bg-current/[0.07]">
            <Icon size={16} strokeWidth={1.6} />
          </span>
          <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-slate-600">
            {t("orbit node", "nœud orbital")}
          </span>
        </div>
        <h3 className="mt-4 text-xs font-semibold text-white lg:text-sm">
          {t(item.title, item.titleFr)}
        </h3>
        <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.12em] text-slate-500 lg:text-[8px]">
          {t(item.label, item.labelFr)}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-slate-500">
            {t("online", "en ligne")}
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-current/30 to-transparent" />
        </div>
      </m.article>
    </m.div>
  );
}

function PortalSymbol({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="absolute left-1/2 top-1/2 z-20 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
      <m.div
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-cyan-100/70 border-r-transparent shadow-[0_0_14px_rgba(125,211,252,0.32)]"
      />
      <m.div
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[18%] rounded-full border border-fuchsia-100/70 border-b-transparent"
      />
      <div className="absolute inset-[36%] rounded-full border border-white/80 bg-white/[0.08] shadow-[0_0_18px_rgba(255,255,255,0.38)]" />
      <span className="absolute -left-[2%] top-1/2 h-[17%] w-[17%] -translate-y-1/2 rounded-sm border border-cyan-100/70 bg-[#090b1b]" />
      <span className="absolute -right-[2%] top-1/2 h-[17%] w-[17%] -translate-y-1/2 rounded-sm border border-fuchsia-100/70 bg-[#090b1b]" />
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const reduceMotionPreference = useReducedMotion();
  const reducedMotion = Boolean(reduceMotionPreference);
  const [visible, setVisible] = useState(true);
  const [mobile, setMobile] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 26, mass: 0.8 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 26, mass: 0.8 });
  const contentX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const contentY = useTransform(smoothY, [-1, 1], [-3, 3]);
  const portalX = useTransform(smoothX, [-1, 1], [-15, 15]);
  const portalY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const cardX = useTransform(smoothX, [-1, 1], [7, -7]);
  const cardY = useTransform(smoothY, [-1, 1], [5, -5]);
  const droneX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const droneY = useTransform(smoothY, [-1, 1], [-5, 5]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setMobile(media.matches);
    updateMobile();
    media.addEventListener("change", updateMobile);

    const section = sectionRef.current;
    const observer = section
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px 0px", threshold: 0.01 })
      : null;
    if (section) observer?.observe(section);

    return () => {
      media.removeEventListener("change", updateMobile);
      observer?.disconnect();
    };
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (reducedMotion || mobile || !sectionRef.current) return;
    const bounds = sectionRef.current.getBoundingClientRect();
    const nextX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
    const nextY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
    pointerRef.current.x = nextX;
    pointerRef.current.y = nextY;
    pointerX.set(nextX);
    pointerY.set(nextY);
  }

  function resetPointer() {
    pointerRef.current.x = 0;
    pointerRef.current.y = 0;
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative isolate min-h-[980px] overflow-hidden bg-[#03040b] text-white sm:min-h-[920px] lg:min-h-[860px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 69% 48%, rgba(43,76,190,0.18), transparent 29%), radial-gradient(circle at 77% 39%, rgba(126,34,206,0.18), transparent 23%), radial-gradient(circle at 14% 78%, rgba(8,145,178,0.08), transparent 25%), linear-gradient(122deg,#03040b 0%,#060719 52%,#070414 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.2) 1px, transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage: "radial-gradient(circle at 66% 55%, black, transparent 76%)",
        }}
      />

      <CosmicCanvas
        active={visible}
        mobile={mobile}
        reducedMotion={reducedMotion}
        pointerRef={pointerRef}
        portalRef={portalRef}
      />
      <MeteorLayer active={visible} mobile={mobile} reducedMotion={reducedMotion} />

      <div
        ref={portalRef}
        className="pointer-events-none absolute bottom-[-2rem] left-1/2 z-10 aspect-square w-[41rem] -translate-x-1/2 sm:bottom-[-8rem] sm:w-[49rem] lg:bottom-auto lg:left-auto lg:right-[-7rem] lg:top-1/2 lg:w-[64vw] lg:max-w-[900px] lg:translate-x-0 lg:-translate-y-1/2 xl:right-[-4rem]"
      >
        <m.div style={reducedMotion ? undefined : { x: portalX, y: portalY }} className="relative h-full w-full will-change-transform">
          <div className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle,rgba(75,46,202,0.16)_0%,rgba(76,29,149,0.1)_38%,transparent_69%)]" aria-hidden="true" />
          <m.div
            animate={reducedMotion || !visible ? undefined : { scale: [0.94, 1.08, 0.94], opacity: [0.18, 0.42, 0.18] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[14%] rounded-full border border-blue-400/15 bg-blue-500/[0.04] will-change-transform"
            aria-hidden="true"
          />

          <div className="absolute inset-[4%] rounded-full opacity-75" style={{ background: "conic-gradient(from 20deg, transparent 0 7%, rgba(96,165,250,.3) 9%, transparent 13% 21%, rgba(217,70,239,.26) 25%, transparent 29% 54%, rgba(34,211,238,.22) 58%, transparent 62% 82%, rgba(139,92,246,.28) 86%, transparent 91%)", maskImage: "radial-gradient(circle, transparent 67%, black 68%, black 70%, transparent 71%)" }} aria-hidden="true" />

          {Array.from({ length: 16 }, (_, index) => (
            <m.span
              key={index}
              animate={reducedMotion || !visible ? undefined : { opacity: [0.08, 0.44, 0.08], scaleX: [0.75, 1.08, 0.75] }}
              transition={{ duration: 4.2 + (index % 5) * 0.7, delay: index * 0.12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 h-px w-[47%] origin-left bg-gradient-to-r from-blue-300/25 via-fuchsia-400/10 to-transparent"
              style={{ rotate: `${index * 22.5}deg` }}
              aria-hidden="true"
            />
          ))}

          <m.div
            animate={reducedMotion || !visible ? undefined : { rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[12%] rounded-full border border-dashed border-blue-200/15 will-change-transform"
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-100 shadow-[0_0_10px_rgba(165,243,252,0.85)]" />
            <span className="absolute bottom-[7%] right-[15%] h-1.5 w-1.5 rounded-full bg-fuchsia-200" />
          </m.div>
          <m.div
            animate={reducedMotion || !visible ? undefined : { rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[20%] rounded-full border border-blue-300/20 border-l-fuchsia-300/40 border-t-cyan-200/40 will-change-transform"
            aria-hidden="true"
          />
          <m.div
            animate={reducedMotion || !visible ? undefined : { rotate: 360 }}
            transition={{ duration: 19, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[27%] rounded-full border border-violet-300/25 border-b-transparent border-r-cyan-200/45 will-change-transform"
            aria-hidden="true"
          />
          <div className="absolute inset-[31%] rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(121,80,242,0.4),rgba(28,24,83,0.42)_37%,rgba(3,4,11,0.94)_72%)] shadow-[inset_0_0_34px_rgba(96,165,250,0.18)]" aria-hidden="true" />
          <m.div
            animate={reducedMotion || !visible ? undefined : { scale: [0.92, 1.06, 0.92], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[38%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35),rgba(96,70,220,0.25)_28%,rgba(18,12,58,0.1)_70%)] will-change-transform"
            aria-hidden="true"
          />
          <PortalSymbol reducedMotion={reducedMotion} />

          {satellites.map((item) => (
            <SatelliteCard key={item.title} item={item} x={cardX} y={cardY} reducedMotion={reducedMotion || !visible} />
          ))}

          <div className="absolute left-[28%] top-[24%] z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200/20 bg-[#080d1c]/90 text-cyan-200 sm:hidden" aria-hidden="true"><Code2 size={16} /></div>
          <div className="absolute right-[28%] top-[24%] z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-fuchsia-200/20 bg-[#080d1c]/90 text-fuchsia-200 sm:hidden" aria-hidden="true"><ShieldCheck size={16} /></div>

          <AIDrone active={visible} mobile={mobile} reducedMotion={reducedMotion} x={droneX} y={droneY} />
        </m.div>
      </div>

      <div className="relative z-30 mx-auto grid min-h-[980px] max-w-7xl items-start px-5 pb-[470px] pt-36 sm:min-h-[920px] sm:px-8 sm:pb-[430px] sm:pt-40 lg:min-h-[860px] lg:grid-cols-[0.83fr_1.17fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-32">
        <m.div
          style={reducedMotion ? undefined : { x: contentX, y: contentY }}
          className="relative max-w-2xl will-change-transform"
        >
          <div>
          <div className="mb-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/15 bg-cyan-200/[0.04] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.21em] text-cyan-100/70">
              <Sparkles size={12} />
              {t("Sovereign digital engineering", "Ingénierie numérique souveraine")}
            </span>
            <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">
              <span className="relative flex h-1.5 w-1.5">
                {!reducedMotion && <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-300 opacity-50" />}
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-300" />
              </span>
              {t("Network online", "Réseau opérationnel")}
            </span>
          </div>

          <h1 className="max-w-[760px] text-[2.9rem] font-semibold leading-[0.97] tracking-[-0.055em] text-white sm:text-[4.3rem] lg:text-[4.65rem] xl:text-[5.2rem]">
            {t("Engineering at the edge of", "L’ingénierie aux frontières du")}{" "}
            <span className="bg-gradient-to-r from-cyan-200 via-blue-400 to-fuchsia-400 bg-clip-text text-transparent">
              {t("possible.", "possible.")}
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            {t(
              "OptizaWorks builds secure websites, software, AI systems, and digital infrastructure that give ambitious organizations their own technological gravity.",
              "OptizaWorks conçoit des sites web, des logiciels, des systèmes d’IA et des infrastructures numériques sécurisés qui donnent aux organisations ambitieuses leur propre force technologique.",
            )}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_35px_-18px_rgba(96,165,250,0.65)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              {t("Explore our work", "Découvrir nos réalisations")}
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/12 transition-transform group-hover:translate-x-0.5"><ArrowRight size={14} /></span>
            </Link>
            <div className="flex items-center gap-3 text-slate-600">
              <Cpu size={16} className="text-cyan-300/55" />
              <span className="font-mono text-[8px] uppercase leading-5 tracking-[0.14em]">
                {t("Strategy / Design", "Stratégie / Design")}
                <br />
                {t("Engineering / Infrastructure", "Ingénierie / Infrastructure")}
              </span>
            </div>
          </div>

          <div className="mt-10 flex max-w-lg items-center gap-4 border-t border-white/[0.07] pt-5 font-mono text-[8px] uppercase tracking-[0.15em] text-slate-600 sm:gap-6">
            <span>{t("08 capabilities", "08 expertises")}</span><span className="h-1 w-1 rounded-full bg-blue-400/60" /><span>{t("01 integrated team", "01 équipe intégrée")}</span><span className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent sm:block" />
          </div>
          </div>
        </m.div>
        <div aria-hidden="true" />
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-700 sm:flex">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-blue-400/30" />
        {t("Enter the system", "Entrez dans le système")}
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-fuchsia-400/30" />
      </div>
    </section>
  );
}
