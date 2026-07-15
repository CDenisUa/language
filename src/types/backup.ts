// Types
import type { WordRecord } from '@/types/word'
import type { ScheduleEventRecord } from '@/types/scheduleEvent'
import type { ShadowingTrackRecord } from '@/types/shadowingTrack'
import type { ShadowingSessionRecord } from '@/types/shadowingSession'
import type { ErrorJournalEntryRecord } from '@/types/errorJournalEntry'
import type { VocabularyStudySessionRecord } from '@/types/vocabularyStudySession'

/** Shadowing tracks back up as metadata only — the audio Blob itself is excluded (see DECISIONS.md). */
export type ShadowingTrackBackupRecord = Omit<ShadowingTrackRecord, 'audioBlob'>

export interface BackupFile {
  schemaVersion: number
  exportedAt: string
  words: WordRecord[]
  scheduleEvents: ScheduleEventRecord[]
  shadowingTracks: ShadowingTrackBackupRecord[]
  shadowingSessions: ShadowingSessionRecord[]
  errorJournalEntries: ErrorJournalEntryRecord[]
  vocabularyStudySessions: VocabularyStudySessionRecord[]
}
