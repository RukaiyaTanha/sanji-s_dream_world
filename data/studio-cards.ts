import type { ProductCategory } from "@/data/products";
import { products } from "@/data/products";
import type { Localized } from "@/lib/locales";

export interface StudioCard {
  category: ProductCategory;
  image: string;
  label: Localized;
  href: string;
}

function categoryImage(category: ProductCategory): string {
  return products.find((product) => product.category === category)?.images[0]?.src ?? "";
}

export const STUDIO_CARDS: StudioCard[] = [
  {
    category: "painting",
    image: categoryImage("painting"),
    label: { en: "Paintings", bn: "পেইন্টিং" },
    href: "/shop?category=painting",
  },
  {
    category: "clay",
    image: categoryImage("clay"),
    label: { en: "Clay & showpieces", bn: "ক্লে ও শোপিস" },
    href: "/shop?category=clay",
  },
  {
    category: "artbook",
    image: categoryImage("artbook"),
    label: { en: "ArtBooks & gifts", bn: "আর্টবুক ও উপহার" },
    href: "/shop?category=artbook",
  },
];

export const STUDIO_SLIDES: { src: string; alt: Localized }[] = [
  { src: "/images/studio/1.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/2.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/3.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/4.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/5.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/6.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/7.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/8.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/9.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/10.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/11.jpeg", alt: { en: "", bn: "" } },
  { src: "/images/studio/12.jpeg", alt: { en: "", bn: "" } },
  // add more lines here
];
