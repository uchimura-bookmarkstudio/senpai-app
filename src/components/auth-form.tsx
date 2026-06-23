"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteHeader } from "./site-header";
import { useLocale } from "@/lib/locale-context";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const { t } = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const isLogin = mode === "login";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      // Supabase 未設定でもデモとして体験できるよう、チャットへ誘導する。
      setNotice(
        "Auth backend not configured yet. Continuing in demo mode — explore the chat without an account."
      );
      setLoading(false);
      setTimeout(() => router.push("/chat"), 1200);
      return;
    }

    try {
      const { error } = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push("/chat");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
          <h1 className="text-2xl font-bold tracking-tight">
            {isLogin ? t.loginTitle : t.signupTitle}
          </h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-muted" htmlFor="email">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-brand"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-muted" htmlFor="password">
                {t.password}
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-brand"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            {notice && <p className="text-sm text-brand-2">{notice}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand px-5 py-2.5 font-semibold text-background transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "…" : isLogin ? t.loginCta : t.signupCta}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            {isLogin ? t.noAccount : t.haveAccount}{" "}
            <Link
              href={isLogin ? "/signup" : "/login"}
              className="font-semibold text-brand"
            >
              {isLogin ? t.signupCta : t.loginCta}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
