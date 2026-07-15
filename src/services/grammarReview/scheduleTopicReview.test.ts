// Core
import { beforeEach, describe, expect, it } from 'vitest'
// Services
import { scheduleTopicReview } from '@/services/grammarReview/scheduleTopicReview'
import { grammarTopicReviewsRepository } from '@/services/db/grammarTopicReviewsRepository'
import { isDue } from '@/services/fsrs/fsrsScheduler'

describe('scheduleTopicReview', () => {
  beforeEach(async () => {
    await grammarTopicReviewsRepository.clear()
  })

  it('creates a new FSRS card on first completion and schedules it into the future for a perfect score', async () => {
    const now = new Date('2026-07-15T12:00:00.000Z')
    await scheduleTopicReview('present-simple', 5, 5, now)

    const review = await grammarTopicReviewsRepository.getById('present-simple')
    expect(review).toBeDefined()
    expect(isDue(review!.fsrs, now)).toBe(false)
  })

  it('schedules an immediate-ish re-review for a poor score', async () => {
    const now = new Date('2026-07-15T12:00:00.000Z')
    await scheduleTopicReview('present-simple', 0, 5, now)

    const review = await grammarTopicReviewsRepository.getById('present-simple')
    expect(review).toBeDefined()
    expect(review!.fsrs.due.getTime()).toBeLessThanOrEqual(now.getTime() + 24 * 60 * 60 * 1000)
  })

  it('updates the existing card in place rather than creating a duplicate', async () => {
    const first = new Date('2026-07-15T12:00:00.000Z')
    await scheduleTopicReview('present-simple', 5, 5, first)

    const second = new Date('2026-07-20T12:00:00.000Z')
    await scheduleTopicReview('present-simple', 5, 5, second)

    const all = await grammarTopicReviewsRepository.getAll()
    expect(all).toHaveLength(1)
    expect(all[0].topicId).toBe('present-simple')
  })
})
