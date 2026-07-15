// Services
import { wordsRepository } from '@/services/db/wordsRepository'
import { scheduleEventsRepository } from '@/services/db/scheduleEventsRepository'
import { shadowingTracksRepository } from '@/services/db/shadowingTracksRepository'
import { shadowingSessionsRepository } from '@/services/db/shadowingSessionsRepository'
import { errorJournalRepository } from '@/services/db/errorJournalRepository'
import { vocabularyStudySessionsRepository } from '@/services/db/vocabularyStudySessionsRepository'
// Types
import type { BackupFile } from '@/types/backup'
import type { WordRecord } from '@/types/word'
// Consts
import { DB_VERSION } from '@/services/db/schema'

export interface ImportResult {
  skippedShadowingTracksCount: number
}

export async function createBackup(): Promise<BackupFile> {
  const [words, scheduleEvents, shadowingTracks, shadowingSessions, errorJournalEntries, vocabularyStudySessions] =
    await Promise.all([
      wordsRepository.getAll(),
      scheduleEventsRepository.getAll(),
      shadowingTracksRepository.getAll(),
      shadowingSessionsRepository.getAll(),
      errorJournalRepository.getAll(),
      vocabularyStudySessionsRepository.getAll(),
    ])

  return {
    schemaVersion: DB_VERSION,
    exportedAt: new Date().toISOString(),
    words,
    scheduleEvents,
    // Audio Blobs aren't included in the backup — see DECISIONS.md.
    shadowingTracks: shadowingTracks.map(({ audioBlob: _audioBlob, ...meta }) => meta),
    shadowingSessions,
    errorJournalEntries,
    vocabularyStudySessions,
  }
}

export function downloadBackup(backup: BackupFile): void {
  const json = JSON.stringify(backup, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `sprachlabor-backup-${backup.exportedAt.slice(0, 10)}.json`
  link.click()
  URL.revokeObjectURL(url)
}

export function isValidBackupFile(data: unknown): data is BackupFile {
  if (typeof data !== 'object' || data === null) return false
  const candidate = data as Record<string, unknown>
  return (
    typeof candidate.schemaVersion === 'number' &&
    typeof candidate.exportedAt === 'string' &&
    Array.isArray(candidate.words) &&
    Array.isArray(candidate.scheduleEvents) &&
    Array.isArray(candidate.shadowingTracks) &&
    Array.isArray(candidate.shadowingSessions) &&
    Array.isArray(candidate.errorJournalEntries) &&
    Array.isArray(candidate.vocabularyStudySessions)
  )
}

/** JSON round-tripping turns `fsrs.due`/`fsrs.last_review` into strings — restore them to real Dates. */
function reviveWordDates(word: WordRecord): WordRecord {
  return {
    ...word,
    fsrs: {
      ...word.fsrs,
      due: new Date(word.fsrs.due),
      last_review: word.fsrs.last_review ? new Date(word.fsrs.last_review) : undefined,
    },
  }
}

/**
 * Replaces all backed-up data with the contents of `backup`. `shadowingTracks` is deliberately
 * left untouched (neither cleared nor restored) since the backup has no audio to restore it
 * with — see DECISIONS.md.
 */
export async function restoreBackup(backup: BackupFile): Promise<ImportResult> {
  await Promise.all([
    wordsRepository.clear(),
    scheduleEventsRepository.clear(),
    shadowingSessionsRepository.clear(),
    errorJournalRepository.clear(),
    vocabularyStudySessionsRepository.clear(),
  ])

  await Promise.all([
    ...backup.words.map((word) => wordsRepository.put(reviveWordDates(word))),
    ...backup.scheduleEvents.map((event) => scheduleEventsRepository.put(event)),
    ...backup.shadowingSessions.map((session) => shadowingSessionsRepository.put(session)),
    ...backup.errorJournalEntries.map((entry) => errorJournalRepository.put(entry)),
    ...backup.vocabularyStudySessions.map((session) => vocabularyStudySessionsRepository.put(session)),
  ])

  return { skippedShadowingTracksCount: backup.shadowingTracks.length }
}
