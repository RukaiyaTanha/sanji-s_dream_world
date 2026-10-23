/*
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { ReviewScreenshot } from "@/components/review-screenshot";
import { Breadcrumb } from "@/components/breadcrumb";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/reviews", dict.reviews.title, dict.reviews.intro);
}

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const reviews = getDictionary(locale).reviews;

  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: getDictionary(locale).nav.home }, { label: getDictionary(locale).nav.reviews }]} />
      <div className="wrap page reviews-page">
      <header className="page-head narrow">
        <p className="eyebrow">DreamWorld / {getDictionary(locale).nav.reviews}</p>
        <h1>{reviews.title}</h1>
        <p className="lead">{reviews.intro}</p>
      </header>
      <div className="reviews-grid">
        {reviews.items.map((review, index) => (
          <article className="review-card" key={review.name}>
            <ReviewScreenshot
              src={`/images/reviews/review-${String(index + 1).padStart(2, "0")}.png`}
              alt={`${review.name} feedback screenshot`}
            />
          </article>
        ))}
      </div>
      <div className="review-placeholder">
        <span aria-hidden="true">+</span>
        <p>{reviews.emptyLabel}</p>
      </div>
      </div>
    </>
  );
}
*/

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/breadcrumb";
import { ReviewWall } from "@/components/review-wall";
import { reviewHighlights, reviewShots } from "@/data/reviews";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/reviews", dict.reviews.title, dict.reviews.intro);
}

export default async function ReviewsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const r = dict.reviews;
  

  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: dict.nav.home }, { label: dict.nav.reviews }]} />
      <div className="wrap page reviews-page">
        <header className="page-head narrow">
          <p className="eyebrow">DreamWorld / {dict.nav.reviews}</p>
          <h1>{r.title}</h1>
          <p className="lead">{r.intro}</p>
          
        </header>

        <ReviewWall
          shots={reviewShots.map((s) => ({
            id: s.file,
            src: `/images/reviews/${s.file}`,
            name: s.name || undefined,
          }))}
          quotes={reviewHighlights.slice(0, 3)}
          labels={{
            lightbox: r.lightbox,
            open: r.open,
            close: r.close,
            prev: r.prev,
            next: r.next,
            alt: r.alt,
            altNoName: r.altNoName,
          }}
        />

        <section className="rw-share">
          <span className="rw-share-icon" aria-hidden="true">+</span>
          <div>
            <h2>{r.shareTitle}</h2>
            <p>{r.shareText}</p>
          </div>
        </section>

        <section className="rw-cta">
          <div>
            <h2>{r.ctaTitle}</h2>
            <p>{r.ctaText}</p>
          </div>
          <Link className="btn btn-light" href={`/${locale}/contact`}>
            {dict.home.ctaButton}
          </Link>
        </section>
      </div>
    </>
  );
}