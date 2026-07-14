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
  vocabulary: {
    addWord: string
    editWord: string
    front: string
    back: string
    example: string
    grammar: string
    austrianVariant: string
    save: string
    cancel: string
    edit: string
    delete: string
    listen: string
    reviewHeading: string
    showAnswer: string
    noDueWords: string
    ratingAgain: string
    ratingHard: string
    ratingGood: string
    ratingEasy: string
    wordListHeading: string
    austrianOnlyFilter: string
    emptyWordList: string
  }
}
