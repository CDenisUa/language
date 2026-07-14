// Core
import { createEmptyCard } from 'ts-fsrs'
import { beforeEach, describe, expect, it } from 'vitest'
// Services
import { wordsRepository } from '@/services/db/wordsRepository'

describe('wordsRepository', () => {
  beforeEach(async () => {
    await wordsRepository.clear()
  })

  it('saves a new word with a generated id and matching created/updated timestamps', async () => {
    const saved = await wordsRepository.save({
      language: 'de',
      front: 'Kartoffel',
      back: 'potato',
      austrianVariant: 'Erdapfel',
      fsrs: createEmptyCard(),
    })

    expect(saved.id).toBeTruthy()
    expect(saved.createdAt).toBe(saved.updatedAt)

    const fetched = await wordsRepository.getById(saved.id)
    expect(fetched?.front).toBe('Kartoffel')
    expect(fetched?.austrianVariant).toBe('Erdapfel')
  })

  it('preserves createdAt and bumps updatedAt when saving over an existing word', async () => {
    const saved = await wordsRepository.save({
      language: 'en',
      front: 'ubiquitous',
      back: 'вездесущий',
      fsrs: createEmptyCard(),
    })

    const updated = await wordsRepository.save({ ...saved, back: 'повсюдний' })

    expect(updated.id).toBe(saved.id)
    expect(updated.createdAt).toBe(saved.createdAt)

    const all = await wordsRepository.getAll()
    expect(all).toHaveLength(1)
  })

  it('filters words by language', async () => {
    await wordsRepository.save({ language: 'de', front: 'Haus', back: 'house', fsrs: createEmptyCard() })
    await wordsRepository.save({ language: 'en', front: 'house', back: 'дім', fsrs: createEmptyCard() })

    const germanWords = await wordsRepository.getByLanguage('de')

    expect(germanWords).toHaveLength(1)
    expect(germanWords[0].front).toBe('Haus')
  })

  it('removes a word', async () => {
    const saved = await wordsRepository.save({
      language: 'de',
      front: 'Tisch',
      back: 'table',
      fsrs: createEmptyCard(),
    })

    await wordsRepository.remove(saved.id)

    expect(await wordsRepository.getById(saved.id)).toBeUndefined()
  })
})
