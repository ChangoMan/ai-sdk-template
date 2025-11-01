import { ModeToggle } from '@/components/mode-toggle'

export function Header() {
  return (
    <header className="px-4 py-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
