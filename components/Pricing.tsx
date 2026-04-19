"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export type PricingPlan = {
  name: string;
  price: string;
  description?: string;
  features: string[];
  cta?: string;
  ctaHref?: string;
  featured?: boolean;
};

export type PricingContent = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
};

type Props = { content: PricingContent };

export default function Pricing({ content }: Props) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative scroll-mt-24 bg-brand-sand px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
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
            id="pricing-heading"
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

        <ul className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
          {content.plans.map((plan, i) => {
            const featured = !!plan.featured;
            return (
              <motion.li
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`relative flex flex-col rounded-[2.25rem] p-10 shadow-[0_30px_80px_-50px_rgba(0,95,105,0.35)] transition hover:-translate-y-1 ${
                  featured
                    ? "bg-brand-dark text-brand-butter"
                    : "border border-brand-sage/25 bg-white/80 text-brand-dark"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 right-8 rounded-full bg-brand-gold px-4 py-1 font-sans text-xs font-medium tracking-wider text-brand-dark">
                    המובחר
                  </span>
                )}

                <div className="flex items-baseline justify-between">
                  <h3
                    className={`font-serif text-3xl ${
                      featured ? "text-brand-butter" : "text-brand-dark"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`font-serif text-4xl ${
                      featured ? "text-brand-butter" : "text-brand-teal"
                    }`}
                    dir="ltr"
                  >
                    {plan.price}
                  </p>
                </div>

                {plan.description && (
                  <p
                    className={`mt-3 font-sans text-sm leading-relaxed ${
                      featured ? "text-brand-butter/75" : "text-brand-dark/65"
                    }`}
                  >
                    {plan.description}
                  </p>
                )}

                <ul className="mt-8 space-y-3 font-sans text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          featured
                            ? "bg-brand-butter text-brand-dark"
                            : "bg-brand-teal text-brand-butter"
                        }`}
                      >
                        <Check className="h-3 w-3" aria-hidden />
                      </span>
                      <span
                        className={
                          featured ? "text-brand-butter/90" : "text-brand-dark/80"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.ctaHref ?? "#contact"}
                  className={`mt-10 inline-flex items-center justify-center rounded-full px-6 py-3.5 font-sans text-sm font-medium transition hover:-translate-y-0.5 ${
                    featured
                      ? "bg-brand-butter text-brand-dark hover:bg-white"
                      : "bg-brand-teal text-brand-butter shadow-sm hover:bg-brand-teal/90"
                  }`}
                >
                  {plan.cta ?? "לבחירת החבילה"}
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
