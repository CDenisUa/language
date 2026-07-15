// Core
import { beforeEach, describe, expect, it } from 'vitest'
// Hooks
import { useStudyBalanceStore } from '@/hooks/useStudyBalanceStore'
// Consts
import { DEFAULT_TARGET_GERMAN_PERCENT } from '@/consts/dashboard'

describe('useStudyBalanceStore', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useStudyBalanceStore.setState({ targetGermanPercent: DEFAULT_TARGET_GERMAN_PERCENT })
  })

  it('defaults to 70% German', () => {
    expect(useStudyBalanceStore.getState().targetGermanPercent).toBe(70)
  })

  it('sets and persists a new target', () => {
    useStudyBalanceStore.getState().setTargetGermanPercent(60)

    expect(useStudyBalanceStore.getState().targetGermanPercent).toBe(60)
    const stored = JSON.parse(window.localStorage.getItem('sprachlabor-study-balance') ?? '{}')
    expect(stored.state.targetGermanPercent).toBe(60)
  })

  it('clamps out-of-range values to 0-100', () => {
    useStudyBalanceStore.getState().setTargetGermanPercent(150)
    expect(useStudyBalanceStore.getState().targetGermanPercent).toBe(100)

    useStudyBalanceStore.getState().setTargetGermanPercent(-10)
    expect(useStudyBalanceStore.getState().targetGermanPercent).toBe(0)
  })
})
