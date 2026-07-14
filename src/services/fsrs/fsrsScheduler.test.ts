// Core
import { describe, expect, it } from 'vitest'
// Services
import { Rating, createNewCard, isDue, scheduleReview } from '@/services/fsrs/fsrsScheduler'

describe('fsrsScheduler', () => {
  it('creates a new card that is immediately due', () => {
    const card = createNewCard()

    expect(isDue(card)).toBe(true)
    expect(card.reps).toBe(0)
  })

  it('schedules a future review and increments reps after a rating', () => {
    const now = new Date()
    const card = createNewCard(now)

    const reviewed = scheduleReview(card, Rating.Good, now)

    expect(reviewed.reps).toBe(1)
    expect(reviewed.due.getTime()).toBeGreaterThan(now.getTime())
    expect(isDue(reviewed, now)).toBe(false)
  })

  it('schedules Again for a sooner review than Easy', () => {
    const now = new Date()
    const card = createNewCard(now)

    const again = scheduleReview(card, Rating.Again, now)
    const easy = scheduleReview(card, Rating.Easy, now)

    expect(again.due.getTime()).toBeLessThanOrEqual(easy.due.getTime())
  })
})
