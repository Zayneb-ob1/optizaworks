import type { Metadata } from "next";
import {
  ArrowRight,
  Eye,
  Focus,
  Handshake,
  MapPin,
  Scale,
  ShieldCheck,
  Target,
} from "lucide-react";
import Link from "next/link";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";
import { createPublicPageMetadata } from "@/shared/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return createPublicPageMetadata({
    title: translate(locale, "About", "À propos"),
    description: translate(
      locale,
      "Meet Optizaworks, a Moroccan technology company building secure, sovereign digital solutions for public institutions and businesses.",
      "Découvrez Optizaworks, une entreprise technologique marocaine qui conçoit des solutions numériques sécurisées et souveraines pour les institutions publiques et les entreprises.",
    ),
    path: "/about",
    locale,
  });
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = (english: string, french: string) =>
    translate(locale, english, french);
  const principles = [
    {
      title: t("Rigor", "Rigueur"),
      description: t(
        "Every deliverable is verified before handover. We document what is actually deployed, not simply what was promised.",
        "Chaque livrable est vérifié avant sa remise. Nous documentons ce qui est réellement déployé, et pas seulement ce qui a été promis.",
      ),
      icon: Scale,
    },
    {
      title: t("Clarity", "Clarté"),
      description: t(
        "We favor a solid, honestly described feature over an exaggerated promise, and clearly identify work still in development.",
        "Nous privilégions une fonctionnalité solide et décrite avec précision plutôt qu’une promesse exagérée, et identifions clairement les travaux encore en développement.",
      ),
      icon: Focus,
    },
    {
      title: t("Proximity", "Proximité"),
      description: t(
        "One accountable contact for each project and direct communication with the technical team, without unnecessary intermediaries.",
        "Un interlocuteur responsable pour chaque projet et une communication directe avec l’équipe technique, sans intermédiaires inutiles.",
      ),
      icon: Handshake,
    },
  ];
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-50 py-24 sm:py-32">
        <div className="pointer-events-none absolute -right-36 -top-52 h-[560px] w-[560px] rounded-full border border-accent/10" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-8 bg-accent/50" />
            {t("About Optizaworks", "À propos d’Optizaworks")}
          </p>
          <h1 className="mt-6 max-w-7xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] text-primary">
            {t(
              "Moroccan technology, built for lasting digital independence.",
              "Une technologie marocaine conçue pour une indépendance numérique durable.",
            )}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-neutral-500">
            {t(
              "We design and operate secure digital solutions for public administrations and businesses, with data sovereignty at the center of every technical decision.",
              "Nous concevons et exploitons des solutions numériques sécurisées pour les administrations publiques et les entreprises, en plaçant la souveraineté des données au cœur de chaque décision technique.",
            )}
          </p>
        </div>
      </section>

      <section className="bg-neutral-100 py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Who we are", "Qui sommes-nous")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-primary">
              {t(
                "Expertise rooted in real institutional needs.",
                "Une expertise ancrée dans les besoins réels des institutions.",
              )}
            </h2>
          </div>
          <div className="space-y-6 text-base leading-8 text-neutral-500">
            <p>
              {t(
                "Based at Technopark Agadir, our team combines technical expertise with a practical understanding of public-sector constraints. We build technology that improves efficiency, transparency, and control over sensitive data.",
                "Installée au Technopark Agadir, notre équipe associe expertise technique et compréhension concrète des contraintes du secteur public. Nous créons des technologies qui améliorent l’efficacité, la transparence et la maîtrise des données sensibles.",
              )}
            </p>
            <p>
              {t(
                "We develop the CONEKE suite, a modular platform designed to progressively cover the management needs of public and private organizations, alongside SecureCode AI for cybersecurity.",
                "Nous développons la gamme CONEKE, une plateforme modulaire conçue pour couvrir progressivement les besoins de gestion des organisations publiques et privées, ainsi que SecureCode AI pour la cybersécurité.",
              )}
            </p>
            <p className="flex items-center gap-2 font-medium text-primary">
              <MapPin size={17} className="text-accent" />
              {t("Technopark Agadir, Morocco", "Technopark Agadir, Maroc")}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-px overflow-hidden rounded-3xl bg-white/15 lg:grid-cols-3">
            {[
              {
                label: t("Mission", "Mission"),
                text: t(
                  "Give public and private organizations the digital tools to improve efficiency, transparency, and control of their data.",
                  "Donner aux organisations publiques et privées les outils numériques nécessaires pour améliorer leur efficacité, leur transparence et la maîtrise de leurs données.",
                ),
                icon: Target,
              },
              {
                label: t("Vision", "Vision"),
                text: t(
                  "Become a reference for sovereign digital transformation across French-speaking Africa.",
                  "Devenir une référence de la transformation numérique souveraine en Afrique francophone.",
                ),
                icon: Eye,
              },
              {
                label: t("Values", "Valeurs"),
                text: t(
                  "Rigor, clarity, and proximity guide every project from initial framing through production.",
                  "La rigueur, la clarté et la proximité guident chaque projet, du cadrage initial à la mise en production.",
                ),
                icon: ShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.label} className="bg-primary-dark p-8 sm:p-10">
                  <Icon size={24} className="text-white/60" strokeWidth={1.6} />
                  <h2 className="mt-8 text-2xl font-semibold">{item.label}</h2>
                  <p className="mt-4 text-sm leading-7 text-white/65">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Our approach", "Notre approche")}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-primary">
              {t(
                "Three principles, applied to every engagement.",
                "Trois principes appliqués à chaque mission.",
              )}
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <article
                  key={principle.title}
                  className="rounded-3xl border border-primary/10 bg-white p-7 sm:p-8"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral text-accent">
                    <Icon size={20} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-7 text-xl font-semibold text-primary">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-neutral-500">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 rounded-4xl bg-neutral-100 px-7 py-12 sm:px-12 lg:grid-cols-[1fr_auto] lg:items-center lg:px-16 lg:py-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t("Data sovereignty", "Souveraineté des données")}
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-primary">
                {t(
                  "Architecture and hosting choices you can understand and control.",
                  "Des choix d’architecture et d’hébergement que vous pouvez comprendre et maîtriser.",
                )}
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-500">
                {t(
                  "We document hosting and architecture decisions for each project in line with applicable Moroccan requirements, including Law 09-08 on personal data protection.",
                  "Nous documentons les décisions d’hébergement et d’architecture de chaque projet conformément aux exigences marocaines applicables, notamment la loi 09-08 relative à la protection des données à caractère personnel.",
                )}
              </p>
            </div>
            <Link
              href="/references"
              className="inline-flex items-center gap-2 justify-self-start rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary"
            >
              {t("See our references", "Découvrir nos références")}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
