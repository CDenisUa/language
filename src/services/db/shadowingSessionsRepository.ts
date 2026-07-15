// Services
import { getDatabase } from '@/services/db/database'
import { createRepository } from '@/services/db/createRepository'

export const shadowingSessionsRepository = {
  ...createRepository('shadowingSessions'),

  async getByTrack(trackId: string) {
    const db = await getDatabase()
    return db.getAllFromIndex('shadowingSessions', 'by-track', trackId)
  },
}
