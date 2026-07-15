// Core
import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Components
import Shadowing from '@/pages/Shadowing/Shadowing'
// Services
import { shadowingTracksRepository } from '@/services/db/shadowingTracksRepository'
import { shadowingSessionsRepository } from '@/services/db/shadowingSessionsRepository'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useLocaleStore } from '@/hooks/useLocaleStore'

function getTrackListContainer() {
  return screen.getByRole('heading', { name: 'Мої записи' }).closest('.track-list') as HTMLElement
}

async function uploadTrack(user: ReturnType<typeof userEvent.setup>, title: string) {
  await user.type(screen.getByLabelText('Назва'), title)
  const file = new File(['fake-audio-bytes'], 'clip.mp3', { type: 'audio/mpeg' })
  await user.upload(screen.getByLabelText('Аудіофайл'), file)
  await user.click(screen.getByRole('button', { name: 'Завантажити' }))
  await waitFor(() => {
    expect(within(getTrackListContainer()).getByText(title)).toBeInTheDocument()
  })
}

describe('Shadowing', () => {
  beforeEach(async () => {
    await shadowingTracksRepository.clear()
    await shadowingSessionsRepository.clear()
    useLanguageStore.setState({ activeLanguage: 'de' })
    useLocaleStore.setState({ locale: 'uk' })
  })

  it('uploads a track and lists it', async () => {
    const user = userEvent.setup()
    render(<Shadowing />)

    await uploadTrack(user, 'Ö1 Interview')

    const tracks = await shadowingTracksRepository.getByLanguage('de')
    expect(tracks).toHaveLength(1)
    expect(tracks[0].title).toBe('Ö1 Interview')
  })

  it('opens practice view, rates the session, and saves it', async () => {
    const user = userEvent.setup()
    render(<Shadowing />)

    await uploadTrack(user, 'Ö1 Interview')

    await user.click(within(getTrackListContainer()).getByRole('button', { name: 'Практикувати' }))

    expect(screen.getByRole('heading', { name: 'Ö1 Interview' })).toBeInTheDocument()
    expect(screen.getByText('Цей браузер не підтримує розпізнавання мовлення — повторюйте вголос і оцініть спробу самостійно.')).toBeInTheDocument()

    const saveButton = screen.getByRole('button', { name: 'Зберегти спробу' })
    expect(saveButton).toBeDisabled()

    await user.click(screen.getByRole('button', { name: '4 / 5' }))
    expect(saveButton).toBeEnabled()

    await user.click(saveButton)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Мої записи' })).toBeInTheDocument()
    })

    const track = (await shadowingTracksRepository.getByLanguage('de'))[0]
    const sessions = await shadowingSessionsRepository.getByTrack(track.id)
    expect(sessions).toHaveLength(1)
    expect(sessions[0].rating).toBe(4)
  })

  it('deletes a track', async () => {
    const user = userEvent.setup()
    render(<Shadowing />)

    await uploadTrack(user, 'To delete')

    await user.click(within(getTrackListContainer()).getByRole('button', { name: 'Видалити' }))

    await waitFor(() => {
      expect(
        within(getTrackListContainer()).getByText('Поки немає жодного запису — завантажте перший.'),
      ).toBeInTheDocument()
    })
    expect(await shadowingTracksRepository.getByLanguage('de')).toHaveLength(0)
  })
})
