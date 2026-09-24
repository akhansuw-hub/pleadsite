/**
 * Legal copy loader (build time only — uses node:fs).
 *
 * Markdown lives in web/content/legal/*.md with front matter. Bracketed placeholders from the website
 * brief §7 (e.g. "[LEGAL ENTITY NAME]") are replaced with values from site.config.ts only when the config
 * value is real (not itself a placeholder). Otherwise the bracketed text stays visible, highlighted, and
 * the page shows the "Draft — pending legal review" banner. Never invent values here.
 *
 * Relative imports (no "@/" alias) so `node --test` can load this file directly (see lib/legal.test.ts).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Marked, type Tokens } from "marked";
import { siteConfig, isPlaceholder, type SiteConfig } from "../site.config";

export type LegalSlug = "privacy" | "terms" | "subscription-terms" | "cookies";
export const LEGAL_SLUGS: readonly LegalSlug[] = ["privacy", "terms", "subscription-terms", "cookies"];

/** Every legal/support destination, in footer order (used for the "other pages" list). */
export const LEGAL_NAV: readonly { href: string; label: string; slug: string }[] = [
  { href: "/privacy/", label: "Privacy Policy", slug: "privacy" },
  { href: "/terms/", label: "Terms & Conditions", slug: "terms" },
  { href: "/subscription-terms/", label: "Subscription Terms", slug: "subscription-terms" },
  { href: "/cookies/", label: "Cookie Policy", slug: "cookies" },
  { href: "/support/", label: "Support", slug: "support" },
  { href: "/delete-account/", label: "Delete your account", slug: "delete-account" },
];

/** The subset of config the legal copy reads. Tests pass their own. */
export type LegalConfig = Pick<
  SiteConfig,
  | "LEGAL_ENTITY_NAME"
  | "LEGAL_ENTITY_ADDRESS"
  | "SUPPORT_EMAIL"
  | "PRIVACY_EMAIL"
  | "WEBSITE_DOMAIN"
  | "ANNUAL_PRICE_DISPLAY"
  | "AI_PROVIDERS"
  | "SUPABASE_REGION"
  | "ANALYTICS_PROVIDERS"
  | "GOVERNING_LAW"
  | "COURTS"
  | "EFFECTIVE_DATE"
> & { MINIMUM_AGE: number | string | null };

type Kind = "text" | "email";

/** Placeholder token → how to read its value from config. */
export const PLACEHOLDER_SOURCES: Record<string, { get: (c: LegalConfig) => unknown; kind: Kind }> = {
  "[LEGAL ENTITY NAME]": { get: (c) => c.LEGAL_ENTITY_NAME, kind: "text" },
  "[REGISTERED / BUSINESS ADDRESS]": { get: (c) => c.LEGAL_ENTITY_ADDRESS, kind: "text" },
  "[SUPPORT EMAIL]": { get: (c) => c.SUPPORT_EMAIL, kind: "email" },
  "[PRIVACY EMAIL]": { get: (c) => c.PRIVACY_EMAIL, kind: "email" },
  "[WEBSITE DOMAIN]": { get: (c) => c.WEBSITE_DOMAIN, kind: "text" },
  // "[ANNUAL PRICE] per year" in the copy: accept "£49.99", "£49.99 / year" or "£49.99 per year".
  "[ANNUAL PRICE]": {
    get: (c) => c.ANNUAL_PRICE_DISPLAY?.replace(/\s*(\/\s*(yr|year)|per\s+year)\s*$/i, "") ?? null,
    kind: "text",
  },
  "[AI PROVIDER(S)]": { get: (c) => c.AI_PROVIDERS, kind: "text" },
  "[SUPABASE REGION / PROVIDER DETAILS]": { get: (c) => c.SUPABASE_REGION, kind: "text" },
  "[ANALYTICS / ATTRIBUTION PROVIDERS]": { get: (c) => c.ANALYTICS_PROVIDERS, kind: "text" },
  "[GOVERNING LAW]": { get: (c) => c.GOVERNING_LAW, kind: "text" },
  "[COURTS OR DISPUTE PROCESS]": { get: (c) => c.COURTS, kind: "text" },
  "[MINIMUM AGE]": { get: (c) => c.MINIMUM_AGE, kind: "text" },
  "[EFFECTIVE DATE]": { get: (c) => c.EFFECTIVE_DATE, kind: "text" },
};

/** Any ALL-CAPS bracketed token, e.g. "[SUPPORT EMAIL]" (markdown links are mixed case, so never match). */
const PLACEHOLDER_RE = /\[[A-Z][A-Z0-9 ()/&,.'-]*\]/g;

function resolved(token: string, cfg: LegalConfig): { value: string; kind: Kind } | null {
  const src = PLACEHOLDER_SOURCES[token];
  if (!src) return null;
  const raw = src.get(cfg);
  if (raw === null || raw === undefined || (typeof raw === "number" && !Number.isFinite(raw))) return null;
  const value = String(raw).trim();
  if (isPlaceholder(value)) return null;
  return { value, kind: src.kind };
}

/** Resolve one config value for inline UI (support/deletion pages). Returns the placeholder when unset. */
export function configValue(token: keyof typeof PLACEHOLDER_SOURCES, cfg: LegalConfig = siteConfig): string {
  return resolved(token, cfg)?.value ?? token;
}

/** Replace resolvable placeholders in markdown; leave the rest as-is. Emails become mailto links. */
export function interpolate(markdown: string, cfg: LegalConfig = siteConfig): string {
  return markdown.replace(PLACEHOLDER_RE, (token, offset: number, whole: string) => {
    const r = resolved(token, cfg);
    if (!r) return token;
    // Leave a token alone if it is itself link text ("[X](…)") — none today, but don't corrupt links.
    if (whole[offset + token.length] === "(") return r.value;
    return r.kind === "email" ? `[${r.value}](mailto:${r.value})` : r.value;
  });
}

/** Distinct bracketed placeholders still present in a string. */
export function findPlaceholders(text: string): string[] {
  return Array.from(new Set(text.match(PLACEHOLDER_RE) ?? []));
}

export function stripComments(markdown: string): string {
  return markdown.replace(/<!--[\s\S]*?-->\n?/g, "");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;|<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface TocItem {
  id: string;
  text: string;
}

export interface LegalFrontMatter {
  title: string;
  slug: LegalSlug;
  summary: string;
  effectiveDateKey: "EFFECTIVE_DATE";
  lastUpdated?: string;
  draft: boolean;
}

export interface LegalDoc extends LegalFrontMatter {
  /** Rendered effective date (config value or "[EFFECTIVE DATE]"). */
  effectiveDate: string;
  html: string;
  toc: TocItem[];
  /** Placeholders left visible on the page (including the effective date). */
  unresolved: string[];
}

export const CONTENT_DIR = path.join(process.cwd(), "content", "legal");

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Render markdown to HTML with `id`s on h2s and highlighted leftover placeholders. */
export function renderMarkdown(markdown: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading(token: Tokens.Heading) {
        const inner = this.parser.parseInline(token.tokens);
        if (token.depth !== 2) return `<h${token.depth + 1}>${inner}</h${token.depth + 1}>\n`;
        let id = slugify(token.text) || "section";
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n + 1}`;
        toc.push({ id, text: token.text.replace(/\*\*|__|`/g, "") });
        return `<h2 id="${id}">${inner}</h2>\n`;
      },
      link(token: Tokens.Link) {
        const inner = this.parser.parseInline(token.tokens);
        const external = /^https?:\/\//.test(token.href);
        const attrs = external ? ' rel="noopener noreferrer" target="_blank"' : "";
        const sr = external ? '<span class="sr-only"> (opens in a new tab)</span>' : "";
        return `<a href="${escapeHtml(token.href)}"${attrs}>${inner}${sr}</a>`;
      },
      table(token: Tokens.Table) {
        // Wrap tables so they scroll inside the column on narrow screens instead of the page.
        const head = token.header.map((c) => `<th scope="col">${escapeHtml(c.text)}</th>`).join("");
        const rows = token.rows
          .map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c.text)}</td>`).join("")}</tr>`)
          .join("");
        return `<div class="legal-table"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  let html = md.parse(markdown, { async: false }) as string;
  // Highlight placeholders in text nodes only (never inside tags/attributes).
  html = html.replace(/>([^<]+)</g, (_m, text: string) =>
    `>${text.replace(PLACEHOLDER_RE, (t) => `<span class="placeholder legal-placeholder">${t}</span>`)}<`,
  );
  return { html, toc };
}

/** Parse a legal markdown source string (exported for tests). */
export function parseLegal(source: string, cfg: LegalConfig = siteConfig): LegalDoc {
  const { data, content } = matter(source);
  const fm = data as Partial<LegalFrontMatter>;
  for (const key of ["title", "slug", "summary", "effectiveDateKey"] as const) {
    if (typeof fm[key] !== "string" || !fm[key]) throw new Error(`legal front matter missing "${key}"`);
  }
  if (typeof fm.draft !== "boolean") throw new Error('legal front matter missing boolean "draft"');
  const body = interpolate(stripComments(content), cfg);
  const { html, toc } = renderMarkdown(body);
  const effectiveDate = configValue("[EFFECTIVE DATE]", cfg);
  const unresolved = findPlaceholders(`${effectiveDate}\n${body}`);
  return {
    title: fm.title!,
    slug: fm.slug as LegalSlug,
    summary: fm.summary!,
    effectiveDateKey: "EFFECTIVE_DATE",
    lastUpdated: fm.lastUpdated ? String(fm.lastUpdated) : undefined,
    draft: fm.draft,
    effectiveDate,
    html,
    toc,
    unresolved,
  };
}

export function getLegalDoc(slug: LegalSlug, cfg: LegalConfig = siteConfig): LegalDoc {
  const source = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
  const doc = parseLegal(source, cfg);
  if (doc.slug !== slug) throw new Error(`content/legal/${slug}.md has slug "${doc.slug}"`);
  return doc;
}

/** True while any bracketed placeholder is still visible on the rendered page. */
export function hasUnresolvedPlaceholders(doc: Pick<LegalDoc, "unresolved">): boolean {
  return doc.unresolved.length > 0;
}

/** Human date for "Last updated" (en-GB, e.g. 24 September 2026). */
export function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/**
 * Route metadata for a legal/support page. The root layout's title template appends " · Plead".
 * Pages stay indexable even while drafts remain: App Store review needs them reachable.
 */
export function legalMetadata(page: { title: string; summary: string; path: string }) {
  return {
    title: page.title,
    description: page.summary,
    alternates: { canonical: page.path },
    robots: { index: true, follow: true },
  };
}
