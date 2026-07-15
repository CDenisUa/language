// Core
import { useCallback, useEffect, useState } from 'react'
// Services
import { shadowingTracksRepository } from '@/services/db/shadowingTracksRepository'
// Types
import type { Language } from '@/types/language'
import type { ShadowingTrackRecord } from '@/types/shadowingTrack'

export function useShadowingTracks(language: Language) {
  const [tracks, setTracks] = useState<ShadowingTrackRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const reload = useCallback(async () => {
    setIsLoading(true)
    const result = await shadowingTracksRepository.getByLanguage(language)
    setTracks(result)
    setIsLoading(false)
  }, [language])

  useEffect(() => {
    reload()
  }, [reload])

  return { tracks, isLoading, reload }
}
