import {
  ArrowRight,
  Layers3,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import HeroSection from "@/components/HeroSection";
import { HeroBackdrop } from "@/components/hero/HeroStatic";
import HomeWorkShowcase from "@/components/HomeWorkShowcase";
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
  getPublishedProjects,
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
  const projects = getPublishedProjects({ featuredOnly: true, limit: 3, locale });
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
    ({ name, shortName, logo, website, featured }) => ({
      name,
      shortName,
      logo,
      website,
      featured,
    }),
  );

  return (
    <>
      <HeroSection backdrop={<HeroBackdrop />} locale={locale} />

      <section id="services" aria-labelledby="services-heading" className="bg-neutral-50 py-16 sm:py-20">
        <div className="site-container">
          <h2 id="services-heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("What we do", "Ce que nous faisons")}
          </h2>
          <ServicesCarousel services={carouselServices} />
        </div>
      </section>

      <HomeWorkShowcase projects={projects} />

      <section id="products" aria-labelledby="products-heading" className="bg-primary-dark py-16 text-white sm:py-20">
        <div className="site-container">
          <ScrollReveal className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                {t("Our product suite", "Notre gamme de produits")}
              </p>
              <h2 id="products-heading" className="mt-5 max-w-2xl text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                {t("CONEKE, module by module.", "CONEKE, module par module.")}
              </h2>
            </div>
            <div className="lg:pb-1 lg:justify-self-end">
              <p className="max-w-xl text-sm leading-7 text-white/60 sm:text-[15px]">
                {t(
                  "A shared sovereign foundation for HR, finance, and accounting—each module can work independently or as part of one connected platform.",
                  "Une base souveraine commune pour les ressources humaines, la finance et la comptabilité : chaque module peut fonctionner seul ou au sein d’une plateforme connectée.",
                )}
              </p>
              <Link
                href="/products"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#c89ae5]"
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
              <article
                key={product.code}
                className="group grid h-full gap-5 py-7 sm:grid-cols-[3rem_1fr] sm:py-9 lg:grid-cols-[3.5rem_0.8fr_1.2fr_auto] lg:items-center lg:gap-8"
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
                <p className="max-w-xl text-sm leading-7 text-white/55">
                  {product.description}
                </p>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/45 transition-[border-color,color] group-hover:border-[#b878df]/60 group-hover:text-[#c89ae5]">
                  <Layers3 size={17} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <WhyOptizaLab locale={locale} />

      <PartnerLogoStrip partners={partnerLogos} />

      <section aria-labelledby="news-heading" className="bg-neutral-50 py-16 sm:py-20">
        <ScrollReveal className="site-container">
          <div className="flex flex-col gap-7 border-b border-primary/10 pb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent/45" />
              {t("Latest news", "Dernières actualités")}
              </p>
              <h2 id="news-heading" className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-primary sm:text-5xl">
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

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            {news[0] && (
              <article className="relative flex min-h-[25rem] overflow-hidden rounded-[2rem] bg-primary-dark p-7 text-white sm:min-h-[29rem] sm:p-10">
                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/[0.08]" aria-hidden="true" />
                <div className="pointer-events-none absolute -right-8 -top-10 h-44 w-44 rounded-full border border-[#b878df]/30" aria-hidden="true" />
                <span aria-hidden="true" className="absolute -bottom-16 right-4 font-mono text-[11rem] font-semibold leading-none tracking-[-0.1em] text-white/[0.035] sm:text-[15rem]">
                  01
                </span>

                <div className="relative flex w-full flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      {news[0].date}
                    </p>
                    <span className="border-l border-[#b878df]/60 pl-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                      {t("Newest", "À la une")}
                    </span>
                  </div>
                  <div className="mt-auto max-w-2xl pt-16">
                    <h3 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                      {news[0].title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                      {news[0].description}
                    </p>
                  </div>
                </div>
              </article>
            )}

            <div className="divide-y divide-primary/15 border-y border-primary/15">
              {news.slice(1, 3).map((item, index) => (
                <article key={item.slug ?? item.title} className="group grid min-h-52 grid-cols-[auto_1fr] gap-5 py-7 sm:gap-7 sm:py-9">
                  <span className="font-mono text-xs tracking-[0.16em] text-primary/35">
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                      {item.date}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] text-primary transition-colors group-hover:text-accent sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-neutral-500">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ProjectCTA />

      <section aria-labelledby="faq-heading" className="bg-neutral-100 pb-8 pt-16 sm:pb-10 sm:pt-20">
        <ScrollReveal className="site-container grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Common questions", "Questions fréquentes")}
            </p>
            <h2 id="faq-heading" className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-5xl">
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
