// Core
import { useCallback, useEffect, useState } from 'react'
// Services
import { grammarTopicReviewsRepository } from '@/services/db/grammarTopicReviewsRepository'
// Types
import type { GrammarTopicReviewRecord } from '@/types/grammarTopicReview'

export function useGrammarTopicReviews() {
  const [reviews, setReviews] = useState<GrammarTopicReviewRecord[]>([])

  const reload = useCallback(async () => {
    setReviews(await grammarTopicReviewsRepository.getAll())
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { reviews, reload }
}
