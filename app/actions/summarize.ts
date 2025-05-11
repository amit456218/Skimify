"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Simple in-memory cache for server-side
const summaryCache = new Map<string, { summary: string; timestamp: number }>()
const CACHE_TTL = 1000 * 60 * 5 // 5 minutes

export async function summarizeText(text: string, maxLength = 280): Promise<string> {
  if (!text || text.trim().length === 0) {
    return ""
  }

  try {
    // Create a cache key based on the first 100 chars of text and max length
    const cacheKey = `${text.substring(0, 100)}_${maxLength}`

    // Check cache first
    const cached = summaryCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.summary
    }

    // Truncate input text if it's extremely long to avoid token limits
    const truncatedText = text.length > 8000 ? text.substring(0, 8000) + "..." : text

    const prompt = `
      Summarize the following text in a concise, informative way. 
      Focus on the key points and main ideas.
      Keep the summary under ${maxLength} characters.
      
      Text to summarize:
      ${truncatedText}
    `

    const { text: summary } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3, // Lower temperature for more focused summaries
      maxTokens: 150,
    })

    const result = summary.trim()

    // Cache the result
    summaryCache.set(cacheKey, {
      summary: result,
      timestamp: Date.now(),
    })

    return result
  } catch (error) {
    console.error("Error generating summary:", error)
    return "Failed to generate summary. Please try again."
  }
}
