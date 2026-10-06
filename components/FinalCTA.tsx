import AppStoreCTA, { isAppLive } from "./AppStoreCTA";
import PixelArt from "./PixelArt";
import WaitlistForm from "./WaitlistForm";

/** Closer: one big ask, the store badges (or the waitlist form), and the courtroom art. */
export default function FinalCTA() {
  const live = isAppLive();
  return (
    <section id="waitlist" aria-labelledby="cta-title" className="section relative overflow-hidden pt-0">
      <div className="wrap">
        <div className="reveal relative overflow-hidden rounded-[clamp(28px,4vw,48px)] bg-wine text-cream shadow-[var(--shadow-glow)]">
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 pt-12 pb-10 text-center sm:px-12 sm:pt-16 lg:pb-14">
            <p className="court-label text-gold">All rise</p>
            <h2 id="cta-title" className="display max-w-[12ch] text-[clamp(2.6rem,10vw,5.2rem)] text-paper">
              Take the argument to court.
            </h2>
            <p className="lede max-w-[28em] text-[1.05rem] text-cream/80 sm:text-[1.2rem]">
              Plead both sides. Let the AI court decide. One subscription covers both partners.
            </p>
            <div className="on-dark flex w-full flex-col items-center gap-3">
              {live ? <AppStoreCTA onDark className="justify-center" /> : <WaitlistForm onDark className="text-left" />}
            </div>
          </div>
          <div className="relative -mb-1 mx-auto w-full max-w-[1120px]">
            <PixelArt
              src="/art/courtroom-hero"
              width={941}
              height={840}
              position="50% 100%"
              alt="Pixel-art courtroom: a white-wigged judge sits at the bench between two heart banners, two partners stand at podiums facing each other, and a crowd watches from the gallery under warm lamplight."
              className="block aspect-[941/420] h-auto w-full sm:aspect-[941/380]"
            />
            <div aria-hidden="true" className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-wine to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
