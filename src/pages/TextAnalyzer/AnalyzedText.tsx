// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { AnalyzedSegment } from '@/services/frequency/analyzeText'
// Styles
import './AnalyzedText.css'

interface AnalyzedTextProps {
  segments: AnalyzedSegment[]
  existingWords: Set<string>
  onWordClick: (word: string) => void
}

const TIER_LABEL_KEYS = {
  B2: 'legendB2',
  C1: 'legendC1',
  C2: 'legendC2',
  unranked: 'legendUnranked',
} as const

function AnalyzedText({ segments, existingWords, onWordClick }: AnalyzedTextProps) {
  const { t } = useTranslation()

  return (
    <p className="analyzed-text">
      {segments.map((segment, index) => {
        if (segment.type === 'other' || !segment.tier || segment.tier === 'common') {
          return <span key={index}>{segment.text}</span>
        }

        const tierLabel = t.textAnalyzer[TIER_LABEL_KEYS[segment.tier]]
        const isKnown = existingWords.has(segment.text.toLowerCase())

        if (isKnown) {
          return (
            <span
              key={index}
              className={`analyzed-text__word analyzed-text__word--${segment.tier} analyzed-text__word--known`}
              aria-label={`${segment.text} — ${tierLabel} — ${t.textAnalyzer.alreadyInVocabulary}`}
            >
              {segment.text} ✓
            </span>
          )
        }

        return (
          <button
            key={index}
            type="button"
            className={`analyzed-text__word analyzed-text__word--${segment.tier}`}
            aria-label={`${segment.text} — ${tierLabel}`}
            onClick={() => onWordClick(segment.text)}
          >
            {segment.text}
          </button>
        )
      })}
    </p>
  )
}

export default AnalyzedText
