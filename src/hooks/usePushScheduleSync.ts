// Core
import { useEffect, useRef } from 'react'
// Hooks
import { useScheduleEvents } from '@/hooks/useScheduleEvents'
// Services
import { getPushSubscription, isPushSupported, syncScheduleToWorker } from '@/services/push/pushClient'

/** Re-syncs current schedule events to the push Worker once per app load, if push is enabled — see DECISIONS.md. */
export function usePushScheduleSync() {
  const { events, isLoading } = useScheduleEvents()
  const hasSyncedRef = useRef(false)

  useEffect(() => {
    if (isLoading || hasSyncedRef.current || !isPushSupported()) return
    hasSyncedRef.current = true

    getPushSubscription()
      .then((subscription) => (subscription ? syncScheduleToWorker(events) : undefined))
      .catch((error) => console.error('Push schedule sync failed', error))
  }, [isLoading, events])
}
