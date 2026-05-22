"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Key = "home" | "roles" | "stages" | "deliverables" | "about";

const LINKS: Array<{ href: string; label: string; key: Key; primary?: boolean }> = [
  { href: "/roles/",        label: "Roles",        key: "roles" },
  { href: "/stages/",       label: "Stages",       key: "stages" },
  { href: "/deliverables/", label: "Deliverables", key: "deliverables", primary: true },
  { href: "/about/",        label: "About",        key: "about" },
];

export default function Rail({ active }: { active?: Key }) {
  const [open, setOpen] = useState(false);

  // Close drawer on route change / link tap.
  const close = () => setOpen(false);

  // Lock body scroll while drawer open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="rail">
      <Link href="/" className="brand" onClick={close}>
        <img
          src="/logo/logo-main.png"
          alt="Launch Atlas logo"
          width="32"
          height="32"
          decoding="async"
        />
        <span>
          Launch<span className="dot">.</span>Atlas
        </span>
      </Link>

      <nav className="rail-nav-desktop" aria-label="Primary">
        {LINKS.map((l) => (
          <Link
            key={l.key}
            href={l.href}
            className={`${active === l.key ? "active" : ""} ${l.primary ? "primary" : ""}`.trim()}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className="rail-burger"
        aria-label={open ? "關閉選單" : "開啟選單"}
        aria-expanded={open}
        aria-controls="rail-drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`rail-burger-bars ${open ? "is-open" : ""}`}>
          <span /><span /><span />
        </span>
      </button>

      <div
        id="rail-drawer"
        className={`rail-drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="主選單"
        hidden={!open}
      >
        <nav className="rail-drawer-nav" aria-label="Primary mobile">
          {LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              onClick={close}
              className={active === l.key ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {open && (
        <button
          type="button"
          className="rail-scrim"
          aria-label="關閉選單"
          onClick={close}
        />
      )}
    </header>
  );
}
