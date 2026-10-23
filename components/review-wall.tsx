"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type WallShot = { id: string; src: string; name?: string };
export type WallQuote = { quote: string; name: string; product?: string };
export type WallLabels = {
  lightbox: string;
  open: string;
  close: string;
  prev: string;
  next: string;
  alt: string; // contains {name}
  altNoName: string;
};

const FIRST_QUOTE_AT = 4; // first quote card appears before the 5th screenshot
const QUOTE_EVERY = 6;

export function ReviewWall({
  shots,
  quotes,
  labels,
}: {
  shots: WallShot[];
  quotes: WallQuote[];
  labels: WallLabels;
}) {
  const [missing, setMissing] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const visible = shots.filter((s) => !missing.has(s.id));
  const current = open !== null ? visible[open] : undefined;

  const altFor = (name?: string) =>
    name ? labels.alt.replace("{name}", name) : labels.altNoName;

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);

  const step = useCallback(
    (d: number) =>
      setOpen((i) => (i === null || visible.length === 0 ? i : (i + d + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open !== null, close, step]); // eslint-disable-line react-hooks/exhaustive-deps

  const cells: ReactNode[] = [];
  visible.forEach((shot, i) => {
    if (i >= FIRST_QUOTE_AT && (i - FIRST_QUOTE_AT) % QUOTE_EVERY === 0) {
      const q = quotes[(i - FIRST_QUOTE_AT) / QUOTE_EVERY];
      if (q) {
        cells.push(
          <figure className="rw-item rw-quote" key={`q-${q.name}-${i}`}>
            <blockquote>
              <p>{q.quote}</p>
            </blockquote>
            <figcaption>
              <strong>{q.name}</strong>
              {q.product ? <span>{q.product}</span> : null}
            </figcaption>
          </figure>,
        );
      }
    }
    cells.push(
      <figure className="rw-item rw-card" key={shot.id}>
        <button
          type="button"
          className="rw-open"
          aria-label={labels.open}
          onClick={(e) => {
            lastFocus.current = e.currentTarget;
            setOpen(i);
          }}
        >
          <img
            src={shot.src}
            alt={altFor(shot.name)}
            loading="lazy"
            decoding="async"
            onError={() => setMissing((m) => new Set(m).add(shot.id))}
          />
        </button>
        {shot.name ? <figcaption className="rw-name">{shot.name}</figcaption> : null}
      </figure>,
    );
  });

  // Screenshots that failed to load must still be mounted once so onError can fire.
  const pending = shots.filter((s) => !visible.includes(s) && !missing.has(s.id));
  void pending;

  return (
    <>
      <div className="rw-wall">{cells}</div>

      {current ? (
        <div
          className="rw-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={labels.lightbox}
          ref={dialogRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) step(dx > 0 ? -1 : 1);
          }}
        >
          <button ref={closeRef} type="button" className="rw-lb-btn rw-lb-close" aria-label={labels.close} onClick={close}>
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {visible.length > 1 ? (
            <button type="button" className="rw-lb-btn rw-lb-prev" aria-label={labels.prev} onClick={() => step(-1)}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : null}

          <figure className="rw-lb-figure">
            <img src={current.src} alt={altFor(current.name)} />
            <figcaption>
              {current.name ? `${current.name} · ` : ""}
              {(open ?? 0) + 1} / {visible.length}
            </figcaption>
          </figure>

          {visible.length > 1 ? (
            <button type="button" className="rw-lb-btn rw-lb-next" aria-label={labels.next} onClick={() => step(1)}>
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}