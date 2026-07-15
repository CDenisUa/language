// Core
import { useCallback, useEffect, useState } from 'react'
// Services
import { grammarProgressRepository } from '@/services/db/grammarProgressRepository'
// Types
import type { GrammarProgressRecord } from '@/types/grammarProgress'

export function useGrammarProgress() {
  const [progress, setProgress] = useState<GrammarProgressRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const result = await grammarProgressRepository.getAll()
    setProgress(result)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { progress, isLoading, reload }
}
