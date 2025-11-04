import { Container } from '@/components/container'

export default function Home() {
  return (
    <main className="my-12">
      <Container>
        <div className="flex flex-col items-center gap-2 max-w-3xl mx-auto text-center xl:gap-4">
          <h1 className="text-primary leading-tighter text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter max-w-4xl">
            Next.js AI Template
          </h1>
          <p className="mt-4 text-foreground text-balance sm:text-lg">
            Everything you need to build your next AI powered application. Built
            with Next.js, Vercel AI SDK, and shadcn/ui.
          </p>
        </div>
      </Container>
    </main>
  )
}
