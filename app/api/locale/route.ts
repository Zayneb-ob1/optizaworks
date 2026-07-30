import { NextResponse } from "next/server";
import { z } from "zod";
import { localeCookieName } from "@/shared/i18n/config";

const localeSchema = z.object({ locale: z.enum(["en", "fr"]) });

export async function POST(request: Request) {
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
  response.cookies.set(localeCookieName, parsed.data.locale, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
