import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import LegalLayout from "@/components/LegalLayout";
import { legalMetadata, type TocItem } from "@/lib/legal";
import { isPlaceholder, mailtoHref, siteConfig } from "@/site.config";

const SUMMARY =
  "How to delete your Plead account, what is deleted, what your partner keeps, and why your App Store or Google Play subscription must be cancelled separately.";

export const metadata: Metadata = legalMetadata({
  title: "Delete your account",
  summary: SUMMARY,
  path: "/delete-account/",
});

// Facts below follow the built behaviour: CONTRACTS-v2 Amendment 2026-09-24 i and supabase/README.md
// "Account deletion" (delete_account edge function + the in-app confirm sheet in SettingsView).
const DELETED: ReactNode[] = [
  "Your sign-in account: email address, Sign in with Apple or Sign in with Google link and all sessions",
  "Your name and avatar (you appear as “Former partner”)",
  "Evidence files you uploaded, such as photos and screenshots",
  "Your push-notification token, notification settings and time zone",
  "Your link to your partner. Cases still in progress end as a mistrial",
];

const KEPT: ReactNode[] = [
  "The shared case history: cases, statements, the trial transcript, verdicts and judgements",
  "Captions and text of your evidence (the files themselves are removed)",
  "Your couple’s win/loss record",
  "Everything shows your profile as “Former partner”, never your name or avatar",
];

const toc: TocItem[] = [
  { id: "step-1", text: "1. Before you start" },
  { id: "step-2", text: "2. Delete in the app" },
  { id: "step-3", text: "3. Can’t use the app?" },
  { id: "step-4", text: "4. What happens to your data" },
  { id: "step-5", text: "5. Cancel your subscription" },
];

function Step({ n, id, title, children }: { n: number; id: string; title: string; children: ReactNode }) {
  return (
    <li className="!my-0">
      <section aria-labelledby={id}>
        <h2 id={id} className="!mt-0 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-burgundy text-base font-bold text-cream"
          >
            {n}
          </span>
          <span className="sr-only">Step {n}: </span>
          {title}
        </h2>
        {children}
      </section>
    </li>
  );
}

function ListCard({ title, items, tone }: { title: string; items: ReactNode[]; tone: "removed" | "kept" }) {
  const removed = tone === "removed";
  return (
    <div className={`rounded-2xl border p-5 ${removed ? "border-line bg-paper" : "border-transparent bg-parchment"}`}>
      <h3 className="!mt-0 flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            removed ? "bg-burgundy text-cream" : "bg-mahogany text-cream"
          }`}
        >
          {removed ? "✕" : "✓"}
        </span>
        {title}
      </h3>
      <ul className="!mb-0 !list-none !pl-0">
        {items.map((item, i) => (
          <li key={i} className="border-t border-line/80 py-2 first:border-t-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DeleteAccountPage() {
  const privacyEmail = siteConfig.PRIVACY_EMAIL;
  const privacyHref = mailtoHref(privacyEmail, "Delete my Plead account");
  const manage = siteConfig.MANAGE_SUBSCRIPTION_URL;
  const managePlay = siteConfig.PLAY_MANAGE_SUBSCRIPTION_URL;

  return (
    <LegalLayout
      title="Delete your account"
      eyebrow="Account & data"
      intro={
        <p>
          You can delete your Plead account at any time from inside the app, on iPhone or Android. This page explains
          how, and exactly what happens to your data and to the case history you share with your partner.
        </p>
      }
      lastUpdated="2026-10-02"
      draft={isPlaceholder(privacyEmail)}
      draftMessage="The privacy contact address on this page has not been confirmed yet and is shown in highlighted [BRACKETS]."
      toc={toc}
      current="delete-account"
    >
      <ol className="prose-plead legal-prose flex !list-none flex-col gap-10 !pl-0">
        <Step n={1} id="step-1" title="Before you start">
          <p>
            <strong>Deleting your account is permanent</strong> and can’t be undone. It is also{" "}
            <strong>separate from your subscription</strong>: deleting your account does not cancel a
            subscription with Apple or Google Play (see step 5).
          </p>
        </Step>

        <Step n={2} id="step-2" title="Delete in the app (recommended)">
          <ol className="!list-decimal">
            <li>Open Plead (the steps are the same on iPhone and Android) and tap the Settings gear at the top of the Home screen.</li>
            <li>
              Under <strong>Account</strong>, tap <strong>Delete account</strong>.
            </li>
            <li>Read the summary of what is deleted and what your partner keeps.</li>
            <li>
              Press and hold <strong>Delete my account</strong> to confirm. Plead deletes your account and signs you
              out.
            </li>
          </ol>
          <p>
            If something goes wrong part-way through, you will see a <strong>Try again</strong> button. Trying again
            is safe and picks up where it left off.
          </p>
        </Step>

        <Step n={3} id="step-3" title="Can’t use the app?">
          <p>
            Email{" "}
            {privacyHref ? (
              <a href={privacyHref}>{privacyEmail}</a>
            ) : (
              <span className="placeholder legal-placeholder">{privacyEmail}</span>
            )}{" "}
            from the email address linked to your Plead account, or include the account identifier you sign in with
            (for example, your Sign in with Apple or Sign in with Google email). Use the subject “Delete my Plead account”. We will ask you to
            verify that the account is yours before we delete it, then follow the same process as the in-app option.
          </p>
        </Step>

        <Step n={4} id="step-4" title="What happens to your data">
          <p>
            Cases in Plead belong to both partners, so deleting your account anonymises your part of the shared
            history rather than erasing it from your partner’s record.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <ListCard title="Deleted" items={DELETED} tone="removed" />
            <ListCard title="Kept for your partner" items={KEPT} tone="kept" />
          </div>
          <div className="legal-callout mt-5">
            <h3 className="!mt-0">Also kept</h3>
            <ul className="!mb-0">
              <li>Records of the app’s safety checks, for safety and integrity reasons.</li>
              <li>Subscription and purchase records, for billing and legal reasons.</li>
            </ul>
            <p className="!mb-0 !mt-3">
              If you were the partner paying for Plead, your partner keeps access to Plead only if they have
              their own subscription. Your partner gets one notification that you have closed your account. See the{" "}
              <Link href="/privacy/#7-data-retention">Privacy Policy</Link> for more on retention.
            </p>
          </div>
        </Step>

        <Step n={5} id="step-5" title="Cancel your subscription separately">
          <p>
            Your subscription belongs to the store account that bought it (your Apple ID on iPhone, or your Google
            account on Android), not your Plead account. <strong>Deleting your account does not cancel it.</strong> To
            stop future payments, cancel in that store’s subscription settings, before or after deleting your account.
          </p>
          <p className="flex flex-wrap gap-3">
            <a href={manage} target="_blank" rel="noopener noreferrer" className="legal-button !text-cream !no-underline">
              Manage Apple subscription<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={managePlay} target="_blank" rel="noopener noreferrer" className="legal-button !text-cream !no-underline">
              Manage Google Play subscription<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <p className="text-[0.9375rem] text-muted">
            On iPhone: Settings → your name → Subscriptions → Plead → Cancel Subscription.
            <br />
            On Android: Play Store → your profile picture → Payments &amp; subscriptions → Subscriptions → Plead →
            Cancel subscription.
          </p>
        </Step>
      </ol>

      <p className="legal-callout mt-12">
        Need help first? Visit <Link href="/support/" className="font-semibold text-burgundy underline underline-offset-4">Support</Link>.
      </p>
    </LegalLayout>
  );
}
