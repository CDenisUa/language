// Core
import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Components
import Scheduler from '@/pages/Scheduler/Scheduler'
// Services
import { scheduleEventsRepository } from '@/services/db/scheduleEventsRepository'
// Hooks
import { useLocaleStore } from '@/hooks/useLocaleStore'

function getEventsContainer() {
  return screen.getByRole('heading', { name: 'Записи розкладу' }).closest('.scheduler-page__events') as HTMLElement
}

describe('Scheduler', () => {
  beforeEach(async () => {
    await scheduleEventsRepository.clear()
    useLocaleStore.setState({ locale: 'uk' })
  })

  it('shows "English available" when there is no German block today', async () => {
    render(<Scheduler />)

    await waitFor(() => {
      expect(screen.getByText('Англійська доступна зараз')).toBeInTheDocument()
    })
  })

  it('adds a recurring block and lists it', async () => {
    const user = userEvent.setup()
    render(<Scheduler />)

    await user.click(screen.getByRole('checkbox', { name: 'Пн' }))
    await user.click(screen.getByRole('checkbox', { name: 'Вт' }))
    await user.click(screen.getByRole('button', { name: 'Зберегти' }))

    await waitFor(() => {
      expect(within(getEventsContainer()).getByText(/DE · 1,2 · 09:00–13:00/)).toBeInTheDocument()
    })

    const events = await scheduleEventsRepository.getAll()
    expect(events).toHaveLength(1)
    expect(events[0].type).toBe('recurring')
  })

  it('adds a one-off exception event and lists it', async () => {
    const user = userEvent.setup()
    render(<Scheduler />)

    await user.click(screen.getByRole('radio', { name: 'Одноразовий виняток' }))
    await user.type(screen.getByLabelText('Дата'), '2026-07-16')

    const actionSelect = screen.getByLabelText('Дія') as HTMLSelectElement
    await user.selectOptions(actionSelect, 'add')

    await user.click(screen.getByRole('button', { name: 'Зберегти' }))

    await waitFor(() => {
      expect(within(getEventsContainer()).getByText(/2026-07-16 · add/)).toBeInTheDocument()
    })
  })

  it('deletes an event', async () => {
    await scheduleEventsRepository.save({
      type: 'recurring',
      language: 'de',
      daysOfWeek: [1, 2, 3, 4],
      startTime: '09:00',
      endTime: '13:00',
    })

    const user = userEvent.setup()
    render(<Scheduler />)

    const eventsContainer = getEventsContainer()
    await waitFor(() => {
      expect(within(eventsContainer).getByText(/DE · 1,2,3,4/)).toBeInTheDocument()
    })

    await user.click(within(eventsContainer).getByRole('button', { name: 'Видалити' }))

    await waitFor(() => {
      expect(within(getEventsContainer()).getByText('Розклад ще порожній — додайте перший запис.')).toBeInTheDocument()
    })
  })
})
