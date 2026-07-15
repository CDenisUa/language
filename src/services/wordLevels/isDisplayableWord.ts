const ALWAYS_ALLOWED_SINGLE_LETTER = new Set(['i', 'a'])

/**
 * Filters out corpus artifacts from the frequency wordlist — contraction fragments like "'s"/"'t"
 * and stray single letters — that aren't real standalone words a learner would want to see.
 */
export function isDisplayableWord(word: string): boolean {
  if (word.startsWith("'")) return false
  if (word.length === 1) return ALWAYS_ALLOWED_SINGLE_LETTER.has(word.toLowerCase())
  return true
}
