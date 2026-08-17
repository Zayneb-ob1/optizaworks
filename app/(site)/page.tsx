import {
  ArrowRight,
  Layers3,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import HeroSection from "@/components/HeroSection";
import { HeroBackdrop } from "@/components/hero/HeroStatic";
import HomeNewsCarousel from "@/components/HomeNewsCarousel";
import PartnerLogoStrip from "@/components/PartnerLogoStrip";
import ProjectCTA from "@/components/ProjectCTA";
import ScrollReveal, { StaggerReveal } from "@/components/ScrollReveal";
import ServicesCarousel from "@/components/ServicesCarousel";
import WhyOptizaLab from "@/components/WhyOptizaLab";
import {
  getPublishedFaqs,
  getPublishedNews,
  getPublishedOrganizations,
  getPublishedProducts,
  getPublishedServices,
} from "@/backend/content/queries";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const locale = await getLocale();
  const t = (english: string, french: string) =>
    translate(locale, english, french);
  const services = getPublishedServices(locale);
  const partners = getPublishedOrganizations();
  const faqs = getPublishedFaqs(locale);
  const news = getPublishedNews(locale);
  const products = getPublishedProducts(locale);
  const carouselServices = services.map(
    ({ slug, title, details, includes, icon }) => ({
      slug,
      title,
      details,
      includes,
      icon,
    }),
  );
  const partnerLogos = partners.map(
    ({ name, shortName, logo, category, featured }) => ({
      name,
      shortName,
      logo,
      category,
      featured,
    }),
  );

  return (
    <>
      <HeroSection backdrop={<HeroBackdrop />} locale={locale} />

      <section id="services" aria-labelledby="services-heading" className="home-deferred-render bg-neutral-50 py-16 sm:py-20">
        <div className="site-container">
          <h2 id="services-heading" className="text-3xl font-semibold tracking-[-0.035em] text-primary">
            {t("What we do", "Ce que nous faisons")}
          </h2>
          <ServicesCarousel services={carouselServices} />
        </div>
      </section>

      <PartnerLogoStrip partners={partnerLogos} locale={locale} />

      <section id="products" aria-labelledby="products-heading" className="home-deferred-render bg-primary-dark py-10 text-white sm:py-12">
        <div className="site-container">
          <ScrollReveal className="flex flex-col gap-4 border-b border-white/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                {t("Our product suite", "Notre gamme de produits")}
              </p>
              <h2 id="products-heading" className="mt-2 max-w-2xl text-3xl font-semibold leading-[1] tracking-[-0.04em]">
                {t("CONEKE, module by module.", "CONEKE, module par module.")}
              </h2>
            </div>
            <div className="shrink-0 sm:pb-0.5">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#c89ae5]"
              >
                {t("Explore the CONEKE suite", "Découvrir la gamme CONEKE")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </ScrollReveal>

          <StaggerReveal
            className="divide-y divide-white/15 border-b border-white/15"
            itemClassName="h-full"
          >
            {products.map((product, index) => (
              <Link
                key={product.code}
                href={`/products#product-${product.code.toLowerCase()}`}
                className="group grid h-full grid-cols-[2.5rem_minmax(0,1fr)] gap-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b878df] focus-visible:ring-offset-4 focus-visible:ring-offset-primary-dark sm:py-6 lg:grid-cols-[3.5rem_0.8fr_1.2fr_auto] lg:items-center lg:gap-8"
              >
                <span className="font-mono text-xs tracking-[0.18em] text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c89ae5]">
                      {product.code}
                    </span>
                    <span className="h-px w-7 bg-white/15" aria-hidden="true" />
                    <span className="text-[10px] uppercase tracking-[0.14em] text-white/35">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
                    {product.name}
                  </h3>
                </div>
                <p className="col-span-2 max-w-xl text-sm leading-7 text-white/55 lg:col-span-1">
                  {product.description}
                </p>
                <span className="col-span-2 flex h-11 w-11 items-center justify-center justify-self-end rounded-full border border-white/15 text-white/45 transition-[border-color,color] group-hover:border-[#b878df]/60 group-hover:text-[#c89ae5] lg:col-span-1">
                  <Layers3 size={17} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <WhyOptizaLab locale={locale} />

      <section id="about" aria-labelledby="founder-heading" className="home-deferred-render bg-primary-dark py-14 text-white sm:py-16">
        <ScrollReveal className="site-container grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-12">
          <div>
            <h2 id="founder-heading" className="text-3xl font-semibold tracking-[-0.03em] text-white">
              {t("From our founder", "Le mot du fondateur")}
            </h2>
            <div className="mt-6 flex items-center gap-3 text-sm text-white/65">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-semibold text-white">
                O
              </span>
              <span>{t("Founder, Optizaworks", "Fondateur, Optizaworks")}</span>
            </div>
          </div>
          <div className="relative max-w-4xl border-l border-white/15 pl-6 sm:pl-8">
            <span aria-hidden="true" className="absolute -left-px top-0 h-16 w-px bg-[#b878df]" />
            <blockquote className="text-[1.35rem] font-medium leading-[1.52] tracking-[-0.018em] text-white/90 sm:text-[1.6rem] lg:text-[1.9rem]">
              &ldquo;{t(
                "The best technology should make an organization feel more capable—not more complicated. That is the standard we bring to every project.",
                "La meilleure technologie doit rendre une organisation plus performante, pas plus complexe. C’est l’exigence que nous apportons à chaque projet.",
              )}&rdquo;
            </blockquote>
          </div>
        </ScrollReveal>
      </section>

      <section id="news" aria-labelledby="news-heading" className="home-deferred-render bg-neutral-50 py-16 sm:py-20">
        <ScrollReveal className="site-container">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t("Latest news", "Dernières actualités")}
              </p>
              <h2 id="news-heading" className="mt-4 max-w-5xl text-3xl font-semibold tracking-[-0.035em] text-primary">
                {t(
                  "What we are building, learning, and sharing.",
                  "Ce que nous construisons, apprenons et partageons.",
                )}
              </h2>
            </div>
            <Link
              href="/news"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-primary/15 px-5 py-3 text-sm font-semibold text-primary transition-[border-color,color] hover:border-accent/40 hover:text-accent sm:self-auto"
            >
              {t("View all news", "Voir toutes les actualités")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-9">
            <HomeNewsCarousel items={news.slice(0, 3)} locale={locale} />
          </div>
        </ScrollReveal>
      </section>

      <ProjectCTA />

      <section id="faq" aria-labelledby="faq-heading" className="home-deferred-render border-t border-primary/10 bg-neutral-100 py-16 sm:py-24">
        <ScrollReveal className="site-container grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Common questions", "Questions fréquentes")}
            </p>
            <h2 id="faq-heading" className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.035em] text-primary">
              {t("A clear start.", "Commencer en toute clarté.")}
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">
              {t(
                "A few helpful answers before we talk. We will cover the specifics together during discovery.",
                "Quelques réponses utiles avant notre échange. Nous aborderons ensemble chaque détail pendant la phase de découverte.",
              )}
            </p>
          </div>
          <FaqAccordion items={faqs} />
        </ScrollReveal>
      </section>
    </>
  );
}
