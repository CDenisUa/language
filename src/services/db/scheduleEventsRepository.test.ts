// Core
import { beforeEach, describe, expect, it } from 'vitest'
// Services
import { scheduleEventsRepository } from '@/services/db/scheduleEventsRepository'

describe('scheduleEventsRepository', () => {
  beforeEach(async () => {
    await scheduleEventsRepository.clear()
  })

  it('saves a recurring event with its own fields intact', async () => {
    const saved = await scheduleEventsRepository.save({
      type: 'recurring',
      language: 'de',
      daysOfWeek: [1, 2, 3, 4],
      startTime: '09:00',
      endTime: '13:00',
    })

    expect(saved.id).toBeTruthy()
    expect(saved.type).toBe('recurring')
    if (saved.type === 'recurring') {
      expect(saved.daysOfWeek).toEqual([1, 2, 3, 4])
    }
  })

  it('saves an exception event with its own fields intact', async () => {
    const saved = await scheduleEventsRepository.save({
      type: 'exception',
      language: 'en',
      date: '2026-07-16',
      action: 'add',
      startTime: '20:00',
      endTime: '22:00',
      label: 'Mi Casa, Graz',
    })

    expect(saved.type).toBe('exception')
    if (saved.type === 'exception') {
      expect(saved.date).toBe('2026-07-16')
      expect(saved.action).toBe('add')
      expect(saved.label).toBe('Mi Casa, Graz')
    }
  })

  it('lists both event types via getAll', async () => {
    await scheduleEventsRepository.save({
      type: 'recurring',
      language: 'de',
      daysOfWeek: [1, 2, 3, 4],
      startTime: '09:00',
      endTime: '13:00',
    })
    await scheduleEventsRepository.save({
      type: 'exception',
      language: 'de',
      date: '2026-07-14',
      action: 'skip',
    })

    const all = await scheduleEventsRepository.getAll()
    expect(all).toHaveLength(2)
  })
})
