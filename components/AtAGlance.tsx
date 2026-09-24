import Container from "./Container";
import PixelArt from "./PixelArt";
import SectionHeading from "./SectionHeading";

/**
 * "Plead at a glance": Lock Screen / Home Screen widgets + Live Activities (CONTRACTS-v2 amendments o, r).
 * The visual is a CSS-only mock built around the existing judge frame; no new images.
 */
export default function AtAGlance() {
  return (
    <section id="at-a-glance" aria-labelledby="glance-title" className="bg-parchment/60 py-16 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div className="reveal">
          <SectionHeading
            id="glance-title"
            align="left"
            eyebrow="Plead at a glance"
            title="Keep the court close"
            intro="Summons, your turn, verdicts and judgement status on your Lock Screen and Home Screen, without another notification."
          />
        </div>

        <div className="reveal flex flex-wrap items-center justify-center gap-4 sm:gap-5" aria-hidden="true">
          {/* Lock Screen Live Activity mock */}
          <div className="flex w-full max-w-[340px] items-center gap-3 rounded-[1.4rem] bg-cocoa/90 p-3 text-cream shadow-[var(--shadow-card)] ring-1 ring-paper/10">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-wine ring-1 ring-gold/40">
              <PixelArt
                src="/art/frame3_judge"
                width={1170}
                height={2532}
                position="50% 38%"
                alt=""
                className="block h-14 w-14"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="court-label text-[10px] text-gold">Plead · Case #024</p>
              <p className="text-[15px] leading-tight font-extrabold tracking-wide text-paper">YOU’VE BEEN SUMMONED</p>
              <p className="mt-0.5 text-xs text-cream/75">Enter your plea · 23h left</p>
            </div>
          </div>

          {/* Home Screen widget mock (systemSmall) */}
          <div className="flex aspect-square w-[156px] flex-col justify-between rounded-[1.4rem] bg-paper p-3.5 shadow-[var(--shadow-card)] ring-1 ring-line">
            <div className="flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/PleadScales.svg" alt="" width={20} height={20} className="pixelated" />
              <span className="court-label text-[9px] whitespace-nowrap text-gold-ink">Case #031</span>
            </div>
            <div>
              <p className="text-[11px] font-bold tracking-[0.12em] text-burgundy uppercase">Your turn</p>
              <p className="mt-0.5 text-sm leading-snug font-bold text-wine">The dishes affair</p>
            </div>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-medium whitespace-nowrap text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              6h left to respond
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
