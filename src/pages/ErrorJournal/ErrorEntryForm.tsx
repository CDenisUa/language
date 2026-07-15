// Core
import { useEffect, useState } from 'react'
// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { ErrorCategory, ErrorJournalEntryRecord } from '@/types/errorJournalEntry'
// Styles
import './ErrorEntryForm.css'

export interface LinkOption {
  value: string
  label: string
}

export interface ErrorEntryFormValues {
  category: ErrorCategory
  mistake: string
  correction: string
  note: string
  linkValue: string
}

const EMPTY_VALUES: ErrorEntryFormValues = {
  category: 'grammar',
  mistake: '',
  correction: '',
  note: '',
  linkValue: '',
}

interface ErrorEntryFormProps {
  editingEntry: ErrorJournalEntryRecord | null
  linkOptions: LinkOption[]
  onSave: (values: ErrorEntryFormValues) => void
  onCancelEdit: () => void
}

function ErrorEntryForm({ editingEntry, linkOptions, onSave, onCancelEdit }: ErrorEntryFormProps) {
  const { t } = useTranslation()
  const [values, setValues] = useState<ErrorEntryFormValues>(EMPTY_VALUES)

  useEffect(() => {
    if (editingEntry) {
      setValues({
        category: editingEntry.category,
        mistake: editingEntry.mistake,
        correction: editingEntry.correction,
        note: editingEntry.note ?? '',
        linkValue:
          editingEntry.linkedRecordId && editingEntry.linkedRecordType
            ? `${editingEntry.linkedRecordType}:${editingEntry.linkedRecordId}`
            : '',
      })
    } else {
      setValues(EMPTY_VALUES)
    }
  }, [editingEntry])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!values.mistake.trim() || !values.correction.trim()) return

    onSave(values)
    setValues(EMPTY_VALUES)
  }

  return (
    <form className="error-entry-form" onSubmit={handleSubmit}>
      <h2>{editingEntry ? t.errorJournal.editEntry : t.errorJournal.addEntry}</h2>
      <div className="error-entry-form__row">
        <label className="error-entry-form__field">
          <span>{t.errorJournal.category}</span>
          <select
            value={values.category}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, category: event.target.value as ErrorCategory }))
            }
          >
            <option value="grammar">{t.errorJournal.categoryGrammar}</option>
            <option value="vocabulary">{t.errorJournal.categoryVocabulary}</option>
            <option value="pronunciation">{t.errorJournal.categoryPronunciation}</option>
            <option value="other">{t.errorJournal.categoryOther}</option>
          </select>
        </label>
        <label className="error-entry-form__field">
          <span>{t.errorJournal.linkTo}</span>
          <select
            value={values.linkValue}
            onChange={(event) => setValues((prev) => ({ ...prev, linkValue: event.target.value }))}
          >
            <option value="">{t.errorJournal.linkNone}</option>
            {linkOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="error-entry-form__row">
        <label className="error-entry-form__field">
          <span>{t.errorJournal.mistake}</span>
          <input
            value={values.mistake}
            onChange={(event) => setValues((prev) => ({ ...prev, mistake: event.target.value }))}
            required
          />
        </label>
        <label className="error-entry-form__field">
          <span>{t.errorJournal.correction}</span>
          <input
            value={values.correction}
            onChange={(event) => setValues((prev) => ({ ...prev, correction: event.target.value }))}
            required
          />
        </label>
      </div>
      <label className="error-entry-form__field">
        <span>{t.errorJournal.note}</span>
        <input value={values.note} onChange={(event) => setValues((prev) => ({ ...prev, note: event.target.value }))} />
      </label>
      <div className="error-entry-form__actions">
        <button type="submit" className="error-entry-form__submit">
          {t.errorJournal.save}
        </button>
        {editingEntry && (
          <button type="button" className="error-entry-form__cancel" onClick={onCancelEdit}>
            {t.errorJournal.cancel}
          </button>
        )}
      </div>
    </form>
  )
}

export default ErrorEntryForm
