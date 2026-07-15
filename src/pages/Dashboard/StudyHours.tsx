// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Styles
import './StudyHours.css'

interface StudyHoursProps {
  germanSeconds: number
  englishSeconds: number
  targetGermanPercent: number
}

function formatHours(seconds: number): string {
  return (seconds / 3600).toFixed(1)
}

function StudyHours({ germanSeconds, englishSeconds, targetGermanPercent }: StudyHoursProps) {
  const { t } = useTranslation()
  const totalSeconds = germanSeconds + englishSeconds

  return (
    <div className="study-hours">
      <h2>{t.dashboard.hoursHeading}</h2>

      {totalSeconds === 0 ? (
        <p className="study-hours__empty">{t.dashboard.noActivity}</p>
      ) : (
        <>
          <div className="study-hours__row">
            <span className="study-hours__language study-hours__language--de">
              {t.dashboard.germanLabel}: {formatHours(germanSeconds)} {t.dashboard.hoursUnit}
            </span>
            <span className="study-hours__language study-hours__language--en">
              {t.dashboard.englishLabel}: {formatHours(englishSeconds)} {t.dashboard.hoursUnit}
            </span>
          </div>
          <p className="study-hours__balance">
            {t.dashboard.actualBalanceLabel}: {Math.round((germanSeconds / totalSeconds) * 100)}% /{' '}
            {Math.round((englishSeconds / totalSeconds) * 100)}% · {t.dashboard.targetBalanceLabel}:{' '}
            {targetGermanPercent}% / {100 - targetGermanPercent}%
          </p>
        </>
      )}
    </div>
  )
}

export default StudyHours
