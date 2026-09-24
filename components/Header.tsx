"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { siteConfig } from "@/site.config";
import AppStoreCTA from "./AppStoreCTA";
import Logo from "./Logo";
import Container from "./Container";

/** Site header: wordmark left, section anchors, App Store / waitlist CTA right, mobile menu. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/90 backdrop-blur-md supports-[backdrop-filter]:bg-cream/80">
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-4">
        <Logo height={48} className="-ml-1 shrink-0" />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="tap inline-flex items-center rounded-full px-4 text-[15px] font-medium text-cocoa transition-colors hover:bg-parchment hover:text-wine"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:contents">
            <AppStoreCTA size="compact" />
          </span>
          <span className="contents sm:hidden">
            <AppStoreCTA size="compact" waitlistLabel="Join waitlist" />
          </span>
          <button
            type="button"
            className="tap inline-flex items-center justify-center rounded-full text-wine hover:bg-parchment md:hidden"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>

      <div id={panelId} hidden={!open} className="border-t border-line bg-cream md:hidden">
        <nav aria-label="Mobile">
          <Container as="ul" className="flex flex-col py-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="tap flex items-center rounded-xl px-3 text-lg font-semibold text-wine hover:bg-parchment"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3 pb-2" onClick={() => setOpen(false)}>
              <AppStoreCTA className="w-full" />
            </li>
          </Container>
        </nav>
      </div>
    </header>
  );
}
