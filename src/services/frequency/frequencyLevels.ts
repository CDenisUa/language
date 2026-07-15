// Consts
import { FREQUENCY_DATA_URLS, FREQUENCY_TIER_MAX_RANK } from '@/consts/frequency'
// Types
import type { Language } from '@/types/language'
import type { DifficultyTier } from '@/types/wordDifficulty'

const rankCache = new Map<Language, Promise<Map<string, number>>>()

async function fetchRanks(language: Language): Promise<Map<string, number>> {
  const response = await fetch(FREQUENCY_DATA_URLS[language])
  const words: string[] = await response.json()
  return new Map(words.map((word, index) => [word, index + 1]))
}

/** Word → frequency rank (1 = most common), memoized per language for the life of the tab. */
export function loadFrequencyRanks(language: Language): Promise<Map<string, number>> {
  if (!rankCache.has(language)) {
    rankCache.set(language, fetchRanks(language))
  }
  return rankCache.get(language)!
}

/** `rank` is `undefined` when the word isn't in the top 50k of the source corpus at all. */
export function getDifficultyTier(rank: number | undefined): DifficultyTier {
  if (rank === undefined) return 'unranked'
  if (rank <= FREQUENCY_TIER_MAX_RANK.common) return 'common'
  if (rank <= FREQUENCY_TIER_MAX_RANK.B2) return 'B2'
  if (rank <= FREQUENCY_TIER_MAX_RANK.C1) return 'C1'
  return 'C2'
}
