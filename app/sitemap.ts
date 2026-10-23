import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { locales } from "@/lib/locales";
import { siteConfig } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/shop", "/commission", "/contact", ...products.map((p) => `/shop/${p.slug}`)];
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}${path}`])),
      },
    })),
  );
}
