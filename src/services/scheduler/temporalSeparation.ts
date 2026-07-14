// Core
import { addHours, isSameDay } from 'date-fns'
// Types
import type { ScheduleOccurrence } from '@/types/scheduleOccurrence'

export interface TemporalSeparationStatus {
  blocked: boolean
  unblockedAt: Date | null
}

/**
 * English is blocked from the start of today's German block(s) until `bufferHours`
 * after the latest one ends — avoids interference between the two languages (see DECISIONS.md).
 */
export function getEnglishSeparationStatus(
  occurrences: ScheduleOccurrence[],
  now: Date,
  bufferHours: number,
): TemporalSeparationStatus {
  const todayGermanOccurrences = occurrences.filter(
    (occurrence) => occurrence.language === 'de' && isSameDay(occurrence.start, now),
  )

  if (todayGermanOccurrences.length === 0) {
    return { blocked: false, unblockedAt: null }
  }

  const blockStart = todayGermanOccurrences.reduce(
    (earliest, occurrence) => (occurrence.start < earliest ? occurrence.start : earliest),
    todayGermanOccurrences[0].start,
  )
  const blockEnd = todayGermanOccurrences.reduce(
    (latest, occurrence) => (occurrence.end > latest ? occurrence.end : latest),
    todayGermanOccurrences[0].end,
  )
  const unblockedAt = addHours(blockEnd, bufferHours)

  const blocked = now >= blockStart && now < unblockedAt
  return { blocked, unblockedAt: blocked ? unblockedAt : null }
}
