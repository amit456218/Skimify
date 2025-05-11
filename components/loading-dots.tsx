import { cn } from "@/lib/utils"

interface LoadingDotsProps {
  className?: string
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <div className="animate-pulse flex space-x-2">
        <div
          className="h-2 w-2 bg-teal-400 dark:bg-teal-500 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="h-2 w-2 bg-teal-400 dark:bg-teal-500 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="h-2 w-2 bg-teal-400 dark:bg-teal-500 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  )
}
