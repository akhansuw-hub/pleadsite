"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/site.config";
import AppStoreCTA from "./AppStoreCTA";
import Logo from "./Logo";

/**
 * Floating pill header: brand left, section anchors (desktop), one CTA right.
 * Shrinks and gains a surface once the page scrolls. No hamburger: the same links live in the footer.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none sticky top-0 z-40 px-3 pt-3">
      <div
        className={`pointer-events-auto mx-auto flex h-14 items-center gap-2 rounded-full pr-2 pl-2 transition-[max-width,background-color,box-shadow] duration-500 ease-[var(--ease-out)] ${
          scrolled
            ? "max-w-[980px] bg-paper/85 shadow-[0_16px_40px_-24px_rgb(59_36_37/0.45)] ring-1 ring-line backdrop-blur-md"
            : "max-w-[var(--shelf)]"
        }`}
      >
        <Logo height={52} className="mr-auto -ml-1 -translate-y-px" />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-0.5">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="tap inline-flex items-center rounded-full px-3.5 text-[15px] font-bold text-cocoa transition-colors hover:bg-wine/8 hover:text-wine"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <AppStoreCTA size="compact" waitlistLabel="Join the waitlist" />
      </div>
    </header>
  );
}
