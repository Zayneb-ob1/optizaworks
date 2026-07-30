"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Network,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { Partner } from "@/shared/content/partners";

type PartnerLogoStripProps = {
  partners: Partner[];
};

export default function PartnerLogoStrip({ partners }: PartnerLogoStripProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "120px 0px", amount: 0.08 });
  const reduceMotion = useReducedMotion();
  const animationsActive = inView && !reduceMotion;
  const featuredIndexes = new Set([0, 4, 5, 8, 9, 13, 15, 16]);
  const featured = partners.filter(
    (partner, index) => partner.featured ?? featuredIndexes.has(index),
  );

  return (
    <section ref={sectionRef} aria-labelledby="partners-heading" className="overflow-hidden bg-white py-16 sm:py-20">
      <div className="site-container">
        <m.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-primary-dark px-5 py-8 text-white shadow-[0_35px_100px_-55px_rgba(31,9,44,0.75)] sm:px-8 sm:py-10 lg:px-10 lg:py-12"
        >
          <div className="pointer-events-none absolute -right-40 -top-48 h-[480px] w-[480px] rounded-full border border-white/[0.06]" />
          <div className="pointer-events-none absolute -right-20 -top-28 h-[320px] w-[320px] rounded-full border border-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-52 -left-28 h-[420px] w-[420px] rounded-full border border-accent/20" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255,255,255,0.75) 1px, transparent 1.5px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
                <span className="h-px w-8 bg-accent" />
                {t("Trusted by institutions", "Ils nous font confiance")}
              </p>
              <h2 id="partners-heading" className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
                {t(
                  "Selected public and professional organizations.",
                  "Institutions publiques et organisations professionnelles sélectionnées.",
                )}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">
                {t(
                  "Long-term digital work for public bodies, professional chambers, educational institutions, and regional organizations across Morocco.",
                  "Des collaborations numériques durables avec des organismes publics, des chambres professionnelles, des établissements d’enseignement et des organisations régionales au Maroc.",
                )}
              </p>
            </div>

            <div className="flex gap-3">
              <div className="min-w-28 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 backdrop-blur-sm">
                <Building2 size={18} className="text-white/55" strokeWidth={1.6} aria-hidden="true" />
                <strong className="mt-3 block text-2xl font-semibold">
                  {partners.length}
                </strong>
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                  Institutions
                </span>
              </div>
              <div className="min-w-28 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4 backdrop-blur-sm">
                <Network size={18} className="text-white/55" strokeWidth={1.6} aria-hidden="true" />
                <strong className="mt-3 block text-2xl font-semibold">04</strong>
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {t("Sectors", "Secteurs")}
                </span>
              </div>
            </div>
          </div>

          <m.div
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: 0.12 },
              },
            }}
            initial={false}
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            className="relative mt-8 grid auto-cols-[8.25rem] grid-flow-col gap-3 overflow-x-auto pb-3 sm:auto-cols-[9rem] lg:grid-flow-row lg:grid-cols-8 lg:auto-cols-auto lg:overflow-visible lg:pb-0"
          >
            <div className="pointer-events-none absolute left-[4%] right-[4%] top-1/2 hidden border-t border-dashed border-white/10 lg:block" />

            {featured.map((partner, index) => (
              <m.div
                key={partner.shortName}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <m.div
                  animate={
                    animationsActive
                      ? {
                          y: [1, -5 - (index % 2) * 2, 1],
                          rotate: [
                            0,
                            index % 2 === 0 ? 0.4 : -0.4,
                            0,
                          ],
                          scale: [1, 1.01, 1],
                        }
                      : { y: 0, rotate: 0, scale: 1 }
                  }
                  transition={{
                    duration: 3.6 + (index % 4) * 0.35,
                    delay: index * 0.24,
                    repeat: animationsActive ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t(
                      `Visit ${partner.name} website`,
                      `Visiter le site de ${partner.name}`,
                    )}
                    className="group relative flex h-28 overflow-hidden rounded-2xl border border-white/10 bg-white p-3 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.8)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_24px_50px_-24px_rgba(106,13,173,0.65)] focus-visible:outline-white sm:h-32 lg:h-28"
                    title={partner.name}
                  >
                    <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                    <div className="relative h-full w-full">
                      <Image
                        src={partner.logo}
                        alt={t(`${partner.name} logo`, `Logo de ${partner.name}`)}
                        fill
                        loading="lazy"
                        quality={78}
                        sizes="(max-width: 640px) 132px, (max-width: 1024px) 144px, 132px"
                        className="object-contain p-1 opacity-100 transition-transform duration-300 group-hover:scale-[1.06]"
                      />
                    </div>
                    <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </span>
                    <span className="sr-only">{partner.name}</span>
                  </a>
                </m.div>
              </m.div>
            ))}
          </m.div>

          <div className="relative mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-white/45">
              {t(
                "Verified institutional experience across economic, public, educational, and territorial sectors.",
                "Une expérience institutionnelle vérifiée dans les secteurs économique, public, éducatif et territorial.",
              )}
            </p>
            <Link
              href="/references"
              className="inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary transition-[transform,background-color,color] hover:-translate-y-0.5 hover:bg-accent hover:text-white"
            >
              {t(
                `View all ${partners.length} websites`,
                `Voir les ${partners.length} sites web`,
              )}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </m.div>
      </div>
    </section>
  );
}
