// Core
import { useCallback, useEffect, useState } from 'react'
// Services
import { knownWordsRepository } from '@/services/db/knownWordsRepository'
// Types
import type { Language } from '@/types/language'
import type { KnownWordRecord } from '@/types/knownWord'

export function useKnownWords(language: Language) {
  const [knownWords, setKnownWords] = useState<KnownWordRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const result = await knownWordsRepository.getByLanguage(language)
    setKnownWords(result)
    setIsLoading(false)
  }, [language])

  useEffect(() => {
    reload()
  }, [reload])

  return { knownWords, isLoading, reload }
}
