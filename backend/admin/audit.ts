import "server-only";

import { db } from "@/backend/db/client";
import { auditLogs } from "@/backend/db/schema";

export function logAdminMutation(
  adminId: number,
  action: string,
  entityType: string,
  entityId?: string,
) {
  db.insert(auditLogs)
    .values({ adminId, action, entityType, entityId })
    .run();
}
