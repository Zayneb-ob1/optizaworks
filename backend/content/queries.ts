import "server-only";

import { and, asc, desc, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/backend/db/client";
import {
  faqs,
  newsItems,
  organizations,
  products,
  projects,
  services,
} from "@/backend/db/schema";
import type { Faq } from "@/shared/content/faqs";
import type { NewsItem } from "@/shared/content/news";
import type { Partner, PartnerCategory } from "@/shared/content/partners";
import type { Product } from "@/shared/content/products";
import type { Project } from "@/shared/content/projects";
import type { ProjectType } from "@/shared/content/project-types";
import type { Service, ServiceIcon } from "@/shared/content/services";
import type { Locale } from "@/shared/i18n/config";
import {
  localizeFaq,
  localizeNewsItem,
  localizeProduct,
  localizeProject,
  localizeService,
} from "@/shared/i18n/content";

const getPublishedServicesCached = cache((locale: Locale): Service[] => {
  return db
    .select()
    .from(services)
    .where(eq(services.published, true))
    .orderBy(asc(services.sortOrder), asc(services.id))
    .all()
    .map((service) =>
      localizeService(
        {
          slug: service.slug,
          title: service.title,
          description: service.description,
          details: service.details,
          includes: service.includes,
          icon: service.icon as ServiceIcon,
        },
        locale,
      ),
    );
});

export function getPublishedServices(locale: Locale = "en"): Service[] {
  return getPublishedServicesCached(locale);
}

function toProject(project: typeof projects.$inferSelect): Project {
  return {
    slug: project.slug,
    title: project.title,
    category: project.category as ProjectType,
    categoryLabel: project.categoryLabel,
    summary: project.summary,
    challenge: project.challenge,
    solution: project.solution,
    outcome: project.outcome,
    image: project.image,
    imageFit: project.imageFit,
    services: project.services,
    year: project.year,
    website: project.website ?? undefined,
    clientLogo: project.clientLogo ?? undefined,
  };
}

const getPublishedProjectsCached = cache((
  category: ProjectType | undefined,
  featuredOnly: boolean,
  limit: number | undefined,
  locale: Locale,
): Project[] => {
  const conditions = [eq(projects.published, true)];
  if (category) conditions.push(eq(projects.category, category));
  if (featuredOnly) conditions.push(eq(projects.featured, true));

  let rows = db
    .select()
    .from(projects)
    .where(and(...conditions))
    .orderBy(asc(projects.sortOrder), asc(projects.id))
    .all();

  if (limit) rows = rows.slice(0, limit);
  return rows.map(toProject).map((project) => localizeProject(project, locale));
});

export function getPublishedProjects(options?: {
  category?: ProjectType;
  featuredOnly?: boolean;
  limit?: number;
  locale?: Locale;
}): Project[] {
  return getPublishedProjectsCached(
    options?.category,
    Boolean(options?.featuredOnly),
    options?.limit,
    options?.locale ?? "en",
  );
}

const getPublishedProjectCached = cache((
  slug: string,
  locale: Locale,
): Project | undefined => {
  const project = db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.published, true)))
    .get();
  return project ? localizeProject(toProject(project), locale) : undefined;
});

export function getPublishedProject(
  slug: string,
  locale: Locale = "en",
): Project | undefined {
  return getPublishedProjectCached(slug, locale);
}

export function getPublishedOrganizations(options?: {
  featuredOnly?: boolean;
}): Partner[] {
  const condition = options?.featuredOnly
    ? and(eq(organizations.published, true), eq(organizations.featured, true))
    : eq(organizations.published, true);

  return db
    .select()
    .from(organizations)
    .where(condition)
    .orderBy(asc(organizations.sortOrder), asc(organizations.id))
    .all()
    .map((organization) => ({
      name: organization.name,
      shortName: organization.shortName,
      logo: organization.logo,
      category: organization.category as PartnerCategory,
      website: organization.website,
      featured: organization.featured,
    }));
}

export function getPublishedFaqs(locale: Locale = "en"): Faq[] {
  return db
    .select({ question: faqs.question, answer: faqs.answer })
    .from(faqs)
    .where(eq(faqs.published, true))
    .orderBy(asc(faqs.sortOrder), asc(faqs.id))
    .all()
    .map((faq) => localizeFaq(faq, locale));
}

export function getPublishedNews(locale: Locale = "en"): NewsItem[] {
  return db
    .select()
    .from(newsItems)
    .where(eq(newsItems.published, true))
    .orderBy(asc(newsItems.sortOrder), desc(newsItems.publishedAt), desc(newsItems.id))
    .all()
    .map((item) =>
      localizeNewsItem(
        {
          slug: item.slug,
          date: item.dateLabel,
          dateKey: item.publishedAt
            ? `${item.publishedAt.getFullYear()}-${String(item.publishedAt.getMonth() + 1).padStart(2, "0")}`
            : undefined,
          title: item.title,
          description: item.description,
        },
        locale,
      ),
    );
}

export function getPublishedProducts(locale: Locale = "en"): Product[] {
  return db
    .select()
    .from(products)
    .where(eq(products.published, true))
    .orderBy(asc(products.sortOrder), asc(products.id))
    .all()
    .map((product) =>
      localizeProduct(
        {
          code: product.code,
          name: product.name,
          category: product.category,
          description: product.description,
          features: product.features,
        },
        locale,
      ),
    );
}
