"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flower2, X } from "lucide-react";

export type AboutHighlight = {
  title: string;
  text: string;
  fullDescription?: string;
};

export type AboutContent = {
  eyebrow?: string;
  title: string;
  description: string;
  paragraph?: string;
  image: string;
  highlights?: AboutHighlight[];
};

type Props = { content: AboutContent };

export default function About({ content }: Props) {
  const [active, setActive] = useState<AboutHighlight | null>(null);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative scroll-mt-24 bg-brand-sand px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[5fr_6fr] lg:gap-20">
        {/* Image (asymmetric) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative order-last lg:order-first"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.5rem] bg-brand-butter/60 shadow-xl lg:max-w-none">
            <Image
              src={content.image}
              alt={content.title}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <span
            aria-hidden
            className="absolute -bottom-6 left-6 hidden rotate-[-6deg] rounded-full bg-brand-dark px-5 py-2 font-serif text-sm tracking-wide text-brand-butter shadow-lg sm:block"
          >
            Since 2014
          </span>
          <div
            aria-hidden
            className="absolute -top-8 -right-8 hidden h-28 w-28 rounded-full bg-brand-teal/15 blur-2xl md:block"
          />
        </motion.div>

        {/* Copy */}
        <div className="max-w-xl">
          {content.eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-sage/40 bg-white/60 px-4 py-1.5 font-sans text-xs tracking-[0.25em] text-brand-teal"
            >
              {content.eyebrow}
            </motion.span>
          )}

          <motion.h2
            id="about-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-serif text-4xl leading-[1.05] text-brand-dark md:text-6xl"
          >
            {content.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 font-sans text-lg leading-relaxed text-brand-dark/75"
          >
            {content.description}
          </motion.p>

          {content.paragraph && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-4 font-sans text-base leading-relaxed text-brand-dark/65"
            >
              {content.paragraph}
            </motion.p>
          )}

          {content.highlights && content.highlights.length > 0 && (
            <ul className="mt-10 grid gap-4 sm:grid-cols-3">
              {content.highlights.map((h, i) => (
                <motion.li
                  key={h.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  className="flex flex-col rounded-2xl border border-brand-sage/25 bg-white/70 p-5"
                >
                  <p className="font-serif text-lg text-brand-dark">
                    {h.title}
                  </p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-brand-dark/65">
                    {h.text}
                  </p>

                  {h.fullDescription && (
                    <button
                      type="button"
                      onClick={() => setActive(h)}
                      aria-label={`קרא עוד על ${h.title}`}
                      className="group mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-transparent px-3 py-1.5 font-sans text-sm text-brand-teal transition-colors duration-300 hover:border-brand-teal/30 hover:bg-brand-teal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/40"
                    >
                      <Flower2
                        className="h-4 w-4 transition-transform duration-500 ease-out group-hover:rotate-[18deg]"
                        aria-hidden
                      />
                      <span className="link-underline">קרא עוד</span>
                    </button>
                  )}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <HighlightModal
        highlight={active}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */

function HighlightModal({
  highlight,
  onClose,
}: {
  highlight: AboutHighlight | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!highlight) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [highlight, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {highlight && (
        <motion.div
          key="modal-root"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="highlight-modal-title"
          dir="rtl"
        >
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="סגירת חלונית"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-brand-dark/55 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: "#F0F0EF" }}
            className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-[1.75rem] border border-[#D4AF37]/60 shadow-[0_30px_80px_-20px_rgba(45,45,45,0.35)] max-h-[90dvh]"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="סגירה"
              className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-dark/15 bg-white/60 text-brand-dark transition hover:border-brand-teal hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/40"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>

            <div className="flex flex-col gap-5 overflow-y-auto px-6 py-10 sm:px-10 sm:py-12">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-white/60 px-3 py-1 font-sans text-[11px] tracking-[0.3em] text-brand-teal">
                <Flower2 className="h-3.5 w-3.5" aria-hidden />
                <span>יולי • פרחים</span>
              </div>

              <h3
                id="highlight-modal-title"
                className="font-serif text-3xl leading-[1.1] text-brand-dark sm:text-4xl"
              >
                {highlight.title}
              </h3>

              <p className="font-sans text-base leading-relaxed text-brand-dark/75 sm:text-[17px]">
                {highlight.fullDescription ?? highlight.text}
              </p>

              <div
                aria-hidden
                className="mt-2 h-px w-16 bg-[#D4AF37]/50"
              />

              <button
                type="button"
                onClick={onClose}
                className="mt-1 inline-flex w-fit items-center justify-center rounded-full bg-brand-teal px-5 py-2.5 font-sans text-sm text-brand-butter transition hover:-translate-y-0.5 hover:bg-brand-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/40"
              >
                סגור
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
