// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { ShadowingTrackRecord } from '@/types/shadowingTrack'
// Styles
import './TrackList.css'

interface TrackListProps {
  tracks: ShadowingTrackRecord[]
  onPractice: (track: ShadowingTrackRecord) => void
  onDelete: (track: ShadowingTrackRecord) => void
}

function TrackList({ tracks, onPractice, onDelete }: TrackListProps) {
  const { t } = useTranslation()

  return (
    <div className="track-list">
      <h2>{t.shadowing.trackListHeading}</h2>

      {tracks.length === 0 ? (
        <p className="track-list__empty">{t.shadowing.emptyTrackList}</p>
      ) : (
        <ul className="track-list__items">
          {tracks.map((track) => (
            <li key={track.id} className="track-list__item">
              <span className="track-list__title">{track.title}</span>
              <div className="track-list__actions">
                <button type="button" onClick={() => onPractice(track)}>
                  {t.shadowing.practice}
                </button>
                <button type="button" onClick={() => onDelete(track)}>
                  {t.shadowing.delete}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TrackList
