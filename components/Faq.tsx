"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flower2 } from "lucide-react";

export type FaqItem = { question: string; answer: string };

export type FaqContent = {
  eyebrow?: string;
  title: string;
  items: FaqItem[];
};

type Props = { content: FaqContent };

export default function Faq({ content }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative scroll-mt-24 bg-brand-butter/30 px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
        <div>
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
            id="faq-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-serif text-4xl leading-[1.05] text-brand-dark md:text-5xl"
          >
            {content.title}
          </motion.h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-brand-dark/70">
            לא מצאתם תשובה?{" "}
            <a
              href="#contact"
              className="link-underline text-brand-teal"
            >
              דברו איתנו
            </a>{" "}
            — נשמח לעזור.
          </p>
        </div>

        <ul className="flex flex-col divide-y divide-brand-sage/30 rounded-[2rem] border border-brand-sage/25 bg-white/80">
          {content.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.question}>
                <button
                  type="button"
                  suppressHydrationWarning
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-6 py-6 text-right font-serif text-lg text-brand-dark transition hover:text-brand-teal md:px-8 md:py-7 md:text-xl"
                >
                  <motion.span
                    animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.05 : 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isOpen
                        ? "border-brand-teal bg-brand-teal text-brand-butter"
                        : "border-brand-sage/40 bg-white/60 text-brand-teal"
                    }`}
                  >
                    <Flower2 className="h-[18px] w-[18px]" aria-hidden />
                  </motion.span>
                  <span className="flex-1">{item.question}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 font-sans text-[15px] leading-relaxed text-brand-dark/75 md:px-8 md:pb-8">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
