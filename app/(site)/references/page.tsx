import type { Metadata } from "next";
import { Building2, Network } from "lucide-react";
import Image from "next/image";
import { getPublishedOrganizations } from "@/backend/content/queries";
import { getLocale } from "@/backend/i18n/request-locale";
import type { PartnerCategory } from "@/shared/content/partners";
import { translate } from "@/shared/i18n/config";
import { createPublicPageMetadata } from "@/shared/seo/site";

const referenceGroups: Array<{
  category: PartnerCategory;
  english: string;
  french: string;
}> = [
  {
    category: "Local government & justice",
    english: "Local government & justice",
    french: "Collectivités territoriales et justice",
  },
  {
    category: "Education & training",
    english: "Education & training",
    french: "Enseignement et formation",
  },
  {
    category: "Public institutions & agencies",
    english: "Public institutions & agencies",
    french: "Institutions publiques et agences",
  },
  {
    category: "Economic chambers & agencies",
    english: "Economic chambers & agencies",
    french: "Chambres économiques et agences",
  },
];

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
            <h1 className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em]">
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
          <div className="border-b border-primary/10 pb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t("Our references", "Nos références")}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-primary">
                {t("All partner organizations", "Toutes les organisations partenaires")}
              </h2>
            </div>
          </div>

          <div className="mt-12 space-y-14 sm:space-y-16">
            {referenceGroups.map((group, groupIndex) => {
              const groupOrganizations = organizations.filter(
                (organization) => organization.category === group.category,
              );

              if (groupOrganizations.length === 0) return null;

              const headingId = `reference-group-${groupIndex + 1}`;

              return (
                <section key={group.category} aria-labelledby={headingId}>
                  <div className="flex items-end justify-between gap-6 border-b border-primary/10 pb-5">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-accent">
                        {String(groupIndex + 1).padStart(2, "0")}
                      </span>
                      <h3
                        id={headingId}
                        className="text-xl font-semibold tracking-[-0.025em] text-primary sm:text-2xl"
                      >
                        {t(group.english, group.french)}
                      </h3>
                    </div>
                    <span className="shrink-0 text-xs font-medium text-neutral-500">
                      {groupOrganizations.length} {t("organizations", "organisations")}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
                    {groupOrganizations.map((organization) => (
                      <div
                        key={organization.shortName}
                        title={organization.name}
                        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-primary/10 bg-white p-5 shadow-[0_18px_45px_-35px_rgba(50,16,68,0.35)] sm:p-6"
                      >
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
                            sizes="(max-width: 640px) calc(50vw - 28px), (max-width: 1024px) calc(33vw - 28px), 220px"
                            className="object-contain"
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
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
