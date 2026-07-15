// Core
import { useCallback, useEffect, useRef, useState } from 'react'
// Components
import WordForm from '@/pages/Vocabulary/WordForm'
// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { getWordsForLevel } from '@/services/wordLevels/getWordsForLevel'
import { knownWordsRepository } from '@/services/db/knownWordsRepository'
import { wordsRepository } from '@/services/db/wordsRepository'
import { createNewCard } from '@/services/fsrs/fsrsScheduler'
// Types
import type { Language } from '@/types/language'
import type { CefrLevel } from '@/types/cefrLevel'
import type { KnownWordRecord } from '@/types/knownWord'
import type { WordFormValues } from '@/pages/Vocabulary/WordForm'
// Consts
import { WORD_LEVEL_BATCH_SIZE } from '@/consts/cefrWordLevels'
// Styles
import './WordLevelSession.css'

interface WordLevelSessionProps {
  language: Language
  level: CefrLevel
  knownWords: KnownWordRecord[]
  onKnownWordsChange: () => Promise<void> | void
}

function WordLevelSession({ language, level, knownWords, onKnownWordsChange }: WordLevelSessionProps) {
  const { t } = useTranslation()
  const knownWordsRef = useRef(knownWords)
  const [batch, setBatch] = useState<string[] | null>(null)
  const [index, setIndex] = useState(0)
  const [knownThisRound, setKnownThisRound] = useState(0)
  const [addingWord, setAddingWord] = useState<string | null>(null)

  useEffect(() => {
    knownWordsRef.current = knownWords
  }, [knownWords])

  const startRound = useCallback(async () => {
    const excluded = new Set(knownWordsRef.current.map((word) => word.word.toLowerCase()))
    const words = await getWordsForLevel(language, level, excluded, WORD_LEVEL_BATCH_SIZE)
    setBatch(words)
    setIndex(0)
    setKnownThisRound(0)
    setAddingWord(null)
  }, [language, level])

  useEffect(() => {
    startRound()
  }, [startRound])

  const currentWord = batch?.[index]

  const advance = () => {
    setAddingWord(null)
    setIndex((prev) => prev + 1)
  }

  const handleKnow = async () => {
    if (!currentWord) return
    await knownWordsRepository.save({ language, word: currentWord, cefrLevel: level })
    await onKnownWordsChange()
    setKnownThisRound((prev) => prev + 1)
    advance()
  }

  const handleDontKnow = () => {
    if (!currentWord) return
    setAddingWord(currentWord)
  }

  const handleSaveToVocabulary = async (values: WordFormValues) => {
    await wordsRepository.save({
      language,
      fsrs: createNewCard(),
      front: values.front.trim(),
      back: values.back.trim(),
      example: values.example.trim() || undefined,
      grammar: values.grammar.trim() || undefined,
      austrianVariant: values.austrianVariant.trim() || undefined,
    })
    advance()
  }

  if (batch === null) return null

  if (batch.length === 0) {
    return <p className="word-level-session__empty">{t.wordLevels.noMoreWords}</p>
  }

  if (index >= batch.length) {
    return (
      <div className="word-level-session__summary">
        <p>
          {t.wordLevels.roundSummaryPrefix} {knownThisRound}/{batch.length} {t.wordLevels.roundSummarySuffix}
        </p>
        <button type="button" className="word-level-session__restart" onClick={startRound}>
          {t.wordLevels.nextRound}
        </button>
      </div>
    )
  }

  return (
    <div className="word-level-session">
      <p className="word-level-session__progress">
        {index + 1}/{batch.length}
      </p>
      <p className="word-level-session__word">{currentWord}</p>
      <div className="word-level-session__actions">
        <button type="button" className="word-level-session__know" onClick={handleKnow}>
          {t.wordLevels.know}
        </button>
        <button type="button" className="word-level-session__dont-know" onClick={handleDontKnow}>
          {t.wordLevels.dontKnow}
        </button>
      </div>
      {addingWord && (
        <WordForm language={language} editingWord={null} initialFront={addingWord} onSave={handleSaveToVocabulary} onCancelEdit={advance} />
      )}
    </div>
  )
}

export default WordLevelSession
