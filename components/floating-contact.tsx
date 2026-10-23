"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import type { Dictionary } from "@/messages/en";
import { MessengerIcon } from "./icons";

interface Props {
  whatsappHref: string | null;
  messengerHref: string | null;
  labels: Dictionary["contactActions"];
}

/** A small contact button. It only appears once WhatsApp or Messenger is configured in site.config.ts. */
export function FloatingContact({ whatsappHref, messengerHref, labels }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!whatsappHref && !messengerHref) return null;

  return (
    <div className="float-contact">
      {open && (
        <ul id="float-menu" className="float-menu">
          {whatsappHref && (
            <li>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" size={20} />
                {labels.whatsapp}
              </a>
            </li>
          )}
          {messengerHref && (
            <li>
              <a href={messengerHref} target="_blank" rel="noopener noreferrer">
                <MessengerIcon />
                {labels.messenger}
              </a>
            </li>
          )}
        </ul>
      )}
      <button
        ref={buttonRef}
        type="button"
        className="float-button"
        aria-expanded={open}
        aria-controls="float-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
        <span className="sr-only">{open ? labels.closeLabel : labels.floatingLabel}</span>
      </button>
    </div>
  );
}
