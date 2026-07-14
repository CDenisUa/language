// Core
import { useMemo, useState } from 'react'
// Components
import WordForm from '@/pages/Vocabulary/WordForm'
import ReviewCard from '@/pages/Vocabulary/ReviewCard'
import WordList from '@/pages/Vocabulary/WordList'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useWords } from '@/hooks/useWords'
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { wordsRepository } from '@/services/db/wordsRepository'
import { createNewCard, isDue, scheduleReview } from '@/services/fsrs/fsrsScheduler'
// Types
import type { Grade } from '@/services/fsrs/fsrsScheduler'
import type { WordRecord } from '@/types/word'
import type { WordFormValues } from '@/pages/Vocabulary/WordForm'

function toOptional(value: string): string | undefined {
  const trimmed = value.trim()
  return trimmed === '' ? undefined : trimmed
}

function Vocabulary() {
  const { t } = useTranslation()
  const activeLanguage = useLanguageStore((state) => state.activeLanguage)
  const { words, reload } = useWords(activeLanguage)
  const [editingWord, setEditingWord] = useState<WordRecord | null>(null)
  const [austrianOnly, setAustrianOnly] = useState(false)

  const dueWords = useMemo(() => {
    const due = words.filter((word) => isDue(word.fsrs))
    const filtered = austrianOnly ? due.filter((word) => word.austrianVariant) : due
    return [...filtered].sort((a, b) => a.fsrs.due.getTime() - b.fsrs.due.getTime())
  }, [words, austrianOnly])

  const currentReviewWord = dueWords[0] ?? null

  const handleSave = async (values: WordFormValues) => {
    await wordsRepository.save({
      id: editingWord?.id,
      language: activeLanguage,
      fsrs: editingWord?.fsrs ?? createNewCard(),
      front: values.front.trim(),
      back: values.back.trim(),
      example: toOptional(values.example),
      grammar: toOptional(values.grammar),
      austrianVariant: toOptional(values.austrianVariant),
    })
    setEditingWord(null)
    await reload()
  }

  const handleDelete = async (word: WordRecord) => {
    await wordsRepository.remove(word.id)
    if (editingWord?.id === word.id) setEditingWord(null)
    await reload()
  }

  const handleRate = async (grade: Grade) => {
    if (!currentReviewWord) return
    const updatedCard = scheduleReview(currentReviewWord.fsrs, grade)
    await wordsRepository.save({ ...currentReviewWord, fsrs: updatedCard })
    await reload()
  }

  return (
    <section className="vocabulary-page">
      <h1>{t.pages.vocabulary.title}</h1>
      <p>{t.pages.vocabulary.description}</p>

      <WordForm
        language={activeLanguage}
        editingWord={editingWord}
        onSave={handleSave}
        onCancelEdit={() => setEditingWord(null)}
      />

      {currentReviewWord ? (
        <ReviewCard word={currentReviewWord} language={activeLanguage} onRate={handleRate} />
      ) : (
        <p>{t.vocabulary.noDueWords}</p>
      )}

      <WordList
        words={words}
        austrianOnly={austrianOnly}
        onAustrianOnlyChange={setAustrianOnly}
        onEdit={setEditingWord}
        onDelete={handleDelete}
      />
    </section>
  )
}

export default Vocabulary
