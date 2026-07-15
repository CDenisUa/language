// Types
import type { Language } from '@/types/language'

export interface VocabularyStudySessionRecord {
  id: string
  language: Language
  durationSeconds: number
  createdAt: string
  updatedAt: string
}
