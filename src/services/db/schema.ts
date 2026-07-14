// Types
import type { DBSchema } from 'idb'
import type { Language } from '@/types/language'
import type { WordRecord } from '@/types/word'
import type { ScheduleEventRecord } from '@/types/scheduleEvent'

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
}

export const DB_NAME = 'sprachlabor'
export const DB_VERSION = 2
