// Services
import { getDatabase } from '@/services/db/database'
import { createRepository } from '@/services/db/createRepository'
// Types
import type { Language } from '@/types/language'

export const shadowingTracksRepository = {
  ...createRepository('shadowingTracks'),

  async getByLanguage(language: Language) {
    const db = await getDatabase()
    return db.getAllFromIndex('shadowingTracks', 'by-language', language)
  },
}
