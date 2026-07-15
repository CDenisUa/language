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
import { deKasus } from '@/content/grammar/deKasus'
import { deGenusArtikel } from '@/content/grammar/deGenusArtikel'
import { deWortstellung } from '@/content/grammar/deWortstellung'
import { deVerbformenZeiten } from '@/content/grammar/deVerbformenZeiten'
import { deModalverben } from '@/content/grammar/deModalverben'
import { deTrennbareVerben } from '@/content/grammar/deTrennbareVerben'
import { deKonjunktiv } from '@/content/grammar/deKonjunktiv'
import { dePassiv } from '@/content/grammar/dePassiv'
import { dePraepositionen } from '@/content/grammar/dePraepositionen'
import { deAdjektivdeklination } from '@/content/grammar/deAdjektivdeklination'
import { deNebensaetze } from '@/content/grammar/deNebensaetze'

export const GRAMMAR_CATEGORIES: GrammarCategory[] = [
  tensesAspects,
  modals,
  conditionals,
  voiceCausatives,
  verbPatterns,
  syntaxEmphasis,
  partsOfSpeech,
  cohesion,
  deKasus,
  deGenusArtikel,
  deWortstellung,
  deVerbformenZeiten,
  deModalverben,
  deTrennbareVerben,
  deKonjunktiv,
  dePassiv,
  dePraepositionen,
  deAdjektivdeklination,
  deNebensaetze,
]
