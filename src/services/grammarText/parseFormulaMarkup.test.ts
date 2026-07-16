// Core
import { describe, expect, it } from 'vitest'
// Services
import { parseFormulaMarkup } from '@/services/grammarText/parseFormulaMarkup'

describe('parseFormulaMarkup', () => {
  it('returns a single text segment when there is no markup', () => {
    expect(parseFormulaMarkup('Просте речення без формул.')).toEqual([
      { type: 'text', value: 'Просте речення без формул.' },
    ])
  })

  it('splits text around a single formula segment', () => {
    expect(parseFormulaMarkup('Формула: `have/has + V3` вживається для результату.')).toEqual([
      { type: 'text', value: 'Формула: ' },
      { type: 'formula', value: 'have/has + V3' },
      { type: 'text', value: ' вживається для результату.' },
    ])
  })

  it('handles multiple formula segments in one string', () => {
    expect(parseFormulaMarkup('`I/you/we/they + V`; `he/she/it + V-s`.')).toEqual([
      { type: 'formula', value: 'I/you/we/they + V' },
      { type: 'text', value: '; ' },
      { type: 'formula', value: 'he/she/it + V-s' },
      { type: 'text', value: '.' },
    ])
  })

  it('handles a formula at the very start or end with no surrounding text', () => {
    expect(parseFormulaMarkup('`Never have I seen such chaos`')).toEqual([
      { type: 'formula', value: 'Never have I seen such chaos' },
    ])
  })
})
