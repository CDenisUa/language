// Types
import type { Language } from '@/types/language'

export type GrammarCategoryId =
  | 'tenses-aspects'
  | 'modals'
  | 'conditionals'
  | 'voice-causatives'
  | 'verb-patterns'
  | 'syntax-emphasis'
  | 'parts-of-speech'
  | 'cohesion'
  | 'de-kasus'
  | 'de-genus-artikel'
  | 'de-wortstellung'
  | 'de-verbformen-zeiten'
  | 'de-modalverben'
  | 'de-trennbare-verben'
  | 'de-konjunktiv'
  | 'de-passiv'
  | 'de-praepositionen'
  | 'de-adjektivdeklination'
  | 'de-nebensaetze'

export interface GrammarExample {
  /** The example sentence in the language being taught (English or German, depending on the category). */
  target: string
  uk: string
}

interface GrammarExerciseBase {
  id: string
  prompt: string
  explanation: string
}

export interface MultipleChoiceExercise extends GrammarExerciseBase {
  type: 'multiple-choice'
  options: string[]
  correctIndex: number
}

export interface FillBlankExercise extends GrammarExerciseBase {
  type: 'fill-blank'
  correctAnswers: string[]
}

export type GrammarExercise = MultipleChoiceExercise | FillBlankExercise

export interface GrammarTopic {
  id: string
  title: string
  theory: string
  examples: GrammarExample[]
  exercises: GrammarExercise[]
}

export interface GrammarCategory {
  id: GrammarCategoryId
  language: Language
  title: string
  description: string
  topics: GrammarTopic[]
}
