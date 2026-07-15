/**
 * Rough CEFR-like difficulty tier derived from word-frequency rank, not from an actual CEFR
 * exam-board wordlist — see DECISIONS.md for why (no open, full-range German CEFR list exists).
 */
export type DifficultyTier = 'common' | 'B2' | 'C1' | 'C2' | 'unranked'
