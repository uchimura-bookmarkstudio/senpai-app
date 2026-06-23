"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { useLocale } from "@/lib/locale-context";
import { CHARACTERS } from "@/lib/characters";

export default function Home() {
  const { t, locale } = useLocale();

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="aurora">
          <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:py-28">
            <span className="inline-block rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted">
              {t.heroBadge}
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              {t.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              {t.heroSubtitle}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="w-full rounded-full bg-brand px-7 py-3 font-semibold text-background transition hover:opacity-90 sm:w-auto"
              >
                {t.ctaStart}
              </Link>
              <Link
                href="/login"
                className="w-full rounded-full border border-border px-7 py-3 font-semibold text-foreground transition hover:bg-card sm:w-auto"
              >
                {t.ctaLogin}
              </Link>
            </div>
          </div>
        </section>

        {/* Characters */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            {t.charactersTitle}
          </h2>
          <p className="mt-3 text-center text-muted">{t.charactersSubtitle}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CHARACTERS.map((c) => (
              <Link
                key={c.id}
                href={`/chat?c=${c.id}`}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-transparent"
                style={{ boxShadow: `0 0 0 1px transparent` }}
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                  style={{ background: `${c.color}22`, border: `1px solid ${c.color}55` }}
                >
                  {c.emoji}
                </div>
                <h3 className="mt-4 text-xl font-semibold">
                  {c.name}{" "}
                  <span className="text-base font-normal text-muted">
                    {c.romaji}
                  </span>
                </h3>
                <p className="mt-1 text-sm font-medium" style={{ color: c.color }}>
                  {c.tagline[locale]}
                </p>
                <p className="mt-3 text-sm text-muted">{c.blurb[locale]}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border/60 bg-card/30">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              {t.featuresTitle}
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[
                { icon: "💬", title: t.featChatTitle, body: t.featChatBody },
                { icon: "📚", title: t.featLessonsTitle, body: t.featLessonsBody },
                { icon: "🎯", title: t.featCareerTitle, body: t.featCareerBody },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-6"
                >
                  <div className="text-3xl">{f.icon}</div>
                  <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-8 text-center text-sm text-muted">
          {t.footerNote}
        </div>
      </footer>
    </>
  );
}
