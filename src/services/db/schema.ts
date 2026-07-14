// Types
import type { DBSchema } from 'idb'
import type { Language } from '@/types/language'
import type { WordRecord } from '@/types/word'

export interface SprachlaborDBSchema extends DBSchema {
  words: {
    key: string
    value: WordRecord
    indexes: { 'by-language': Language }
  }
}

export const DB_NAME = 'sprachlabor'
export const DB_VERSION = 1
