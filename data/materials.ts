import type { Localized } from "@/lib/locales";
import { Grid3X3, Layers3, Palette, Package , PanelsTopLeft, Image, Amphora,type LucideIcon } from "lucide-react";
export type MaterialKey = "mdf" | "pvc" |"crokshit" | "cardboard" | "clay" | "color" | "canvas" | "other";

export interface Material {
  key: MaterialKey;
  name: Localized;
  englishName: string;
  icon: LucideIcon;
}

export const materials: Material[] = [
{ key: "mdf", name: { en: "MDF", bn: "এমডিএফ" }, englishName: "MDF", icon: PanelsTopLeft },
{ key: "pvc", name: { en: "PVC", bn: "পিভিসি" }, englishName: "PVC", icon: Grid3X3 },
{ key: "crokshit", name: { en: "Crokshit", bn: "ক্রকশিট" }, englishName: "Crokshit", icon: Layers3 },
{ key: "cardboard", name: { en: "Cardboard", bn: "কার্ডবোর্ড" }, englishName: "Cardboard", icon: Package  },
{ key: "clay", name: { en: "Clay", bn: "ক্লে" }, englishName: "Clay", icon: Amphora },
{ key: "color", name: { en: "Color", bn: "রং" }, englishName: "Color", icon: Palette  },
{ key: "canvas", name: { en: "Canvas", bn: "ক্যানভাস" }, englishName: "Canvas", icon: Image  },

];
