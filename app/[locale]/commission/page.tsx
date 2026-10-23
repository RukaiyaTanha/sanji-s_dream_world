import type { Metadata } from "next";
import { BadgePercent, Clock3, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import { CommissionPlanner } from "@/components/commission-planner";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumb } from "@/components/breadcrumb";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata(locale, "/commission", dict.meta.commissionTitle, dict.meta.commissionDesc);
}

export default async function CommissionPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <Breadcrumb locale={locale} items={[{ label: dict.nav.home }, { label: dict.nav.commission }]} />
      <div className="wrap page">
      <header className="page-head">
        <h1>{dict.planner.title}</h1>
        <p className="lead">{dict.planner.intro}</p>
      </header>
      <section className="before-order" aria-labelledby="before-order-title">
        <h2 id="before-order-title">{dict.planner.beforeOrder.title}</h2>
        <div className="before-order-grid">
          {[BadgePercent, Clock3, Truck].map((Icon, index) => {
            const item = dict.planner.beforeOrder.items[index];
            return (
            <article className="before-order-card" key={item.title}>
              <span className="before-order-icon" aria-hidden="true">
                <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div className="before-order-content">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
            );
          })}
        </div>
      </section>
      <CommissionPlanner dict={dict} locale={locale} />
      </div>
    </>
  );
}
