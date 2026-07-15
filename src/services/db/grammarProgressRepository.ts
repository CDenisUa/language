// Services
import { getDatabase } from '@/services/db/database'
import { createRepository } from '@/services/db/createRepository'
// Types
import type { GrammarProgressRecord } from '@/types/grammarProgress'

export const grammarProgressRepository = {
  ...createRepository('grammarProgress'),

  async getByTopic(topicId: string): Promise<GrammarProgressRecord[]> {
    const db = await getDatabase()
    return db.getAllFromIndex('grammarProgress', 'by-topic', topicId)
  },
}
