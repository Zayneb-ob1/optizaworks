import Link from "next/link";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";

export default async function NotFound() {
  const locale = await getLocale();
  const t = (english: string, french: string) => translate(locale, english, french);

  return (
    <main className="flex min-h-[70vh] items-center bg-neutral-50 py-20">
      <div className="mx-auto max-w-xl px-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">404</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-primary">
          {t("This page could not be found.", "Cette page est introuvable.")}
        </h1>
        <p className="mt-4 text-sm leading-7 text-neutral-500">
          {t(
            "The page may have moved, or the address may be incomplete.",
            "La page a peut-être été déplacée ou son adresse est incomplète.",
          )}
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white"
        >
          {t("Return home", "Retour à l’accueil")}
        </Link>
      </div>
    </main>
  );
}
