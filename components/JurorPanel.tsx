import Container from "./Container";
import PixelArt from "./PixelArt";
import SectionHeading from "./SectionHeading";

const jurors = [
  { n: "Juror 01", focus: "Evidence", q: "What is actually supported by the record?" },
  { n: "Juror 02", focus: "Consistency", q: "Whose story holds together?" },
  { n: "Juror 03", focus: "Fairness", q: "What outcome is proportionate and reasonable?" },
];

function Icon({ kind }: { kind: "scales" | "heart" }) {
  return (
    <span aria-hidden="true" className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-parchment ring-1 ring-[#e3cbb5]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={kind === "scales" ? "/brand/PleadScales.svg" : "/brand/PleadHeart.svg"}
        alt=""
        width={kind === "scales" ? 28 : 20}
        height={kind === "scales" ? 28 : 20}
        className="pixelated"
      />
    </span>
  );
}

export default function JurorPanel() {
  return (
    <section id="jurors" aria-labelledby="jurors-title" className="py-20 sm:py-28">
      <Container>
        <div className="reveal">
          <SectionHeading
            id="jurors-title"
            eyebrow="Multiple AIs, one verdict"
            title="Three AI jurors. One presiding AI judge."
            intro="Each AI juror reviews the case record independently with its own focus. The presiding AI judge then weighs their findings and delivers the court’s ruling."
          />
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1fr_1fr_1.25fr]">
          {jurors.map((j, i) => (
            <article
              key={j.n}
              className="reveal flex flex-col gap-4 rounded-[var(--radius-card)] bg-paper p-6 shadow-[var(--shadow-card)] ring-1 ring-line"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <Icon kind="scales" />
                <span className="court-label text-gold-ink">{j.n}</span>
              </div>
              <h3 className="text-xl font-bold text-wine">{j.focus}</h3>
              <p className="leading-relaxed text-cocoa">{j.q}</p>
              <p className="mt-auto inline-flex items-center gap-2 border-t border-line pt-4 text-sm font-medium text-muted">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
                Deliberates independently
              </p>
            </article>
          ))}

          <article className="reveal relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-wine text-cream shadow-[var(--shadow-card)] on-dark sm:flex-row lg:flex-col">
            <PixelArt
              src="/art/frame3_judge"
              width={1170}
              height={2532}
              position="50% 41%"
              alt="Pixel-art presiding judge in a white wig and round glasses at the bench."
              className="block aspect-[16/9] h-auto w-full sm:aspect-auto sm:w-2/5 lg:aspect-[16/9] lg:w-full"
            />
            <div className="flex flex-col gap-3 p-6">
              <div className="flex items-center justify-between gap-3">
                <Icon kind="heart" />
                <span className="court-label text-gold">Presiding Judge</span>
              </div>
              <h3 className="text-xl font-bold text-paper">Final ruling</h3>
              <p className="leading-relaxed text-cream/90">
                Reviews the structured findings and delivers the court’s ruling.
              </p>
            </div>
          </article>
        </div>

        <p className="reveal mx-auto mt-10 max-w-[640px] rounded-2xl bg-parchment px-5 py-4 text-center text-[15px] leading-relaxed text-cocoa">
          <strong className="text-wine">AI-generated rulings, for everyday disagreements.</strong> Plead’s AI court can
          get things wrong. It’s for fun and conversation, not legal, medical, financial or professional advice.
        </p>
      </Container>
    </section>
  );
}
