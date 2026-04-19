"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export type TestimonialItem = {
  name: string;
  role?: string;
  text: string;
};

export type TestimonialsContent = {
  eyebrow?: string;
  title: string;
  items: TestimonialItem[];
};

type Props = { content: TestimonialsContent };

export default function Testimonials({ content }: Props) {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative scroll-mt-24 bg-brand-teal px-6 py-24 sm:px-10 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-12 h-60 w-60 rounded-full bg-brand-butter/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          {content.eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-butter/30 bg-white/10 px-4 py-1.5 font-sans text-xs tracking-[0.25em] text-brand-butter"
            >
              {content.eyebrow}
            </motion.span>
          )}
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-serif text-4xl leading-[1.05] text-brand-butter md:text-6xl"
          >
            {content.title}
          </motion.h2>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {content.items.map((t, i) => (
            <motion.li
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative flex flex-col rounded-[2rem] bg-brand-sand/95 p-8 text-brand-dark shadow-xl"
            >
              <Quote
                className="h-7 w-7 text-brand-teal/70 flip-x"
                aria-hidden
              />
              <p className="mt-5 font-serif text-lg leading-relaxed text-brand-dark/90">
                “{t.text}”
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-brand-sage/30 pt-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal font-serif text-brand-butter">
                  {t.name.charAt(0)}
                </span>
                <div className="leading-tight">
                  <p className="font-sans text-sm font-medium text-brand-dark">
                    {t.name}
                  </p>
                  {t.role && (
                    <p className="font-sans text-xs text-brand-dark/55">
                      {t.role}
                    </p>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
