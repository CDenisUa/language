// Core
import { create } from 'zustand'
// Types
import type { Language } from '@/types/language'

interface LanguageStoreState {
  activeLanguage: Language
  setActiveLanguage: (language: Language) => void
}

export const useLanguageStore = create<LanguageStoreState>((set) => ({
  activeLanguage: 'de',
  setActiveLanguage: (language) => set({ activeLanguage: language }),
}))
