import Link from "next/link";
import type { Dictionary } from "@/messages/en";
import type { Product } from "@/data/products";
import { messengerUrl } from "@/lib/contact";
import { formatMoney } from "@/lib/format";
import type { Locale } from "@/lib/locales";
import { siteConfig } from "@/site.config";
import { ArtImage } from "./art-image";

interface Props {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  priority?: boolean;
  homeStyle?: boolean;
}

export function ProductTile({ product, locale, dict, priority, homeStyle = false }: Props) {
  const messenger = messengerUrl();
  const hasPrice = product.price !== null || Boolean(product.priceText);
  const price = product.priceText
    ? product.priceText[locale]
    : product.price === null
      ? dict.common.askPrice
      : formatMoney(product.price, locale, siteConfig.currency.symbol);

  const detailHref = `/${locale}/shop/${product.slug}`;
  const sizeText = product.sizes?.map((s) => s[locale]).filter(Boolean).join(", ");
  const categoryHref = `/${locale}/shop?category=${product.category}`;

  return (
    <article className={`tile product-card${homeStyle ? " home-product-card" : ""}`}>
      <Link className="product-card-main" href={homeStyle ? categoryHref : detailHref}>
        <figure>
          <div className="frame">
            <span className="product-badge">{dict.shop.categories[product.category]}</span>
            <ArtImage
              product={product}
              image={product.images[0]}
              locale={locale}
              placeholderLabel={dict.common.photoSoon}
              sizes="(min-width: 900px) 30vw, (min-width: 560px) 45vw, 90vw"
              priority={priority}
            />
            <span className="product-price-badge">{hasPrice ? price : dict.common.priceSoon}</span>
          </div>
          <figcaption className="label">
            <span className="label-name">{product.name[locale]}</span>

            <span className="label-meta">{product.description?.[locale] ?? dict.product.noDescription}</span>
            {homeStyle && sizeText && (
              <span className="label-size">
                <b>{dict.product.sizes}:</b> {sizeText}
              </span>
            )}
            <span className={hasPrice ? "label-price" : "label-price is-ask"}>{hasPrice ? price : dict.common.priceSoon}</span>
          </figcaption>
        </figure>
      </Link>

      <div className="product-card-actions">
        {homeStyle ? (
          <Link className="text-link" href={categoryHref}>
            {dict.common.seeMore} →
          </Link>
        ) : (
          <Link className="text-link" href={detailHref}>
            {dict.common.viewDetails} →
          </Link>
        )}
        {messenger ? (
          <a className="product-order" href={messenger} target="_blank" rel="noopener noreferrer">
            {dict.common.orderOnMessenger}
          </a>
        ) : (
          <span className="product-order">{dict.common.orderOnMessenger}</span>
        )}
      </div>
    </article>
  );
}