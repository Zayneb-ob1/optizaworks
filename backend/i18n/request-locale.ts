import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
  type Locale,
} from "@/shared/i18n/config";

export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await cookies()).get(localeCookieName)?.value;
  return isLocale(value) ? value : defaultLocale;
});
