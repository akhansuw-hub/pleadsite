import { siteConfig } from "@/site.config";

/** Destination of the "Join the waitlist" CTA when the app is not live yet. */
export const WAITLIST_ANCHOR = "/#waitlist";

export const isAppLive = () => siteConfig.APP_STORE_URL !== null;

function AppleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

export interface AppStoreCTAProps {
  /** "badge" = full App Store badge / big waitlist button; "compact" = header-sized. */
  size?: "badge" | "compact";
  /** Set on dark (wine) backgrounds. */
  onDark?: boolean;
  className?: string;
  /** Override the waitlist label (e.g. "Join the waitlist"). */
  waitlistLabel?: string;
}

/**
 * The one App Store / waitlist CTA, driven entirely by `siteConfig.APP_STORE_URL`.
 * Live → "Download on the App Store" badge. Not live → "Join the waitlist" → #waitlist form.
 */
export default function AppStoreCTA({
  size = "badge",
  onDark = false,
  className = "",
  waitlistLabel = "Join the waitlist",
}: AppStoreCTAProps) {
  const url = siteConfig.APP_STORE_URL;

  if (url) {
    const colours = onDark ? "bg-paper text-cocoa" : "bg-black text-white";
    if (size === "compact") {
      return (
        <a
          href={url}
          className={`tap inline-flex items-center gap-2 rounded-full px-4 text-sm font-semibold ${colours} ${className}`}
        >
          <AppleGlyph className="h-4 w-4" />
          Download
          <span className="sr-only"> Plead on the App Store</span>
        </a>
      );
    }
    return (
      <a
        href={url}
        className={`inline-flex min-h-[56px] items-center gap-3 rounded-2xl px-5 py-2 transition-transform hover:-translate-y-0.5 ${colours} ${className}`}
      >
        <AppleGlyph className="h-7 w-7" />
        <span className="flex flex-col leading-tight">
          <span className="text-[11px] font-medium">Download on the</span>
          <span className="text-xl font-semibold tracking-tight">App Store</span>
        </span>
      </a>
    );
  }

  const colours = onDark
    ? "bg-paper text-wine hover:bg-cream"
    : "bg-burgundy text-paper hover:bg-wine";
  const sizing = size === "compact" ? "px-4 text-sm" : "min-h-[52px] px-6 text-base";
  return (
    <a
      href={WAITLIST_ANCHOR}
      className={`tap inline-flex items-center justify-center rounded-full font-semibold shadow-sm transition-colors ${sizing} ${colours} ${className}`}
    >
      {waitlistLabel}
    </a>
  );
}
