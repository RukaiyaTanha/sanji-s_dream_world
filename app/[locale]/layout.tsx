import type { Metadata } from "next";
import { Hind_Siliguri, Inter, Noto_Serif_Bengali, Poppins, Young_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LocaleCookie } from "@/components/locale-cookie";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/locales";
import { siteConfig } from "@/site.config";
import "@/styles/tokens.css";
import "@/styles/globals.css";

const displayEn = Young_Serif({ subsets: ["latin"], weight: "400", variable: "--font-display-en", display: "swap" });
const body = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const heroHeading = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-hero-heading",
  display: "swap",
});
const heroBody = Inter({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-hero-body",
  display: "swap",
});
const displayBn = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["500", "700"],
  variable: "--font-display-bn",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  /*
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.homeTitle, template: `%s | ${siteConfig.name}` },
    description: dict.meta.homeDesc,
  };
  */
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: dict.meta.homeTitle, template: `%s | ${siteConfig.name}` },
    description: dict.meta.homeDesc,
    icons: {
      icon: "/images/SDW-logo.png",
      apple: "/images/SDW-logo.png",
    },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDesc,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: "/images/sadiya.jpg", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: { card: "summary_large_image", images: ["/images/sadiya.jpg"] },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${displayEn.variable} ${body.variable} ${displayBn.variable} ${heroHeading.variable} ${heroBody.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          {dict.nav.skip}
        </a>
        <SiteHeader locale={locale} nav={dict.nav} brand={siteConfig.name} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
        <LocaleCookie locale={locale} />
      </body>
    </html>
  );
}
