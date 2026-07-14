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
      description:
        "Картки на основі FSRS з фільтром австрійських варіантів з'являться тут (Задача 3).",
    },
    scheduler: {
      title: 'Розклад',
      description:
        "Регулярні блоки занять, винятки та логіка тимчасового розділення мов з'являться тут (Задача 4).",
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
      description:
        'Карточки на основе FSRS с фильтром австрийских вариантов появятся здесь (Задача 3).',
    },
    scheduler: {
      title: 'Расписание',
      description:
        'Регулярные блоки занятий, исключения и логика временного разделения языков появятся здесь (Задача 4).',
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
} satisfies TranslationDictionary

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = { uk, ru }
