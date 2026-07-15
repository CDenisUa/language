// Types
import type { Language } from '@/types/language'
import type { CefrLevel } from '@/types/cefrLevel'

export interface KnownWordRecord {
  id: string
  language: Language
  word: string
  cefrLevel: CefrLevel
  createdAt: string
  updatedAt: string
}
