/**
 * Pixel-art image: WebP with PNG fallback, crisp scaling (image-rendering: pixelated),
 * explicit intrinsic width/height for CLS safety, cropping via object-position.
 */
export interface PixelArtProps {
  /** Path without extension under /public, e.g. "/art/courtroom-hero". */
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** CSS object-position for crops, e.g. "50% 20%". */
  position?: string;
  priority?: boolean;
  /** Set false if no .webp sibling exists. */
  webp?: boolean;
}

export default function PixelArt({
  src,
  alt,
  width,
  height,
  className = "",
  position = "50% 50%",
  priority = false,
  webp = true,
}: PixelArtProps) {
  return (
    <picture className="contents">
      {webp ? <source srcSet={`${src}.webp`} type="image/webp" /> : null}
      <img
        src={`${src}.png`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
        style={{ objectPosition: position }}
        className={`pixelated object-cover ${className}`}
      />
    </picture>
  );
}
