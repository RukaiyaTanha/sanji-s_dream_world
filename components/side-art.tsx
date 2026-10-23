"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { SideItem } from "@/data/floating-art";

export function SideArt({ items }: { items: SideItem[] }) {
  const [failed, setFailed] = useState<Set<string>>(new Set());

  return (
    <div className="side-art" aria-hidden="true">
      {items
        .filter((i) => !failed.has(i.src))
        .map((i) => (
          <div
            key={i.src}
            className={`side-float is-${i.side}`}
            style={
              {
                "--top": i.top,
                "--w": `${i.w}rem`,
                "--ar": i.ar,
                "--r": `${i.r}deg`,
                "--o": i.o,
                "--b": `${i.b}px`,
                "--d": `${i.d}s`,
                "--delay": `${i.delay}s`,
              } as CSSProperties
            }
          >
            <Image
              src={i.src}
              alt=""
              fill
              sizes="160px"
              style={{ objectFit: "cover" }}
              onError={() => setFailed((s) => new Set(s).add(i.src))}
            />
          </div>
        ))}
    </div>
  );
}