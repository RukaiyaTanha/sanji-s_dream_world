import type { Metadata } from "next";
import Link from "next/link";
import { Quote } from "lucide-react";
import { notFound } from "next/navigation";
import { HomeMaterials } from "@/components/home-materials";
import { CountUp } from "@/components/count-up";
import { ProductTile } from "@/components/product-tile";
import { HomeHero } from "@/components/home-hero";
import { StudioSection } from "@/components/studio-section";
import { featuredProducts } from "@/data/products";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";
import Image from "next/image";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { ...pageMetadata(locale, "", dict.meta.homeTitle, dict.meta.homeDesc), title: { absolute: dict.meta.homeTitle } };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const shelf = featuredProducts();
  const h = dict.home;

  return (
    <>
      <HomeHero locale={locale} copy={h} />
      <StudioSection locale={locale} copy={h} />

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>{h.featuredTitle}</h2>
            <Link className="text-link" href={`/${locale}/shop`}>
              {h.featuredAll}
            </Link>
          </div>
          <div className="masonry home-product-grid">
            {shelf.map((product) => (
              <ProductTile key={product.id} product={product} locale={locale} dict={dict} homeStyle />
            ))}
          </div>
        </div>
      </section>

      <section className="stats-band" aria-label={h.statsTitle}>
        <div className="wrap stats-grid">
          <div><strong><CountUp value={270} suffix="+" /></strong><span>{h.statsArtworks}</span></div>
          <div><strong><CountUp value={56} suffix="+"/></strong><span>{h.statsRepeat}</span></div>
          <div><strong><CountUp value={550} suffix="+"/></strong><span>{h.statsClients}</span></div>
        </div>
      </section>

      <HomeMaterials locale={locale} dict={dict} />

      <section className="section section-tint process-review">
        <div className="wrap process-review-grid">
          <div className="process-timeline">
            <h2>{h.stepsTitle}</h2>
            <ol className="steps">
              {h.steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="review-preview">
            <Quote className="review-quote-icon" aria-hidden="true" size={56} strokeWidth={1.5} />
            <div className="review-stars" aria-hidden="true">★★★★★</div>
            <h2>{h.reviewTitle}</h2>
            <p className="lead">{h.reviewText}</p>
            <Link className="btn btn-primary" href={`/${locale}/reviews`}>{h.reviewCta}</Link>
          </div>
        </div>
      </section>

      {siteConfig.social.facebook && (
  <section className="section social-banner-section">
    <div className="wrap">
      <a className="facebook-banner" href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer">
        <span className="facebook-banner-icon" aria-hidden="true">
          <Image src="/images/fb-logo.png" alt="" width={56} height={56} className="facebook-logo-img" />
        </span>
        <span className="facebook-banner-copy">
          <strong>{h.facebookTitle}</strong>
          <span>{h.facebookText}</span>
        </span>
        <span className="facebook-banner-button">
          <Image src="/images/fb-logo.png" alt="" width={24} height={24} className="facebook-mark-img" />
          {h.facebookCta} ↗
        </span>
      </a>
    </div>
  </section>
)}

    </>
  );
}
