// Types
import type { Language } from '@/types/language'

export interface ScheduleOccurrence {
  id: string
  eventId: string
  language: Language
  start: Date
  end: Date
  label?: string
}
