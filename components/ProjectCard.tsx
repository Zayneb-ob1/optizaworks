"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import type { Project } from "@/shared/content/projects";

type ProjectCardData = Pick<
  Project,
  | "slug"
  | "title"
  | "categoryLabel"
  | "image"
  | "imageFit"
  | "year"
  | "website"
  | "clientLogo"
>;

type ProjectCardProps = {
  project: ProjectCardData;
  index?: number;
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const containsLogo = project.imageFit === "contain";

  return (
    <m.article
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reducedMotion ? 0 : 0.4,
        delay: reducedMotion ? 0 : index * 0.05,
      }}
      layout={!reducedMotion}
    >
      <Link href={`/portfolio/${project.slug}`} className="group block">
        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${
            containsLogo ? "border border-primary/10 bg-white" : "bg-neutral"
          }`}
        >
          <Image
            src={project.image}
            alt={t(
              `${project.title} website preview`,
              `Aperçu du site web ${project.title}`,
            )}
            fill
            loading="lazy"
            quality={75}
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(50vw - 42px), (max-width: 1280px) 31vw, 392px"
            className={`transition-transform duration-700 ease-out group-hover:scale-[1.025] ${
              containsLogo ? "object-contain p-8 sm:p-10" : "object-cover"
            }`}
          />
          <div className="absolute inset-0 flex items-end bg-primary-dark/0 p-4 transition-colors duration-300 group-hover:bg-primary-dark/15">
            {project.clientLogo && (
              <span className="relative h-14 w-32 overflow-hidden rounded-xl border border-black/[0.06] bg-white shadow-sm">
                <Image
                  src={project.clientLogo}
                  alt={t(`${project.title} logo`, `Logo de ${project.title}`)}
                  fill
                  sizes="128px"
                  loading="lazy"
                  quality={75}
                  className="object-contain p-2"
                />
              </span>
            )}
            <span className="ml-auto translate-y-3 rounded-full bg-white p-2.5 text-primary opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={17} />
            </span>
          </div>
        </div>
      </Link>
      <div className="flex items-start justify-between gap-3 px-1 pt-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            {project.categoryLabel}
          </p>
          <Link href={`/portfolio/${project.slug}`}>
            <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-primary transition-colors hover:text-accent">
              {project.title}
            </h3>
          </Link>
        </div>
        {project.website ? (
          <a
            href={project.website}
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 transition-colors hover:text-accent"
          >
            <Globe2 size={14} />
            {t("Live site", "Site en ligne")}
          </a>
        ) : (
          <span className="mt-1 text-sm text-neutral-500">{project.year}</span>
        )}
      </div>
    </m.article>
  );
}
