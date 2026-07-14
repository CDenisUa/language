// Core
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
// Hooks
import { usePushScheduleSync } from '@/hooks/usePushScheduleSync'
// Services
import { scheduleEventsRepository } from '@/services/db/scheduleEventsRepository'
import { getPushSubscription, isPushSupported, syncScheduleToWorker } from '@/services/push/pushClient'

vi.mock('@/services/push/pushClient', () => ({
  isPushSupported: vi.fn(),
  getPushSubscription: vi.fn(),
  syncScheduleToWorker: vi.fn(),
}))

describe('usePushScheduleSync', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    await scheduleEventsRepository.clear()
    vi.mocked(isPushSupported).mockReturnValue(true)
    vi.mocked(syncScheduleToWorker).mockResolvedValue(undefined)
  })

  it('does not sync when there is no active push subscription', async () => {
    vi.mocked(getPushSubscription).mockResolvedValue(null)

    renderHook(() => usePushScheduleSync())

    await waitFor(() => expect(getPushSubscription).toHaveBeenCalled())
    expect(syncScheduleToWorker).not.toHaveBeenCalled()
  })

  it('syncs current schedule events once push is subscribed', async () => {
    await scheduleEventsRepository.save({
      type: 'recurring',
      language: 'de',
      daysOfWeek: [1, 2],
      startTime: '09:00',
      endTime: '13:00',
    })
    vi.mocked(getPushSubscription).mockResolvedValue({} as PushSubscription)

    renderHook(() => usePushScheduleSync())

    await waitFor(() => expect(syncScheduleToWorker).toHaveBeenCalledTimes(1))
    const [events] = vi.mocked(syncScheduleToWorker).mock.calls[0]
    expect(events).toHaveLength(1)
  })

  it('does nothing when push is unsupported', async () => {
    vi.mocked(isPushSupported).mockReturnValue(false)

    renderHook(() => usePushScheduleSync())

    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(getPushSubscription).not.toHaveBeenCalled()
  })
})
