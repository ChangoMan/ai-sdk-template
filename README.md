# AI SDK Template

Everything you need to build your next AI powered application. Built with:

- Vercel AI SDK
- Next.js 16
- Tailwind CSS
- shadcn/ui

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ChangoMan/ai-sdk-template
cd ai-sdk-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in your API keys:

- `GOOGLE_GENERATIVE_AI_API_KEY` - Get from [Google Gemini](https://aistudio.google.com/app/apikey)
- `OPENAI_API_KEY` - (Optional) Get from [OpenAI](https://platform.openai.com/api-keys)

By default, this template will use the [Google Generative AI Provider](https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai) since it has a generous free tier. However, if you want to try out the image generation feature, you may need to add a billing plan.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about the Vercel AI SDK, check out the following resources:

- [AI SDK Documentation](https://ai-sdk.dev) - learn about AI SDK features and API.
- [AI SDK Providers](https://ai-sdk.dev/providers/ai-sdk-providers) - explore different AI provider integrations.
- [AI SDK Examples](https://ai-sdk.dev/examples) - see practical examples and use cases.

You can check out [the AI SDK GitHub repository](https://github.com/vercel/ai) - your feedback and contributions are welcome!
