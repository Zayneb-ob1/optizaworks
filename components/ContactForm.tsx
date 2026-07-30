"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Mail,
  MessageSquareText,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import type { ContactApiResponse } from "@/shared/contact/contract";

const errorMessages: Record<string, [string, string]> = {
  NAME_REQUIRED: ["Please enter your name.", "Veuillez saisir votre nom."],
  VALIDATION_NAME: ["Please enter your name.", "Veuillez saisir votre nom."],
  EMAIL_INVALID: [
    "Please enter a valid email address.",
    "Veuillez saisir une adresse e-mail valide.",
  ],
  VALIDATION_EMAIL: [
    "Please enter a valid email address.",
    "Veuillez saisir une adresse e-mail valide.",
  ],
  MESSAGE_TOO_SHORT: [
    "Please enter a message of at least 3 characters.",
    "Veuillez saisir un message d’au moins 3 caractères.",
  ],
  VALIDATION_MESSAGE: [
    "Please enter a message of at least 3 characters.",
    "Veuillez saisir un message d’au moins 3 caractères.",
  ],
  FORM_INVALID: [
    "Please check the form and try again.",
    "Veuillez vérifier le formulaire et réessayer.",
  ],
  REQUEST_TOO_LARGE: [
    "Request is too large.",
    "La requête est trop volumineuse.",
  ],
  INVALID_REQUEST: ["Invalid request.", "Requête invalide."],
  RATE_LIMITED: [
    "Too many messages. Please try again later.",
    "Trop de messages ont été envoyés. Veuillez réessayer plus tard.",
  ],
  SERVER_ERROR: [
    "We could not send your message. Please try again.",
    "Nous n’avons pas pu envoyer votre message. Veuillez réessayer.",
  ],
};

const frenchForEnglishError = new Map(
  Object.values(errorMessages).map(([english, french]) => [english, french]),
);

export default function ContactForm() {
  const { locale, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
          locale,
        }),
      });
      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok && !result.ok) {
        const possibleCode = result.code;
        const stableMessage = possibleCode ? errorMessages[possibleCode] : undefined;
        if (stableMessage) {
          setError(t(...stableMessage));
        } else if (locale === "fr" && result.error) {
          setError(frenchForEnglishError.get(result.error) ?? result.error);
        } else {
          setError(
            result.error ??
              t(
                "We could not send your message. Please try again.",
                "Nous n’avons pas pu envoyer votre message. Veuillez réessayer.",
              ),
          );
        }
        return;
      }

      form.reset();
      setSubmitted(true);
    } catch {
      setError(
        t(
          "We could not send your message. Please check your connection.",
          "Nous n’avons pas pu envoyer votre message. Vérifiez votre connexion.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="relative flex min-h-[520px] flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-primary/10 bg-white p-8 text-center shadow-soft"
        role="status"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
          <CheckCircle2 size={32} strokeWidth={1.7} />
        </span>
        <h2 className="mt-5 text-2xl font-semibold text-primary">
          {t("Thanks for reaching out.", "Merci de nous avoir contactés.")}
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
          {t(
            "Your message is safely in our inbox. We will get back to you shortly.",
            "Votre message est bien arrivé dans notre boîte de réception. Nous vous répondrons prochainement.",
          )}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-7 rounded-full border border-primary/10 bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:border-accent/30 hover:text-accent"
        >
          {t("Send another message", "Envoyer un autre message")}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-white shadow-[0_30px_80px_-50px_rgba(50,16,68,0.45)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          {t("Website", "Site web")}
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="relative overflow-hidden bg-primary-dark px-6 py-7 text-white sm:px-9 sm:py-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-52 w-52 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-8 -top-14 h-36 w-36 rounded-full border border-accent/30" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
              {t("Project enquiry", "Demande de projet")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em]">
              {t("Tell us what you're building.", "Parlez-nous de ce que vous construisez.")}
            </h2>
          </div>
          <span className="inline-flex self-start items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-2 text-[11px] font-medium text-white/70 sm:self-auto">
            <Clock3 size={13} aria-hidden="true" />
            {t(
              "Usually replies within 1 business day",
              "Réponse habituelle sous un jour ouvré",
            )}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-9">
        <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-primary">
            {t("Name", "Nom")}
          </span>
          <span className="relative block">
            <UserRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={17} strokeWidth={1.7} aria-hidden="true" />
            <input
              type="text"
              name="name"
              required
              minLength={1}
              maxLength={120}
              autoComplete="name"
              placeholder={t("Your name", "Votre nom")}
              className="w-full rounded-2xl border border-primary/10 bg-neutral-50 py-3.5 pl-11 pr-4 text-sm text-primary outline-none transition focus:border-accent/50 focus:bg-white focus:ring-2 focus:ring-accent/10"
            />
          </span>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-primary">Email</span>
          <span className="relative block">
            <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={17} strokeWidth={1.7} aria-hidden="true" />
            <input
              type="email"
              name="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="you@company.com"
              className="w-full rounded-2xl border border-primary/10 bg-neutral-50 py-3.5 pl-11 pr-4 text-sm text-primary outline-none transition focus:border-accent/50 focus:bg-white focus:ring-2 focus:ring-accent/10"
            />
          </span>
        </label>
        </div>
      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-primary">Message</span>
        <span className="relative block">
          <MessageSquareText className="pointer-events-none absolute left-4 top-4 text-neutral-500" size={17} strokeWidth={1.7} aria-hidden="true" />
          <textarea
            name="message"
            required
            minLength={3}
            maxLength={5000}
            rows={7}
            placeholder={t(
              "Tell us about your goals, scope, and ideal timeline.",
              "Décrivez vos objectifs, le périmètre et le calendrier idéal.",
            )}
            className="w-full resize-y rounded-2xl border border-primary/10 bg-neutral-50 py-3.5 pl-11 pr-4 text-sm leading-6 text-primary outline-none transition focus:border-accent/50 focus:bg-white focus:ring-2 focus:ring-accent/10"
          />
        </span>
      </label>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs leading-5 text-neutral-500">
            <ShieldCheck size={15} className="shrink-0 text-accent" aria-hidden="true" />
            {t(
              "Your details stay private and are used only to answer this enquiry.",
              "Vos informations restent confidentielles et servent uniquement à répondre à cette demande.",
            )}
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-primary disabled:cursor-wait disabled:opacity-60"
          >
            {submitting
              ? t("Sending…", "Envoi…")
              : t("Send enquiry", "Envoyer la demande")}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
        {error && (
          <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert" aria-live="polite">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
