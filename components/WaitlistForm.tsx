"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { siteConfig } from "@/site.config";

/**
 * Pre-launch email capture.
 * WAITLIST_URL set → native form POST (field `email`) to that endpoint.
 * WAITLIST_URL null → opens a pre-filled email to SUPPORT_EMAIL.
 */
export default function WaitlistForm({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const endpoint = siteConfig.WAITLIST_URL;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    if (endpoint) return; // let the browser POST to the waitlist endpoint
    e.preventDefault();
    const subject = encodeURIComponent("Plead waitlist");
    const body = encodeURIComponent(`Please add ${email} to the Plead waitlist.`);
    window.location.href = `mailto:${siteConfig.SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <form
      action={endpoint ?? undefined}
      method={endpoint ? "post" : undefined}
      onSubmit={onSubmit}
      className={`w-full max-w-[460px] ${className}`}
    >
      <label htmlFor={`${id}-email`} className={`mb-2 block text-sm font-extrabold ${onDark ? "text-cream" : "text-wine"}`}>
        Get launch news by email
      </label>
      <div className={`flex flex-col gap-2 rounded-[1.75rem] p-1.5 sm:flex-row sm:rounded-full ${onDark ? "bg-paper/10 ring-1 ring-paper/25" : "bg-paper ring-1 ring-line shadow-sm"}`}>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`min-h-[48px] flex-1 rounded-full bg-transparent px-4 text-base outline-none placeholder:text-muted/80 focus-visible:outline-2 ${onDark ? "text-paper placeholder:text-cream/70" : "text-cocoa"}`}
        />
        <button
          type="submit"
          className={`min-h-[48px] rounded-full px-6 text-base font-semibold whitespace-nowrap transition-colors ${onDark ? "bg-paper text-wine hover:bg-cream" : "bg-burgundy text-paper hover:bg-wine"}`}
        >
          Join the waitlist
        </button>
      </div>
      <p className={`mt-2 text-[13px] ${onDark ? "text-cream/80" : "text-muted"}`}>
        Coming soon to iPhone and Android. See our{" "}
        <Link href="/privacy/" className="underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
