import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ProjectType } from "@/shared/content/projects";
import { translate, type Locale } from "@/shared/i18n/config";

type PortfolioPaginationProps = {
  currentPage: number;
  totalPages: number;
  activeType?: ProjectType;
  locale: Locale;
};

function portfolioHref(page: number, activeType?: ProjectType) {
  const params = new URLSearchParams();
  if (activeType) params.set("type", activeType);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/portfolio?${query}` : "/portfolio";
}

export default function PortfolioPagination({
  currentPage,
  totalPages,
  activeType,
  locale,
}: PortfolioPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-14 flex flex-wrap items-center justify-center gap-2 border-t border-primary/10 pt-8"
      aria-label={translate(locale, "Portfolio pages", "Pages des réalisations")}
    >
      {currentPage > 1 ? (
        <Link
          href={portfolioHref(currentPage - 1, activeType)}
          className="mr-2 inline-flex h-10 items-center gap-2 rounded-full border border-primary/10 bg-white px-4 text-sm font-semibold text-primary transition-colors hover:border-accent/30 hover:text-accent"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          {translate(locale, "Previous", "Précédent")}
        </Link>
      ) : (
        <span className="mr-2 inline-flex h-10 cursor-not-allowed items-center gap-2 rounded-full border border-primary/5 px-4 text-sm font-semibold text-neutral-300">
          <ArrowLeft size={15} aria-hidden="true" />
          {translate(locale, "Previous", "Précédent")}
        </span>
      )}

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <Link
          key={page}
          href={portfolioHref(page, activeType)}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={`${translate(locale, "Page", "Page")} ${page}`}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
            page === currentPage
              ? "bg-primary text-white"
              : "border border-primary/10 bg-white text-primary hover:border-accent/30 hover:text-accent"
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={portfolioHref(currentPage + 1, activeType)}
          className="ml-2 inline-flex h-10 items-center gap-2 rounded-full border border-primary/10 bg-white px-4 text-sm font-semibold text-primary transition-colors hover:border-accent/30 hover:text-accent"
        >
          {translate(locale, "Next", "Suivant")}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      ) : (
        <span className="ml-2 inline-flex h-10 cursor-not-allowed items-center gap-2 rounded-full border border-primary/5 px-4 text-sm font-semibold text-neutral-300">
          {translate(locale, "Next", "Suivant")}
          <ArrowRight size={15} aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
