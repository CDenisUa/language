// Types
import type { Language } from '@/types/language'

export type ErrorCategory = 'grammar' | 'vocabulary' | 'pronunciation' | 'other'

export type ErrorJournalLinkType = 'word' | 'shadowingTrack'

export interface ErrorJournalEntryRecord {
  id: string
  language: Language
  category: ErrorCategory
  mistake: string
  correction: string
  note?: string
  linkedRecordId?: string
  linkedRecordType?: ErrorJournalLinkType
  createdAt: string
  updatedAt: string
}
