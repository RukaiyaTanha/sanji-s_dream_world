export type ReviewShot = {
  /** File name inside public/images/reviews/ */
  file: string;
  /** Customer first name, shown under the screenshot. Leave empty to show no caption. */
  name?: string;
};

export type ReviewHighlight = {
  quote: string;
  name: string;
  product?: string;
};

/** Add the real file names and customer names here. */
export const reviewShots: ReviewShot[] = [
  { file: "review-01.jpeg", name: "" },
  { file: "review-02.jpeg", name: "" },
  { file: "review-03.jpeg", name: "" },
  { file: "review-04.jpeg", name: "" },
  { file: "review-05.jpeg", name: "" },
  { file: "review-06.jpeg", name: "" },
  { file: "review-07.jpeg", name: "" },
  { file: "review-08.jpeg", name: "" },
  { file: "review-09.jpeg", name: "" },
  { file: "review-10.jpeg", name: "" },
  { file: "review-11.jpeg", name: "" },
  { file: "review-12.jpeg", name: "" },
  { file: "review-13.jpeg", name: "" },
  { file: "review-14.jpeg", name: "" },
  { file: "review-15.jpeg", name: "" },
  { file: "review-16.jpeg", name: "" },
  { file: "review-17.jpeg", name: "" },
  { file: "review-18.jpeg", name: "" },
  { file: "review-19.jpeg", name: "" },
  { file: "review-20.jpeg", name: "" },
  { file: "review-21.jpeg", name: "" },
  { file: "review-22.jpeg", name: "" },
  { file: "review-23.jpeg", name: "" }, 
  { file: "review-24.jpeg", name: "" },
  { file: "review-25.jpeg", name: "" },
  { file: "review-26.jpeg", name: "" },
];

/**
 * Large quote cards that appear between the screenshots (up to 3 are used).
 * Leave the array empty to hide them. Only use real customer words.
 * Example: { quote: "…", name: "Nusrat", product: "Miniature model" }
 */
export const reviewHighlights: ReviewHighlight[] = [];

/** Keep these the same as the numbers on your home page. */
export const reviewStats = { clients: 550, repeat: 56 };