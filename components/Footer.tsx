import Link from "next/link";
import { mailtoHref, siteConfig } from "@/site.config";
import AppStoreCTA from "./AppStoreCTA";
import CookieSettingsButton from "./CookieSettingsButton";
import Logo from "./Logo";

const linkCls = "tap inline-flex items-center text-[15px] font-semibold text-cocoa underline-offset-4 hover:text-burgundy hover:underline";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-[12px] font-extrabold tracking-[0.14em] text-muted uppercase">{title}</h2>
      <ul className="flex flex-col">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const legal = siteConfig.footerLinks.filter((l) =>
    ["/privacy/", "/terms/", "/subscription-terms/", "/cookies/"].includes(l.href),
  );
  const support = siteConfig.footerLinks.filter((l) => ["/support/", "/delete-account/"].includes(l.href));
  const supportMail = mailtoHref(siteConfig.SUPPORT_EMAIL, "Plead support");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-cream">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="col-span-2 flex flex-col items-start gap-4 lg:col-span-1">
          <Logo height={64} className="-ml-2" />
          <p className="max-w-xs text-[15px] leading-relaxed font-semibold text-muted">
            The AI courtroom for couples. Plead both sides, submit the evidence and let the AI court decide.
          </p>
          <AppStoreCTA />
        </div>

        <Column title="Product">
          {siteConfig.nav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
        </Column>

        <Column title="Legal">
          {legal.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <CookieSettingsButton className={`${linkCls} cursor-pointer`} />
          </li>
        </Column>

        <Column title="Support">
          {support.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={linkCls}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={siteConfig.MANAGE_SUBSCRIPTION_URL} className={linkCls} rel="noopener">
              Manage subscription (iPhone)
            </a>
          </li>
          <li>
            <a href={siteConfig.PLAY_MANAGE_SUBSCRIPTION_URL} className={linkCls} rel="noopener">
              Manage subscription (Android)
            </a>
          </li>
          <li>
            {supportMail ? (
              <a href={supportMail} className={`${linkCls} break-all`}>
                {siteConfig.SUPPORT_EMAIL}
              </a>
            ) : (
              <span className="inline-flex min-h-[44px] items-center text-[15px] text-muted">{siteConfig.SUPPORT_EMAIL}</span>
            )}
          </li>
        </Column>
      </div>

      <div className="border-t border-line">
        <div className="wrap flex flex-col gap-2 py-6 text-sm font-semibold text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.LEGAL_ENTITY_NAME}. Plead is for everyday disagreements and entertainment, not legal or
            professional advice.
          </p>
          {siteConfig.APP_STORE_URL ? <p>Apple and the App Store are trademarks of Apple Inc.</p> : null}
          {siteConfig.PLAY_STORE_URL ? <p>Google Play is a trademark of Google LLC.</p> : null}
        </div>
      </div>
    </footer>
  );
}
