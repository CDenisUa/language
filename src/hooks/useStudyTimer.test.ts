// Core
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
// Hooks
import { useStudyTimer } from '@/hooks/useStudyTimer'
// Services
import { vocabularyStudySessionsRepository } from '@/services/db/vocabularyStudySessionsRepository'
// Types
import type { Language } from '@/types/language'

function setVisibility(state: DocumentVisibilityState) {
  Object.defineProperty(document, 'visibilityState', { value: state, configurable: true })
  document.dispatchEvent(new Event('visibilitychange'))
}

describe('useStudyTimer', () => {
  let currentTime = 0

  beforeEach(async () => {
    await vocabularyStudySessionsRepository.clear()
    currentTime = 1_000_000
    vi.spyOn(Date, 'now').mockImplementation(() => currentTime)
    setVisibility('visible')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('logs accumulated time on unmount', async () => {
    const { unmount } = renderHook(() => useStudyTimer('de'))

    currentTime += 10_000
    unmount()

    await waitFor(async () => {
      expect(await vocabularyStudySessionsRepository.getByLanguage('de')).toHaveLength(1)
    })
    const sessions = await vocabularyStudySessionsRepository.getByLanguage('de')
    expect(sessions[0].durationSeconds).toBe(10)
  })

  it('does not log a session shorter than the minimum threshold', async () => {
    const { unmount } = renderHook(() => useStudyTimer('de'))

    currentTime += 2_000
    unmount()

    await new Promise((resolve) => setTimeout(resolve, 50))
    expect(await vocabularyStudySessionsRepository.getByLanguage('de')).toHaveLength(0)
  })

  it('persists elapsed time immediately when the tab goes hidden, excluding hidden time, then logs the rest on unmount', async () => {
    const { unmount } = renderHook(() => useStudyTimer('de'))

    currentTime += 5_000
    setVisibility('hidden')

    await waitFor(async () => {
      expect(await vocabularyStudySessionsRepository.getByLanguage('de')).toHaveLength(1)
    })

    currentTime += 20_000 // hidden — shouldn't count
    setVisibility('visible')
    currentTime += 6_000
    unmount()

    await waitFor(async () => {
      expect(await vocabularyStudySessionsRepository.getByLanguage('de')).toHaveLength(2)
    })
    const sessions = await vocabularyStudySessionsRepository.getByLanguage('de')
    const totalSeconds = sessions.reduce((sum, session) => sum + session.durationSeconds, 0)
    expect(totalSeconds).toBe(11)
  })

  it('does not lose time when the tab is closed without an unmount (only a visibilitychange to hidden fires)', async () => {
    renderHook(() => useStudyTimer('de'))

    currentTime += 12_000
    setVisibility('hidden') // simulates a tab close — React's cleanup never runs here

    await waitFor(async () => {
      expect(await vocabularyStudySessionsRepository.getByLanguage('de')).toHaveLength(1)
    })
    const sessions = await vocabularyStudySessionsRepository.getByLanguage('de')
    expect(sessions[0].durationSeconds).toBe(12)
  })

  it('logs a session and starts a fresh one when the language changes', async () => {
    const { rerender, unmount } = renderHook(({ language }: { language: Language }) => useStudyTimer(language), {
      initialProps: { language: 'de' },
    })

    currentTime += 10_000
    rerender({ language: 'en' })
    currentTime += 6_000
    unmount()

    await waitFor(async () => {
      expect(await vocabularyStudySessionsRepository.getByLanguage('en')).toHaveLength(1)
    })
    const germanSessions = await vocabularyStudySessionsRepository.getByLanguage('de')
    const englishSessions = await vocabularyStudySessionsRepository.getByLanguage('en')
    expect(germanSessions[0].durationSeconds).toBe(10)
    expect(englishSessions[0].durationSeconds).toBe(6)
  })
})
