// Core
import { beforeEach, describe, expect, it } from 'vitest'
// Services
import { shadowingTracksRepository } from '@/services/db/shadowingTracksRepository'

function makeAudioBlob(): Blob {
  return new Blob(['fake-audio-bytes'], { type: 'audio/mpeg' })
}

describe('shadowingTracksRepository', () => {
  beforeEach(async () => {
    await shadowingTracksRepository.clear()
  })

  it('saves a new track with a generated id and matching created/updated timestamps', async () => {
    const saved = await shadowingTracksRepository.save({
      language: 'de',
      title: 'Ö1 Interview',
      audioBlob: makeAudioBlob(),
      mimeType: 'audio/mpeg',
    })

    expect(saved.id).toBeTruthy()
    expect(saved.createdAt).toBe(saved.updatedAt)

    const fetched = await shadowingTracksRepository.getById(saved.id)
    expect(fetched?.title).toBe('Ö1 Interview')
    expect(fetched?.audioBlob).toBeInstanceOf(Blob)
  })

  it('filters tracks by language', async () => {
    await shadowingTracksRepository.save({
      language: 'de',
      title: 'Deutsch track',
      audioBlob: makeAudioBlob(),
      mimeType: 'audio/mpeg',
    })
    await shadowingTracksRepository.save({
      language: 'en',
      title: 'English track',
      audioBlob: makeAudioBlob(),
      mimeType: 'audio/mpeg',
    })

    const germanTracks = await shadowingTracksRepository.getByLanguage('de')

    expect(germanTracks).toHaveLength(1)
    expect(germanTracks[0].title).toBe('Deutsch track')
  })

  it('removes a track', async () => {
    const saved = await shadowingTracksRepository.save({
      language: 'de',
      title: 'To delete',
      audioBlob: makeAudioBlob(),
      mimeType: 'audio/mpeg',
    })

    await shadowingTracksRepository.remove(saved.id)

    expect(await shadowingTracksRepository.getById(saved.id)).toBeUndefined()
  })
})
