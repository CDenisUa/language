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
    textAnalyzer: string
    grammar: string
    settings: string
    menuToggle: string
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
    textAnalyzer: TranslatedPage
    grammar: TranslatedPage
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
  scheduler: {
    addEvent: string
    typeRecurring: string
    typeException: string
    language: string
    daysOfWeek: string
    startTime: string
    endTime: string
    label: string
    date: string
    action: string
    actionSkip: string
    actionAdd: string
    save: string
    edit: string
    delete: string
    eventsHeading: string
    emptyEvents: string
    separationBlockedUntil: string
    separationAvailable: string
    dayMon: string
    dayTue: string
    dayWed: string
    dayThu: string
    dayFri: string
    daySat: string
    daySun: string
  }
  reminders: {
    englishUnblocked: string
    upcomingEvent: string
    dismiss: string
  }
  settings: {
    pushHeading: string
    pushUnsupported: string
    pushEnable: string
    pushDisable: string
    balanceHeading: string
    balanceTargetLabel: string
    backupHeading: string
    exportButton: string
    importButton: string
    importConfirmMessage: string
    importConfirm: string
    importCancel: string
    importInvalidFile: string
    importSuccessMessage: string
    importSkippedTracksNote: string
    importReloadButton: string
  }
  dashboard: {
    hoursHeading: string
    germanLabel: string
    englishLabel: string
    hoursUnit: string
    actualBalanceLabel: string
    targetBalanceLabel: string
    noActivity: string
    errorBreakdownHeading: string
    noErrors: string
  }
  shadowing: {
    uploadHeading: string
    trackTitleLabel: string
    fileLabel: string
    upload: string
    trackListHeading: string
    emptyTrackList: string
    practice: string
    delete: string
    backToList: string
    heardLabel: string
    liveFeedbackUnavailable: string
    rateHeading: string
    notesLabel: string
    saveSession: string
  }
  errorJournal: {
    addEntry: string
    editEntry: string
    category: string
    categoryGrammar: string
    categoryVocabulary: string
    categoryPronunciation: string
    categoryOther: string
    mistake: string
    correction: string
    note: string
    linkTo: string
    linkNone: string
    linkWordPrefix: string
    linkTrackPrefix: string
    save: string
    cancel: string
    edit: string
    delete: string
    entriesHeading: string
    emptyEntries: string
  }
  textAnalyzer: {
    placeholder: string
    analyzeButton: string
    emptyResult: string
    legendB2: string
    legendC1: string
    legendC2: string
    legendUnranked: string
    wordAdded: string
    alreadyInVocabulary: string
    dataCredit: string
  }
  grammar: {
    exercisesHeading: string
    check: string
    correct: string
    incorrect: string
    back: string
    allCategories: string
    progressLabel: string
    dueForReviewHeading: string
    watchOnEngVid: string
  }
}
