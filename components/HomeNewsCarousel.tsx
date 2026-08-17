import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { NewsItem } from "@/shared/content/news";
import { translate, type Locale } from "@/shared/i18n/config";

type HomeNewsCarouselProps = {
  items: NewsItem[];
  locale: Locale;
};

export default function HomeNewsCarousel({ items, locale }: HomeNewsCarouselProps) {
  const t = (english: string, french: string) =>
    translate(locale, english, french);

  if (items.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.slice(0, 3).map((item, index) => {
        const articleId = `news-${item.slug ?? index + 1}`;

        return (
          <Link
            key={item.slug ?? item.title}
            href={`/news#${articleId}`}
            aria-label={t(`Read ${item.title}`, `Lire ${item.title}`)}
            className="group flex min-h-56 flex-col border border-primary/10 bg-white p-5 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-accent/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 sm:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                {item.date}
              </span>
              <span className="font-mono text-[10px] text-neutral-400">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <h3 className="mt-5 text-xl font-semibold leading-tight tracking-[-0.025em] text-primary">
              {item.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-500">
              {item.description}
            </p>

            <span className="mt-auto flex items-center justify-end pt-5 text-accent">
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
