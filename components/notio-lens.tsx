"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"
import { X, Minimize2, Maximize2 } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useDebouncedCallback } from "@/hooks/use-debounced-callback"
import { cn } from "@/lib/utils"
import { summarizeText } from "@/app/actions/summarize"
import { NotioLensConfig } from "./notio-lens-config"
import { LoadingDots } from "./loading-dots"

type NotioLensProps = {
  selector?: string
  debounceMs?: number
  maxSummaryLength?: number
  className?: string
}

// Cache for storing summaries to avoid redundant API calls
const summaryCache = new Map<string, string>()

export function NotioLens({
  selector = "p, h1, h2, h3, h4, h5, h6, li",
  debounceMs: initialDebounceMs = 300,
  maxSummaryLength: initialMaxSummaryLength = 280,
  className,
}: NotioLensProps) {
  const [visibleElements, setVisibleElements] = useState<Element[]>([])
  const [summary, setSummary] = useState<string>("")
  const [isMinimized, setIsMinimized] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [debounceMs, setDebounceMs] = useState(initialDebounceMs)
  const [maxSummaryLength, setMaxSummaryLength] = useState(initialMaxSummaryLength)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const previousTextRef = useRef<string>("")
  const lastSummaryTimestampRef = useRef<number>(0)

  // Throttle the intersection observer updates
  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      // Only process entries that have changed visibility state
      const changedEntries = entries.filter((entry) => {
        const element = entry.target
        const wasVisible = visibleElements.includes(element)
        const isVisible = entry.isIntersecting
        return wasVisible !== isVisible
      })

      if (changedEntries.length === 0) return

      setVisibleElements((prev) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        const visibleElements = visibleEntries.map((entry) => entry.target)

        // Efficiently update the visible elements array
        const newElements = new Set([...prev])

        // Add newly visible elements
        visibleElements.forEach((element) => {
          if (!newElements.has(element)) {
            newElements.add(element)
          }
        })

        // Remove elements that are no longer visible
        entries.forEach((entry) => {
          if (!entry.isIntersecting && newElements.has(entry.target)) {
            newElements.delete(entry.target)
          }
        })

        return Array.from(newElements)
      })
    },
    [visibleElements],
  )

  const { observe } = useIntersectionObserver({
    onIntersect,
    threshold: 0.5,
    rootMargin: "0px 0px 0px 0px",
  })

  // Memoize the text extraction to avoid redundant processing
  const extractVisibleText = useCallback((elements: Element[]): string => {
    return elements
      .map((element) => element.textContent)
      .filter(Boolean)
      .join(" ")
      .trim()
  }, [])

  // Generate summary when visible elements change
  const generateSummary = useDebouncedCallback(async () => {
    if (visibleElements.length === 0) return

    // Extract text from visible elements
    const visibleText = extractVisibleText(visibleElements)

    if (!visibleText) {
      setSummary("")
      return
    }

    // Check if the text has changed significantly to warrant a new summary
    const textSimilarity = calculateSimilarity(previousTextRef.current, visibleText)
    const timeElapsed = Date.now() - lastSummaryTimestampRef.current

    // Only generate a new summary if the text has changed significantly or enough time has passed
    if (textSimilarity < 0.8 || timeElapsed > 10000) {
      // Check cache first
      const cacheKey = `${visibleText.substring(0, 100)}_${maxSummaryLength}`
      if (summaryCache.has(cacheKey)) {
        setSummary(summaryCache.get(cacheKey) || "")
        return
      }

      setIsGenerating(true)

      try {
        // Use OpenAI to generate the summary
        const generatedSummary = await summarizeText(visibleText, maxSummaryLength)
        setSummary(generatedSummary)

        // Cache the result
        summaryCache.set(cacheKey, generatedSummary)

        // Update references
        previousTextRef.current = visibleText
        lastSummaryTimestampRef.current = Date.now()
      } catch (error) {
        console.error("Error generating summary:", error)
        setSummary("Failed to generate summary. Please try again.")
      } finally {
        setIsGenerating(false)
      }
    }
  }, debounceMs)

  // Observe elements matching the selector when component mounts
  useEffect(() => {
    if (typeof document === "undefined") return

    // Use requestIdleCallback for non-critical initialization
    const idleCallback = window.requestIdleCallback || ((cb) => setTimeout(cb, 1))

    const idleId = idleCallback(() => {
      const elements = document.querySelectorAll(selector)
      elements.forEach((element) => observe(element))
    })

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId)
      } else {
        clearTimeout(idleId)
      }
      setVisibleElements([])
    }
  }, [selector, observe])

  // Generate summary when visible elements change
  useEffect(() => {
    if (visibleElements.length > 0) {
      generateSummary()
    }
  }, [visibleElements, generateSummary])

  // Make overlay draggable - optimized version
  useEffect(() => {
    if (!overlayRef.current) return

    let isDragging = false
    let offsetX = 0
    let offsetY = 0
    let rafId: number | null = null

    const onMouseDown = (e: MouseEvent) => {
      if (e.target instanceof Element && e.target.closest(".skimify-header")) {
        isDragging = true
        offsetX = e.clientX - overlayRef.current!.getBoundingClientRect().left
        offsetY = e.clientY - overlayRef.current!.getBoundingClientRect().top
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      // Use requestAnimationFrame for smooth dragging
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        if (!overlayRef.current || !isDragging) return

        const x = e.clientX - offsetX
        const y = e.clientY - offsetY

        overlayRef.current.style.left = `${Math.max(0, Math.min(window.innerWidth - overlayRef.current.offsetWidth, x))}px`
        overlayRef.current.style.top = `${Math.max(0, Math.min(window.innerHeight - overlayRef.current.offsetHeight, y))}px`

        rafId = null
      })
    }

    const onMouseUp = () => {
      isDragging = false
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }

    document.addEventListener("mousedown", onMouseDown, { passive: true })
    document.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mouseup", onMouseUp, { passive: true })

    return () => {
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  // Memoize the component rendering to avoid unnecessary re-renders
  const renderContent = useMemo(() => {
    if (!summary && !isGenerating) return null

    return (
      <div
        ref={overlayRef}
        className={cn(
          "skimify fixed top-4 right-4 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-teal-200 dark:border-teal-800 z-50 transition-all duration-200 ease-in-out",
          isMinimized && "w-auto h-auto",
          className,
        )}
        style={{ willChange: "transform" }} // Optimize for animations
      >
        <div className="skimify-header flex items-center justify-between p-3 border-b border-teal-100 dark:border-teal-800 cursor-move bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-t-lg">
          <div className="flex items-center gap-2">
            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              S
            </span>
            <h3 className="text-sm font-medium">Skimify Summary</h3>
          </div>
          <div className="flex items-center space-x-1">
            <NotioLensConfig
              debounceMs={debounceMs}
              setDebounceMs={setDebounceMs}
              maxSummaryLength={maxSummaryLength}
              setMaxSummaryLength={setMaxSummaryLength}
            />
            {isMinimized ? (
              <button
                onClick={() => setIsMinimized(false)}
                className="p-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-800/50"
                aria-label="Maximize"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-800/50"
                aria-label="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => {
                setSummary("")
                setVisibleElements([])
              }}
              className="p-1 rounded-md hover:bg-teal-100 dark:hover:bg-teal-800/50"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div ref={contentRef} className="p-3 max-h-60 overflow-y-auto">
            {isGenerating ? (
              <div className="flex items-center justify-center py-4">
                <LoadingDots />
              </div>
            ) : (
              <p className="text-sm text-gray-700 dark:text-gray-300">{summary}</p>
            )}
          </div>
        )}
      </div>
    )
  }, [summary, isGenerating, isMinimized, debounceMs, maxSummaryLength, className])

  return renderContent
}

// Helper function to calculate text similarity (simple implementation)
function calculateSimilarity(text1: string, text2: string): number {
  if (!text1 || !text2) return 0

  // Simple word overlap calculation
  const words1 = new Set(text1.toLowerCase().split(/\s+/).filter(Boolean))
  const words2 = new Set(text2.toLowerCase().split(/\s+/).filter(Boolean))

  let commonWords = 0
  words2.forEach((word) => {
    if (words1.has(word)) commonWords++
  })

  return commonWords / Math.max(words1.size, words2.size)
}

// Add requestIdleCallback polyfill for browsers that don't support it
if (typeof window !== "undefined" && !window.requestIdleCallback) {
  window.requestIdleCallback = (callback) => {
    const start = Date.now()
    return setTimeout(() => {
      callback({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
      })
    }, 1)
  }

  window.cancelIdleCallback = (id) => {
    clearTimeout(id)
  }
}
