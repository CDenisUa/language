// Core
import { useMemo, useState } from 'react'
// Components
import AnalyzedText from '@/pages/TextAnalyzer/AnalyzedText'
import WordForm from '@/pages/Vocabulary/WordForm'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useWords } from '@/hooks/useWords'
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { analyzeText } from '@/services/frequency/analyzeText'
import { wordsRepository } from '@/services/db/wordsRepository'
import { createNewCard } from '@/services/fsrs/fsrsScheduler'
// Types
import type { AnalyzedSegment } from '@/services/frequency/analyzeText'
import type { WordFormValues } from '@/pages/Vocabulary/WordForm'
// Styles
import './TextAnalyzer.css'

function TextAnalyzer() {
  const { t } = useTranslation()
  const activeLanguage = useLanguageStore((state) => state.activeLanguage)
  const { words, reload } = useWords(activeLanguage)

  const [text, setText] = useState('')
  const [segments, setSegments] = useState<AnalyzedSegment[] | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedWord, setSelectedWord] = useState<string | null>(null)
  const [justAdded, setJustAdded] = useState(false)

  const existingWords = useMemo(() => new Set(words.map((word) => word.front.toLowerCase())), [words])
  const hasFlaggedWords = segments?.some((segment) => segment.type === 'word' && segment.tier !== 'common')

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setJustAdded(false)
    setSelectedWord(null)
    try {
      setSegments(await analyzeText(text, activeLanguage))
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSave = async (values: WordFormValues) => {
    await wordsRepository.save({
      language: activeLanguage,
      fsrs: createNewCard(),
      front: values.front.trim(),
      back: values.back.trim(),
      example: values.example.trim() || undefined,
      grammar: values.grammar.trim() || undefined,
      austrianVariant: values.austrianVariant.trim() || undefined,
    })
    setSelectedWord(null)
    setJustAdded(true)
    await reload()
  }

  return (
    <section className="text-analyzer-page">
      <h1>{t.pages.textAnalyzer.title}</h1>
      <p>{t.pages.textAnalyzer.description}</p>

      <div className="text-analyzer__input">
        <textarea
          className="text-analyzer__textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={8}
          placeholder={t.textAnalyzer.placeholder}
        />
        <button
          type="button"
          className="text-analyzer__analyze"
          onClick={handleAnalyze}
          disabled={!text.trim() || isAnalyzing}
        >
          {t.textAnalyzer.analyzeButton}
        </button>
      </div>

      {segments &&
        (hasFlaggedWords ? (
          <>
            <div className="text-analyzer__legend">
              <span className="text-analyzer__legend-item text-analyzer__legend-item--B2">{t.textAnalyzer.legendB2}</span>
              <span className="text-analyzer__legend-item text-analyzer__legend-item--C1">{t.textAnalyzer.legendC1}</span>
              <span className="text-analyzer__legend-item text-analyzer__legend-item--C2">{t.textAnalyzer.legendC2}</span>
              <span className="text-analyzer__legend-item text-analyzer__legend-item--unranked">
                {t.textAnalyzer.legendUnranked}
              </span>
            </div>
            <AnalyzedText segments={segments} existingWords={existingWords} onWordClick={setSelectedWord} />
          </>
        ) : (
          <p className="text-analyzer__empty">{t.textAnalyzer.emptyResult}</p>
        ))}

      {selectedWord && (
        <WordForm
          language={activeLanguage}
          editingWord={null}
          initialFront={selectedWord}
          onSave={handleSave}
          onCancelEdit={() => setSelectedWord(null)}
        />
      )}

      {justAdded && <p className="text-analyzer__added">{t.textAnalyzer.wordAdded}</p>}

      <p className="text-analyzer__credit">{t.textAnalyzer.dataCredit}</p>
    </section>
  )
}

export default TextAnalyzer
