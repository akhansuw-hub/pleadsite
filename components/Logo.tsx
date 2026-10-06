import Link from "next/link";

/**
 * Primary lockup: heart-accent Plead wordmark (no scales). The SVG viewBox
 * (220×110) already includes the brand clear space, so no extra padding is added.
 */
export default function Logo({
  variant = "default",
  height = 44,
  href = "/",
  className = "",
}: {
  variant?: "default" | "reversed";
  height?: number;
  href?: string | null;
  className?: string;
}) {
  const src = variant === "reversed" ? "/brand/PleadWordmarkReversed.svg" : "/brand/PleadWordmark.svg";
  const width = Math.round((height * 220) / 110);
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src={src} width={width} height={height} alt={href === null ? "Plead" : ""} className="block" />;
  if (href === null) return <span className={className}>{img}</span>;
  return (
    <Link href={href} className={`inline-flex items-center rounded-lg ${className}`} aria-label="Plead home">
      {img}
    </Link>
  );
}
