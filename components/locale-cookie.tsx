"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/locales";

/** Remembers the language the visitor is reading, so "/" opens in it next time. */
export function LocaleCookie({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
  }, [locale]);
  return null;
}
