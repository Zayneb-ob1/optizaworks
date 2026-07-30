"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { logAdminMutation } from "@/backend/admin/audit";
import { requireAdmin } from "@/backend/auth/session";
import { db } from "@/backend/db/client";
import { contactMessages } from "@/backend/db/schema";

function formValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function updateMessageAction(formData: FormData) {
  const admin = await requireAdmin();
  const id = formValue(formData, "id");
  const parsed = z
    .object({
      status: z.enum(["new", "read", "replied", "archived"]),
      adminNotes: z.string().trim().max(5000),
    })
    .parse({
      status: formValue(formData, "status"),
      adminNotes: formValue(formData, "adminNotes"),
    });

  db.update(contactMessages)
    .set({ ...parsed, updatedAt: new Date() })
    .where(eq(contactMessages.id, id))
    .run();
  logAdminMutation(admin.id, "update", "message", id);
  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}
