import {
  ArrowRight,
  Layers3,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import HeroSection from "@/components/HeroSection";
import HomeWorkShowcase from "@/components/HomeWorkShowcase";
import PartnerLogoStrip from "@/components/PartnerLogoStrip";
import ProjectCTA from "@/components/ProjectCTA";
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

  return (
    <>
      <HeroSection />

      <section id="services" aria-labelledby="services-heading" className="bg-white py-24 sm:py-32">
        <div className="site-container">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t("What we do", "Ce que nous faisons")}
              </p>
              <h2 id="services-heading" className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-5xl">
                {t(
                  "One partner for the full digital journey.",
                  "Un seul partenaire pour tout votre parcours numérique.",
                )}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-neutral-500 md:justify-self-end">
              {t(
                "From first idea to stable infrastructure, we bring strategy, design, and engineering together in one practical team.",
                "De la première idée à une infrastructure stable, nous réunissons stratégie, design et ingénierie au sein d’une même équipe pragmatique.",
              )}
            </p>
          </div>
          <ServicesCarousel services={services} />
        </div>
      </section>

      <section id="products" aria-labelledby="products-heading" className="bg-primary-dark py-24 text-white sm:py-32">
        <div className="site-container">
          <div className="grid gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                {t("Our product suite", "Notre gamme de produits")}
              </p>
              <h2 id="products-heading" className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
                {t("CONEKE, module by module.", "CONEKE, module par module.")}
              </h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-xl text-sm leading-7 text-white/65">
                {t(
                  "A shared sovereign foundation for HR, finance, and accounting—each module can work independently or as part of one connected platform.",
                  "Une base souveraine commune pour les ressources humaines, la finance et la comptabilité : chaque module peut fonctionner seul ou au sein d’une plateforme connectée.",
                )}
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-white/70"
              >
                {t("Explore the CONEKE suite", "Découvrir la gamme CONEKE")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/15 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.code} className="bg-primary-dark p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-white/10 px-2 text-[10px] font-bold tracking-[0.12em]">
                    {product.code}
                  </span>
                  <Layers3 size={18} className="text-white/45" strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3 className="mt-7 text-xl font-semibold">{product.name}</h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {product.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WhyOptizaLab />

      <HomeWorkShowcase projects={projects} />

      <section id="about" aria-labelledby="founder-heading" className="bg-primary-dark py-24 text-white sm:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-24">
          <div>
            <h2 id="founder-heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              {t("From our founder", "Le mot du fondateur")}
            </h2>
            <div className="mt-8 flex items-center gap-3 text-sm text-white/65">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-semibold text-white">
                O
              </span>
              <span>{t("Founder, Optizaworks", "Fondateur, Optizaworks")}</span>
            </div>
          </div>
          <blockquote className="text-2xl font-medium leading-snug tracking-[-0.025em] sm:text-3xl lg:text-4xl">
            &ldquo;{t(
              "The best technology should make an organization feel more capable—not more complicated. That is the standard we bring to every project.",
              "La meilleure technologie doit rendre une organisation plus performante, pas plus complexe. C’est l’exigence que nous apportons à chaque projet.",
            )}&rdquo;
          </blockquote>
        </div>
      </section>

      <PartnerLogoStrip partners={partners} />

      <section aria-labelledby="news-heading" className="bg-neutral-50 py-20 sm:py-28">
        <div className="site-container">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-8 bg-accent/45" />
                {t("Latest news", "Dernières actualités")}
              </p>
              <h2 id="news-heading" className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-5xl">
                {t(
                  "What we are building, learning, and sharing.",
                  "Ce que nous construisons, apprenons et partageons.",
                )}
              </h2>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 self-start rounded-full border border-primary/10 bg-white px-5 py-3 text-sm font-semibold text-primary transition-[transform,border-color,color] hover:-translate-y-0.5 hover:border-accent/30 hover:text-accent sm:self-auto"
            >
              {t("View all news", "Voir toutes les actualités")}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            {news[0] && (
              <article className="relative min-h-[25rem] overflow-hidden rounded-[2rem] bg-primary-dark p-7 text-white shadow-[0_28px_70px_-45px_rgba(50,16,68,0.55)] sm:p-10">
                <div className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full border border-white/[0.08]" />
                <div className="pointer-events-none absolute -right-12 -top-14 h-52 w-52 rounded-full border border-accent/30" />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.055]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at center, rgba(255,255,255,0.85) 1px, transparent 1.5px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="relative flex h-full min-h-[21rem] flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                      {news[0].date}
                    </p>
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/55">
                      {t("Latest update", "Dernière actualité")}
                    </span>
                  </div>
                  <div className="mt-auto max-w-2xl pt-16">
                    <h3 className="text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
                      {news[0].title}
                    </h3>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
                      {news[0].description}
                    </p>
                  </div>
                </div>
              </article>
            )}

            <div className="grid gap-5">
              {news.slice(1, 3).map((item, index) => (
                <article
                  key={item.slug ?? item.title}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-primary/10 bg-white p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-[0_22px_50px_-38px_rgba(50,16,68,0.38)] sm:p-8"
                >
                  <span className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.17em] text-accent">
                      {item.date}
                    </p>
                    <span className="text-[10px] font-semibold tracking-[0.16em] text-primary/65">
                      0{index + 2}
                    </span>
                  </div>
                  <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em] text-primary sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-neutral-500">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="bg-white py-24 sm:py-32">
        <div className="site-container grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
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
        </div>
      </section>

      <ProjectCTA />
    </>
  );
}
