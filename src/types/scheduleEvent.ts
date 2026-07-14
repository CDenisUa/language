// Types
import type { Language } from '@/types/language'

interface RecurringScheduleEvent {
  id: string
  type: 'recurring'
  language: Language
  /** 0 (Sun) – 6 (Sat), per Date.getDay(). */
  daysOfWeek: number[]
  /** 24h "HH:MM". */
  startTime: string
  endTime: string
  label?: string
  createdAt: string
  updatedAt: string
}

interface ExceptionScheduleEvent {
  id: string
  type: 'exception'
  language: Language
  /** "YYYY-MM-DD". */
  date: string
  /** skip = cancel recurring occurrences for this language on this date; add = one-off block. */
  action: 'skip' | 'add'
  startTime?: string
  endTime?: string
  label?: string
  createdAt: string
  updatedAt: string
}

export type ScheduleEventRecord = RecurringScheduleEvent | ExceptionScheduleEvent
