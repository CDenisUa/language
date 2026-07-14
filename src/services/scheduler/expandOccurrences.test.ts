// Core
import { describe, expect, it } from 'vitest'
// Services
import { expandOccurrences } from '@/services/scheduler/expandOccurrences'
// Types
import type { ScheduleEventRecord } from '@/types/scheduleEvent'

const BASE: Pick<ScheduleEventRecord, 'createdAt' | 'updatedAt'> = {
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
}

describe('expandOccurrences', () => {
  it('expands a recurring event across its matching weekdays in range', () => {
    // 2026-07-13 is a Monday
    const rangeStart = new Date('2026-07-13T00:00:00')
    const rangeEnd = new Date('2026-07-19T23:59:59')

    const events: ScheduleEventRecord[] = [
      {
        ...BASE,
        id: 'german-course',
        type: 'recurring',
        language: 'de',
        daysOfWeek: [1, 2, 3, 4], // Mon-Thu
        startTime: '09:00',
        endTime: '13:00',
      },
    ]

    const occurrences = expandOccurrences(events, rangeStart, rangeEnd)

    expect(occurrences).toHaveLength(4)
    expect(occurrences[0].start.toISOString()).toBe(new Date('2026-07-13T09:00:00').toISOString())
    expect(occurrences[0].end.toISOString()).toBe(new Date('2026-07-13T13:00:00').toISOString())
    expect(occurrences.every((o) => o.language === 'de')).toBe(true)
  })

  it('skips a recurring occurrence on a date with a matching skip exception', () => {
    const rangeStart = new Date('2026-07-13T00:00:00')
    const rangeEnd = new Date('2026-07-19T23:59:59')

    const events: ScheduleEventRecord[] = [
      {
        ...BASE,
        id: 'german-course',
        type: 'recurring',
        language: 'de',
        daysOfWeek: [1, 2, 3, 4],
        startTime: '09:00',
        endTime: '13:00',
      },
      {
        ...BASE,
        id: 'holiday',
        type: 'exception',
        language: 'de',
        date: '2026-07-14',
        action: 'skip',
      },
    ]

    const occurrences = expandOccurrences(events, rangeStart, rangeEnd)

    expect(occurrences).toHaveLength(3)
    expect(occurrences.some((o) => o.id.startsWith('german-course:2026-07-14'))).toBe(false)
  })

  it('adds a one-off exception occurrence, e.g. the Thursday language exchange', () => {
    const rangeStart = new Date('2026-07-13T00:00:00')
    const rangeEnd = new Date('2026-07-19T23:59:59')

    const events: ScheduleEventRecord[] = [
      {
        ...BASE,
        id: 'language-exchange',
        type: 'exception',
        language: 'en',
        date: '2026-07-16',
        action: 'add',
        startTime: '20:00',
        endTime: '22:00',
        label: 'Mi Casa, Graz',
      },
    ]

    const occurrences = expandOccurrences(events, rangeStart, rangeEnd)

    expect(occurrences).toHaveLength(1)
    expect(occurrences[0].label).toBe('Mi Casa, Graz')
    expect(occurrences[0].start.toISOString()).toBe(new Date('2026-07-16T20:00:00').toISOString())
  })

  it('excludes occurrences outside the requested range', () => {
    const rangeStart = new Date('2026-07-13T00:00:00')
    const rangeEnd = new Date('2026-07-19T23:59:59')

    const events: ScheduleEventRecord[] = [
      {
        ...BASE,
        id: 'far-future',
        type: 'exception',
        language: 'en',
        date: '2026-08-01',
        action: 'add',
        startTime: '10:00',
        endTime: '11:00',
      },
    ]

    expect(expandOccurrences(events, rangeStart, rangeEnd)).toHaveLength(0)
  })
})
