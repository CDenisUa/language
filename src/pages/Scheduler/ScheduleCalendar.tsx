// Core
import { useMemo } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, getDay, parse, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
// Types
import type { ScheduleOccurrence } from '@/types/scheduleOccurrence'
// Styles
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './ScheduleCalendar.css'

// react-big-calendar's localizer resolves week start via `locales[culture].options.weekStartsOn`,
// which silently no-ops unless a matching `culture` prop is also passed to <Calendar>. Overriding
// startOfWeek directly is more robust — it always forces a Monday-start week regardless of culture.
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales: { 'en-US': enUS },
})

interface CalendarEvent extends ScheduleOccurrence {
  title: string
}

interface ScheduleCalendarProps {
  occurrences: ScheduleOccurrence[]
  date: Date
  onNavigate: (date: Date) => void
}

function ScheduleCalendar({ occurrences, date, onNavigate }: ScheduleCalendarProps) {
  const events = useMemo<CalendarEvent[]>(
    () =>
      occurrences.map((occurrence) => ({
        ...occurrence,
        title: occurrence.label ?? (occurrence.language === 'de' ? 'Deutsch' : 'English'),
      })),
    [occurrences],
  )

  return (
    <div className="schedule-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        date={date}
        onNavigate={onNavigate}
        defaultView="week"
        views={['week']}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.language === 'de' ? '#ef4444' : '#3b82f6',
            borderColor: 'transparent',
          },
        })}
      />
    </div>
  )
}

export default ScheduleCalendar
