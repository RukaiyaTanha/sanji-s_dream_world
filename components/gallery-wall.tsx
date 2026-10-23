import Link from "next/link";
import { Gift, Hand, Sparkles } from "lucide-react";
import type { Dictionary } from "@/messages/en";
import type { Product } from "@/data/products";
import type { Locale } from "@/lib/locales";
import { ArtImage } from "./art-image";

const badgeIcons = [Hand, Gift, Sparkles];

export function GalleryWall({ items, locale, dict }: { items: Product[]; locale: Locale; dict: Dictionary }) {
  const [featured, ...supporting] = items;
  const badges = [
    { icon: badgeIcons[0], label: dict.home.heroBadgeHandmade },
    { icon: badgeIcons[1], label: dict.home.heroBadgeGift },
    { icon: badgeIcons[2], label: dict.home.heroBadgeFinish },
  ];

  return (
    <div className="hero-art" aria-label={dict.home.wallLabel}>
      <div className="hero-badges">
        {badges.map(({ icon: Icon, label }) => (
          <span className="hero-badge" key={label}>
            <Icon aria-hidden="true" size={16} />
            {label}
          </span>
        ))}
      </div>
      <Link className="hero-featured" href={`/${locale}/shop/${featured.slug}`}>
        <ArtImage
          product={featured}
          image={featured.images[0]}
          locale={locale}
          placeholderLabel={dict.common.photoSoon}
          sizes="(min-width: 900px) 42vw, 92vw"
          priority
        />
        <span className="hero-caption">
          <small>{dict.home.heroCaption}</small>
          <strong>{featured.name[locale]}</strong>
        </span>
      </Link>
      {supporting.map((product, index) => (
        <Link
          key={product.id}
          className={`hero-polaroid hero-polaroid-${index + 1}`}
          href={`/${locale}/shop/${product.slug}`}
        >
          <ArtImage
            product={product}
            image={product.images[0]}
            locale={locale}
            placeholderLabel={dict.common.photoSoon}
            sizes="(min-width: 900px) 16vw, 40vw"
          />
          <span>{product.name[locale]}</span>
        </Link>
      ))}
    </div>
  );
}
