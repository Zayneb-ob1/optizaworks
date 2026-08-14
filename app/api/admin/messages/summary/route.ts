import { NextResponse } from "next/server";
import { getAdminMessageSummary } from "@/backend/admin/queries";
import { getCurrentAdmin } from "@/backend/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(getAdminMessageSummary(), {
    headers: { "Cache-Control": "no-store" },
  });
}
