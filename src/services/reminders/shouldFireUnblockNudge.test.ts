// Core
import { describe, expect, it } from 'vitest'
// Services
import { shouldFireUnblockNudge } from '@/services/reminders/shouldFireUnblockNudge'

describe('shouldFireUnblockNudge', () => {
  it('fires on the blocked -> available transition', () => {
    expect(shouldFireUnblockNudge(true, false)).toBe(true)
  })

  it('does not fire while still blocked', () => {
    expect(shouldFireUnblockNudge(true, true)).toBe(false)
  })

  it('does not fire when already available', () => {
    expect(shouldFireUnblockNudge(false, false)).toBe(false)
  })

  it('does not fire on the available -> blocked transition', () => {
    expect(shouldFireUnblockNudge(false, true)).toBe(false)
  })
})
