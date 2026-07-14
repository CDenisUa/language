// Core
import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Components
import Vocabulary from '@/pages/Vocabulary/Vocabulary'
// Services
import { wordsRepository } from '@/services/db/wordsRepository'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useLocaleStore } from '@/hooks/useLocaleStore'

function getWordListContainer() {
  return screen.getByRole('heading', { name: 'Усі слова' }).closest('.word-list') as HTMLElement
}

async function addWord(
  user: ReturnType<typeof userEvent.setup>,
  { front, back, austrianVariant }: { front: string; back: string; austrianVariant?: string },
) {
  await user.type(screen.getByLabelText('Слово'), front)
  await user.type(screen.getByLabelText('Переклад'), back)
  if (austrianVariant) {
    await user.type(screen.getByLabelText('Австрійський варіант'), austrianVariant)
  }
  await user.click(screen.getByRole('button', { name: 'Зберегти' }))
  await waitFor(() => {
    expect(within(getWordListContainer()).getByText(back)).toBeInTheDocument()
  })
}

describe('Vocabulary', () => {
  beforeEach(async () => {
    await wordsRepository.clear()
    useLanguageStore.setState({ activeLanguage: 'de' })
    useLocaleStore.setState({ locale: 'uk' })
  })

  it('adds a new word, shows it for review, and reschedules it after rating', async () => {
    const user = userEvent.setup()
    render(<Vocabulary />)

    await addWord(user, { front: 'Kartoffel', back: 'potato', austrianVariant: 'Erdapfel' })

    const wordListItem = within(getWordListContainer()).getByText('potato').closest('li')!
    expect(within(wordListItem).getByText('Kartoffel')).toBeInTheDocument()
    expect(within(wordListItem).getByText('Erdapfel')).toBeInTheDocument()

    const reviewCard = screen.getByRole('heading', { name: 'Повторення' }).closest('.review-card') as HTMLElement
    expect(within(reviewCard).getByText('Kartoffel')).toBeInTheDocument()

    await user.click(within(reviewCard).getByRole('button', { name: 'Показати відповідь' }))
    expect(within(reviewCard).getByText('potato')).toBeInTheDocument()

    await user.click(within(reviewCard).getByRole('button', { name: 'Добре' }))

    await waitFor(() => {
      expect(screen.getByText('Зараз нічого повторювати')).toBeInTheDocument()
    })

    const words = await wordsRepository.getByLanguage('de')
    expect(words).toHaveLength(1)
    expect(words[0].fsrs.reps).toBe(1)
    expect(words[0].fsrs.due.getTime()).toBeGreaterThan(Date.now())
  })

  it('filters the word list to Austrian-tagged words only', async () => {
    const user = userEvent.setup()
    render(<Vocabulary />)

    await addWord(user, { front: 'Haus', back: 'house' })
    await addWord(user, { front: 'Kartoffel', back: 'potato', austrianVariant: 'Erdapfel' })

    const listContainer = getWordListContainer()
    expect(within(listContainer).getByText('Haus')).toBeInTheDocument()
    expect(within(listContainer).getByText('Kartoffel')).toBeInTheDocument()

    await user.click(within(listContainer).getByLabelText('Тільки з австрійським варіантом'))

    expect(within(listContainer).queryByText('Haus')).not.toBeInTheDocument()
    expect(within(listContainer).getByText('Kartoffel')).toBeInTheDocument()
  })

  it('deletes a word', async () => {
    const user = userEvent.setup()
    render(<Vocabulary />)

    await addWord(user, { front: 'Tisch', back: 'table' })

    const listContainer = getWordListContainer()
    await user.click(within(listContainer).getByRole('button', { name: 'Видалити' }))

    await waitFor(() => {
      expect(within(getWordListContainer()).getByText('Поки немає жодного слова — додайте перше.')).toBeInTheDocument()
    })
    expect(await wordsRepository.getByLanguage('de')).toHaveLength(0)
  })
})
