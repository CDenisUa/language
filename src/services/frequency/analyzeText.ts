// Services
import { getDifficultyTier, loadFrequencyRanks } from '@/services/frequency/frequencyLevels'
import { tokenize } from '@/services/frequency/tokenize'
// Types
import type { TextSegment } from '@/services/frequency/tokenize'
import type { Language } from '@/types/language'
import type { DifficultyTier } from '@/types/wordDifficulty'

export interface AnalyzedSegment extends TextSegment {
  tier?: DifficultyTier
}

export async function analyzeText(text: string, language: Language): Promise<AnalyzedSegment[]> {
  const ranks = await loadFrequencyRanks(language)

  return tokenize(text).map((segment) => {
    if (segment.type !== 'word') return segment
    return { ...segment, tier: getDifficultyTier(ranks.get(segment.text.toLowerCase())) }
  })
}
