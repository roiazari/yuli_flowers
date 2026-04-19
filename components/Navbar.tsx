"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export type NavLink = { label: string; href: string };

export type NavbarContent = {
  logo: string;
  links: NavLink[];
  cta?: { label: string; href: string };
};

type Props = { content: NavbarContent; brandName?: string };

/** Decides whether a `logo` value is an image source or plain text. */
function isImagePath(value: string) {
  return (
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    /\.(png|jpe?g|webp|avif|svg|gif)$/i.test(value)
  );
}

export default function Navbar({ content, brandName }: Props) {
  const logoIsImage = isImagePath(content.logo);
  const brandLabel = brandName ?? (logoIsImage ? "פרחי יולי" : content.logo);
  // Navbar is hidden while the user is inside the Hero (< 50vh scrolled),
  // and slides down with a glassmorphism panel once they scroll past it.
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const evaluate = () => {
      // Threshold: half of the viewport height.
      const threshold = window.innerHeight * 0.5;
      setShow(window.scrollY > threshold);
    };
    evaluate();
    window.addEventListener("scroll", evaluate, { passive: true });
    window.addEventListener("resize", evaluate, { passive: true });
    return () => {
      window.removeEventListener("scroll", evaluate);
      window.removeEventListener("resize", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
    <header
      aria-hidden={!show}
      className={`fixed inset-x-0 top-0 z-40 bg-[#F0F0EF]/80 shadow-[0_1px_0_0_rgba(138,154,91,0.25)] backdrop-blur-md transition-all duration-500 ease-out ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      } ${open ? "invisible" : ""}`}
    >
      <nav
        aria-label="ניווט ראשי"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10"
      >
        {/* Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 font-serif text-2xl text-brand-dark tracking-tight"
          aria-label={brandLabel}
        >
          {logoIsImage ? (
            <Image
              src={content.logo}
              alt={brandLabel}
              width={140}
              height={44}
              priority
              className="h-10 w-auto rounded-xl object-contain sm:h-11"
            />
          ) : (
            <>
              <span className="text-brand-teal">✼</span>
              <span>{content.logo}</span>
            </>
          )}
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 font-sans text-[15px] md:flex">
          {content.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-underline text-brand-dark/80 transition hover:text-brand-dark"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          {content.cta && (
            <a
              href={content.cta.href}
              className="inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-2.5 font-sans text-sm font-medium text-brand-butter shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-sand"
            >
              {content.cta.label}
            </a>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => setOpen(true)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-dark/15 text-brand-dark transition hover:bg-white/60 md:hidden"
          aria-label="פתיחת תפריט"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </nav>
    </header>

    {/* Mobile sheet — rendered outside the <header> so the header's
        backdrop-filter/opacity transitions never affect the sheet's
        stacking or background rendering. */}
    <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-brand-dark/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.aside
              id="mobile-menu"
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="תפריט ניווט"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 240, damping: 30 }}
              style={{ backgroundColor: "#F0F0EF" }}
              className="fixed inset-y-0 right-0 z-[60] flex w-[82%] max-w-sm flex-col p-6 shadow-2xl md:hidden"
            >
              <div className="flex items-center justify-between">
                {logoIsImage ? (
                  <Image
                    src={content.logo}
                    alt={brandLabel}
                    width={120}
                    height={40}
                    className="h-9 w-auto rounded-xl object-contain"
                  />
                ) : (
                  <span className="font-serif text-xl text-brand-dark">
                    {content.logo}
                  </span>
                )}
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-dark/15 text-brand-dark"
                  aria-label="סגירת תפריט"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <ul className="mt-10 flex flex-col gap-1 font-serif text-2xl">
                {content.links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-brand-dark transition hover:bg-white/60"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {content.cta && (
                <a
                  href={content.cta.href}
                  onClick={() => setOpen(false)}
                  className="mt-auto inline-flex items-center justify-center rounded-full bg-brand-teal px-6 py-4 font-sans text-base font-medium text-brand-butter shadow-sm"
                >
                  {content.cta.label}
                </a>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
