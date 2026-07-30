"use server";

import { createHash } from "node:crypto";
import { eq, lt } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { verifyPassword } from "@/backend/auth/password";
import {
  createAdminSession,
  revokeCurrentSession,
} from "@/backend/auth/session";
import { db } from "@/backend/db/client";
import { adminUsers, loginAttempts } from "@/backend/db/schema";
import type { AdminActionState } from "@/shared/admin/types";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_FAILURES = 5;

function formValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

async function loginIdentifier(email: string) {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "local";
  return createHash("sha256").update(`${email}:${ip}`).digest("hex");
}

function recordLoginFailure(identifierHash: string) {
  const now = new Date();
  const existing = db
    .select()
    .from(loginAttempts)
    .where(eq(loginAttempts.identifierHash, identifierHash))
    .get();
  const insideWindow =
    existing && now.getTime() - existing.windowStartedAt.getTime() < LOGIN_WINDOW_MS;
  const failures = insideWindow ? existing.failures + 1 : 1;
  const values = {
    failures,
    windowStartedAt: insideWindow ? existing.windowStartedAt : now,
    lockedUntil:
      failures >= LOGIN_MAX_FAILURES
        ? new Date(now.getTime() + LOGIN_WINDOW_MS)
        : null,
    updatedAt: now,
  };

  db.insert(loginAttempts)
    .values({ identifierHash, ...values })
    .onConflictDoUpdate({ target: loginAttempts.identifierHash, set: values })
    .run();
}

export async function loginAction(
  _previous: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const parsed = z
    .object({
      email: z.string().trim().toLowerCase().email(),
      password: z.string().min(1).max(256),
    })
    .safeParse({
      email: formValue(formData, "email"),
      password: formValue(formData, "password"),
    });

  if (!parsed.success) {
    return { ok: false, message: "Enter a valid email and password." };
  }

  const identifierHash = await loginIdentifier(parsed.data.email);
  db.delete(loginAttempts)
    .where(lt(loginAttempts.updatedAt, new Date(Date.now() - 24 * 60 * 60 * 1000)))
    .run();
  const attempt = db
    .select()
    .from(loginAttempts)
    .where(eq(loginAttempts.identifierHash, identifierHash))
    .get();

  if (attempt?.lockedUntil && attempt.lockedUntil > new Date()) {
    return { ok: false, message: "Too many sign-in attempts. Please try again later." };
  }

  const admin = db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, parsed.data.email))
    .get();

  if (!admin || !admin.active || !verifyPassword(parsed.data.password, admin.passwordHash)) {
    recordLoginFailure(identifierHash);
    return { ok: false, message: "The email or password is incorrect." };
  }

  db.delete(loginAttempts)
    .where(eq(loginAttempts.identifierHash, identifierHash))
    .run();
  await createAdminSession(admin.id);
  redirect("/admin");
}

export async function logoutAction() {
  await revokeCurrentSession();
  redirect("/admin/login");
}
