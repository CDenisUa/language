// Core
import { afterEach, describe, expect, it, vi } from 'vitest'
// Services
import { getDifficultyTier, loadFrequencyRanks } from '@/services/frequency/frequencyLevels'

describe('frequencyLevels', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  describe('loadFrequencyRanks', () => {
    it('fetches the frequency list once and builds a 1-indexed word-to-rank map, caching the result', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        json: () => Promise.resolve(['ich', 'sie', 'das']),
      })
      vi.stubGlobal('fetch', fetchMock)

      const ranks = await loadFrequencyRanks('de')
      expect(ranks.get('ich')).toBe(1)
      expect(ranks.get('sie')).toBe(2)
      expect(ranks.get('das')).toBe(3)

      await loadFrequencyRanks('de')
      expect(fetchMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('getDifficultyTier', () => {
    it('returns unranked for a word not found in the corpus', () => {
      expect(getDifficultyTier(undefined)).toBe('unranked')
    })

    it('buckets ranks into common/B2/C1/C2 at the configured cutoffs', () => {
      expect(getDifficultyTier(1)).toBe('common')
      expect(getDifficultyTier(3000)).toBe('common')
      expect(getDifficultyTier(3001)).toBe('B2')
      expect(getDifficultyTier(6000)).toBe('B2')
      expect(getDifficultyTier(6001)).toBe('C1')
      expect(getDifficultyTier(15000)).toBe('C1')
      expect(getDifficultyTier(15001)).toBe('C2')
      expect(getDifficultyTier(50000)).toBe('C2')
    })
  })
})
