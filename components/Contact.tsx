"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";

export type ContactHours = { day: string; hours: string };

export type ContactForm = {
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  submitLabel: string;
  successMessage: string;
};

export type ContactContent = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  address: string;
  phone: string;
  email: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  mapEmbed?: string;
  hours?: ContactHours[];
  form?: ContactForm;
};

type Props = { content: ContactContent };

const defaultForm: ContactForm = {
  nameLabel: "שם מלא",
  emailLabel: "אימייל",
  phoneLabel: "טלפון",
  messageLabel: "איך נוכל לעזור?",
  submitLabel: "שליחה",
  successMessage: "תודה! חזרנו אליכם בהקדם.",
};

export default function Contact({ content }: Props) {
  const form = content.form ?? defaultForm;
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder submit — wire to real endpoint later.
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 600);
  };

  const telHref = `tel:${content.phone.replace(/\s/g, "")}`;
  const mailOk = content.email.includes("@");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 bg-brand-sand px-6 py-24 sm:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[5fr_6fr] lg:gap-20">
        {/* Left: info + map */}
        <div className="flex flex-col gap-10">
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
            id="contact-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-serif text-4xl leading-[1.05] text-brand-dark md:text-6xl"
          >
            {content.title}
          </motion.h2>

          {content.subtitle && (
            <p className="max-w-md font-sans text-base leading-relaxed text-brand-dark/70 md:text-lg">
              {content.subtitle}
            </p>
          )}

          <ul className="space-y-5 font-sans text-base">
            <li className="flex items-start gap-4">
              <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-brand-butter">
                <MapPin className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark/50">
                  כתובת
                </p>
                <p className="text-brand-dark">{content.address}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-brand-butter">
                <Phone className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark/50">
                  טלפון
                </p>
                <a
                  href={telHref}
                  className="link-underline text-brand-dark"
                  dir="ltr"
                >
                  {content.phone}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-brand-butter">
                <Mail className="h-4 w-4" aria-hidden />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-dark/50">
                  אימייל
                </p>
                {mailOk ? (
                  <a
                    href={`mailto:${content.email}`}
                    className="link-underline text-brand-dark"
                  >
                    {content.email}
                  </a>
                ) : (
                  <span className="text-brand-dark/80">{content.email}</span>
                )}
              </div>
            </li>
            {content.hours && content.hours.length > 0 && (
              <li className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-teal text-brand-butter">
                  <Clock className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-dark/50">
                    שעות פעילות
                  </p>
                  <ul className="mt-1 space-y-0.5 text-brand-dark/85">
                    {content.hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-center justify-between gap-6"
                      >
                        <span>{h.day}</span>
                        <span
                          className="tabular-nums text-brand-dark/70"
                          dir="ltr"
                        >
                          {h.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )}
          </ul>

          {/* Map */}
          <div className="relative mt-2 overflow-hidden rounded-3xl border border-brand-sage/30 bg-white shadow-sm">
            {content.mapEmbed ? (
              <iframe
                src={content.mapEmbed}
                title={`מפה — ${content.address}`}
                loading="lazy"
                allowFullScreen
                className="block h-72 w-full border-0 md:h-80"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center bg-brand-butter/40 font-serif text-brand-dark/60">
                מפה תוצג כאן
              </div>
            )}
          </div>
        </div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] border border-brand-sage/25 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(0,95,105,0.25)] md:p-12"
        >
          <div className="pointer-events-none absolute -top-6 -left-6 hidden h-24 w-24 rounded-full bg-brand-butter/70 blur-2xl md:block" />
          <div className="pointer-events-none absolute -bottom-10 -right-6 hidden h-32 w-32 rounded-full bg-brand-teal/10 blur-3xl md:block" />

          <h3 className="relative font-serif text-2xl text-brand-dark md:text-3xl">
            שליחת פנייה
          </h3>
          <p className="relative mt-2 font-sans text-sm text-brand-dark/60">
            * שדות חובה מסומנים.
          </p>

          {sent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              role="status"
              className="relative mt-8 rounded-2xl border border-brand-teal/30 bg-brand-butter/40 p-6 text-center font-sans text-brand-dark"
            >
              <p className="font-serif text-xl">{form.successMessage}</p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="relative mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
              noValidate
            >
              <Field
                id="contact-name"
                label={form.nameLabel + " *"}
                name="name"
                required
                autoComplete="name"
              />
              <Field
                id="contact-phone"
                label={form.phoneLabel}
                name="phone"
                type="tel"
                autoComplete="tel"
              />
              <Field
                id="contact-email"
                label={form.emailLabel + " *"}
                name="email"
                type="email"
                required
                autoComplete="email"
                className="sm:col-span-2"
              />
              <div className="sm:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-sans text-sm font-medium text-brand-dark"
                >
                  {form.messageLabel} *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  suppressHydrationWarning
                  className="w-full rounded-2xl border border-brand-sage/30 bg-brand-sand/50 px-4 py-3 font-sans text-[15px] text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/25"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  suppressHydrationWarning
                  disabled={submitting}
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-teal px-8 py-4 font-sans text-base font-medium text-brand-butter shadow-lg shadow-brand-teal/15 transition hover:-translate-y-0.5 hover:bg-brand-teal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60 sm:w-auto"
                >
                  <Send
                    className="h-4 w-4 transition group-hover:-translate-x-1 flip-x"
                    aria-hidden
                  />
                  {submitting ? "שולח..." : form.submitLabel}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  name,
  type = "text",
  required,
  autoComplete,
  className = "",
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block font-sans text-sm font-medium text-brand-dark"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        suppressHydrationWarning
        className="w-full rounded-full border border-brand-sage/30 bg-brand-sand/50 px-5 py-3 font-sans text-[15px] text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-teal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal/25"
      />
    </div>
  );
}
