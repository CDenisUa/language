// Core
import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
// Hooks
import { usePushSubscription } from '@/hooks/usePushSubscription'
// Services
import { getPushSubscription, isPushSupported, subscribeToPush, unsubscribeFromPush } from '@/services/push/pushClient'

vi.mock('@/services/push/pushClient', () => ({
  isPushSupported: vi.fn(),
  getPushSubscription: vi.fn(),
  subscribeToPush: vi.fn(),
  unsubscribeFromPush: vi.fn(),
}))

describe('usePushSubscription', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(isPushSupported).mockReturnValue(true)
    vi.mocked(getPushSubscription).mockResolvedValue(null)
    vi.mocked(subscribeToPush).mockResolvedValue({} as PushSubscription)
    vi.mocked(unsubscribeFromPush).mockResolvedValue(undefined)
  })

  it('reports unsupported without touching the push APIs', async () => {
    vi.mocked(isPushSupported).mockReturnValue(false)

    const { result } = renderHook(() => usePushSubscription())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.supported).toBe(false)
    expect(getPushSubscription).not.toHaveBeenCalled()
  })

  it('starts unsubscribed when there is no existing subscription', async () => {
    const { result } = renderHook(() => usePushSubscription())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.subscribed).toBe(false)
  })

  it('subscribes and reflects the new state', async () => {
    const { result } = renderHook(() => usePushSubscription())
    await waitFor(() => expect(result.current.loading).toBe(false))

    vi.mocked(getPushSubscription).mockResolvedValue({} as PushSubscription)
    await act(() => result.current.enable())

    expect(subscribeToPush).toHaveBeenCalled()
    expect(result.current.subscribed).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it('surfaces an error and stays unsubscribed when subscribing fails', async () => {
    vi.mocked(subscribeToPush).mockRejectedValue(new Error('Notification permission was not granted'))

    const { result } = renderHook(() => usePushSubscription())
    await waitFor(() => expect(result.current.loading).toBe(false))

    await act(() => result.current.enable())

    expect(result.current.subscribed).toBe(false)
    expect(result.current.error).toBe('Notification permission was not granted')
  })

  it('unsubscribes and reflects the new state', async () => {
    vi.mocked(getPushSubscription).mockResolvedValue({} as PushSubscription)
    const { result } = renderHook(() => usePushSubscription())
    await waitFor(() => expect(result.current.subscribed).toBe(true))

    vi.mocked(getPushSubscription).mockResolvedValue(null)
    await act(() => result.current.disable())

    expect(unsubscribeFromPush).toHaveBeenCalled()
    expect(result.current.subscribed).toBe(false)
  })
})
