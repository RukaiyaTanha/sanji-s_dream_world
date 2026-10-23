"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/i18n";

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/bn") ? "bn" : "en";
  const dict = getDictionary(locale);
  return (
    <div className="wrap page narrow">
      <h1>{dict.notFound.title}</h1>
      <p className="lead">{dict.notFound.text}</p>
      <p>
        <Link className="btn btn-primary" href={`/${locale}`}>
          {dict.notFound.home}
        </Link>
      </p>
    </div>
  );
}
