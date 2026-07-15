// Services
import { createNewCard, scheduleReview } from '@/services/fsrs/fsrsScheduler'
import { deriveGradeFromScore } from '@/services/grammarReview/deriveGradeFromScore'
import { grammarTopicReviewsRepository } from '@/services/db/grammarTopicReviewsRepository'

export async function scheduleTopicReview(
  topicId: string,
  correctCount: number,
  total: number,
  now: Date = new Date(),
): Promise<void> {
  const existing = await grammarTopicReviewsRepository.getById(topicId)
  const card = existing?.fsrs ?? createNewCard(now)
  const grade = deriveGradeFromScore(correctCount, total)
  const updatedCard = scheduleReview(card, grade, now)
  await grammarTopicReviewsRepository.save({ id: topicId, topicId, fsrs: updatedCard })
}
