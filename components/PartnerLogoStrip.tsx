import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { Partner } from "@/shared/content/partners";
import { translate, type Locale } from "@/shared/i18n/config";

type PartnerLogoStripProps = {
  partners: Pick<Partner, "name" | "shortName" | "logo" | "category" | "featured">[];
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
        <div className="flex items-start justify-between gap-4 pb-8">
          <h2 id="partners-heading" className="flex items-center gap-2 text-3xl font-semibold tracking-[-0.025em] text-primary sm:gap-3">
            <span className="hidden h-px w-8 bg-accent sm:block" aria-hidden="true" />
            {t("Trusted by institutions", "Ils nous font confiance")}
          </h2>

          <dl className="grid w-fit grid-cols-2 border-l border-primary/15">
            <div className="min-w-20 px-3 sm:min-w-36 sm:px-7">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                Institutions
              </dt>
              <dd className="mt-2 text-4xl font-bold leading-none tracking-[-0.05em] text-primary sm:text-5xl">
                +{partners.length}
              </dd>
            </div>
            <div className="min-w-20 border-l border-primary/15 px-3 sm:min-w-36 sm:px-7">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
                {t("Sectors", "Secteurs")}
              </dt>
              <dd className="mt-2 text-4xl font-bold leading-none tracking-[-0.05em] text-primary sm:text-5xl">
                +4
              </dd>
            </div>
          </dl>
        </div>

        <div className="grid grid-cols-2 border-l border-primary/10 sm:grid-cols-4 lg:grid-cols-8">
          {featured.map((partner) => (
            <div
              key={partner.shortName}
              title={partner.name}
              className="relative flex h-[7.5rem] items-center justify-center border-b border-r border-primary/10 bg-white p-3 sm:h-[8.5rem] sm:p-3.5 lg:h-[7.5rem] lg:p-3"
            >
              <span className="relative h-full w-full">
                <Image
                  src={partner.logo}
                  alt={t(`${partner.name} logo`, `Logo de ${partner.name}`)}
                  fill
                  loading="lazy"
                  quality={78}
                  sizes="(max-width: 639px) calc(50vw - 44px), (max-width: 1023px) calc(25vw - 44px), (max-width: 1279px) calc(12.5vw - 34px), 126px"
                  className="object-contain p-0.5"
                />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-7 flex justify-end">
          <Link
            href="/references"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            {t("See more", "Voir plus")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
