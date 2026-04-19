"use client";

import { useState, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { X } from "lucide-react";
import siteContent from "@/content.json";

const POLICY_CONTENT = {
  title: "מדיניות פרטיות",
  updated: "24.03.2026",
  sections: [
    {
      heading: "מבוא",
      body: "מדיניות זו מסבירה כיצד אנו מטפלים במידע בעת השימוש באתר. אנו מכבדים את פרטיות המשתמשים ופועלים בהתאם לעקרונות שקיפות.",
    },
    {
      heading: "איסוף נתונים ואנליטיקה",
      body: "האתר עשוי להשתמש ב-Google Analytics 4 (GA4) לאיסוף נתונים סטטיסטיים ואנונימיים ככל האפשר, לצורך הבנת תנועה ושימוש באתר. נתונים אלו עשויים לכלול מידע טכני כגון סוג דפדפן, מכשיר, דפים שנצפו ומשך ביקור — ולא נועדו למכור או לשתף מידע אישי מזהה.",
    },
    {
      heading: "עוגיות ושירותי תשתית",
      body: "האתר עשוי להשתמש בעוגיות (Cookies) לצורך תפקוד, ביצועים וניתוח שימוש. תכנים עשויים להוגש באמצעות שירותי צד ג׳ כגון Cloudflare לצורך אבטחה והגשה מהירה. שימוש זה אינו מהווה מכירת נתונים אישיים לצדדים שלישיים לצורכי פרסום.",
    },
    {
      heading: "אין מכירת נתונים אישיים",
      body: "איננו מוכרים, משכירים או מסחרים במידע אישי מזהה של משתמשי האתר לצדדים שלישיים.",
    },
    {
      heading: "יצירת קשר",
      body: "לשאלות בנוגע למדיניות פרטיות זו:",
      showContact: true,
    },
  ],
};

export type PrivacyPolicyModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function PrivacyPolicyModal({
  open: controlledOpen,
  onOpenChange,
}: PrivacyPolicyModalProps = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen! : uncontrolledOpen;

  const setOpen = useCallback(
    (value: boolean) => {
      onOpenChange?.(value);
      if (!isControlled) {
        setUncontrolledOpen(value);
      }
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    const onEvent = () => setOpen(true);
    window.addEventListener("open-privacy-policy", onEvent);
    return () => window.removeEventListener("open-privacy-policy", onEvent);
  }, [setOpen]);

  const { email, phone } = siteContent.contact;
  const mailOk = email.includes("@");
  const telHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[121] flex max-h-[85vh] w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-brand-sage/35 bg-brand-sand shadow-2xl focus:outline-none"
          aria-describedby={undefined}
        >
          <div className="flex shrink-0 items-center justify-between border-b border-brand-sage/30 p-4 sm:p-5">
            <Dialog.Title
              className="font-serif text-lg font-semibold text-brand-dark"
              dir="rtl"
            >
              {POLICY_CONTENT.title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-lg p-2 text-brand-dark/60 transition-colors hover:bg-white/80 hover:text-brand-dark"
                aria-label="סגור"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </Dialog.Close>
          </div>

          <ScrollArea.Root className="min-h-0 flex-1">
            <ScrollArea.Viewport className="h-full max-h-[calc(85vh-8rem)] w-full">
              <div
                id="privacy-policy-content"
                className="p-4 font-sans text-sm leading-relaxed text-brand-dark sm:p-6"
                dir="rtl"
              >
                <p className="mb-6 text-xs text-brand-dark/60">
                  עודכן לאחרונה: {POLICY_CONTENT.updated}
                </p>
                {POLICY_CONTENT.sections.map((section, i) => (
                  <div key={i} className="mb-6">
                    <h4 className="mb-2 font-semibold text-brand-dark">
                      {section.heading}
                    </h4>
                    {"body" in section && section.body && (
                      <p className="mb-2 text-right">{section.body}</p>
                    )}
                    {"showContact" in section && section.showContact && (
                      <div className="mt-2 space-y-2 text-right">
                        {mailOk && (
                          <p>
                            <a
                              href={`mailto:${email}`}
                              className="text-brand-dark underline-offset-2 transition hover:underline"
                            >
                              דוא&quot;ל: {email}
                            </a>
                          </p>
                        )}
                        {!mailOk && <p className="text-brand-dark/80">דוא&quot;ל: {email}</p>}
                        <p>
                          <a
                            href={telHref}
                            className="text-brand-dark underline-offset-2 transition hover:underline"
                          >
                            טלפון: {phone}
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className="flex w-2 touch-none select-none rounded-full bg-brand-sage/25 p-0.5"
              orientation="vertical"
            >
              <ScrollArea.Thumb className="relative min-h-[40px] flex-1 rounded-full bg-brand-sage/50" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
