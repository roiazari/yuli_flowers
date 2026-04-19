"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, X } from "lucide-react";

export type GalleryItem = {
  id: number;
  title: string;
  category: string;
  image: string;
};

export type GalleryContent = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  categories: string[];
  items: GalleryItem[];
};

type Props = { content: GalleryContent };

const PHONE_NUMBER = "0542412474";

// Spread items across an asymmetric grid. Every 6th card becomes "tall".
function spanFor(index: number) {
  const pattern = [
    "row-span-2", // tall
    "",
    "",
    "row-span-2", // tall
    "",
    "",
  ];
  return pattern[index % pattern.length];
}

export default function Gallery({ content }: Props) {
  const [active, setActive] = useState(content.categories[0] ?? "כללי");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filtered = useMemo(() => {
    if (!active || active === "כללי") return content.items;
    return content.items.filter((i) => i.category === active);
  }, [active, content.items]);

  // Stable reference so the Lightbox's useEffect doesn't re-subscribe on every
  // parent re-render (which can cause flaky body.overflow lock/unlock cycles).
  const closeLightbox = useCallback(() => setSelectedImage(null), []);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative scroll-mt-24 bg-brand-sand px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            {content.eyebrow && (
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-brand-sage/40 bg-white/60 px-4 py-1.5 font-sans text-xs tracking-[0.25em] text-brand-teal"
              >
                {content.eyebrow}
              </motion.span>
            )}
            <motion.h2
              id="gallery-heading"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 font-serif text-4xl leading-[1.05] text-brand-dark md:text-6xl"
            >
              {content.title}
            </motion.h2>
            {content.subtitle && (
              <p className="mt-5 font-sans text-base leading-relaxed text-brand-dark/70 md:text-lg">
                {content.subtitle}
              </p>
            )}
          </div>

          {/* Category chips */}
          <div
            role="tablist"
            aria-label="קטגוריות גלריה"
            className="flex flex-wrap gap-2 md:justify-end"
          >
            {content.categories.map((c) => {
              const selected = c === active;
              return (
                <button
                  key={c}
                  role="tab"
                  suppressHydrationWarning
                  aria-selected={selected}
                  onClick={() => setActive(c)}
                  className={`rounded-full border px-4 py-2 font-sans text-sm transition ${
                    selected
                      ? "border-brand-teal bg-brand-teal text-brand-butter shadow-sm"
                      : "border-brand-sage/40 bg-white/60 text-brand-dark/75 hover:bg-white"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric masonry grid */}
        <motion.ul
          layout
          className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.li
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: (i % 8) * 0.03 }}
                className={`group relative overflow-hidden rounded-[1.75rem] bg-brand-butter/40 ${spanFor(i)}`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  aria-label={`הגדלת תמונה: ${item.title}`}
                  className="absolute inset-0 block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-sand"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.08]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-4 bottom-4 translate-y-3 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-serif text-xl">{item.title}</p>
                    <p className="mt-1 font-sans text-xs uppercase tracking-[0.2em] text-white/80">
                      {item.category}
                    </p>
                  </div>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Lightbox item={selectedImage} onClose={closeLightbox} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({
  item,
  onClose,
}: {
  item: GalleryItem | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!item) return;
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
  }, [item, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`תצוגת תמונה: ${item.title}`}
          dir="rtl"
          className="fixed inset-0 z-[70] flex items-center justify-center px-4 pt-4 pb-28 sm:px-8 sm:pt-8 sm:pb-36"
          initial={{ opacity: 0, pointerEvents: "none" }}
          animate={{ opacity: 1, pointerEvents: "auto" }}
          exit={{ opacity: 0, pointerEvents: "none" }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop — clicking it closes the lightbox */}
          <button
            type="button"
            aria-label="סגירת תצוגת תמונה"
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Close (top-right in RTL = visual right) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="סגירה"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          {/* Image stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-[1] flex max-h-full w-full max-w-5xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex w-full items-center justify-center">
              <Image
                src={item.image}
                alt={item.title}
                width={1600}
                height={1800}
                priority
                sizes="(min-width: 1024px) 80vw, 92vw"
                className="h-auto max-h-[72dvh] w-auto max-w-full rounded-[1.75rem] object-contain shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]"
              />
            </div>

            {/* Caption */}
            <div className="pointer-events-none mt-4 text-center text-white sm:mt-6">
              <p className="font-serif text-xl sm:text-2xl">{item.title}</p>
              <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.3em] text-white/70">
                {item.category}
              </p>
            </div>
          </motion.div>

          {/* Floating "Order Now" CTA — gently bouncing, with a ringing phone.
              The outer <a> keeps clean enter/exit animations (no infinite loops)
              so AnimatePresence can resolve exit cleanly. All infinite motion
              lives on *nested* spans so they never collide with exit tweens. */}
          <motion.a
            href={`tel:${PHONE_NUMBER}`}
            onClick={(e) => {
              e.stopPropagation();
              if (typeof window !== "undefined") {
                window.location.href = `tel:${PHONE_NUMBER}`;
              }
            }}
            aria-label={`הזמנה טלפונית ${PHONE_NUMBER}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 sm:bottom-10"
          >
            {/* Bounce wrapper — infinite float lives here, isolated from exit. */}
            <motion.span
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="group relative inline-flex items-center gap-3 rounded-full bg-[#005F69] px-7 py-4 font-sans text-base font-medium text-[#F0F0EF] shadow-[0_18px_40px_-10px_rgba(0,95,105,0.7)] transition-colors hover:bg-[#004f57] sm:px-9 sm:py-4.5 sm:text-lg"
            >
              {/* Soft pulsing halo */}
              <motion.span
                aria-hidden
                animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 -z-10 rounded-full bg-[#005F69]"
              />

              {/* Phone icon — on the right in RTL (first in DOM) */}
              <motion.span
                aria-hidden
                animate={{ rotate: [0, -14, 12, -10, 8, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  repeatDelay: 0.9,
                  ease: "easeInOut",
                }}
                className="inline-flex h-6 w-6 items-center justify-center"
                style={{ transformOrigin: "50% 70%" }}
              >
                <Phone className="h-5 w-5" aria-hidden />
              </motion.span>

              <span>הזמינו עכשיו</span>
            </motion.span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
