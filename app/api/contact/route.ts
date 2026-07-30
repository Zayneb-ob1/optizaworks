import { NextResponse } from "next/server";
import { submitContact } from "@/backend/contact/submission";
import {
  contactErrorMessages,
  type ContactErrorCode,
} from "@/shared/contact/contract";

export const runtime = "nodejs";

const MAX_REQUEST_BODY_BYTES = 20_000;

type JsonBodyResult =
  | { ok: true; body: unknown }
  | {
      ok: false;
      code: "REQUEST_TOO_LARGE" | "INVALID_REQUEST";
      status: 400 | 413;
    };

function errorResponse(code: ContactErrorCode, status: number) {
  return NextResponse.json(
    { code, error: contactErrorMessages[code] },
    { status },
  );
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

async function readJsonBody(request: Request): Promise<JsonBodyResult> {
  const reader = request.body?.getReader();
  if (!reader) {
    return { ok: false, code: "INVALID_REQUEST" as const, status: 400 };
  }

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_REQUEST_BODY_BYTES) {
        await reader.cancel().catch(() => undefined);
        return { ok: false, code: "REQUEST_TOO_LARGE" as const, status: 413 };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, code: "INVALID_REQUEST" as const, status: 400 };
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return { ok: true, body: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, code: "INVALID_REQUEST" as const, status: 400 };
  }
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BODY_BYTES) {
      return errorResponse("REQUEST_TOO_LARGE", 413);
    }

    const bodyResult = await readJsonBody(request);
    if (!bodyResult.ok) {
      return errorResponse(bodyResult.code, bodyResult.status);
    }

    const result = submitContact(bodyResult.body, getClientIp(request));
    if (!result.ok) return errorResponse(result.code, result.status);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Contact submission failed.", error);
    return errorResponse("SERVER_ERROR", 500);
  }
}
