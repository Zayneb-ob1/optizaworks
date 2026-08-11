import type { Metadata } from "next";
import { ArrowUpRight, Building2, Network } from "lucide-react";
import Image from "next/image";
import { getPublishedOrganizations } from "@/backend/content/queries";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";
import { createPublicPageMetadata } from "@/shared/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return createPublicPageMetadata({
    title: translate(locale, "References", "Références"),
    description: translate(
      locale,
      "Discover the public institutions, professional organizations, education establishments, and regional bodies supported by Optizaworks.",
      "Découvrez les institutions publiques, organisations professionnelles, établissements d’enseignement et organismes régionaux accompagnés par Optizaworks.",
    ),
    path: "/references",
    locale,
  });
}

export default async function ReferencesPage() {
  const locale = await getLocale();
  const organizations = getPublishedOrganizations();
  const sectorCount = new Set(
    organizations.map((organization) => organization.category),
  ).size;
  const t = (english: string, french: string) =>
    translate(locale, english, french);

  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark pb-20 pt-28 text-white sm:pb-24 sm:pt-36">
        <div className="pointer-events-none absolute -right-36 -top-56 h-[560px] w-[560px] rounded-full border border-white/[0.07]" />
        <div className="pointer-events-none absolute -right-8 -top-28 h-[340px] w-[340px] rounded-full border border-accent/25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,0.8) 1px, transparent 1.5px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="site-container relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              <span className="h-px w-8 bg-accent" />
              {t("Institutional references", "Références institutionnelles")}
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              {t(
                "Organizations that trust our digital work.",
                "Les organisations qui font confiance à notre expertise numérique.",
              )}
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
              {t(
                "Public institutions, professional chambers, educational establishments, and regional organizations across Morocco.",
                "Institutions publiques, chambres professionnelles, établissements d’enseignement et organismes régionaux à travers le Maroc.",
              )}
            </p>
          </div>

          <div className="flex gap-3">
            <div className="min-w-28 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <Building2
                size={18}
                className="text-white/55"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <strong className="mt-3 block text-2xl font-semibold">
                {organizations.length}
              </strong>
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                {t("References", "Références")}
              </span>
            </div>
            <div className="min-w-28 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
              <Network
                size={18}
                className="text-white/55"
                strokeWidth={1.6}
                aria-hidden="true"
              />
              <strong className="mt-3 block text-2xl font-semibold">
                {String(sectorCount).padStart(2, "0")}
              </strong>
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                {t("Sectors", "Secteurs")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 sm:py-28">
        <div className="site-container">
          <div className="flex flex-col gap-4 border-b border-primary/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t("Our references", "Nos références")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary sm:text-4xl">
                {t("All partner organizations", "Toutes les organisations partenaires")}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-neutral-500 sm:text-right">
              {t(
                "Select a logo to visit the organization’s official website.",
                "Sélectionnez un logo pour visiter le site officiel de l’organisation.",
              )}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {organizations.map((organization) => (
              <a
                key={organization.shortName}
                href={organization.website}
                target="_blank"
                rel="noreferrer"
                title={organization.name}
                aria-label={t(
                  `Visit ${organization.name} official website`,
                  `Visiter le site officiel de ${organization.name}`,
                )}
                className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-primary/10 bg-white p-5 shadow-[0_18px_45px_-35px_rgba(50,16,68,0.35)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_24px_55px_-32px_rgba(106,13,173,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 sm:p-7"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                <span className="relative h-full w-full">
                  <Image
                    src={organization.logo}
                    alt={t(
                      `${organization.name} logo`,
                      `Logo de ${organization.name}`,
                    )}
                    fill
                    loading="lazy"
                    quality={82}
                    sizes="(max-width: 640px) calc(50vw - 28px), (max-width: 1024px) calc(33vw - 28px), 270px"
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </span>
                <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white opacity-0 shadow-sm transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100 sm:right-4 sm:top-4">
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
                <span className="sr-only">{organization.name}</span>
              </a>
            ))}
          </div>

          {organizations.length === 0 && (
            <div className="mt-10 rounded-3xl border border-dashed border-primary/15 bg-white px-6 py-16 text-center text-sm text-neutral-500">
              {t(
                "No published references are available yet.",
                "Aucune référence publiée n’est disponible pour le moment.",
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
