import Link from "next/link";
import SectionHeading from "./SectionHeading";

const points = [
  {
    title: "Private to the two of you",
    body: "Cases are private to the linked couple by default. No public feed, no audience voting on your case.",
  },
  {
    title: "AI processing, stated plainly",
    body: "Case content, including relevant evidence, may be processed by AI service providers to generate the jurors’ deliberation and the ruling.",
  },
  {
    title: "Evidence is shared with your partner",
    body: "Evidence becomes part of the shared case record and may be shown to your partner during the trial, so only submit what you’re comfortable sharing.",
  },
  {
    title: "Not for serious situations",
    body: "Plead is designed to stop or decline cases involving abuse, coercion, threats, self-harm or serious safety concerns, and to point to support resources. If someone is in immediate danger, contact local emergency services.",
  },
];

export default function PrivacySafety() {
  return (
    <section id="privacy-safety" aria-labelledby="safety-title" className="section pt-0">
      <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="reveal">
          <SectionHeading id="safety-title" eyebrow="Privacy and safety" title="Playful court. Serious about care." />
          <p className="mt-5 text-[15px] font-semibold text-muted">
            Read the{" "}
            <Link href="/privacy/" className="font-extrabold text-burgundy underline underline-offset-4">
              Privacy Policy
            </Link>{" "}
            for the full details.
          </p>
        </div>
        <ul className="reveal divide-y divide-line rounded-[var(--radius-card)] bg-paper shadow-[var(--shadow-card)] ring-1 ring-line">
          {points.map((p) => (
            <li key={p.title} className="flex gap-4 p-5 sm:p-6">
              <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream ring-1 ring-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/PleadHeart.svg" alt="" width={18} height={18} className="pixelated" />
              </span>
              <div>
                <h3 className="text-[1.1rem] font-black text-wine">{p.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed font-semibold text-cocoa">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
