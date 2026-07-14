// Core
import { useState } from 'react'
// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { Rating } from '@/services/fsrs/fsrsScheduler'
import { speak } from '@/services/tts/speak'
// Types
import type { Grade } from '@/services/fsrs/fsrsScheduler'
import type { Language } from '@/types/language'
import type { WordRecord } from '@/types/word'
// Consts
import { AUSTRIAN_SPEECH_LOCALE, SPEECH_LOCALES } from '@/consts/speechLocales'
// Styles
import './ReviewCard.css'

interface ReviewCardProps {
  word: WordRecord
  language: Language
  onRate: (grade: Grade) => void
}

const RATING_OPTIONS: Array<{ grade: Grade; labelKey: 'ratingAgain' | 'ratingHard' | 'ratingGood' | 'ratingEasy' }> = [
  { grade: Rating.Again, labelKey: 'ratingAgain' },
  { grade: Rating.Hard, labelKey: 'ratingHard' },
  { grade: Rating.Good, labelKey: 'ratingGood' },
  { grade: Rating.Easy, labelKey: 'ratingEasy' },
]

function ReviewCard({ word, language, onRate }: ReviewCardProps) {
  const { t } = useTranslation()
  const [isRevealed, setIsRevealed] = useState(false)

  const handleRate = (grade: Grade) => {
    setIsRevealed(false)
    onRate(grade)
  }

  return (
    <div className="review-card">
      <h2>{t.vocabulary.reviewHeading}</h2>
      <div className="review-card__front">
        <span className="review-card__word">{word.front}</span>
        <button
          type="button"
          className="review-card__listen"
          aria-label={t.vocabulary.listen}
          onClick={() => speak(word.front, SPEECH_LOCALES[language])}
        >
          🔊
        </button>
      </div>

      {isRevealed ? (
        <>
          <div className="review-card__back">
            <span>{word.back}</span>
            <button
              type="button"
              className="review-card__listen"
              aria-label={t.vocabulary.listen}
              onClick={() => speak(word.back, SPEECH_LOCALES[language])}
            >
              🔊
            </button>
          </div>
          {word.example && <p className="review-card__example">{word.example}</p>}
          {word.grammar && <p className="review-card__grammar">{word.grammar}</p>}
          {word.austrianVariant && (
            <div className="review-card__austrian">
              <span>{t.vocabulary.austrianVariant}: {word.austrianVariant}</span>
              <button
                type="button"
                className="review-card__listen"
                aria-label={t.vocabulary.listen}
                onClick={() => speak(word.austrianVariant!, AUSTRIAN_SPEECH_LOCALE)}
              >
                🔊
              </button>
            </div>
          )}
          <div className="review-card__ratings">
            {RATING_OPTIONS.map((option) => (
              <button
                key={option.grade}
                type="button"
                className={`review-card__rating review-card__rating--${option.labelKey}`}
                onClick={() => handleRate(option.grade)}
              >
                {t.vocabulary[option.labelKey]}
              </button>
            ))}
          </div>
        </>
      ) : (
        <button type="button" className="review-card__reveal" onClick={() => setIsRevealed(true)}>
          {t.vocabulary.showAnswer}
        </button>
      )}
    </div>
  )
}

export default ReviewCard
