import "server-only";

import { createHash, randomBytes, randomUUID } from "node:crypto";
import { and, eq, gt, lt } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/backend/db/client";
import { adminSessions, adminUsers } from "@/backend/db/schema";

const COOKIE_NAME = "optizaworks_admin_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createAdminSession(adminId: number) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  db.delete(adminSessions).where(lt(adminSessions.expiresAt, new Date())).run();

  db.insert(adminSessions)
    .values({
      id: randomUUID(),
      tokenHash: hashToken(token),
      adminId,
      expiresAt,
    })
    .run();

  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function getCurrentAdmin() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;

  return (
    db
      .select({
        id: adminUsers.id,
        email: adminUsers.email,
        name: adminUsers.name,
        role: adminUsers.role,
      })
      .from(adminSessions)
      .innerJoin(adminUsers, eq(adminSessions.adminId, adminUsers.id))
      .where(
        and(
          eq(adminSessions.tokenHash, hashToken(token)),
          gt(adminSessions.expiresAt, new Date()),
          eq(adminUsers.active, true),
        ),
      )
      .get() ?? null
  );
}

export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function revokeCurrentSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    db.delete(adminSessions)
      .where(eq(adminSessions.tokenHash, hashToken(token)))
      .run();
  }

  cookieStore.delete(COOKIE_NAME);
}
