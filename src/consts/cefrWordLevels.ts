// Types
import type { CefrLevel } from '@/types/cefrLevel'

/**
 * Rank cutoffs bucketing word-frequency rank into six CEFR-like bands. Reuses the same
 * frequency-rank data and methodology as Text Analyzer (see DECISIONS.md) — no open, full-range
 * CEFR wordlist exists for German, so frequency rank is used as a difficulty proxy uniformly for
 * both study languages rather than real CEFR tags for English only.
 */
export const CEFR_LEVEL_MAX_RANK: Record<CefrLevel, number> = {
  A1: 1000,
  A2: 2000,
  B1: 4000,
  B2: 8000,
  C1: 20000,
  C2: 50000,
}

/** How many words are drawn per self-assessment round. */
export const WORD_LEVEL_BATCH_SIZE = 15
