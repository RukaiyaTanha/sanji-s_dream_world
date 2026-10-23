import Link from "next/link";
import type { Dictionary } from "@/messages/en";
import type { Locale } from "@/lib/locales";
import { siteConfig } from "@/site.config";
import { Phone } from "lucide-react";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-intro">
          <p className="footer-brand">{siteConfig.name}</p>
          <p>{dict.footer.description}</p>
          <div className="footer-socials" aria-label={dict.footer.connect}>
            <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="/images/fb-logo.png" alt="" /></a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="/images/insta.png" alt="" /></a>
            <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><img src="/images/yt.png" alt="" /></a>
            <a href={siteConfig.social.pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest"><img src="/images/pinterest_PNG66.png" alt="" /></a>
          </div>
        </div>
        <div>
          <h2 className="footer-heading">{dict.footer.explore}</h2>
          <ul className="footer-links">
            <li><Link href={`/${locale}/shop`}>{dict.nav.shop}</Link></li>
            <li><Link href={`/${locale}/commission`}>{dict.nav.commission}</Link></li>
            <li><Link href={`/${locale}/about`}>{dict.nav.about}</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">{dict.footer.categories}</h2>
          <ul className="footer-links">
            <li><Link href={`/${locale}/shop?category=painting`}>{dict.shop.categories.painting}</Link></li>
            <li><Link href={`/${locale}/shop?category=clay`}>{dict.shop.categories.clay}</Link></li>
            <li><Link href={`/${locale}/shop?category=showpiece`}>{dict.shop.categories.showpiece}</Link></li>
            <li><Link href={`/${locale}/shop?category=artbook`}>{dict.shop.categories.artbook}</Link></li>
            
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">{dict.footer.follow}</h2>
          <ul className="footer-links">
            <li><a href={`tel:${siteConfig.social.phone}`}><Phone size={15} /> {siteConfig.social.phone}</a></li>
            <li><Link href={`/${locale}/reviews`}>{dict.footer.reviews}</Link></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}</span><span>{dict.footer.copyright}</span></div>
    </footer>
  );
}
