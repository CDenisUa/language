// Types
import type { Card } from 'ts-fsrs'
import type { Language } from '@/types/language'

export interface WordRecord {
  id: string
  language: Language
  front: string
  back: string
  example?: string
  grammar?: string
  /** Austrian-dialect spelling/word variant, e.g. front "Kartoffel" -> "Erdapfel". */
  austrianVariant?: string
  fsrs: Card
  createdAt: string
  updatedAt: string
}
