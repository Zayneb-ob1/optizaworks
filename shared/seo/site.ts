import type { Metadata } from "next";
import { translate, type Locale } from "@/shared/i18n/config";

export const siteName = "Optizaworks";
export const siteUrl = new URL("https://optizaworks.com");
export const logoPath = "/logo-removebg-preview.png";

export function absoluteSiteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function getSiteTitle(locale: Locale) {
  return translate(
    locale,
    "Optizaworks — Sovereign digital solutions",
    "Optizaworks — Solutions numériques souveraines",
  );
}

export function getSiteDescription(locale: Locale) {
  return translate(
    locale,
    "Optizaworks is a Moroccan technology company building secure digital products, infrastructure, and sovereign software for public institutions and businesses.",
    "Optizaworks est une entreprise technologique marocaine qui conçoit des produits numériques sécurisés, des infrastructures et des logiciels souverains pour les institutions publiques et les entreprises.",
  );
}

export function createPublicPageMetadata({
  title,
  description,
  path,
  locale,
  image = logoPath,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName,
      title,
      description,
      images: [{ url: image, alt: title }],
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [image],
    },
  };
}
