import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";
import { createPublicPageMetadata } from "@/shared/seo/site";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return createPublicPageMetadata({
    title: translate(locale, "Contact", "Contact"),
    description: translate(
      locale,
      "Start a conversation with Optizaworks about your next digital project.",
      "Échangez avec Optizaworks au sujet de votre prochain projet numérique.",
    ),
    path: "/contact",
    locale,
  });
}

export default async function ContactPage() {
  const locale = await getLocale();
  const t = (english: string, french: string) =>
    translate(locale, english, french);
  return (
    <>
      <section className="min-h-[calc(100vh-76px)] bg-neutral-50 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {t("Contact", "Contact")}
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em] text-primary sm:text-6xl">
              {t("Let’s build something useful.", "Construisons quelque chose d’utile.")}
            </h1>
            <p className="mt-6 max-w-md text-base leading-8 text-neutral-500">
              {t(
                "Tell us about your goals, your current challenge, or the idea you are ready to move forward.",
                "Parlez-nous de vos objectifs, de votre défi actuel ou de l’idée que vous souhaitez concrétiser.",
              )}
            </p>

            <div className="mt-12 space-y-5">
              <a
                href="mailto:contact@optizaworks.com"
                className="flex items-center gap-4 text-sm text-neutral-700 hover:text-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent">
                  <Mail size={18} />
                </span>
                contact@optizaworks.com
              </a>
              <a
                href="tel:+212697569854"
                className="flex items-center gap-4 text-sm text-neutral-700 hover:text-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent">
                  <Phone size={18} />
                </span>
                +212 697 569 854
              </a>
              <p className="flex items-center gap-4 text-sm text-neutral-700">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-accent">
                  <MapPin size={18} />
                </span>
                {t(
                  "Technopark Agadir, Morocco · Working worldwide",
                  "Technopark Agadir, Maroc · Intervention dans le monde entier",
                )}
              </p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <WhatsAppButton />
    </>
  );
}
