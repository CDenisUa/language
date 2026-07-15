// Core
import { useEffect } from 'react'
// Services
import { vocabularyStudySessionsRepository } from '@/services/db/vocabularyStudySessionsRepository'
// Types
import type { Language } from '@/types/language'
// Consts
import { MIN_STUDY_SESSION_SECONDS } from '@/consts/dashboard'

/**
 * Logs automatic study time for the Vocabulary page: accrues while this component is mounted
 * and the tab is visible. A session record is persisted immediately on every `visibilitychange`
 * to hidden (not just accumulated locally) — `visibilitychange` fires reliably on tab close,
 * unlike a React effect cleanup, which never runs when the page is torn down by a hard
 * navigation/tab close rather than a client-side route change. One more record is saved on
 * unmount for any remaining visible time (e.g. navigating to another in-app page). Multiple
 * short records per visit is fine — Dashboard just sums them. See DECISIONS.md for why this is
 * visibility-based rather than input-idle-based.
 */
export function useStudyTimer(language: Language): void {
  useEffect(() => {
    let resumedAt: number | null = document.visibilityState === 'visible' ? Date.now() : null

    const persistElapsed = () => {
      if (resumedAt === null) return
      const durationSeconds = Math.round((Date.now() - resumedAt) / 1000)
      resumedAt = null
      if (durationSeconds >= MIN_STUDY_SESSION_SECONDS) {
        vocabularyStudySessionsRepository.save({ language, durationSeconds })
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resumedAt = Date.now()
      } else {
        persistElapsed()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      persistElapsed()
    }
  }, [language])
}
