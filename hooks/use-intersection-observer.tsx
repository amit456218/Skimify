"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type IntersectionObserverOptions = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  onIntersect: (entries: IntersectionObserverEntry[]) => void
}

export function useIntersectionObserver({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  onIntersect,
}: IntersectionObserverOptions) {
  const [observedElements, setObservedElements] = useState<Set<Element>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)
  const onIntersectRef = useRef(onIntersect)

  // Update the callback ref when the callback changes
  useEffect(() => {
    onIntersectRef.current = onIntersect
  }, [onIntersect])

  // Create the observer instance with a stable callback
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create new observer with a wrapper that calls the latest callback
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries.length > 0) {
          onIntersectRef.current(entries)
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    )

    // Observe all elements
    observedElements.forEach((element) => {
      observerRef.current?.observe(element)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [root, rootMargin, threshold, observedElements])

  // Function to observe a new element - optimized to use Set for O(1) lookups
  const observe = useCallback((element: Element) => {
    setObservedElements((prev) => {
      // Don't add if already observed
      if (prev.has(element)) {
        return prev
      }

      // Create a new Set to trigger a state update
      const newSet = new Set(prev)
      newSet.add(element)

      // Observe the element immediately if observer exists
      if (observerRef.current) {
        observerRef.current.observe(element)
      }

      return newSet
    })
  }, [])

  // Function to unobserve an element
  const unobserve = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element)
    }

    setObservedElements((prev) => {
      if (!prev.has(element)) {
        return prev
      }

      const newSet = new Set(prev)
      newSet.delete(element)
      return newSet
    })
  }, [])

  return {
    observedElements: Array.from(observedElements),
    observe,
    unobserve,
  }
}
