import { Gauge, Headphones, ScanFace, ShieldCheck } from "lucide-react";
import ScrollReveal, { StaggerReveal } from "@/components/ScrollReveal";
import type { Locale } from "@/shared/i18n/config";
import { translate } from "@/shared/i18n/config";

type Reason = {
  label: string;
  labelFr: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  icon: typeof ScanFace;
};

const reasons: Reason[] = [
  {
    label: "Custom solutions",
    labelFr: "Solutions sur mesure",
    title: "Designed around you.",
    titleFr: "Conçues autour de vous.",
    description:
      "Your users, workflows, and goals shape the solution. We never force a project into a recycled template.",
    descriptionFr:
      "Vos utilisateurs, vos processus et vos objectifs façonnent la solution. Nous n’imposons jamais un modèle recyclé à votre projet.",
    icon: ScanFace,
  },
  {
    label: "Fast delivery",
    labelFr: "Livraison rapide",
    title: "Progress without the fog.",
    titleFr: "Avancer en toute clarté.",
    description:
      "Focused build cycles, visible milestones, and direct communication keep every project moving with purpose.",
    descriptionFr:
      "Des cycles ciblés, des jalons visibles et une communication directe permettent à chaque projet d’avancer efficacement.",
    icon: Gauge,
  },
  {
    label: "Security first",
    labelFr: "La sécurité d’abord",
    title: "Protected from the start.",
    titleFr: "Protégé dès le départ.",
    description:
      "Security is built into architecture, development, infrastructure, and release—not added at the end.",
    descriptionFr:
      "La sécurité est intégrée à l’architecture, au développement, à l’infrastructure et à la mise en production, jamais ajoutée à la fin.",
    icon: ShieldCheck,
  },
  {
    label: "Ongoing support",
    labelFr: "Accompagnement continu",
    title: "We stay after launch.",
    titleFr: "Nous restons à vos côtés après le lancement.",
    description:
      "The team that understands your product remains available to monitor, improve, and help it grow.",
    descriptionFr:
      "L’équipe qui connaît votre produit reste disponible pour le superviser, l’améliorer et accompagner son évolution.",
    icon: Headphones,
  },
];

export default function WhyOptizaLab({ locale }: { locale: Locale }) {
  const t = (english: string, french: string) =>
    translate(locale, english, french);

  return (
    <section
      id="why-optiza"
      aria-labelledby="why-heading"
      className="bg-neutral-50 py-16 sm:py-20"
    >
      <div className="site-container">
        <ScrollReveal>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Why OptizaWorks?", "Pourquoi OptizaWorks ?")}
            </p>
            <h2
              id="why-heading"
              className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-primary sm:text-4xl lg:whitespace-nowrap xl:text-5xl"
            >
              {t(
                "Clear thinking, built into every layer.",
                "Une vision claire, intégrée à chaque niveau.",
              )}
            </h2>
          </div>
        </ScrollReveal>

        <StaggerReveal
          className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          itemClassName="h-full"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <article
                key={reason.label}
                className="relative h-full overflow-hidden rounded-2xl border border-primary/10 bg-white p-5 shadow-[0_18px_50px_-42px_rgba(50,16,68,0.45)] sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-primary to-transparent"
                />

                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral text-accent">
                    <Icon size={16} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-primary/30">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-6 text-[9px] font-bold uppercase tracking-[0.15em] text-accent">
                  {t(reason.label, reason.labelFr)}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-primary">
                  {t(reason.title, reason.titleFr)}
                </h3>
                <p className="mt-3 text-xs leading-6 text-neutral-500">
                  {t(reason.description, reason.descriptionFr)}
                </p>
              </article>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
