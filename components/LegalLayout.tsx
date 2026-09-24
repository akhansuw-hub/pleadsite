import type { ReactNode } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import { formatDate, hasUnresolvedPlaceholders, LEGAL_NAV, type LegalDoc, type TocItem } from "@/lib/legal";
import "./LegalLayout.css";

export interface LegalLayoutProps {
  title: string;
  /** Small serif label above the title, e.g. "Legal" or "Help". */
  eyebrow?: string;
  /** Lead paragraph under the title. */
  intro?: ReactNode;
  /** Rendered effective date (may still be "[EFFECTIVE DATE]"). Omit on non-policy pages. */
  effectiveDate?: string;
  /** ISO date of the last content edit. */
  lastUpdated?: string;
  /** Show the amber draft banner (brief §7: while any placeholder remains). */
  draft?: boolean;
  /** Banner body; defaults to the legal-review wording. */
  draftMessage?: ReactNode;
  /** On-page table of contents (from the `##` headings). */
  toc?: TocItem[];
  /** Slug of the current page, excluded from the "other pages" list. */
  current: string;
  children: ReactNode;
}

function isBracketed(v?: string) {
  return !!v && /^\[[^\]]+\]$/.test(v.trim());
}

function DraftBanner({ children }: { children?: ReactNode }) {
  return (
    <div role="note" aria-label="Draft notice" className="legal-draft-banner">
      <svg aria-hidden="true" viewBox="0 0 20 20" width="20" height="20" className="mt-0.5 shrink-0">
        <path
          fill="currentColor"
          d="M10 1.5 19 17.5H1L10 1.5Zm0 5a1 1 0 0 0-1 1v4.25a1 1 0 1 0 2 0V7.5a1 1 0 0 0-1-1Zm0 8.75a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z"
        />
      </svg>
      <div>
        <p className="font-bold">Draft — pending legal review</p>
        <p className="mt-1">
          {children ??
            "This page is a working draft. Details shown in highlighted [BRACKETS] have not been confirmed yet and will be completed before launch."}
        </p>
      </div>
    </div>
  );
}

function Toc({ items }: { items: TocItem[] }) {
  return (
    <nav aria-labelledby="legal-toc-title" className="legal-toc">
      <h2 id="legal-toc-title" className="court-label text-gold-ink">
        On this page
      </h2>
      <ol className="mt-2">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="legal-toc-link">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Shared shell for legal, support and account-deletion pages: narrow reading column (~800px), title,
 * effective date, draft banner, mini table of contents (sticky sidebar on wide screens, plain list on
 * mobile), and links to the other legal pages at the bottom.
 */
export default function LegalLayout({
  title,
  eyebrow = "Legal",
  intro,
  effectiveDate,
  lastUpdated,
  draft = false,
  draftMessage,
  toc = [],
  current,
  children,
}: LegalLayoutProps) {
  const others = LEGAL_NAV.filter((p) => p.slug !== current);
  const updated = formatDate(lastUpdated);
  const hasToc = toc.length > 1;

  return (
    <div className="legal-page pb-16 pt-10 sm:pt-14">
      <Container width={hasToc ? "wide" : "narrow"}>
        <div className={hasToc ? "legal-grid" : undefined}>
          {hasToc && (
            <aside className="legal-aside hidden lg:block">
              <Toc items={toc} />
            </aside>
          )}

          <article className="legal-article min-w-0" aria-labelledby="legal-title">
            <header>
              <p className="court-label text-gold-ink">{eyebrow}</p>
              <h1 id="legal-title" className="mt-2 text-[2rem] font-bold leading-tight text-wine sm:text-[2.5rem]">
                {title}
              </h1>
              {intro && <div className="mt-3 text-[1.0625rem] leading-relaxed text-cocoa">{intro}</div>}
              {(effectiveDate || updated) && (
                <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[0.9375rem] text-muted">
                  {effectiveDate && (
                    <div className="flex gap-1.5">
                      <dt>Effective date:</dt>
                      <dd className="font-semibold text-cocoa">
                        {isBracketed(effectiveDate) ? (
                          <span className="placeholder legal-placeholder">{effectiveDate}</span>
                        ) : (
                          effectiveDate
                        )}
                      </dd>
                    </div>
                  )}
                  {updated && (
                    <div className="flex gap-1.5">
                      <dt>Last updated:</dt>
                      <dd className="font-semibold text-cocoa">
                        <time dateTime={lastUpdated}>{updated}</time>
                      </dd>
                    </div>
                  )}
                </dl>
              )}
            </header>

            {draft && <DraftBanner>{draftMessage}</DraftBanner>}

            {hasToc && (
              <div className="mt-6 lg:hidden">
                <Toc items={toc} />
              </div>
            )}

            <div className="mt-8">{children}</div>

            <footer className="legal-more mt-14 border-t border-line pt-8">
              <h2 className="text-lg font-bold text-wine">More from Plead</h2>
              <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
                {others.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="legal-more-link">
                      {p.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </footer>
          </article>
        </div>
      </Container>
    </div>
  );
}

/** A Markdown legal document rendered inside LegalLayout. */
export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <LegalLayout
      title={doc.title}
      intro={<p>{doc.summary}</p>}
      effectiveDate={doc.effectiveDate}
      lastUpdated={doc.lastUpdated}
      draft={hasUnresolvedPlaceholders(doc)}
      toc={doc.toc}
      current={doc.slug}
    >
      {/* Trusted, repo-owned Markdown rendered at build time. */}
      <div className="prose-plead legal-prose" dangerouslySetInnerHTML={{ __html: doc.html }} />
    </LegalLayout>
  );
}
