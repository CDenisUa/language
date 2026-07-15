// Core
import { describe, expect, it } from 'vitest'
// Services
import { tokenize } from '@/services/frequency/tokenize'

describe('tokenize', () => {
  it('splits text into word and non-word segments', () => {
    const segments = tokenize('Ich gehe.')

    expect(segments).toEqual([
      { type: 'word', text: 'Ich' },
      { type: 'other', text: ' ' },
      { type: 'word', text: 'gehe' },
      { type: 'other', text: '.' },
    ])
  })

  it('reconstructs the original text exactly when segments are joined', () => {
    const text = 'Der Zug fährt, obwohl es schneit — pünktlich!'
    const segments = tokenize(text)

    expect(segments.map((segment) => segment.text).join('')).toBe(text)
  })

  it('handles German umlauts and ß as part of a word', () => {
    const segments = tokenize('Straße')

    expect(segments).toEqual([{ type: 'word', text: 'Straße' }])
  })

  it('handles English contractions with an apostrophe', () => {
    const segments = tokenize("don't")

    expect(segments).toEqual([{ type: 'word', text: "don't" }])
  })

  it('returns an empty array for empty text', () => {
    expect(tokenize('')).toEqual([])
  })
})
