// Core
import { createEmptyCard } from 'ts-fsrs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Components
import TextAnalyzer from '@/pages/TextAnalyzer/TextAnalyzer'
// Services
import { wordsRepository } from '@/services/db/wordsRepository'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useLocaleStore } from '@/hooks/useLocaleStore'

const PLACEHOLDER = 'Встав сюди текст німецькою чи англійською...'

function getAnalyzedTextContainer() {
  return document.querySelector('.analyzed-text') as HTMLElement
}

describe('TextAnalyzer', () => {
  beforeEach(async () => {
    await wordsRepository.clear()
    useLanguageStore.setState({ activeLanguage: 'de' })
    useLocaleStore.setState({ locale: 'uk' })
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ json: () => Promise.resolve(['der', 'ist', 'ein']) }),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('flags words not in the frequency list and lets you add one to the vocabulary', async () => {
    const user = userEvent.setup()
    render(<TextAnalyzer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'Katzen sind toll')
    await user.click(screen.getByRole('button', { name: 'Аналізувати' }))

    const flaggedWord = await screen.findByRole('button', { name: /Katzen/ })
    await user.click(flaggedWord)

    expect(screen.getByLabelText('Слово')).toHaveValue('Katzen')

    await user.type(screen.getByLabelText('Переклад'), 'cats')
    await user.click(screen.getByRole('button', { name: 'Зберегти' }))

    await waitFor(() => {
      expect(screen.getByText('Слово додано до словника.')).toBeInTheDocument()
    })

    const words = await wordsRepository.getByLanguage('de')
    expect(words).toHaveLength(1)
    expect(words[0].front).toBe('Katzen')
  })

  it('shows a word already in the vocabulary as non-clickable', async () => {
    await wordsRepository.save({ language: 'de', front: 'Katzen', back: 'cats', fsrs: createEmptyCard() })

    const user = userEvent.setup()
    render(<TextAnalyzer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'Katzen sind toll')
    await user.click(screen.getByRole('button', { name: 'Аналізувати' }))

    await waitFor(() => {
      expect(within(getAnalyzedTextContainer()).getByText(/Katzen/)).toBeInTheDocument()
    })
    expect(screen.queryByRole('button', { name: /^Katzen/ })).not.toBeInTheDocument()
  })

  it('shows an empty-result message when nothing is flagged', async () => {
    const user = userEvent.setup()
    render(<TextAnalyzer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'der ist ein')
    await user.click(screen.getByRole('button', { name: 'Аналізувати' }))

    expect(
      await screen.findByText('Складних слів не знайдено — текст складається переважно з поширеної лексики.'),
    ).toBeInTheDocument()
  })

  it('lets you cancel the add-word form without saving', async () => {
    const user = userEvent.setup()
    render(<TextAnalyzer />)

    await user.type(screen.getByPlaceholderText(PLACEHOLDER), 'Katzen sind toll')
    await user.click(screen.getByRole('button', { name: 'Аналізувати' }))

    const flaggedWord = await screen.findByRole('button', { name: /Katzen/ })
    await user.click(flaggedWord)
    expect(screen.getByLabelText('Слово')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Скасувати' }))
    expect(screen.queryByLabelText('Слово')).not.toBeInTheDocument()
    expect(await wordsRepository.getByLanguage('de')).toHaveLength(0)
  })
})
