import { Chat } from '@/components/chat'
import { ModeToggle } from '@/components/mode-toggle'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="relative flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="absolute top-8 right-8">
          <ModeToggle />
        </div>
        <Chat />
      </main>
    </div>
  )
}
