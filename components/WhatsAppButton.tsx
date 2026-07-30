"use client";

import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

type WhatsAppButtonProps = {
  phone?: string;
};

export default function WhatsAppButton({
  phone = "212697569854",
}: WhatsAppButtonProps) {
  const { t } = useLanguage();

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(
        t(
          "Hello Optizaworks, I would like to discuss a project.",
          "Bonjour Optizaworks, je souhaite discuter d’un projet.",
        ),
      )}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t(
        "Chat with Optizaworks on WhatsApp",
        "Discuter avec Optizaworks sur WhatsApp",
      )}
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-soft transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-4"
    >
      <MessageCircle size={23} />
    </a>
  );
}
