import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { Partner } from "@/shared/content/partners";
import { translate, type Locale } from "@/shared/i18n/config";

type PartnerLogoStripProps = {
  partners: Pick<Partner, "name" | "shortName" | "logo" | "category" | "website" | "featured">[];
  locale: Locale;
};

export default function PartnerLogoStrip({ partners, locale }: PartnerLogoStripProps) {
  const t = (english: string, french: string) => translate(locale, english, french);
  const findPartner = (shortName: string) =>
    partners.find((partner) => partner.shortName === shortName);
  const featured = [
    findPartner("AREP Dakhla"),
    findPartner("ENCG Settat"),
    findPartner("Agence Urbaine Dakhla"),
    ...partners.filter(
      (partner) => partner.category === "Local government & justice",
    ),
    findPartner("CASM"),
    findPartner("ISTAHT Touarga"),
  ].filter((partner): partner is (typeof partners)[number] => Boolean(partner));

  return (
    <section id="institutions" aria-labelledby="partners-heading" className="home-deferred-render overflow-hidden bg-neutral-100 py-16 sm:py-24">
      <ScrollReveal className="site-container">
        <div className="grid gap-9 border-b border-primary/15 pb-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              <span className="h-px w-8 bg-accent" aria-hidden="true" />
              {t("Trusted by institutions", "Ils nous font confiance")}
            </p>
            <h2 id="partners-heading" className="mt-5 max-w-3xl text-[2.1rem] font-semibold leading-[1.04] tracking-[-0.045em] text-primary sm:text-[2.8rem] lg:text-[3.5rem]">
              {t(
                "Selected public and professional organizations.",
                "Institutions publiques et organisations professionnelles sélectionnées.",
              )}
            </h2>
          </div>

          <dl className="grid grid-cols-2 border-l border-primary/15">
            <div className="min-w-28 px-5 sm:min-w-36 sm:px-7">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Institutions
              </dt>
              <dd className="mt-2 text-4xl font-bold leading-none tracking-[-0.05em] text-primary sm:text-5xl">
                {String(partners.length).padStart(2, "0")}
              </dd>
            </div>
            <div className="min-w-28 border-l border-primary/15 px-5 sm:min-w-36 sm:px-7">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                {t("Sectors", "Secteurs")}
              </dt>
              <dd className="mt-2 text-4xl font-bold leading-none tracking-[-0.05em] text-primary sm:text-5xl">
                4
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 grid grid-cols-2 border-l border-t border-primary/10 sm:grid-cols-4 lg:grid-cols-8">
          {featured.map((partner) => (
            <a
              key={partner.shortName}
              href={partner.website}
              target="_blank"
              rel="noreferrer"
              aria-label={t(`Visit ${partner.name} website`, `Visiter le site de ${partner.name}`)}
              title={partner.name}
              className="group relative flex h-[7.5rem] items-center justify-center border-b border-r border-primary/10 bg-white p-3 transition-colors hover:bg-neutral-50 focus-visible:z-10 sm:h-[8.5rem] sm:p-3.5 lg:h-[7.5rem] lg:p-3"
            >
              <span className="relative h-full w-full">
                <Image
                  src={partner.logo}
                  alt={t(`${partner.name} logo`, `Logo de ${partner.name}`)}
                  fill
                  loading="lazy"
                  quality={78}
                  sizes="(max-width: 639px) calc(50vw - 44px), (max-width: 1023px) calc(25vw - 44px), (max-width: 1279px) calc(12.5vw - 34px), 126px"
                  className="object-contain p-0.5 transition-transform duration-300 group-hover:scale-[1.035]"
                />
              </span>
              <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-7 flex justify-end">
          <Link
            href="/references"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            {t(
              `View all ${partners.length} websites`,
              `Voir les ${partners.length} sites web`,
            )}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
