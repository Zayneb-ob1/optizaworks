import type { Metadata } from "next";
import { ArrowRight, Check, Layers3, Sparkles } from "lucide-react";
import Link from "next/link";
import { getPublishedProducts } from "@/backend/content/queries";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";
import { createPublicPageMetadata } from "@/shared/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return createPublicPageMetadata({
    title: translate(locale, "CONEKE Products", "Produits CONEKE"),
    description: translate(
      locale,
      "Explore the CONEKE modular platform for HR, financial, and accounting management.",
      "Découvrez la plateforme modulaire CONEKE dédiée à la gestion des ressources humaines, des finances et de la comptabilité.",
    ),
    path: "/products",
    locale,
  });
}

export default async function ProductsPage() {
  const locale = await getLocale();
  const t = (english: string, french: string) =>
    translate(locale, english, french);
  const products = getPublishedProducts(locale);
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-50 py-24 sm:py-32">
        <div className="pointer-events-none absolute -right-40 -top-48 h-[560px] w-[560px] rounded-full border border-accent/10" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-8 bg-accent/50" />
            {t("The CONEKE suite", "La gamme CONEKE")}
          </p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-primary sm:text-6xl lg:text-7xl">
            {t(
              "One platform, built around interoperable business modules.",
              "Une plateforme conçue autour de modules métier interopérables.",
            )}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-neutral-500">
            {t(
              "Deploy each module independently or combine them around the needs of your organization.",
              "Déployez chaque module indépendamment ou combinez-les selon les besoins de votre organisation.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10 lg:px-10">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <Layers3 size={25} strokeWidth={1.6} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              {t("Shared technical foundation", "Socle technique commun")}
            </p>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-white/70">
              {t(
                "Every CONEKE solution shares authentication, electronic document management, OCR, document AI, a rules engine, dashboards, and audit trails—creating consistency between modules and faster deployment for each new client.",
                "Chaque solution CONEKE partage l’authentification, la gestion électronique des documents, l’OCR, l’IA documentaire, un moteur de règles, des tableaux de bord et des pistes d’audit, garantissant la cohérence entre les modules et un déploiement plus rapide pour chaque nouveau client.",
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Available solutions", "Solutions disponibles")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-5xl">
              {t("Three modules in production.", "Trois modules en production.")}
            </h2>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <article
                id={`product-${product.code.toLowerCase()}`}
                key={product.code}
                className="flex scroll-mt-28 flex-col rounded-3xl border border-primary/10 bg-white p-7 target:border-accent/40 target:ring-2 target:ring-accent/20 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 min-w-12 items-center justify-center rounded-2xl bg-primary px-3 text-xs font-bold tracking-[0.12em] text-white">
                    {product.code}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {product.category}
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-primary">{product.name}</h3>
                <p className="mt-4 text-sm leading-7 text-neutral-500">
                  {product.description}
                </p>
                <ul className="mt-7 space-y-3 border-t border-primary/10 pt-6">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-neutral-700"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 lg:px-10">
          <div>
            <Sparkles size={24} className="text-accent" strokeWidth={1.6} />
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-4xl">
              {t("Modules in development", "Modules en développement")}
            </h2>
          </div>
          <div>
            <p className="text-sm leading-7 text-neutral-500">
              {t(
                "Other CONEKE building blocks are being developed on the same shared foundation. Public procurement, standalone document management, CONEKE Audit AI, Smart Programmer, and Smart Auditor are currently under study and will be announced as they reach production.",
                "D’autres briques CONEKE sont développées sur le même socle commun. Les marchés publics, la gestion documentaire autonome, CONEKE Audit AI, Smart Programmer et Smart Auditor sont actuellement à l’étude et seront annoncés lors de leur mise en production.",
              )}
            </p>
            <p className="mt-4 text-sm font-medium leading-7 text-primary">
              {t(
                "We present upcoming modules clearly as work in progress, never as already available products.",
                "Nous présentons clairement les futurs modules comme des travaux en cours, jamais comme des produits déjà disponibles.",
              )}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary"
            >
              {t("Request a demonstration", "Demander une démonstration")}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
