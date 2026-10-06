import type { ReactNode } from "react";

/** Section header: small eyebrow, heavy display title, muted lede. Left-aligned by default (mobile-first). */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
  onDark = false,
  size = "md",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "center" | "left";
  onDark?: boolean;
  size?: "md" | "lg";
}) {
  const a = align === "center" ? "mx-auto text-center items-center" : "items-start";
  const titleSize =
    size === "lg" ? "text-[clamp(2.4rem,8.5vw,4.4rem)]" : "text-[clamp(2.1rem,7vw,3.4rem)]";
  return (
    <div className={`flex max-w-[40rem] flex-col gap-4 ${a}`}>
      {eyebrow ? (
        <p className={`text-[13px] font-extrabold tracking-[0.14em] uppercase ${onDark ? "text-blush" : "text-burgundy"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id} className={`display ${titleSize} ${onDark ? "text-paper" : "text-wine"}`}>
        {title}
      </h2>
      {intro ? (
        <p className={`lede max-w-[34em] text-[1.05rem] sm:text-[1.15rem] ${onDark ? "text-cream/80" : ""}`}>{intro}</p>
      ) : null}
    </div>
  );
}
