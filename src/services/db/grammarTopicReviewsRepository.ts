// Services
import { createRepository } from '@/services/db/createRepository'

export const grammarTopicReviewsRepository = {
  ...createRepository('grammarTopicReviews'),
}
