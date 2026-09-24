# Plead website

The marketing and legal site for Plead (the couples' AI court app): the landing page plus Privacy, Terms,
Subscription Terms, Cookies, Support and Delete Account pages. Next.js (App Router), statically exported.
Legal copy lives in `content/legal/*.md` and is rendered by `lib/legal.ts`.

## Commands

```bash
npm install
npm run dev          # local dev server on http://localhost:3000
npm run build        # static export to out/
npm run test:legal   # legal-content tests (lib/legal.test.ts): front matter, placeholders, brand wording
npm run lint
npm run assets       # regenerate icons / social images (scripts/make-assets.mjs)
```

## Configuration

Every launch-dependent value lives in `site.config.ts` and can be overridden at build time with a
`NEXT_PUBLIC_<KEY>` environment variable (blank counts as unset):

| Key | Default | Notes |
|---|---|---|
| `APP_STORE_URL` | unset | unset → waitlist CTA everywhere |
| `WAITLIST_URL` | unset | form POST endpoint (`email`); unset → mailto `SUPPORT_EMAIL` |
| `SUPPORT_EMAIL`, `PRIVACY_EMAIL` | placeholder | |
| `LEGAL_ENTITY_NAME`, `LEGAL_ENTITY_ADDRESS` | placeholder | |
| `GOVERNING_LAW`, `COURTS`, `EFFECTIVE_DATE`, `MINIMUM_AGE` | placeholder | |
| `WEBSITE_DOMAIN` | placeholder | canonical URLs, sitemap |
| `AI_PROVIDERS`, `SUPABASE_REGION`, `ANALYTICS_PROVIDERS` | placeholder | named in the Privacy Policy |
| `CONSENT_PROMPT` | off | auto-show the cookie banner (off while no non-essential tags ship) |
| `PRICE_CURRENCY` | `GBP` | |
| `WEEKLY_PRICE_DISPLAY`, `WEEKLY_PRICE_AMOUNT`, `ANNUAL_PRICE_DISPLAY` | unset | **unused**: no prices are shown anywhere on the site |

## The placeholder rule

Legal and business facts default to the literal bracketed placeholders (`[LEGAL ENTITY NAME]`,
`[SUPPORT EMAIL]`, …, see `PLACEHOLDERS` in `site.config.ts`). They must stay visible until the real value
is confirmed and set through its env var. Never replace a placeholder with an invented fact, and never add a
price to the site.

## Deploy

`npm run build` writes a fully static site to `out/` (`output: "export"`, trailing slashes, unoptimized
images). Upload `out/` to any static host; there is no server runtime.
