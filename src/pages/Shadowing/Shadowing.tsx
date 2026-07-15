// Core
import { useState } from 'react'
// Components
import TrackUploadForm from '@/pages/Shadowing/TrackUploadForm'
import TrackList from '@/pages/Shadowing/TrackList'
import ShadowingPractice from '@/pages/Shadowing/ShadowingPractice'
// Hooks
import { useLanguageStore } from '@/hooks/useLanguageStore'
import { useShadowingTracks } from '@/hooks/useShadowingTracks'
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { shadowingTracksRepository } from '@/services/db/shadowingTracksRepository'
import { shadowingSessionsRepository } from '@/services/db/shadowingSessionsRepository'
// Types
import type { ShadowingSessionInput } from '@/pages/Shadowing/ShadowingPractice'
import type { ShadowingTrackRecord } from '@/types/shadowingTrack'
// Styles
import './Shadowing.css'

function Shadowing() {
  const { t } = useTranslation()
  const activeLanguage = useLanguageStore((state) => state.activeLanguage)
  const { tracks, reload } = useShadowingTracks(activeLanguage)
  const [practicingTrack, setPracticingTrack] = useState<ShadowingTrackRecord | null>(null)

  const handleUpload = async ({ title, file }: { title: string; file: File }) => {
    await shadowingTracksRepository.save({
      language: activeLanguage,
      title,
      audioBlob: file,
      mimeType: file.type,
    })
    await reload()
  }

  const handleDelete = async (track: ShadowingTrackRecord) => {
    await shadowingTracksRepository.remove(track.id)
    if (practicingTrack?.id === track.id) setPracticingTrack(null)
    await reload()
  }

  const handleSaveSession = async (input: ShadowingSessionInput) => {
    if (!practicingTrack) return
    await shadowingSessionsRepository.save({
      trackId: practicingTrack.id,
      language: activeLanguage,
      ...input,
    })
    setPracticingTrack(null)
  }

  return (
    <section className="shadowing-page">
      <h1>{t.pages.shadowing.title}</h1>
      <p>{t.pages.shadowing.description}</p>

      {practicingTrack ? (
        <ShadowingPractice
          track={practicingTrack}
          language={activeLanguage}
          onSave={handleSaveSession}
          onBack={() => setPracticingTrack(null)}
        />
      ) : (
        <>
          <TrackUploadForm onUpload={handleUpload} />
          <TrackList tracks={tracks} onPractice={setPracticingTrack} onDelete={handleDelete} />
        </>
      )}
    </section>
  )
}

export default Shadowing
