// Core
import { useState } from 'react'
// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { GrammarExercise as GrammarExerciseData } from '@/types/grammarTopic'
import type { GrammarProgressRecord } from '@/types/grammarProgress'
// Styles
import './GrammarExercise.css'

interface GrammarExerciseProps {
  exercise: GrammarExerciseData
  index: number
  savedResult?: GrammarProgressRecord
  onAnswered: (exerciseId: string, correct: boolean) => void
}

function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ')
}

function GrammarExercise({ exercise, index, savedResult, onAnswered }: GrammarExerciseProps) {
  const { t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState<boolean | null>(null)

  const handleChoose = (optionIndex: number) => {
    if (exercise.type !== 'multiple-choice') return
    const correct = optionIndex === exercise.correctIndex
    setSelectedIndex(optionIndex)
    setResult(correct)
    onAnswered(exercise.id, correct)
  }

  const handleCheckFillBlank = () => {
    if (exercise.type !== 'fill-blank') return
    const correct = exercise.correctAnswers.some((answer) => normalizeAnswer(answer) === normalizeAnswer(inputValue))
    setResult(correct)
    onAnswered(exercise.id, correct)
  }

  return (
    <li className="grammar-exercise">
      <div className="grammar-exercise__header">
        <span className="grammar-exercise__number">{index + 1}</span>
        <p className="grammar-exercise__prompt">{exercise.prompt}</p>
        {savedResult && (
          <span
            className={
              savedResult.correct
                ? 'grammar-exercise__badge grammar-exercise__badge--correct'
                : 'grammar-exercise__badge grammar-exercise__badge--incorrect'
            }
          >
            {savedResult.correct ? '✓' : '✗'}
          </span>
        )}
      </div>

      {exercise.type === 'multiple-choice' ? (
        <div className="grammar-exercise__options">
          {exercise.options.map((option, optionIndex) => {
            const isSelected = selectedIndex === optionIndex
            const isCorrectOption = optionIndex === exercise.correctIndex
            const showAsCorrect = result !== null && isCorrectOption
            const showAsIncorrect = isSelected && !isCorrectOption
            return (
              <button
                key={option}
                type="button"
                className={
                  showAsCorrect
                    ? 'grammar-exercise__option grammar-exercise__option--correct'
                    : showAsIncorrect
                      ? 'grammar-exercise__option grammar-exercise__option--incorrect'
                      : 'grammar-exercise__option'
                }
                onClick={() => handleChoose(optionIndex)}
              >
                {option}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="grammar-exercise__fill-blank">
          <input
            type="text"
            className="grammar-exercise__input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button
            type="button"
            className="grammar-exercise__check"
            onClick={handleCheckFillBlank}
            disabled={!inputValue.trim()}
          >
            {t.grammar.check}
          </button>
        </div>
      )}

      {result !== null && (
        <p
          className={
            result
              ? 'grammar-exercise__feedback grammar-exercise__feedback--correct'
              : 'grammar-exercise__feedback grammar-exercise__feedback--incorrect'
          }
        >
          {result ? t.grammar.correct : t.grammar.incorrect} — {exercise.explanation}
        </p>
      )}
    </li>
  )
}

export default GrammarExercise
