import type { ElementType, ReactNode } from "react";

type Width = "default" | "narrow" | "wide";

const widths: Record<Width, string> = {
  /** Marketing sections: ~1200px */
  default: "max-w-[1200px]",
  /** Legal/long-form pages: ~800px */
  narrow: "max-w-[800px]",
  wide: "max-w-[1320px]",
};

export interface ContainerProps {
  children: ReactNode;
  /** "default" (1200px marketing), "narrow" (800px legal), "wide" (1320px). */
  width?: Width;
  className?: string;
  as?: ElementType;
  id?: string;
}

/** Centred content column with the site gutters (16px mobile → 32px desktop). */
export default function Container({
  children,
  width = "default",
  className = "",
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${widths[width]} ${className}`}>
      {children}
    </Tag>
  );
}
