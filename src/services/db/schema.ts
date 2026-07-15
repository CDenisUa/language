// Types
import type { DBSchema } from 'idb'
import type { Language } from '@/types/language'
import type { WordRecord } from '@/types/word'
import type { ScheduleEventRecord } from '@/types/scheduleEvent'
import type { ShadowingTrackRecord } from '@/types/shadowingTrack'
import type { ShadowingSessionRecord } from '@/types/shadowingSession'
import type { ErrorJournalEntryRecord } from '@/types/errorJournalEntry'
import type { VocabularyStudySessionRecord } from '@/types/vocabularyStudySession'
import type { GrammarProgressRecord } from '@/types/grammarProgress'
import type { GrammarTopicReviewRecord } from '@/types/grammarTopicReview'
import type { KnownWordRecord } from '@/types/knownWord'

export interface SprachlaborDBSchema extends DBSchema {
  words: {
    key: string
    value: WordRecord
    indexes: { 'by-language': Language }
  }
  scheduleEvents: {
    key: string
    value: ScheduleEventRecord
  }
  shadowingTracks: {
    key: string
    value: ShadowingTrackRecord
    indexes: { 'by-language': Language }
  }
  shadowingSessions: {
    key: string
    value: ShadowingSessionRecord
    indexes: { 'by-track': string }
  }
  errorJournalEntries: {
    key: string
    value: ErrorJournalEntryRecord
    indexes: { 'by-language': Language }
  }
  vocabularyStudySessions: {
    key: string
    value: VocabularyStudySessionRecord
    indexes: { 'by-language': Language }
  }
  grammarProgress: {
    key: string
    value: GrammarProgressRecord
    indexes: { 'by-topic': string }
  }
  grammarTopicReviews: {
    key: string
    value: GrammarTopicReviewRecord
  }
  knownWords: {
    key: string
    value: KnownWordRecord
    indexes: { 'by-language': Language }
  }
}

export const DB_NAME = 'sprachlabor'
export const DB_VERSION = 8
