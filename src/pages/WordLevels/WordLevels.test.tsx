// Core
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Components
import WordLevels from '@/pages/WordLevels/WordLevels'
// Services
import { knownWordsRepository } from '@/services/db/knownWordsRepository'
// Hooks
import { useLocaleStore } from '@/hooks/useLocaleStore'
import { useLanguageStore } from '@/hooks/useLanguageStore'

function stubFrequencyList(words: string[]) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve(words) }))
}

describe('WordLevels', () => {
  beforeEach(async () => {
    await knownWordsRepository.clear()
    useLocaleStore.setState({ locale: 'uk' })
    useLanguageStore.setState({ activeLanguage: 'en' })
    stubFrequencyList(Array.from({ length: 50 }, (_, index) => `word${index + 1}`))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows all six CEFR level cards on the initial view', () => {
    render(<WordLevels />)

    expect(screen.getByRole('heading', { name: 'Рівні слів', level: 1 })).toBeInTheDocument()
    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']) {
      expect(screen.getByText(level)).toBeInTheDocument()
    }
  })

  it('starts a round for a level and marks a word as known', async () => {
    const user = userEvent.setup()
    render(<WordLevels />)

    await user.click(screen.getByText('A1').closest('button')!)

    const wordElement = await screen.findByText(/^word\d+$/)
    const word = wordElement.textContent!

    await user.click(screen.getByRole('button', { name: 'Знаю' }))

    await waitFor(async () => {
      const known = await knownWordsRepository.getByLanguage('en')
      expect(known.some((entry) => entry.word === word && entry.cefrLevel === 'A1')).toBe(true)
    })
  })

  it('shows a round summary after going through the whole batch', async () => {
    const user = userEvent.setup()
    render(<WordLevels />)

    await user.click(screen.getByText('A1').closest('button')!)

    for (let i = 0; i < 15; i++) {
      await screen.findByText(/^word\d+$/)
      await user.click(screen.getByRole('button', { name: 'Знаю' }))
    }

    expect(await screen.findByText('Ще раунд')).toBeInTheDocument()
  })

  it('offers adding an unknown word to Vocabulary', async () => {
    const user = userEvent.setup()
    render(<WordLevels />)

    await user.click(screen.getByText('A1').closest('button')!)
    await screen.findByText(/^word\d+$/)

    await user.click(screen.getByRole('button', { name: 'Не знаю' }))

    expect(screen.getByRole('heading', { name: 'Додати слово' })).toBeInTheDocument()
  })
})
