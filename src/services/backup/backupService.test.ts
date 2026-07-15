// Core
import { createEmptyCard } from 'ts-fsrs'
import { beforeEach, describe, expect, it } from 'vitest'
// Services
import { createBackup, isValidBackupFile, restoreBackup } from '@/services/backup/backupService'
import { wordsRepository } from '@/services/db/wordsRepository'
import { scheduleEventsRepository } from '@/services/db/scheduleEventsRepository'
import { shadowingTracksRepository } from '@/services/db/shadowingTracksRepository'
import { shadowingSessionsRepository } from '@/services/db/shadowingSessionsRepository'
import { errorJournalRepository } from '@/services/db/errorJournalRepository'
import { vocabularyStudySessionsRepository } from '@/services/db/vocabularyStudySessionsRepository'

describe('backupService', () => {
  beforeEach(async () => {
    await Promise.all([
      wordsRepository.clear(),
      scheduleEventsRepository.clear(),
      shadowingTracksRepository.clear(),
      shadowingSessionsRepository.clear(),
      errorJournalRepository.clear(),
      vocabularyStudySessionsRepository.clear(),
    ])
  })

  describe('createBackup', () => {
    it('gathers all stores and excludes audio Blobs from shadowing tracks', async () => {
      await wordsRepository.save({ language: 'de', front: 'Haus', back: 'house', fsrs: createEmptyCard() })
      await shadowingTracksRepository.save({
        language: 'de',
        title: 'Interview',
        audioBlob: new Blob(['x'], { type: 'audio/mpeg' }),
        mimeType: 'audio/mpeg',
      })

      const backup = await createBackup()

      expect(backup.words).toHaveLength(1)
      expect(backup.shadowingTracks).toHaveLength(1)
      expect(backup.shadowingTracks[0]).not.toHaveProperty('audioBlob')
      expect(backup.shadowingTracks[0].title).toBe('Interview')
      expect(typeof backup.exportedAt).toBe('string')
      expect(typeof backup.schemaVersion).toBe('number')
    })
  })

  describe('isValidBackupFile', () => {
    it('accepts a well-formed backup shape', async () => {
      const backup = await createBackup()
      expect(isValidBackupFile(backup)).toBe(true)
    })

    it('rejects unrelated JSON', () => {
      expect(isValidBackupFile({ foo: 'bar' })).toBe(false)
      expect(isValidBackupFile(null)).toBe(false)
      expect(isValidBackupFile('a string')).toBe(false)
    })
  })

  describe('restoreBackup', () => {
    it('replaces existing data with the backup contents and revives FSRS dates', async () => {
      await wordsRepository.save({ language: 'de', front: 'stale', back: 'stale', fsrs: createEmptyCard() })

      const backup = await createBackup()
      const fsrsCard = createEmptyCard()
      backup.words = [
        {
          id: 'word-1',
          language: 'de',
          front: 'Kartoffel',
          back: 'potato',
          fsrs: fsrsCard,
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
      ]
      // Simulate what a real JSON round-trip does to embedded Date fields.
      const roundTripped = JSON.parse(JSON.stringify(backup))

      await restoreBackup(roundTripped)

      const words = await wordsRepository.getAll()
      expect(words).toHaveLength(1)
      expect(words[0].front).toBe('Kartoffel')
      expect(words[0].fsrs.due).toBeInstanceOf(Date)
      expect(words[0].fsrs.due.getTime()).toBe(fsrsCard.due.getTime())
    })

    it('does not touch the shadowingTracks store and reports how many were skipped', async () => {
      const existingTrack = await shadowingTracksRepository.save({
        language: 'de',
        title: 'Kept intact',
        audioBlob: new Blob(['x'], { type: 'audio/mpeg' }),
        mimeType: 'audio/mpeg',
      })

      const backup = await createBackup()
      backup.shadowingTracks = [
        {
          id: 'track-from-backup',
          language: 'de',
          title: 'From backup',
          mimeType: 'audio/mpeg',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        },
      ]

      const result = await restoreBackup(backup)

      expect(result.skippedShadowingTracksCount).toBe(1)
      const tracks = await shadowingTracksRepository.getAll()
      expect(tracks).toHaveLength(1)
      expect(tracks[0].id).toBe(existingTrack.id)
      expect(tracks[0].title).toBe('Kept intact')
    })
  })
})
