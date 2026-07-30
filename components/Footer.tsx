import Link from "next/link";
import { translate, type Locale } from "@/shared/i18n/config";

export default function Footer({ locale }: { locale: Locale }) {
  const t = (english: string, french: string) => translate(locale, english, french);

  return (
    <footer className="border-t border-primary/10 bg-white">
      <div className="site-container grid gap-10 py-12 md:grid-cols-[1fr_auto]">
        <div>
          <Link href="/" className="text-lg font-bold tracking-tight text-primary">
            OPTIZA<span className="text-accent">WORKS</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
            {t(
              "Sovereign digital solutions for public administrations and businesses, built from Technopark Agadir.",
              "Solutions numériques souveraines pour les administrations publiques et les entreprises, conçues depuis le Technopark d’Agadir.",
            )}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm font-medium text-neutral-700 sm:grid-cols-3">
          {[
            [t("About", "À propos"), "/about"],
            ["Services", "/services"],
            [t("CONEKE products", "Produits CONEKE"), "/products"],
            [t("Portfolio", "Réalisations"), "/portfolio"],
            [t("References", "Références"), "/references"],
            [t("News", "Actualités"), "/news"],
            [t("Careers", "Carrières"), "/careers"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="rounded-sm transition-colors hover:text-accent">
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-primary/10">
        <div className="site-container py-5 text-xs text-neutral-500">
          <p>
            &copy; {new Date().getFullYear()} Optizaworks. {t("All rights reserved.", "Tous droits réservés.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
