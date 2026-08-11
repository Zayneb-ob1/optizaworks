import type { Metadata } from "next";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  FolderKanban,
  PenTool,
  ShieldCheck,
} from "lucide-react";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";
import { createPublicPageMetadata } from "@/shared/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return createPublicPageMetadata({
    title: translate(locale, "Careers", "Carrières"),
    description: translate(
      locale,
      "Join Optizaworks and work on rigorous technology projects with public and private impact.",
      "Rejoignez Optizaworks et contribuez à des projets technologiques rigoureux au service des secteurs public et privé.",
    ),
    path: "/careers",
    locale,
  });
}

export default async function CareersPage() {
  const locale = await getLocale();
  const t = (english: string, french: string) =>
    translate(locale, english, french);
  const disciplines = [
    { label: t("Development", "Développement"), icon: Code2 },
    { label: t("Data & AI", "Data & IA"), icon: BrainCircuit },
    { label: t("UX design", "Design UX"), icon: PenTool },
    { label: t("Project management", "Gestion de projet"), icon: FolderKanban },
    { label: t("Cybersecurity", "Cybersécurité"), icon: ShieldCheck },
  ];
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-50 py-24 sm:py-32">
        <div className="pointer-events-none absolute -right-36 -top-52 h-[560px] w-[560px] rounded-full border border-accent/10" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-8 bg-accent/50" />
            {t("Careers", "Carrières")}
          </p>
          <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-primary sm:text-6xl lg:text-7xl">
            {t(
              "Build tomorrow’s team with us.",
              "Construisez avec nous l’équipe de demain.",
            )}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-neutral-500">
            {t(
              "We value rigorous, engaged people who want to contribute to meaningful public and private-sector technology projects.",
              "Nous recherchons des personnes rigoureuses et engagées qui souhaitent contribuer à des projets technologiques utiles aux secteurs public et privé.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Our culture", "Notre culture")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-primary sm:text-5xl">
              {t(
                "Responsibility, proximity, and useful work.",
                "Responsabilité, proximité et travail utile.",
              )}
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-neutral-500">
              {t(
                "We do not have an open position at the moment, but we are always interested in people who share our standards and our enthusiasm for high-impact work. Every project has one accountable lead and direct collaboration between disciplines.",
                "Nous n’avons aucun poste ouvert pour le moment, mais nous sommes toujours intéressés par les personnes qui partagent nos exigences et notre enthousiasme pour les projets à fort impact. Chaque projet dispose d’un responsable identifié et favorise une collaboration directe entre les disciplines.",
              )}
            </p>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              {disciplines.map((discipline) => {
                const Icon = discipline.icon;
                return (
                  <div
                    key={discipline.label}
                    className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-neutral-50 px-4 py-4 text-sm font-medium text-primary"
                  >
                    <Icon size={18} className="text-accent" strokeWidth={1.7} />
                    {discipline.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              {t("Spontaneous application", "Candidature spontanée")}
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {t(
                "Your profile may fit our next project.",
                "Votre profil pourrait correspondre à notre prochain projet.",
              )}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/65">
              {t(
                "Even without a published opening, you can send us your profile. We keep relevant applications in mind for future recruitment.",
                "Même sans offre publiée, vous pouvez nous envoyer votre profil. Nous conservons les candidatures pertinentes pour nos futurs recrutements.",
              )}
            </p>
          </div>
          <a
            href={`mailto:contact@optizaworks.com?subject=${encodeURIComponent(
              t("Spontaneous application", "Candidature spontanée"),
            )}`}
            className="inline-flex items-center gap-2 justify-self-start rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-white"
          >
            {t("Send your application", "Envoyer votre candidature")}
            <ArrowRight size={17} />
          </a>
        </div>
      </section>
    </>
  );
}
