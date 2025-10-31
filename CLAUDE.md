# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 app using Vercel AI SDK for building AI chat interfaces. Supports multiple AI providers (OpenAI, Google) with streaming responses.

## Development Commands

```bash
npm run dev    # Start dev server on localhost:3000
npm run build  # Production build
npm run lint   # Run ESLint
npm start      # Start production server
```

## Architecture

**API Route Pattern**: Chat endpoint at `app/api/chat/route.ts` uses AI SDK's `streamText()` with `convertToModelMessages()` for message format conversion. Returns `toUIMessageStreamResponse()` for streaming.

**Client Component**: `components/chat.tsx` uses `useChat()` hook from `@ai-sdk/react`. Messages have `.parts` array with type-based rendering (currently only 'text' type handled).

**AI Provider**: Currently configured with OpenAI GPT-4o in the route handler. Provider can be swapped via `@ai-sdk/{provider}` imports (google, openai, etc).

**Path Aliases**: Uses `@/*` for root-level imports (configured in tsconfig.json).

## Environment

Requires `.env.local` with API keys for AI providers (e.g., `OPENAI_API_KEY`).
