// Core
import { useCallback, useEffect, useState } from 'react'
// Services
import { wordsRepository } from '@/services/db/wordsRepository'
// Types
import type { Language } from '@/types/language'
import type { WordRecord } from '@/types/word'

export function useWords(language: Language) {
  const [words, setWords] = useState<WordRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const result = await wordsRepository.getByLanguage(language)
    setWords(result)
    setIsLoading(false)
  }, [language])

  useEffect(() => {
    reload()
  }, [reload])

  return { words, isLoading, reload }
}
