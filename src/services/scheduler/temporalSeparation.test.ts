// Core
import { describe, expect, it } from 'vitest'
// Services
import { getEnglishSeparationStatus } from '@/services/scheduler/temporalSeparation'
// Types
import type { ScheduleOccurrence } from '@/types/scheduleOccurrence'

function germanOccurrence(start: string, end: string): ScheduleOccurrence {
  return {
    id: 'de-1',
    eventId: 'de-1',
    language: 'de',
    start: new Date(start),
    end: new Date(end),
  }
}

describe('getEnglishSeparationStatus', () => {
  it('is not blocked when there is no German block today', () => {
    const status = getEnglishSeparationStatus([], new Date('2026-07-13T15:00:00'), 3)
    expect(status).toEqual({ blocked: false, unblockedAt: null })
  })

  it('is blocked during the German block itself', () => {
    const occurrences = [germanOccurrence('2026-07-13T09:00:00', '2026-07-13T13:00:00')]
    const status = getEnglishSeparationStatus(occurrences, new Date('2026-07-13T10:00:00'), 3)
    expect(status.blocked).toBe(true)
    expect(status.unblockedAt?.toISOString()).toBe(new Date('2026-07-13T16:00:00').toISOString())
  })

  it('is blocked during the buffer window right after German ends', () => {
    const occurrences = [germanOccurrence('2026-07-13T09:00:00', '2026-07-13T13:00:00')]
    const status = getEnglishSeparationStatus(occurrences, new Date('2026-07-13T14:30:00'), 3)
    expect(status.blocked).toBe(true)
  })

  it('is unblocked once the buffer window has passed', () => {
    const occurrences = [germanOccurrence('2026-07-13T09:00:00', '2026-07-13T13:00:00')]
    const status = getEnglishSeparationStatus(occurrences, new Date('2026-07-13T16:00:01'), 3)
    expect(status).toEqual({ blocked: false, unblockedAt: null })
  })

  it('ignores German blocks on other days', () => {
    const occurrences = [germanOccurrence('2026-07-13T09:00:00', '2026-07-13T13:00:00')]
    const status = getEnglishSeparationStatus(occurrences, new Date('2026-07-14T10:00:00'), 3)
    expect(status).toEqual({ blocked: false, unblockedAt: null })
  })

  it('uses the latest end time across multiple German blocks on the same day', () => {
    const occurrences = [
      germanOccurrence('2026-07-13T09:00:00', '2026-07-13T11:00:00'),
      germanOccurrence('2026-07-13T12:00:00', '2026-07-13T13:00:00'),
    ]
    const status = getEnglishSeparationStatus(occurrences, new Date('2026-07-13T13:30:00'), 3)
    expect(status.unblockedAt?.toISOString()).toBe(new Date('2026-07-13T16:00:00').toISOString())
  })
})
