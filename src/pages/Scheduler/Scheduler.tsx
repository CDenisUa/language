// Core
import { useMemo, useState } from 'react'
import { endOfDay, endOfWeek, startOfDay, startOfWeek } from 'date-fns'
// Components
import ScheduleForm from '@/pages/Scheduler/ScheduleForm'
import ScheduleCalendar from '@/pages/Scheduler/ScheduleCalendar'
import SeparationStatus from '@/pages/Scheduler/SeparationStatus'
// Hooks
import { useScheduleEvents } from '@/hooks/useScheduleEvents'
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { scheduleEventsRepository } from '@/services/db/scheduleEventsRepository'
import { expandOccurrences } from '@/services/scheduler/expandOccurrences'
import { getEnglishSeparationStatus } from '@/services/scheduler/temporalSeparation'
// Types
import type { ScheduleFormValues } from '@/pages/Scheduler/ScheduleForm'
import type { ScheduleEventRecord } from '@/types/scheduleEvent'
// Consts
import { ENGLISH_SEPARATION_BUFFER_HOURS } from '@/consts/scheduler'
// Styles
import './Scheduler.css'

const WEEK_OPTIONS = { weekStartsOn: 1 as const }

function describeEvent(event: ScheduleEventRecord): string {
  const languageLabel = event.language === 'de' ? 'DE' : 'EN'
  if (event.type === 'recurring') {
    const days = event.daysOfWeek.join(',')
    return `${languageLabel} · ${days} · ${event.startTime}–${event.endTime}${event.label ? ` · ${event.label}` : ''}`
  }
  const timeRange = event.action === 'add' && event.startTime && event.endTime ? ` ${event.startTime}–${event.endTime}` : ''
  return `${languageLabel} · ${event.date} · ${event.action}${timeRange}${event.label ? ` · ${event.label}` : ''}`
}

function Scheduler() {
  const { t } = useTranslation()
  const { events, reload } = useScheduleEvents()
  const [calendarDate, setCalendarDate] = useState(new Date())

  const weekOccurrences = useMemo(
    () =>
      expandOccurrences(
        events,
        startOfWeek(calendarDate, WEEK_OPTIONS),
        endOfWeek(calendarDate, WEEK_OPTIONS),
      ),
    [events, calendarDate],
  )

  const separationStatus = useMemo(() => {
    const now = new Date()
    const todayOccurrences = expandOccurrences(events, startOfDay(now), endOfDay(now))
    return getEnglishSeparationStatus(todayOccurrences, now, ENGLISH_SEPARATION_BUFFER_HOURS)
  }, [events])

  const handleSave = async (values: ScheduleFormValues) => {
    if (values.kind === 'recurring') {
      await scheduleEventsRepository.save({
        type: 'recurring',
        language: values.language,
        daysOfWeek: values.daysOfWeek,
        startTime: values.startTime,
        endTime: values.endTime,
        label: values.label.trim() || undefined,
      })
    } else {
      await scheduleEventsRepository.save({
        type: 'exception',
        language: values.language,
        date: values.date,
        action: values.action,
        startTime: values.action === 'add' ? values.startTime : undefined,
        endTime: values.action === 'add' ? values.endTime : undefined,
        label: values.label.trim() || undefined,
      })
    }
    await reload()
  }

  const handleDelete = async (id: string) => {
    await scheduleEventsRepository.remove(id)
    await reload()
  }

  return (
    <section className="scheduler-page">
      <h1>{t.pages.scheduler.title}</h1>
      <p>{t.pages.scheduler.description}</p>

      <SeparationStatus status={separationStatus} />

      <ScheduleForm onSave={handleSave} />

      <ScheduleCalendar occurrences={weekOccurrences} date={calendarDate} onNavigate={setCalendarDate} />

      <div className="scheduler-page__events">
        <h2>{t.scheduler.eventsHeading}</h2>
        {events.length === 0 ? (
          <p>{t.scheduler.emptyEvents}</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <span>{describeEvent(event)}</span>
                <button type="button" onClick={() => handleDelete(event.id)}>
                  {t.scheduler.delete}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Scheduler
