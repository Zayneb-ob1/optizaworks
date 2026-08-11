import type { Metadata } from "next";
import {
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import { getPublishedServices } from "@/backend/content/queries";
import { getLocale } from "@/backend/i18n/request-locale";
import { serviceIcons } from "@/components/services/service-icons";
import { translate } from "@/shared/i18n/config";
import { createPublicPageMetadata } from "@/shared/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return createPublicPageMetadata({
    title: translate(locale, "Services", "Services"),
    description: translate(
      locale,
      "Explore Optizaworks services across digital products, ERP and CRM, cybersecurity, AI, cloud infrastructure, design, and support.",
      "Découvrez les services d’Optizaworks : produits numériques, ERP et CRM, cybersécurité, IA, infrastructure cloud, design et accompagnement.",
    ),
    path: "/services",
    locale,
  });
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = (english: string, french: string) =>
    translate(locale, english, french);
  const services = getPublishedServices(locale);
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-50 py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-32 -top-52 h-[540px] w-[540px] rounded-full border border-accent/10" />
        <div className="pointer-events-none absolute -right-8 -top-28 h-[330px] w-[330px] rounded-full border border-accent/10" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-8 bg-accent/50" />
            {t("Our capabilities", "Nos expertises")}
          </p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-primary sm:text-6xl lg:text-7xl">
              {t(
                "Technical depth across the full digital lifecycle.",
                "Une expertise technique sur l’ensemble du cycle de vie numérique.",
              )}
            </h1>
            <p className="max-w-xl text-base leading-8 text-neutral-500 lg:justify-self-end">
              {t(
                "A complete foundation of technical services—from strategic planning and product delivery to secure infrastructure and continuous maintenance.",
                "Un socle complet de services techniques, de la planification stratégique et la livraison produit jusqu’à l’infrastructure sécurisée et la maintenance continue.",
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="group flex min-h-28 flex-col items-center justify-center gap-3 border-b border-r border-primary/10 px-3 text-center transition-colors hover:bg-neutral-50 sm:[&:nth-child(4n)]:border-r-0 lg:border-b-0 lg:[&:nth-child(4n)]:border-r lg:[&:nth-child(8n)]:border-r-0"
                >
                  <Icon
                    size={19}
                    strokeWidth={1.7}
                    className="text-accent transition-transform group-hover:-translate-y-0.5"
                  />
                  <span className="text-[11px] font-semibold leading-4 text-primary">
                    {service.title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article
                id={service.slug}
                key={service.slug}
                className="scroll-mt-36 border-b border-primary/10 py-16 last:border-0 sm:py-20"
              >
                <div className="grid gap-9 lg:grid-cols-[88px_0.9fr_1.1fr] lg:gap-12">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral text-accent">
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-neutral-500">
                      {service.details}
                    </p>
                  </div>
                  <div className="grid gap-3 self-start sm:grid-cols-2">
                    {service.includes.map((item) => (
                      <div
                        key={item}
                        className="flex min-h-16 items-center gap-3 rounded-2xl border border-primary/10 bg-white px-4 py-3"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                          <Check size={14} strokeWidth={2} />
                        </span>
                        <span className="text-sm font-medium text-neutral-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-neutral-100 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Need several capabilities?", "Besoin de plusieurs expertises ?")}
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-5xl">
              {t(
                "We bring the right disciplines together as one team.",
                "Nous réunissons les bonnes disciplines au sein d’une seule équipe.",
              )}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-500">
              {t(
                "Tell us what needs to change. We will define the scope, technical approach, delivery phases, and support model.",
                "Expliquez-nous ce qui doit évoluer. Nous définirons le périmètre, l’approche technique, les phases de livraison et le modèle d’accompagnement.",
              )}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 justify-self-start rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary lg:justify-self-end"
          >
            {t("Discuss your project", "Parler de votre projet")}
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
