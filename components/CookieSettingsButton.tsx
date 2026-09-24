"use client";

import { openCookieSettings } from "@/lib/consent";

/** Persistent "Cookie settings" control; opens the consent panel. */
export default function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie settings
    </button>
  );
}
