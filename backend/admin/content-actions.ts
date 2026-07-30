"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { logAdminMutation } from "@/backend/admin/audit";
import { requireAdmin } from "@/backend/auth/session";
import { db } from "@/backend/db/client";
import type { AdminActionState } from "@/shared/admin/types";
import { isAdminResource, type AdminResource } from "@/shared/admin/resources";
import {
  faqs,
  newsItems,
  organizations,
  products,
  projects,
  services,
} from "@/backend/db/schema";

const requiredText = z.string().trim().min(1).max(5000);
const slug = z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(160);
const optionalUrl = z
  .string()
  .trim()
  .refine((value) => value === "" || /^https?:\/\//i.test(value), "Use a complete http(s) URL.")
  .refine((value) => value === "" || z.string().url().safeParse(value).success, "Enter a valid URL.");
const assetPath = z
  .string()
  .trim()
  .min(1)
  .refine((value) => value.startsWith("/"), "Use a path beginning with / from the public folder.");
const optionalAssetPath = z
  .string()
  .trim()
  .refine((value) => value === "" || value.startsWith("/"), "Use a path beginning with / from the public folder.");

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function checked(formData: FormData, key: string) {
  return formData.get(key) === "on" || formData.get(key) === "true";
}

function lines(formData: FormData, key: string) {
  return value(formData, key)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function order(formData: FormData) {
  return z.coerce.number().int().min(0).max(10000).parse(value(formData, "sortOrder") || "0");
}

function revalidateResource(resource: AdminResource, projectSlug?: string) {
  revalidatePath("/admin");
  revalidatePath(`/admin/content/${resource}`);
  revalidatePath("/", "layout");

  if (resource === "projects") {
    revalidatePath("/portfolio");
    if (projectSlug) revalidatePath(`/portfolio/${projectSlug}`);
  }
  if (resource === "services") revalidatePath("/services");
  if (resource === "products") revalidatePath("/products");
  if (resource === "news") revalidatePath("/news");
}

export async function saveResourceAction(
  _previous: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const admin = await requireAdmin();
  const resourceValue = value(formData, "resource");
  if (!isAdminResource(resourceValue)) {
    return { ok: false, message: "Unknown content type." };
  }

  const resource = resourceValue;
  const recordId = Number(value(formData, "id")) || undefined;

  try {
    let entityId = recordId ? String(recordId) : undefined;
    let projectSlug: string | undefined;

    switch (resource) {
      case "projects": {
        const parsed = z
          .object({
            title: requiredText.max(180),
            slug,
            category: z.enum(["web", "software", "branding", "app"]),
            categoryLabel: requiredText.max(120),
            summary: requiredText,
            challenge: requiredText,
            solution: requiredText,
            outcome: requiredText,
            image: assetPath,
            imageFit: z.enum(["cover", "contain"]),
            services: z.array(requiredText.max(120)).min(1).max(20),
            year: requiredText.max(40),
            website: optionalUrl,
            clientLogo: optionalAssetPath.max(500),
            organizationId: z.number().int().positive().nullable(),
            featured: z.boolean(),
            published: z.boolean(),
            sortOrder: z.number().int(),
          })
          .parse({
            title: value(formData, "title"),
            slug: value(formData, "slug"),
            category: value(formData, "category"),
            categoryLabel: value(formData, "categoryLabel"),
            summary: value(formData, "summary"),
            challenge: value(formData, "challenge"),
            solution: value(formData, "solution"),
            outcome: value(formData, "outcome"),
            image: value(formData, "image"),
            imageFit: value(formData, "imageFit"),
            services: lines(formData, "services"),
            year: value(formData, "year"),
            website: value(formData, "website"),
            clientLogo: value(formData, "clientLogo"),
            organizationId: Number(value(formData, "organizationId")) || null,
            featured: checked(formData, "featured"),
            published: checked(formData, "published"),
            sortOrder: order(formData),
          });
        const values = {
          ...parsed,
          website: parsed.website || null,
          clientLogo: parsed.clientLogo || null,
          updatedAt: new Date(),
        };
        projectSlug = parsed.slug;
        if (recordId) {
          db.update(projects).set(values).where(eq(projects.id, recordId)).run();
        } else {
          entityId = String(db.insert(projects).values(values).run().lastInsertRowid);
        }
        break;
      }
      case "organizations": {
        const parsed = z
          .object({
            shortName: requiredText.max(120),
            name: requiredText.max(300),
            logo: assetPath,
            category: requiredText.max(160),
            website: optionalUrl.refine(Boolean, "Website is required."),
            featured: z.boolean(),
            published: z.boolean(),
            sortOrder: z.number().int(),
          })
          .parse({
            shortName: value(formData, "shortName"),
            name: value(formData, "name"),
            logo: value(formData, "logo"),
            category: value(formData, "category"),
            website: value(formData, "website"),
            featured: checked(formData, "featured"),
            published: checked(formData, "published"),
            sortOrder: order(formData),
          });
        const values = { ...parsed, updatedAt: new Date() };
        if (recordId) db.update(organizations).set(values).where(eq(organizations.id, recordId)).run();
        else entityId = String(db.insert(organizations).values(values).run().lastInsertRowid);
        break;
      }
      case "services": {
        const parsed = z
          .object({
            slug,
            title: requiredText.max(180),
            description: requiredText.max(500),
            details: requiredText,
            includes: z.array(requiredText.max(160)).min(1).max(20),
            icon: z.enum(["code", "database", "brain", "cloud", "compass", "layout", "shield", "headphones"]),
            published: z.boolean(),
            sortOrder: z.number().int(),
          })
          .parse({
            slug: value(formData, "slug"),
            title: value(formData, "title"),
            description: value(formData, "description"),
            details: value(formData, "details"),
            includes: lines(formData, "includes"),
            icon: value(formData, "icon"),
            published: checked(formData, "published"),
            sortOrder: order(formData),
          });
        const values = { ...parsed, updatedAt: new Date() };
        if (recordId) db.update(services).set(values).where(eq(services.id, recordId)).run();
        else entityId = String(db.insert(services).values(values).run().lastInsertRowid);
        break;
      }
      case "products": {
        const parsed = z
          .object({
            code: requiredText.max(30),
            name: requiredText.max(180),
            category: requiredText.max(180),
            description: requiredText,
            features: z.array(requiredText.max(180)).min(1).max(30),
            published: z.boolean(),
            sortOrder: z.number().int(),
          })
          .parse({
            code: value(formData, "code"),
            name: value(formData, "name"),
            category: value(formData, "category"),
            description: value(formData, "description"),
            features: lines(formData, "features"),
            published: checked(formData, "published"),
            sortOrder: order(formData),
          });
        const values = { ...parsed, updatedAt: new Date() };
        if (recordId) db.update(products).set(values).where(eq(products.id, recordId)).run();
        else entityId = String(db.insert(products).values(values).run().lastInsertRowid);
        break;
      }
      case "news": {
        const parsed = z
          .object({
            slug,
            title: requiredText.max(220),
            dateLabel: requiredText.max(80),
            description: requiredText,
            published: z.boolean(),
            sortOrder: z.number().int(),
          })
          .parse({
            slug: value(formData, "slug"),
            title: value(formData, "title"),
            dateLabel: value(formData, "dateLabel"),
            description: value(formData, "description"),
            published: checked(formData, "published"),
            sortOrder: order(formData),
          });
        const values = { ...parsed, updatedAt: new Date() };
        if (recordId) db.update(newsItems).set(values).where(eq(newsItems.id, recordId)).run();
        else entityId = String(db.insert(newsItems).values(values).run().lastInsertRowid);
        break;
      }
      case "faqs": {
        const parsed = z
          .object({
            question: requiredText.max(500),
            answer: requiredText,
            published: z.boolean(),
            sortOrder: z.number().int(),
          })
          .parse({
            question: value(formData, "question"),
            answer: value(formData, "answer"),
            published: checked(formData, "published"),
            sortOrder: order(formData),
          });
        const values = { ...parsed, updatedAt: new Date() };
        if (recordId) db.update(faqs).set(values).where(eq(faqs.id, recordId)).run();
        else entityId = String(db.insert(faqs).values(values).run().lastInsertRowid);
        break;
      }
    }

    logAdminMutation(admin.id, recordId ? "update" : "create", resource, entityId);
    revalidateResource(resource, projectSlug);
    return { ok: true, message: `${resourceDefinitionsLabel(resource)} saved.` };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { ok: false, message: error.issues[0]?.message ?? "Check the form fields." };
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    if (/unique/i.test(message)) {
      return { ok: false, message: "A record with that slug, code, or short name already exists." };
    }
    console.error(error);
    return { ok: false, message: "The record could not be saved." };
  }
}

function resourceDefinitionsLabel(resource: AdminResource) {
  return resource === "news" ? "News item" : resource.slice(0, -1);
}

export async function deleteResourceAction(formData: FormData) {
  const admin = await requireAdmin();
  const resourceValue = value(formData, "resource");
  const id = Number(value(formData, "id"));
  if (!isAdminResource(resourceValue) || !Number.isInteger(id) || id <= 0) return;

  switch (resourceValue) {
    case "projects":
      db.delete(projects).where(eq(projects.id, id)).run();
      break;
    case "organizations":
      db.delete(organizations).where(eq(organizations.id, id)).run();
      break;
    case "services":
      db.delete(services).where(eq(services.id, id)).run();
      break;
    case "products":
      db.delete(products).where(eq(products.id, id)).run();
      break;
    case "news":
      db.delete(newsItems).where(eq(newsItems.id, id)).run();
      break;
    case "faqs":
      db.delete(faqs).where(eq(faqs.id, id)).run();
      break;
  }

  logAdminMutation(admin.id, "delete", resourceValue, String(id));
  revalidateResource(resourceValue);
}
