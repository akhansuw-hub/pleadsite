import Link from "next/link";

/**
 * Brand lockups.
 * - "default" / "reversed": the primary heart-accent Plead wordmark (no scales). The SVG viewBox
 *   (220×110) already includes the brand clear space, so no extra padding is added.
 * - "compact": app icon + wordmark, for the floating header pill.
 */
export default function Logo({
  variant = "default",
  height = 44,
  href = "/",
  className = "",
}: {
  variant?: "default" | "reversed" | "compact";
  height?: number;
  href?: string | null;
  className?: string;
}) {
  const alt = href === null ? "Plead" : "";
  let img: React.ReactNode;
  if (variant === "compact") {
    const wordH = Math.round(height * 0.72);
    img = (
      <span className="inline-flex items-center gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/app-icon-192.png"
          width={height}
          height={height}
          alt=""
          className="block shrink-0 rounded-[30%] shadow-[0_1px_2px_rgb(59_36_37/0.2)]"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/PleadWordmarkOnly.svg"
          width={Math.round((wordH * 220) / 94)}
          height={wordH}
          alt={alt}
          className="block"
        />
      </span>
    );
  } else {
    const src = variant === "reversed" ? "/brand/PleadWordmarkReversed.svg" : "/brand/PleadWordmark.svg";
    const width = Math.round((height * 220) / 110);
    // eslint-disable-next-line @next/next/no-img-element
    img = <img src={src} width={width} height={height} alt={alt} className="block" />;
  }
  if (href === null) return <span className={className}>{img}</span>;
  return (
    <Link href={href} className={`inline-flex items-center rounded-lg ${className}`} aria-label="Plead home">
      {img}
    </Link>
  );
}
