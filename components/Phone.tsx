/** Phone device frame around an app capture from /public/shots (720×1409 WebP, status bar kept). */
export interface PhoneProps {
  /** File name without extension under /public/shots, e.g. "deliberating". */
  shot: string;
  alt: string;
  className?: string;
  priority?: boolean;
  /** `sizes` hint for the browser (CSS width of the phone). */
  sizes?: string;
}

export const SHOT_W = 720;
export const SHOT_H = 1409;

export default function Phone({ shot, alt, className = "", priority = false, sizes = "280px" }: PhoneProps) {
  return (
    <div className={`device ${className}`}>
      <div className="device__screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/shots/${shot}.webp`}
          alt={alt}
          width={SHOT_W}
          height={SHOT_H}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
        />
      </div>
    </div>
  );
}
