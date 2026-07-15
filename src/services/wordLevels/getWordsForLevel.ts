// Services
import { loadFrequencyRanks } from '@/services/frequency/frequencyLevels'
import { getCefrLevelForRank } from '@/services/wordLevels/getCefrLevelForRank'
import { isDisplayableWord } from '@/services/wordLevels/isDisplayableWord'
// Types
import type { Language } from '@/types/language'
import type { CefrLevel } from '@/types/cefrLevel'

function shuffle<T>(items: T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/** Draws up to `count` random, not-yet-excluded words at the given CEFR level. */
export async function getWordsForLevel(
  language: Language,
  level: CefrLevel,
  excludeWords: Set<string>,
  count: number,
): Promise<string[]> {
  const ranks = await loadFrequencyRanks(language)
  const candidates: string[] = []

  for (const [word, rank] of ranks) {
    if (getCefrLevelForRank(rank) !== level) continue
    if (!isDisplayableWord(word)) continue
    if (excludeWords.has(word.toLowerCase())) continue
    candidates.push(word)
  }

  return shuffle(candidates).slice(0, count)
}
