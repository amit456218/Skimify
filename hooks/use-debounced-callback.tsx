"use client"

import { useCallback, useEffect, useRef } from "react"

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const callbackRef = useRef<T>(callback)
  const lastCallTimeRef = useRef<number>(0)

  // Update the callback ref when the callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      const timeSinceLastCall = now - lastCallTimeRef.current

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // If we're very close to the end of the previous debounce period,
      // execute immediately to avoid perceived lag
      if (timeSinceLastCall >= delay - 10) {
        lastCallTimeRef.current = now
        callbackRef.current(...args)
      } else {
        // Otherwise set a new timeout
        timeoutRef.current = setTimeout(() => {
          lastCallTimeRef.current = Date.now()
          callbackRef.current(...args)
        }, delay)
      }
    },
    [delay],
  )
}
