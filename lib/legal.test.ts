// Run: npm run test:legal   (node --import ./lib/test-hooks.mjs --test lib/legal.test.ts)
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  CONTENT_DIR,
  LEGAL_SLUGS,
  PLACEHOLDER_SOURCES,
  findPlaceholders,
  getLegalDoc,
  hasUnresolvedPlaceholders,
  interpolate,
  parseLegal,
  stripComments,
  type LegalConfig,
} from "./legal";
import { PLACEHOLDERS } from "../site.config";

/** Config with nothing confirmed: every value is its brief §7 placeholder (or unset). */
const UNSET: LegalConfig = {
  LEGAL_ENTITY_NAME: PLACEHOLDERS.LEGAL_ENTITY_NAME,
  LEGAL_ENTITY_ADDRESS: PLACEHOLDERS.LEGAL_ENTITY_ADDRESS,
  SUPPORT_EMAIL: PLACEHOLDERS.SUPPORT_EMAIL,
  PRIVACY_EMAIL: PLACEHOLDERS.PRIVACY_EMAIL,
  WEBSITE_DOMAIN: PLACEHOLDERS.WEBSITE_DOMAIN,
  ANNUAL_PRICE_DISPLAY: null,
  AI_PROVIDERS: PLACEHOLDERS.AI_PROVIDERS,
  SUPABASE_REGION: PLACEHOLDERS.SUPABASE_REGION,
  ANALYTICS_PROVIDERS: PLACEHOLDERS.ANALYTICS_PROVIDERS,
  GOVERNING_LAW: PLACEHOLDERS.GOVERNING_LAW,
  COURTS: PLACEHOLDERS.COURTS,
  EFFECTIVE_DATE: PLACEHOLDERS.EFFECTIVE_DATE,
  MINIMUM_AGE: PLACEHOLDERS.MINIMUM_AGE,
};

const FILLED: LegalConfig = {
  LEGAL_ENTITY_NAME: "Example Ltd",
  LEGAL_ENTITY_ADDRESS: "1 Example Street",
  SUPPORT_EMAIL: "help@example.test",
  PRIVACY_EMAIL: "privacy@example.test",
  WEBSITE_DOMAIN: "example.test",
  ANNUAL_PRICE_DISPLAY: "£1.00 / year",
  AI_PROVIDERS: "Provider A",
  SUPABASE_REGION: "Region B",
  ANALYTICS_PROVIDERS: "None",
  GOVERNING_LAW: "Law C",
  COURTS: "Courts D",
  EFFECTIVE_DATE: "1 January 2027",
  MINIMUM_AGE: 18,
};

const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

/** Placeholders that the brief (§7–§11 and the task) requires to survive, per document. */
const REQUIRED: Record<string, string[]> = {
  privacy: [
    "[LEGAL ENTITY NAME]",
    "[REGISTERED / BUSINESS ADDRESS]",
    "[SUPPORT EMAIL]",
    "[PRIVACY EMAIL]",
    "[WEBSITE DOMAIN]",
    "[AI PROVIDER(S)]",
    "[SUPABASE REGION / PROVIDER DETAILS]",
    "[ANALYTICS / ATTRIBUTION PROVIDERS]",
    "[MINIMUM AGE]",
    "[EFFECTIVE DATE]",
  ],
  terms: [
    "[LEGAL ENTITY NAME]",
    "[REGISTERED / BUSINESS ADDRESS]",
    "[SUPPORT EMAIL]",
    "[GOVERNING LAW]",
    "[COURTS OR DISPUTE PROCESS]",
    "[MINIMUM AGE]",
    "[EFFECTIVE DATE]",
  ],
  "subscription-terms": ["[EFFECTIVE DATE]"],
  cookies: [
    "[LEGAL ENTITY NAME]",
    "[WEBSITE DOMAIN]",
    "[ANALYTICS / ATTRIBUTION PROVIDERS]",
    "[PRIVACY EMAIL]",
    "[EFFECTIVE DATE]",
  ],
};

test("every legal slug has a content file and every content file is a known slug", () => {
  assert.deepEqual(files.map((f) => f.replace(/\.md$/, "")).sort(), [...LEGAL_SLUGS].sort());
});

for (const slug of LEGAL_SLUGS) {
  test(`${slug}.md parses with complete front matter and h2 sections`, () => {
    const doc = getLegalDoc(slug);
    assert.equal(doc.slug, slug);
    assert.ok(doc.title.length > 0);
    assert.ok(doc.summary.length > 0);
    assert.equal(doc.effectiveDateKey, "EFFECTIVE_DATE");
    assert.equal(doc.draft, true);
    assert.ok(doc.toc.length >= 4, "has numbered ## sections");
    assert.equal(new Set(doc.toc.map((t) => t.id)).size, doc.toc.length, "unique heading ids");
    assert.ok(!doc.html.includes("<!--"), "authoring comments are stripped from the page");
    assert.ok(!/COUNSEL NOTE|DEVIATION/.test(doc.html));
  });

  test(`${slug}: placeholders are preserved and highlighted when config is unset`, () => {
    const source = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
    const doc = parseLegal(source, UNSET);
    const visible = stripComments(source);
    for (const token of findPlaceholders(visible)) {
      assert.ok(doc.html.includes(token), `${token} still visible`);
    }
    for (const token of REQUIRED[slug]) {
      assert.ok(doc.unresolved.includes(token), `${slug} keeps ${token}`);
    }
    // Subscription Terms no longer carries any body placeholder (no prices on the site), so only
    // documents with visible placeholders must render the highlight markup.
    if (findPlaceholders(visible).length > 0) {
      assert.ok(doc.html.includes('class="placeholder legal-placeholder"'));
    }
    assert.equal(doc.effectiveDate, "[EFFECTIVE DATE]");
    assert.ok(hasUnresolvedPlaceholders(doc));
  });

  test(`${slug}: placeholders resolve when config is set`, () => {
    const source = fs.readFileSync(path.join(CONTENT_DIR, `${slug}.md`), "utf8");
    const doc = parseLegal(source, FILLED);
    assert.deepEqual(doc.unresolved, [], `nothing left: ${doc.unresolved.join(", ")}`);
    assert.equal(hasUnresolvedPlaceholders(doc), false);
  });
}

test("every placeholder used in content is a known config-backed token", () => {
  for (const f of files) {
    const text = stripComments(fs.readFileSync(path.join(CONTENT_DIR, f), "utf8"));
    for (const token of findPlaceholders(text)) {
      assert.ok(token in PLACEHOLDER_SOURCES, `${f}: unknown placeholder ${token}`);
    }
  }
});

test("interpolation: emails become mailto links, annual price drops its suffix", () => {
  assert.equal(interpolate("Mail [SUPPORT EMAIL].", FILLED), "Mail [help@example.test](mailto:help@example.test).");
  assert.equal(interpolate("[ANNUAL PRICE] per year", FILLED), "£1.00 per year");
  assert.equal(interpolate("[ANNUAL PRICE] per year", UNSET), "[ANNUAL PRICE] per year");
});

test('no "ArgueWin"/"Arguewin" anywhere in web/content', () => {
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)],
    );
  for (const file of walk(path.join(CONTENT_DIR, ".."))) {
    assert.ok(!/arguewin/i.test(fs.readFileSync(file, "utf8")), `${file} mentions the old brand`);
  }
});

// Amendment 2026-09-24 s: Plead sells access to itself; no "Premium" tier wording anywhere user-facing.
test('no "Premium" wording in content/, app/ or components/ outside HTML comments', () => {
  const root = path.resolve(CONTENT_DIR, "..", "..");
  const exts = /\.(md|mdx|tsx?|jsx?|html|json)$/;
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const p = path.join(dir, e.name);
      return e.isDirectory() ? walk(p) : exts.test(e.name) ? [p] : [];
    });
  const offenders: string[] = [];
  for (const dir of ["content", "app", "components"]) {
    const abs = path.join(root, dir);
    if (!fs.existsSync(abs)) continue;
    for (const file of walk(abs)) {
      const text = fs.readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, "");
      text.split("\n").forEach((line, i) => {
        if (/\bpremium\b/i.test(line)) offenders.push(`${path.relative(root, file)}:${i + 1}: ${line.trim()}`);
      });
    }
  }
  assert.deepEqual(offenders, [], `"Premium" found:\n${offenders.join("\n")}`);
});
