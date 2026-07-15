// Core
import { useEffect, useState } from 'react'
// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { Language } from '@/types/language'
import type { WordRecord } from '@/types/word'
// Styles
import './WordForm.css'

export interface WordFormValues {
  front: string
  back: string
  example: string
  grammar: string
  austrianVariant: string
}

const EMPTY_VALUES: WordFormValues = {
  front: '',
  back: '',
  example: '',
  grammar: '',
  austrianVariant: '',
}

interface WordFormProps {
  language: Language
  editingWord: WordRecord | null
  /** Pre-fills the front field for a fresh (non-editing) form — e.g. from the Text Analyzer. */
  initialFront?: string
  onSave: (values: WordFormValues) => void
  onCancelEdit: () => void
}

function WordForm({ language, editingWord, initialFront, onSave, onCancelEdit }: WordFormProps) {
  const { t } = useTranslation()
  const [values, setValues] = useState<WordFormValues>(EMPTY_VALUES)

  useEffect(() => {
    if (editingWord) {
      setValues({
        front: editingWord.front,
        back: editingWord.back,
        example: editingWord.example ?? '',
        grammar: editingWord.grammar ?? '',
        austrianVariant: editingWord.austrianVariant ?? '',
      })
    } else {
      setValues({ ...EMPTY_VALUES, front: initialFront ?? '' })
    }
  }, [editingWord, initialFront])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!values.front.trim() || !values.back.trim()) return

    onSave(values)
    setValues(EMPTY_VALUES)
  }

  return (
    <form className="word-form" onSubmit={handleSubmit}>
      <h2>{editingWord ? t.vocabulary.editWord : t.vocabulary.addWord}</h2>
      <div className="word-form__row">
        <label className="word-form__field">
          <span>{t.vocabulary.front}</span>
          <input
            value={values.front}
            onChange={(event) => setValues((prev) => ({ ...prev, front: event.target.value }))}
            required
          />
        </label>
        <label className="word-form__field">
          <span>{t.vocabulary.back}</span>
          <input
            value={values.back}
            onChange={(event) => setValues((prev) => ({ ...prev, back: event.target.value }))}
            required
          />
        </label>
      </div>
      <label className="word-form__field">
        <span>{t.vocabulary.example}</span>
        <input
          value={values.example}
          onChange={(event) => setValues((prev) => ({ ...prev, example: event.target.value }))}
        />
      </label>
      <div className="word-form__row">
        <label className="word-form__field">
          <span>{t.vocabulary.grammar}</span>
          <input
            value={values.grammar}
            onChange={(event) => setValues((prev) => ({ ...prev, grammar: event.target.value }))}
          />
        </label>
        {language === 'de' && (
          <label className="word-form__field">
            <span>{t.vocabulary.austrianVariant}</span>
            <input
              value={values.austrianVariant}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, austrianVariant: event.target.value }))
              }
            />
          </label>
        )}
      </div>
      <div className="word-form__actions">
        <button type="submit" className="word-form__submit">
          {t.vocabulary.save}
        </button>
        {(editingWord || initialFront) && (
          <button type="button" className="word-form__cancel" onClick={onCancelEdit}>
            {t.vocabulary.cancel}
          </button>
        )}
      </div>
    </form>
  )
}

export default WordForm
