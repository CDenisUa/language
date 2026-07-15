// Core
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
// Consts
import { DEFAULT_TARGET_GERMAN_PERCENT } from '@/consts/dashboard'

interface StudyBalanceStoreState {
  targetGermanPercent: number
  setTargetGermanPercent: (percent: number) => void
}

export const useStudyBalanceStore = create<StudyBalanceStoreState>()(
  persist(
    (set) => ({
      targetGermanPercent: DEFAULT_TARGET_GERMAN_PERCENT,
      setTargetGermanPercent: (percent) =>
        set({ targetGermanPercent: Math.min(100, Math.max(0, Math.round(percent))) }),
    }),
    { name: 'sprachlabor-study-balance' },
  ),
)
