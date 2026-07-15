// Services
import { getDatabase } from '@/services/db/database'
import { createRepository } from '@/services/db/createRepository'
// Types
import type { Language } from '@/types/language'
import type { KnownWordRecord } from '@/types/knownWord'

export const knownWordsRepository = {
  ...createRepository('knownWords'),

  async getByLanguage(language: Language): Promise<KnownWordRecord[]> {
    const db = await getDatabase()
    return db.getAllFromIndex('knownWords', 'by-language', language)
  },
}
