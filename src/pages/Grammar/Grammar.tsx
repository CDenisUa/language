// Core
import { useEffect, useMemo, useState } from 'react'
// Components
import GrammarTopicView from '@/pages/Grammar/GrammarTopicView'
// Hooks
import { useGrammarProgress } from '@/hooks/useGrammarProgress'
import { useGrammarTopicReviews } from '@/hooks/useGrammarTopicReviews'
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { grammarProgressRepository } from '@/services/db/grammarProgressRepository'
import { scheduleTopicReview } from '@/services/grammarReview/scheduleTopicReview'
import { isDue } from '@/services/fsrs/fsrsScheduler'
// Types
import type { GrammarCategory, GrammarCategoryId, GrammarTopic } from '@/types/grammarTopic'
// Consts
import { GRAMMAR_CATEGORIES } from '@/content/grammar'
// Styles
import './Grammar.css'

function findCategoryByTopicId(topicId: string) {
  return GRAMMAR_CATEGORIES.find((category) => category.topics.some((topic) => topic.id === topicId)) ?? null
}

function Grammar() {
  const { t } = useTranslation()
  const activeLanguage = useLanguageStore((state) => state.activeLanguage)
  const { progress, reload } = useGrammarProgress()
  const { reviews, reload: reloadReviews } = useGrammarTopicReviews()
  const [selectedCategoryId, setSelectedCategoryId] = useState<GrammarCategoryId | null>(null)
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)

  const categories = useMemo(
    () => GRAMMAR_CATEGORIES.filter((category) => category.language === activeLanguage),
    [activeLanguage],
  )

  useEffect(() => {
    setSelectedCategoryId(null)
    setSelectedTopicId(null)
  }, [activeLanguage])

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === selectedCategoryId) ?? null,
    [categories, selectedCategoryId],
  )
  const selectedTopic = useMemo(
    () => selectedCategory?.topics.find((topic) => topic.id === selectedTopicId) ?? null,
    [selectedCategory, selectedTopicId],
  )

  const dueTopics = useMemo(
    () =>
      reviews
        .filter((review) => isDue(review.fsrs))
        .map((review) => {
          const category = findCategoryByTopicId(review.topicId)
          const topic = category?.topics.find((candidate) => candidate.id === review.topicId)
          return topic && category ? { topic, category } : null
        })
        .filter((entry): entry is { topic: GrammarTopic; category: GrammarCategory } => entry !== null)
        .filter((entry) => entry.category.language === activeLanguage),
    [reviews, activeLanguage],
  )

  const handleAnswered = async (exerciseId: string, correct: boolean) => {
    if (!selectedTopic) return
    const wasFullyAnswered = progress.filter((record) => record.topicId === selectedTopic.id).length === selectedTopic.exercises.length
    await grammarProgressRepository.save({
      id: `${selectedTopic.id}:${exerciseId}`,
      topicId: selectedTopic.id,
      exerciseId,
      correct,
    })
    await reload()

    const updatedTopicProgress = await grammarProgressRepository.getByTopic(selectedTopic.id)
    const isNowFullyAnswered = updatedTopicProgress.length === selectedTopic.exercises.length
    if (!wasFullyAnswered && isNowFullyAnswered) {
      const correctCount = updatedTopicProgress.filter((record) => record.correct).length
      await scheduleTopicReview(selectedTopic.id, correctCount, selectedTopic.exercises.length)
      await reloadReviews()
    }
  }

  const openCategory = (categoryId: GrammarCategoryId) => {
    setSelectedCategoryId(categoryId)
    setSelectedTopicId(null)
  }

  const openTopicDirectly = (categoryId: GrammarCategoryId, topicId: string) => {
    setSelectedCategoryId(categoryId)
    setSelectedTopicId(topicId)
  }

  if (selectedTopic && selectedCategory) {
    const topicProgress = progress.filter((record) => record.topicId === selectedTopic.id)
    return (
      <section className="grammar-page">
        <button type="button" className="grammar-page__back" onClick={() => setSelectedTopicId(null)}>
          {t.grammar.back} {selectedCategory.title}
        </button>
        <GrammarTopicView topic={selectedTopic} progress={topicProgress} onAnswered={handleAnswered} />
      </section>
    )
  }

  if (selectedCategory) {
    return (
      <section className="grammar-page">
        <button type="button" className="grammar-page__back" onClick={() => setSelectedCategoryId(null)}>
          {t.grammar.back} {t.grammar.allCategories}
        </button>
        <h1>{selectedCategory.title}</h1>
        <p>{selectedCategory.description}</p>
        <ul className="grammar-topic-list">
          {selectedCategory.topics.map((topic) => {
            const topicProgress = progress.filter((record) => record.topicId === topic.id)
            const correct = topicProgress.filter((record) => record.correct).length
            return (
              <li key={topic.id}>
                <button type="button" className="grammar-topic-list__item" onClick={() => setSelectedTopicId(topic.id)}>
                  <span className="grammar-topic-list__title">{topic.title}</span>
                  <span className="grammar-topic-list__progress">
                    {correct}/{topic.exercises.length}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  return (
    <section className="grammar-page">
      <h1>{t.pages.grammar.title}</h1>
      <p>{t.pages.grammar.description}</p>

      {dueTopics.length > 0 && (
        <div className="grammar-due">
          <h2 className="grammar-due__heading">{t.grammar.dueForReviewHeading}</h2>
          <ul className="grammar-due__list">
            {dueTopics.map(({ topic, category }) => (
              <li key={topic.id}>
                <button
                  type="button"
                  className="grammar-due__item"
                  onClick={() => openTopicDirectly(category.id, topic.id)}
                >
                  <span className="grammar-due__topic-title">{topic.title}</span>
                  <span className="grammar-due__category-title">{category.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grammar-categories">
        {categories.map((category) => {
          const topicIds = new Set(category.topics.map((topic) => topic.id))
          const total = category.topics.reduce((sum, topic) => sum + topic.exercises.length, 0)
          const correct = progress.filter((record) => record.correct && topicIds.has(record.topicId)).length
          return (
            <button
              key={category.id}
              type="button"
              className="grammar-category-card"
              onClick={() => openCategory(category.id)}
            >
              <h2 className="grammar-category-card__title">{category.title}</h2>
              <p className="grammar-category-card__description">{category.description}</p>
              <span className="grammar-category-card__progress">
                {correct}/{total} {t.grammar.progressLabel}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default Grammar
