// Core
import { beforeEach, describe, expect, it } from 'vitest'
// Services
import { vocabularyStudySessionsRepository } from '@/services/db/vocabularyStudySessionsRepository'

describe('vocabularyStudySessionsRepository', () => {
  beforeEach(async () => {
    await vocabularyStudySessionsRepository.clear()
  })

  it('saves a session with a generated id', async () => {
    const saved = await vocabularyStudySessionsRepository.save({
      language: 'de',
      durationSeconds: 120,
    })

    expect(saved.id).toBeTruthy()
    expect(saved.durationSeconds).toBe(120)
  })

  it('filters sessions by language', async () => {
    await vocabularyStudySessionsRepository.save({ language: 'de', durationSeconds: 60 })
    await vocabularyStudySessionsRepository.save({ language: 'en', durationSeconds: 90 })

    const germanSessions = await vocabularyStudySessionsRepository.getByLanguage('de')

    expect(germanSessions).toHaveLength(1)
    expect(germanSessions[0].durationSeconds).toBe(60)
  })
})
