import { Container } from '@/components/container'
import { Button } from '@/components/ui/button'
import { Code2, Layers, Zap } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    name: 'Free & Open Source',
    description:
      'Fully open source and free to use. No hidden costs or subscriptions. Fork it, customize it, and make it your own.',
    href: '#',
    icon: Code2,
  },
  {
    name: 'Latest Tech Stack',
    description:
      'Built with Next.js 16, Vercel AI SDK, and TypeScript. Get access to the latest features and best practices for modern AI applications.',
    href: '#',
    icon: Zap,
  },
  {
    name: 'Beautiful Components',
    description:
      'Pre-built UI components with shadcn/ui. Accessible, customizable, and styled with Tailwind CSS. Easy to customize and extend.',
    href: '#',
    icon: Layers,
  },
]

export default function Home() {
  return (
    <main className="mt-12 mb-24">
      <Container>
        <div className="flex flex-col gap-2 xl:gap-4">
          <h1 className="text-primary leading-tighter text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl">
            AI SDK Template
          </h1>
          <p className="max-w-3xl text-foreground text-balance sm:text-lg">
            Everything you need to build your next AI powered application. Built
            with Next.js, Vercel AI SDK, and shadcn/ui.
          </p>
          <div className="mt-6 flex gap-4">
            <Button asChild>
              <Link href="/chat">See Examples</Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href="https://github.com/ChangoMan/ai-sdk-template"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base/7 font-semibold">
                  <feature.icon
                    aria-hidden="true"
                    className="size-5 flex-none"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base/7">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">
            Getting Started
          </h2>
          <div className="mt-6 space-y-8">
            <div>
              <p className="mb-2">1. Clone the repository</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
                  git clone https://github.com/ChangoMan/ai-sdk-template
                  {'\n'}cd ai-sdk-template
                </code>
              </pre>
            </div>

            <div>
              <p className="mb-2">2. Install dependencies</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">npm install</code>
              </pre>
            </div>

            <div>
              <p className="mb-2">3. Set up environment variables</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">cp .env.example .env.local</code>
              </pre>
              <p className="mt-4">
                Then open{' '}
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  .env.local
                </code>{' '}
                and fill in your API keys:
              </p>
              <ul className="mt-4 text-sm list-disc list-inside space-y-3">
                <li>
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    GOOGLE_GENERATIVE_AI_API_KEY
                  </code>{' '}
                  - Get from{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    Google Gemini
                  </a>
                </li>
                <li>
                  <code className="bg-muted px-1.5 py-0.5 rounded">
                    OPENAI_API_KEY
                  </code>{' '}
                  - (Optional) Get from{' '}
                  <a
                    href="https://platform.openai.com/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4"
                  >
                    OpenAI
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                By default, this template will use the{' '}
                <a
                  href="https://ai-sdk.dev/providers/ai-sdk-providers/google-generative-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4"
                >
                  Google Generative AI Provider
                </a>{' '}
                since it has a generous free tier. However, if you want to try
                out the{' '}
                <Link href="/image" className="underline underline-offset-4">
                  image generation
                </Link>
                , you may need to add a billing plan.
              </p>
            </div>

            <div>
              <p className="mb-2">4. Run the development server</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">npm run dev</code>
              </pre>
              <p className="mt-4">
                Open{' '}
                <a
                  href="http://localhost:3000"
                  className="underline underline-offset-4"
                >
                  http://localhost:3000
                </a>{' '}
                in your browser to see the result.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  )
}
