"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import type { Dictionary } from "@/messages/en";
import { messengerUrl, whatsappUrl } from "@/lib/contact";
import { MessengerIcon } from "./icons";

type Status = "" | "messenger" | "failed";

interface Props {
  /** The message to prefill (WhatsApp) or copy for Messenger. */
  message: string;
  labels: Dictionary["contactActions"];
}

/** WhatsApp, Messenger and Copy actions. Channels that aren't configured in site.config.ts render disabled. */
export function ContactActions({ message, labels }: Props) {
  const [status, setStatus] = useState<Status>("");
  const whatsapp = whatsappUrl(message);
  const messenger = messengerUrl();

  async function copy(): Promise<boolean> {
    const canUseClipboard = typeof window !== "undefined" && window.isSecureContext && Boolean(navigator.clipboard);
    try {
      if (canUseClipboard) {
        await navigator.clipboard.writeText(message);
        return true;
      }
    } catch {
      // Fall through to the legacy copy method.
    }

    const textarea = document.createElement("textarea");
    textarea.value = message;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    } finally {
      document.body.removeChild(textarea);
    }
    return copied;
  }

  return (
    <div className="actions">
      <div className="actions-row">
        {whatsapp ? (
          <a className="btn btn-primary" href={whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle aria-hidden="true" size={20} />
            {labels.whatsapp}
          </a>
        ) : (
          <button className="btn" type="button" disabled>
            <MessageCircle aria-hidden="true" size={20} />
            <span>
              {labels.whatsapp}
              <small className="btn-note">{labels.notSetUp}</small>
            </span>
          </button>
        )}

        {messenger ? (
          <a
            className="btn btn-primary"
            href={messenger}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              void copy().then((copied) => {
                setStatus(copied ? "messenger" : "failed");
              });
            }}
          >
            <MessengerIcon />
            {labels.messenger}
          </a>
        ) : (
          <button className="btn" type="button" disabled>
            <MessengerIcon />
            <span>
              {labels.messenger}
              <small className="btn-note">{labels.notSetUp}</small>
            </span>
          </button>
        )}

      </div>
      <p className="actions-status" role="status">
        {status === "messenger" && labels.messengerCopied}
        {status === "failed" && labels.copyFailed}
      </p>
    </div>
  );
}
