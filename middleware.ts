import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/lib/locales";

/**
 * Sends "/" and any path without a language prefix to /en or /bn.
 * The visitor's last language is remembered in the NEXT_LOCALE cookie
 * (set by components/locale-cookie.tsx); otherwise the browser language decides.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (isLocale(first)) return NextResponse.next();

  const cookie = request.cookies.get("NEXT_LOCALE")?.value;
  const preferred = request.headers.get("accept-language")?.split(",")[0] ?? "";
  let locale: Locale = defaultLocale;
  if (cookie && isLocale(cookie)) locale = cookie;
  else if (/^bn\b/i.test(preferred)) locale = "bn";

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|.*\\..*).*)"],
};
