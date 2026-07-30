import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { and, count, eq, gte } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/backend/db/client";
import { contactMessages } from "@/backend/db/schema";
import type { ContactErrorCode } from "@/shared/contact/contract";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().toLowerCase().email().max(254),
  message: z.string().trim().min(3).max(5000),
  website: z.string().max(200).optional().default(""),
});

type SubmissionResult =
  | { ok: true }
  | { ok: false; code: ContactErrorCode; status: number };

function validationCode(error: z.ZodError): ContactErrorCode {
  const field = error.issues[0]?.path[0];
  if (field === "name") return "NAME_REQUIRED";
  if (field === "email") return "EMAIL_INVALID";
  if (field === "message") return "MESSAGE_TOO_SHORT";
  return "FORM_INVALID";
}

export function submitContact(input: unknown, clientIp: string): SubmissionResult {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, code: validationCode(parsed.error), status: 400 };
  }

  // Silently accept bot submissions without storing them.
  if (parsed.data.website) return { ok: true };

  const salt = process.env.CONTACT_RATE_LIMIT_SALT;
  if (!salt && process.env.NODE_ENV === "production") {
    throw new Error("CONTACT_RATE_LIMIT_SALT is required in production.");
  }

  const ipHash = createHash("sha256")
    .update(`${salt ?? "local-development"}:${clientIp}`)
    .digest("hex");
  const windowStart = new Date(Date.now() - 10 * 60 * 1000);
  const recent = db
    .select({ value: count() })
    .from(contactMessages)
    .where(
      and(
        eq(contactMessages.ipHash, ipHash),
        gte(contactMessages.createdAt, windowStart),
      ),
    )
    .get();

  if ((recent?.value ?? 0) >= 5) {
    return { ok: false, code: "RATE_LIMITED", status: 429 };
  }

  db.insert(contactMessages)
    .values({
      id: randomUUID(),
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
      ipHash,
    })
    .run();

  return { ok: true };
}
