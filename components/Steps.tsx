"use client";

import { useEffect, useRef, useState } from "react";
import Phone from "./Phone";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    title: "File your case",
    body: "Say what happened and what you want the court to decide. Attach screenshots, photos or their exact words as exhibits.",
    shot: "file-claim",
    alt: "The judge reads the claim: Alex ate the final slice after agreeing to save it.",
  },
  {
    title: "Both sides plead",
    body: "Your partner is summoned and gets the same chance to plead, respond to the evidence and make a closing statement.",
    shot: "both-sides",
    alt: "Closing statements from both partners shown side by side in the courtroom.",
  },
  {
    title: "The court deliberates",
    body: "Three AI jurors each review the record on their own, for evidence, consistency and fairness. The judge weighs their findings and rules.",
    shot: "deliberating",
    alt: "The court is deliberating: Evidence Juror, Consistency Juror, Fairness Juror and Judge Wigsworth preparing the ruling.",
  },
  {
    title: "Winner picks the judgement",
    body: "The winner chooses one safe, case-relevant judgement from options the court prepared. Replace the pizza. Cook their favourite meal.",
    shot: "judgement",
    alt: "The winner chooses the judgement from three options prepared by the court.",
  },
];

/**
 * "How Plead works": numbered steps, each with its app screen.
 * Desktop: one sticky phone swaps screens as you scroll past each step. Mobile: the phone sits under each step.
 */
export default function Steps() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = refs.current.indexOf(e.target as HTMLLIElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section">
      <div className="wrap">
        <div className="reveal">
          <SectionHeading
            id="how-title"
            eyebrow="How Plead works"
            title={
              <>
                From “you always…”
                <br />
                to a verdict.
              </>
            }
            intro="Either of you can file. Roles are per case, so whoever files is the plaintiff this time."
          />
        </div>

        <div className="mt-10 lg:mt-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-20">
          <ol className="flex flex-col gap-14 lg:gap-0">
            {steps.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="reveal lg:flex lg:min-h-[72vh] lg:items-center"
              >
                <div className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 gap-y-2 lg:grid-cols-[56px_minmax(0,1fr)] lg:gap-x-6">
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-lg font-black shadow-[var(--shadow-card)] ring-1 ring-line transition-colors duration-500 lg:h-14 lg:w-14 lg:text-xl ${
                      active === i ? "bg-burgundy text-paper" : "bg-paper text-burgundy"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="self-center">
                    <h3 className="display text-[clamp(1.7rem,6vw,2.6rem)] text-wine">
                      <span className="sr-only">Step {i + 1}: </span>
                      {s.title}
                    </h3>
                  </div>
                  <p className="lede col-start-2 max-w-[26em] text-[1.05rem] sm:text-[1.1rem]">{s.body}</p>
                  <div className="col-span-2 mt-6 flex justify-center lg:hidden">
                    <Phone shot={s.shot} alt={s.alt} className="w-[min(260px,70vw)]" sizes="260px" />
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="hidden lg:block" aria-hidden="true">
            <div className="sticky top-[max(calc(var(--header-h)+24px),calc(50vh-330px))] flex justify-center">
              <div className="device w-[min(320px,calc((100vh-160px)*0.49))]">
                <div className="device__screen">
                  {steps.map((s, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={s.shot}
                      src={`/shots/${s.shot}.webp`}
                      alt=""
                      width={720}
                      height={1409}
                      loading="lazy"
                      decoding="async"
                      className="transition-opacity duration-500 ease-out"
                      style={{ opacity: active === i ? 1 : 0 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
