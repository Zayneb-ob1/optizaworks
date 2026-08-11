"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";
import { projectTypes, type ProjectType } from "@/shared/content/project-types";

const labels: Record<ProjectType, [string, string]> = {
  web: ["Web", "Web"],
  software: ["Software", "Logiciels"],
  branding: ["Branding", "Identité visuelle"],
  app: ["App", "Applications"],
};

type FilterTabsProps = {
  active?: ProjectType;
};

export default function FilterTabs({ active }: FilterTabsProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  function setFilter(type?: ProjectType) {
    const query = type ? `?type=${type}` : "";
    router.replace(`${pathname}${query}`, { scroll: false });
  }

  return (
    <div
      role="group"
      className="flex flex-wrap gap-2"
      aria-label={t("Filter projects", "Filtrer les projets")}
    >
      <button
        type="button"
        onClick={() => setFilter()}
        aria-pressed={!active}
        className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
          !active
            ? "bg-primary text-white"
            : "border border-primary/10 bg-white text-neutral-700 hover:border-accent/30"
        }`}
      >
        {t("All", "Tous")}
      </button>
      {projectTypes.map((type) => (
        <button
          type="button"
          key={type}
          onClick={() => setFilter(type)}
          aria-pressed={active === type}
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
            active === type
              ? "bg-primary text-white"
              : "border border-primary/10 bg-white text-neutral-700 hover:border-accent/30"
          }`}
        >
          {t(...labels[type])}
        </button>
      ))}
    </div>
  );
}
