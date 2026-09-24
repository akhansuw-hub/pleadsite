"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/site.config";
import { useConsent } from "@/lib/consent";

/**
 * Cookie consent banner + settings panel.
 * The site currently ships no analytics/advertising tags, so the banner only
 * auto-prompts when `siteConfig.CONSENT_PROMPT` is true (turn on together with
 * the first non-essential tag). The panel is always reachable from the footer
 * "Cookie settings" link.
 */
export default function ConsentBanner() {
  const { ready, needsDecision, panelOpen, consent, setConsent, closeCookieSettings } = useConsent();
  const show = ready && (panelOpen || (siteConfig.CONSENT_PROMPT && needsDecision));
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [draft, setDraft] = useState({ analytics: consent.analytics, advertising: consent.advertising });
  const [lastOpen, setLastOpen] = useState(panelOpen);

  if (panelOpen !== lastOpen) {
    setLastOpen(panelOpen);
    if (panelOpen) setDraft({ analytics: consent.analytics, advertising: consent.advertising });
  }

  useEffect(() => {
    if (panelOpen) headingRef.current?.focus();
  }, [panelOpen]);

  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCookieSettings();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panelOpen, closeCookieSettings]);

  if (!show) return null;

  const btn =
    "tap inline-flex flex-1 items-center justify-center rounded-full px-5 text-[15px] font-semibold transition-colors";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <section
        role="dialog"
        aria-modal="false"
        aria-labelledby="consent-title"
        className="mx-auto max-w-[640px] rounded-[var(--radius-card)] border border-line bg-paper p-5 shadow-[var(--shadow-card)] sm:p-6"
      >
        <h2 id="consent-title" ref={headingRef} tabIndex={-1} className="text-lg font-bold text-wine">
          Cookie settings
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-cocoa">
          We only use strictly necessary storage, such as remembering this choice. No analytics or advertising
          tags run on this site today. If we add them, they stay off until you allow them.{" "}
          <Link href="/cookies/" className="font-semibold text-burgundy underline underline-offset-4">
            Cookie Policy
          </Link>
        </p>

        <fieldset className="mt-4 divide-y divide-line rounded-2xl border border-line">
          <legend className="sr-only">Cookie categories</legend>
          <label className="flex min-h-[52px] items-center justify-between gap-4 px-4">
            <span>
              <span className="font-semibold text-wine">Necessary</span>
              <span className="block text-sm text-muted">Security and your consent choice. Always on.</span>
            </span>
            <input type="checkbox" checked disabled className="h-5 w-5 accent-burgundy" />
          </label>
          {(
            [
              ["analytics", "Analytics", "Helps us understand how the site is used."],
              ["advertising", "Advertising / attribution", "Measures which campaigns lead to installs."],
            ] as const
          ).map(([key, label, hint]) => (
            <label key={key} className="flex min-h-[52px] cursor-pointer items-center justify-between gap-4 px-4">
              <span>
                <span className="font-semibold text-wine">{label}</span>
                <span className="block text-sm text-muted">{hint}</span>
              </span>
              <input
                type="checkbox"
                checked={draft[key]}
                onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.checked }))}
                className="h-5 w-5 accent-burgundy"
              />
            </label>
          ))}
        </fieldset>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className={`${btn} border border-burgundy text-burgundy hover:bg-cream`}
            onClick={() => setConsent({ analytics: false, advertising: false })}
          >
            Reject non-essential
          </button>
          <button type="button" className={`${btn} border border-burgundy text-burgundy hover:bg-cream`} onClick={() => setConsent(draft)}>
            Save choices
          </button>
          <button
            type="button"
            className={`${btn} bg-burgundy text-paper hover:bg-wine`}
            onClick={() => setConsent({ analytics: true, advertising: true })}
          >
            Accept all
          </button>
        </div>
      </section>
    </div>
  );
}
