import { loadEnvConfig } from "@next/env";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { and, eq } from "drizzle-orm";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { hashPassword } from "@/backend/auth/password";
import { faqs as faqFixtures } from "@/shared/content/faqs";
import { news as newsFixtures } from "@/shared/content/news";
import { partners as partnerFixtures } from "@/shared/content/partners";
import { products as productFixtures } from "@/shared/content/products";
import { projects as projectFixtures } from "@/shared/content/projects";
import { services as serviceFixtures } from "@/shared/content/services";
import {
  adminUsers,
  auditLogs,
  faqs,
  newsItems,
  organizations,
  products,
  projects,
  services,
} from "@/backend/db/schema";

loadEnvConfig(process.cwd());

const databasePath = resolve(
  process.cwd(),
  (process.env.DATABASE_URL ?? "./data/optizaworks.db").replace(/^file:/, ""),
);
mkdirSync(dirname(databasePath), { recursive: true });
const sqlite = new Database(databasePath);
sqlite.pragma("foreign_keys = ON");
const db = drizzle(sqlite);

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const adminPassword = process.env.ADMIN_PASSWORD;
const adminName = process.env.ADMIN_NAME?.trim() || "Optizaworks Administrator";

if (!adminEmail || !adminPassword || adminPassword.length < 12) {
  throw new Error(
    "ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters are required to seed the database.",
  );
}

const seededPasswordHash = hashPassword(adminPassword);

const contentSeeded = db.transaction((tx) => {
  tx.insert(adminUsers)
    .values({
      email: adminEmail,
      name: adminName,
      passwordHash: seededPasswordHash,
      role: "owner",
      active: true,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: adminUsers.email,
      set: {
        name: adminName,
        passwordHash: seededPasswordHash,
        active: true,
        updatedAt: new Date(),
      },
    })
    .run();

  const contentAlreadySeeded = tx
    .select({ id: auditLogs.id })
    .from(auditLogs)
    .where(
      and(
        eq(auditLogs.action, "seed-content-v1"),
        eq(auditLogs.entityType, "system"),
      ),
    )
    .get();

  if (contentAlreadySeeded) return false;

  const featuredPartners = new Set([
    "CCISSM",
    "CARRSK",
    "AREP Dakhla",
    "Office des Changes",
    "EMI",
    "ENCG Settat",
    "Région de l’Oriental",
    "CSPJ",
  ]);
  partnerFixtures.forEach((partner, index) => {
    tx.insert(organizations)
      .values({
        ...partner,
        featured: featuredPartners.has(partner.shortName),
        published: true,
        sortOrder: index,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: organizations.shortName,
        set: {
          name: partner.name,
          logo: partner.logo,
          category: partner.category,
          website: partner.website,
          featured: featuredPartners.has(partner.shortName),
          sortOrder: index,
          updatedAt: new Date(),
        },
      })
      .run();
  });

  const organizationIds = new Map(
    tx
      .select({ id: organizations.id, shortName: organizations.shortName })
      .from(organizations)
      .all()
      .map((organization) => [organization.shortName, organization.id]),
  );
  const projectOrganizationNames: Record<string, string> = {
    "office-des-changes": "Office des Changes",
    "indh-tanger-assilah": "INDH Tangier",
    "ecole-mohammadia-ingenieurs": "EMI",
    "encg-settat": "ENCG Settat",
  };

  projectFixtures.forEach((project, index) => {
    const partner = partnerFixtures.find(
      (item) =>
        item.shortName === project.title ||
        item.shortName === projectOrganizationNames[project.slug],
    );
    const values = {
      organizationId: partner ? organizationIds.get(partner.shortName) : undefined,
      slug: project.slug,
      title: project.title,
      category: project.category,
      categoryLabel: project.categoryLabel,
      summary: project.summary,
      challenge: project.challenge,
      solution: project.solution,
      outcome: project.outcome,
      image: project.image,
      imageFit: project.imageFit ?? "cover",
      services: project.services,
      year: project.year,
      website: project.website,
      clientLogo: project.clientLogo,
      featured: index < 3,
      published: true,
      sortOrder: index,
      updatedAt: new Date(),
    };
    tx.insert(projects)
      .values(values)
      .onConflictDoUpdate({ target: projects.slug, set: values })
      .run();
  });

  serviceFixtures.forEach((service, index) => {
    tx.insert(services)
      .values({ ...service, published: true, sortOrder: index, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: services.slug,
        set: { ...service, sortOrder: index, updatedAt: new Date() },
      })
      .run();
  });

  productFixtures.forEach((product, index) => {
    tx.insert(products)
      .values({ ...product, published: true, sortOrder: index, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: products.code,
        set: { ...product, sortOrder: index, updatedAt: new Date() },
      })
      .run();
  });

  faqFixtures.forEach((faq, index) => {
    const existing = tx
      .select({ id: faqs.id })
      .from(faqs)
      .where(eq(faqs.sortOrder, index))
      .get();
    if (existing) {
      tx.update(faqs)
        .set({ ...faq, updatedAt: new Date() })
        .where(eq(faqs.id, existing.id))
        .run();
    } else {
      tx.insert(faqs)
        .values({ ...faq, published: true, sortOrder: index, updatedAt: new Date() })
        .run();
    }
  });

  newsFixtures.forEach((item, index) => {
    const slug = slugify(item.title);
    const monthDate = new Date(`${item.date} 01`);
    const values = {
      slug,
      dateLabel: item.date,
      title: item.title,
      description: item.description,
      publishedAt: Number.isNaN(monthDate.getTime()) ? null : monthDate,
      published: true,
      sortOrder: index,
      updatedAt: new Date(),
    };
    tx.insert(newsItems)
      .values(values)
      .onConflictDoUpdate({ target: newsItems.slug, set: values })
      .run();
  });

  tx.insert(auditLogs)
    .values({
      action: "seed-content-v1",
      entityType: "system",
      details: {
        projects: projectFixtures.length,
        organizations: partnerFixtures.length,
        services: serviceFixtures.length,
      },
    })
    .run();
  return true;
});

sqlite.close();
console.log(
  contentSeeded
    ? `Database seeded: ${projectFixtures.length} projects, ${partnerFixtures.length} organizations, ${serviceFixtures.length} services.`
    : "Admin credentials refreshed; existing website content was preserved.",
);
