"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { NewsItem } from "@/shared/content/news";
import { translate, type Locale } from "@/shared/i18n/config";

type HomeNewsCarouselProps = {
  items: NewsItem[];
  locale: Locale;
};

export default function HomeNewsCarousel({ items, locale }: HomeNewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const t = (english: string, french: string) => translate(locale, english, french);
  const activeItem = items[activeIndex];

  if (!activeItem) return null;

  const previous = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const next = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  const articleId = `news-${activeItem.slug ?? activeIndex + 1}`;
  const previousIndex = (activeIndex - 1 + items.length) % items.length;
  const nextIndex = (activeIndex + 1) % items.length;

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={t("Latest news", "Dernières actualités")}
      className="relative mx-auto max-w-6xl"
    >
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {t(
          `${activeIndex + 1} of ${items.length}: ${activeItem.title}`,
          `${activeIndex + 1} sur ${items.length} : ${activeItem.title}`,
        )}
      </p>

      <div className="relative h-[22rem] overflow-hidden sm:h-[23rem]">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isPrevious = items.length > 1 && index === previousIndex;
          const isNext = items.length > 1 && index === nextIndex;
          const positionClass = isActive
            ? "z-30 w-[84%] translate-x-0 translate-y-0 scale-100 opacity-100 sm:w-[76%] lg:w-[70%]"
            : isPrevious
              ? "z-10 w-[88%] -translate-x-[12%] translate-y-5 -rotate-[1.5deg] scale-[0.92] opacity-80 sm:w-[80%] sm:-translate-x-[22%] lg:w-[76%]"
              : isNext
                ? "z-20 w-[88%] translate-x-[12%] translate-y-5 rotate-[1.5deg] scale-[0.92] opacity-80 sm:w-[80%] sm:translate-x-[22%] lg:w-[76%]"
                : "z-0 w-[80%] translate-y-8 scale-[0.88] opacity-0";

          const card = (
            <div
              className={`relative h-[18rem] overflow-hidden rounded-[1.75rem] border p-6 text-white shadow-[0_24px_65px_-42px_rgba(31,9,44,0.85)] sm:h-[18.5rem] sm:p-8 ${
                isActive
                  ? "border-white/15 bg-primary-dark"
                  : index % 2 === 0
                    ? "border-white/10 bg-[#2a0b3a]"
                    : "border-white/10 bg-[#421255]"
              }`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(184,120,223,0.2),transparent_68%)]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 right-5 font-mono text-[9rem] font-semibold leading-none tracking-[-0.1em] text-white/[0.04]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="relative flex h-full min-w-0 flex-col">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d4aee8]">
                    {isActive ? t("Newest", "À la une") : item.date}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] text-white/45">
                    {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-8 max-w-2xl text-2xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-3xl lg:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
                  {item.description}
                </p>
                <p className="mt-auto text-xs font-medium text-white/50">
                  {item.date}
                </p>
              </div>
            </div>
          );

          return (
            <div
              key={item.slug ?? item.title}
              aria-hidden={!isActive}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              {isActive ? (
                <Link
                  id="home-news-slide"
                  href={`/news#${articleId}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={t(
                    `Read ${item.title}`,
                    `Lire ${item.title}`,
                  )}
                  className={`pointer-events-auto block transform-gpu transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${positionClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4`}
                >
                  {card}
                </Link>
              ) : (
                <div
                  className={`transform-gpu transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${positionClass}`}
                >
                  {card}
                </div>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={previous}
          disabled={items.length < 2}
          aria-controls="home-news-slide"
          aria-label={t("Previous news item", "Actualité précédente")}
          className="absolute left-1 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-primary/15 bg-white text-primary shadow-[0_14px_35px_-20px_rgba(31,9,44,0.65)] transition-[background-color,border-color,transform] hover:scale-105 hover:border-accent/35 hover:bg-[#f7effa] disabled:cursor-not-allowed disabled:opacity-40 sm:left-4"
        >
          <ChevronLeft size={21} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={items.length < 2}
          aria-controls="home-news-slide"
          aria-label={t("Next news item", "Actualité suivante")}
          className="absolute right-1 top-1/2 z-40 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-[0_14px_35px_-20px_rgba(31,9,44,0.65)] transition-[background-color,transform] hover:scale-105 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-40 sm:right-4"
        >
          <ChevronRight size={21} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
