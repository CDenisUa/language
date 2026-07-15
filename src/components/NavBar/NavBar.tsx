// Core
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { Language } from '@/types/language'
import { LANGUAGE_LABELS } from '@/types/language'
import type { Locale } from '@/types/locale'
import { LOCALE_LABELS } from '@/types/locale'
// Consts
import { ROUTES } from '@/consts/routes'
// Styles
import './NavBar.css'

const LANGUAGES: Language[] = ['de', 'en']
const LOCALES: Locale[] = ['uk', 'ru']

function NavBar() {
  const activeLanguage = useLanguageStore((state) => state.activeLanguage)
  const setActiveLanguage = useLanguageStore((state) => state.setActiveLanguage)
  const { t, locale, setLocale } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems: Array<{ to: string; label: string }> = [
    { to: ROUTES.dashboard, label: t.nav.dashboard },
    { to: ROUTES.vocabulary, label: t.nav.vocabulary },
    { to: ROUTES.scheduler, label: t.nav.scheduler },
    { to: ROUTES.shadowing, label: t.nav.shadowing },
    { to: ROUTES.errorJournal, label: t.nav.errorJournal },
    { to: ROUTES.textAnalyzer, label: t.nav.textAnalyzer },
    { to: ROUTES.grammar, label: t.nav.grammar },
    { to: ROUTES.wordLevels, label: t.nav.wordLevels },
    { to: ROUTES.settings, label: t.nav.settings },
  ]

  return (
    <header className="nav-bar">
      <div className="nav-bar__inner">
        <span className="nav-bar__brand">Sprachlabor</span>
        <button
          type="button"
          className="nav-bar__toggle"
          aria-expanded={isMenuOpen}
          aria-label={t.nav.menuToggle}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="nav-bar__toggle-icon" aria-hidden="true" />
        </button>
        <div className={isMenuOpen ? 'nav-bar__menu nav-bar__menu--open' : 'nav-bar__menu'}>
          <nav className="nav-bar__links">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === ROUTES.dashboard}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link'
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-bar__switches">
            <div className="nav-bar__locale-switch" role="group" aria-label={t.localeSwitch.ariaLabel}>
              {LOCALES.map((localeOption) => (
                <button
                  key={localeOption}
                  type="button"
                  className={
                    localeOption === locale
                      ? 'nav-bar__locale-button nav-bar__locale-button--active'
                      : 'nav-bar__locale-button'
                  }
                  onClick={() => setLocale(localeOption)}
                >
                  {LOCALE_LABELS[localeOption]}
                </button>
              ))}
            </div>
            <div
              className="nav-bar__language-switch"
              role="group"
              aria-label={t.languageSwitch.ariaLabel}
            >
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
        </div>
      </div>
      {isMenuOpen && <div className="nav-bar__backdrop" onClick={() => setIsMenuOpen(false)} />}
    </header>
  )
}

export default NavBar
