import "server-only";

import {
  and,
  asc,
  count,
  desc,
  eq,
  inArray,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import type {
  AdminMessageCounts,
  AdminMessageFilter,
} from "@/shared/admin/messages";
import type { AdminResource } from "@/shared/admin/resources";
import type { AdminRow } from "@/shared/admin/types";
import {
  partnerPresentationOverrides,
  partners as partnerCatalog,
} from "@/shared/content/partners";
import { projectMediaOverrides } from "@/shared/content/project-media";
import { projects as projectCatalog } from "@/shared/content/projects";
import { db } from "@/backend/db/client";
import {
  contactMessages,
  faqs,
  newsItems,
  organizations,
  products,
  projects,
  services,
} from "@/backend/db/schema";

function serializeRow(row: Record<string, unknown>): AdminRow {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => {
      if (value instanceof Date) return [key, value.toISOString()];
      if (Array.isArray(value)) return [key, value.join("\n")];
      if (
        value === null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return [key, value];
      }
      return [key, String(value ?? "")];
    }),
  );
}

function normalizeWebsite(website: unknown) {
  return String(website ?? "")
    .trim()
    .toLowerCase()
    .replace(/\/+$/, "");
}

const supplementalProjectSlug = "agriculture-souss-massa";
const supplementalOrganizationWebsite =
  "https://chambreagriculturesm.com/fr/";

function getAdminProjectRows(): AdminRow[] {
  const databaseProjects = db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder), asc(projects.id))
    .all();
  const databaseSlugs = new Set(databaseProjects.map((project) => project.slug));
  const rows = databaseProjects.map((project) => {
    const presentation = projectMediaOverrides[project.slug];

    return serializeRow({
      ...project,
      title: presentation?.title ?? project.title,
      image: presentation?.image ?? project.image,
      imageFit: presentation?.imageFit ?? project.imageFit,
      website: presentation?.website ?? project.website,
      clientLogo: presentation?.clientLogo ?? project.clientLogo,
    });
  });

  const supplementalProject = projectCatalog.find(
    (project) => project.slug === supplementalProjectSlug,
  );
  const sourceManagedRows =
    supplementalProject && !databaseSlugs.has(supplementalProject.slug)
      ? [
          serializeRow({
            ...supplementalProject,
            id: `source:project:${supplementalProject.slug}`,
            organizationId: null,
            featured: false,
            published: true,
            sortOrder: databaseProjects.length,
            _readOnly: true,
          }),
        ]
      : [];

  return [...rows, ...sourceManagedRows];
}

function getAdminOrganizationRows(): AdminRow[] {
  const databaseOrganizations = db
    .select()
    .from(organizations)
    .orderBy(asc(organizations.sortOrder), asc(organizations.id))
    .all();
  const presentedOrganizations = databaseOrganizations.map((organization) => ({
    ...organization,
    ...partnerPresentationOverrides[organization.website],
  }));
  const databaseWebsites = new Set(
    presentedOrganizations.map((organization) => normalizeWebsite(organization.website)),
  );
  const databaseShortNames = new Set(
    presentedOrganizations.map((organization) => organization.shortName.toLowerCase()),
  );
  const rows = presentedOrganizations.map(serializeRow);

  const supplementalOrganization = partnerCatalog.find(
    (partner) =>
      normalizeWebsite(partner.website) ===
      normalizeWebsite(supplementalOrganizationWebsite),
  );
  const sourceManagedRows =
    supplementalOrganization &&
    !databaseWebsites.has(normalizeWebsite(supplementalOrganization.website)) &&
    !databaseShortNames.has(supplementalOrganization.shortName.toLowerCase())
      ? [
          serializeRow({
            ...supplementalOrganization,
            id: `source:organization:${supplementalOrganization.shortName.toLowerCase()}`,
            featured: Boolean(supplementalOrganization.featured),
            published: true,
            sortOrder: databaseOrganizations.length,
            _readOnly: true,
          }),
        ]
      : [];

  return [...rows, ...sourceManagedRows];
}

export function getAdminResourceRows(resource: AdminResource): AdminRow[] {
  switch (resource) {
    case "projects":
      return getAdminProjectRows();
    case "organizations":
      return getAdminOrganizationRows();
    case "services":
      return db.select().from(services).orderBy(asc(services.sortOrder), asc(services.id)).all().map(serializeRow);
    case "products":
      return db.select().from(products).orderBy(asc(products.sortOrder), asc(products.id)).all().map(serializeRow);
    case "news":
      return db.select().from(newsItems).orderBy(asc(newsItems.sortOrder), desc(newsItems.id)).all().map(serializeRow);
    case "faqs":
      return db.select().from(faqs).orderBy(asc(faqs.sortOrder), asc(faqs.id)).all().map(serializeRow);
  }
}

export function getOrganizationOptions() {
  return db
    .select({
      id: organizations.id,
      label: organizations.shortName,
      website: organizations.website,
    })
    .from(organizations)
    .orderBy(asc(organizations.sortOrder), asc(organizations.shortName))
    .all()
    .map((organization) => ({
      label:
        partnerPresentationOverrides[organization.website]?.shortName ??
        organization.label,
      value: String(organization.id),
    }));
}

export function getAdminDashboardData() {
  const total = (table: typeof projects | typeof organizations | typeof services) =>
    db.select({ value: count() }).from(table).get()?.value ?? 0;
  return {
    projectCount: getAdminProjectRows().length,
    organizationCount: getAdminOrganizationRows().length,
    serviceCount: total(services),
    unreadMessageCount: getAdminUnreadMessageCount(),
    recentMessages: db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(5)
      .all(),
  };
}

export function getAdminUnreadMessageCount() {
  return (
    db
      .select({ value: count() })
      .from(contactMessages)
      .where(eq(contactMessages.status, "new"))
      .get()?.value ?? 0
  );
}

type AdminMessagesQuery = {
  query?: string;
  filter?: AdminMessageFilter;
  page?: number;
  pageSize?: number;
};

function messageStatusCounts(): AdminMessageCounts {
  const values = db
    .select({
      all: count(),
      unread: sql<number>`coalesce(sum(case when ${contactMessages.status} = 'new' then 1 else 0 end), 0)`,
      read: sql<number>`coalesce(sum(case when ${contactMessages.status} in ('read', 'replied') then 1 else 0 end), 0)`,
      archived: sql<number>`coalesce(sum(case when ${contactMessages.status} = 'archived' then 1 else 0 end), 0)`,
    })
    .from(contactMessages)
    .get();

  return {
    all: Number(values?.all ?? 0),
    unread: Number(values?.unread ?? 0),
    read: Number(values?.read ?? 0),
    archived: Number(values?.archived ?? 0),
  };
}

export function getAdminMessages({
  query = "",
  filter = "all",
  page = 1,
  pageSize = 10,
}: AdminMessagesQuery = {}) {
  const normalizedQuery = query.trim().slice(0, 160);
  const safePageSize = Math.min(Math.max(Math.trunc(pageSize) || 10, 5), 50);
  const requestedPage = Math.max(Math.trunc(page) || 1, 1);
  const conditions: SQL[] = [];

  if (normalizedQuery) {
    const searchCondition = or(
      sql`instr(lower(${contactMessages.name}), lower(${normalizedQuery})) > 0`,
      sql`instr(lower(${contactMessages.email}), lower(${normalizedQuery})) > 0`,
      sql`instr(lower(${contactMessages.message}), lower(${normalizedQuery})) > 0`,
    );
    if (searchCondition) conditions.push(searchCondition);
  }

  if (filter === "unread") {
    conditions.push(eq(contactMessages.status, "new"));
  } else if (filter === "read") {
    conditions.push(inArray(contactMessages.status, ["read", "replied"]));
  } else if (filter === "archived") {
    conditions.push(eq(contactMessages.status, "archived"));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;
  const totalQuery = db.select({ value: count() }).from(contactMessages);
  const total = (where ? totalQuery.where(where) : totalQuery).get()?.value ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize));
  const currentPage = Math.min(requestedPage, totalPages);
  const rowsQuery = db
    .select({
      id: contactMessages.id,
      name: contactMessages.name,
      email: contactMessages.email,
      message: contactMessages.message,
      status: contactMessages.status,
      adminNotes: contactMessages.adminNotes,
      createdAt: contactMessages.createdAt,
    })
    .from(contactMessages);
  const filteredRowsQuery = where ? rowsQuery.where(where) : rowsQuery;
  const messages = filteredRowsQuery
    .orderBy(desc(contactMessages.createdAt), desc(contactMessages.id))
    .limit(safePageSize)
    .offset((currentPage - 1) * safePageSize)
    .all();

  return {
    messages,
    counts: messageStatusCounts(),
    total,
    page: currentPage,
    pageSize: safePageSize,
    totalPages,
    query: normalizedQuery,
    filter,
  };
}

export function getAdminMessageSummary() {
  const unreadCount =
    db
      .select({ value: count() })
      .from(contactMessages)
      .where(eq(contactMessages.status, "new"))
      .get()?.value ?? 0;
  const latestUnread = db
    .select({
      id: contactMessages.id,
      name: contactMessages.name,
      createdAt: contactMessages.createdAt,
    })
    .from(contactMessages)
    .where(eq(contactMessages.status, "new"))
    .orderBy(desc(contactMessages.createdAt), desc(contactMessages.id))
    .limit(1)
    .get();

  return {
    unreadCount,
    latestUnread: latestUnread
      ? {
          id: latestUnread.id,
          name: latestUnread.name,
          createdAt: latestUnread.createdAt.toISOString(),
        }
      : null,
  };
}
