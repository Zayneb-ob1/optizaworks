import { notFound } from "next/navigation";
import AdminResourceManager from "@/components/admin/AdminResourceManager";
import { getAdminResourceRows } from "@/backend/admin/queries";
import { isAdminResource } from "@/shared/admin/resources";

type AdminContentPageProps = {
  params: Promise<{ resource: string }>;
};

export default async function AdminContentPage({ params }: AdminContentPageProps) {
  const { resource } = await params;
  if (!isAdminResource(resource) || resource === "projects") notFound();

  return (
    <AdminResourceManager
      resource={resource}
      rows={getAdminResourceRows(resource)}
    />
  );
}
