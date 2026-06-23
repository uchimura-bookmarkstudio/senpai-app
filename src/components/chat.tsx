"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "./site-header";
import { useLocale } from "@/lib/locale-context";
import { CHARACTERS, getCharacter, type Character } from "@/lib/characters";

type Msg = { role: "user" | "assistant"; content: string };

export function Chat() {
  const { t, locale } = useLocale();
  const searchParams = useSearchParams();
  const initial = getCharacter(searchParams.get("c") ?? "");
  const [active, setActive] = useState<Character | null>(initial ?? null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, busy]);

  function selectCharacter(c: Character) {
    setActive(c);
    setMessages([]);
  }

  async function send() {
    const text = input.trim();
    if (!text || !active || busy) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);

    // ストリーミング表示用の空アシスタントメッセージを先に置く
    setMessages((m) => [...m, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ characterId: active.id, messages: next }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        appendToLast(`\n[${data.error ?? "Service unavailable"}]`);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        appendToLast(decoder.decode(value, { stream: true }));
      }
    } catch {
      appendToLast("\n[network error]");
    } finally {
      setBusy(false);
    }
  }

  function appendToLast(chunk: string) {
    setMessages((m) => {
      const copy = [...m];
      const last = copy[copy.length - 1];
      if (last && last.role === "assistant") {
        copy[copy.length - 1] = { ...last, content: last.content + chunk };
      }
      return copy;
    });
  }

  // --- キャラ未選択：選択画面 ---
  if (!active) {
    return (
      <>
        <SiteHeader />
        <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-12">
          <h1 className="text-center text-3xl font-bold tracking-tight">
            {t.chooseSenpai}
          </h1>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {CHARACTERS.map((c) => (
              <button
                key={c.id}
                onClick={() => selectCharacter(c)}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left transition hover:-translate-y-0.5"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border bg-background">
                  <Image
                    src={c.image.src}
                    alt={`${c.romaji} / ${c.name}`}
                    width={96}
                    height={96}
                    sizes="64px"
                    className="h-full w-full object-cover"
                    style={{ objectPosition: c.image.position }}
                  />
                </div>
                <div>
                  <div className="text-lg font-semibold">
                    {c.name}{" "}
                    <span className="text-sm font-normal text-muted">
                      {c.romaji}
                    </span>
                  </div>
                  <div className="text-sm" style={{ color: c.color }}>
                    {c.tagline[locale]}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </main>
      </>
    );
  }

  // --- チャット画面 ---
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 py-4">
        {/* 相手キャラ */}
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
          <button
            onClick={() => setActive(null)}
            className="rounded-full border border-border px-3 py-1 text-sm text-muted hover:text-foreground"
          >
            ← {t.back}
          </button>
          <div className="h-10 w-10 overflow-hidden rounded-full border border-border bg-background">
            <Image
              src={active.image.src}
              alt={`${active.romaji} / ${active.name}`}
              width={80}
              height={80}
              sizes="40px"
              className="h-full w-full object-cover"
              style={{ objectPosition: active.image.position }}
            />
          </div>
          <div className="font-semibold">
            {active.name} <span className="text-muted">{active.romaji}</span>
          </div>
        </div>

        {/* メッセージ */}
        <div
          ref={scrollRef}
          className="no-scrollbar mt-3 flex-1 space-y-3 overflow-y-auto rounded-2xl border border-border bg-card/40 p-4"
        >
          {messages.length === 0 && (
            <p className="py-10 text-center text-sm text-muted">
              {active.emoji} {active.tagline[locale]}
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "bg-brand text-background"
                    : "border border-border bg-card"
                }`}
              >
                {m.content || (
                  <span className="text-muted">
                    {active.romaji} {t.thinking}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 入力 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="mt-3 flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chatPlaceholder}
            className="flex-1 rounded-full border border-border bg-background px-4 py-3 outline-none focus:border-brand"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-full bg-brand px-5 py-3 font-semibold text-background transition hover:opacity-90 disabled:opacity-50"
          >
            {t.send}
          </button>
        </form>
      </main>
    </>
  );
}
