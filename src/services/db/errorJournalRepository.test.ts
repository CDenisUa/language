// Core
import { beforeEach, describe, expect, it } from 'vitest'
// Services
import { errorJournalRepository } from '@/services/db/errorJournalRepository'

describe('errorJournalRepository', () => {
  beforeEach(async () => {
    await errorJournalRepository.clear()
  })

  it('saves a new entry with a generated id and matching created/updated timestamps', async () => {
    const saved = await errorJournalRepository.save({
      language: 'de',
      category: 'grammar',
      mistake: 'Ich habe gegeht',
      correction: 'Ich bin gegangen',
    })

    expect(saved.id).toBeTruthy()
    expect(saved.createdAt).toBe(saved.updatedAt)

    const fetched = await errorJournalRepository.getById(saved.id)
    expect(fetched?.mistake).toBe('Ich habe gegeht')
    expect(fetched?.correction).toBe('Ich bin gegangen')
  })

  it('saves an entry with an optional link to another record', async () => {
    const saved = await errorJournalRepository.save({
      language: 'de',
      category: 'vocabulary',
      mistake: 'der Erdapfel',
      correction: 'der Erdapfel (Austrian) / die Kartoffel',
      note: 'Mixed up gender',
      linkedRecordId: 'word-1',
      linkedRecordType: 'word',
    })

    expect(saved.linkedRecordId).toBe('word-1')
    expect(saved.linkedRecordType).toBe('word')
    expect(saved.note).toBe('Mixed up gender')
  })

  it('filters entries by language', async () => {
    await errorJournalRepository.save({
      language: 'de',
      category: 'grammar',
      mistake: 'a',
      correction: 'b',
    })
    await errorJournalRepository.save({
      language: 'en',
      category: 'grammar',
      mistake: 'c',
      correction: 'd',
    })

    const germanEntries = await errorJournalRepository.getByLanguage('de')

    expect(germanEntries).toHaveLength(1)
    expect(germanEntries[0].mistake).toBe('a')
  })

  it('removes an entry', async () => {
    const saved = await errorJournalRepository.save({
      language: 'de',
      category: 'other',
      mistake: 'x',
      correction: 'y',
    })

    await errorJournalRepository.remove(saved.id)

    expect(await errorJournalRepository.getById(saved.id)).toBeUndefined()
  })
})
