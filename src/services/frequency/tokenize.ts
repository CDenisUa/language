export interface TextSegment {
  type: 'word' | 'other'
  text: string
}

const WORD_PATTERN = /[a-zA-ZäöüßÄÖÜ']+/g

/** Splits text into word/non-word segments. Concatenating `.text` back reproduces the original. */
export function tokenize(text: string): TextSegment[] {
  const segments: TextSegment[] = []
  let lastIndex = 0

  for (const match of text.matchAll(WORD_PATTERN)) {
    const start = match.index
    if (start > lastIndex) {
      segments.push({ type: 'other', text: text.slice(lastIndex, start) })
    }
    segments.push({ type: 'word', text: match[0] })
    lastIndex = start + match[0].length
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'other', text: text.slice(lastIndex) })
  }

  return segments
}
