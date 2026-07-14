// Core
import { describe, expect, it } from 'vitest'
// Services
import { zonedNow } from './zonedNow'

describe('zonedNow', () => {
  it('shifts a UTC instant so local-time getters read Vienna wall-clock time (CEST, UTC+2)', () => {
    const utcInstant = new Date('2026-07-16T17:03:00Z')
    const result = zonedNow('Europe/Vienna', utcInstant)

    expect(result.getHours()).toBe(19)
    expect(result.getMinutes()).toBe(3)
    expect(result.getDate()).toBe(16)
  })

  it('shifts across a UTC day boundary (CEST, UTC+2)', () => {
    const utcInstant = new Date('2026-07-16T23:30:00Z')
    const result = zonedNow('Europe/Vienna', utcInstant)

    expect(result.getDate()).toBe(17)
    expect(result.getHours()).toBe(1)
    expect(result.getMinutes()).toBe(30)
  })

  it('reflects the winter UTC+1 offset (CET), not a fixed offset', () => {
    const utcInstant = new Date('2026-01-16T17:03:00Z')
    const result = zonedNow('Europe/Vienna', utcInstant)

    expect(result.getHours()).toBe(18)
  })
})
