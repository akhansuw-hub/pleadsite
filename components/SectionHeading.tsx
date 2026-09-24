import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "center",
  onDark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "center" | "left";
  onDark?: boolean;
}) {
  const a = align === "center" ? "mx-auto text-center items-center" : "items-start";
  return (
    <div className={`flex max-w-[680px] flex-col gap-3 ${a}`}>
      {eyebrow ? (
        <p className={`text-[13px] font-bold tracking-[0.16em] uppercase ${onDark ? "text-blush" : "text-burgundy"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={`text-[2rem] leading-[1.1] font-extrabold tracking-tight text-balance sm:text-[2.6rem] ${onDark ? "text-paper" : "text-wine"}`}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`text-[1.0625rem] leading-relaxed text-pretty sm:text-lg ${onDark ? "text-cream/90" : "text-cocoa"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
