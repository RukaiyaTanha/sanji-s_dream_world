import Image from "next/image";
import { defaultAspect, type Product, type ProductImage } from "@/data/products";
import type { Locale } from "@/lib/locales";

interface Props {
  product: Product;
  image?: ProductImage;
  locale: Locale;
  placeholderLabel: string;
  sizes: string;
  priority?: boolean;
}

/**
 * Shows a product photo inside a fixed-ratio frame, or a neutral placeholder when no photo exists yet.
 * The ratio comes from product.aspect (or the category default), so layout never jumps while loading.
 */
export function ArtImage({ product, image, locale, placeholderLabel, sizes, priority }: Props) {
  const ratio = product.aspect ?? defaultAspect[product.category];
  return (
    <div className="art" style={{ aspectRatio: ratio }}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt[locale]}
          fill
          sizes={sizes}
          priority={priority}
          className="art-img"
        />
      ) : (
        <div className="art-placeholder" role="img" aria-label={`${product.name[locale]} — ${placeholderLabel}`}>
          <span>{placeholderLabel}</span>
        </div>
      )}
    </div>
  );
}
