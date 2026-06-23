# Senpai

Senpai is a portfolio MVP for AI-assisted Japanese learning and career preparation.

The product concept is simple: young learners in Southeast Asia can chat with anime-style mentors, practice Japanese, and move toward Japan-related career opportunities through a friendly learning interface.

## What this demonstrates

- A production-shaped Next.js app with landing, authentication screens, and chat UI
- Gemini response streaming through a server-side API route
- Character-based system prompts for different mentor personalities
- Multilingual UI foundations for English, Vietnamese, and Indonesian users
- Optional Supabase authentication with demo-mode fallback
- Public-safe environment setup with no committed secrets

## Core features

- Landing page that explains the learning and career concept
- Login and signup screens backed by Supabase Auth when configured
- AI chat experience with four mentor characters
- Streaming Claude responses from the API route
- Locale switcher for EN / VN / ID
- Recent-message trimming to keep chat requests bounded

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Gemini API
- Supabase client libraries

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment variables

| Variable | Required | Purpose |
|---|---:|---|
| `GEMINI_API_KEY` | Yes for AI chat | Server-side Gemini API key |
| `GEMINI_MODEL` | No | Overrides the default chat model |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Enables Supabase Auth |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Enables Supabase Auth |

Without Supabase variables, the app can still be explored in demo mode.

## Repository structure

```text
src/
├── app/
│   ├── api/chat/route.ts   # LLM streaming route
│   ├── chat/page.tsx       # Chat screen
│   ├── login/page.tsx      # Login page
│   ├── signup/page.tsx     # Signup page
│   └── page.tsx            # Landing page
├── components/
│   ├── auth-form.tsx
│   ├── chat.tsx
│   ├── locale-switcher.tsx
│   └── site-header.tsx
└── lib/
    ├── characters.ts       # Mentor definitions and prompts
    ├── i18n.ts             # UI copy dictionaries
    ├── locale-context.tsx
    └── supabase/client.ts
```

## Public-safety notes

This repository is intended as a portfolio sample. It should not contain:

- Real API keys or Supabase credentials
- Private user data
- Proprietary business plans
- Customer conversations or internal documents

Use `.env.local` for local secrets. Only `.env.example` is intended to be committed.

## Roadmap ideas

- Add generated or licensed character images
- Add structured JLPT N5 lesson modules
- Add career readiness scoring
- Add a learner dashboard
- Add billing and subscription experiments
- Add admin analytics for anonymized engagement metrics
