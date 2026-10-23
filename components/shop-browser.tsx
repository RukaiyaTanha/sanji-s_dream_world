"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/messages/en";
import { categoryOrder, type Product, type ProductCategory } from "@/data/products";
import { fmt, type Locale } from "@/lib/locales";
import { ProductTile } from "./product-tile";

function useItemsPerPage(): number {
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    function updateItemsPerPage() {
      const width = window.innerWidth;
      setItemsPerPage(width < 640 ? 6 : 9);
    }

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  return itemsPerPage;
}

function pageWindow(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
  const pages: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("ellipsis");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < total - 1) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

export function ShopBrowser({
  products,
  locale,
  dict,
  initialPage = 1,
}: {
  products: Product[];
  locale: Locale;
  dict: Dictionary;
  initialPage?: number;
}) {
  const [active, setActive] = useState<ProductCategory | "all">("all");
  const [page, setPage] = useState(Math.max(1, initialPage));
  const itemsPerPage = useItemsPerPage();
  const gridRef = useRef<HTMLDivElement>(null);
  const available = categoryOrder.filter((c) => products.some((p) => p.category === c));
  const categoryVisible = active === "all" ? products : products.filter((p) => p.category === active);
  const visible = categoryVisible;
  const totalPages = Math.max(1, Math.ceil(visible.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageItems = visible.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get("category") as ProductCategory | null;
    if (category && categoryOrder.includes(category)) setActive(category);
  }, []);

  useEffect(() => {
    function handlePopState() {
      const next = Number(new URLSearchParams(window.location.search).get("page")) || 1;
      setPage(Math.max(1, next));
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (page <= totalPages) return;
    setPage(totalPages);
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(totalPages));
    window.history.replaceState({}, "", url);
  }, [page, totalPages]);

  function selectCategory(category: ProductCategory | "all") {
    setActive(category);
    setPage(1);
    const url = new URL(window.location.href);
    url.searchParams.set("page", "1");
    window.history.pushState({}, "", url);
  }

  function goToPage(nextPage: number) {
    const next = Math.max(1, Math.min(totalPages, nextPage));
    setPage(next);
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(next));
    window.history.pushState({}, "", url);
    requestAnimationFrame(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <div>
      <div className="filters" role="group" aria-label={dict.shop.filterLabel}>
        <button type="button" className="filter" aria-pressed={active === "all"} onClick={() => selectCategory("all")}>
          {dict.shop.all}
        </button>
        {available.map((category) => (
          <button
            key={category}
            type="button"
            className="filter"
            aria-pressed={active === category}
            onClick={() => selectCategory(category)}
          >
            {dict.shop.categories[category]}
          </button>
        ))}
      </div>
      <p className="muted" role="status">
        {fmt(dict.shop.count, { n: visible.length })}
      </p>
      {visible.length === 0 ? (
        <p>{dict.shop.empty}</p>
      ) : (
        <>
        <div ref={gridRef} className="masonry shop-grid">
          {pageItems.map((product, i) => (
            <ProductTile key={product.id} product={product} locale={locale} dict={dict} priority={i < 3} />
          ))}
        </div>
        <div className="shop-pagination" aria-label={dict.shop.paginationLabel}>
          <p className="shop-range" role="status">
            {fmt(dict.shop.showing, {
              start: (currentPage - 1) * itemsPerPage + 1,
              end: Math.min(currentPage * itemsPerPage, visible.length),
              n: visible.length,
            })}
          </p>
          <div className="shop-pagination-controls">
            <button type="button" className="page-button page-previous" disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} aria-label={dict.shop.previous}>
              {dict.shop.previous}
            </button>
            <span className="page-mobile-status">{fmt(dict.shop.pageOf, { page: currentPage, total: totalPages })}</span>
            <div className="page-numbers">
              {pageWindow(currentPage, totalPages).map((item, index) =>
                item === "ellipsis" ? (
                  <span className="page-ellipsis" key={`ellipsis-${index}`} aria-hidden="true">…</span>
                ) : (
                  <button type="button" className="page-button" key={item} aria-label={`${dict.shop.page} ${item}`} aria-current={item === currentPage ? "page" : undefined} onClick={() => goToPage(item)}>
                    {item}
                  </button>
                ),
              )}
            </div>
            <button type="button" className="page-button page-next" disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)} aria-label={dict.shop.next}>
              {dict.shop.next}
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
