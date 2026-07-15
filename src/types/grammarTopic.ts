export type GrammarCategoryId =
  | 'tenses-aspects'
  | 'modals'
  | 'conditionals'
  | 'voice-causatives'
  | 'verb-patterns'
  | 'syntax-emphasis'
  | 'parts-of-speech'
  | 'cohesion'

export interface GrammarExample {
  en: string
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
  title: string
  description: string
  topics: GrammarTopic[]
}
