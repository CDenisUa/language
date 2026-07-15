// Types
import type { Language } from '@/types/language'

/** Static frequency-rank data — see DECISIONS.md for source/licensing (CC BY-SA 4.0, credit required). */
export const FREQUENCY_DATA_URLS: Record<Language, string> = {
  de: '/data/frequency-de.json',
  en: '/data/frequency-en.json',
}

/**
 * Rank cutoffs used to bucket a word's frequency rank into a rough CEFR-like tier. Rank 1 is the
 * most common word in the source corpus (see DECISIONS.md for why these are approximate, not a
 * real CEFR wordlist). Only B2 and rarer get visually flagged in the UI — A1–B1-equivalent words
 * render as plain text so only genuinely advanced vocabulary stands out.
 */
export const FREQUENCY_TIER_MAX_RANK = {
  common: 3000,
  B2: 6000,
  C1: 15000,
  C2: 50000,
} as const
