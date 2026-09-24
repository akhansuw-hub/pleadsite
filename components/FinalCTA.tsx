import { siteConfig } from "@/site.config";
import AppStoreCTA from "./AppStoreCTA";
import Container from "./Container";
import PixelArt from "./PixelArt";
import WaitlistForm from "./WaitlistForm";

export default function FinalCTA() {
  const live = siteConfig.APP_STORE_URL !== null;
  return (
    <section id="waitlist" aria-labelledby="cta-title" className="pb-20 sm:pb-28">
      <Container>
        <div className="reveal relative grid overflow-hidden rounded-[2rem] bg-cream shadow-[var(--shadow-glow)] ring-1 ring-line md:grid-cols-[1.2fr_1fr]">
          <div className="relative z-10 flex flex-col items-start gap-5 p-8 sm:p-12">
            <p className="court-label text-mahogany">All rise</p>
            <h2 id="cta-title" className="text-[2.2rem] leading-[1.05] font-extrabold tracking-tight text-wine text-balance sm:text-5xl">
              Take the argument to court.
            </h2>
            <p className="max-w-[30rem] text-lg leading-relaxed text-cocoa">
              Plead both sides. Let the AI court decide. One subscription covers both partners.
            </p>
            {live ? <AppStoreCTA /> : <WaitlistForm />}
          </div>
          <div className="relative min-h-[300px] md:min-h-full">
            <PixelArt
              src="/art/frame5_endcard"
              width={1170}
              height={2532}
              position="50% 72%"
              alt="Pixel-art couple walking hand in hand down the red carpet of the courtroom aisle."
              className="absolute inset-0 h-full w-full"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-transparent md:bg-gradient-to-r" />
          </div>
        </div>
      </Container>
    </section>
  );
}
