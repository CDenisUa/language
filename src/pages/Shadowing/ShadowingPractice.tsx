// Core
import { useEffect, useRef, useState } from 'react'
// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Services
import { isSpeechRecognitionSupported, startRecognition } from '@/services/speechRecognition/speechRecognition'
// Types
import type { RecognitionHandle } from '@/services/speechRecognition/speechRecognition'
import type { Language } from '@/types/language'
import type { ShadowingTrackRecord } from '@/types/shadowingTrack'
// Consts
import { SPEECH_LOCALES } from '@/consts/speechLocales'
// Styles
import './ShadowingPractice.css'

export interface ShadowingSessionInput {
  rating: number
  practiceDurationSeconds: number
  notes?: string
}

interface ShadowingPracticeProps {
  track: ShadowingTrackRecord
  language: Language
  onSave: (input: ShadowingSessionInput) => void
  onBack: () => void
}

const RATING_VALUES = [1, 2, 3, 4, 5]

function ShadowingPractice({ track, language, onSave, onBack }: ShadowingPracticeProps) {
  const { t } = useTranslation()
  const audioRef = useRef<HTMLAudioElement>(null)
  const recognitionRef = useRef<RecognitionHandle | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [heardText, setHeardText] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [notes, setNotes] = useState('')

  const speechSupported = isSpeechRecognitionSupported()

  useEffect(() => {
    const url = URL.createObjectURL(track.audioBlob)
    setAudioUrl(url)
    return () => {
      URL.revokeObjectURL(url)
      recognitionRef.current?.stop()
      recognitionRef.current = null
    }
  }, [track])

  const handlePlay = () => {
    if (!speechSupported || recognitionRef.current) return
    recognitionRef.current = startRecognition(SPEECH_LOCALES[language], setHeardText)
  }

  const handleStop = () => {
    recognitionRef.current?.stop()
    recognitionRef.current = null
  }

  const handleSave = () => {
    if (rating === null) return
    const practiceDurationSeconds = Math.round(audioRef.current?.currentTime ?? 0)
    onSave({ rating, practiceDurationSeconds, notes: notes.trim() || undefined })
  }

  return (
    <div className="shadowing-practice">
      <button type="button" className="shadowing-practice__back" onClick={onBack}>
        {t.shadowing.backToList}
      </button>

      <h2>{track.title}</h2>

      {audioUrl && (
        <audio
          ref={audioRef}
          className="shadowing-practice__audio"
          src={audioUrl}
          controls
          onPlay={handlePlay}
          onPause={handleStop}
          onEnded={handleStop}
        />
      )}

      <div className="shadowing-practice__feedback">
        {speechSupported ? (
          <p>
            <strong>{t.shadowing.heardLabel}</strong> {heardText || '…'}
          </p>
        ) : (
          <p className="shadowing-practice__feedback-unavailable">{t.shadowing.liveFeedbackUnavailable}</p>
        )}
      </div>

      <div className="shadowing-practice__rating">
        <h3>{t.shadowing.rateHeading}</h3>
        <div className="shadowing-practice__stars">
          {RATING_VALUES.map((value) => (
            <button
              key={value}
              type="button"
              className={`shadowing-practice__star${rating !== null && value <= rating ? ' shadowing-practice__star--filled' : ''}`}
              aria-label={`${value} / 5`}
              aria-pressed={rating === value}
              onClick={() => setRating(value)}
            >
              ★
            </button>
          ))}
        </div>
        <label className="shadowing-practice__notes-field">
          <span>{t.shadowing.notesLabel}</span>
          <textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={2} />
        </label>
        <button
          type="button"
          className="shadowing-practice__save"
          onClick={handleSave}
          disabled={rating === null}
        >
          {t.shadowing.saveSession}
        </button>
      </div>
    </div>
  )
}

export default ShadowingPractice
