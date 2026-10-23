"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/messages/en";
import { formatMoney } from "@/lib/format";
import { fmt, type Locale } from "@/lib/locales";
import { siteConfig } from "@/site.config";
import { InquiryForm } from "./inquiry-form";

const OCCASIONS = ["birthday", "wedding", "anniversary", "housewarming", "gift", "self", "other"] as const;
const MEDIA = ["painting", "clay", "showpiece", "gift", "artbook", "notSure"] as const;
const SIZES = ["small", "medium", "large", "custom", "notSure"] as const;
const TIMES = ["flexible", "soon", "month", "date"] as const;

interface Selection {
  occasion: string;
  medium: string;
  size: string;
  sizeCustom: string;
  budget: string;
  timeframe: string;
  date: string;
}

const EMPTY: Selection = { occasion: "", medium: "", size: "", sizeCustom: "", budget: "", timeframe: "", date: "" };

interface Option {
  id: string;
  label: string;
}

function Choice({
  legend,
  name,
  options,
  value,
  onChange,
  note,
  children,
}: {
  legend: string;
  name: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
  note?: string;
  children?: ReactNode;
}) {
  return (
    <fieldset className="choice">
      <legend>{legend}</legend>
      <div className="chips">
        {options.map((option) => (
          <label key={option.id} className="chip">
            <input
              type="radio"
              name={name}
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {children}
      {note && <p className="choice-note">{note}</p>}
    </fieldset>
  );
}

export function CommissionPlanner({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [sel, setSel] = useState<Selection>(EMPTY);
  const p = dict.planner;
  const symbol = siteConfig.currency.symbol;

  function update<K extends keyof Selection>(key: K, value: Selection[K]) {
    setSel((current) => ({ ...current, [key]: value }));
  }

  const money = (n: number) => formatMoney(n, locale, symbol);
  const bands = [...siteConfig.budgetBands].sort((a, b) => a - b);
  const budgetOptions: Option[] = [];
  if (bands.length > 0) {
    budgetOptions.push({ id: "under", label: fmt(p.budget.under, { a: money(bands[0]) }) });
    for (let i = 0; i < bands.length - 1; i++) {
      budgetOptions.push({ id: `b${i}`, label: fmt(p.budget.between, { a: money(bands[i]), b: money(bands[i + 1]) }) });
    }
    budgetOptions.push({ id: "over", label: fmt(p.budget.over, { a: money(bands[bands.length - 1]) }) });
  }
  budgetOptions.push({ id: "discuss", label: p.budget.discuss });

  const occasionOptions = OCCASIONS.map((id) => ({ id, label: p.occasion.options[id] }));
  const mediumOptions = MEDIA.map((id) => ({ id, label: p.medium.options[id] }));
  const sizeOptions = SIZES.map((id) => ({ id, label: p.size.options[id] }));
  const timeOptions = TIMES.map((id) => ({ id, label: p.timeframe[id] }));

  const labelOf = (options: Option[], id: string) => options.find((o) => o.id === id)?.label ?? "";

  const sizeValue =
    sel.size === "custom" && sel.sizeCustom.trim()
      ? `${p.size.options.custom}: ${sel.sizeCustom.trim()}`
      : labelOf(sizeOptions, sel.size);
  const timeValue =
    sel.timeframe === "date" && sel.date ? `${p.timeframe.date}: ${sel.date}` : labelOf(timeOptions, sel.timeframe);

  const rows: { label: string; value: string }[] = [
    { label: dict.summary.occasion, value: labelOf(occasionOptions, sel.occasion) },
    { label: dict.summary.medium, value: labelOf(mediumOptions, sel.medium) },
    { label: dict.summary.size, value: sizeValue },
    { label: dict.summary.budget, value: labelOf(budgetOptions, sel.budget) },
    { label: dict.summary.timing, value: timeValue },
  ];
  const chosen = [sel.occasion, sel.medium, sel.size, sel.budget, sel.timeframe].filter(Boolean).length;
  const filled = rows.filter((r) => r.value);
  const summaryText =
    [dict.summary.heading, ...filled.map((r) => `${r.label}: ${r.value}`)].join("\n");

  return (
    <div className="planner">
      <div className="planner-choices">
        <Choice legend={p.occasion.label} name="occasion" options={occasionOptions} value={sel.occasion} onChange={(v) => update("occasion", v)} />
        <Choice legend={p.medium.label} name="medium" options={mediumOptions} value={sel.medium} onChange={(v) => update("medium", v)} />
        <Choice legend={p.size.label} name="size" options={sizeOptions} value={sel.size} onChange={(v) => update("size", v)}>
          {sel.size === "custom" && (
            <div className="field inline-field">
              <label htmlFor="size-custom">{p.size.customLabel}</label>
              <input
                id="size-custom"
                type="text"
                value={sel.sizeCustom}
                placeholder={p.size.customHint}
                onChange={(e) => update("sizeCustom", e.target.value)}
              />
            </div>
          )}
        </Choice>
        <Choice legend={p.budget.label} name="budget" options={budgetOptions} value={sel.budget} onChange={(v) => update("budget", v)} note={p.budget.note} />
        <Choice legend={p.timeframe.label} name="timeframe" options={timeOptions} value={sel.timeframe} onChange={(v) => update("timeframe", v)} note={p.timeframe.note}>
          {sel.timeframe === "date" && (
            <div className="field inline-field">
              <label htmlFor="date-needed">{p.timeframe.dateLabel}</label>
              <input id="date-needed" type="date" value={sel.date} onChange={(e) => update("date", e.target.value)} />
            </div>
          )}
        </Choice>
      </div>

      <aside className="slip" id="brief" aria-labelledby="slip-title">
        <h2 id="slip-title">{dict.summary.title}</h2>
        {filled.length === 0 ? (
          <p className="muted">{dict.summary.empty}</p>
        ) : (
          <dl>
            {filled.map((row) => (
              <div key={row.label} className="slip-row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <button type="button" className="link-button" onClick={() => setSel(EMPTY)} disabled={chosen === 0}>
          {p.reset}
        </button>
        <div className="slip-form">
          <h3>{dict.form.title}</h3>
          <InquiryForm dict={dict} locale={locale} summary={summaryText} />
        </div>
      </aside>

      <a className="planner-bar" href="#brief">
        <span>{p.reviewBrief}</span>
        <span>{fmt(p.chosenCount, { n: chosen })}</span>
      </a>
    </div>
  );
}
