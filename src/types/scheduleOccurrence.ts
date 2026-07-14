// Types
import type { Language } from './language'

export interface ScheduleOccurrence {
  id: string
  eventId: string
  language: Language
  start: Date
  end: Date
  label?: string
}
