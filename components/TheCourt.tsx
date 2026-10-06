import Phone from "./Phone";
import SectionHeading from "./SectionHeading";

const bench = [
  { n: "Juror 01", focus: "Evidence", q: "What does the record actually support?" },
  { n: "Juror 02", focus: "Consistency", q: "Whose story holds together?" },
  { n: "Juror 03", focus: "Fairness", q: "What outcome is proportionate?" },
  { n: "Presiding judge", focus: "The ruling", q: "Weighs the jurors’ findings and delivers the verdict." },
];

const stages = [
  "Filing",
  "Summons",
  "Defence",
  "Evidence",
  "Objections",
  "Cross-examination",
  "Closing statements",
  "Deliberation",
  "Verdict",
];

/** "The AI court": three jurors and a judge, the trial stages, and the verdict screen. */
export default function TheCourt() {
  return (
    <section id="ai-court" aria-labelledby="court-title" className="on-dark court-dark section overflow-hidden">
      <div className="wrap">
        <div className="reveal">
          <SectionHeading
            id="court-title"
            onDark
            eyebrow="The AI court"
            title="Three AI jurors. One judge. No group chat."
            intro="Plead runs your disagreement like a real trial, so both sides are heard before anyone gets to say “told you so”."
          />
        </div>

        <div className="mt-10 grid items-center gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
          <ol className="reveal flex flex-col gap-3">
            {bench.map((j, i) => (
              <li
                key={j.n}
                className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 rounded-2xl p-4 ring-1 sm:p-5 ${
                  i === 3 ? "bg-paper text-wine ring-paper" : "bg-paper/8 ring-paper/15"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${i === 3 ? "bg-parchment" : "bg-paper/10"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={i === 3 ? "/brand/PleadHeart.svg" : "/brand/PleadScales.svg"}
                    alt=""
                    width={i === 3 ? 20 : 28}
                    height={i === 3 ? 20 : 28}
                    className="pixelated"
                  />
                </span>
                <div>
                  <p className={`court-label ${i === 3 ? "text-gold-ink" : "text-gold"}`}>{j.n}</p>
                  <p className={`text-lg font-black ${i === 3 ? "text-wine" : "text-paper"}`}>{j.focus}</p>
                  <p className={`text-[15px] font-semibold ${i === 3 ? "text-cocoa" : "text-cream/75"}`}>{j.q}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="reveal mx-auto w-full max-w-[280px] lg:max-w-[300px]">
            <Phone
              shot="verdict"
              sizes="300px"
              alt="The verdict screen: Plaintiff wins, Alex knew the slice had been promised to Sam and the evidence supports Sam’s account."
            />
          </div>
        </div>

        <div className="reveal mt-12 flex flex-col gap-5 lg:mt-16">
          <ol aria-label="Trial stages" className="scroll-row">
            {stages.map((s, i) => (
              <li
                key={s}
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-paper/10 px-3.5 py-2 text-sm font-bold whitespace-nowrap text-cream ring-1 ring-paper/15"
              >
                <span className="font-serif text-xs text-gold" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <blockquote className="max-w-[34em] font-serif text-xl leading-snug text-paper italic sm:text-2xl">
            “Screenshots become exhibits. Excuses become testimony. Petty disagreements become Case #024.”
          </blockquote>
          <p className="max-w-[44em] text-sm font-semibold text-cream/70">
            AI-generated rulings for everyday disagreements. The court can get things wrong; it is for fun and
            conversation, not legal, medical, financial or professional advice.
          </p>
        </div>
      </div>
    </section>
  );
}
