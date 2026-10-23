import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactActions } from "@/components/contact-actions";
import { ProductGallery } from "@/components/product-gallery";
import { getProduct, products } from "@/data/products";
import { formatMoney } from "@/lib/format";
import { getDictionary } from "@/lib/i18n";
import { fmt, isLocale, locales } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { Breadcrumb } from "@/components/breadcrumb";
import { materials as materialCatalog } from "@/data/materials";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!isLocale(locale) || !product) return {};
  const dict = getDictionary(locale);
  const description = product.description?.[locale] ?? dict.meta.shopDesc;
  return pageMetadata(locale, `/shop/${slug}`, product.name[locale], description);
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = getProduct(slug);
  if (!isLocale(locale) || !product) notFound();
  const dict = getDictionary(locale);
  const d = dict.product;

  const priceText =
    product.priceText?.[locale] ??
    (product.price === null ? null : formatMoney(product.price, locale, siteConfig.currency.symbol));
  const message = fmt(d.askMessage, {
    name: product.name[locale],
    id: product.id,
    price: priceText ? fmt(d.priceInMessage, { price: priceText }) : "",
  });
  const selectedMaterials = (product.materials ?? [])
    .map((key) => materialCatalog.find((material) => material.key === key))
    .filter((material) => material !== undefined);

  return (
    <>
      <Breadcrumb
        locale={locale}
        items={[
          { label: dict.nav.home, href: `/${locale}` },
          { label: dict.nav.shop, href: `/${locale}/shop` },
          { label: dict.shop.categories[product.category], href: `/${locale}/shop?category=${product.category}` },
          { label: product.name[locale] },
        ]}
      />
      <div className="wrap page">
      <div className="product">
        <ProductGallery product={product} locale={locale} dict={dict} />

        <div className="product-info">
          <h1>{product.name[locale]}</h1>
          

          <dl className="specs">
            <div>
              <dt>{d.category}</dt>
              <dd>{dict.shop.categories[product.category]}</dd>
            </div>
            {(selectedMaterials.length > 0 || product.materialsNote) && (
              <div className="specs-materials">
                <dt>{d.materials}</dt>
                <dd>
                  <span className="material-pills">
                    {selectedMaterials.map((material) => {
                      const Icon = material.icon;
                      return (
                        <span className="material-pill" key={material.key}>
                          <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                          {material.name[locale]}
                        </span>
                      );
                    })}
                    {product.materialsNote && <span className="material-pill">{product.materialsNote[locale]}</span>}
                  </span>
                </dd>
              </div>
            )}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <dt>{d.sizes}</dt>
                <dd>{product.sizes.map((s) => s[locale]).join(", ")}</dd>
              </div>
            )}
            {product.availability && (
              <div>
                <dt>{d.availabilityLabel}</dt>
                <dd>{d.availability[product.availability]}</dd>
              </div>
            )}
          </dl>

          <section className="ask" aria-labelledby="ask-title">
            <h2 id="ask-title">{d.askTitle}</h2>
            <p>{d.askText}</p>
            <ContactActions message={message} labels={dict.contactActions} />
          </section>

          <p className="muted">
            {d.commissionLike}{" "}
            <Link className="text-link" href={`/${locale}/commission`}>
              {d.commissionLink}
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
