import type { Metadata } from "next";
import { CalendarDays, RotateCcw, Search } from "lucide-react";
import Link from "next/link";
import { getPublishedNews } from "@/backend/content/queries";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";
import { createPublicPageMetadata } from "@/shared/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return createPublicPageMetadata({
    title: translate(locale, "News", "Actualités"),
    description: translate(
      locale,
      "Search project milestones, product updates, and company news from Optizaworks.",
      "Recherchez les étapes de nos projets, les évolutions de nos produits et les actualités d’Optizaworks.",
    ),
    path: "/news",
    locale,
  });
}

type NewsPageProps = {
  searchParams: Promise<{ q?: string; date?: string }>;
};

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim();
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const locale = await getLocale();
  const t = (english: string, french: string) =>
    translate(locale, english, french);
  const news = getPublishedNews(locale);
  const params = await searchParams;
  const query = (params.q ?? "").trim().slice(0, 100);
  const requestedDate = (params.date ?? "").trim();

  const dateOptions = Array.from(
    new Map(
      news
        .filter((item) => item.dateKey)
        .map((item) => [item.dateKey as string, item.date]),
    ),
    ([value, label]) => ({ value, label }),
  );
  const activeDate = dateOptions.some(
    (option) => option.value === requestedDate,
  )
    ? requestedDate
    : "";
  const normalizedQuery = normalizeSearch(query);
  const filteredNews = news.filter((item) => {
    const matchesDate = !activeDate || item.dateKey === activeDate;
    const searchable = normalizeSearch(
      `${item.title} ${item.description} ${item.date}`,
    );
    const matchesQuery =
      !normalizedQuery || searchable.includes(normalizedQuery);
    return matchesDate && matchesQuery;
  });
  const hasFilters = Boolean(query || activeDate);

  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark pb-28 pt-28 text-white sm:pb-36 sm:pt-36">
        <div className="pointer-events-none absolute -right-36 -top-52 h-[560px] w-[560px] rounded-full border border-white/[0.07]" />
        <div className="pointer-events-none absolute -right-8 -top-24 h-[340px] w-[340px] rounded-full border border-accent/25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,0.8) 1px, transparent 1.5px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="site-container relative">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
            <span className="h-px w-8 bg-accent" />
            {t("Newsroom", "Actualités")}
          </p>
          <h1 className="mt-6 max-w-4xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em]">
            {t(
              "Ideas, releases, and progress from our team.",
              "Idées, lancements et avancées de notre équipe.",
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
            {t(
              "Follow project milestones, product improvements, and the work happening across Optizaworks.",
              "Suivez les étapes de nos projets, les améliorations de nos produits et le travail réalisé chez Optizaworks.",
            )}
          </p>
        </div>
      </section>

      <section className="relative bg-neutral-50 pb-24 sm:pb-32">
        <div className="site-container">
          <form
            action="/news"
            method="get"
            className="relative z-10 -mt-14 grid gap-4 rounded-[2rem] border border-primary/10 bg-white p-4 shadow-[0_30px_80px_-45px_rgba(50,16,68,0.35)] sm:p-5 lg:grid-cols-[minmax(0,1fr)_15rem_auto_auto] lg:items-end"
            role="search"
          >
            <label className="block">
              <span className="mb-2 block px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/55">
                {t("Search news", "Rechercher une actualité")}
              </span>
              <span className="flex h-12 items-center gap-3 rounded-2xl border border-primary/10 bg-neutral-50 px-4 transition-colors focus-within:border-accent/45 focus-within:bg-white">
                <Search
                  size={17}
                  className="shrink-0 text-primary/40"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  name="q"
                  defaultValue={query}
                  maxLength={100}
                  placeholder={t(
                    "Search by title or topic...",
                    "Rechercher par titre ou sujet...",
                  )}
                  className="min-w-0 flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-neutral-400"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/55">
                {t("Filter by date", "Filtrer par date")}
              </span>
              <span className="flex h-12 items-center gap-3 rounded-2xl border border-primary/10 bg-neutral-50 px-4 transition-colors focus-within:border-accent/45 focus-within:bg-white">
                <CalendarDays
                  size={17}
                  className="shrink-0 text-primary/40"
                  aria-hidden="true"
                />
                <select
                  name="date"
                  defaultValue={activeDate}
                  className="min-w-0 flex-1 cursor-pointer bg-transparent text-sm text-primary outline-none"
                >
                  <option value="">
                    {t("All dates", "Toutes les dates")}
                  </option>
                  {dateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </span>
            </label>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-accent px-6 text-sm font-semibold text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <Search size={16} aria-hidden="true" />
              {t("Search", "Rechercher")}
            </button>

            {hasFilters ? (
              <Link
                href="/news"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-primary/10 px-5 text-sm font-semibold text-primary transition-colors hover:border-accent/30 hover:text-accent"
              >
                <RotateCcw size={15} aria-hidden="true" />
                {t("Reset", "Réinitialiser")}
              </Link>
            ) : (
              <span className="hidden lg:block" aria-hidden="true" />
            )}
          </form>

          <div className="flex flex-col gap-4 border-b border-primary/10 pb-7 pt-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {hasFilters
                  ? t("Search results", "Résultats de recherche")
                  : t("All updates", "Toutes les actualités")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary">
                {t(
                  "News from Optizaworks",
                  "Les actualités d’Optizaworks",
                )}
              </h2>
            </div>
            <p className="text-sm font-medium text-neutral-500" aria-live="polite">
              {filteredNews.length}{" "}
              {filteredNews.length === 1
                ? t("article found", "article trouvé")
                : t("articles found", "articles trouvés")}
            </p>
          </div>

          {filteredNews.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {filteredNews.map((item, index) => (
                <article
                  id={`news-${item.slug ?? index + 1}`}
                  key={item.slug ?? item.title}
                  className="group relative min-h-72 scroll-mt-28 overflow-hidden rounded-3xl border border-primary/10 bg-white p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_24px_55px_-38px_rgba(50,16,68,0.4)] target:border-accent/40 target:ring-2 target:ring-accent/20 sm:p-9"
                >
                  <span className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {item.date}
                    </p>
                    <span className="text-xs font-semibold tracking-[0.16em] text-primary/65">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-10 max-w-xl text-2xl font-semibold tracking-[-0.025em] text-primary sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500">
                    {item.description}
                  </p>
                  <div className="mt-9 h-px w-12 bg-primary/10 transition-[width,background-color] duration-300 group-hover:w-20 group-hover:bg-accent/45" />
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-primary/15 bg-white px-6 py-16 text-center">
              <Search
                size={24}
                className="mx-auto text-primary/25"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-xl font-semibold text-primary">
                {t("No news found", "Aucune actualité trouvée")}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-neutral-500">
                {t(
                  "Try another keyword or choose a different date.",
                  "Essayez un autre mot-clé ou sélectionnez une autre date.",
                )}
              </p>
              <Link
                href="/news"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent"
              >
                <RotateCcw size={15} aria-hidden="true" />
                {t("Show all news", "Afficher toutes les actualités")}
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
