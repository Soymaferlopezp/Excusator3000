import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STRINGS, type UIStrings } from "./strings";
import { getContent } from "@/engine/excuseEngine";
import type { Locale, LocaleContent } from "@/engine/types";

const LOCALES: Locale[] = ["en", "es"];
const KEY = "e3k.locale";

interface I18nValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: UIStrings;
  content: LocaleContent;
  locales: Locale[];
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    let initial: Locale = "en";
    try {
      const stored = localStorage.getItem(KEY) as Locale | null;
      if (stored && LOCALES.includes(stored)) initial = stored;
    } catch {
      /* persistence optional */
    }
    setLocaleState(initial);
    document.documentElement.lang = initial;
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* persistence optional */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale,
      t: STRINGS[locale],
      content: getContent(locale),
      locales: LOCALES,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export const LOCALE_LABELS: Record<Locale, string> = { en: "EN", es: "ES" };
