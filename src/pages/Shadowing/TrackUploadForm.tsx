// Core
import { useState } from 'react'
// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Styles
import './TrackUploadForm.css'

interface TrackUploadFormProps {
  onUpload: (input: { title: string; file: File }) => void
}

function TrackUploadForm({ onUpload }: TrackUploadFormProps) {
  const { t } = useTranslation()
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim() || !file) return

    onUpload({ title: title.trim(), file })
    setTitle('')
    setFile(null)
    event.currentTarget.reset()
  }

  return (
    <form className="track-upload-form" onSubmit={handleSubmit}>
      <h2>{t.shadowing.uploadHeading}</h2>
      <div className="track-upload-form__row">
        <label className="track-upload-form__field">
          <span>{t.shadowing.trackTitleLabel}</span>
          <input value={title} onChange={(event) => setTitle(event.target.value)} required />
        </label>
        <label className="track-upload-form__field">
          <span>{t.shadowing.fileLabel}</span>
          <input
            type="file"
            accept="audio/*"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </label>
      </div>
      <button type="submit" className="track-upload-form__submit">
        {t.shadowing.upload}
      </button>
    </form>
  )
}

export default TrackUploadForm
