// Types
import type { Language } from '@/types/language'

export interface ShadowingTrackRecord {
  id: string
  language: Language
  title: string
  audioBlob: Blob
  mimeType: string
  createdAt: string
  updatedAt: string
}
