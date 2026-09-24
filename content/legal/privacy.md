---
title: Privacy Policy
slug: privacy
summary: How Plead collects, uses, shares and protects personal information across the app, the website and related services.
effectiveDateKey: EFFECTIVE_DATE
lastUpdated: "2026-09-24"
draft: true
---

<!--
STATUS (brief §8): Working copy for implementation. Replace bracketed fields and have counsel/privacy
review before publishing. Placeholders are interpolated from web/site.config.ts once real values are set.
-->

This Privacy Policy explains how [LEGAL ENTITY NAME] (“Plead”, “we”, “us” or “our”) collects, uses, shares and protects personal information when you use the Plead mobile app, our website at [WEBSITE DOMAIN], and related services (together, the “Services”).

## 1. Who we are

[LEGAL ENTITY NAME] is the operator of Plead and, where applicable, the controller of personal information described in this policy. Contact: [PRIVACY EMAIL]. Address: [REGISTERED / BUSINESS ADDRESS].

## 2. Information we collect

- **Account information:** display name, sign-in identifiers, account ID, avatar selection, linked-couple ID and account creation details.
- **Partner/couple information:** invite codes, linking status, partner display name and relationship metadata you choose to provide.
- **Case content:** case titles, allegations/positions, defence statements, requested remedies, counter-claims, trial responses, objections, appeals if enabled, and winner-selected judgements.
- **Evidence you submit:** screenshots, photos, text excerpts, captions, receipts and, if enabled in future, voice notes. Evidence may contain information about you or other people.
- **AI-generated content:** juror findings, judge questions, rulings, verdicts, judgement suggestions and safety classifications.
- **Subscription information:** product purchased, entitlement status, renewal/expiry metadata and transaction identifiers supplied by Apple/RevenueCat. We do not receive your full payment-card number from Apple.
- **Device and technical information:** app version, operating system, device identifiers permitted by the platform, crash/debug data, timestamps and IP-derived information where provided by infrastructure services.
- **Notification data:** push token, notification preferences and delivery-related metadata.
- **Attribution/advertising information:** if and when AppsFlyer or similar services are enabled, information permitted by your device settings/consent may be used to understand which campaigns led to installs or usage.
- **Support communications:** messages and attachments you send to support.

## 3. How we use information

- Provide and operate accounts, partner linking, cases, evidence, trial flows, verdicts and judgement selection.
- Process case records through AI systems to generate juror analysis, judge responses and rulings.
- Provide subscriptions and the couple's subscription, which gives both linked partners access to Plead.
- Send transactional notifications such as summonses, turn reminders and verdict alerts.
- Protect the Services, detect abuse, enforce rules and operate safety checks.
- Diagnose errors, measure performance and improve the product.
- Measure marketing attribution where enabled and legally permitted.
- Respond to support, privacy and legal requests.
- Comply with legal obligations and establish, exercise or defend legal claims where necessary.

## 4. Legal bases (UK/EEA where applicable)

Depending on the activity, we may rely on performance of a contract, legitimate interests, consent, or compliance with a legal obligation. Where consent is the basis, you may withdraw it at any time, although this does not affect earlier lawful processing.

<!--
COUNSEL NOTE (brief §8.4): The final launch policy should map each production processing activity to the
appropriate legal basis after legal review.
-->

## 5. AI processing

Plead uses third-party AI service providers to process case information and generate juror findings, questions, suggestions and rulings. This can include text from your case and relevant evidence or captions.

AI provider(s) used in production: [AI PROVIDER(S)].

<!--
COUNSEL NOTE (brief §8.5): Before launch, name or otherwise appropriately identify the production AI
provider(s), describe any international transfers, and verify contractual data-use settings. Do not promise
that a provider will not retain or train on data unless the applicable contract and configuration support
that statement.
DEVIATION: the brief's instruction sentence was replaced by the visible "[AI PROVIDER(S)]" line above so the
placeholder stays obvious on the page.
-->

## 6. How we share information

- **Your linked partner:** information submitted to a shared case may be disclosed to the other party as part of the trial/evidence flow.
- **Service providers:** hosting/database/storage providers ([SUPABASE REGION / PROVIDER DETAILS]), AI providers ([AI PROVIDER(S)]), RevenueCat, Apple, notification infrastructure, analytics/attribution providers if enabled ([ANALYTICS / ATTRIBUTION PROVIDERS]), customer-support tooling and security providers.
- **Legal/safety disclosures:** where required by law or reasonably necessary to protect rights, safety, users or the Services.
- **Business transfers:** in connection with a merger, acquisition, financing, reorganisation or sale, subject to applicable law.

## 7. Data retention

We retain information only for as long as necessary for the purposes described in this policy, including account operation, case history, fraud prevention, legal obligations and dispute resolution.

When you delete your account, we delete or anonymise your data where feasible. Some records may need to be retained for legal, security, billing or integrity reasons.

Shared cases relate to both partners, so they are handled as follows when one partner deletes their account:

- Your sign-in account (email, Apple identity and sessions), display name, avatar, push token and notification details are deleted.
- Evidence files you uploaded (photos, screenshots and any other files) are removed from storage.
- The shared case history (cases, statements, evidence captions and text, verdicts and judgements) stays available to your former partner, with your profile shown as “Former partner”.
- Records of safety checks are kept for safety and integrity reasons.
- Any cases still in progress end as a mistrial.

See [Delete your account](/delete-account/) for step-by-step instructions.

<!--
COUNSEL NOTE (brief §8.7): Define production retention periods before launch. Shared-case records require a
documented deletion policy because they relate to both partners.
DEVIATION: the brief's "Account deletion should delete or anonymise data where feasible…" and "Shared-case
records require a documented deletion policy…" were instructions to us. They are replaced with the policy as
built (CONTRACTS-v2 Amendment 2026-09-24 i, supabase/README.md "Account deletion"): the leaver's profile is
anonymised as "Former partner", their exhibit files are removed, captions/text bodies, cases, turns and
verdicts stay for the partner, safety_flags are kept, open cases become mistrials via couple_leave.
The subscription row is also kept (billing/integrity); covered by "billing" above.
-->

## 8. International transfers

Some providers may process information outside the UK/EEA. Where required, we use appropriate safeguards such as adequacy decisions, standard contractual clauses, the UK International Data Transfer Agreement/Addendum, or another lawful transfer mechanism.

Hosting, database and storage: [SUPABASE REGION / PROVIDER DETAILS].

<!--
COUNSEL NOTE (brief §8.8): Update this section based on the actual production vendors and regions.
DEVIATION: "use appropriate safeguards" rewritten in the first person ("we use…") and a visible
[SUPABASE REGION / PROVIDER DETAILS] line added.
-->

## 9. Your rights

Depending on your location, you may have rights to access, correct, delete, restrict or object to processing, request portability, withdraw consent, and complain to a data-protection authority. UK users may complain to the Information Commissioner’s Office (ICO). Requests can be sent to [PRIVACY EMAIL]. We may need to verify your identity.

## 10. Sensitive and third-party information

Do not upload information you do not have the right to share. Relationship disputes may contain sensitive information about you or others. Please avoid including sensitive information that is not needed for your case. You are responsible for the evidence you submit.

<!--
COUNSEL NOTE (brief §8.10): Plead should minimise unnecessary sensitive data and make clear that users are
responsible for evidence they submit. If special-category data is expected to be processed routinely, obtain
specific legal advice and document the lawful condition for processing.
DEVIATION: the product-facing instruction was rewritten as user-facing guidance.
-->

## 11. Children

Plead is intended for users aged [MINIMUM AGE] and over.

<!--
COUNSEL NOTE (brief §8.11): This draft assumes Plead is intended for users aged 18 and over. Confirm the
minimum age before launch and revise this section if the product will permit minors.
[MINIMUM AGE] is interpolated from siteConfig.MINIMUM_AGE (defaults to 18 per CONTRACTS-v2 amendment m).
-->

## 12. Security

We use reasonable technical and organisational measures designed to protect information. These include private storage for evidence files, access controls that limit case data to the linked couple, and time-limited signed links for viewing evidence. No system is completely secure, so we cannot guarantee absolute security.

<!--
COUNSEL NOTE (brief §8.12): Production measures should include private storage for evidence, access controls,
authenticated signed URLs, encryption in transit and least-privilege service access.
DEVIATION: only measures verified in the codebase are stated to users (private `exhibits` bucket, couple RLS,
signed URLs: supabase/migrations/20260923000500_storage.sql). "Encryption in transit" and "least-privilege
service access" are left out of user-facing copy until confirmed, per brief §13 (no unsupported claims about
encryption).
-->

## 13. Website cookies and similar technologies

Our website may use strictly necessary technologies and, if enabled with appropriate consent, analytics or advertising technologies. See the [Cookie Policy](/cookies/) and cookie settings for details.

## 14. Changes to this policy

We may update this policy from time to time. We will change the effective date and provide additional notice where required by law.

## 15. Contact us

Privacy questions or requests: [PRIVACY EMAIL]. Support: [SUPPORT EMAIL]. Postal address: [REGISTERED / BUSINESS ADDRESS].
