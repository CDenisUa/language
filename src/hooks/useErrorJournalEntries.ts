// Core
import { useCallback, useEffect, useState } from 'react'
// Services
import { errorJournalRepository } from '@/services/db/errorJournalRepository'
// Types
import type { Language } from '@/types/language'
import type { ErrorJournalEntryRecord } from '@/types/errorJournalEntry'

export function useErrorJournalEntries(language: Language) {
  const [entries, setEntries] = useState<ErrorJournalEntryRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const result = await errorJournalRepository.getByLanguage(language)
    setEntries(result)
    setIsLoading(false)
  }, [language])

  useEffect(() => {
    reload()
  }, [reload])

  return { entries, isLoading, reload }
}
