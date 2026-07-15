// Core
import { createEmptyCard } from 'ts-fsrs'
import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Components
import ErrorJournal from '@/pages/ErrorJournal/ErrorJournal'
// Services
import { errorJournalRepository } from '@/services/db/errorJournalRepository'
import { wordsRepository } from '@/services/db/wordsRepository'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useLocaleStore } from '@/hooks/useLocaleStore'

function getEntryListContainer() {
  return screen.getByRole('heading', { name: 'Записи' }).closest('.error-entry-list') as HTMLElement
}

async function addEntry(
  user: ReturnType<typeof userEvent.setup>,
  { mistake, correction }: { mistake: string; correction: string },
) {
  await user.type(screen.getByLabelText('Помилка'), mistake)
  await user.type(screen.getByLabelText('Правильний варіант'), correction)
  await user.click(screen.getByRole('button', { name: 'Зберегти' }))
  await waitFor(() => {
    expect(within(getEntryListContainer()).getByText(correction)).toBeInTheDocument()
  })
}

describe('ErrorJournal', () => {
  beforeEach(async () => {
    await errorJournalRepository.clear()
    await wordsRepository.clear()
    useLanguageStore.setState({ activeLanguage: 'de' })
    useLocaleStore.setState({ locale: 'uk' })
  })

  it('adds an entry and shows it in the list with its category', async () => {
    const user = userEvent.setup()
    render(<ErrorJournal />)

    await addEntry(user, { mistake: 'Ich habe gegeht', correction: 'Ich bin gegangen' })

    const listItem = within(getEntryListContainer()).getByText('Ich bin gegangen').closest('li')!
    expect(within(listItem).getByText('Ich habe gegeht')).toBeInTheDocument()
    expect(within(listItem).getByText('Граматика')).toBeInTheDocument()

    const entries = await errorJournalRepository.getByLanguage('de')
    expect(entries).toHaveLength(1)
    expect(entries[0].category).toBe('grammar')
  })

  it('links an entry to an existing word and shows the link in the list', async () => {
    await wordsRepository.save({
      language: 'de',
      front: 'Kartoffel',
      back: 'potato',
      fsrs: createEmptyCard(),
    })

    const user = userEvent.setup()
    render(<ErrorJournal />)

    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Слово: Kartoffel' })).toBeInTheDocument()
    })
    await user.selectOptions(screen.getByLabelText('Пов’язати з'), 'Слово: Kartoffel')
    await addEntry(user, { mistake: 'der Erdapfel', correction: 'die Kartoffel' })

    const listItem = within(getEntryListContainer()).getByText('die Kartoffel').closest('li')!
    expect(within(listItem).getByText('🔗 Слово: Kartoffel')).toBeInTheDocument()

    const entries = await errorJournalRepository.getByLanguage('de')
    expect(entries[0].linkedRecordType).toBe('word')
  })

  it('edits an entry', async () => {
    const user = userEvent.setup()
    render(<ErrorJournal />)

    await addEntry(user, { mistake: 'a', correction: 'b' })

    const listItem = within(getEntryListContainer()).getByText('b').closest('li')!
    await user.click(within(listItem).getByRole('button', { name: 'Редагувати' }))

    const correctionInput = screen.getByLabelText('Правильний варіант')
    await user.clear(correctionInput)
    await user.type(correctionInput, 'c')
    await user.click(screen.getByRole('button', { name: 'Зберегти' }))

    await waitFor(() => {
      expect(within(getEntryListContainer()).getByText('c')).toBeInTheDocument()
    })
    expect(await errorJournalRepository.getByLanguage('de')).toHaveLength(1)
  })

  it('deletes an entry', async () => {
    const user = userEvent.setup()
    render(<ErrorJournal />)

    await addEntry(user, { mistake: 'x', correction: 'y' })

    await user.click(within(getEntryListContainer()).getByRole('button', { name: 'Видалити' }))

    await waitFor(() => {
      expect(
        within(getEntryListContainer()).getByText('Поки немає жодного запису — додайте перший.'),
      ).toBeInTheDocument()
    })
    expect(await errorJournalRepository.getByLanguage('de')).toHaveLength(0)
  })
})
