// Services
import { getDatabase } from '@/services/db/database'
import { createRepository } from '@/services/db/createRepository'
// Types
import type { Language } from '@/types/language'
import type { WordRecord } from '@/types/word'

export const wordsRepository = {
  ...createRepository('words'),

  async getByLanguage(language: Language): Promise<WordRecord[]> {
    const db = await getDatabase()
    return db.getAllFromIndex('words', 'by-language', language)
  },
}
