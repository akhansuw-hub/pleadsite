import Link from "next/link";
import type { ReactNode } from "react";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "Does a real person judge our argument?",
    a: "No. Plead uses multiple AI jurors and an AI judge. Human voting is not the default verdict mechanism.",
  },
  {
    q: "Can my partner see my evidence?",
    a: "Case evidence is part of the shared case record and may be shown to the other party during the trial flow, so only upload what you’re comfortable sharing with your partner.",
  },
  {
    q: "Is Plead legal advice?",
    a: "No. Plead is an entertainment/relationship app for everyday disagreements and does not provide legal or professional advice.",
  },
  {
    q: "Do both of us need to pay?",
    a: "No. One active Plead subscription unlocks Plead for both linked partners.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Subscriptions are managed through the App Store on iPhone or Google Play on Android. Cancellation affects future renewals and access continues according to that store’s billing rules.",
  },
  {
    q: "What happens after I win?",
    a: "The winner chooses from safe, case-relevant judgement options generated for that case.",
  },
  {
    q: "Can I delete my account?",
    a: (
      <>
        Yes. In the app, go to Settings → Account → Delete Account, or follow the steps on our{" "}
        <Link href="/delete-account/" className="font-semibold text-burgundy underline underline-offset-2">
          Delete Account
        </Link>{" "}
        page. Deleting your account does not cancel a subscription with Apple or Google Play.
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <Container width="narrow">
        <div className="reveal">
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions for the court" />
        </div>
        <div className="reveal mt-10 divide-y divide-line overflow-hidden rounded-[var(--radius-card)] bg-paper shadow-[var(--shadow-card)] ring-1 ring-line">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-[17px] font-semibold text-wine hover:bg-cream sm:px-6 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-parchment text-burgundy transition-transform group-open:rotate-45"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 leading-relaxed text-cocoa sm:px-6">{f.a}</div>
            </details>
          ))}
        </div>
        <p className="reveal mt-8 text-center text-[15px] text-cocoa">
          More questions? Visit{" "}
          <Link href="/support/" className="font-semibold text-burgundy underline underline-offset-2">
            Support
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
