import AppStoreCTA, { isAppLive } from "./AppStoreCTA";
import Phone from "./Phone";

export default function Hero() {
  const live = isAppLive();
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-6 pb-16 sm:pt-10 lg:pt-16 lg:pb-24">
      {/* warm glow behind the phone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[38%] left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(234_160_164/0.45),transparent)] lg:top-[-10%] lg:left-auto lg:right-[-6%] lg:translate-x-0"
      />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-5">
          <p className="kicker">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/PleadHeart.svg" alt="" width={18} height={18} className="pixelated" />
            The AI courtroom for couples
          </p>
          <h1 id="hero-title" className="display text-[clamp(2.85rem,12vw,4.9rem)] text-wine">
            <span className="block">Settle the argument.</span>
            <span className="block text-burgundy">Plead your case.</span>
          </h1>
          <p className="lede max-w-[30em] text-[1.1rem] sm:text-[1.25rem]">
            Both of you present your side and your evidence. Three AI jurors deliberate, the judge rules, and the
            winner picks the judgement.
          </p>
          <div className="mt-1 flex flex-col items-start gap-3">
            <AppStoreCTA />
            <p className="text-[0.95rem] font-bold text-muted">
              {live ? "One subscription covers both partners." : "Coming soon to iPhone and Android. One subscription covers both partners."}
            </p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:max-w-[340px] lg:justify-self-end">
          <Phone
            shot="court-exhibit"
            priority
            sizes="(max-width: 1024px) 300px, 340px"
            alt="Plead’s courtroom screen: the pixel-art judge at the bench, Sam and Alex at their podiums, and Exhibit A, a text message asking to save the last slice, shown to the court."
          />
          {/* floating case tag */}
          <div className="absolute -top-3 -left-3 rotate-[-5deg] rounded-xl bg-parchment px-3 py-2 shadow-[var(--shadow-card)] ring-1 ring-[#e3cbb5] sm:-left-8">
            <p className="court-label text-mahogany">Case #014</p>
            <p className="text-sm font-extrabold text-wine">The Last Slice</p>
          </div>
          {/* deliberation chip */}
          <div className="absolute -bottom-4 left-1/2 flex w-max -translate-x-1/2 items-center gap-2 rounded-full bg-paper px-4 py-2.5 text-sm font-extrabold text-wine shadow-[var(--shadow-card)] ring-1 ring-line">
            <span className="flex gap-1" aria-hidden="true">
              <span className="h-2 w-2 animate-pulse rounded-full bg-burgundy" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-burgundy [animation-delay:200ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-burgundy [animation-delay:400ms]" />
            </span>
            3 AI jurors deliberating
          </div>
        </div>
      </div>
    </section>
  );
}
