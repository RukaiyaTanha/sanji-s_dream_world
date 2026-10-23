/**
 * SITE SETTINGS — the one place for brand name, currency and contact channels.
 *
 * WhatsApp and Messenger stay DISABLED until you fill them in below.
 * Nothing here is a secret: these values end up in the browser.
 */
export const siteConfig = {
  name: "Sanji's DreamWorld",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** Default currency for prices in data/products.ts. Change the symbol/code here. */
  currency: { code: "BDT", symbol: "৳" },

  contact: {
    /**
     * WhatsApp number in international format, digits only, no "+" or spaces.
     * Example for a Bangladesh number: "8801XXXXXXXXX".
     * Empty string = WhatsApp buttons stay disabled.
     */
    whatsappNumber: "8801742864344",

    /**
     * Facebook Page username (e.g. "mypagename") or the full Messenger URL
     * (e.g. "https://m.me/mypagename"). Empty string = Messenger buttons stay disabled.
     */
    facebookId: "sadiyasanjida2",
    messengerPage: "https://www.facebook.com/sadiyasanjida2",

    /**
     * Optional form endpoint (JSON POST). Set NEXT_PUBLIC_FORM_ENDPOINT in .env.local
     * or in the Vercel project settings. Without it the form only prepares a message.
     */
    formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
  },

  /**
   * Budget choices offered in the Commission Planner. These are the visitor's own
   * budget bands, NOT your prices. Edit the numbers freely (in the default currency).
   */
  budgetBands: [1000, 3000, 5000, 7000, 10000],

  social: {
    facebook: "https://www.facebook.com/sadiyasanjida2",
    instagram: "https://www.instagram.com/_s.dreamworld/",
    youtube: "https://www.youtube.com/channel/UCZWldplwvT2kuh5g9BXfSuQ",
    pinterest: "https://www.pinterest.com/sanjida930/",
    phone: "01742864344",
    secondaryPhone: "",
  },
} as const;
