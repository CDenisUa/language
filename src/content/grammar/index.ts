// Types
import type { GrammarCategory } from '@/types/grammarTopic'
// Consts
import { tensesAspects } from '@/content/grammar/tensesAspects'
import { modals } from '@/content/grammar/modals'
import { conditionals } from '@/content/grammar/conditionals'
import { voiceCausatives } from '@/content/grammar/voiceCausatives'
import { verbPatterns } from '@/content/grammar/verbPatterns'
import { syntaxEmphasis } from '@/content/grammar/syntaxEmphasis'
import { partsOfSpeech } from '@/content/grammar/partsOfSpeech'
import { cohesion } from '@/content/grammar/cohesion'

export const GRAMMAR_CATEGORIES: GrammarCategory[] = [
  tensesAspects,
  modals,
  conditionals,
  voiceCausatives,
  verbPatterns,
  syntaxEmphasis,
  partsOfSpeech,
  cohesion,
]
