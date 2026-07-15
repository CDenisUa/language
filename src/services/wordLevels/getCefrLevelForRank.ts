// Consts
import { CEFR_LEVEL_MAX_RANK } from '@/consts/cefrWordLevels'
// Types
import { CEFR_LEVELS } from '@/types/cefrLevel'
import type { CefrLevel } from '@/types/cefrLevel'

/** `undefined` when the word's rank falls outside the top 50k of the source corpus entirely. */
export function getCefrLevelForRank(rank: number): CefrLevel | undefined {
  return CEFR_LEVELS.find((level) => rank <= CEFR_LEVEL_MAX_RANK[level])
}
