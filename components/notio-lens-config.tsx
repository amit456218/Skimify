"use client"

import { useState } from "react"
import { Settings } from "lucide-react"
import { cn } from "@/lib/utils"

type NotioLensConfigProps = {
  debounceMs: number
  setDebounceMs: (value: number) => void
  maxSummaryLength: number
  setMaxSummaryLength: (value: number) => void
  className?: string
}

export function NotioLensConfig({
  debounceMs,
  setDebounceMs,
  maxSummaryLength,
  setMaxSummaryLength,
  className,
}: NotioLensConfigProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-800/50"
        aria-label="Settings"
      >
        <Settings className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-teal-200 dark:border-teal-800 p-3 z-50">
          <h4 className="text-sm font-medium mb-2">Settings</h4>

          <div className="space-y-3">
            <div>
              <label htmlFor="debounce" className="block text-xs mb-1">
                Debounce delay (ms): {debounceMs}
              </label>
              <input
                id="debounce"
                type="range"
                min="100"
                max="2000"
                step="100"
                value={debounceMs}
                onChange={(e) => setDebounceMs(Number.parseInt(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            <div>
              <label htmlFor="length" className="block text-xs mb-1">
                Max summary length: {maxSummaryLength}
              </label>
              <input
                id="length"
                type="range"
                min="100"
                max="500"
                step="20"
                value={maxSummaryLength}
                onChange={(e) => setMaxSummaryLength(Number.parseInt(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
