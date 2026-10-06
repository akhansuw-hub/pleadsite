import { siteConfig } from "@/site.config";

/** Destination of the "Join the waitlist" CTA when the app is not live yet. */
export const WAITLIST_ANCHOR = "/#waitlist";

export const isAppLive = () => siteConfig.APP_STORE_URL !== null || siteConfig.PLAY_STORE_URL !== null;

function AppleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function PlayGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M4.3 2.4A1.4 1.4 0 0 0 3.5 3.7v16.6c0 .55.3 1.03.8 1.27L13.6 12 4.3 2.4Zm10.7 11.1 2.9 2.9-11.3 6.4c-.2.1-.4.2-.6.2L14.9 13.5ZM15 10.5 6 1.3c.2 0 .4.1.6.2l11.3 6.4-2.9 2.6Zm1.4 1.5 3.3-1.9c.9-.5.9-1.7 0-2.2l-3.3-1.8-3 3 3 2.9Z" />
    </svg>
  );
}

export interface AppStoreCTAProps {
  /** "badge" = store badges / big waitlist button; "compact" = header-sized pill. */
  size?: "badge" | "compact";
  /** Set on dark (wine) backgrounds. */
  onDark?: boolean;
  className?: string;
  /** Override the waitlist label (e.g. "Get Plead"). */
  waitlistLabel?: string;
}

/**
 * The one download / waitlist CTA, driven entirely by `siteConfig.APP_STORE_URL` / `PLAY_STORE_URL`.
 * Any store link set → store badges (compact: one "Get the app" pill). None → "Join the waitlist" → #waitlist.
 */
export default function AppStoreCTA({
  size = "badge",
  onDark = false,
  className = "",
  waitlistLabel = "Join the waitlist",
}: AppStoreCTAProps) {
  const apple = siteConfig.APP_STORE_URL;
  const play = siteConfig.PLAY_STORE_URL;

  if (apple || play) {
    if (size === "compact") {
      const href = apple ?? play!;
      return (
        <a href={href} className={`btn btn--compact ${onDark ? "btn--paper" : "btn--ink"} ${className}`}>
          Get the app
        </a>
      );
    }
    const badge = `store-badge ${onDark ? "store-badge--paper" : ""}`;
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        {apple ? (
          <a href={apple} className={badge} aria-label="Download Plead on the App Store">
            <AppleGlyph className="h-7 w-7" />
            <span className="store-badge__text">
              <span className="store-badge__small">Download on the</span>
              <span className="store-badge__large">App Store</span>
            </span>
          </a>
        ) : null}
        {play ? (
          <a href={play} className={badge} aria-label="Get Plead on Google Play">
            <PlayGlyph className="h-6 w-6" />
            <span className="store-badge__text">
              <span className="store-badge__small">Get it on</span>
              <span className="store-badge__large">Google Play</span>
            </span>
          </a>
        ) : null}
      </div>
    );
  }

  const tone = onDark ? "btn--paper" : "btn--primary";
  const sizing = size === "compact" ? "btn--compact" : "min-h-[54px] px-7 text-[1.05rem]";
  return (
    <a href={WAITLIST_ANCHOR} className={`btn ${tone} ${sizing} ${className}`}>
      {waitlistLabel}
    </a>
  );
}
