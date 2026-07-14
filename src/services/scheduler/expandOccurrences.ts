// Core
import { addDays, format } from 'date-fns'
// Types
import type { ScheduleEventRecord } from '../../types/scheduleEvent'
import type { ScheduleOccurrence } from '../../types/scheduleOccurrence'

function combineDateAndTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(':').map(Number)
  const combined = new Date(date)
  combined.setHours(hours, minutes, 0, 0)
  return combined
}

/** Expands recurring rules + one-off exceptions into concrete start/end occurrences within [rangeStart, rangeEnd]. */
export function expandOccurrences(
  events: ScheduleEventRecord[],
  rangeStart: Date,
  rangeEnd: Date,
): ScheduleOccurrence[] {
  const skippedKeys = new Set<string>()
  for (const event of events) {
    if (event.type === 'exception' && event.action === 'skip') {
      skippedKeys.add(`${event.language}:${event.date}`)
    }
  }

  const occurrences: ScheduleOccurrence[] = []

  for (const event of events) {
    if (event.type !== 'recurring') continue

    for (let day = new Date(rangeStart); day <= rangeEnd; day = addDays(day, 1)) {
      if (!event.daysOfWeek.includes(day.getDay())) continue

      const dateKey = format(day, 'yyyy-MM-dd')
      if (skippedKeys.has(`${event.language}:${dateKey}`)) continue

      occurrences.push({
        id: `${event.id}:${dateKey}`,
        eventId: event.id,
        language: event.language,
        start: combineDateAndTime(day, event.startTime),
        end: combineDateAndTime(day, event.endTime),
        label: event.label,
      })
    }
  }

  for (const event of events) {
    if (event.type !== 'exception' || event.action !== 'add') continue
    if (!event.startTime || !event.endTime) continue

    const day = new Date(`${event.date}T00:00:00`)
    if (day < rangeStart || day > rangeEnd) continue

    occurrences.push({
      id: event.id,
      eventId: event.id,
      language: event.language,
      start: combineDateAndTime(day, event.startTime),
      end: combineDateAndTime(day, event.endTime),
      label: event.label,
    })
  }

  return occurrences.sort((a, b) => a.start.getTime() - b.start.getTime())
}
