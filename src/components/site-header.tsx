"use client";

import Link from "next/link";
import { LocaleSwitcher } from "./locale-switcher";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-xl">🌸</span>
          <span className="text-lg tracking-tight">Senpai</span>
        </Link>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
