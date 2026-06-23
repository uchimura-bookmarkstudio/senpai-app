import Anthropic from "@anthropic-ai/sdk";
import { getCharacter } from "@/lib/characters";

// Senpai Chat のバックエンド。Claude にキャラ人格 system prompt を渡し、
// 応答をテキストストリームで返す。MVP では Haiku を既定に（事業計画書 §5 多層ルーティング）。

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not configured." },
      { status: 503 }
    );
  }

  let body: { characterId?: string; messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const character = getCharacter(body.characterId ?? "");
  if (!character) {
    return Response.json({ error: "Unknown character." }, { status: 400 });
  }

  const messages = (body.messages ?? [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && m.content)
    .slice(-20); // 直近20ターンに制限（コスト・コンテキスト保護）

  if (messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const anthropicStream = client.messages.stream({
          model: process.env.SENPAI_CHAT_MODEL || "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          system: character.systemPrompt,
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });

        anthropicStream.on("text", (text) => {
          controller.enqueue(encoder.encode(text));
        });

        await anthropicStream.finalMessage();
        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : "stream error";
        controller.enqueue(encoder.encode(`\n[error] ${msg}`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
