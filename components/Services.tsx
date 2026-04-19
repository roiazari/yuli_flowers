"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Flower2, Gift, Sparkles, type LucideIcon } from "lucide-react";

export type ServiceItem = {
  title: string;
  description: string;
  icon?: string;
};

export type ServicesContent = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: ServiceItem[];
};

type Props = { content: ServicesContent };

// Subtle botanical "Meadow-Core" fallback icons when no image is supplied.
const FALLBACK_ICONS: LucideIcon[] = [Flower2, Sparkles, Gift];

export default function Services({ content }: Props) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative scroll-mt-24 bg-brand-butter/30 px-6 py-24 sm:px-10 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-sage/30 to-transparent"
      />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
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
            id="services-heading"
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

        <ul className="mt-16 grid gap-8 md:grid-cols-3">
          {content.items.map((item, i) => {
            const FallbackIcon = FALLBACK_ICONS[i % FALLBACK_ICONS.length];
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-brand-sage/25 bg-white/80 p-8 shadow-[0_20px_60px_-40px_rgba(0,95,105,0.3)] transition hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(0,95,105,0.35)]"
              >
                <div className="relative mx-auto mb-6 h-28 w-28 shrink-0 overflow-hidden rounded-3xl bg-brand-butter/60 md:mx-0">
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-brand-teal">
                      <FallbackIcon className="h-10 w-10" aria-hidden />
                    </div>
                  )}
                  <span
                    aria-hidden
                    className="absolute -bottom-2 -left-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-brand-butter shadow-md"
                  >
                    <FallbackIcon className="h-5 w-5" aria-hidden />
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-brand-dark">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-brand-dark/70">
                  {item.description}
                </p>

                <span className="pointer-events-none absolute inset-x-8 bottom-6 h-px origin-right scale-x-0 bg-brand-teal/40 transition-transform duration-500 group-hover:scale-x-100" />
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
