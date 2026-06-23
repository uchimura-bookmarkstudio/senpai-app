"use client";

import { createBrowserClient } from "@supabase/ssr";

// 環境変数が未設定でもアプリ全体が落ちないようにする。
// 未設定時は null を返し、認証UIが「設定待ち」状態を表示する。
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createBrowserClient(url, anon);
}

export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
