"use client";

import { createContext, useContext, useState } from "react";
import { DEFAULT_LOCALE, getDict } from "./i18n";
import type { Locale } from "./characters";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: ReturnType<typeof getDict>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "senpai.locale";
const LOCALES: Locale[] = ["en", "vi", "id"];

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return LOCALES.includes(saved as Locale) ? (saved as Locale) : DEFAULT_LOCALE;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  function setLocale(l: Locale) {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: getDict(locale) }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
