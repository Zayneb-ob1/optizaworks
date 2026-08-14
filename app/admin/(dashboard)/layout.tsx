import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminUnreadMessageCount } from "@/backend/admin/queries";
import { requireAdmin } from "@/backend/auth/session";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Optizaworks Admin" },
  robots: { index: false, follow: false },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();
  const unreadMessages = getAdminUnreadMessageCount();

  return (
    <AdminShell admin={admin} unreadMessages={unreadMessages}>
      {children}
    </AdminShell>
  );
}
