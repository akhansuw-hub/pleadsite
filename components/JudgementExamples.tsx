import SectionHeading from "./SectionHeading";

const cases = [
  { tag: "Food case", emoji: "🍕", items: ["Replace the meal", "Winner chooses takeaway", "Plan a dinner date"] },
  { tag: "Housework case", emoji: "🧺", items: ["Take over the dishes", "Do the laundry", "Cover a chore for a week"] },
  { tag: "Late-arrival case", emoji: "⏰", items: ["Plan the next date", "Coffees are on the loser", "Better notice next time"] },
  { tag: "TV / movie case", emoji: "🍿", items: ["Winner picks the film", "Loser supplies snacks", "No veto for one episode"] },
];

/** "Judgements with a payoff": what winning actually means. */
export default function JudgementExamples() {
  return (
    <section id="judgements" aria-labelledby="judgements-title" className="section">
      <div className="wrap">
        <div className="reveal">
          <SectionHeading
            id="judgements-title"
            eyebrow="Judgements with a payoff"
            title="Win the case. Choose the judgement."
            intro="When the verdict is in, the winner picks one judgement from safe, case-relevant options the court prepared for that case. Then it sits on the docket until it is served."
          />
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {cases.map((c, i) => (
            <li
              key={c.tag}
              className="reveal flex flex-col gap-4 rounded-[var(--radius-card)] bg-paper p-5 shadow-[var(--shadow-card)] ring-1 ring-line"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <p className="flex items-center gap-2.5">
                <span aria-hidden="true" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cream text-xl">
                  {c.emoji}
                </span>
                <span className="text-lg font-black text-wine">{c.tag}</span>
              </p>
              <ul className="flex flex-col gap-2">
                {c.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[15px] font-semibold text-cocoa">
                    <span aria-hidden="true" className="mt-[7px] h-2 w-2 shrink-0 rotate-45 bg-gold" />
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <p className="reveal mt-6 flex gap-3 rounded-2xl bg-parchment/70 p-5 text-[15px] leading-relaxed font-semibold text-cocoa">
          <span aria-hidden="true" className="mt-0.5 text-lg text-burgundy">
            ♥
          </span>
          <span>
            <strong className="font-black text-wine">The safety rule:</strong> judgements stay safe, reasonable, consensual
            and non-coercive. They are not legally enforceable, and if either of you is uncomfortable, you don’t have to
            go ahead.
          </span>
        </p>
      </div>
    </section>
  );
}
