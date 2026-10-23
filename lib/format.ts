import type { Locale } from "./locales";

/** Formats an amount such as 2500 as "৳2,500" (Bengali digits when the page is in Bangla). */
export function formatMoney(amount: number, locale: Locale, symbol: string): string {
  const formatter = new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-BD", {
    maximumFractionDigits: 0,
  });
  return `${symbol}${formatter.format(amount)}`;
}
