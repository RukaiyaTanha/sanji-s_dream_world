import { siteConfig } from "@/site.config";

/** Returns a wa.me link with the message prefilled, or null while WhatsApp is not configured. */
export function whatsappUrl(text = ""): string | null {
  const digits = siteConfig.contact.whatsappNumber.replace(/\D/g, "");
  if (digits.length < 8) return null;
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}

/** Returns a Messenger conversation link, or null while no Page is configured. */
export function messengerUrl(): string | null {
  const value = siteConfig.contact.facebookId.trim() || siteConfig.contact.messengerPage.trim();
  if (!value) return null;
  if (/^https?:\/\//i.test(value)) {
    const match = value.match(/(?:facebook\.com|m\.me)\/([^/?#]+)/i);
    return match?.[1] ? `https://m.me/${match[1]}` : value;
  }
  return `https://m.me/${value.replace(/^@/, "").replace(/^\/+/, "")}`;
}
