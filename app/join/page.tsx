import type { Metadata } from "next";
import Container from "@/components/Container";
import PixelArt from "@/components/PixelArt";
import JoinInvite from "@/components/JoinInvite";

/**
 * Partner invite landing page (CONTRACTS-v2 amendment ar). Every `/join/<code>` is rewritten here by
 * vercel.json; `JoinInvite` reads the code from the address bar. With the app installed, iOS opens
 * `/join/*` in Plead directly (apple-app-site-association) and this page is never seen.
 */
export const metadata: Metadata = {
  title: "You've been invited",
  description: "Your partner invited you to Plead, the playful AI courtroom for couples.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/join/" },
};

export default function JoinPage() {
  return (
    <section aria-labelledby="join-title" className="py-12 sm:py-20">
      <Container>
        <div className="relative grid overflow-hidden rounded-[2rem] bg-cream shadow-[var(--shadow-glow)] ring-1 ring-line md:grid-cols-[1.2fr_1fr]">
          <div className="relative z-10 flex flex-col items-start gap-5 p-8 sm:p-12">
            <p className="court-label text-mahogany">You&rsquo;ve been summoned</p>
            <h1 id="join-title" className="text-[2.2rem] leading-[1.05] font-extrabold tracking-tight text-wine text-balance sm:text-5xl">
              Your partner invited you to Plead.
            </h1>
            <p className="max-w-[30rem] text-lg leading-relaxed text-cocoa">
              Settle arguments together in a playful AI courtroom. One subscription covers you both, so only one of
              you needs to pay.
            </p>
            <JoinInvite />
          </div>
          <div className="relative min-h-[280px] md:min-h-full">
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
