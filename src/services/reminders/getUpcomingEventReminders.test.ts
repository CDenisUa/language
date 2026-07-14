// Core
import { describe, expect, it } from 'vitest'
// Services
import { getUpcomingEventReminders } from '@/services/reminders/getUpcomingEventReminders'
// Types
import type { ScheduleOccurrence } from '@/types/scheduleOccurrence'

function occurrence(overrides: Partial<ScheduleOccurrence> = {}): ScheduleOccurrence {
  return {
    id: 'occ-1',
    eventId: 'evt-1',
    language: 'en',
    start: new Date('2026-07-16T20:00:00'),
    end: new Date('2026-07-16T21:00:00'),
    label: 'Mi Casa, Graz',
    ...overrides,
  }
}

describe('getUpcomingEventReminders', () => {
  it('includes a labeled occurrence starting within the lead window', () => {
    const now = new Date('2026-07-16T19:30:00')
    const result = getUpcomingEventReminders([occurrence()], now, 60)
    expect(result).toEqual([{ id: 'occ-1', kind: 'upcoming-event', label: 'Mi Casa, Graz', start: occurrence().start }])
  })

  it('includes an occurrence already in progress', () => {
    const now = new Date('2026-07-16T20:30:00')
    const result = getUpcomingEventReminders([occurrence()], now, 60)
    expect(result).toHaveLength(1)
  })

  it('excludes an occurrence outside the lead window', () => {
    const now = new Date('2026-07-16T18:00:00')
    const result = getUpcomingEventReminders([occurrence()], now, 60)
    expect(result).toHaveLength(0)
  })

  it('excludes an occurrence that has already ended', () => {
    const now = new Date('2026-07-16T21:30:00')
    const result = getUpcomingEventReminders([occurrence()], now, 60)
    expect(result).toHaveLength(0)
  })

  it('excludes occurrences without a label', () => {
    const now = new Date('2026-07-16T19:30:00')
    const result = getUpcomingEventReminders([occurrence({ label: undefined })], now, 60)
    expect(result).toHaveLength(0)
  })
})
