import Link from "next/link";
import Container from "./Container";
import SectionHeading from "./SectionHeading";

const points = [
  {
    title: "Private to the two of you",
    body: "Cases are private to the linked couple by default. There is no public feed and no audience voting on your case.",
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
    <section id="privacy-safety" aria-labelledby="safety-title" className="bg-paper py-20 sm:py-28">
      <Container>
        <div className="reveal">
          <SectionHeading
            id="safety-title"
            eyebrow="Privacy and safety"
            title="Playful court. Serious about care."
          />
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {points.map((p, i) => (
            <li
              key={p.title}
              className="reveal flex gap-4 rounded-[var(--radius-card)] bg-cream p-6 ring-1 ring-line"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paper ring-1 ring-line">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/PleadHeart.svg" alt="" width={18} height={18} className="pixelated" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-wine">{p.title}</h3>
                <p className="mt-1.5 leading-relaxed text-cocoa">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="reveal mt-8 text-center text-[15px] text-cocoa">
          Read the{" "}
          <Link href="/privacy/" className="font-semibold text-burgundy underline underline-offset-2">
            Privacy Policy
          </Link>{" "}
          for the full details.
        </p>
      </Container>
    </section>
  );
}
