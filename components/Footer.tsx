"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { AccessibilityStatementModal } from "@/components/AccessibilityStatementModal";
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal";
import type { ContactContent } from "@/components/Contact";

export type FooterProps = {
  brandName: string;
  contact: Pick<
    ContactContent,
    "phone" | "email" | "facebook" | "instagram" | "tiktok"
  >;
};

function IconFacebook({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconInstagram({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconMail({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function IconPhone({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconTikTok({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

type SocialItem = {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export default function Footer({ brandName, contact }: FooterProps) {
  const [statementOpen, setStatementOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const year = new Date().getFullYear();

  const mailHref = contact.email.includes("@")
    ? `mailto:${contact.email}`
    : null;

  const items: SocialItem[] = [];
  if (contact.phone) {
    items.push({
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      label: "התקשרות בטלפון",
      Icon: IconPhone,
    });
  }
  if (contact.facebook) {
    items.push({
      href: contact.facebook,
      label: "פייסבוק",
      Icon: IconFacebook,
    });
  }
  if (contact.instagram) {
    items.push({
      href: contact.instagram,
      label: "אינסטגרם",
      Icon: IconInstagram,
    });
  }
  if (contact.tiktok) {
    items.push({
      href: contact.tiktok,
      label: "טיקטוק",
      Icon: IconTikTok,
    });
  }
  if (mailHref) {
    items.push({
      href: mailHref,
      label: "אימייל",
      Icon: IconMail,
    });
  }

  return (
    <>
      <footer
        dir="rtl"
        className="border-t border-brand-sage/25 bg-brand-sand py-12"
        aria-labelledby="site-footer-heading"
      >
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 id="site-footer-heading" className="sr-only">
            {brandName} — קישורים ומידע משפטי
          </h2>

          {items.length > 0 && (
            <nav
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
              aria-label="רשתות חברתיות ויצירת קשר"
            >
              {items.map(({ href, label, Icon }) => {
                const local =
                  href.startsWith("mailto:") || href.startsWith("tel:");
                return (
                  <a
                    key={label}
                    href={href}
                    target={local ? undefined : "_blank"}
                    rel={local ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-dark/15 text-brand-dark transition hover:border-brand-dark/40 hover:bg-white hover:opacity-90"
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                );
              })}
            </nav>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <button
              type="button"
              suppressHydrationWarning
              className="cursor-pointer font-sans text-xs text-brand-dark/60 transition-colors hover:text-brand-dark md:text-sm"
              onClick={() => setStatementOpen(true)}
            >
              הצהרת נגישות
            </button>
            <span className="text-brand-sage" aria-hidden>
              ·
            </span>
            <button
              type="button"
              suppressHydrationWarning
              className="cursor-pointer font-sans text-xs text-brand-dark/60 transition-colors hover:text-brand-dark md:text-sm"
              onClick={() => setPrivacyOpen(true)}
            >
              מדיניות פרטיות
            </button>
          </div>

          <p className="mt-8 font-sans text-[11px] text-brand-dark/45 md:text-xs">
            © {year} {brandName}. All rights reserved.
          </p>

          {/* Studio credit — refined typographic signature */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <span
              aria-hidden
              className="h-px w-12 bg-gradient-to-l from-transparent via-brand-sage/50 to-transparent"
            />
            <p className="flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 font-sans text-[11px] uppercase tracking-[0.35em] text-brand-dark/50">
              <span>נוצר על ידי</span>
              <a
                href="https://www.roistudio.co.il/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative font-serif text-base italic tracking-normal text-brand-dark normal-case transition-colors hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/30 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-sand md:text-lg"
              >
                RoiStudio
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-[1px] w-0 bg-brand-teal transition-all duration-500 ease-out group-hover:w-full"
                />
              </a>
            </p>
          </div>
        </div>
      </footer>

      <AccessibilityStatementModal
        open={statementOpen}
        onOpenChange={setStatementOpen}
      />
      <PrivacyPolicyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </>
  );
}
