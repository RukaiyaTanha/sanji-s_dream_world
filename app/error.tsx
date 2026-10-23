"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Unexpected application error:", error);
  }, [error]);

  return (
    <main style={{ maxWidth: 680, margin: "15vh auto", padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <p style={{ color: "#a84932", fontWeight: 700 }}>Sanji&apos;s DreamWorld</p>
      <h1>Something went wrong</h1>
      <p>That page could not load correctly. Please try again.</p>
      <button
        type="button"
        onClick={() => reset()}
        style={{ padding: "0.75rem 1.1rem", border: 0, borderRadius: 8, background: "#30251f", color: "#fff8ee", cursor: "pointer" }}
      >
        Try again
      </button>
    </main>
  );
}
