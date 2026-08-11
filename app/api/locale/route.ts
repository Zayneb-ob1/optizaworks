import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { localeCookieName } from "@/shared/i18n/config";

const localeSchema = z.object({ locale: z.enum(["en", "fr"]) });

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = localeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Unsupported language." }, { status: 400 });
  }

  const response = NextResponse.json({ locale: parsed.data.locale });
  const forwardedProtocol = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim();
  const secure = forwardedProtocol
    ? forwardedProtocol === "https"
    : request.nextUrl.protocol === "https:";

  response.cookies.set(localeCookieName, parsed.data.locale, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
