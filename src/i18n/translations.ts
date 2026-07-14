// Types
import type { Locale } from '@/types/locale'
import type { TranslationDictionary } from '@/types/translations'

const uk = {
  nav: {
    dashboard: 'Панель',
    vocabulary: 'Словник',
    scheduler: 'Розклад',
    shadowing: 'Шедовінг',
    errorJournal: 'Помилки',
    settings: 'Налаштування',
  },
  languageSwitch: {
    ariaLabel: 'Активна мова вивчення',
  },
  localeSwitch: {
    ariaLabel: 'Мова інтерфейсу',
  },
  pages: {
    dashboard: {
      title: 'Панель',
      description:
        'Тут будуть години по кожній мові, баланс 70/30 та частота помилок (Задача 8).',
    },
    vocabulary: {
      title: 'Словник',
      description: 'Картки на основі FSRS з підтримкою австрійських варіантів.',
    },
    scheduler: {
      title: 'Розклад',
      description: 'Регулярні блоки занять, винятки та тимчасове розділення мов.',
    },
    shadowing: {
      title: 'Шедовінг-лабораторія',
      description:
        "Особисте завантаження аудіо, нагадування про артикуляційну базу та відтворення з'являться тут (Задача 6).",
    },
    errorJournal: {
      title: 'Журнал помилок',
      description:
        "Вручну зафіксовані граматичні та фонетичні помилки з'являться тут (Задача 7).",
    },
    settings: {
      title: 'Налаштування',
      description:
        "Цільовий баланс навчання, налаштування сповіщень та експорт/імпорт JSON з'являться тут.",
    },
  },
  vocabulary: {
    addWord: 'Додати слово',
    editWord: 'Редагувати слово',
    front: 'Слово',
    back: 'Переклад',
    example: 'Приклад речення',
    grammar: 'Граматична примітка',
    austrianVariant: 'Австрійський варіант',
    save: 'Зберегти',
    cancel: 'Скасувати',
    edit: 'Редагувати',
    delete: 'Видалити',
    listen: 'Прослухати',
    reviewHeading: 'Повторення',
    showAnswer: 'Показати відповідь',
    noDueWords: 'Зараз нічого повторювати',
    ratingAgain: 'Знову',
    ratingHard: 'Важко',
    ratingGood: 'Добре',
    ratingEasy: 'Легко',
    wordListHeading: 'Усі слова',
    austrianOnlyFilter: 'Тільки з австрійським варіантом',
    emptyWordList: 'Поки немає жодного слова — додайте перше.',
  },
  scheduler: {
    addEvent: 'Додати запис розкладу',
    typeRecurring: 'Регулярний блок',
    typeException: 'Одноразовий виняток',
    language: 'Мова',
    daysOfWeek: 'Дні тижня',
    startTime: 'Початок',
    endTime: 'Кінець',
    label: 'Нотатка',
    date: 'Дата',
    action: 'Дія',
    actionSkip: 'Пропустити цю дату',
    actionAdd: 'Додати подію',
    save: 'Зберегти',
    edit: 'Редагувати',
    delete: 'Видалити',
    eventsHeading: 'Записи розкладу',
    emptyEvents: 'Розклад ще порожній — додайте перший запис.',
    separationBlockedUntil: 'Англійська заблокована до',
    separationAvailable: 'Англійська доступна зараз',
    dayMon: 'Пн',
    dayTue: 'Вт',
    dayWed: 'Ср',
    dayThu: 'Чт',
    dayFri: 'Пт',
    daySat: 'Сб',
    daySun: 'Нд',
  },
  reminders: {
    englishUnblocked: 'Англійська щойно розблокувалась — можна починати',
    upcomingEvent: 'Скоро:',
    dismiss: 'Закрити нагадування',
  },
  settings: {
    pushHeading: 'Push-сповіщення',
    pushUnsupported: 'Цей браузер не підтримує push-сповіщення.',
    pushEnable: 'Увімкнути сповіщення',
    pushDisable: 'Вимкнути сповіщення',
  },
} satisfies TranslationDictionary

const ru = {
  nav: {
    dashboard: 'Панель',
    vocabulary: 'Словарь',
    scheduler: 'Расписание',
    shadowing: 'Шедоуинг',
    errorJournal: 'Ошибки',
    settings: 'Настройки',
  },
  languageSwitch: {
    ariaLabel: 'Активный язык изучения',
  },
  localeSwitch: {
    ariaLabel: 'Язык интерфейса',
  },
  pages: {
    dashboard: {
      title: 'Панель',
      description: 'Здесь появятся часы по каждому языку, баланс 70/30 и частота ошибок (Задача 8).',
    },
    vocabulary: {
      title: 'Словарь',
      description: 'Карточки на основе FSRS с поддержкой австрийских вариантов.',
    },
    scheduler: {
      title: 'Расписание',
      description: 'Регулярные блоки занятий, исключения и временное разделение языков.',
    },
    shadowing: {
      title: 'Лаборатория шедоуинга',
      description:
        'Личная загрузка аудио, напоминания об артикуляционной базе и воспроизведение появятся здесь (Задача 6).',
    },
    errorJournal: {
      title: 'Журнал ошибок',
      description: 'Вручную зафиксированные грамматические и фонетические ошибки появятся здесь (Задача 7).',
    },
    settings: {
      title: 'Настройки',
      description: 'Целевой баланс обучения, настройки уведомлений и экспорт/импорт JSON появятся здесь.',
    },
  },
  vocabulary: {
    addWord: 'Добавить слово',
    editWord: 'Редактировать слово',
    front: 'Слово',
    back: 'Перевод',
    example: 'Пример предложения',
    grammar: 'Грамматическая заметка',
    austrianVariant: 'Австрийский вариант',
    save: 'Сохранить',
    cancel: 'Отмена',
    edit: 'Редактировать',
    delete: 'Удалить',
    listen: 'Прослушать',
    reviewHeading: 'Повторение',
    showAnswer: 'Показать ответ',
    noDueWords: 'Сейчас нечего повторять',
    ratingAgain: 'Снова',
    ratingHard: 'Трудно',
    ratingGood: 'Хорошо',
    ratingEasy: 'Легко',
    wordListHeading: 'Все слова',
    austrianOnlyFilter: 'Только с австрийским вариантом',
    emptyWordList: 'Пока нет ни одного слова — добавьте первое.',
  },
  scheduler: {
    addEvent: 'Добавить запись расписания',
    typeRecurring: 'Регулярный блок',
    typeException: 'Разовое исключение',
    language: 'Язык',
    daysOfWeek: 'Дни недели',
    startTime: 'Начало',
    endTime: 'Конец',
    label: 'Заметка',
    date: 'Дата',
    action: 'Действие',
    actionSkip: 'Пропустить эту дату',
    actionAdd: 'Добавить событие',
    save: 'Сохранить',
    edit: 'Редактировать',
    delete: 'Удалить',
    eventsHeading: 'Записи расписания',
    emptyEvents: 'Расписание пока пустое — добавьте первую запись.',
    separationBlockedUntil: 'Английский заблокирован до',
    separationAvailable: 'Английский доступен сейчас',
    dayMon: 'Пн',
    dayTue: 'Вт',
    dayWed: 'Ср',
    dayThu: 'Чт',
    dayFri: 'Пт',
    daySat: 'Сб',
    daySun: 'Вс',
  },
  reminders: {
    englishUnblocked: 'Английский только что разблокировался — можно начинать',
    upcomingEvent: 'Скоро:',
    dismiss: 'Закрыть напоминание',
  },
  settings: {
    pushHeading: 'Push-уведомления',
    pushUnsupported: 'Этот браузер не поддерживает push-уведомления.',
    pushEnable: 'Включить уведомления',
    pushDisable: 'Выключить уведомления',
  },
} satisfies TranslationDictionary

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = { uk, ru }
