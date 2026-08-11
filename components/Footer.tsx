import { Linkedin, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { translate, type Locale } from "@/shared/i18n/config";

export default function Footer({ locale }: { locale: Locale }) {
  const t = (english: string, french: string) =>
    translate(locale, english, french);

  const linkColumns = [
    [
      ["Services", "/services"],
      [t("CONEKE products", "Produits CONEKE"), "/products"],
    ],
    [
      [t("Portfolio", "Réalisations"), "/portfolio"],
      [t("References", "Références"), "/references"],
    ],
    [
      [t("News", "Actualités"), "/news"],
      [t("Careers", "Carrières"), "/careers"],
    ],
  ];

  const bottomLinks = [
    [t("About", "À propos"), "/about"],
    ["Contact", "/contact"],
  ];

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/optizaworks",
      icon: Linkedin,
    },
    {
      label: "Email",
      href: "mailto:contact@optizaworks.com",
      icon: Mail,
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/212697569854",
      icon: MessageCircle,
    },
  ];

  return (
    <footer className="bg-white px-3 py-5 sm:px-5 sm:py-8">
      <div className="relative isolate mx-auto max-w-[1480px] overflow-hidden rounded-[2rem] bg-[radial-gradient(circle_at_8%_12%,rgba(106,13,173,0.14),transparent_28%),radial-gradient(circle_at_92%_8%,rgba(184,120,223,0.38),transparent_34%),radial-gradient(circle_at_50%_118%,rgba(50,16,68,0.16),transparent_42%),linear-gradient(135deg,#fcfafd_0%,#f5e9fa_48%,#e6cff2_100%)] shadow-[0_24px_70px_-48px_rgba(50,16,68,0.38)] sm:rounded-[2.5rem]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[12%] -top-[72%] -z-10 h-[175%] w-[62%] rounded-full bg-[radial-gradient(circle,rgba(184,120,223,0.4)_0%,rgba(106,13,173,0.18)_42%,transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[90%] left-[18%] -z-10 h-[150%] w-[58%] rounded-full bg-[radial-gradient(circle,rgba(106,13,173,0.12)_0%,transparent_68%)]"
        />

        <div className="site-container relative grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_1.35fr] lg:gap-20">
          <div>
            <Link
              href="/"
              className="inline-flex rounded-sm text-2xl font-bold tracking-[-0.035em] text-primary sm:text-3xl"
            >
              OPTIZA<span className="text-accent">WORKS</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">
              {t(
                "Sovereign digital solutions for public administrations and businesses, built from Technopark Agadir.",
                "Solutions numériques souveraines pour les administrations publiques et les entreprises, conçues depuis le Technopark d’Agadir.",
              )}
            </p>
          </div>

          <nav
            aria-label={t("Footer navigation", "Navigation du pied de page")}
            className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-x-12"
          >
            {linkColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex flex-col gap-4">
                {column.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="w-fit rounded-sm text-sm font-medium text-neutral-700 transition-colors hover:text-accent"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="relative border-t border-primary/10">
          <div className="site-container grid gap-5 py-5 text-xs text-neutral-500 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <nav
              aria-label={t("Footer information", "Informations du pied de page")}
              className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start"
            >
              {bottomLinks.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-sm transition-colors hover:text-accent"
                >
                  {label}
                </Link>
              ))}
            </nav>

            <p className="text-center">
              &copy; {new Date().getFullYear()} Optizaworks.{" "}
              {t("All rights reserved.", "Tous droits réservés.")}
            </p>

            <div className="flex items-center justify-center gap-2 sm:justify-end">
              {socialLinks.map(({ label, href, icon: Icon }) => {
                const external = href.startsWith("https://");

                return (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/10 bg-white/70 text-primary transition-[transform,background-color,color] hover:-translate-y-0.5 hover:bg-primary hover:text-white"
                  >
                    <Icon size={14} strokeWidth={1.8} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
