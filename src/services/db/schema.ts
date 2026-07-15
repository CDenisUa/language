// Types
import type { DBSchema } from 'idb'
import type { Language } from '@/types/language'
import type { WordRecord } from '@/types/word'
import type { ScheduleEventRecord } from '@/types/scheduleEvent'
import type { ShadowingTrackRecord } from '@/types/shadowingTrack'
import type { ShadowingSessionRecord } from '@/types/shadowingSession'

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
}

export const DB_NAME = 'sprachlabor'
export const DB_VERSION = 3
