// Core
import { NavLink } from 'react-router-dom'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
// Types
import type { Language } from '@/types/language'
import { LANGUAGE_LABELS } from '@/types/language'
// Consts
import { ROUTES } from '@/consts/routes'
// Styles
import './NavBar.css'

const NAV_ITEMS: Array<{ to: string; label: string }> = [
  { to: ROUTES.dashboard, label: 'Dashboard' },
  { to: ROUTES.vocabulary, label: 'Vocabulary' },
  { to: ROUTES.scheduler, label: 'Scheduler' },
  { to: ROUTES.shadowing, label: 'Shadowing' },
  { to: ROUTES.errorJournal, label: 'Errors' },
  { to: ROUTES.settings, label: 'Settings' },
]

const LANGUAGES: Language[] = ['de', 'en']

function NavBar() {
  const activeLanguage = useLanguageStore((state) => state.activeLanguage)
  const setActiveLanguage = useLanguageStore((state) => state.setActiveLanguage)

  return (
    <header className="nav-bar">
      <div className="nav-bar__inner">
        <span className="nav-bar__brand">Sprachlabor</span>
        <nav className="nav-bar__links">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === ROUTES.dashboard}
              className={({ isActive }) =>
                isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-bar__language-switch" role="group" aria-label="Active language">
          {LANGUAGES.map((language) => (
            <button
              key={language}
              type="button"
              className={
                language === activeLanguage
                  ? 'nav-bar__language-button nav-bar__language-button--active'
                  : 'nav-bar__language-button'
              }
              onClick={() => setActiveLanguage(language)}
            >
              {LANGUAGE_LABELS[language]}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default NavBar
