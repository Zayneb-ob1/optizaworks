import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProject } from "@/backend/content/queries";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";
import { createPublicPageMetadata } from "@/shared/seo/site";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const project = getPublishedProject(slug, locale);
  const path = `/portfolio/${slug}`;

  if (!project) {
    const title = translate(locale, "Project not found", "Projet introuvable");
    return {
      ...createPublicPageMetadata({
        title,
        description: title,
        path,
        locale,
      }),
      robots: { index: false, follow: false },
    };
  }

  return createPublicPageMetadata({
    title: project.title,
    description: project.summary,
    path,
    locale,
    image: project.image,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const [{ slug }, locale] = await Promise.all([params, getLocale()]);
  const t = (english: string, french: string) =>
    translate(locale, english, french);
  const project = getPublishedProject(slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="bg-neutral-50 pb-16 pt-16 sm:pb-24 sm:pt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-accent"
          >
            <ArrowLeft size={16} />
            {t("Back to work", "Retour aux réalisations")}
          </Link>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {project.categoryLabel} · {project.year}
              </p>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em] text-primary sm:text-7xl">
                {project.title}
              </h1>
            </div>
            <p className="max-w-lg text-base leading-8 text-neutral-500 lg:justify-self-end">
              {project.summary}
            </p>
          </div>
          <div
            className={`relative mt-14 aspect-[16/9] overflow-hidden rounded-3xl ${
              project.imageFit === "contain"
                ? "border border-primary/10 bg-white"
                : "bg-neutral"
            }`}
          >
            <Image
              src={project.image}
              alt={t(
                `${project.title} project presentation`,
                `Présentation du projet ${project.title}`,
              )}
              fill
              priority
              quality={76}
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 64px), (max-width: 1280px) calc(100vw - 80px), 1216px"
              className={
                project.imageFit === "contain"
                  ? "object-contain p-12 sm:p-20"
                  : "object-cover"
              }
            />
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24 lg:px-10">
          <aside>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Services", "Services")}
            </p>
            <ul className="mt-5 space-y-3 text-sm text-neutral-700">
              {project.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
              >
                {t("Visit live website", "Visiter le site en ligne")}
                <ArrowUpRight size={16} />
              </a>
            )}
          </aside>
          <div className="space-y-14">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-primary">
                {t("The challenge", "Le défi")}
              </h2>
              <p className="mt-4 text-base leading-8 text-neutral-500">
                {project.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-primary">
                {t("Our approach", "Notre approche")}
              </h2>
              <p className="mt-4 text-base leading-8 text-neutral-500">
                {project.solution}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-primary">
                {t("The outcome", "Le résultat")}
              </h2>
              <p className="mt-4 text-base leading-8 text-neutral-500">
                {project.outcome}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-20 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 px-5 sm:flex-row sm:items-center sm:px-8 lg:px-10">
          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.03em]">
            {t(
              "Ready to shape your next digital product?",
              "Prêt à donner forme à votre prochain produit numérique ?",
            )}
          </h2>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-neutral"
          >
            {t("Start a project", "Démarrer un projet")}
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
