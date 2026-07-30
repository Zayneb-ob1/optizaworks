"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { serviceIcons } from "@/components/services/service-icons";
import type { Service } from "@/shared/content/services";

type ServicesCarouselProps = {
  services: Service[];
};

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const inView = useInView(carouselRef, { margin: "120px 0px", amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const serviceCount = services.length;
  const orbitStep = serviceCount > 0 ? 360 / serviceCount : 0;
  const compactOrbit = serviceCount > 8;
  const [activeIndex, setActiveIndex] = useState(0);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const activeService = services[activeIndex] ?? services[0];

  useEffect(() => {
    if (serviceCount === 0) {
      setActiveIndex(0);
      setOrbitRotation(0);
      return;
    }

    const nextIndex = activeIndex < serviceCount ? activeIndex : 0;
    if (nextIndex !== activeIndex) setActiveIndex(nextIndex);

    setOrbitRotation((current) => {
      const base = nextIndex * orbitStep;
      const nearest = base + Math.round((current - base) / 360) * 360;
      return Math.abs(nearest - current) < 0.001 ? current : nearest;
    });
  }, [activeIndex, orbitStep, serviceCount]);

  useEffect(() => {
    if (paused || !inView || reducedMotion || serviceCount < 2) return;

    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((index) => (index + 1) % serviceCount);
      setOrbitRotation((rotation) => rotation + orbitStep);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [inView, orbitStep, paused, reducedMotion, serviceCount]);

  if (!activeService) return null;
  const ActiveIcon = serviceIcons[activeService.icon];
  const orbitTransition = reducedMotion
    ? { duration: 0 }
    : {
        duration: 0.78,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      };

  function selectService(index: number) {
    if (index === activeIndex || serviceCount < 2) return;
    const clockwiseSteps = (index - activeIndex + serviceCount) % serviceCount;
    setDirection(1);
    setOrbitRotation((rotation) => rotation + clockwiseSteps * orbitStep);
    setActiveIndex(index);
  }

  function previous() {
    if (serviceCount < 2) return;
    setDirection(-1);
    setOrbitRotation((rotation) => rotation - orbitStep);
    setActiveIndex((index) => (index - 1 + serviceCount) % serviceCount);
  }

  function next() {
    if (serviceCount < 2) return;
    setDirection(1);
    setOrbitRotation((rotation) => rotation + orbitStep);
    setActiveIndex((index) => (index + 1) % serviceCount);
  }

  return (
    <div
      ref={carouselRef}
      className="relative mt-14 overflow-hidden rounded-[2.5rem] border border-white/10 bg-primary-dark px-5 py-10 text-white shadow-[0_24px_80px_-48px_rgba(61,17,108,0.55)] sm:px-8 sm:py-14 lg:px-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute -right-36 top-1/2 h-[430px] w-[430px] -translate-y-1/2 rounded-full border border-white/[0.04]" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[310px] w-[310px] -translate-y-1/2 rounded-full border border-white/[0.04]" />

      <div className="relative grid items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-[430px]">
          <div className="relative mx-auto aspect-square w-[300px] sm:w-[370px]">
            <div className="absolute inset-[10%] rounded-full border border-white/25" />
            <div className="absolute inset-[25%] rounded-full border border-dashed border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20" />

            <div className="absolute -left-5 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2 sm:-left-8">
              <button
                type="button"
                onClick={previous}
                disabled={serviceCount < 2}
                aria-label={t("Previous service", "Service précédent")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm transition-[transform,background-color,border-color,color] hover:-translate-y-0.5 hover:border-white/40 hover:bg-white hover:text-primary focus-visible:outline-white disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
              >
                <ArrowLeft size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                disabled={serviceCount < 2}
                aria-label={t("Next service", "Service suivant")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm transition-[transform,background-color,border-color,color] hover:translate-x-0.5 hover:border-white/40 hover:bg-white hover:text-primary focus-visible:outline-white disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
              >
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>

            <m.div
              initial={false}
              className="absolute inset-0 z-10 will-change-transform motion-reduce:will-change-auto"
              animate={{ rotate: orbitRotation }}
              transition={orbitTransition}
            >
              {services.map((service, index) => {
                const Icon = serviceIcons[service.icon];
                const angle = -Math.PI / 2 - (index / services.length) * Math.PI * 2;
                const x = 50 + Math.cos(angle) * 40;
                const y = 50 + Math.sin(angle) * 40;
                const active = index === activeIndex;

                return (
                  <div
                    key={service.slug}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%`, zIndex: active ? 2 : 1 }}
                  >
                    <m.div
                      initial={false}
                      className="will-change-transform motion-reduce:will-change-auto"
                      animate={{ rotate: -orbitRotation }}
                      transition={orbitTransition}
                    >
                      <button
                        type="button"
                        onClick={() => selectService(index)}
                        aria-label={t(
                          `Show ${service.title}`,
                          `Afficher ${service.title}`,
                        )}
                        aria-pressed={active}
                        className={`border transition-[width,height,background-color,border-color,color,border-radius,box-shadow] duration-500 focus-visible:outline-white motion-reduce:transition-none ${
                          active
                            ? `flex flex-col items-center justify-center gap-2 rounded-2xl border-white bg-white px-2 text-accent shadow-[0_16px_35px_-14px_rgba(0,0,0,0.45)] ${
                                compactOrbit
                                  ? "h-[80px] w-[96px] sm:h-[92px] sm:w-[108px]"
                                  : "h-[92px] w-[112px] sm:h-[104px] sm:w-[126px]"
                              }`
                            : `flex items-center justify-center rounded-xl border-white/15 bg-white/10 text-white/70 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.45)] backdrop-blur-sm hover:border-white/40 hover:bg-white/15 hover:text-white ${
                                compactOrbit
                                  ? "h-10 w-10 sm:h-12 sm:w-12"
                                  : "h-12 w-12 sm:h-14 sm:w-14"
                              }`
                        }`}
                      >
                        <Icon
                          size={active ? (compactOrbit ? 26 : 30) : compactOrbit ? 20 : 23}
                          strokeWidth={1.65}
                          aria-hidden="true"
                        />
                        {active && (
                          <span
                            className={`line-clamp-2 text-center font-semibold leading-4 ${
                              compactOrbit ? "text-[9px]" : "text-[10px]"
                            }`}
                          >
                            {service.title}
                          </span>
                        )}
                      </button>
                    </m.div>
                  </div>
                );
              })}
            </m.div>
          </div>
        </div>

        <div className="min-h-[320px]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            {t("Service", "Service")} {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(serviceCount).padStart(2, "0")}
          </p>

          <m.div
              key={activeService.slug}
              initial={
                reducedMotion ? false : { opacity: 0.35, x: direction * 22 }
              }
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                  <ActiveIcon size={25} strokeWidth={1.65} aria-hidden="true" />
                </span>
                <h3 className="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
                  {activeService.title}
                </h3>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                {activeService.details}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {activeService.includes.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-medium text-white/75"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/services#${activeService.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-white motion-reduce:transition-none"
                >
                  {t("Explore service", "Découvrir le service")}
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 motion-reduce:transition-none"
                >
                  {t("All services", "Tous les services")}
                </Link>
              </div>
          </m.div>
        </div>
      </div>
    </div>
  );
}
