// Core
import { useEffect, useState } from 'react'
// Components
import StudyHours from '@/pages/Dashboard/StudyHours'
import ErrorBreakdown from '@/pages/Dashboard/ErrorBreakdown'
// Hooks
import { useStudyBalanceStore } from '@/hooks/useStudyBalanceStore'
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { vocabularyStudySessionsRepository } from '@/services/db/vocabularyStudySessionsRepository'
import { shadowingSessionsRepository } from '@/services/db/shadowingSessionsRepository'
import { errorJournalRepository } from '@/services/db/errorJournalRepository'
// Types
import type { ErrorJournalEntryRecord } from '@/types/errorJournalEntry'
import type { Language } from '@/types/language'
// Styles
import './Dashboard.css'

function sumSecondsByLanguage(records: Array<{ language: Language; durationSeconds: number }>, language: Language): number {
  return records.filter((record) => record.language === language).reduce((sum, record) => sum + record.durationSeconds, 0)
}

function Dashboard() {
  const { t } = useTranslation()
  const targetGermanPercent = useStudyBalanceStore((state) => state.targetGermanPercent)
  const [germanSeconds, setGermanSeconds] = useState(0)
  const [englishSeconds, setEnglishSeconds] = useState(0)
  const [errorEntries, setErrorEntries] = useState<ErrorJournalEntryRecord[]>([])

  useEffect(() => {
    async function load() {
      const [vocabSessions, shadowingSessions, entries] = await Promise.all([
        vocabularyStudySessionsRepository.getAll(),
        shadowingSessionsRepository.getAll(),
        errorJournalRepository.getAll(),
      ])
      const combined = [
        ...vocabSessions,
        ...shadowingSessions.map((session) => ({
          language: session.language,
          durationSeconds: session.practiceDurationSeconds,
        })),
      ]
      setGermanSeconds(sumSecondsByLanguage(combined, 'de'))
      setEnglishSeconds(sumSecondsByLanguage(combined, 'en'))
      setErrorEntries(entries)
    }
    load()
  }, [])

  return (
    <section className="dashboard-page">
      <h1>{t.pages.dashboard.title}</h1>
      <p>{t.pages.dashboard.description}</p>

      <StudyHours germanSeconds={germanSeconds} englishSeconds={englishSeconds} targetGermanPercent={targetGermanPercent} />
      <ErrorBreakdown entries={errorEntries} />
    </section>
  )
}

export default Dashboard
