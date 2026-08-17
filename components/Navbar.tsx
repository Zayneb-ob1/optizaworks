"use client";

import { AnimatePresence, m } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Menu,
  Rocket,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { serviceIcons } from "@/components/services/service-icons";
import type { Service } from "@/shared/content/services";

type MenuName = "services" | null;

function BrandLogo({ inverted }: { inverted: boolean }) {
  return (
    <span className="relative block h-12 w-[214px] overflow-hidden sm:w-[220px]">
      <Image
        src="/logo-removebg-preview.png"
        alt="Optizaworks"
        width={240}
        height={240}
        priority
        quality={75}
        sizes="(max-width: 640px) 214px, 220px"
        className={`absolute -left-1 top-1/2 max-w-none -translate-y-1/2 transition-[filter] duration-300 ${
          inverted
            ? "brightness-0 invert drop-shadow-[0_3px_12px_rgba(255,255,255,0.16)]"
            : ""
        }`}
      />
    </span>
  );
}

type NavbarProps = {
  services: Pick<Service, "slug" | "title" | "description" | "icon">[];
};

export default function Navbar({ services }: NavbarProps) {
  const pathname = usePathname();
  const { locale, pending, changeLocale, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuName>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let frame = 0;
    const solidTrigger =
      pathname === "/"
        ? document.getElementById("services")
        : null;
    let solidTriggerTop = solidTrigger?.offsetTop ?? 0;
    let lastScrolled: boolean | undefined;
    const commitScrolled = (nextScrolled: boolean) => {
      if (lastScrolled === nextScrolled) return;
      lastScrolled = nextScrolled;
      setScrolled(nextScrolled);
    };
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (pathname === "/" && solidTrigger) {
          const navbarOffset = 88;
          const scrollPosition = window.scrollY + navbarOffset;
          commitScrolled(scrollPosition >= solidTriggerTop);
          return;
        }

        commitScrolled(window.scrollY > 40);
      });
    };
    const handleResize = () => {
      solidTriggerTop = solidTrigger?.offsetTop ?? 0;
      update();
    };
    const resizeObserver = solidTrigger ? new ResizeObserver(handleResize) : null;
    if (solidTrigger) {
      resizeObserver?.observe(solidTrigger);
      const precedingSection = solidTrigger.previousElementSibling;
      if (precedingSection instanceof HTMLElement) {
        resizeObserver?.observe(precedingSection);
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  function openMenu(menu: Exclude<MenuName, null>) {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setActiveMenu(menu);
  }

  function scheduleClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
  }

  function closeAll() {
    setMobileOpen(false);
    setActiveMenu(null);
  }

  const hasDarkHero =
    pathname === "/" || pathname === "/news" || pathname === "/references";
  const solid = !hasDarkHero || scrolled || mobileOpen || activeMenu !== null;
  const navLinkClass = (active: boolean) =>
    `relative flex items-center gap-1 rounded-full px-[18px] py-2 text-[15px] font-medium transition-colors ${
      solid
        ? active
          ? "text-accent"
          : "text-neutral-700 hover:text-accent"
        : active
          ? "text-white"
          : "text-white/85 hover:text-white"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? "border-b border-white/40 bg-white/70 shadow-[0_8px_32px_-12px_rgba(31,9,44,0.25)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link
          href="/"
          aria-label={t("Optizaworks home", "Accueil Optizaworks")}
          onClick={closeAll}
          className="rounded-xl px-1 py-1.5"
        >
          <BrandLogo inverted={!solid} />
        </Link>

        <div className="hidden items-center gap-2 xl:flex">
          <nav
            className={`flex items-center gap-1.5 rounded-full px-1.5 py-1 transition-colors duration-300 ${
              solid
                ? "bg-transparent"
                : "bg-primary-dark/50 ring-1 ring-white/15 backdrop-blur-md"
            }`}
            aria-label={t("Primary navigation", "Navigation principale")}
          >
            <div
              onMouseEnter={() => openMenu("services")}
              onMouseLeave={scheduleClose}
              onFocus={() => openMenu("services")}
            >
              <Link
                href="/services"
                className={navLinkClass(pathname.startsWith("/services"))}
                aria-expanded={activeMenu === "services"}
                aria-haspopup="true"
                aria-controls="services-menu"
              >
                Services
                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    activeMenu === "services" ? "rotate-180" : ""
                  }`}
                />
                {pathname.startsWith("/services") && (
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full ${
                      solid ? "bg-accent" : "bg-white"
                    }`}
                  />
                )}
              </Link>
            </div>

            <Link href="/references" className={navLinkClass(pathname === "/references")} aria-current={pathname === "/references" ? "page" : undefined}>
              {t("References", "Références")}
              {pathname === "/references" && (
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full ${
                    solid ? "bg-accent" : "bg-white"
                  }`}
                />
              )}
            </Link>

            <Link href="/products" className={navLinkClass(pathname === "/products")} aria-current={pathname === "/products" ? "page" : undefined}>
              {t("Products", "Produits")}
              {pathname === "/products" && (
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full ${
                    solid ? "bg-accent" : "bg-white"
                  }`}
                />
              )}
            </Link>

            <Link href="/about" className={navLinkClass(pathname === "/about")} aria-current={pathname === "/about" ? "page" : undefined}>
              {t("About", "À propos")}
              {pathname === "/about" && (
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full ${
                    solid ? "bg-accent" : "bg-white"
                  }`}
                />
              )}
            </Link>

            <Link href="/contact" className={navLinkClass(pathname === "/contact")} aria-current={pathname === "/contact" ? "page" : undefined}>
              Contact
              {pathname === "/contact" && (
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full ${
                    solid ? "bg-accent" : "bg-white"
                  }`}
                />
              )}
            </Link>
          </nav>

          <div
            className={`ml-1 hidden items-center gap-1 rounded-full px-2 py-1 transition-colors duration-300 xl:flex ${
              solid
                ? "bg-transparent"
                : "bg-primary-dark/50 ring-1 ring-white/15 backdrop-blur-md"
            }`}
            aria-label={t("Language", "Langue")}
          >
            <button
              type="button"
              onClick={() => changeLocale("en")}
              disabled={pending}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 ${
                locale === "en"
                  ? solid
                    ? "bg-primary-dark text-white"
                    : "bg-white text-primary"
                  : solid
                    ? "text-neutral-500 hover:text-primary"
                    : "text-white/70 hover:text-white"
              }`}
              aria-label={t("Switch to English", "Passer en anglais")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => changeLocale("fr")}
              disabled={pending}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold transition-colors disabled:cursor-wait disabled:opacity-60 ${
                locale === "fr"
                  ? solid
                    ? "bg-primary-dark text-white"
                    : "bg-white text-primary"
                  : solid
                    ? "text-neutral-500 hover:text-primary"
                    : "text-white/70 hover:text-white"
              }`}
              aria-label={t("Switch to French", "Passer en français")}
              aria-pressed={locale === "fr"}
            >
              FR
            </button>
            <Link
              href="/news"
              onClick={closeAll}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                solid ? "text-neutral-700 hover:bg-black/5" : "text-white/80 hover:bg-white/10"
              }`}
              aria-label={t("Search", "Rechercher")}
            >
              <Search size={15} />
            </Link>
          </div>
          <Link
            href="/contact"
            className="ml-1 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-[transform,background-color,box-shadow] hover:-translate-y-0.5 hover:bg-primary hover:shadow-md"
          >
            {t("Start a project", "Démarrer un projet")}
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors xl:hidden ${
            solid
              ? "text-primary hover:bg-black/5"
              : "bg-white/15 text-white backdrop-blur-sm"
          }`}
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={
            mobileOpen
              ? t("Close navigation", "Fermer la navigation")
              : t("Open navigation", "Ouvrir la navigation")
          }
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {activeMenu === "services" && (
          <m.div
            id="services-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-x-0 top-full hidden px-4 xl:block"
            onMouseEnter={() => openMenu("services")}
            onMouseLeave={scheduleClose}
          >
            <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-[0_28px_70px_-20px_rgba(31,9,44,0.45)] ring-1 ring-black/5">
              <div className="grid grid-cols-[1.55fr_0.65fr] gap-9 p-7 lg:p-8">
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service) => {
                    const Icon = serviceIcons[service.icon];
                    return (
                      <Link
                        key={service.slug}
                        href={`/services#${service.slug}`}
                        onClick={closeAll}
                        className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-neutral-100"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                          <Icon size={18} strokeWidth={1.8} />
                        </span>
                        <span className="min-w-0">
                          <strong className="block text-sm font-semibold text-primary">
                            {service.title}
                          </strong>
                          <small className="mt-0.5 block truncate text-xs text-neutral-500">
                            {service.description}
                          </small>
                        </span>
                        <ArrowRight
                          size={15}
                          className="ml-auto shrink-0 -translate-x-1 text-accent opacity-0 transition-[transform,opacity] group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </Link>
                    );
                  })}
                </div>
                <aside className="relative overflow-hidden rounded-2xl bg-primary-dark p-7 text-white">
                  <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />
                  <Rocket size={24} className="relative text-white/70" />
                  <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    {t("Start with clarity", "Commencez avec clarté")}
                  </p>
                  <h2 className="relative mt-3 text-xl font-semibold leading-snug">
                    {t(
                      "From first brief to a practical delivery plan.",
                      "Du premier brief à un plan de réalisation concret.",
                    )}
                  </h2>
                  <p className="relative mt-3 text-xs leading-6 text-white/60">
                    {t(
                      "Share the goal and constraints. We will shape the right technical path.",
                      "Partagez votre objectif et vos contraintes. Nous définirons la bonne approche technique.",
                    )}
                  </p>
                  <Link
                    href="/contact"
                    onClick={closeAll}
                    className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-primary"
                  >
                    {t("Discuss your project", "Parlons de votre projet")}
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/products"
                    onClick={closeAll}
                    className="relative mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-white"
                  >
                    {t("Explore CONEKE products", "Découvrir les produits CONEKE")}
                    <ArrowRight size={14} />
                  </Link>
                </aside>
              </div>
              <div className="flex items-center justify-between border-t border-primary/10 bg-neutral-50 px-8 py-4 text-xs">
                <span className="flex items-center gap-2 text-neutral-500">
                  <ShieldCheck size={14} className="text-accent" />
                  {t(
                    "Strategy, design, engineering, infrastructure, and support",
                    "Stratégie, design, ingénierie, infrastructure et support",
                  )}
                </span>
                <Link
                  href="/services"
                  onClick={closeAll}
                  className="flex items-center gap-2 font-semibold text-primary hover:text-accent"
                >
                  {t("View all services", "Voir tous les services")}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <m.nav
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/40 bg-white/85 backdrop-blur-xl xl:hidden"
            aria-label={t("Mobile navigation", "Navigation mobile")}
          >
            <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/services"
                  onClick={closeAll}
                  className="rounded-xl bg-neutral-50 px-4 py-3 text-sm font-semibold text-primary"
                >
                  Services
                </Link>
                <Link
                  href="/references"
                  onClick={closeAll}
                  className="rounded-xl bg-neutral-50 px-4 py-3 text-sm font-semibold text-primary"
                >
                  {t("References", "Références")}
                </Link>
                <Link
                  href="/products"
                  onClick={closeAll}
                  className="rounded-xl bg-neutral-50 px-4 py-3 text-sm font-semibold text-primary"
                >
                  {t("Products", "Produits")}
                </Link>
                <Link
                  href="/about"
                  onClick={closeAll}
                  className="rounded-xl bg-neutral-50 px-4 py-3 text-sm font-semibold text-primary"
                >
                  {t("About", "À propos")}
                </Link>
                <Link
                  href="/contact"
                  onClick={closeAll}
                  className="rounded-xl bg-neutral-50 px-4 py-3 text-sm font-semibold text-primary"
                >
                  Contact
                </Link>
              </div>
              <div
                className="mt-4 flex items-center justify-between rounded-2xl border border-primary/10 bg-neutral-50 px-4 py-3"
                aria-label={t("Language", "Langue")}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {t("Language", "Langue")}
                </span>
                <div className="flex items-center gap-1 rounded-full bg-white p-1 shadow-sm">
                  {(["en", "fr"] as const).map((language) => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => changeLocale(language)}
                      disabled={pending}
                      aria-pressed={locale === language}
                      aria-label={
                        language === "en"
                          ? t("Switch to English", "Passer en anglais")
                          : t("Switch to French", "Passer en français")
                      }
                      className={`flex h-8 min-w-10 items-center justify-center rounded-full px-2 text-[11px] font-semibold uppercase transition-colors disabled:cursor-wait disabled:opacity-60 ${
                        locale === language
                          ? "bg-primary-dark text-white"
                          : "text-neutral-500 hover:text-primary"
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Services
                </p>
                <Link
                  href="/services"
                  onClick={closeAll}
                  className="text-xs font-semibold text-primary"
                >
                  {t("View all", "Voir tout")}
                </Link>
              </div>
              <div className="mt-3 grid gap-1 sm:grid-cols-2">
                {services.map((service) => {
                  const Icon = serviceIcons[service.icon];
                  return (
                    <Link
                      key={service.slug}
                      href={`/services#${service.slug}`}
                      onClick={closeAll}
                      className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-neutral-700 hover:bg-neutral"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral text-accent">
                        <Icon size={16} />
                      </span>
                      {service.title}
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/contact"
                onClick={closeAll}
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white"
              >
                {t("Start a project", "Démarrer un projet")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
