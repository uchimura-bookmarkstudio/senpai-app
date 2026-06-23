"use client";

import { useLocale } from "@/lib/locale-context";
import { LOCALES } from "@/lib/i18n";

export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();
  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card/60 p-1 text-sm">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          className={`rounded-full px-2.5 py-1 transition ${
            locale === l.code
              ? "bg-brand/20 text-foreground"
              : "text-muted hover:text-foreground"
          }`}
          title={l.label}
        >
          <span className="mr-1">{l.flag}</span>
          <span className="hidden sm:inline">{l.code.toUpperCase()}</span>
        </button>
      ))}
    </div>
  );
}
