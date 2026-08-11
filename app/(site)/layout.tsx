import Footer from "@/components/Footer";
import LanguageProvider from "@/components/LanguageProvider";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { getPublishedProjects, getPublishedServices } from "@/backend/content/queries";
import { getLocale } from "@/backend/i18n/request-locale";
import { translate } from "@/shared/i18n/config";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const services = getPublishedServices(locale);
  const projects = getPublishedProjects({ featuredOnly: true, limit: 3, locale });
  const navigationServices = services.map(({ slug, title, description, icon }) => ({
    slug,
    title,
    description,
    icon,
  }));
  const navigationProjects = projects.map(({ slug, title, categoryLabel, image }) => ({
    slug,
    title,
    categoryLabel,
    image,
  }));

  return (
    <LanguageProvider initialLocale={locale}>
      <MotionProvider>
        <a
          href="#main-content"
          className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-soft transition-transform focus:translate-y-0"
        >
          {translate(locale, "Skip to main content", "Aller au contenu principal")}
        </a>
        <SmoothScroll />
        <Navbar services={navigationServices} projects={navigationProjects} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
      </MotionProvider>
    </LanguageProvider>
  );
}
