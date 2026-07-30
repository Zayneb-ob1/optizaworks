import type { Metadata } from "next";
import FilterTabs from "@/components/FilterTabs";
import ProjectCard from "@/components/ProjectCard";
import PortfolioPagination from "@/components/PortfolioPagination";
import {
  projectTypes,
  type ProjectType,
} from "@/shared/content/projects";
import { getPublishedProjects } from "@/backend/content/queries";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";
import { createPublicPageMetadata } from "@/shared/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return createPublicPageMetadata({
    title: translate(locale, "Our Work", "Nos réalisations"),
    description: translate(
      locale,
      "Explore 17 public, institutional, education, and professional websites delivered by Optizaworks.",
      "Découvrez 17 sites web publics, institutionnels, éducatifs et professionnels réalisés par Optizaworks.",
    ),
    path: "/portfolio",
    locale,
  });
}

type PortfolioPageProps = {
  searchParams: Promise<{ type?: string; page?: string }>;
};

const PROJECTS_PER_PAGE = 9;

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const locale = await getLocale();
  const t = (english: string, french: string) =>
    translate(locale, english, french);
  const { type, page } = await searchParams;
  const activeType = projectTypes.includes(type as ProjectType)
    ? (type as ProjectType)
    : undefined;
  const filteredProjects = getPublishedProjects({ category: activeType, locale });
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  const requestedPage = Number.parseInt(page ?? "1", 10);
  const currentPage = Math.min(
    Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1),
    totalPages,
  );
  const pageProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE,
  );

  return (
    <section className="min-h-screen bg-neutral-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {t("Our work", "Nos réalisations")}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em] text-primary sm:text-6xl">
            {t(
              "Useful products, carefully built.",
              "Des produits utiles, conçus avec soin.",
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-500">
            {t(
              "Explore 17 live websites delivered for public institutions, professional organizations, education, and regional agencies across Morocco.",
              "Découvrez 17 sites en ligne réalisés pour des institutions publiques, des organisations professionnelles, des établissements d’enseignement et des agences régionales au Maroc.",
            )}
          </p>
        </div>
        <div className="mt-12">
          <FilterTabs active={activeType} />
        </div>
        <div className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {pageProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        {pageProjects.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-primary/15 bg-white px-6 py-16 text-center">
            <p className="text-sm text-neutral-500">
              {t(
                "No published projects in this category yet.",
                "Aucun projet publié dans cette catégorie pour le moment.",
              )}
            </p>
          </div>
        )}
        <PortfolioPagination
          currentPage={currentPage}
          totalPages={totalPages}
          activeType={activeType}
          locale={locale}
        />
      </div>
    </section>
  );
}
