// Core
import { useMemo, useState } from 'react'
// Components
import GrammarTopicView from '@/pages/Grammar/GrammarTopicView'
// Hooks
import { useGrammarProgress } from '@/hooks/useGrammarProgress'
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { grammarProgressRepository } from '@/services/db/grammarProgressRepository'
// Types
import type { GrammarCategoryId } from '@/types/grammarTopic'
// Consts
import { GRAMMAR_CATEGORIES } from '@/content/grammar'
// Styles
import './Grammar.css'

function Grammar() {
  const { t } = useTranslation()
  const { progress, reload } = useGrammarProgress()
  const [selectedCategoryId, setSelectedCategoryId] = useState<GrammarCategoryId | null>(null)
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)

  const selectedCategory = useMemo(
    () => GRAMMAR_CATEGORIES.find((category) => category.id === selectedCategoryId) ?? null,
    [selectedCategoryId],
  )
  const selectedTopic = useMemo(
    () => selectedCategory?.topics.find((topic) => topic.id === selectedTopicId) ?? null,
    [selectedCategory, selectedTopicId],
  )

  const handleAnswered = async (exerciseId: string, correct: boolean) => {
    if (!selectedTopic) return
    await grammarProgressRepository.save({
      id: `${selectedTopic.id}:${exerciseId}`,
      topicId: selectedTopic.id,
      exerciseId,
      correct,
    })
    await reload()
  }

  const openCategory = (categoryId: GrammarCategoryId) => {
    setSelectedCategoryId(categoryId)
    setSelectedTopicId(null)
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
      <div className="grammar-categories">
        {GRAMMAR_CATEGORIES.map((category) => {
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
