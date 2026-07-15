// Core
import { Route, Routes } from 'react-router-dom'
// Components
import NavBar from '@/components/NavBar/NavBar'
import ReminderBanner from '@/components/ReminderBanner/ReminderBanner'
import ChepioTechFooter from '@/components/ChepioTechFooter/ChepioTechFooter'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { usePushScheduleSync } from '@/hooks/usePushScheduleSync'
// Pages
import Dashboard from '@/pages/Dashboard/Dashboard'
import Vocabulary from '@/pages/Vocabulary/Vocabulary'
import Scheduler from '@/pages/Scheduler/Scheduler'
import Shadowing from '@/pages/Shadowing/Shadowing'
import ErrorJournal from '@/pages/ErrorJournal/ErrorJournal'
import TextAnalyzer from '@/pages/TextAnalyzer/TextAnalyzer'
import Grammar from '@/pages/Grammar/Grammar'
import WordLevels from '@/pages/WordLevels/WordLevels'
import Settings from '@/pages/Settings/Settings'
// Consts
import { ROUTES } from '@/consts/routes'

function App() {
  const activeLanguage = useLanguageStore((state) => state.activeLanguage)
  usePushScheduleSync()

  return (
    <div data-language={activeLanguage} className="app-shell">
      <NavBar />
      <ReminderBanner />
      <main className="app-shell__content">
        <Routes>
          <Route path={ROUTES.dashboard} element={<Dashboard />} />
          <Route path={ROUTES.vocabulary} element={<Vocabulary />} />
          <Route path={ROUTES.scheduler} element={<Scheduler />} />
          <Route path={ROUTES.shadowing} element={<Shadowing />} />
          <Route path={ROUTES.errorJournal} element={<ErrorJournal />} />
          <Route path={ROUTES.textAnalyzer} element={<TextAnalyzer />} />
          <Route path={ROUTES.grammar} element={<Grammar />} />
          <Route path={ROUTES.wordLevels} element={<WordLevels />} />
          <Route path={ROUTES.settings} element={<Settings />} />
        </Routes>
      </main>
      <ChepioTechFooter />
    </div>
  )
}

export default App
