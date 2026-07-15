// Core
import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Components
import Grammar from '@/pages/Grammar/Grammar'
// Services
import { grammarProgressRepository } from '@/services/db/grammarProgressRepository'
import { grammarTopicReviewsRepository } from '@/services/db/grammarTopicReviewsRepository'
import { createNewCard } from '@/services/fsrs/fsrsScheduler'
// Hooks
import { useLocaleStore } from '@/hooks/useLocaleStore'
import { useLanguageStore } from '@/hooks/useLanguageStore'

async function openTopic(user: ReturnType<typeof userEvent.setup>) {
  const categoryHeading = screen.getByRole('heading', { name: 'Система часів і аспектів', level: 2 })
  await user.click(categoryHeading.closest('button')!)

  const topicButton = screen.getByText('Present Simple').closest('button')!
  await user.click(topicButton)
}

describe('Grammar', () => {
  beforeEach(async () => {
    await grammarProgressRepository.clear()
    await grammarTopicReviewsRepository.clear()
    useLocaleStore.setState({ locale: 'uk' })
    useLanguageStore.setState({ activeLanguage: 'en' })
  })

  it('shows only English grammar categories while English is the active study language', () => {
    render(<Grammar />)

    expect(screen.getByRole('heading', { name: 'Система часів і аспектів', level: 2 })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Відмінки (Kasus)', level: 2 })).not.toBeInTheDocument()
  })

  it('shows only German grammar categories while German is the active study language', () => {
    useLanguageStore.setState({ activeLanguage: 'de' })
    render(<Grammar />)

    expect(screen.getByRole('heading', { name: 'Відмінки (Kasus)', level: 2 })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Система часів і аспектів', level: 2 })).not.toBeInTheDocument()
  })

  it('shows category cards on the initial view', () => {
    render(<Grammar />)

    expect(screen.getByRole('heading', { name: 'Граматика', level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Система часів і аспектів', level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Модальні дієслова', level: 2 })).toBeInTheDocument()
  })

  it('navigates from category to topic list to a topic and shows its theory and exercises', async () => {
    const user = userEvent.setup()
    render(<Grammar />)

    await openTopic(user)

    expect(screen.getByRole('heading', { name: 'Present Simple', level: 2 })).toBeInTheDocument()
    expect(screen.getByText(/Present Simple описує звички/)).toBeInTheDocument()
    expect(screen.getByText('She works as a teacher in Graz.')).toBeInTheDocument()
  })

  it('checks a multiple-choice exercise, shows feedback, and persists correct progress', async () => {
    const user = userEvent.setup()
    render(<Grammar />)
    await openTopic(user)

    const exerciseItem = screen.getByText('She ___ football every Sunday.').closest('li')!
    await user.click(within(exerciseItem).getByRole('button', { name: 'plays' }))

    expect(within(exerciseItem).getByText(/Правильно/)).toBeInTheDocument()

    await waitFor(async () => {
      const progress = await grammarProgressRepository.getByTopic('present-simple')
      expect(progress.find((record) => record.exerciseId === 'ps-1')).toMatchObject({ correct: true })
    })
  })

  it('marks an incorrect multiple-choice answer and still records progress', async () => {
    const user = userEvent.setup()
    render(<Grammar />)
    await openTopic(user)

    const exerciseItem = screen.getByText('___ you speak German?').closest('li')!
    await user.click(within(exerciseItem).getByRole('button', { name: 'Does' }))

    expect(within(exerciseItem).getByText(/Неправильно/)).toBeInTheDocument()

    await waitFor(async () => {
      const progress = await grammarProgressRepository.getByTopic('present-simple')
      expect(progress.find((record) => record.exerciseId === 'ps-2')).toMatchObject({ correct: false })
    })
  })

  it('checks a fill-blank exercise by typing an answer', async () => {
    const user = userEvent.setup()
    render(<Grammar />)
    await openTopic(user)

    const exerciseItem = screen.getByText('The train ___ (leave) at 9 a.m. every day.').closest('li')!
    await user.type(within(exerciseItem).getByRole('textbox'), 'Leaves')
    await user.click(within(exerciseItem).getByRole('button', { name: 'Перевірити' }))

    expect(within(exerciseItem).getByText(/Правильно/)).toBeInTheDocument()
  })

  it('shows a persisted progress badge after navigating back to the topic list', async () => {
    const user = userEvent.setup()
    render(<Grammar />)
    await openTopic(user)

    const exerciseItem = screen.getByText('She ___ football every Sunday.').closest('li')!
    await user.click(within(exerciseItem).getByRole('button', { name: 'plays' }))

    await waitFor(async () => {
      const progress = await grammarProgressRepository.getByTopic('present-simple')
      expect(progress).toHaveLength(1)
    })

    await user.click(screen.getByRole('button', { name: /Система часів і аспектів/ }))

    const topicListItem = screen.getByText('Present Simple').closest('button')!
    expect(within(topicListItem).getByText('1/5')).toBeInTheDocument()
  })

  it('shows an engVid search link for the current topic', async () => {
    const user = userEvent.setup()
    render(<Grammar />)
    await openTopic(user)

    const link = screen.getByRole('link', { name: /engVid/ })
    expect(link).toHaveAttribute('href', 'https://www.engvid.com/?s=Present%20Simple')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('schedules a topic review once all of its exercises have been answered', async () => {
    const user = userEvent.setup()
    render(<Grammar />)
    await openTopic(user)

    await user.click(within(screen.getByText('She ___ football every Sunday.').closest('li')!).getByRole('button', { name: 'plays' }))
    await user.click(within(screen.getByText('___ you speak German?').closest('li')!).getByRole('button', { name: 'Do' }))
    await user.type(within(screen.getByText('The train ___ (leave) at 9 a.m. every day.').closest('li')!).getByRole('textbox'), 'leaves')
    await user.click(within(screen.getByText('The train ___ (leave) at 9 a.m. every day.').closest('li')!).getByRole('button', { name: 'Перевірити' }))
    await user.click(within(screen.getByText("He ___ like coffee, he prefers tea.").closest('li')!).getByRole('button', { name: "doesn't" }))
    await user.type(within(screen.getByText('A: You never call me. B: I ___ call you, you never answer!').closest('li')!).getByRole('textbox'), 'do')
    await user.click(within(screen.getByText('A: You never call me. B: I ___ call you, you never answer!').closest('li')!).getByRole('button', { name: 'Перевірити' }))

    await waitFor(async () => {
      const review = await grammarTopicReviewsRepository.getById('present-simple')
      expect(review).toBeDefined()
    })
  })

  it('shows a due-for-review entry on the main page and jumps straight into the topic when clicked', async () => {
    await grammarTopicReviewsRepository.save({
      id: 'present-simple',
      topicId: 'present-simple',
      fsrs: createNewCard(),
    })

    const user = userEvent.setup()
    render(<Grammar />)

    expect(await screen.findByRole('heading', { name: 'Час повторити' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Present Simple/ }))

    expect(screen.getByRole('heading', { name: 'Present Simple', level: 2 })).toBeInTheDocument()
  })
})
