// Core
import { describe, expect, it } from 'vitest'
// Services
import { getDatabase } from '@/services/db/database'

describe('getDatabase', () => {
  it('creates the words store with a by-language index', async () => {
    const db = await getDatabase()

    expect(db.objectStoreNames.contains('words')).toBe(true)

    const tx = db.transaction('words', 'readonly')
    expect(tx.store.indexNames.contains('by-language')).toBe(true)
  })

  it('creates the scheduleEvents store', async () => {
    const db = await getDatabase()

    expect(db.objectStoreNames.contains('scheduleEvents')).toBe(true)
  })

  it('creates the shadowingTracks store with a by-language index', async () => {
    const db = await getDatabase()

    expect(db.objectStoreNames.contains('shadowingTracks')).toBe(true)

    const tx = db.transaction('shadowingTracks', 'readonly')
    expect(tx.store.indexNames.contains('by-language')).toBe(true)
  })

  it('creates the shadowingSessions store with a by-track index', async () => {
    const db = await getDatabase()

    expect(db.objectStoreNames.contains('shadowingSessions')).toBe(true)

    const tx = db.transaction('shadowingSessions', 'readonly')
    expect(tx.store.indexNames.contains('by-track')).toBe(true)
  })

  it('creates the errorJournalEntries store with a by-language index', async () => {
    const db = await getDatabase()

    expect(db.objectStoreNames.contains('errorJournalEntries')).toBe(true)

    const tx = db.transaction('errorJournalEntries', 'readonly')
    expect(tx.store.indexNames.contains('by-language')).toBe(true)
  })

  it('creates the vocabularyStudySessions store with a by-language index', async () => {
    const db = await getDatabase()

    expect(db.objectStoreNames.contains('vocabularyStudySessions')).toBe(true)

    const tx = db.transaction('vocabularyStudySessions', 'readonly')
    expect(tx.store.indexNames.contains('by-language')).toBe(true)
  })
})
