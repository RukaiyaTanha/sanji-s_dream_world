"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/messages/en";
import { STUDIO_SLIDES } from "@/data/studio-cards";
import type { Locale } from "@/lib/locales";

interface Props {
  locale: Locale;
  copy: Dictionary["home"];
}

/** Seconds each photo takes to pass by. Smaller = faster. */
const SECONDS_PER_PHOTO = 4;

export function StudioSection({ locale, copy }: Props) {
  const duration = `${STUDIO_SLIDES.length * SECONDS_PER_PHOTO}s`;
  // the list is shown twice so the loop has no gap
  const loop = [...STUDIO_SLIDES, ...STUDIO_SLIDES];

  return (
    <section className="studio-section">
      <div className="wrap">
        <div className="studio-layout">
          <div className="studio-copy">
            <div className="studio-decoration" aria-hidden="true"><span /></div>
            <h2>{copy.studioTitle}</h2>
            <p>{copy.studioText}</p>
          </div>

          <div className="studio-slider">
            <div className="studio-track" style={{ "--studio-duration": duration } as CSSProperties}>
              {loop.map((slide, i) => (
                <div
                  className="studio-slide"
                  key={`${slide.src}-${i}`}
                  aria-hidden={i >= STUDIO_SLIDES.length ? true : undefined}
                >
                  <Image
                    src={slide.src}
                    alt={i >= STUDIO_SLIDES.length ? "" : slide.alt[locale]}
                    fill
                    sizes="(min-width: 960px) 20vw, 60vw"
                    priority={i < 3}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}