// Core
import { Rating } from 'ts-fsrs'
import { describe, expect, it } from 'vitest'
// Services
import { deriveGradeFromScore } from '@/services/grammarReview/deriveGradeFromScore'

describe('deriveGradeFromScore', () => {
  it('returns Easy for a perfect score', () => {
    expect(deriveGradeFromScore(5, 5)).toBe(Rating.Easy)
  })

  it('returns Good for a high but imperfect score', () => {
    expect(deriveGradeFromScore(4, 5)).toBe(Rating.Good)
  })

  it('returns Hard for a middling score', () => {
    expect(deriveGradeFromScore(2, 5)).toBe(Rating.Hard)
  })

  it('returns Again for a low score', () => {
    expect(deriveGradeFromScore(1, 5)).toBe(Rating.Again)
  })

  it('returns Again when there are no exercises', () => {
    expect(deriveGradeFromScore(0, 0)).toBe(Rating.Again)
  })
})
