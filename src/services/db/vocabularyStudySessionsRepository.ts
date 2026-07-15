// Services
import { getDatabase } from '@/services/db/database'
import { createRepository } from '@/services/db/createRepository'
// Types
import type { Language } from '@/types/language'

export const vocabularyStudySessionsRepository = {
  ...createRepository('vocabularyStudySessions'),

  async getByLanguage(language: Language) {
    const db = await getDatabase()
    return db.getAllFromIndex('vocabularyStudySessions', 'by-language', language)
  },
}
