// Core
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { endOfDay, format, startOfDay } from 'date-fns'
// Hooks
import { useScheduleEvents } from '@/hooks/useScheduleEvents'
// Services
import { expandOccurrences } from '@/services/scheduler/expandOccurrences'
import { getEnglishSeparationStatus } from '@/services/scheduler/temporalSeparation'
import { getUpcomingEventReminders } from '@/services/reminders/getUpcomingEventReminders'
import { shouldFireUnblockNudge } from '@/services/reminders/shouldFireUnblockNudge'
// Types
import type { Reminder } from '@/types/reminder'
// Consts
import { ENGLISH_SEPARATION_BUFFER_HOURS } from '@/consts/scheduler'
import {
  DISMISSED_REMINDERS_STORAGE_KEY,
  REMINDER_TICK_INTERVAL_MS,
  UPCOMING_EVENT_LEAD_MINUTES,
} from '@/consts/reminders'

function loadDismissed(): Set<string> {
  try {
    const raw = localStorage.getItem(DISMISSED_REMINDERS_STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function persistDismissed(ids: Set<string>) {
  localStorage.setItem(DISMISSED_REMINDERS_STORAGE_KEY, JSON.stringify([...ids]))
}

/**
 * Drives the in-app reminder banner: a nudge the moment English unblocks (detected as a
 * blocked->available transition while the app is open, not retroactively), plus reminders for
 * upcoming/ongoing labeled schedule occurrences (e.g. the Thursday "Mi Casa, Graz" exchange).
 * This is the fallback notification channel for Task 5 — no Web Push yet (see DECISIONS.md).
 */
export function useReminders() {
  const { events } = useScheduleEvents()
  const [now, setNow] = useState(() => new Date())
  const [dismissed, setDismissed] = useState<Set<string>>(() => loadDismissed())
  const [unblockedNudgeId, setUnblockedNudgeId] = useState<string | null>(null)
  const wasBlockedRef = useRef(false)

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), REMINDER_TICK_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const todayOccurrences = useMemo(
    () => expandOccurrences(events, startOfDay(now), endOfDay(now)),
    [events, now],
  )

  const separationStatus = useMemo(
    () => getEnglishSeparationStatus(todayOccurrences, now, ENGLISH_SEPARATION_BUFFER_HOURS),
    [todayOccurrences, now],
  )

  useEffect(() => {
    if (shouldFireUnblockNudge(wasBlockedRef.current, separationStatus.blocked)) {
      setUnblockedNudgeId(`english-unblocked:${format(now, 'yyyy-MM-dd')}`)
    }
    wasBlockedRef.current = separationStatus.blocked
  }, [separationStatus.blocked, now])

  const dismiss = useCallback((id: string) => {
    setDismissed((prev) => {
      const next = new Set(prev)
      next.add(id)
      persistDismissed(next)
      return next
    })
  }, [])

  const reminders = useMemo<Reminder[]>(() => {
    const list: Reminder[] = []

    if (unblockedNudgeId && !dismissed.has(unblockedNudgeId)) {
      list.push({ id: unblockedNudgeId, kind: 'english-unblocked' })
    }

    for (const reminder of getUpcomingEventReminders(todayOccurrences, now, UPCOMING_EVENT_LEAD_MINUTES)) {
      if (!dismissed.has(reminder.id)) list.push(reminder)
    }

    return list
  }, [unblockedNudgeId, dismissed, todayOccurrences, now])

  return { reminders, dismiss }
}
