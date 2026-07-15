// Core
import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
// Components
import Dashboard from '@/pages/Dashboard/Dashboard'
// Services
import { vocabularyStudySessionsRepository } from '@/services/db/vocabularyStudySessionsRepository'
import { shadowingSessionsRepository } from '@/services/db/shadowingSessionsRepository'
import { errorJournalRepository } from '@/services/db/errorJournalRepository'
// Hooks
import { useLocaleStore } from '@/hooks/useLocaleStore'
import { useStudyBalanceStore } from '@/hooks/useStudyBalanceStore'

describe('Dashboard', () => {
  beforeEach(async () => {
    await vocabularyStudySessionsRepository.clear()
    await shadowingSessionsRepository.clear()
    await errorJournalRepository.clear()
    useLocaleStore.setState({ locale: 'uk' })
    useStudyBalanceStore.setState({ targetGermanPercent: 70 })
  })

  it('shows the empty state when there is no activity yet', async () => {
    render(<Dashboard />)

    await waitFor(() => {
      expect(
        screen.getByText('Ще немає зафіксованої активності — попрацюйте зі словником чи шедовінгом.'),
      ).toBeInTheDocument()
    })
  })

  it('sums vocabulary and shadowing time per language and shows actual vs target balance', async () => {
    await vocabularyStudySessionsRepository.save({ language: 'de', durationSeconds: 3600 })
    await shadowingSessionsRepository.save({
      trackId: 'track-1',
      language: 'de',
      rating: 4,
      practiceDurationSeconds: 3600,
    })
    await vocabularyStudySessionsRepository.save({ language: 'en', durationSeconds: 1800 })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText(/Німецька: 2\.0 год/)).toBeInTheDocument()
    })
    expect(screen.getByText(/Англійська: 0\.5 год/)).toBeInTheDocument()
    expect(screen.getByText(/Фактичний баланс: 80% \/ 20% · Ціль: 70% \/ 30%/)).toBeInTheDocument()
  })

  it('shows an error-frequency breakdown by category', async () => {
    await errorJournalRepository.save({ language: 'de', category: 'grammar', mistake: 'a', correction: 'b' })
    await errorJournalRepository.save({ language: 'de', category: 'grammar', mistake: 'c', correction: 'd' })
    await errorJournalRepository.save({ language: 'en', category: 'vocabulary', mistake: 'e', correction: 'f' })

    render(<Dashboard />)

    const grammarItem = await screen.findByText('Граматика')
    expect(grammarItem.closest('li')).toHaveTextContent('2')

    const vocabularyItem = screen.getByText('Лексика')
    expect(vocabularyItem.closest('li')).toHaveTextContent('1')
  })
})
