import type { Metadata } from "next";
import { getLocale } from "@/backend/i18n/request-locale";
import {
  absoluteSiteUrl,
  getSiteDescription,
  getSiteTitle,
  logoPath,
  siteName,
  siteUrl,
} from "@/shared/seo/site";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = getSiteTitle(locale);
  const description = getSiteDescription(locale);

  return {
    metadataBase: siteUrl,
    title: {
      default: title,
      template: "%s | Optizaworks",
    },
    description,
    icons: {
      icon: logoPath,
      shortcut: logoPath,
      apple: logoPath,
    },
    openGraph: {
      type: "website",
      url: "/",
      siteName,
      title,
      description,
      images: [{ url: logoPath, alt: siteName }],
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [logoPath],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const description = getSiteDescription(locale);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl.origin}/#organization`,
        name: siteName,
        url: siteUrl.origin,
        logo: {
          "@type": "ImageObject",
          url: absoluteSiteUrl(logoPath),
        },
        description,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl.origin}/#website`,
        name: siteName,
        url: siteUrl.origin,
        description,
        inLanguage: locale,
        publisher: { "@id": `${siteUrl.origin}/#organization` },
      },
    ],
  };

  return (
    <html lang={locale}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
