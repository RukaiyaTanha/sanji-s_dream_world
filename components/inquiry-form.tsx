"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/messages/en";
import { fmt, type Locale } from "@/lib/locales";
import { siteConfig } from "@/site.config";
import { ContactActions } from "./contact-actions";

type Field = "name" | "contact" | "notes" | "reference";
type Stage = "edit" | "ready" | "sent";

interface Props {
  dict: Dictionary;
  locale: Locale;
  /** Commission summary text. When null the form is a general message form and the message is required. */
  summary: string | null;
}

function validContact(value: string): boolean {
  return value.replace(/\D/g, "").length >= 7;
}

export function InquiryForm({ dict, locale, summary }: Props) {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", contact: "", notes: "", reference: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [stage, setStage] = useState<Stage>("edit");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const endpoint = siteConfig.contact.formEndpoint;
  const f = dict.form;
  const messageRequired = summary === null;

  function set(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function buildMessage(): string {
    const lines = [summary ?? dict.contact.generalMessage, ""];
    lines.push(`${dict.summary.name}: ${values.name.trim()}`);
    lines.push(`${dict.summary.contact}: ${values.contact.trim()}`);
    if (values.notes.trim()) lines.push(`${dict.summary.notes}: ${values.notes.trim()}`);
    if (values.reference.trim()) lines.push(`${dict.summary.reference}: ${values.reference.trim()}`);
    return lines.join("\n");
  }

  function validate(): Partial<Record<Field, string>> {
    const found: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) found.name = f.errors.nameRequired;
    if (!values.contact.trim()) found.contact = f.errors.contactRequired;
    else if (!validContact(values.contact.trim())) found.contact = f.errors.contactInvalid;
    if (messageRequired && !values.notes.trim()) found.notes = f.errors.messageRequired;
    if (values.reference.trim() && !/^https?:\/\/\S+$/i.test(values.reference.trim()))
      found.reference = f.errors.referenceInvalid;
    return found;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSendError("");
    const found = validate();
    setErrors(found);
    const first = (["name", "contact", "notes", "reference"] as Field[]).find((k) => found[k]);
    if (first) {
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    if (!endpoint) {
      setStage("ready");
      return;
    }

    setSending(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          language: locale,
          name: values.name.trim(),
          contact: values.contact.trim(),
          reference: values.reference.trim(),
          message: buildMessage(),
        }),
      });
      if (response.ok) setStage("sent");
      else setSendError(f.errors.sendFailed);
    } catch {
      setSendError(f.errors.sendFailed);
    } finally {
      setSending(false);
    }
  }

  const errorCount = Object.keys(errors).length;

  if (stage === "sent") {
    return (
      <div className="form-result" role="status">
        <h3>{f.sent}</h3>
      </div>
    );
  }

  if (stage === "ready") {
    const message = buildMessage();
    return (
      <div className="form-result">
        <h3>{f.readyTitle}</h3>
        <p>{f.readyText}</p>
        <textarea className="ready-text" readOnly value={message} rows={Math.min(14, message.split("\n").length + 1)} aria-label={f.readyTitle} />
        <ContactActions message={message} labels={dict.contactActions} />
        <button type="button" className="link-button" onClick={() => setStage("edit")}>
          {f.edit}
        </button>
      </div>
    );
  }

  const field = (id: Field, label: string, hint?: string, extra?: { multiline?: boolean; type?: string; required?: boolean }) => {
    const hintId = hint ? `hint-${id}` : undefined;
    const errId = errors[id] ? `error-${id}` : undefined;
    const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
    return (
      <div className="field">
        <label htmlFor={`field-${id}`}>{label}</label>
        {hint && (
          <p className="field-hint" id={hintId}>
            {hint}
          </p>
        )}
        {extra?.multiline ? (
          <textarea
            id={`field-${id}`}
            rows={4}
            value={values[id]}
            onChange={(e) => set(id, e.target.value)}
            aria-invalid={errors[id] ? true : undefined}
            aria-describedby={describedBy}
          />
        ) : (
          <input
            id={`field-${id}`}
            type={extra?.type ?? "text"}
            value={values[id]}
            onChange={(e) => set(id, e.target.value)}
            autoComplete={id === "name" ? "name" : undefined}
            aria-invalid={errors[id] ? true : undefined}
            aria-describedby={describedBy}
          />
        )}
        {errors[id] && (
          <p className="field-error" id={errId}>
            {errors[id]}
          </p>
        )}
      </div>
    );
  };

  return (
    <form className="inquiry" onSubmit={onSubmit} noValidate>
      {errorCount > 0 && (
        <p className="form-error-summary" role="alert">
          {fmt(f.errorSummary, { n: errorCount })}
        </p>
      )}
      {field("name", f.name)}
      {field("contact", f.contact, f.contactHint)}
      {field("notes", messageRequired ? f.message : f.notes, undefined, { multiline: true })}
      {field("reference", f.reference, f.referenceHint, { type: "url" })}
      {sendError && (
        <p className="form-error-summary" role="alert">
          {sendError}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={sending}>
        {sending ? f.sending : endpoint ? f.submitSend : f.submitPrepare}
      </button>
    </form>
  );
}
