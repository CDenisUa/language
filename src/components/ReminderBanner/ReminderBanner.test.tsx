// Core
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Components
import ReminderBanner from '@/components/ReminderBanner/ReminderBanner'
// Hooks
import { useLocaleStore } from '@/hooks/useLocaleStore'
// Services
import { scheduleEventsRepository } from '@/services/db/scheduleEventsRepository'

const NOW = new Date('2026-07-16T19:00:00')

describe('ReminderBanner', () => {
  beforeEach(async () => {
    await scheduleEventsRepository.clear()
    window.localStorage.clear()
    useLocaleStore.setState({ locale: 'uk' })
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders nothing when there are no reminders', async () => {
    render(<ReminderBanner />)

    await waitFor(async () => {
      expect(await scheduleEventsRepository.getAll()).toEqual([])
    })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows a reminder for a labeled event starting soon, and dismisses it for good', async () => {
    await scheduleEventsRepository.save({
      type: 'exception',
      language: 'en',
      date: '2026-07-16',
      action: 'add',
      startTime: '19:30',
      endTime: '20:30',
      label: 'Mi Casa, Graz',
    })

    const user = userEvent.setup()
    render(<ReminderBanner />)

    await waitFor(() => {
      expect(screen.getByText(/Mi Casa, Graz/)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Закрити нагадування' }))
    expect(screen.queryByText(/Mi Casa, Graz/)).not.toBeInTheDocument()

    render(<ReminderBanner />)
    await waitFor(async () => {
      expect(await scheduleEventsRepository.getAll()).toHaveLength(1)
    })
    expect(screen.queryByText(/Mi Casa, Graz/)).not.toBeInTheDocument()
  })

  it('does not show a reminder for an event outside the lead window', async () => {
    await scheduleEventsRepository.save({
      type: 'exception',
      language: 'en',
      date: '2026-07-16',
      action: 'add',
      startTime: '23:00',
      endTime: '23:30',
      label: 'Mi Casa, Graz',
    })

    render(<ReminderBanner />)

    await waitFor(async () => {
      expect(await scheduleEventsRepository.getAll()).toHaveLength(1)
    })
    expect(screen.queryByText(/Mi Casa, Graz/)).not.toBeInTheDocument()
  })
})
