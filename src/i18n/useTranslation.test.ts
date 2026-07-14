// Core
import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
// Hooks
import { useLocaleStore } from '@/hooks/useLocaleStore'
import { useTranslation } from '@/i18n/useTranslation'

describe('useTranslation', () => {
  beforeEach(() => {
    window.localStorage.clear()
    useLocaleStore.setState({ locale: 'uk' })
  })

  it('returns the Ukrainian dictionary by default', () => {
    const { result } = renderHook(() => useTranslation())

    expect(result.current.locale).toBe('uk')
    expect(result.current.t.nav.dashboard).toBe('Панель')
  })

  it('switches to the Russian dictionary', () => {
    const { result } = renderHook(() => useTranslation())

    act(() => result.current.setLocale('ru'))

    expect(result.current.locale).toBe('ru')
    expect(result.current.t.nav.vocabulary).toBe('Словарь')
  })
})
