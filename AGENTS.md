# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

Next.js 16 application featuring AI-powered chat and image generation capabilities using Vercel AI SDK. Built with React 19, TypeScript, and shadcn/ui components with Tailwind CSS v4. Supports multiple AI providers (Google Gemini, OpenAI) with streaming responses.

## Development Commands

```bash
npm run dev    # Start dev server on localhost:3000
npm run build  # Production build
npm run lint   # Run ESLint
npm start      # Start production server
```

## Project Structure

```
ai-sdk-template/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # Chat streaming endpoint
│   │   └── image/route.ts       # Image generation endpoint
│   ├── chat/page.tsx            # Chat interface page
│   ├── image/page.tsx           # Image generation page
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout with theme provider
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── label.tsx
│   │   └── dropzone.tsx
│   ├── chat.tsx                 # Main chat component with useChat hook
│   ├── image-generator.tsx      # Image generation/editing component
│   ├── response.tsx             # Markdown response renderer (Streamdown)
│   ├── header.tsx               # Navigation header
│   ├── container.tsx            # Layout container
│   ├── mode-toggle.tsx          # Dark/light mode toggle
│   └── theme-provider.tsx       # next-themes provider
├── lib/
│   └── utils.ts                 # Utility functions (cn for class merging)
├── public/                      # Static assets
└── ai-chatbot-example/          # Example/reference code
```

## Core Technologies

**Framework**: Next.js 16 with React 19 and TypeScript 5
**AI SDK**: Vercel AI SDK v5 (`ai`, `@ai-sdk/react`, `@ai-sdk/google`, `@ai-sdk/openai`)
**UI Components**: shadcn/ui with Radix UI primitives
**Styling**: Tailwind CSS v4 with `@tailwindcss/typography`
**Theme**: next-themes with system preference support
**Animation**: Framer Motion
**Icons**: Lucide React
**Markdown**: Streamdown for streaming markdown rendering
**Validation**: Zod v4
**File Upload**: react-dropzone

## Architecture

### Chat Feature

**API Route** (`app/api/chat/route.ts`):
- Uses Google Gemini 2.5 Flash Lite model
- `streamText()` for streaming responses
- `convertToModelMessages()` for message format conversion
- `toUIMessageStreamResponse()` for client-compatible streaming
- 30 second timeout configured

**Client Component** (`components/chat.tsx`):
- Uses `useChat()` hook from `@ai-sdk/react`
- Messages have `.parts` array with type-based rendering (currently only 'text' type)
- Auto-scroll to bottom with manual scroll detection
- Animated greeting and thinking states
- Textarea auto-resize with Enter to submit (Shift+Enter for newline)
- IME composition support for international input
- Markdown rendering via `Response` component

### Image Generation Feature

**API Route** (`app/api/image/route.ts`):
- Uses Google Gemini 2.5 Flash Image Preview model
- Two modes:
  - **Text-to-Image**: Generate from text prompt
  - **Image Editing**: Edit uploaded image with prompt
- Returns base64 encoded images from `result.files`
- Error handling with console logging and user-friendly messages
- 30 second timeout configured

**Client Component** (`components/image-generator.tsx`):
- File upload via dropzone with image preview
- Optional image input for editing mode
- Loading states during generation
- Display generated image with text response
- Reset form for multiple generations

### Response Rendering

**Response Component** (`components/response.tsx`):
- Uses Streamdown library for streaming markdown
- Prose styling with Tailwind Typography
- Dark mode support
- Code block formatting with word wrap

### UI Components

**shadcn/ui Configuration**:
- Style: "new-york"
- CSS Variables for theming
- Lucide icons
- Add components via: `npx shadcn@latest add [component-name]`

**Theme System**:
- next-themes with `system`, `light`, `dark` modes
- ThemeProvider in root layout
- ModeToggle component in header

**Navigation**:
- Header with navigation menu (Home, Chat, Image)
- Mode toggle for theme switching

**Typography**:
- Geist Sans and Geist Mono fonts from `next/font/google`
- Custom CSS variables for font families

## Path Aliases

Uses `@/*` for root-level imports (configured in tsconfig.json):
```typescript
import { Chat } from '@/components/chat'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
```

## Environment Configuration

Requires `.env.local` with:
```bash
OPENAI_API_KEY=                      # OpenAI API key (if using OpenAI provider)
GOOGLE_GENERATIVE_AI_API_KEY=       # Google AI API key (required for current setup)
```

Reference `.env.example` for template.

## AI Provider Configuration

**Current Setup**: Google Gemini models
- Chat: `gemini-2.5-flash-lite`
- Image: `gemini-2.5-flash-image-preview`

**Switching Providers**:
To use OpenAI instead:
```typescript
// In app/api/chat/route.ts
import { openai } from '@ai-sdk/openai'
// Change model to:
model: openai('gpt-4o')
```

All AI SDK providers follow the same pattern:
- Import: `import { provider } from '@ai-sdk/{provider}'`
- Usage: `model: provider('model-name')`

## Styling Conventions

- Tailwind CSS utility classes
- CSS variables for theme colors (defined in globals.css)
- Dark mode via `dark:` prefix
- Responsive design with `sm:`, `md:`, `lg:`, `xl:` breakpoints
- Component variants via `class-variance-authority`
- Class merging via `cn()` utility (uses clsx + tailwind-merge)

## TypeScript Configuration

- Strict mode enabled
- Path aliases: `@/*` → `./*`
- React JSX transform
- ES2017 target with ESNext module
- Next.js plugin integration

## Code Conventions

**Component Structure**:
- Client components: `'use client'` directive at top
- Server components by default (no directive)
- Use `memo()` for performance-critical components (see Response)
- Display names for better debugging

**Form Handling**:
- Controlled inputs with React state
- `e.preventDefault()` for form submissions
- Disabled states during loading
- Clear error handling with user feedback

**Async Operations**:
- `fetch()` for API calls
- Try-catch blocks with error logging
- Loading states with UI feedback
- Response validation

**Animation**:
- Framer Motion for transitions
- AnimatePresence for exit animations
- Smooth scroll behavior

## Key Patterns

**Message Streaming**:
```typescript
const { messages, sendMessage, status } = useChat()
```

**Image Generation**:
```typescript
const result = await generateText({
  model: google('gemini-2.5-flash-image-preview'),
  prompt: 'your prompt'
})
const imageUrl = `data:${file.mediaType};base64,${file.base64}`
```

**Markdown Rendering**:
```typescript
<Response>{markdownText}</Response>
```

**Theme Toggle**:
```typescript
<ThemeProvider attribute="class" defaultTheme="system">
```

## Testing & Verification

Before completing tasks:
1. Run `npm run lint` to check for ESLint errors
2. Run `npm run build` to verify production build
3. Test features in browser at `http://localhost:3000`
4. Verify both light and dark themes
5. Test responsive behavior at different breakpoints

## Important Notes

- All API routes have `export const maxDuration = 30` for streaming
- Chat component handles IME composition for international input
- Image generation supports both text-to-image and image editing
- Response component is memoized for performance
- Auto-scroll only triggers during message submission, respects manual scrolling
- Textarea in chat auto-resets height after submission
- Image uploads limited to 1 file via dropzone
- Base64 encoding for image uploads and responses
- Error messages are user-friendly (full details in console)
- All components use absolute imports via `@/*` path alias

## Git Workflow

Current branch: `main` (default branch)
Modified files: `components/image-generator.tsx`

Always commit with descriptive messages and include co-authorship for factory-droid contributions.
