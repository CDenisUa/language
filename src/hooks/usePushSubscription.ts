// Core
import { useCallback, useEffect, useState } from 'react'
// Services
import { getPushSubscription, isPushSupported, subscribeToPush, unsubscribeFromPush } from '@/services/push/pushClient'

interface PushSubscriptionState {
  supported: boolean
  subscribed: boolean
  loading: boolean
  error: string | null
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

export function usePushSubscription() {
  const [state, setState] = useState<PushSubscriptionState>({
    supported: isPushSupported(),
    subscribed: false,
    loading: true,
    error: null,
  })

  const refresh = useCallback(async () => {
    if (!isPushSupported()) {
      setState((prev) => ({ ...prev, supported: false, loading: false }))
      return
    }
    const subscription = await getPushSubscription()
    setState((prev) => ({ ...prev, subscribed: subscription !== null, loading: false }))
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const enable = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      await subscribeToPush()
      await refresh()
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: errorMessage(error) }))
    }
  }, [refresh])

  const disable = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      await unsubscribeFromPush()
      await refresh()
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: errorMessage(error) }))
    }
  }, [refresh])

  return { ...state, enable, disable }
}
