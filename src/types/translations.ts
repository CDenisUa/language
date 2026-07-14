interface TranslatedPage {
  title: string
  description: string
}

export interface TranslationDictionary {
  nav: {
    dashboard: string
    vocabulary: string
    scheduler: string
    shadowing: string
    errorJournal: string
    settings: string
  }
  languageSwitch: {
    ariaLabel: string
  }
  localeSwitch: {
    ariaLabel: string
  }
  pages: {
    dashboard: TranslatedPage
    vocabulary: TranslatedPage
    scheduler: TranslatedPage
    shadowing: TranslatedPage
    errorJournal: TranslatedPage
    settings: TranslatedPage
  }
}
