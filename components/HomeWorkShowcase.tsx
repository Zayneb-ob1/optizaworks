import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { Project } from "@/shared/content/projects";
import { translate, type Locale } from "@/shared/i18n/config";

type HomeWorkShowcaseProps = {
  projects: Project[];
  locale: Locale;
};

export default function HomeWorkShowcase({ projects, locale }: HomeWorkShowcaseProps) {
  const t = (english: string, french: string) => translate(locale, english, french);
  const selectedProjects = projects.slice(0, 3);

  if (selectedProjects.length === 0) return null;

  return (
    <section id="work" aria-labelledby="work-heading" className="home-deferred-render overflow-hidden bg-neutral-100 py-16 sm:py-24">
      <ScrollReveal className="site-container">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              {t("Selected work", "Réalisations sélectionnées")}
            </p>
            <h2 id="work-heading" className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-primary sm:text-5xl lg:text-6xl">
              {t("A glimpse of what we build.", "Un aperçu de ce que nous réalisons.")}
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-primary/15 px-5 py-3 text-sm font-semibold text-primary transition-[border-color,color] hover:border-accent/40 hover:text-accent sm:self-auto"
          >
            {t("See all projects", "Voir tous les projets")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {selectedProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_22px_50px_-38px_rgba(50,16,68,0.4)] focus-visible:outline-accent"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-50">
                <Image
                  src={project.image}
                  alt={t(`${project.title} project preview`, `Aperçu du projet ${project.title}`)}
                  fill
                  loading="lazy"
                  quality={76}
                  sizes="(max-width: 639px) calc(100vw - 42px), (max-width: 1023px) calc(50vw - 44px), (max-width: 1279px) calc(33.333vw - 42px), 400px"
                  className={`${project.imageFit === "contain" ? "object-contain p-7" : "object-cover object-top"} transition-transform duration-500 ease-out group-hover:scale-[1.025]`}
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {project.categoryLabel} / {project.year}
                  </p>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-primary/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-4 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold leading-tight tracking-[-0.03em] text-primary transition-colors group-hover:text-accent sm:text-2xl">
                    {project.title}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/10 text-primary/45 transition-[border-color,color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent/30 group-hover:text-accent">
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
