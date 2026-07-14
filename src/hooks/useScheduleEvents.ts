// Core
import { useCallback, useEffect, useState } from 'react'
// Services
import { scheduleEventsRepository } from '@/services/db/scheduleEventsRepository'
// Types
import type { ScheduleEventRecord } from '@/types/scheduleEvent'

export function useScheduleEvents() {
  const [events, setEvents] = useState<ScheduleEventRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const result = await scheduleEventsRepository.getAll()
    setEvents(result)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { events, isLoading, reload }
}
