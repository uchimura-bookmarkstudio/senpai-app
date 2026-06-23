import { getCharacter } from "@/lib/characters";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };
type GeminiStreamEvent = {
  event_type?: string;
  delta?: {
    type?: string;
    text?: string;
  };
  error?: {
    message?: string;
  };
};

const GEMINI_INTERACTIONS_URL = "https://generativelanguage.googleapis.com/v1beta/interactions?alt=sse";
const DEFAULT_MODEL = "gemini-3.5-flash";

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY is not configured." },
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
    .slice(-20);

  if (messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      try {
        const conversation = messages
          .map((m) => `${m.role === "user" ? "Learner" : "Senpai"}: ${m.content}`)
          .join("\n\n");

        const response = await fetch(GEMINI_INTERACTIONS_URL, {
          method: "POST",
          headers: {
            "x-goog-api-key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: process.env.GEMINI_MODEL || DEFAULT_MODEL,
            stream: true,
            system_instruction: character.systemPrompt,
            input: conversation,
            generation_config: {
              temperature: 0.85,
              max_output_tokens: 1024,
            },
          }),
        });

        if (!response.ok || !response.body) {
          const detail = await response.text().catch(() => "");
          throw new Error(detail || `Gemini request failed: ${response.status}`);
        }

        const reader = response.body.getReader();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;

            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;

            const event = JSON.parse(data) as GeminiStreamEvent;
            if (event.event_type === "step.delta" && event.delta?.type === "text" && event.delta.text) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
            if (event.error) {
              throw new Error(event.error.message ?? "Gemini stream error");
            }
          }
        }
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
