"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/messages/en";
import type { Locale } from "@/lib/locales";

const links = [
  { key: "home", path: "" },
  { key: "shop", path: "/shop" },
  { key: "commission", path: "/commission" },
  { key: "reviews", path: "/reviews" },
  { key: "contact", path: "/contact" },
] as const;

export function SiteHeader({ locale, nav, brand }: { locale: Locale; nav: Dictionary["nav"]; brand: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let frame = 0;
    const updateScrolled = () => {
      frame = 0;
      setScrolled(window.scrollY > 40);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScrolled);
    };
    updateScrolled();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (path: string) => {
    const full = `/${locale}${path}`;
    return path === "" ? pathname === full : pathname === full || pathname.startsWith(`${full}/`);
  };

  const otherPath = (target: Locale) => pathname.replace(/^\/(en|bn)(?=\/|$)/, `/${target}`);

  const switcher = (
    <div className={`lang ${locale === "bn" ? "is-bn" : "is-en"}`} role="tablist" aria-label={nav.language}>
      <Link
        href={otherPath("en")}
        prefetch={false}
        lang="en"
        hrefLang="en"
        aria-current={locale === "en" ? "true" : undefined}
        onClick={() => (document.cookie = "NEXT_LOCALE=en; path=/; max-age=31536000; samesite=lax")}
      >
        English
      </Link>
      <Link
        href={otherPath("bn")}
        prefetch={false}
        lang="bn"
        hrefLang="bn"
        aria-current={locale === "bn" ? "true" : undefined}
        onClick={() => (document.cookie = "NEXT_LOCALE=bn; path=/; max-age=31536000; samesite=lax")}
      >
        বাংলা
      </Link>
    </div>
  );

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="wrap header-inner">
          <Link href={`/${locale}`} className="brand">
            <svg className="brand-leaf" viewBox="0 0 36 44" aria-hidden="true">
              <path d="M18 41C18 27 17 14 10 4M18 26c5-7 10-9 15-9-2 7-7 11-15 12M17 18C12 12 7 11 3 12c2 6 7 9 14 9M18 34c5-6 9-7 14-7-2 6-6 9-14 10" />
            </svg>
            <span className="brand-copy"><strong>{brand}</strong><small>Handmade · Art · Dream</small></span>
          </Link>

          <nav className="nav-desktop" aria-label={nav.primary}>
            <ul>
              {links.map(({ key, path }) => (
                <li key={key}>
                  <Link href={`/${locale}${path}`} aria-current={isActive(path) ? "page" : undefined}>
                    {nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-end">
            <div className="lang-desktop">{switcher}</div>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              <span className="sr-only">{open ? nav.closeMenu : nav.menu}</span>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label={nav.primary}>
          <ul>
            {links.map(({ key, path }) => (
              <li key={key}>
                <Link href={`/${locale}${path}`} aria-current={isActive(path) ? "page" : undefined}>
                  {nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {switcher}
      </div>
    </>
  );
}
