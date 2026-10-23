import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import { ContactChannel } from "@/components/contact-channel";
import { Breadcrumb } from "@/components/breadcrumb";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/contact", dict.meta.contactTitle, dict.meta.contactDesc);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const c = dict.contact;

  return (
    <div className="contact-page">
      <Breadcrumb locale={locale} items={[{ label: dict.nav.home }, { label: dict.nav.contact }]} />
      <section className="contact-hero">
        <div className="wrap">
          <p className="eyebrow">{c.heroEyebrow}</p>
          <h1>{c.heroTitle}</h1>
          <p className="lead">{c.heroText}</p>
        </div>
      </section>
      <div className="wrap contact-content">
        <div className="contact-cards" aria-label={c.channelsTitle}>
          <ContactChannel
            href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
            external
            className="contact-card-whatsapp"
            icon={<img className="channel-logo" src="/images/whatsapp-icon-free-png.webp" alt="" />}
            title={c.whatsappCard}
            hint={c.whatsappHint}
            value={siteConfig.social.phone}
            action={c.openChat}
          />
          <ContactChannel
            href={siteConfig.contact.messengerPage}
            external
            className="contact-card-messenger"
            icon={<img className="channel-logo" src="/images/msg.jpg" alt="" />}
            title={c.messengerCard}
            hint={c.messengerHint}
            value="Sanji's DreamWorld"
            action={c.openChat}
          />
        </div>
        <p className="contact-next-step">{c.commissionNudge}</p>
      </div>
    </div>
  );
}
