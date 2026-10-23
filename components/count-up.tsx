"use client";

import { useEffect, useState } from "react";

export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{current}{suffix}</>;
}
