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
import {
  partnerPresentationOverrides,
  partners as partnerFixtures,
  type Partner,
  type PartnerCategory,
} from "@/shared/content/partners";
import type { Product } from "@/shared/content/products";
import { projectMediaOverrides } from "@/shared/content/project-media";
import {
  projects as projectFixtures,
  type Project,
} from "@/shared/content/projects";
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
  const mediaOverride = projectMediaOverrides[project.slug];

  return {
    slug: project.slug,
    title: mediaOverride?.title ?? project.title,
    category: project.category as ProjectType,
    categoryLabel: project.categoryLabel,
    summary: project.summary,
    challenge: project.challenge,
    solution: project.solution,
    outcome: project.outcome,
    image: mediaOverride?.image ?? project.image,
    imageFit: mediaOverride?.imageFit ?? project.imageFit,
    services: project.services,
    year: project.year,
    website: mediaOverride?.website ?? project.website ?? undefined,
    clientLogo: mediaOverride?.clientLogo ?? project.clientLogo ?? undefined,
  };
}

const supplementalOrganizationWebsite =
  "https://chambreagriculturesm.com/fr/";
const supplementalProjectSlug = "agriculture-souss-massa";

const supplementalOrganization = partnerFixtures.find(
  (partner) => partner.website === supplementalOrganizationWebsite,
);
const supplementalProject = projectFixtures.find(
  (project) => project.slug === supplementalProjectSlug,
);

function hasStoredProject(slug: string): boolean {
  return Boolean(
    db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.slug, slug))
      .get(),
  );
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

  const rows = db
    .select()
    .from(projects)
    .where(and(...conditions))
    .orderBy(asc(projects.sortOrder), asc(projects.id))
    .all();

  let publishedProjects = rows.map(toProject);

  if (
    supplementalProject &&
    !featuredOnly &&
    (!category || supplementalProject.category === category) &&
    !hasStoredProject(supplementalProject.slug)
  ) {
    publishedProjects.push(supplementalProject);
  }

  if (limit) publishedProjects = publishedProjects.slice(0, limit);
  return publishedProjects.map((project) => localizeProject(project, locale));
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
  if (project) return localizeProject(toProject(project), locale);

  if (
    slug === supplementalProjectSlug &&
    supplementalProject &&
    !hasStoredProject(slug)
  ) {
    return localizeProject(supplementalProject, locale);
  }

  return undefined;
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

  const publishedOrganizations: Partner[] = db
    .select()
    .from(organizations)
    .where(condition)
    .orderBy(asc(organizations.sortOrder), asc(organizations.id))
    .all()
    .map((organization) => {
      const presentation =
        partnerPresentationOverrides[organization.website];

      return {
        name: organization.name,
        shortName: presentation?.shortName ?? organization.shortName,
        logo: presentation?.logo ?? organization.logo,
        category: organization.category as PartnerCategory,
        website: organization.website,
        featured: organization.featured,
      };
    });

  const hasStoredSupplement = supplementalOrganization
    ? Boolean(
        db
          .select({ id: organizations.id })
          .from(organizations)
          .where(eq(organizations.website, supplementalOrganization.website))
          .get(),
      )
    : false;

  if (
    !options?.featuredOnly &&
    supplementalOrganization &&
    !hasStoredSupplement
  ) {
    publishedOrganizations.push(supplementalOrganization);
  }

  return publishedOrganizations;
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
