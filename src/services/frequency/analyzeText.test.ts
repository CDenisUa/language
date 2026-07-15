// Core
import { afterEach, describe, expect, it, vi } from 'vitest'
// Services
import { analyzeText } from '@/services/frequency/analyzeText'

describe('analyzeText', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('tags word segments with a difficulty tier and leaves other segments untagged', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ json: () => Promise.resolve(['ich', 'gehe']) }),
    )

    const segments = await analyzeText('Ich Fenster.', 'de')

    expect(segments).toEqual([
      { type: 'word', text: 'Ich', tier: 'common' },
      { type: 'other', text: ' ' },
      { type: 'word', text: 'Fenster', tier: 'unranked' },
      { type: 'other', text: '.' },
    ])
  })

  it('matches words case-insensitively against the frequency list', async () => {
    // Uses 'en' rather than 'de' so this doesn't hit the previous test's cached 'de' rank map.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve(['house']) }))

    const segments = await analyzeText('HOUSE', 'en')

    expect(segments[0]).toEqual({ type: 'word', text: 'HOUSE', tier: 'common' })
  })
})
