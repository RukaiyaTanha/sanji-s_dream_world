"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Dictionary } from "@/messages/en";
import type { Product } from "@/data/products";
import { fmt, type Locale } from "@/lib/locales";

export function ProductGallery({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const images = [
    ...product.images,
    ...(product.gallery ?? []).map((src, itemIndex) => ({
      src,
      alt: {
        en: `${product.name.en} photo ${itemIndex + 2}`,
        bn: `${product.name.bn}-এর ছবি ${itemIndex + 2}`,
      },
    })),
  ];
  const count = images.length;
  const label = fmt(dict.product.gallery.label, { name: product.name[locale] });

  function go(next: number) {
    if (count < 2) return;
    const nextIndex = (next + count) % count;
    setIndex(nextIndex);
    trackRef.current?.children[nextIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count < 2) return;
    const galleryTrack = track;
    let timeout: number | undefined;
    function onScroll() {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        const width = galleryTrack.clientWidth;
        if (width) setIndex(Math.round(galleryTrack.scrollLeft / width));
      }, 80);
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timeout);
      track.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  return (
    <div className="gallery" role="group" aria-roledescription="carousel" aria-label={label} onKeyDown={onKey} tabIndex={0}>
      <div
        className="gallery-main"
      >
        <div className="gallery-track" ref={trackRef}>
          {(images.length > 0 ? images : [undefined]).map((item, itemIndex) => (
            <div className="gallery-slide" key={item?.src ?? "placeholder"}>
              <div className="gallery-image-frame">
                {item ? (
                  <>
                    <Image
                      src={item.src}
                      alt={item.alt[locale]}
                      fill
                      priority={itemIndex === 0}
                      sizes="(min-width: 900px) 55vw, 95vw"
                      className="gallery-image-blur"
                      aria-hidden="true"
                    />
                    <Image
                      src={item.src}
                      alt={item.alt[locale]}
                      fill
                      priority={itemIndex === 0}
                      sizes="(min-width: 900px) 55vw, 95vw"
                      className={`gallery-image${product.category === "painting" ? " gallery-image-contain" : ""}`}
                    />
                  </>
                ) : (
                  <div className="art-placeholder" role="img" aria-label={`${product.name[locale]} — ${dict.common.photoSoon}`}>
                    <span>{dict.common.photoSoon}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {count > 1 && (
          <>
            <button type="button" className="gallery-arrow is-prev" onClick={() => go(index - 1)} aria-label={dict.product.gallery.prev}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" className="gallery-arrow is-next" onClick={() => go(index + 1)} aria-label={dict.product.gallery.next}>
              <ChevronRight aria-hidden="true" />
            </button>
            <span className="gallery-counter">{index + 1} / {count}</span>
          </>
        )}
      </div>
      {count > 1 && (
        <>
          <div className="gallery-dots" aria-hidden="true">
            {images.map((item, itemIndex) => <span className={itemIndex === index ? "is-active" : ""} key={item.src} />)}
          </div>
          <ul className="thumbs">
            {images.map((item, itemIndex) => (
              <li key={item.src}>
                <button type="button" className="thumb" aria-current={itemIndex === index} aria-label={fmt(dict.product.gallery.show, { n: itemIndex + 1 })} onClick={() => go(itemIndex)}>
                  <Image src={item.src} alt="" fill sizes="64px" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
