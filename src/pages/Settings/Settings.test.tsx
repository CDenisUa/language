// Core
import { createEmptyCard } from 'ts-fsrs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Components
import Settings from '@/pages/Settings/Settings'
// Services
import * as backupService from '@/services/backup/backupService'
import { wordsRepository } from '@/services/db/wordsRepository'
// Hooks
import { useLocaleStore } from '@/hooks/useLocaleStore'
import { useStudyBalanceStore } from '@/hooks/useStudyBalanceStore'
// Consts
import { DEFAULT_TARGET_GERMAN_PERCENT } from '@/consts/dashboard'

describe('Settings', () => {
  beforeEach(async () => {
    await wordsRepository.clear()
    useLocaleStore.setState({ locale: 'uk' })
    useStudyBalanceStore.setState({ targetGermanPercent: DEFAULT_TARGET_GERMAN_PERCENT })
    vi.restoreAllMocks()
  })

  it('exports the current data as a backup file', async () => {
    const downloadSpy = vi.spyOn(backupService, 'downloadBackup').mockImplementation(() => {})
    const user = userEvent.setup()
    render(<Settings />)

    await user.click(screen.getByRole('button', { name: 'Експортувати дані (JSON)' }))

    await waitFor(() => {
      expect(downloadSpy).toHaveBeenCalledTimes(1)
    })
    const backup = downloadSpy.mock.calls[0][0]
    expect(backup.schemaVersion).toBeGreaterThan(0)
    expect(Array.isArray(backup.words)).toBe(true)
  })

  it('shows a confirmation before restoring a valid backup file, then restores it', async () => {
    await wordsRepository.save({ language: 'de', front: 'Old', back: 'old', fsrs: createEmptyCard() })
    const backup = await backupService.createBackup()
    backup.words = [
      {
        id: 'restored-word',
        language: 'de',
        front: 'Restored',
        back: 'restored',
        fsrs: createEmptyCard(),
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ]
    const file = new File([JSON.stringify(backup)], 'backup.json', { type: 'application/json' })

    const user = userEvent.setup()
    render(<Settings />)

    await user.upload(screen.getByLabelText('Обрати файл для відновлення'), file)

    expect(await screen.findByText(/Це замінить усі поточні дані/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Так, відновити' }))

    await waitFor(() => {
      expect(screen.getByText('Дані відновлено.')).toBeInTheDocument()
    })

    const words = await wordsRepository.getAll()
    expect(words).toHaveLength(1)
    expect(words[0].front).toBe('Restored')
  })

  it('cancels a pending import without changing existing data', async () => {
    await wordsRepository.save({ language: 'de', front: 'Keep me', back: 'keep', fsrs: createEmptyCard() })
    const backup = await backupService.createBackup()
    const file = new File([JSON.stringify(backup)], 'backup.json', { type: 'application/json' })

    const user = userEvent.setup()
    render(<Settings />)

    await user.upload(screen.getByLabelText('Обрати файл для відновлення'), file)
    expect(await screen.findByText(/Це замінить усі поточні дані/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Скасувати' }))

    expect(screen.queryByText(/Це замінить усі поточні дані/)).not.toBeInTheDocument()
    const words = await wordsRepository.getAll()
    expect(words[0].front).toBe('Keep me')
  })

  it('shows an error for a file that is not a valid backup', async () => {
    const file = new File(['not json'], 'backup.json', { type: 'application/json' })
    const user = userEvent.setup()
    render(<Settings />)

    await user.upload(screen.getByLabelText('Обрати файл для відновлення'), file)

    expect(await screen.findByText('Це не схоже на файл резервної копії Sprachlabor.')).toBeInTheDocument()
  })
})
