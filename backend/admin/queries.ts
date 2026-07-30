import "server-only";

import { asc, count, desc, eq } from "drizzle-orm";
import type { AdminResource } from "@/shared/admin/resources";
import type { AdminRow } from "@/shared/admin/types";
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

export function getAdminResourceRows(resource: AdminResource): AdminRow[] {
  switch (resource) {
    case "projects":
      return db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id)).all().map(serializeRow);
    case "organizations":
      return db.select().from(organizations).orderBy(asc(organizations.sortOrder), asc(organizations.id)).all().map(serializeRow);
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
    .select({ id: organizations.id, label: organizations.shortName })
    .from(organizations)
    .orderBy(asc(organizations.sortOrder), asc(organizations.shortName))
    .all()
    .map((organization) => ({
      label: organization.label,
      value: String(organization.id),
    }));
}

export function getAdminDashboardData() {
  const total = (table: typeof projects | typeof organizations | typeof services) =>
    db.select({ value: count() }).from(table).get()?.value ?? 0;
  const unread =
    db
      .select({ value: count() })
      .from(contactMessages)
      .where(eq(contactMessages.status, "new"))
      .get()?.value ?? 0;

  return {
    projectCount: total(projects),
    organizationCount: total(organizations),
    serviceCount: total(services),
    unreadMessageCount: unread,
    recentMessages: db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(5)
      .all(),
  };
}

export function getAdminMessages() {
  return db
    .select()
    .from(contactMessages)
    .orderBy(desc(contactMessages.createdAt))
    .all();
}
