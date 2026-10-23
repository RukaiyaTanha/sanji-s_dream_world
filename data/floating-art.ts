export type SideItem = {
  src: string;
  side: "l" | "r";
  /** distance from the top of the section, e.g. "20%" */
  top: string;
  /** width in rem, aspect ratio, rotation (deg), opacity, blur (px), float time (s), start offset (s) */
  w: number;
  ar: string;
  r: number;
  o: number;
  b: number;
  d: number;
  delay: number;
};

/** Edit this file to change which pieces float where. */
export const sideArt: Record<"products" | "materials" | "process", SideItem[]> = {
  products: [
    { src: "/images/miniature/2.jpeg", side: "l", top: "6%", w: 9, ar: "1 / 1", r: -6, o: 0.95, b: 0, d: 10, delay: 0 },
    { src: "/images/magnet/3.jpeg", side: "l", top: "38%", w: 6.5, ar: "1 / 1", r: 7, o: 0.55, b: 1.5, d: 13, delay: -4 },
    { src: "/images/fairy/3.jpeg", side: "l", top: "70%", w: 9, ar: "1 / 1", r: 5, o: 0.95, b: 0, d: 11, delay: -7 },
    { src: "/images/painting/1.jpg", side: "r", top: "18%", w: 8, ar: "4 / 5", r: 6, o: 0.95, b: 0, d: 12, delay: -2 },
    { src: "/images/keyholder/2.jpeg", side: "r", top: "50%", w: 6.5, ar: "1 / 1", r: -8, o: 0.55, b: 1.5, d: 14, delay: -6 },
    { src: "/images/showp/4.jpeg", side: "r", top: "80%", w: 8.5, ar: "3 / 4", r: -5, o: 0.95, b: 0, d: 10, delay: -3 },
  ],
  materials: [
    { src: "/images/miniature/3.jpeg", side: "l", top: "20%", w: 8.5, ar: "1 / 1", r: 6, o: 0.95, b: 0, d: 11, delay: -1 },
    { src: "/images/clock/2.jpeg", side: "l", top: "68%", w: 6.5, ar: "1 / 1", r: -7, o: 0.55, b: 1.5, d: 13, delay: -5 },
    { src: "/images/artbook/9.png", side: "r", top: "14%", w: 7, ar: "3 / 4", r: -6, o: 0.55, b: 1.5, d: 12, delay: -3 },
    { src: "/images/3dclay/12.jpeg", side: "r", top: "58%", w: 9, ar: "1 / 1", r: 5, o: 0.95, b: 0, d: 10, delay: -6 },
  ],
  process: [
    { src: "/images/fairy/5.jpeg", side: "l", top: "12%", w: 8, ar: "1 / 1", r: -5, o: 0.95, b: 0, d: 11, delay: 0 },
    { src: "/images/painting/12.jpg", side: "r", top: "62%", w: 7.5, ar: "4 / 5", r: 6, o: 0.95, b: 0, d: 12, delay: -4 },
  ],
};