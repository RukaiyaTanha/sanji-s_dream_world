import Link from "next/link";
import type { Locale } from "@/lib/locales";

interface Item {
  label: string;
  href?: string;
}

export function Breadcrumb({ locale, items }: { locale: Locale; items: Item[] }) {
  return (
    <nav className="breadcrumb-bar" aria-label="Breadcrumb">
      <div className="wrap breadcrumb">
        <Link href={`/${locale}`}>{items[0]?.label}</Link>
        {items.slice(1).map((item) => (
          <span key={`${item.href ?? "current"}-${item.label}`} className="breadcrumb-item">
            <span aria-hidden="true">›</span>
            {item.href ? <Link href={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}
          </span>
        ))}
      </div>
    </nav>
  );
}
