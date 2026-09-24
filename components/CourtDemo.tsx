import Container from "./Container";
import PixelArt from "./PixelArt";
import SectionHeading from "./SectionHeading";

const stages = [
  "Filing",
  "Summons",
  "Defence",
  "Evidence",
  "Objections*",
  "Cross-examination*",
  "Closing statements",
  "Deliberation",
  "Verdict",
];

const frames = [
  {
    src: "/art/frame1_courthouse",
    label: "Summons",
    pos: "50% 30%",
    alt: "Pixel-art couple holding hands outside a glowing courthouse at dusk, a heart-and-scales banner above the doors.",
  },
  {
    src: "/art/frame3_judge",
    label: "Deliberation",
    pos: "50% 22%",
    alt: "Pixel-art judge in a white wig and glasses at the bench beneath a heart-and-scales banner.",
  },
  {
    src: "/art/frame4_gavel_3",
    label: "Verdict",
    pos: "50% 18%",
    alt: "Pixel-art close-up of the judge’s gavel striking the block with a burst of light.",
  },
];

export default function CourtDemo() {
  return (
    <section
      id="ai-court"
      aria-labelledby="court-title"
      className="on-dark relative overflow-hidden bg-[linear-gradient(180deg,#541F2C_0%,#3B2425_100%)] py-20 text-cream sm:py-28"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="reveal flex flex-col gap-6">
          <SectionHeading
            id="court-title"
            align="left"
            onDark
            eyebrow="The AI court"
            title="A real court, not a chat thread"
            intro="Plead runs your disagreement like an actual trial, so both sides get heard before anyone gets to say “told you so”."
          />
          <ol aria-label="Trial stages" className="flex flex-wrap gap-2">
            {stages.map((s, i) => (
              <li
                key={s}
                className="inline-flex items-center gap-2 rounded-full bg-paper/10 px-3 py-1.5 text-sm font-medium text-cream ring-1 ring-paper/20"
              >
                <span className="font-serif text-xs text-gold" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <p className="text-sm text-cream/75">*Where enabled for the case.</p>
          <figure className="rounded-2xl border-l-4 border-gold bg-paper/5 p-5">
            <blockquote className="font-serif text-xl leading-snug text-paper italic sm:text-2xl">
              “Screenshots become exhibits. Excuses become testimony. Petty disagreements become Case #024.”
            </blockquote>
          </figure>
        </div>

        <div className="reveal">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {frames.map((f, i) => (
              <figure
                key={f.src}
                className={`overflow-hidden rounded-2xl bg-cocoa ring-1 ring-paper/15 ${i === 1 ? "translate-y-6" : ""}`}
              >
                <PixelArt
                  src={f.src}
                  width={1170}
                  height={2532}
                  position={f.pos}
                  alt={f.alt}
                  className="block aspect-[3/5] h-auto w-full"
                />
                <figcaption className="court-label px-3 py-2.5 text-center text-[11px] text-gold sm:text-xs">
                  {f.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
