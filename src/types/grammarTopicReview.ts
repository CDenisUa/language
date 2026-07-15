// Types
import type { Card } from 'ts-fsrs'

export interface GrammarTopicReviewRecord {
  id: string
  topicId: string
  fsrs: Card
  createdAt: string
  updatedAt: string
}
