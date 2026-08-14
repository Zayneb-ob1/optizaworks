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
  services: Pick<Service, "slug" | "title" | "details" | "includes" | "icon">[];
};

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const inView = useInView(carouselRef, { margin: "120px 0px", amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const serviceCount = services.length;
  const orbitStep = serviceCount > 0 ? 360 / serviceCount : 0;
  const compactOrbit = serviceCount > 8;
  const [orbitPosition, setOrbitPosition] = useState(0);
  const activeIndex = serviceCount > 0
    ? ((orbitPosition % serviceCount) + serviceCount) % serviceCount
    : 0;
  const orbitRotation = orbitPosition * orbitStep;
  const activeService = services[activeIndex] ?? services[0];

  useEffect(() => {
    if (!inView || reducedMotion || serviceCount < 2) return;

    const timer = window.setInterval(() => {
      setOrbitPosition((position) => position + 1);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [inView, reducedMotion, serviceCount]);

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
    setOrbitPosition((position) => {
      const currentIndex = ((position % serviceCount) + serviceCount) % serviceCount;
      const clockwiseSteps = (index - currentIndex + serviceCount) % serviceCount;
      return position + clockwiseSteps;
    });
  }

  function previous() {
    if (serviceCount < 2) return;
    setOrbitPosition((position) => position - 1);
  }

  function next() {
    if (serviceCount < 2) return;
    setOrbitPosition((position) => position + 1);
  }

  return (
    <div
      ref={carouselRef}
      className="relative mt-8 px-0 py-2 text-primary sm:mt-10 sm:px-4 sm:py-4 lg:px-0"
    >
      <div className="relative grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="relative mx-auto w-full max-w-[470px]">
          <div className="relative mx-auto aspect-square w-full max-w-[330px] sm:max-w-[400px] lg:max-w-[430px]">
            <div className="absolute inset-[10%] rounded-full border-2 border-primary/55" />
            <div className="absolute inset-[25%] rounded-full border border-dashed border-primary/25" />
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/45" />

            <div className="absolute -right-5 top-1/2 z-20 flex translate-x-1/2 -translate-y-1/2 flex-col gap-2 sm:-right-8">
              <button
                type="button"
                onClick={previous}
                disabled={serviceCount < 2}
                aria-label={t("Previous service", "Service précédent")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-sm transition-[transform,background-color,border-color,color] hover:-translate-x-0.5 hover:border-primary/40 hover:bg-primary hover:text-white focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
              >
                <ArrowLeft size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                disabled={serviceCount < 2}
                aria-label={t("Next service", "Service suivant")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-sm transition-[transform,background-color,border-color,color] hover:translate-x-0.5 hover:border-primary/40 hover:bg-primary hover:text-white focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none"
              >
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>

            <m.div
              initial={false}
              className="absolute inset-0 z-10"
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
                        className={`border transition-[width,height,background-color,border-color,color,border-radius,box-shadow] duration-500 focus-visible:outline-primary motion-reduce:transition-none ${
                          active
                            ? `flex flex-col items-center justify-center gap-2 rounded-2xl border-primary bg-primary px-2 text-white shadow-[0_16px_35px_-14px_rgba(31,9,44,0.58)] ${
                                compactOrbit
                                  ? "h-[84px] w-[100px] sm:h-[96px] sm:w-[114px]"
                                  : "h-[96px] w-[118px] sm:h-[110px] sm:w-[132px]"
                              }`
                            : `flex items-center justify-center rounded-xl border-primary/10 bg-white text-primary shadow-[0_8px_24px_-14px_rgba(31,9,44,0.3)] hover:border-primary/45 hover:bg-neutral ${
                                compactOrbit
                                  ? "h-11 w-11 sm:h-[52px] sm:w-[52px]"
                                  : "h-[52px] w-[52px] sm:h-[60px] sm:w-[60px]"
                              }`
                        }`}
                      >
                        <Icon
                          size={active ? (compactOrbit ? 28 : 32) : compactOrbit ? 21 : 25}
                          strokeWidth={1.65}
                          aria-hidden="true"
                        />
                        {active && (
                          <span
                            className={`line-clamp-2 text-center font-semibold leading-4 ${
                              compactOrbit ? "text-[10px]" : "text-[11px]"
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/45">
            {t("Service", "Service")} {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(serviceCount).padStart(2, "0")}
          </p>

          <div key={activeService.slug} className="mt-6">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral text-primary">
                  <ActiveIcon size={25} strokeWidth={1.65} aria-hidden="true" />
                </span>
                <h3 className="text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl">
                  {activeService.title}
                </h3>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500">
                {activeService.details}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {activeService.includes.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-primary/10 bg-neutral-50 px-3 py-2 text-xs font-medium text-primary/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/services#${activeService.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary motion-reduce:transition-none"
                >
                  {t("Explore service", "Découvrir le service")}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent/35 hover:text-accent motion-reduce:transition-none"
                >
                  {t("All services", "Tous les services")}
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
