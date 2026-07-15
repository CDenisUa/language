// Core
import { beforeEach, describe, expect, it } from 'vitest'
// Services
import { shadowingSessionsRepository } from '@/services/db/shadowingSessionsRepository'

describe('shadowingSessionsRepository', () => {
  beforeEach(async () => {
    await shadowingSessionsRepository.clear()
  })

  it('saves a session with a generated id', async () => {
    const saved = await shadowingSessionsRepository.save({
      trackId: 'track-1',
      language: 'de',
      rating: 4,
      practiceDurationSeconds: 90,
    })

    expect(saved.id).toBeTruthy()
    expect(saved.rating).toBe(4)
    expect(saved.notes).toBeUndefined()
  })

  it('lists sessions by track', async () => {
    await shadowingSessionsRepository.save({
      trackId: 'track-1',
      language: 'de',
      rating: 3,
      practiceDurationSeconds: 60,
    })
    await shadowingSessionsRepository.save({
      trackId: 'track-2',
      language: 'en',
      rating: 5,
      practiceDurationSeconds: 120,
    })

    const trackOneSessions = await shadowingSessionsRepository.getByTrack('track-1')

    expect(trackOneSessions).toHaveLength(1)
    expect(trackOneSessions[0].trackId).toBe('track-1')
  })
})
