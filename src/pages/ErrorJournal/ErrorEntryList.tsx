// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { ErrorJournalEntryRecord } from '@/types/errorJournalEntry'
// Styles
import './ErrorEntryList.css'

interface ErrorEntryListProps {
  entries: ErrorJournalEntryRecord[]
  resolveLinkLabel: (entry: ErrorJournalEntryRecord) => string | null
  onEdit: (entry: ErrorJournalEntryRecord) => void
  onDelete: (entry: ErrorJournalEntryRecord) => void
}

const CATEGORY_LABEL_KEYS = {
  grammar: 'categoryGrammar',
  vocabulary: 'categoryVocabulary',
  pronunciation: 'categoryPronunciation',
  other: 'categoryOther',
} as const

function ErrorEntryList({ entries, resolveLinkLabel, onEdit, onDelete }: ErrorEntryListProps) {
  const { t } = useTranslation()

  return (
    <div className="error-entry-list">
      <h2>{t.errorJournal.entriesHeading}</h2>

      {entries.length === 0 ? (
        <p className="error-entry-list__empty">{t.errorJournal.emptyEntries}</p>
      ) : (
        <ul className="error-entry-list__items">
          {entries.map((entry) => {
            const linkLabel = resolveLinkLabel(entry)
            return (
              <li key={entry.id} className="error-entry-list__item">
                <div className="error-entry-list__text">
                  <span className="error-entry-list__category">
                    {t.errorJournal[CATEGORY_LABEL_KEYS[entry.category]]}
                  </span>
                  <span className="error-entry-list__mistake">{entry.mistake}</span>
                  <span className="error-entry-list__arrow">→</span>
                  <span className="error-entry-list__correction">{entry.correction}</span>
                  {entry.note && <p className="error-entry-list__note">{entry.note}</p>}
                  {linkLabel && <span className="error-entry-list__link">🔗 {linkLabel}</span>}
                </div>
                <div className="error-entry-list__actions">
                  <button type="button" onClick={() => onEdit(entry)}>
                    {t.errorJournal.edit}
                  </button>
                  <button type="button" onClick={() => onDelete(entry)}>
                    {t.errorJournal.delete}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ErrorEntryList
