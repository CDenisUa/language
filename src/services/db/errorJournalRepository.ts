// Services
import { getDatabase } from '@/services/db/database'
import { createRepository } from '@/services/db/createRepository'
// Types
import type { Language } from '@/types/language'

export const errorJournalRepository = {
  ...createRepository('errorJournalEntries'),

  async getByLanguage(language: Language) {
    const db = await getDatabase()
    return db.getAllFromIndex('errorJournalEntries', 'by-language', language)
  },
}
