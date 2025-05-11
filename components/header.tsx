import Link from "next/link"
import { Github } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
              S
            </span>
            <span className="font-bold text-xl">Skimify</span>
          </Link>
          <span className="rounded-full px-2 py-0.5 text-xs bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300">
            Beta
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
