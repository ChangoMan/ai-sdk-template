import { Chat } from '@/components/chat'

export default function ChatPage() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="relative flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <Chat />
      </main>
    </div>
  )
}
