"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";

export type HeroStat = { value: string; label: string };

export type HeroContent = {
  eyebrow?: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaHref?: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
  backgroundImage: string;
  stats?: HeroStat[];
};

type Props = { content: HeroContent };

export default function Hero({ content }: Props) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden bg-brand-sand"
    >
      {/* Ambient sculptural blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-brand-butter/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -left-40 h-[26rem] w-[26rem] rounded-full bg-brand-teal/10 blur-3xl"
      />

      {/* Mobile-only subtle hero image — gives the small-screen hero the
          same sense of botanical presence as the desktop side-cards. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 md:hidden"
      >
        <Image
          src={content.backgroundImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority
        />
        {/* Soft radial vignette to keep text center readable while the
            image still breathes at the edges. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(240,240,239,0.75)_0%,rgba(240,240,239,0.4)_55%,rgba(240,240,239,0.1)_100%)]" />
      </div>

      {/* Decorative asymmetric image cards — placed *inside* the viewport so
          they're never clipped. Only on md+ to keep mobile uncluttered. */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 1 }}
        aria-hidden
        className="pointer-events-none absolute right-4 top-28 hidden h-56 w-40 overflow-hidden rounded-[2rem] bg-brand-butter/60 shadow-xl md:block lg:right-10 lg:h-64 lg:w-48"
      >
        <Image
          src={content.backgroundImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 12rem, 10rem"
          className="object-cover"
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ duration: 1, delay: 0.15 }}
        aria-hidden
        className="pointer-events-none absolute left-4 bottom-28 hidden h-48 w-36 overflow-hidden rounded-[1.75rem] border-4 border-brand-sand bg-brand-teal/20 shadow-2xl md:block lg:left-10 lg:h-56 lg:w-44"
      >
        <Image
          src="/images/flowers2.webp"
          alt=""
          fill
          sizes="(min-width: 1024px) 11rem, 9rem"
          className="object-cover"
        />
      </motion.div>

      {/* Centered content — takes the full available height so the arrow below
          always sits at the bottom of the 100dvh section, never pushed off. */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-16 sm:px-10 md:py-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          {content.eyebrow && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-sage/40 bg-white/60 px-4 py-1.5 font-sans text-xs tracking-[0.25em] text-brand-teal"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-teal" />
              {content.eyebrow}
            </motion.span>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-6 font-serif text-4xl leading-[1.05] text-brand-dark sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {content.title.split(" ").map((word, i, arr) => (
              <span key={i} className="inline-block">
                {i === arr.length - 2 ? (
                  <em className="not-italic text-brand-teal">{word}&nbsp;</em>
                ) : (
                  <>{word}&nbsp;</>
                )}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl font-sans text-base leading-relaxed text-brand-dark/75 md:text-lg"
          >
            {content.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={content.ctaHref ?? "#gallery"}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-teal px-7 py-3.5 font-sans text-base font-medium text-brand-butter shadow-lg shadow-brand-teal/20 transition hover:-translate-y-0.5 hover:bg-brand-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-sand"
            >
              {content.cta}
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                aria-hidden
              />
            </a>

            {content.secondaryCta && (
              <a
                href={content.secondaryCtaHref ?? "#contact"}
                className="link-underline px-2 py-2 font-sans text-base text-brand-dark/80 hover:text-brand-dark"
              >
                {content.secondaryCta}
              </a>
            )}
          </motion.div>

          {content.stats && content.stats.length > 0 && (
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 hidden w-full max-w-lg grid-cols-3 gap-6 border-t border-brand-sage/30 pt-5 sm:grid"
            >
              {content.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <dt className="font-serif text-xl text-brand-dark md:text-2xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 font-sans text-[11px] uppercase tracking-[0.15em] text-brand-dark/55">
                    {s.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
      </div>

      {/* Scroll-down arrow — sibling of the content column, so it always sits
          at the bottom of the 100dvh section regardless of content length. */}
      <motion.a
        href="#about"
        aria-label="גלילה לתוכן הבא"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="group relative z-10 mx-auto mb-10 flex shrink-0 items-center justify-center text-brand-dark/60 transition hover:text-brand-teal md:mb-14"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-dark/20 bg-white/60 backdrop-blur-sm transition group-hover:border-brand-teal group-hover:bg-white"
        >
          <ChevronDown className="h-5 w-5" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
