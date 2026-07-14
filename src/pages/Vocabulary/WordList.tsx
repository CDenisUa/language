// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { WordRecord } from '@/types/word'
// Styles
import './WordList.css'

interface WordListProps {
  words: WordRecord[]
  austrianOnly: boolean
  onAustrianOnlyChange: (value: boolean) => void
  onEdit: (word: WordRecord) => void
  onDelete: (word: WordRecord) => void
}

function WordList({ words, austrianOnly, onAustrianOnlyChange, onEdit, onDelete }: WordListProps) {
  const { t } = useTranslation()

  const visibleWords = austrianOnly ? words.filter((word) => word.austrianVariant) : words

  return (
    <div className="word-list">
      <div className="word-list__header">
        <h2>{t.vocabulary.wordListHeading}</h2>
        <label className="word-list__filter">
          <input
            type="checkbox"
            checked={austrianOnly}
            onChange={(event) => onAustrianOnlyChange(event.target.checked)}
          />
          {t.vocabulary.austrianOnlyFilter}
        </label>
      </div>

      {visibleWords.length === 0 ? (
        <p className="word-list__empty">{t.vocabulary.emptyWordList}</p>
      ) : (
        <ul className="word-list__items">
          {visibleWords.map((word) => (
            <li key={word.id} className="word-list__item">
              <div className="word-list__text">
                <span className="word-list__front">{word.front}</span>
                <span className="word-list__back">{word.back}</span>
                {word.austrianVariant && (
                  <span className="word-list__austrian">{word.austrianVariant}</span>
                )}
              </div>
              <div className="word-list__actions">
                <button type="button" onClick={() => onEdit(word)}>
                  {t.vocabulary.edit}
                </button>
                <button type="button" onClick={() => onDelete(word)}>
                  {t.vocabulary.delete}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default WordList
