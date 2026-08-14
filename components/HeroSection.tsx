import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { translate } from "@/shared/i18n/config";

type HeroSectionProps = {
  backdrop: React.ReactNode;
  locale: Locale;
};

function HeroDevice({ locale }: { locale: Locale }) {
  const t = (english: string, french: string) =>
    translate(locale, english, french);

  return (
    <div className="hero-device-enter relative mx-auto aspect-[3/2] w-[min(41rem,98vw)] lg:mx-0 lg:w-[min(52vw,48rem)]" aria-hidden="true">
      <div className="hero-device-float relative h-full w-full">
        <div className="pointer-events-none absolute left-[22.5%] top-[10.5%] h-[49%] w-[49%] rounded-[5%] bg-primary-dark/15 shadow-[0_28px_58px_-22px_rgba(31,9,44,0.55)]" />
        <Image
          src="/hero/hand-pc.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          quality={82}
          sizes="(max-width: 767px) 98vw, (max-width: 1279px) 66vw, 768px"
          className="pointer-events-none select-none object-contain"
        />

        <div className="absolute left-[24%] top-[11.9%] h-[45.5%] w-[46.3%] overflow-hidden rounded-[2.8%] bg-[#050207] ring-1 ring-white/[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(106,13,173,0.30),transparent_42%),linear-gradient(135deg,#050207,#0d0512)]" />
          <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle,rgba(255,255,255,0.55)_0.45px,transparent_0.6px)] [background-size:13px_13px]" />

          <div className="hero-screen-cosmos pointer-events-none absolute right-[6%] top-[18%] z-10 w-[22%]">
            <svg viewBox="0 0 96 76" className="h-auto w-full overflow-visible" fill="none">
              <defs>
                <radialGradient id="hero-screen-earth" cx="0" cy="0" r="1" gradientTransform="translate(43 30) rotate(48) scale(35)">
                  <stop stopColor="#7dd3fc" />
                  <stop offset="0.46" stopColor="#6A0DAD" />
                  <stop offset="1" stopColor="#1F092C" />
                </radialGradient>
              </defs>

              <circle cx="12" cy="15" r="1.4" fill="#ffffff" opacity="0.8" />
              <circle cx="82" cy="12" r="1" fill="#7dd3fc" opacity="0.9" />
              <circle cx="88" cy="47" r="1.5" fill="#b878df" opacity="0.8" />
              <circle cx="18" cy="62" r="1" fill="#7dd3fc" opacity="0.75" />
              <circle cx="72" cy="67" r="0.8" fill="#ffffff" opacity="0.7" />
              <path d="M26 8 V13 M23.5 10.5 H28.5" stroke="#b878df" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M79 27 V31 M77 29 H81" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />

              <ellipse cx="50" cy="40" rx="32" ry="9" stroke="#7dd3fc" strokeWidth="1" opacity="0.3" transform="rotate(-12 50 40)" />
              <circle cx="50" cy="40" r="21" fill="url(#hero-screen-earth)" stroke="#b878df" strokeWidth="1.4" />
              <ellipse cx="50" cy="40" rx="9" ry="20" stroke="#ffffff" strokeWidth="0.8" opacity="0.2" />
              <path d="M30 39 H70 M34 30 C43 34 57 34 66 30 M34 50 C43 46 57 46 66 50" stroke="#ffffff" strokeWidth="0.75" opacity="0.18" />
              <path d="M38 25 L45 23 L49 28 L47 33 L41 34 L38 30 Z" fill="#c89ae5" opacity="0.72" />
              <path d="M54 35 L62 33 L67 38 L63 42 L65 48 L58 55 L53 50 L55 44 L51 40 Z" fill="#9f67c8" opacity="0.78" />
              <path d="M34 43 L40 40 L45 44 L43 50 L37 52 L33 48 Z" fill="#67e8f9" opacity="0.48" />
              <path d="M37 25 C31 34 32 48 40 56" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.28" />
            </svg>
          </div>

          <div className="relative flex h-full flex-col px-[5%] py-[4.5%]">
            <div className="flex items-center justify-between">
              <div className="relative h-[clamp(8px,1.05vw,15px)] w-[clamp(38px,5.2vw,75px)] overflow-hidden">
                <Image
                  src="/logo-removebg-preview.png"
                  alt=""
                  fill
                  sizes="75px"
                  quality={75}
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
              <div className="flex items-center gap-[clamp(4px,0.6vw,9px)]">
                <span className="h-px w-[clamp(8px,1.3vw,18px)] bg-white/25" />
                <span className="h-px w-[clamp(8px,1.3vw,18px)] bg-white/25" />
                <span className="h-px w-[clamp(8px,1.3vw,18px)] bg-white/25" />
                <span className="rounded-full bg-accent px-[clamp(3px,0.45vw,7px)] py-[clamp(1px,0.18vw,3px)] text-[clamp(2px,0.25vw,4px)] font-semibold text-white">
                  {t("Contact", "Contact")}
                </span>
              </div>
            </div>

            <div className="my-auto max-w-[68%] text-left">
              <span className="block text-[clamp(2px,0.28vw,4px)] font-semibold uppercase tracking-[0.16em] text-white/45">
                {t("Digital engineering", "Ingénierie numérique")}
              </span>
              <span className="mt-[clamp(4px,0.65vw,10px)] block text-[clamp(7px,0.95vw,14px)] font-semibold leading-[1.04] tracking-[-0.04em] text-white">
                {t("Make your idea", "Donnez vie à votre idée")} {" "}
                <span className="text-[#b878df]">{t("with us.", "avec nous.")}</span>
              </span>
              <span className="mt-[clamp(3px,0.45vw,7px)] block text-[clamp(2px,0.26vw,4px)] leading-relaxed text-white/38">
                {t(
                  "Secure websites, software and infrastructure.",
                  "Sites, logiciels et infrastructures sécurisés.",
                )}
              </span>
              <span className="mt-[clamp(4px,0.7vw,10px)] inline-flex rounded-full bg-accent px-[clamp(4px,0.65vw,10px)] py-[clamp(2px,0.28vw,4px)] text-[clamp(2px,0.27vw,4px)] font-semibold text-white">
                {t("Explore our work", "Nos réalisations")}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-px w-[18%] bg-accent/70" />
              <span className="text-[clamp(2px,0.22vw,3px)] uppercase tracking-[0.16em] text-white/25">
                OptizaWorks
              </span>
            </div>
          </div>
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,transparent_18%,rgba(255,255,255,0.10)_37%,transparent_56%)] opacity-70" />
        </div>
      </div>
    </div>
  );
}

export default function HeroSection({ backdrop, locale }: HeroSectionProps) {
  const t = (english: string, french: string) =>
    translate(locale, english, french);

  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-[#03040b] text-white sm:min-h-[840px] lg:min-h-[620px] xl:min-h-[640px]">
      <div className="relative min-h-[720px] w-full overflow-hidden bg-[#03040b] sm:min-h-[840px] lg:min-h-[620px] xl:min-h-[640px]">
        {backdrop}

        <div
          aria-hidden="true"
          className="hero-ambient-glow pointer-events-none absolute -right-[12%] -top-[28%] h-[72%] w-[78%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(184,120,223,0.18)_0%,rgba(106,13,173,0.18)_31%,rgba(50,16,68,0.07)_52%,transparent_72%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[28%] -left-[18%] h-[58%] w-[55%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(106,13,173,0.18),rgba(50,16,68,0.08)_42%,transparent_72%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.11] [background-image:radial-gradient(circle,rgba(255,255,255,0.42)_0.7px,transparent_0.8px)] [background-size:30px_30px] [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_82%,transparent)]"
        />

        <div className="relative z-10 mx-auto grid min-h-[720px] max-w-7xl grid-rows-[auto_1fr] items-start px-5 pb-20 pt-24 sm:min-h-[840px] sm:px-8 sm:pb-20 sm:pt-28 lg:min-h-[620px] lg:grid-cols-[0.88fr_1.12fr] lg:grid-rows-1 lg:px-10 lg:pb-16 lg:pt-24 xl:min-h-[640px]">
          <div className="relative z-20 max-w-2xl text-center lg:self-center lg:text-left">
            <h1 className="text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[4.1rem] lg:text-[4.45rem] xl:text-[4.8rem]">
              {t("Engineering at the edge of", "L’ingénierie aux frontières du")} {" "}
              <span className="bg-gradient-to-r from-white via-[#cbb5dc] to-[#8f52bd] bg-clip-text text-transparent">
                {t("possible.", "possible.")}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-[13px] leading-6 text-white/60 sm:text-sm sm:leading-7 lg:mx-0">
              {t(
                "OptizaWorks builds secure websites, software, AI systems, and digital infrastructure that give ambitious organizations their own technological gravity.",
                "OptizaWorks conçoit des sites web, des logiciels, des systèmes d’IA et des infrastructures numériques sécurisés qui donnent aux organisations ambitieuses leur propre force technologique.",
              )}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 lg:items-start">
              <Link
                href="/portfolio"
                className="group inline-flex min-h-12 items-center gap-3.5 rounded-full border border-white/25 bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_38px_rgba(106,13,173,0.48)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#7d20ba] hover:shadow-[0_18px_44px_rgba(106,13,173,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#03040b] sm:px-8 sm:text-[15px]"
              >
                {t("Explore our work", "Découvrir nos réalisations")}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-accent">
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
              <span className="font-mono text-[8px] uppercase leading-5 tracking-[0.14em] text-white/35">
                {t("Strategy / Design", "Stratégie / Design")}
                <span className="mx-2 text-white/15">•</span>
                {t("Engineering / Infrastructure", "Ingénierie / Infrastructure")}
              </span>
            </div>
          </div>

          <div className="relative z-10 -mx-3 -mb-20 -mt-10 self-end sm:-mx-6 sm:-mb-20 sm:-mt-14 lg:-mb-16 lg:-ml-12 lg:-mr-16 lg:mt-0 lg:self-end xl:-mr-20">
            <HeroDevice locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
