// Types
import type { Language } from '@/types/language'

export interface ShadowingSessionRecord {
  id: string
  trackId: string
  language: Language
  /** Self-rating 1 (poor) – 5 (great) — see DECISIONS.md, no auto-scoring against a transcript. */
  rating: number
  practiceDurationSeconds: number
  notes?: string
  createdAt: string
  updatedAt: string
}
