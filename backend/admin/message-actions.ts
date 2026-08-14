"use server";

import { and, eq, ne } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { logAdminMutation } from "@/backend/admin/audit";
import { requireAdmin } from "@/backend/auth/session";
import { db } from "@/backend/db/client";
import { contactMessages } from "@/backend/db/schema";

function formValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

const messageIdSchema = z.string().trim().min(1).max(128);

function revalidateMessageViews() {
  revalidatePath("/admin", "layout");
  revalidatePath("/admin/messages");
}

function ensureChanged(changes: number) {
  if (changes === 0) throw new Error("Message not found or already updated.");
}

export async function updateMessageAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = messageIdSchema.parse(formValue(formData, "id"));
  const parsed = z
    .object({
      status: z.enum(["new", "read", "replied", "archived"]),
      adminNotes: z.string().trim().max(5000),
    })
    .parse({
      status: formValue(formData, "status"),
      adminNotes: formValue(formData, "adminNotes"),
    });

  const result = db.update(contactMessages)
    .set({ ...parsed, updatedAt: new Date() })
    .where(eq(contactMessages.id, id))
    .run();
  ensureChanged(result.changes);
  logAdminMutation(admin.id, "update", "message", id);
  revalidateMessageViews();
}

export async function markMessageReadAction(idInput: string) {
  const admin = await requireAdmin();
  const id = messageIdSchema.parse(idInput);
  const result = db
    .update(contactMessages)
    .set({ status: "read", updatedAt: new Date() })
    .where(
      and(
        eq(contactMessages.id, id),
        eq(contactMessages.status, "new"),
      ),
    )
    .run();

  ensureChanged(result.changes);
  logAdminMutation(admin.id, "mark_read", "message", id);
  revalidateMessageViews();
  return { ok: true as const };
}

export async function markMessageUnreadAction(idInput: string) {
  const admin = await requireAdmin();
  const id = messageIdSchema.parse(idInput);
  const result = db
    .update(contactMessages)
    .set({ status: "new", updatedAt: new Date() })
    .where(
      and(
        eq(contactMessages.id, id),
        ne(contactMessages.status, "archived"),
        ne(contactMessages.status, "new"),
      ),
    )
    .run();

  ensureChanged(result.changes);
  logAdminMutation(admin.id, "mark_unread", "message", id);
  revalidateMessageViews();
  return { ok: true as const };
}

export async function markMessageRepliedAction(idInput: string) {
  const admin = await requireAdmin();
  const id = messageIdSchema.parse(idInput);
  const result = db
    .update(contactMessages)
    .set({ status: "replied", updatedAt: new Date() })
    .where(
      and(
        eq(contactMessages.id, id),
        ne(contactMessages.status, "archived"),
        ne(contactMessages.status, "replied"),
      ),
    )
    .run();

  ensureChanged(result.changes);
  logAdminMutation(admin.id, "mark_replied", "message", id);
  revalidateMessageViews();
  return { ok: true as const };
}

export async function archiveMessageAction(idInput: string) {
  const admin = await requireAdmin();
  const id = messageIdSchema.parse(idInput);
  const result = db
    .update(contactMessages)
    .set({ status: "archived", updatedAt: new Date() })
    .where(
      and(
        eq(contactMessages.id, id),
        ne(contactMessages.status, "archived"),
      ),
    )
    .run();

  ensureChanged(result.changes);
  logAdminMutation(admin.id, "archive", "message", id);
  revalidateMessageViews();
  return { ok: true as const };
}

export async function restoreMessageAction(idInput: string) {
  const admin = await requireAdmin();
  const id = messageIdSchema.parse(idInput);
  const result = db
    .update(contactMessages)
    .set({ status: "read", updatedAt: new Date() })
    .where(
      and(
        eq(contactMessages.id, id),
        eq(contactMessages.status, "archived"),
      ),
    )
    .run();

  ensureChanged(result.changes);
  logAdminMutation(admin.id, "restore", "message", id);
  revalidateMessageViews();
  return { ok: true as const };
}

export async function saveMessageNoteAction(
  idInput: string,
  noteInput: string,
) {
  const admin = await requireAdmin();
  const id = messageIdSchema.parse(idInput);
  const adminNotes = z.string().trim().max(5000).parse(noteInput);
  const result = db
    .update(contactMessages)
    .set({ adminNotes, updatedAt: new Date() })
    .where(eq(contactMessages.id, id))
    .run();

  ensureChanged(result.changes);
  logAdminMutation(admin.id, "save_note", "message", id);
  revalidateMessageViews();
  return { ok: true as const };
}

export async function deleteMessageAction(idInput: string) {
  const admin = await requireAdmin();
  const id = messageIdSchema.parse(idInput);
  const result = db
    .delete(contactMessages)
    .where(eq(contactMessages.id, id))
    .run();

  ensureChanged(result.changes);
  logAdminMutation(admin.id, "delete", "message", id);
  revalidateMessageViews();
  return { ok: true as const };
}
