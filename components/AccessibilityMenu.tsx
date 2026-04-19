"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Accessibility, Minus, Plus, RotateCcw } from "lucide-react";

const STORAGE_KEY = "maya-acc-settings";

const FONT_MIN = 90;
const FONT_MAX = 130;
const FONT_STEP = 10;

type AccState = {
  fontSizePercent: number;
  contrast: boolean;
  grayscale: boolean;
  invertColors: boolean;
  readableFont: boolean;
  underlineLinks: boolean;
  highlightLinks: boolean;
  reduceMotion: boolean;
};

const defaultState: AccState = {
  fontSizePercent: 100,
  contrast: false,
  grayscale: false,
  invertColors: false,
  readableFont: false,
  underlineLinks: false,
  highlightLinks: false,
  reduceMotion: false,
};

const STORAGE_KEY_LEGACY = "roi-acc-settings";

function loadState(): AccState {
  if (typeof window === "undefined") return defaultState;
  try {
    const s =
      localStorage.getItem(STORAGE_KEY) ??
      localStorage.getItem(STORAGE_KEY_LEGACY);
    if (s) return { ...defaultState, ...JSON.parse(s) };
  } catch {
    /* ignore */
  }
  return defaultState;
}

function saveState(s: AccState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

/**
 * יישום על document.documentElement — נטען רק בצד הלקוח (useEffect) כדי למנוע אי-התאמת הידרציה.
 */
function applyAccessibilityState(s: AccState) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;

  const filters: string[] = [];
  if (s.contrast) filters.push("contrast(1.22)");
  if (s.grayscale) filters.push("grayscale(1)");
  if (s.invertColors) filters.push("invert(1) hue-rotate(180deg)");
  root.style.filter = filters.length ? filters.join(" ") : "";

  root.style.fontSize =
    s.fontSizePercent === 100 ? "" : `${s.fontSizePercent}%`;

  const toggleClasses = [
    "acc-readable-font",
    "acc-underline-links",
    "acc-highlight-links",
    "acc-reduce-motion",
  ] as const;
  toggleClasses.forEach((c) => root.classList.remove(c));
  if (s.readableFont) root.classList.add("acc-readable-font");
  if (s.underlineLinks) root.classList.add("acc-underline-links");
  if (s.highlightLinks) root.classList.add("acc-highlight-links");
  if (s.reduceMotion) root.classList.add("acc-reduce-motion");

  /* ניקוי מצב ישן שהוחל על body / main */
  document.body.classList.remove(
    "acc-readable-font",
    "acc-underline-links",
    "acc-highlight-links",
    "acc-reduce-motion",
    "acc-contrast",
    "acc-grayscale",
    "acc-invert",
  );
  document.body.style.fontSize = "";
  const main = document.getElementById("main-content");
  if (main) {
    main.classList.remove("acc-contrast", "acc-grayscale", "acc-invert");
  }
}

export function AccessibilityMenu() {
  const dialogId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<AccState>(defaultState);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const s = loadState();
    setState(s);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    applyAccessibilityState(state);
    saveState(state);
  }, [mounted, state]);

  const handleOpenChange = useCallback((next: boolean) => {
    setOpen(next);
    if (next) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      window.requestAnimationFrame(() => {
        const first =
          panelRef.current?.querySelector<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
        first?.focus();
      });
    } else {
      previouslyFocused.current?.focus?.();
      previouslyFocused.current = null;
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      handleOpenChange(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
    };
  }, [open, handleOpenChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleOpenChange(false);
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleOpenChange]);

  const reset = () => {
    setState(defaultState);
    handleOpenChange(false);
  };

  const openStatement = () => {
    handleOpenChange(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-accessibility-statement"));
    }
  };

  const fontDown = () =>
    setState((prev) => ({
      ...prev,
      fontSizePercent: Math.max(FONT_MIN, prev.fontSizePercent - FONT_STEP),
    }));
  const fontUp = () =>
    setState((prev) => ({
      ...prev,
      fontSizePercent: Math.min(FONT_MAX, prev.fontSizePercent + FONT_STEP),
    }));

  const toggles: {
    key: Exclude<keyof AccState, "fontSizePercent">;
    label: string;
    aria: string;
  }[] = [
    { key: "contrast", label: "ניגודיות גבוהה", aria: "הפעלת ניגודיות גבוהה" },
    { key: "grayscale", label: "גווני אפור", aria: "הפעלת תצוגת גווני אפור" },
    {
      key: "invertColors",
      label: "היפוך צבעים",
      aria: "הפעלת היפוך צבעים",
    },
    { key: "readableFont", label: "גופן קריא", aria: "מעבר לגופן sans קריא" },
    {
      key: "underlineLinks",
      label: "קו תחתון לקישורים",
      aria: "הדגשת קישורים בקו תחתון",
    },
    {
      key: "highlightLinks",
      label: "הדגשת קישורים",
      aria: "מסגרת הדגשה לקישורים",
    },
    {
      key: "reduceMotion",
      label: "עצירת אנימציות",
      aria: "צמצום תנועה ואנימציה",
    },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        id={`${dialogId}-trigger`}
        onClick={() => handleOpenChange(!open)}
        className="fixed bottom-6 left-6 z-[110] flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-brand-dark text-brand-sand shadow-[0_10px_40px_-12px_rgba(44,51,51,0.45)] transition hover:scale-105 hover:bg-brand-sage hover:text-white hover:shadow-[0_14px_44px_-14px_rgba(44,51,51,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={open}
        aria-controls={`${dialogId}-panel`}
        aria-haspopup="dialog"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <Accessibility className="h-6 w-6" aria-hidden />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id={`${dialogId}-panel`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-title`}
            dir="rtl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[5.5rem] left-6 z-[110] flex max-h-[min(70vh,calc(100vh-7rem))] w-[min(100vw-3rem,20rem)] flex-col overflow-hidden rounded-2xl border border-brand-sage/40 bg-brand-sand text-brand-dark shadow-2xl"
          >
            <div className="shrink-0 border-b border-brand-sage/30 px-4 py-4 text-start">
              <h3
                id={`${dialogId}-title`}
                className="font-sans text-base font-semibold text-brand-dark"
              >
                תפריט נגישות
              </h3>
              <p className="mt-1 font-sans text-xs leading-relaxed text-brand-dark/75">
                התאימו את תצוגת האתר לצרכים שלכם. ההגדרות נשמרות בדפדפן.
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
              <div className="space-y-4 font-sans text-sm">
                <div>
                  <p className="mb-2 font-medium text-brand-dark">גודל גופן</p>
                  <div
                    className="flex items-center justify-center gap-3"
                    role="group"
                    aria-label="התאמת גודל גופן"
                    dir="ltr"
                  >
                    <button
                      type="button"
                      onClick={fontDown}
                      disabled={state.fontSizePercent <= FONT_MIN}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-dark text-brand-sand transition hover:bg-brand-sage hover:text-white disabled:pointer-events-none disabled:opacity-35"
                      aria-label="הקטנת גודל הטקסט"
                    >
                      <Minus className="h-4 w-4" aria-hidden />
                    </button>
                    <span
                      className="min-w-[3.5rem] text-center font-medium tabular-nums text-brand-dark"
                      aria-live="polite"
                    >
                      {state.fontSizePercent}%
                    </span>
                    <button
                      type="button"
                      onClick={fontUp}
                      disabled={state.fontSizePercent >= FONT_MAX}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-dark text-brand-sand transition hover:bg-brand-sage hover:text-white disabled:pointer-events-none disabled:opacity-35"
                      aria-label="הגדלת גודל הטקסט"
                    >
                      <Plus className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </div>

                <div
                  className="space-y-3 border-t border-brand-sage/25 pt-3"
                  role="group"
                  aria-label="אפשרויות תצוגה"
                >
                  {toggles.map(({ key, label, aria }) => {
                    const on = state[key] as boolean;
                    return (
                      <div
                        key={key}
                        className="flex items-center justify-between gap-3"
                      >
                        <span
                          id={`${dialogId}-label-${key}`}
                          className="min-w-0 flex-1 text-start leading-snug"
                        >
                          {label}
                        </span>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={on}
                          aria-labelledby={`${dialogId}-label-${key}`}
                          aria-label={aria}
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              [key]: !prev[key],
                            }))
                          }
                          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 focus-visible:ring-offset-brand-sand ${
                            on ? "bg-brand-dark" : "bg-brand-sage/35"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all duration-200 ease-out ${
                              on
                                ? "end-0.5 start-auto"
                                : "start-0.5 end-auto"
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="shrink-0 space-y-2 border-t border-brand-sage/30 bg-white/50 px-4 py-4">
              <button
                type="button"
                onClick={openStatement}
                className="w-full cursor-pointer rounded-xl py-2.5 text-center font-sans text-sm font-medium text-brand-dark underline-offset-2 transition hover:bg-brand-sage/15 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
              >
                הצהרת נגישות
              </button>
              <button
                type="button"
                onClick={reset}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-sage/40 bg-white py-2.5 font-sans text-sm font-medium text-brand-dark transition hover:bg-brand-sage/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
                aria-label="איפוס כל הגדרות הנגישות לברירת המחדל"
              >
                <RotateCcw className="h-4 w-4 shrink-0" aria-hidden />
                איפוס הגדרות
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
