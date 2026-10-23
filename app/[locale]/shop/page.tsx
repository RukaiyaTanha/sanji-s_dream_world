import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopBrowser } from "@/components/shop-browser";
import { products } from "@/data/products";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/breadcrumb";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/shop", dict.meta.shopTitle, dict.meta.shopDesc);
}

export default async function ShopPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page } = await searchParams;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: dict.nav.home }, { label: dict.nav.shop }]} />
      <div className="wrap page">
      <header className="page-head">
        <h1>{dict.shop.title}</h1>
        <p className="lead">{dict.shop.intro}</p>
      </header>
      <ShopBrowser products={products.filter((p) => !p.homeOnly)} locale={locale} dict={dict} initialPage={Number(page) || 1} />
      </div>
    </>
  );
}
