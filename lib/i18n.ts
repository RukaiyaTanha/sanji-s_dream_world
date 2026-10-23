import { bn } from "@/messages/bn";
import { en, type Dictionary } from "@/messages/en";
import type { Locale } from "./locales";

export type { Dictionary };

export function getDictionary(locale: Locale): Dictionary {
  return locale === "bn" ? bn : en;
}
