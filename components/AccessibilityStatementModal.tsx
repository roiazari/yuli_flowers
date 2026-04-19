"use client";

import { useState, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { X } from "lucide-react";

const STATEMENT_CONTENT = {
  title: "הצהרת נגישות",
  updated: "17.03.2026",
  sections: [
    {
      heading: "מבוא",
      body: "אנו ב-Roi Studio רואים חשיבות עליונה בהנגשת אתר האינטרנט שלנו לאנשים עם מוגבלויות, על מנת לאפשר לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות, לגלוש בו בקלות ובנוחות. האתר הונגש בהתאם להוראות חוק שוויון זכויות לאנשים עם מוגבלות (התשנ\"ח-1998) והתקנות שהותקנו מכוחו.",
    },
    {
      heading: "רמת הנגישות",
      body: "האתר עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע\"ג-2013. התאמות הנגישות בוצעו עפ\"י המלצות התקן הישראלי (ת\"י 5568) לנגישות תכנים באינטרנט ברמת AA ומסמך WCAG2.0 הבינלאומי.",
    },
    {
      heading: "התאמות שבוצעו באתר",
      items: [
        "ניווט: האתר מאפשר ניווט פשוט וברור באמצעות מקלדת בלבד",
        "תוכן: התכנים באתר כתובים בשפה פשוטה וברורה",
        "תצוגה: האתר מותאם לצפייה בדפדפנים מודרניים ובגדלי מסך שונים (רספונסיבי)",
        "תמונות: לתמונות באתר נוסף טקסט חלופי (alt text) עבור טכנולוגיות מסייעות",
        "תפריט נגישות: באתר מוצב תפריט נגישות המאפשר, בין היתר, שינוי גודל גופן, מעבר למצב ניגודיות גבוהה, גווני אפור ועוד",
      ],
    },
    {
      heading: "דרכי פנייה לבקשות והצעות שיפור בנושא נגישות",
      body: "אנו ממשיכים להשקיע מאמצים בשיפור נגישות האתר כחלק ממחויבותנו לאפשר שימוש בו עבור כלל האוכלוסייה, כולל אנשים עם מוגבלויות. אם נתקלתם בבעיית נגישות או יש לכם הצעה לשיפור, נשמח לקבל את פנייתכם.",
    },
    {
      heading: "פרטי רכז הנגישות",
      contact: { name: "רועי עזרי", email: "roiazari148@gmail.com" },
    },
  ],
};

export type AccessibilityStatementModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function AccessibilityStatementModal({
  open: controlledOpen,
  onOpenChange,
}: AccessibilityStatementModalProps = {}) {
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
    window.addEventListener("open-accessibility-statement", onEvent);
    return () => window.removeEventListener("open-accessibility-statement", onEvent);
  }, [setOpen]);

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
              {STATEMENT_CONTENT.title}
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
                id="accessibility-statement-content"
                className="p-4 font-sans text-sm leading-relaxed text-brand-dark sm:p-6"
                dir="rtl"
              >
                <p className="mb-6 text-xs text-brand-dark/60">
                  עודכן לאחרונה: {STATEMENT_CONTENT.updated}
                </p>
                {STATEMENT_CONTENT.sections.map((section, i) => (
                  <div key={i} className="mb-6">
                    <h4 className="mb-2 font-semibold text-brand-dark">
                      {section.heading}
                    </h4>
                    {"body" in section && section.body && (
                      <p className="mb-2 text-right">{section.body}</p>
                    )}
                    {"items" in section && section.items && (
                      <ul className="list-inside list-disc space-y-1 pr-2 text-right">
                        {section.items.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {"contact" in section && section.contact && (
                      <p className="text-right">
                        שם: {section.contact.name}
                        <br />
                        <a
                          href={`mailto:${section.contact.email}`}
                          className="text-brand-dark underline-offset-2 transition hover:underline"
                        >
                          דוא&quot;ל: {section.contact.email}
                        </a>
                      </p>
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
