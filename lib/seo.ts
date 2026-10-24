/*
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import type { Locale } from "./locales"; */

/** Page metadata with canonical, language alternates and Open Graph. `path` is "" for home, else "/shop". */
/*export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, bn: `/bn${path}` },
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `/${locale}${path}`,
      siteName: siteConfig.name,
      locale: locale === "bn" ? "bn_BD" : "en_US",
      type: "website",
    },
  };
}
*/

import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import type { Locale } from "./locales";

/** Preview image shown when the link is shared (WhatsApp, Messenger, Facebook...). File: public/images/og-image.jpg */
const ogImage = {
  url: "/images/sadiya.jpg",
  width: 1200,
  height: 630,
  alt: siteConfig.name,
};

/** Page metadata with canonical, language alternates and Open Graph. `path` is "" for home, else "/shop". */
export function pageMetadata(locale: Locale, path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, bn: `/bn${path}` },
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `/${locale}${path}`,
      siteName: siteConfig.name,
      locale: locale === "bn" ? "bn_BD" : "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [ogImage.url],
    },
  };
}