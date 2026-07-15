// Core
import { useMemo } from 'react'
// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { ErrorCategory, ErrorJournalEntryRecord } from '@/types/errorJournalEntry'
// Styles
import './ErrorBreakdown.css'

interface ErrorBreakdownProps {
  entries: ErrorJournalEntryRecord[]
}

const CATEGORY_LABEL_KEYS = {
  grammar: 'categoryGrammar',
  vocabulary: 'categoryVocabulary',
  pronunciation: 'categoryPronunciation',
  other: 'categoryOther',
} as const

const CATEGORY_ORDER: ErrorCategory[] = ['grammar', 'vocabulary', 'pronunciation', 'other']

function ErrorBreakdown({ entries }: ErrorBreakdownProps) {
  const { t } = useTranslation()

  const counts = useMemo(() => {
    const result: Record<ErrorCategory, number> = { grammar: 0, vocabulary: 0, pronunciation: 0, other: 0 }
    for (const entry of entries) {
      result[entry.category] += 1
    }
    return result
  }, [entries])

  return (
    <div className="error-breakdown">
      <h2>{t.dashboard.errorBreakdownHeading}</h2>

      {entries.length === 0 ? (
        <p className="error-breakdown__empty">{t.dashboard.noErrors}</p>
      ) : (
        <ul className="error-breakdown__items">
          {CATEGORY_ORDER.map((category) => (
            <li key={category} className="error-breakdown__item">
              <span>{t.errorJournal[CATEGORY_LABEL_KEYS[category]]}</span>
              <span className="error-breakdown__count">{counts[category]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ErrorBreakdown
