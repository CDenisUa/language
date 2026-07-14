// Core
import { beforeEach, describe, expect, it } from 'vitest'
// Hooks
import { useLocaleStore } from '@/hooks/useLocaleStore'

describe('useLocaleStore', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useLocaleStore.setState({ locale: 'uk' })
  })

  it('defaults to Ukrainian', () => {
    expect(useLocaleStore.getState().locale).toBe('uk')
  })

  it('switches locale and persists it to localStorage', () => {
    useLocaleStore.getState().setLocale('ru')

    expect(useLocaleStore.getState().locale).toBe('ru')
    const stored = JSON.parse(window.localStorage.getItem('sprachlabor-locale') ?? '{}')
    expect(stored.state.locale).toBe('ru')
  })
})
