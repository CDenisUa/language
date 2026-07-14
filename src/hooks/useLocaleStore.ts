// Core
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// Types
import type { Locale } from '@/types/locale'

interface LocaleStoreState {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const useLocaleStore = create<LocaleStoreState>()(
  persist(
    (set) => ({
      locale: 'uk',
      setLocale: (locale) => set({ locale }),
    }),
    { name: 'sprachlabor-locale' },
  ),
)
