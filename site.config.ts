/**
 * Single source of truth for launch-dependent values (CONTRACTS-v2 amendment "m").
 *
 * Every key can be overridden at build time with a `NEXT_PUBLIC_<KEY>` env var.
 * Legal/business facts default to the literal bracketed placeholders from the
 * website brief §7 and must stay visible until real values are confirmed —
 * never replace them with invented facts.
 */

type Str = string;

/** Read an env var; blank strings count as unset. */
function env(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

export const PLACEHOLDERS = {
  LEGAL_ENTITY_NAME: "[LEGAL ENTITY NAME]",
  LEGAL_ENTITY_ADDRESS: "[REGISTERED / BUSINESS ADDRESS]",
  SUPPORT_EMAIL: "[SUPPORT EMAIL]",
  PRIVACY_EMAIL: "[PRIVACY EMAIL]",
  WEBSITE_DOMAIN: "[WEBSITE DOMAIN]",
  ANNUAL_PRICE: "[ANNUAL PRICE]",
  AI_PROVIDERS: "[AI PROVIDER(S)]",
  SUPABASE_REGION: "[SUPABASE REGION / PROVIDER DETAILS]",
  ANALYTICS_PROVIDERS: "[ANALYTICS / ATTRIBUTION PROVIDERS]",
  GOVERNING_LAW: "[GOVERNING LAW / COURTS]",
  COURTS: "[COURTS OR DISPUTE PROCESS]",
  EFFECTIVE_DATE: "[EFFECTIVE DATE]",
  MINIMUM_AGE: "[MINIMUM AGE]",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: "Plead";
  /** Live App Store link. null → waitlist CTA everywhere. */
  APP_STORE_URL: Str | null;
  /** Waitlist form endpoint (POST, form-encoded `email`). null → mailto SUPPORT_EMAIL. */
  WAITLIST_URL: Str | null;
  /** Confirmed annual price for the website. null → "See App Store pricing". */
  ANNUAL_PRICE_DISPLAY: Str | null;
  WEEKLY_PRICE_DISPLAY: Str;
  /** Numeric weekly price for JSON-LD offers. */
  WEEKLY_PRICE_AMOUNT: Str;
  PRICE_CURRENCY: Str;
  SUPPORT_EMAIL: Str;
  PRIVACY_EMAIL: Str;
  LEGAL_ENTITY_NAME: Str;
  LEGAL_ENTITY_ADDRESS: Str;
  GOVERNING_LAW: Str;
  COURTS: Str;
  EFFECTIVE_DATE: Str;
  WEBSITE_DOMAIN: Str;
  AI_PROVIDERS: Str;
  SUPABASE_REGION: Str;
  ANALYTICS_PROVIDERS: Str;
  MINIMUM_AGE: number;
  /** Apple's subscription-management page (safe public URL). */
  MANAGE_SUBSCRIPTION_URL: Str;
  /** Auto-show the consent banner on first visit. Off while no non-essential tags ship. */
  CONSENT_PROMPT: boolean;
  nav: NavLink[];
  footerLinks: NavLink[];
}

export const siteConfig: SiteConfig = {
  name: "Plead",
  APP_STORE_URL: env(process.env.NEXT_PUBLIC_APP_STORE_URL) ?? null,
  WAITLIST_URL: env(process.env.NEXT_PUBLIC_WAITLIST_URL) ?? null,
  ANNUAL_PRICE_DISPLAY: env(process.env.NEXT_PUBLIC_ANNUAL_PRICE_DISPLAY) ?? null,
  /** Unused: no prices are shown on the site (user decision 2026-09-24). */
  WEEKLY_PRICE_DISPLAY: env(process.env.NEXT_PUBLIC_WEEKLY_PRICE_DISPLAY) ?? "",
  WEEKLY_PRICE_AMOUNT: env(process.env.NEXT_PUBLIC_WEEKLY_PRICE_AMOUNT) ?? "",
  PRICE_CURRENCY: env(process.env.NEXT_PUBLIC_PRICE_CURRENCY) ?? "GBP",
  SUPPORT_EMAIL: env(process.env.NEXT_PUBLIC_SUPPORT_EMAIL) ?? "support@visageai.app",
  PRIVACY_EMAIL: env(process.env.NEXT_PUBLIC_PRIVACY_EMAIL) ?? "support@visageai.app",
  LEGAL_ENTITY_NAME: env(process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME) ?? "PleadAi",
  LEGAL_ENTITY_ADDRESS:
    env(process.env.NEXT_PUBLIC_LEGAL_ENTITY_ADDRESS) ?? "PleadAi, Suite 314, Railway House, Woking, Surrey, GU21 5AH, United Kingdom",
  GOVERNING_LAW: env(process.env.NEXT_PUBLIC_GOVERNING_LAW) ?? PLACEHOLDERS.GOVERNING_LAW,
  COURTS: env(process.env.NEXT_PUBLIC_COURTS) ?? PLACEHOLDERS.COURTS,
  EFFECTIVE_DATE: env(process.env.NEXT_PUBLIC_EFFECTIVE_DATE) ?? PLACEHOLDERS.EFFECTIVE_DATE,
  WEBSITE_DOMAIN: env(process.env.NEXT_PUBLIC_WEBSITE_DOMAIN) ?? "plead-drab.vercel.app",
  AI_PROVIDERS: env(process.env.NEXT_PUBLIC_AI_PROVIDERS) ?? "Anthropic (Claude)",
  SUPABASE_REGION: env(process.env.NEXT_PUBLIC_SUPABASE_REGION) ?? PLACEHOLDERS.SUPABASE_REGION,
  ANALYTICS_PROVIDERS:
    env(process.env.NEXT_PUBLIC_ANALYTICS_PROVIDERS) ?? PLACEHOLDERS.ANALYTICS_PROVIDERS,
  MINIMUM_AGE: Number(env(process.env.NEXT_PUBLIC_MINIMUM_AGE) ?? 18),
  MANAGE_SUBSCRIPTION_URL: "https://apps.apple.com/account/subscriptions",
  CONSENT_PROMPT: env(process.env.NEXT_PUBLIC_CONSENT_PROMPT) === "true",
  nav: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "AI Court", href: "/#ai-court" },
    { label: "FAQ", href: "/#faq" },
  ],
  footerLinks: [
    { label: "Privacy", href: "/privacy/" },
    { label: "Terms", href: "/terms/" },
    { label: "Subscription Terms", href: "/subscription-terms/" },
    { label: "Cookies", href: "/cookies/" },
    { label: "Support", href: "/support/" },
    { label: "Delete Account", href: "/delete-account/" },
  ],
};

/** True when a value is still a bracketed placeholder like "[LEGAL ENTITY NAME]" (or null/empty). */
export function isPlaceholder(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value !== "string") return false;
  const v = value.trim();
  return v === "" || /^\[[^\]]+\]$/.test(v);
}

/** mailto: href for an email config value, or null while it is a placeholder. */
export function mailtoHref(email: string, subject?: string): string | null {
  if (isPlaceholder(email)) return null;
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}

/** Canonical site origin for metadata; falls back to a local origin while the domain is a placeholder. */
export function siteOrigin(): string {
  const d = siteConfig.WEBSITE_DOMAIN;
  if (isPlaceholder(d)) return "http://localhost:3000";
  return d.startsWith("http") ? d.replace(/\/$/, "") : `https://${d.replace(/\/$/, "")}`;
}

export default siteConfig;
