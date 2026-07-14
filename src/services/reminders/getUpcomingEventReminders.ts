// Core
import { addMinutes } from 'date-fns'
// Types
import type { ScheduleOccurrence } from '../../types/scheduleOccurrence'
import type { UpcomingEventReminder } from '../../types/reminder'

/**
 * Surfaces labeled schedule occurrences (e.g. the Thursday "Mi Casa, Graz" exchange) that are
 * either starting within `leadMinutes` or already in progress — generic over any labeled
 * recurring block or one-off exception, not hardcoded to a specific event.
 */
export function getUpcomingEventReminders(
  occurrences: ScheduleOccurrence[],
  now: Date,
  leadMinutes: number,
): UpcomingEventReminder[] {
  const horizon = addMinutes(now, leadMinutes)

  return occurrences
    .filter((occurrence) => occurrence.label && occurrence.end > now && occurrence.start <= horizon)
    .map((occurrence) => ({
      id: occurrence.id,
      kind: 'upcoming-event' as const,
      label: occurrence.label as string,
      start: occurrence.start,
    }))
}
