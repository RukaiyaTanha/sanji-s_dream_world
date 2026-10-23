import type { Localized } from "@/lib/locales";
import type { MaterialKey } from "@/data/materials";


export type ProductCategory = "miniature" | "village" | "keyholder" | "clay" | "painting" | "magnet" | "artbook" | "showpiece" | "clock" | "fairy";

export interface ProductImage {
  src: string;
  alt: Localized;
}

export interface Product {
  id: string;
  slug: string;
  category: ProductCategory;
  name: Localized;
  description?: Localized;
  sizes?: Localized[];
  /** Add extra image paths here to enable the slider. */
  gallery?: string[];
  /** Add material keys here, e.g. [‘wood’, ‘resin’, ‘moss’]. */
  materials?: MaterialKey[];
  materialsNote?: { bn: string; en: string };
  /** Confirmed price in the default currency, or null for "Ask for Price". */
  price: number | null;
  priceText?: Localized;
  availability?: "available" | "madeToOrder" | "sold";
  images: ProductImage[];
  aspect?: string;
  featured?: boolean;
  homeOnly?: boolean;
  
}

export const categoryOrder: ProductCategory[] = [
  "miniature", "village", "keyholder", "clay", "painting", "magnet", "artbook", "showpiece", "clock", "fairy"
];

export const defaultAspect: Record<ProductCategory, string> = {
  miniature: "1 / 1",
  village: "4 / 3",
  keyholder: "1 / 1",
  clay: "1 / 1",
  painting: "4 / 5",
  magnet: "1 / 1",
  artbook: "3 / 4",
  showpiece: "3 / 4",
  clock: "1 / 1",
  fairy: "1 / 1",
};

const placeholderMaterials: Record<ProductCategory, MaterialKey[]> = {
  miniature: ["clay", "mdf", "pvc", "cardboard"],
  village: ["clay", "mdf", "pvc", "crokshit", "cardboard"],
  keyholder: ["clay", "mdf", "pvc"],
  clay: ["clay", "mdf"],
  painting: ["color", "canvas"],
  magnet: ["clay"],
  artbook: ["clay"],
  showpiece: ["clay", "pvc"],
  clock: ["clay", "mdf"],
  fairy: ["clay", "mdf", "pvc"],
};

const paintingImages: ProductImage[] = Array.from({ length: 66 }, (_, index) => {
  const number = index + 1;
  return {
    src: `/images/painting/${number}.jpg`,
    alt: { en: `Painting ${number}`, bn: `পেইন্টিং ${number}` },
  };
});

const clayImageNames = [ "5.jpg","13.jpg","18.jpg","6.jpeg","2.jpg", "3.jpg","7.png", "24.jpeg","8.png", "9.png", "10.png",
    "14.jpg", "15.jpg", "16.jpg", "17.jpg",  "19.jpg",
   "22.jpg", "23.jpg"];

const clayImages: ProductImage[] = clayImageNames.map((name, index) => {
  const number = index + 1;
  return {
    src: `/images/3dclay/${name}`,
    alt: { en: `Clay art ${number}`, bn: `ক্লে আর্ট ${number}` },
  };
});

const artbookImageNames = [
  "1.jpg", "2.jpg", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.jpg",
  "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg",
  "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg",
];

const artbookImages: ProductImage[] = artbookImageNames.map((name, index) => {
  const number = index + 1;
  return {
    src: `/images/artbook/${name}`,
    alt: { en: `ArtBook ${number}`, bn: `আর্টবুক ${number}` },
  };
});

const showpieceImageNames = [
  "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg","11.jpeg","12.jpeg",
];

const showpieceImages: ProductImage[] = showpieceImageNames.map((name, index) => {
  const number = index + 1;
  return {
    src: `/images/showp/${name}`,
    alt: { en: `Showpiece ${number}`, bn: `শোপিস ${number}` },
  };
});

const miniatureImageNames = ["1.jpeg", "2.jpeg", "3.jpeg","4.jpeg"];
const miniatureImages: ProductImage[] = miniatureImageNames.map((name, index) => ({
  src: `/images/miniature/${name}`,
  alt: { en: `Miniature model ${index + 1}`, bn: `মিনিয়েচার মডেল ${index + 1}` },
}));

const villageImageNames = ["1.jpeg"];
const villageImages: ProductImage[] = villageImageNames.map((name, index) => ({
  src: `/images/village/${name}`,
  alt: { en: `Village model ${index + 1}`, bn: `ভিলেজ মডেল ${index + 1}` },
}));

const keyholderImageNames = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"];
const keyholderImages: ProductImage[] = keyholderImageNames.map((name, index) => ({
  src: `/images/keyholder/${name}`,
  alt: { en: `Keyholder ${index + 1}`, bn: `কিহোল্ডার ${index + 1}` },
}));

const magnetImageNames = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg"];
const magnetImages: ProductImage[] = magnetImageNames.map((name, index) => ({
  src: `/images/magnet/${name}`,
  alt: { en: `Magnet ${index + 1}`, bn: `ম্যাগনেট ${index + 1}` },
}));

const clockImageNames = ["1.jpg", "2.jpeg", "11.png", "20.jpg"];
const clockImages: ProductImage[] = clockImageNames.map((name, index) => ({
  src: `/images/clock/${name}`,
  alt: { en: `Clock ${index + 1}`, bn: `ঘড়ি ${index + 1}` },
}));

const fairyImageNames = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg"];
const fairyImages: ProductImage[] = fairyImageNames.map((name, index) => ({
  src: `/images/fairy/${name}`,
  alt: { en: `Fairy house ${index + 1}`, bn: `ফেয়ারি হাউস ${index + 1}` },
}));

function imageProducts(
  category: ProductCategory,
  prefix: string,
  name: Localized,
  description: Localized,
  images: ProductImage[],
): Product[] {
  return images.map((image, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `${prefix}-${number}`,
      slug: `${category}-${number}`,
      category,
      name: {
        en: `${name.en} ${number}`,
        bn: `${name.bn} ${number}`,
      },
      description: {
        en: `${description.en} ${number}. Ask about availability, size and price.`,
        bn: `${description.bn} ${number}। প্রাপ্যতা, মাপ ও দাম জানতে যোগাযোগ করুন।`,
      },
      price: null,
      images: [image],
      gallery: [],
      materials: placeholderMaterials[category],
      featured: index < 3,
    };
  });
}

function manual(category: ProductCategory, serial: string, src: string, homeOnly = false): Product {
  return {
    id: `${category.toUpperCase()}-${serial}`,
    slug: `${category}-${serial}`,
    category,
    name: { en: category, bn: category },
    price: null,
    images: [{ src, alt: { en: category, bn: category } }],
    gallery: [],
    materials: placeholderMaterials[category],
    featured: true,
    homeOnly,
  };
}

const baseProducts: Product[] = [
    manual("miniature", "home", "/images/miniature/1.jpeg",true),
  manual("village", "home", "/images/village/1.jpeg",true),
  manual("keyholder", "home", "/images/keyholder/1.jpeg",true),
  manual("clay", "home", "/images/3dclay/12.jpeg", true),
  manual("painting", "home", "/images/painting/1.jpg", true),
  manual("magnet", "home", "/images/magnet/1.jpeg", true),
  manual("artbook", "home", "/images/artbook/9.png", true),
  manual("showpiece", "home", "/images/showp/27.jpeg", true),
  manual("clock", "home", "/images/clock/1.jpg", true),
  manual("fairy", "home", "/images/fairy/1.jpeg", true),

  ...imageProducts(
    "painting",
    "PT",
    { en: "Painting", bn: "পেইন্টিং" },
    { en: "Hand-painted artwork", bn: "হাতে আঁকা শিল্পকর্ম" },
    paintingImages,
  ),
  ...imageProducts(
    "clay",
    "CL",
    { en: "Clay Art", bn: "ক্লে আর্ট" },
    { en: "Handmade 3D clay artwork", bn: "হাতে তৈরি ৩ডি ক্লে শিল্পকর্ম" },
    clayImages,
  ),
  ...imageProducts(
    "artbook",
    "AB",
    { en: "ArtBook", bn: "আর্টবুক" },
    { en: "Handmade ArtBook piece", bn: "হাতে তৈরি আর্টবুক" },
    artbookImages,
  ),
  ...imageProducts(
    "showpiece",
    "SP",
    { en: "Showpiece", bn: "শোপিস" },
    { en: "Handmade showpiece", bn: "হাতে তৈরি শোপিস" },
    showpieceImages,
  ),
    ...imageProducts(
    "miniature",
    "MN",
    { en: "Miniature Model", bn: "মিনিয়েচার মডেল" },
    { en: "Handmade miniature model", bn: "হাতে তৈরি মিনিয়েচার মডেল" },
    miniatureImages,
  ),
  ...imageProducts(
    "village",
    "VL",
    { en: "Village Model", bn: "ভিলেজ মডেল" },
    { en: "Handmade miniature village model", bn: "হাতে তৈরি মিনিয়েচার ভিলেজ মডেল" },
    villageImages,
  ),
  ...imageProducts(
    "keyholder",
    "KH",
    { en: "Keyholder", bn: "কিহোল্ডার" },
    { en: "Handmade keyholder", bn: "হাতে তৈরি কিহোল্ডার" },
    keyholderImages,
  ),
  ...imageProducts(
    "magnet",
    "MG",
    { en: "Magnet", bn: "ম্যাগনেট" },
    { en: "Handmade fridge magnet", bn: "হাতে তৈরি ফ্রিজ ম্যাগনেট" },
    magnetImages,
  ),
  ...imageProducts(
    "clock",
    "CK",
    { en: "Clock", bn: "ঘড়ি" },
    { en: "Handmade clock", bn: "হাতে তৈরি ঘড়ি" },
    clockImages,
  ),
  ...imageProducts(
    "fairy",
    "FH",
    { en: "Fairy House", bn: "ফেয়ারি হাউস" },
    { en: "Handmade fairy house", bn: "হাতে তৈরি ফেয়ারি হাউস" },
    fairyImages,
  ),
  
];

const nameLists: Partial<Record<ProductCategory, [string, string][]>> = {
  miniature: [
    ["Mediterranean Courtyard House", "মেডিটেরেনিয়ান কোর্টইয়ার্ড হাউস"],
    ["Santorini Escape : The Miniature Terrace", "সান্টোরিনি এস্কেপ : দ্য মিনিয়েচার টেরেস"],
    ["Santorini Corner", "সান্টোরিনি কর্নার"],
    ["Santorini Bougainvillea", "সান্টোরিনি বুগেনভিলিয়া"],
  ],
  village:   [
    ["A little piece of Grandma’s home", "এক টুকরো নানুর বাড়ি "]],
  keyholder: [
    ["Rustic Cottage Keyholder", "রাস্টিক কটেজ কি-হোল্ডার"],
    ["Miniature House Keyholder", "মিনিয়েচার হাউস কি-হোল্ডার"],
    ["Sea-beach Keyholder", "সী-বিচ কি-হোল্ডার"],
    ["Sea-beach Keyholder", "সী-বিচ কি-হোল্ডার"],
    ["Sweet Home Keyholder", "সুইট হোম কি-হোল্ডার"],
    ["Apple Tree Fairy Cottage Keyholder", "আপেল ট্রি ফেয়ারি কটেজ কি-হোল্ডার"],
  ],
  magnet:    [
    ["Travel Magnet", "ট্রাভেল ম্যাগনেট"],
    ["Travel Magnet", "ট্রাভেল ম্যাগনেট"],
    ["Mashroom Magnet", "মাশরুম ম্যাগনেট"],
    ["Mosque Magnet", "মসজিদের ম্যাগনেট"],
    ["Food Magnet", "খাবারের ম্যাগনেট"],
    ["Greece Magnet", "গ্রিস ম্যাগনেট"],
    ["Bali Magnet", "বালি ম্যাগনেট"],
  ],
  painting: [
    ["Village Scenery", "গ্রামের দৃশ্য"],   // painting-01
    ["Ramen Bowl", "রামেন বাউল"],            // painting-02            // painting-03
    ["", ""],                                // painting-04 (not named yet)
  ],
  clay: [
    ["",""], // clay-01
  ],
  artbook: [],
  showpiece: [],
  clock: [
    ["Rose Elegance Clock","রোজ এলিগেন্স ক্লক"],
    ["Ornate Rose Clock","অর্নেট রোজ ক্লক"],
    ["Harvest Fruit Clock","হারভেস্ট ফ্রুট ক্লক"],
    ["Galaxy Moon Clock","গ্যালাক্সি মুন ক্লক"],
  ],
  fairy: [],
};

// Extra photos per product. Key = slug, value = list of file paths.
// The main photo (shown first) is the product's own photo. These come after it.
const galleries: Record<string, string[]> = {
  "artbook-01": [],
  "painting-02": [
    "/images/painting/extra/2-detail.jpg",
  ],
  "miniature-01": [
    "/images/miniature/1.1.jpeg",
    "/images/miniature/1.2.jpeg",
    "/images/miniature/1.3.jpeg",
    "/images/miniature/1.4.jpeg",
  ],
  "miniature-02": [
    "/images/miniature/2.1.jpeg",
    "/images/miniature/2.2.jpeg",
    "/images/miniature/2.3.jpeg",
  ],
  "miniature-03": [
    "/images/miniature/3.1.jpeg",
    "/images/miniature/3.2.jpeg",
    "/images/miniature/3.3.jpeg",
  ],
  "miniature-04": [
    "/images/miniature/4.1.jpeg",
  ],
  "village-01": [
    "/images/village/1.9.jpg",
    "/images/village/1.11.jpg",
    "/images/village/1.1.jpg",
    "/images/village/1.2.jpg",
    "/images/village/1.3.jpg",
    "/images/village/1.4.jpg",
    "/images/village/1.5.jpg",
    "/images/village/1.6.jpg",
    "/images/village/1.7.jpg",
    "/images/village/1.8.jpg",
  ],
  "keyholder-01": [
    "/images/keyholder/1.1.jpeg",
    "/images/keyholder/1.2.jpeg",
  ],
  "keyholder-02": [
    "/images/keyholder/2.1.jpeg",
  ],
  "keyholder-05": [
    "/images/keyholder/5.1.jpeg",
  ],
  "keyholder-06": [
    "/images/keyholder/6.1.jpeg",
  ],
  "clay-01": [
    "/images/3dclay/extra/1-back.jpg",
    "/images/3dclay/extra/1-side.jpg",
  ],
  "magnet-03": [
    "/images/magnet/3.1.jpeg",
    "/images/magnet/3.2.jpeg",
  ],
  "fairy-01": [
    "/images/fairy/1.2.jpeg",
  ],
  "fairy-02": [
    "/images/fairy/2.1.jpeg",
  ],
  "fairy-03": [
    "/images/fairy/3.1.jpeg",
    "/images/fairy/3.2.jpeg",
  ],
  "fairy-04": [
    "/images/fairy/4.1.jpeg",
  ],
  "fairy-05": [
    "/images/fairy/5.1.jpeg",
  ],
  "fairy-06": [
    "/images/fairy/6.1.jpeg",
  ],
  "showpiece-01": [
    "/images/showp/1.2.jpeg",
  ],
  "showpiece-04": [
    "/images/showp/4.1.jpeg",
  ],
  "showpiece-05": [
    "/images/showp/5.1.jpeg",
  ],
  "showpiece-06": [
    "/images/showp/6.1.jpeg",
  ],
  "showpiece-12": [
    "/images/showp/12.1.jpeg",
    "/images/showp/12.2.jpeg",
  ],
  // add one line per product: "category-number": ["/images/....jpg", ...],
};

type ProductOverride = Partial<
  Pick<Product, "name" | "description" | "price" | "priceText" | "sizes" | "availability" | "materials" | "materialsNote" | "featured" | "images" | "gallery">
>;

const overrides: Record<string, ProductOverride> = {
"painting-home": {
  name: { en: "", bn: "" },
  description: {
    en: "Hand-painted artworks featuring landscapes, village scenery, nature, and custom designs in various sizes.",
    bn: "গ্রামের দৃশ্য, প্রকৃতি ও কাস্টম ডিজাইনের বিভিন্ন মাপের হাতে আঁকা পেইন্টিং।",
  },
  price: null,
  priceText: { en: "BDT 500 – BDT 10,000", bn: "৳ ৫০০ – ৳ ১০,০০০ " },
  sizes: [{ en: "4\" – 30\"", bn: "৪\" – ৩০\"" }],
  images: [
    {
      src: "/images/painting/39.jpg",
      alt: { en: "Village scenery painting", bn: "গ্রামের দৃশ্যের পেইন্টিং" },
    },
  ],
  gallery: [],
},

"miniature-home": {
  name: { en: "", bn: "" },
  description: {
    en: "Handcrafted miniature houses, gardens, and architectural scenes with intricate details.",
    bn: "নিখুঁত কারুকাজে তৈরি মিনিয়েচার বাড়ি, বাগান ও স্থাপত্যের দৃশ্য।",
  },
  price: null,
  priceText: { en: "BDT 2,000 – BDT 5,000", bn: "৳ ২,০০০ – ৳ ৫,০০০ " },
  sizes: [{ en: "6\" – 10\"", bn: "৬\" – ১০\"" }],
  gallery: [],
},

"village-home": {
  name: { en: "", bn: "" },
  description: {
    en: "Handcrafted village models featuring traditional homes, greenery, and scenic landscapes.",
    bn: "ঐতিহ্যবাহী বাড়ি, সবুজ প্রকৃতি ও মনোরম দৃশ্যের হাতে তৈরি গ্রামের মডেল।",
  },
  price: null,
  priceText: { en: "BDT 4,000 – BDT 12,000", bn: "৳ ৪,০০০ – ৳ ১২,০০০ " },
  sizes: [{ en: "8\" – 16\"", bn: "৮\" – ১৬\"" }],
  gallery: [],
},

"keyholder-home": {
  name: { en: "", bn: "" },
  description: {
    en: "Decorative handmade key holders featuring miniature houses and creative designs.",
    bn: "মিনিয়েচার বাড়ি ও সৃজনশীল নকশার হাতে তৈরি ডেকোরেটিভ কি-হোল্ডার।",
  },
  price: null,
  priceText: { en: "BDT 3,000 – BDT 5,000", bn: "৳ ৩,০০০ – ৳ ৫,০০০ " },
  sizes: [{ en: "10\" – 14\"", bn: "১০\" – ১৪\"" }],
  gallery: [],
},

"clay-home": {
  name: { en: "", bn: "" },
  description: {
    en: "Creative handmade clay art featuring decorative pieces, floral designs, and miniatures.",
    bn: "ডেকোরেটিভ পিস, ফুলের নকশা ও মিনিয়েচারের সৃজনশীল ক্লে আর্ট।",
  },
  price: null,
  priceText: { en: "BDT 2,000 – BDT 10,000", bn: "৳ ২,০০০ – ৳ ১০,০০০ " },
  sizes: [{ en: "8\" – 24\"", bn: "৮\" – ২৪\"" }],
  gallery: [],
},

"magnet-home": {
  name: { en: "", bn: "" },
  description: {
    en: "Handmade fridge magnets featuring food, landmarks, travel destinations, and cultural themes.",
    bn: "খাবার, দর্শনীয় স্থান, ভ্রমণ ও সাংস্কৃতিক বিষয়ভিত্তিক হাতে তৈরি ফ্রিজ ম্যাগনেট।",
  },
  price: null,
  priceText: { en: "BDT 200 – BDT 500", bn: "৳ ২০০ – ৳ ৫০০ " },
  sizes: [{ en: "2.5\" – 3\"", bn: "২.৫\" – ৩\"" }],
  gallery: [],
},

"artbook-home": {
  name: { en: "", bn: "" },
  description: {
    en: "Artbooks and sketchbooks featuring creative illustrations and artistic designs.",
    bn: "সৃজনশীল ইলাস্ট্রেশন ও নান্দনিক নকশার আর্টবুক ও স্কেচবুক।",
  },
  price: null,
  priceText: { en: "BDT 400 – BDT 2,000", bn: "৳ ৪০০ – ৳ ২,০০০ " },
  sizes: [{ en: "2\" – 8\"", bn: "২\" – ৮\"" }],
  gallery: [],
},

"showpiece-home": {
  name: { en: "", bn: "" },
  description: {
    en: "Handcrafted decorative showpieces featuring miniature scenes and artistic designs.",
    bn: "মিনিয়েচার দৃশ্য ও নান্দনিক নকশার হাতে তৈরি ডেকোরেটিভ শোপিস।",
  },
  price: null,
  priceText: { en: "BDT 1,000 – BDT 3,000", bn: "৳ ১,০০০ – ৳ ৩,০০০ " },
  sizes: [{ en: "4\" – 6\"", bn: "৪\" – ৬\"" }],
  gallery: [],
},
"clock-home": {
  name: { en: "", bn: "" },
  description: {
    en: "Handmade decorative wall clocks with floral and creative designs.",
    bn: "ফুলের ও সৃজনশীল নকশার হাতে তৈরি ডেকোরেটিভ ওয়াল ক্লক।",
  },
  price: null,
  priceText: { en: "BDT 3,000 – BDT 6,000", bn: "৳ ৩,০০০ – ৳ ৬,০০০ " },
  sizes: [{ en: "12\" – 16\"", bn: "১২\" – ১৬\"" }],
  gallery: [],
},

"fairy-home": {
  name: { en: "", bn: "" },
  description: {
    en: "Handcrafted fairy houses with miniature details and lights.",
    bn: "মিনিয়েচার কারুকাজ ও আলোসহ হাতে তৈরি ফেয়ারি হাউস।",
  },
  price: null,
  priceText: { en: "BDT 2,500 – BDT 4,000", bn: "৳ ২,০০০ – ৳ ৪,০০০ " },
  sizes: [{ en: "6\" – 8\"", bn: "৬\" – ৮\"" }],
  gallery: [],
},
};

//export const products: Product[] = baseProducts.map((p) => ({ ...p, ...overrides[p.slug] }));
export const products: Product[] = baseProducts.map((p) => {
  const num = Number(p.slug.split("-")[1]);
  const entry = nameLists[p.category]?.[num - 1];
  const custom = entry && entry[0] ? { name: { en: entry[0], bn: entry[1] || entry[0] } } : {};
  return { ...p, ...custom, gallery: galleries[p.slug] ?? p.gallery, ...overrides[p.slug] };
});

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function featuredProducts(count = categoryOrder.length): Product[] {
  const picks = categoryOrder
    .map(
      (c) =>
        products.find((p) => p.category === c && p.featured) ??
        products.find((p) => p.category === c),
    )
    .filter((p): p is Product => Boolean(p));
  return picks.slice(0, count);
}
