"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { Project } from "@/shared/content/projects";

type HomeWorkShowcaseProps = {
  projects: Project[];
};

export default function HomeWorkShowcase({ projects }: HomeWorkShowcaseProps) {
  const { t } = useLanguage();
  const selected = projects.slice(0, 3);

  return (
    <section aria-labelledby="work-heading" className="overflow-hidden bg-white py-14 sm:py-16">
      <div className="site-container">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-accent" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {t("Selected work", "Réalisations sélectionnées")}
              </p>
            </div>
            <h2 id="work-heading" className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-primary sm:text-3xl">
              {t("A glimpse of what we build.", "Un aperçu de ce que nous réalisons.")}
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            {t("See all projects", "Voir tous les projets")}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {selected.map((project, index) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group relative block min-w-[78vw] snap-start overflow-hidden rounded-[1.35rem] bg-primary-dark focus-visible:outline-accent sm:min-w-0"
            >
              <div className="relative h-[205px] overflow-hidden sm:h-[220px]">
                <Image
                  src={project.image}
                  alt={t(
                    `${project.title} project preview`,
                    `Aperçu du projet ${project.title}`,
                  )}
                  fill
                  loading="lazy"
                  quality={76}
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 45vw, 23vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/10 to-transparent" />

                <span className="absolute left-4 top-4 flex h-8 min-w-8 items-center justify-center rounded-full border border-white/25 bg-primary-dark/45 px-2 text-[10px] font-semibold tracking-[0.16em] text-white backdrop-blur-md">
                  0{index + 1}
                </span>
                <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/60">
                    {project.categoryLabel}
                  </p>
                  <h3 className="mt-1.5 truncate text-base font-semibold text-white">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
