"use client";

import type { ReactNode, PointerEvent } from "react";

interface Props {
  href: string;
  external?: boolean;
  className: string;
  icon: ReactNode;
  title: string;
  hint: string;
  value: string;
  action: string;
}

export function ContactChannel({ href, external, className, icon, title, hint, value, action }: Props) {
  function move(event: PointerEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  }

  return (
    <a
      className={`contact-card ${className}`}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onPointerMove={move}
    >
      <span className="contact-card-icon">{icon}</span>
      <strong>{title}</strong>
      <small>{hint}</small>
      <b>{value}</b>
      <span className="contact-card-link">{action} ↗</span>
    </a>
  );
}
