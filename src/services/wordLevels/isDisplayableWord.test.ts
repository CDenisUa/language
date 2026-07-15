// Core
import { describe, expect, it } from 'vitest'
// Services
import { isDisplayableWord } from '@/services/wordLevels/isDisplayableWord'

describe('isDisplayableWord', () => {
  it('rejects contraction fragments starting with an apostrophe', () => {
    expect(isDisplayableWord("'s")).toBe(false)
    expect(isDisplayableWord("'t")).toBe(false)
    expect(isDisplayableWord("'re")).toBe(false)
  })

  it('rejects stray single letters that are not real standalone words', () => {
    expect(isDisplayableWord('s')).toBe(false)
    expect(isDisplayableWord('x')).toBe(false)
  })

  it('allows the single-letter words that are real', () => {
    expect(isDisplayableWord('i')).toBe(true)
    expect(isDisplayableWord('a')).toBe(true)
  })

  it('allows ordinary words of two or more letters', () => {
    expect(isDisplayableWord('house')).toBe(true)
    expect(isDisplayableWord('du')).toBe(true)
  })
})
