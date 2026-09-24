import { siteConfig } from "@/site.config";
import AppStoreCTA from "./AppStoreCTA";
import Container from "./Container";
import PixelArt from "./PixelArt";
import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  const live = siteConfig.APP_STORE_URL !== null;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-20%] h-[720px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgb(234_160_164/0.45),transparent)] lg:right-[-8%]"
      />
      <Container className="relative grid items-center gap-10 pt-8 pb-16 sm:pt-12 lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:pt-16 lg:pb-24">
        <div className="flex flex-col items-start">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-[12px] font-bold tracking-[0.16em] text-burgundy uppercase ring-1 ring-line sm:text-[13px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/PleadHeart.svg" alt="" width={14} height={14} className="pixelated" />
            The AI courtroom for couples
          </p>
          <h1
            id="hero-title"
            className="text-[2.6rem] leading-[1.02] font-extrabold tracking-tight text-wine text-balance sm:text-6xl lg:text-[4.2rem]"
          >
            Settle the argument. <span className="text-burgundy">Plead your case.</span>
          </h1>
          <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-cocoa text-pretty sm:text-xl">
            Present both sides, submit the evidence, and let a panel of AI jurors deliberate before the judge rules.
          </p>

          <div className="mt-7 flex w-full flex-col items-start gap-4">
            {live ? <AppStoreCTA /> : <WaitlistForm />}
            <a
              href="#how-it-works"
              className="tap inline-flex items-center gap-2 rounded-full px-1 text-base font-semibold text-burgundy underline-offset-4 hover:underline"
            >
              See how Plead works
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true" fill="currentColor">
                <path d="M10 14.5a1 1 0 0 1-.7-.3l-5-5a1 1 0 1 1 1.4-1.4l4.3 4.29 4.3-4.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-.7.29Z" />
              </svg>
            </a>
          </div>

          <p className="mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-cocoa">
            <span aria-hidden="true" className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-parchment">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/PleadHeart.svg" alt="" width={12} height={12} className="pixelated" />
            </span>
            One subscription covers both partners.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <div className="relative rounded-[2rem] bg-wine p-2 shadow-[var(--shadow-glow)] sm:p-2.5">
            <div className="overflow-hidden rounded-[1.6rem]">
              <PixelArt
                src="/art/courtroom-hero"
                width={941}
                height={840}
                priority
                alt="Pixel-art courtroom: a white-wigged judge sits at the bench between two heart banners, two partners stand at podiums facing each other, and a crowd watches from the gallery under warm lamplight."
                className="block aspect-[941/840] h-auto w-full"
              />
            </div>
          </div>

          {/* case file tag */}
          <div className="absolute -top-3 left-4 rotate-[-4deg] rounded-xl bg-parchment px-3 py-2 shadow-[var(--shadow-card)] ring-1 ring-[#e3cbb5] sm:-left-4">
            <p className="court-label text-mahogany">Case #024</p>
            <p className="text-sm font-bold text-wine">The Last Slice of Pizza</p>
          </div>

          {/* deliberation chip */}
          <div className="absolute -bottom-5 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-sm font-semibold text-wine shadow-[var(--shadow-card)] ring-1 ring-line sm:left-auto sm:right-6 sm:translate-x-0">
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-2 w-2 animate-pulse rounded-full bg-burgundy" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-burgundy [animation-delay:200ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-burgundy [animation-delay:400ms]" />
            </span>
            3 AI jurors deliberating
          </div>
        </div>
      </Container>
    </section>
  );
}
