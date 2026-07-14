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
})
