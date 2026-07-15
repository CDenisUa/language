// Core
import { Rating } from 'ts-fsrs'
import type { Grade } from 'ts-fsrs'

/** Maps an auto-checked exercise score onto an FSRS grade, since there is no self-rating step for Grammar. */
export function deriveGradeFromScore(correctCount: number, total: number): Grade {
  if (total === 0) return Rating.Again
  const ratio = correctCount / total
  if (ratio === 1) return Rating.Easy
  if (ratio >= 0.8) return Rating.Good
  if (ratio >= 0.4) return Rating.Hard
  return Rating.Again
}
