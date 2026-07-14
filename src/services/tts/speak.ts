export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

/** Regenerates pronunciation on demand via the Web Speech API — nothing is stored (see DECISIONS.md). */
export function speak(text: string, lang: string): void {
  if (!isSpeechSynthesisSupported() || !text.trim()) return

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
}
