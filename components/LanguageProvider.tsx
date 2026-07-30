"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { translate, type Locale } from "@/shared/i18n/config";

type LanguageContextValue = {
  locale: Locale;
  pending: boolean;
  changeLocale: (locale: Locale) => void;
  t: (english: string, french: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocale] = useState(initialLocale);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setLocale(initialLocale);
  }, [initialLocale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const changeLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale || pending) return;
      startTransition(async () => {
        const response = await fetch("/api/locale", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ locale: nextLocale }),
        });
        if (!response.ok) return;
        setLocale(nextLocale);
        router.refresh();
      });
    },
    [locale, pending, router],
  );

  const t = useCallback(
    (english: string, french: string) => translate(locale, english, french),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, pending, changeLocale, t }),
    [changeLocale, locale, pending, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider.");
  return context;
}
