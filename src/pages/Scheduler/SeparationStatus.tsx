// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { TemporalSeparationStatus } from '@/services/scheduler/temporalSeparation'
// Styles
import './SeparationStatus.css'

interface SeparationStatusProps {
  status: TemporalSeparationStatus
}

function SeparationStatus({ status }: SeparationStatusProps) {
  const { t } = useTranslation()

  if (!status.blocked || !status.unblockedAt) {
    return <p className="separation-status separation-status--available">{t.scheduler.separationAvailable}</p>
  }

  const time = status.unblockedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <p className="separation-status separation-status--blocked">
      {t.scheduler.separationBlockedUntil} {time}
    </p>
  )
}

export default SeparationStatus
