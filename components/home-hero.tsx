/*
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { useState } from "react";
import type { Dictionary } from "@/messages/en";
import type { Locale } from "@/lib/locales";

const HERO_IMAGE = "/images/image.png";

export function HomeHero({ locale, copy }: { locale: Locale; copy: Dictionary["home"] }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      {!imageFailed && (
        <Image
          className="home-hero-image"
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="home-hero-overlay" />
      <div className="home-hero-content">
        <div className="home-hero-heading">
          <h1 id="home-hero-title">
            <span lang={locale}>{copy.heroTitleLead}</span>
            <span className="home-hero-accent" lang={locale}>
              {copy.heroTitleAccent}
              <svg className="home-hero-squiggle" viewBox="0 0 240 18" aria-hidden="true">
                <path d="M3 11c38-9 58 4 91-1 37-6 65-6 143-1" />
              </svg>
            </span>
            <Leaf className="home-hero-leaf" aria-hidden="true" />
          </h1>
        </div>
        <p className="home-hero-script" lang={locale}>{copy.heroTagline}</p>
        <p className="home-hero-description" lang={locale}>{copy.heroText}</p>
        <div className="home-hero-actions">
          <Link className="btn btn-primary" lang={locale} href={`/${locale}/shop`}>
            {copy.heroShop} <ArrowRight aria-hidden="true" size={17} />
          </Link>
          <Link className="btn home-hero-secondary" lang={locale} href={`/${locale}/commission`}>
            {copy.heroCommission}
          </Link>
        </div>
      </div>
      <div className="home-hero-stamp" aria-label={copy.heroStamp}>
        <Leaf aria-hidden="true" size={18} />
        <span>{copy.heroStamp}</span>
        <span className="home-hero-stamp-lines">〰〰</span>
      </div>
    </section>
  );
}
*/
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";
import { useState, type CSSProperties } from "react";
import type { Dictionary } from "@/messages/en";
import type { Locale } from "@/lib/locales";

const HERO_IMAGE = "/images/image.png";

type Floater = {
  src: string;
  /** width (rem), aspect ratio, rotation, opacity, blur (px), float time (s), start offset (s) */
  w: number;
  ar: string;
  r: number;
  o: number;
  b: number;
  d: number;
  delay: number;
  pos: CSSProperties;
  /** hidden on small screens */
  extra?: boolean;
};

/** Edit this list to change the floating pieces. */
const FLOATERS: Floater[] = [
  { src: "/images/miniature/1.jpeg", w: 11, ar: "1 / 1", r: -6, o: 0.95, b: 0, d: 9, delay: 0, pos: { top: "9%", left: "3%" } },
  { src: "/images/village/1.jpeg", w: 12, ar: "4 / 3", r: 5, o: 0.95, b: 0, d: 11, delay: -3, pos: { bottom: "8%", left: "7%" } },
  { src: "/images/fairy/1.jpeg", w: 7, ar: "1 / 1", r: 8, o: 0.6, b: 1.5, d: 13, delay: -6, pos: { top: "46%", left: "-1%" }, extra: true },
  { src: "/images/3dclay/12.jpeg", w: 10, ar: "1 / 1", r: 6, o: 0.95, b: 0, d: 10, delay: -2, pos: { top: "27%", right: "3%" } },
  { src: "/images/painting/39.jpg", w: 9, ar: "4 / 5", r: -5, o: 0.95, b: 0, d: 12, delay: -5, pos: { bottom: "9%", right: "6%" } },
  { src: "/images/clock/1.jpg", w: 7, ar: "1 / 1", r: -9, o: 0.6, b: 1.5, d: 14, delay: -8, pos: { top: "50%", right: "-1%" }, extra: true },
];

export function HomeHero({ locale, copy }: { locale: Locale; copy: Dictionary["home"] }) {
  const [imageFailed, setImageFailed] = useState(false);
  const [failed, setFailed] = useState<Set<string>>(new Set());

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      {!imageFailed && (
        <Image
          className="home-hero-image"
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="home-hero-overlay" />

      <div className="hero-floats" aria-hidden="true">
        {FLOATERS.filter((f) => !failed.has(f.src)).map((f) => (
          <div
            key={f.src}
            className={`hero-float${f.extra ? " is-extra" : ""}`}
            style={
              {
                ...f.pos,
                "--w": `${f.w}rem`,
                "--ar": f.ar,
                "--r": `${f.r}deg`,
                "--o": f.o,
                "--b": `${f.b}px`,
                "--d": `${f.d}s`,
                "--delay": `${f.delay}s`,
              } as CSSProperties
            }
          >
            <Image
              src={f.src}
              alt=""
              fill
              sizes="200px"
              style={{ objectFit: "cover" }}
              onError={() => setFailed((s) => new Set(s).add(f.src))}
            />
          </div>
        ))}
      </div>

      <div className="home-hero-content">
        <div className="home-hero-heading">
          <h1 id="home-hero-title">
            <span lang={locale}>{copy.heroTitleLead}</span>
            <span className="home-hero-accent" lang={locale}>
              {copy.heroTitleAccent}
              <svg className="home-hero-squiggle" viewBox="0 0 240 18" aria-hidden="true">
                <path d="M3 11c38-9 58 4 91-1 37-6 65-6 143-1" />
              </svg>
            </span>
            <Leaf className="home-hero-leaf" aria-hidden="true" />
          </h1>
        </div>
        <p className="home-hero-script" lang={locale}>{copy.heroTagline}</p>
        <p className="home-hero-description" lang={locale}>{copy.heroText}</p>
        <div className="home-hero-actions">
          <Link className="btn btn-primary" lang={locale} href={`/${locale}/shop`}>
            {copy.heroShop} <ArrowRight aria-hidden="true" size={17} />
          </Link>
          <Link className="btn home-hero-secondary" lang={locale} href={`/${locale}/commission`}>
            {copy.heroCommission}
          </Link>
        </div>
      </div>
      <div className="home-hero-stamp" aria-label={copy.heroStamp}>
        <Leaf aria-hidden="true" size={18} />
        <span>{copy.heroStamp}</span>
        <span className="home-hero-stamp-lines">〰〰</span>
      </div>
    </section>
  );
}