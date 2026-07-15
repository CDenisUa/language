// Core
import { describe, expect, it } from 'vitest'
// Services
import { getCefrLevelForRank } from '@/services/wordLevels/getCefrLevelForRank'

describe('getCefrLevelForRank', () => {
  it('buckets ranks into the configured CEFR-like bands at their cutoffs', () => {
    expect(getCefrLevelForRank(1)).toBe('A1')
    expect(getCefrLevelForRank(1000)).toBe('A1')
    expect(getCefrLevelForRank(1001)).toBe('A2')
    expect(getCefrLevelForRank(2000)).toBe('A2')
    expect(getCefrLevelForRank(2001)).toBe('B1')
    expect(getCefrLevelForRank(4000)).toBe('B1')
    expect(getCefrLevelForRank(4001)).toBe('B2')
    expect(getCefrLevelForRank(8000)).toBe('B2')
    expect(getCefrLevelForRank(8001)).toBe('C1')
    expect(getCefrLevelForRank(20000)).toBe('C1')
    expect(getCefrLevelForRank(20001)).toBe('C2')
    expect(getCefrLevelForRank(50000)).toBe('C2')
  })

  it('returns undefined for a rank beyond the top 50k', () => {
    expect(getCefrLevelForRank(50001)).toBeUndefined()
  })
})
