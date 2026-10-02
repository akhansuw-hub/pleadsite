import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import LegalLayout from "@/components/LegalLayout";
import { legalMetadata, slugify, type TocItem } from "@/lib/legal";
import { isPlaceholder, mailtoHref, siteConfig } from "@/site.config";

const SUMMARY =
  "Help with accounts, partner linking, cases, AI verdicts, subscriptions, notifications, privacy and safety.";

export const metadata: Metadata = legalMetadata({ title: "Support", summary: SUMMARY, path: "/support/" });

interface QA {
  q: string;
  a: ReactNode;
}
interface Section {
  title: string;
  items: QA[];
}

const manage = siteConfig.MANAGE_SUBSCRIPTION_URL;
const managePlay = siteConfig.PLAY_MANAGE_SUBSCRIPTION_URL;

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

function Email({ value, subject }: { value: string; subject: string }) {
  const href = mailtoHref(value, subject);
  return href ? <a href={href}>{value}</a> : <span className="placeholder legal-placeholder">{value}</span>;
}

const SECTIONS: Section[] = [
  {
    title: "Account & linking",
    items: [
      {
        q: "How do I link with my partner?",
        a: "One of you creates your couple in the app and shares the invite. Your partner opens the invite (or enters the code) to join. Once you are linked, you share one docket of cases.",
      },
      {
        q: "Do we both need to pay?",
        a: "No. One active Plead subscription unlocks Plead for both linked partners. If your partner has already subscribed, Plead tells you when you join and you can go straight in.",
      },
      {
        q: "How do I unlink?",
        a: "Open Settings (the gear on the Home screen) → Account → Unlink couple. Cases still in progress end as a mistrial, cases with a verdict are closed and keep it, and your case history stays readable.",
      },
      {
        q: "I got a new phone. How do I get back in?",
        a: "Install Plead and sign in the same way you did before (Sign in with Apple, Sign in with Google or the same email). Your couple and case history are tied to your account, not your device.",
      },
    ],
  },
  {
    title: "Cases & evidence",
    items: [
      {
        q: "Who can file a case?",
        a: "Either partner. Whoever files is the plaintiff for that case and the other partner is summoned as the defendant. Roles are per case, not fixed by person.",
      },
      {
        q: "What evidence can I add?",
        a: "Screenshots, photos, text excerpts and receipts, each with a caption. There is no exhibit limit. During the trial, evidence is shown one exhibit at a time and your partner can object to each.",
      },
      {
        q: "Can my partner see my evidence?",
        a: "Yes. Evidence is part of the shared case record and is shown to your partner during the trial. Only add things you are comfortable sharing and have the right to share.",
      },
      {
        q: "How many cases can we have open?",
        a: "Up to three open cases at a time. Closed cases stay in your history.",
      },
    ],
  },
  {
    title: "AI verdicts",
    items: [
      {
        q: "Does a real person judge our argument?",
        a: "No. Three AI jurors review the record independently (evidence, consistency and fairness), then an AI presiding judge delivers the ruling. Human voting is not how verdicts are decided.",
      },
      {
        q: "Can the AI get it wrong?",
        a: "Yes. AI rulings can be incomplete, inaccurate or inconsistent. Plead is for everyday disagreements and entertainment, not legal, medical, financial or other professional advice.",
      },
      {
        q: "What happens after the verdict?",
        a: "The winner chooses the court’s judgement from safe, case-relevant options generated for that case, like planning the next date or taking over a chore. Judgements are playful agreements, not legally enforceable, and nobody has to do anything they are uncomfortable with. In a tie, the court picks a compromise for you both.",
      },
      {
        q: "Can I appeal a verdict?",
        a: "Not yet. Appeals are not available in the current version of Plead.",
      },
    ],
  },
  {
    title: "Subscriptions & billing",
    items: [
      {
        q: "What plans are there?",
        a: (
          <>
            Plead has weekly, monthly and annual plans, billed by Apple (iPhone) or Google Play (Android) at the price shown in the store
            when you subscribe. Eligible users get a 3-day free trial on the annual plan; the monthly and weekly plans have no
            free trial. One subscription covers both linked partners. See the{" "}
            <Link href="/subscription-terms/">Subscription Terms</Link>.
          </>
        ),
      },
      {
        q: "How do I cancel?",
        a: (
          <>
            Subscriptions are billed and managed by the store you subscribed through. On iPhone, go to Apple’s{" "}
            <Ext href={manage}>Manage subscriptions</Ext>, or open Settings → your name → Subscriptions → Plead. On
            Android, go to Google Play’s <Ext href={managePlay}>Subscriptions</Ext> page, or open the Play Store → your
            profile picture → Payments &amp; subscriptions → Subscriptions → Plead. Deleting the app or your Plead
            account does not cancel the subscription.
          </>
        ),
      },
      {
        q: "I paid but Plead still asks me to subscribe.",
        a: "Open Plead → Settings → Subscription → Restore purchases while signed in to the store account that made the purchase (the Apple ID on iPhone, or the Google account on Android). If your partner paid, make sure you are both still linked.",
      },
      {
        q: "Can I get a refund?",
        a: (
          <>
            Purchases are processed by Apple or Google Play, so refunds are requested from the store you paid: on
            iPhone at <Ext href="https://reportaproblem.apple.com">reportaproblem.apple.com</Ext>, on Android through{" "}
            <Ext href="https://support.google.com/googleplay/answer/2479637">Google Play’s refund process</Ext>,
            subject to that store’s processes and applicable law.
          </>
        ),
      },
    ],
  },
  {
    title: "Notifications",
    items: [
      {
        q: "What will Plead notify me about?",
        a: "Summonses, your turn in a trial, when the court starts deliberating, when the verdict is ready, and updates about the court’s judgement.",
      },
      {
        q: "Why did a notification arrive late at night?",
        a: "Ordinary reminders wait for quiet hours to end (23:00–08:00). Summonses and verdict alerts always come through.",
      },
      {
        q: "How do I turn notifications on or off?",
        a: "In Plead, open Settings → Notifications. That takes you to Plead’s notification settings on your iPhone or Android phone.",
      },
    ],
  },
  {
    title: "Privacy & safety",
    items: [
      {
        q: "Who can see our cases?",
        a: (
          <>
            Cases are private to the two of you. Case content is processed by AI service providers to generate the
            jurors’ findings and the ruling. Read the <Link href="/privacy/">Privacy Policy</Link> for details.
          </>
        ),
      },
      {
        q: "What if an argument is about something serious?",
        a: "Plead is built for everyday disagreements. It stops cases that appear to involve abuse, coercion, threats, self-harm or other serious safety concerns and shows support resources instead. See the safety box on this page.",
      },
      {
        q: "How do I report a safety issue or misuse?",
        a: (
          <>
            Email <Email value={siteConfig.SUPPORT_EMAIL} subject="Plead safety report" /> with “Safety” in the
            subject line and as much detail as you are comfortable sharing. If anyone is in immediate danger, call the
            emergency services first.
          </>
        ),
      },
      {
        q: "How do I delete my account?",
        a: (
          <>
            In the app: Settings → Account → Delete account. Full details, including what your partner keeps, are on{" "}
            <Link href="/delete-account/">Delete your account</Link>.
          </>
        ),
      },
    ],
  },
];

const toc: TocItem[] = [
  { id: "contact", text: "Contact us" },
  ...SECTIONS.map((s) => ({ id: slugify(s.title), text: s.title })),
  { id: "safety", text: "Safety & urgent help" },
  { id: "quick-links", text: "Quick links" },
];

// UK is the default region (matches the app's GB safety resources). Add other regions before launching there.
const UK_RESOURCES = [
  { name: "Emergency services", detail: "If someone is in immediate danger", href: "tel:999", label: "999" },
  { name: "Samaritans", detail: "Free, 24/7, if you are struggling to cope", href: "tel:116123", label: "116 123" },
  {
    name: "Refuge — National Domestic Abuse Helpline",
    detail: "Free, 24/7",
    href: "tel:08082000247",
    label: "0808 2000 247",
  },
  { name: "Relate", detail: "Relationship support and counselling", href: "https://www.relate.org.uk", label: "relate.org.uk" },
];

export default function SupportPage() {
  const supportHref = mailtoHref(siteConfig.SUPPORT_EMAIL, "Plead support");
  const emailPending = isPlaceholder(siteConfig.SUPPORT_EMAIL);

  return (
    <LegalLayout
      title="How can we help?"
      eyebrow="Support"
      intro={<p>Answers to common questions about Plead, and how to reach us when you need a person.</p>}
      draft={emailPending}
      draftMessage="Some contact details on this page have not been confirmed yet and are shown in highlighted [BRACKETS]."
      toc={toc}
      current="support"
    >
      <section id="contact" aria-labelledby="contact-title" className="legal-section rounded-3xl bg-wine p-6 text-cream sm:p-8">
        <h2 id="contact-title" className="text-xl font-bold text-paper">
          Contact support
        </h2>
        <p className="mt-2 text-cream/90">Email us and include the email, Apple ID or Google account you use to sign in to Plead.</p>
        <p className="mt-4 break-words text-2xl font-bold">
          {supportHref ? (
            <a href={supportHref} className="text-paper underline underline-offset-4">
              {siteConfig.SUPPORT_EMAIL}
            </a>
          ) : (
            <span className="placeholder legal-placeholder">{siteConfig.SUPPORT_EMAIL}</span>
          )}
        </p>
      </section>

      <div className="prose-plead legal-prose">
        {SECTIONS.map((s) => (
          <section key={s.title} aria-labelledby={slugify(s.title)}>
            <h2 id={slugify(s.title)}>{s.title}</h2>
            {s.items.map((item) => (
              <div key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </section>
        ))}

        <section id="safety" aria-labelledby="safety-title" className="legal-callout mt-10 border-l-4 border-burgundy">
          <h2 id="safety-title" className="!mt-0">
            Safety & urgent help
          </h2>
          <p>
            <strong>Plead is not an emergency service.</strong> If someone is in immediate danger, contact your local
            emergency services now.
          </p>
          <p className="!mb-2">In the UK you can contact:</p>
          <ul className="!list-none !pl-0">
            {UK_RESOURCES.map((r) => (
              <li key={r.name} className="!my-0">
                <a
                  href={r.href}
                  {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="tap flex flex-wrap items-center gap-x-2 py-2 !no-underline"
                >
                  <span className="font-bold text-burgundy underline underline-offset-4">{r.label}</span>
                  <span className="text-cocoa">
                    {r.name} · {r.detail}
                  </span>
                  {r.href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
          <p className="!mb-0 text-[0.9375rem] text-muted">
            These resources are for the UK. If you are elsewhere, call your local emergency number or a local support
            service.
          </p>
        </section>

        <section id="quick-links" aria-labelledby="quick-links-title">
          <h2 id="quick-links-title">Quick links</h2>
        </section>
      </div>

      <ul className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <li>
          <a href={manage} target="_blank" rel="noopener noreferrer" className="legal-button w-full sm:w-auto">
            Manage Apple subscription<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li>
          <a href={managePlay} target="_blank" rel="noopener noreferrer" className="legal-button w-full sm:w-auto">
            Manage Google Play subscription<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li>
          <Link href="/subscription-terms/#6-restoring-purchases" className="legal-button legal-button-secondary w-full sm:w-auto">
            Restore purchases
          </Link>
        </li>
        <li>
          <Link href="/privacy/" className="legal-button legal-button-secondary w-full sm:w-auto">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/terms/" className="legal-button legal-button-secondary w-full sm:w-auto">
            Terms
          </Link>
        </li>
        <li>
          <Link href="/delete-account/" className="legal-button legal-button-secondary w-full sm:w-auto">
            Delete account
          </Link>
        </li>
      </ul>
    </LegalLayout>
  );
}
