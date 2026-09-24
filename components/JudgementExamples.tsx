import Container from "./Container";
import SectionHeading from "./SectionHeading";

const cases = [
  { tag: "Food case", emoji: "🍕", items: ["Replace the meal", "Winner chooses takeaway", "Plan a dinner date"] },
  { tag: "Housework case", emoji: "🧺", items: ["Take over the dishes", "Do the laundry", "Cover a chore for a limited period"] },
  { tag: "Late-arrival case", emoji: "⏰", items: ["Plan the next date", "Coffees are on the loser", "Give better notice next time"] },
  { tag: "TV / movie case", emoji: "🍿", items: ["Winner picks the film", "Loser supplies snacks", "No veto for one episode"] },
];

export default function JudgementExamples() {
  return (
    <section id="judgements" aria-labelledby="judgements-title" className="bg-parchment/60 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
        <div className="reveal flex flex-col gap-8 lg:sticky lg:top-28">
          <SectionHeading
            id="judgements-title"
            align="left"
            eyebrow="Judgements with a payoff"
            title="Win the case. Choose the judgement."
            intro="When the verdict is in, the winner chooses one judgement from safe, case-relevant options generated for that case."
          />

          {/* verdict card, echoing the in-app judgement block */}
          <div
            aria-label="Example verdict"
            role="group"
            className="w-full max-w-[380px] rotate-[-1.5deg] rounded-2xl bg-paper p-5 shadow-[var(--shadow-card)] ring-1 ring-[#e3cbb5]"
          >
            <p className="court-label text-mahogany">Verdict final</p>
            <p className="mt-2 text-lg font-bold text-wine">Judgement: Take them out for dinner</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="rounded-md bg-parchment px-2 py-1 text-xs font-bold tracking-wider text-mahogany">
                DUE · 3 DAYS
              </span>
              <span className="rotate-[-8deg] rounded-md border-2 border-gold-ink px-2 py-0.5 font-serif text-sm font-bold tracking-widest text-gold-ink">
                SERVED ✓
              </span>
            </div>
          </div>
        </div>

        <div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {cases.map((c, i) => (
              <li
                key={c.tag}
                className="reveal rounded-[var(--radius-card)] bg-paper p-6 shadow-[var(--shadow-card)] ring-1 ring-line"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-2xl">
                    {c.emoji}
                  </span>
                  <span className="text-lg font-bold text-wine">{c.tag}</span>
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-cocoa">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="reveal mt-6 flex gap-3 rounded-2xl border border-[#e3cbb5] bg-paper/70 p-5 text-[15px] leading-relaxed text-cocoa">
            <span aria-hidden="true" className="mt-0.5 text-lg text-burgundy">
              ♥
            </span>
            <span>
              <strong className="text-wine">The safety rule:</strong> judgements must remain safe, reasonable,
              consensual and non-coercive. They are not legally enforceable, and if either of you is uncomfortable,
              you don’t have to go ahead.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
