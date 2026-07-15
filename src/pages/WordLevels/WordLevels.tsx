// Core
import { useState } from 'react'
// Components
import WordLevelSession from '@/pages/WordLevels/WordLevelSession'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useKnownWords } from '@/hooks/useKnownWords'
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { CefrLevel } from '@/types/cefrLevel'
import { CEFR_LEVELS } from '@/types/cefrLevel'
// Styles
import './WordLevels.css'

function WordLevels() {
  const { t } = useTranslation()
  const activeLanguage = useLanguageStore((state) => state.activeLanguage)
  const { knownWords, reload } = useKnownWords(activeLanguage)
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel | null>(null)

  if (selectedLevel) {
    return (
      <section className="word-levels-page">
        <button type="button" className="word-levels-page__back" onClick={() => setSelectedLevel(null)}>
          {t.grammar.back} {t.wordLevels.allLevels}
        </button>
        <h1>{selectedLevel}</h1>
        <WordLevelSession language={activeLanguage} level={selectedLevel} knownWords={knownWords} onKnownWordsChange={reload} />
      </section>
    )
  }

  return (
    <section className="word-levels-page">
      <h1>{t.pages.wordLevels.title}</h1>
      <p>{t.pages.wordLevels.description}</p>
      <ul className="word-levels-page__list">
        {CEFR_LEVELS.map((level) => {
          const count = knownWords.filter((word) => word.cefrLevel === level).length
          return (
            <li key={level}>
              <button type="button" className="word-levels-page__level" onClick={() => setSelectedLevel(level)}>
                <span className="word-levels-page__level-name">{level}</span>
                <span className="word-levels-page__level-count">
                  {count} {t.wordLevels.knownCountSuffix}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default WordLevels
