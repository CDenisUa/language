// Core
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

function stubFrequencyList(words: string[]) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve(words) }))
}

describe('getWordsForLevel', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('only returns words whose rank falls in the requested CEFR band', async () => {
    const { getWordsForLevel } = await import('@/services/wordLevels/getWordsForLevel')
    const words = Array.from({ length: 1500 }, (_, index) => `word${index + 1}`)
    stubFrequencyList(words)

    const a1Words = await getWordsForLevel('en', 'A1', new Set(), 2000)
    const a2Words = await getWordsForLevel('en', 'A2', new Set(), 2000)

    expect(a1Words).toHaveLength(1000)
    expect(a2Words).toHaveLength(500)
    expect(a1Words).not.toContain('word1001')
    expect(a2Words).toContain('word1001')
  })

  it('excludes already-known words (case-insensitively)', async () => {
    const { getWordsForLevel } = await import('@/services/wordLevels/getWordsForLevel')
    stubFrequencyList(['Haus', 'Baum', 'Tisch'])

    const words = await getWordsForLevel('de', 'A1', new Set(['haus']), 10)

    expect(words).not.toContain('Haus')
    expect(words.sort()).toEqual(['Baum', 'Tisch'])
  })

  it('filters out non-displayable corpus artifacts', async () => {
    const { getWordsForLevel } = await import('@/services/wordLevels/getWordsForLevel')
    stubFrequencyList(["'s", "'t", 'house', 'i'])

    const words = await getWordsForLevel('en', 'A1', new Set(), 10)

    expect(words.sort()).toEqual(['house', 'i'])
  })

  it('caps the result at the requested count', async () => {
    const { getWordsForLevel } = await import('@/services/wordLevels/getWordsForLevel')
    const words = Array.from({ length: 500 }, (_, index) => `word${index + 1}`)
    stubFrequencyList(words)

    const result = await getWordsForLevel('en', 'A1', new Set(), 15)

    expect(result).toHaveLength(15)
  })
})
