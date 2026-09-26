"use client";

import { useEffect, useState } from "react";
import AppStoreCTA from "./AppStoreCTA";

/** Same alphabet as `public.gen_invite_code()`: 6 characters, no I, O, 0 or 1. */
const CODE_RE = /^[A-HJ-NP-Z2-9]{6}$/;

/** The invite code from `/join/<code>/`, or null when the address holds none (or a malformed one). */
export function codeFromPath(pathname: string): string | null {
  const match = pathname.match(/^\/join\/([^/]+)\/?$/i);
  const code = match?.[1]?.toUpperCase() ?? null;
  return code && CODE_RE.test(code) ? code : null;
}

export default function JoinInvite() {
  // Read after mount: the page is statically exported once and serves every code.
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(codeFromPath(window.location.pathname));
  }, []);

  const copy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable: the code stays selectable on screen.
    }
  };

  return (
    <div className="flex w-full max-w-[30rem] flex-col gap-5">
      {code && (
        <div className="rounded-[var(--radius-card)] bg-paper p-5 shadow-[var(--shadow-card)] ring-1 ring-line">
          <p className="court-label text-gold-ink">Your invite code</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <p
              className="font-mono text-4xl font-bold tracking-[0.3em] text-wine select-all"
              aria-label={`Invite code: ${code.split("").join(" ")}`}
            >
              {code}
            </p>
            <button
              type="button"
              onClick={copy}
              className="tap inline-flex items-center rounded-full bg-parchment px-4 text-sm font-semibold text-wine transition-colors hover:bg-line"
            >
              {copied ? "Copied" : "Copy code"}
            </button>
          </div>
        </div>
      )}

      <ol className="flex flex-col gap-3 text-base leading-relaxed text-cocoa">
        <li className="flex gap-3">
          <Step n={1} />
          <span>Get Plead on your iPhone.</span>
        </li>
        <li className="flex gap-3">
          <Step n={2} />
          <span>
            Open it and tap <strong className="text-wine">I have a code</strong> when you set up.
          </span>
        </li>
        <li className="flex gap-3">
          <Step n={3} />
          <span>
            {code ? (
              <>
                Enter <strong className="font-mono tracking-widest text-wine">{code}</strong>. You&rsquo;re linked.
              </>
            ) : (
              <>Enter the 6-character code from your partner&rsquo;s invite. You&rsquo;re linked.</>
            )}
          </span>
        </li>
      </ol>

      <div className="flex flex-wrap items-center gap-3">
        {code && (
          <a
            href={`plead://join/${code}`}
            className="tap inline-flex min-h-[52px] items-center justify-center rounded-full bg-burgundy px-6 text-base font-semibold text-paper shadow-sm transition-colors hover:bg-wine"
          >
            Open in Plead
          </a>
        )}
        <AppStoreCTA waitlistLabel="Get Plead" onDark={code !== null} className={code ? "ring-1 ring-line" : ""} />
      </div>
      <p className="text-sm text-muted">
        Already have Plead? Tap <strong>Open in Plead</strong>, or open the app and enter the code.
      </p>
    </div>
  );
}

function Step({ n }: { n: number }) {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-burgundy text-sm font-bold text-paper"
    >
      {n}
    </span>
  );
}
