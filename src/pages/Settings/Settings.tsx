// Hooks
import { usePushSubscription } from '@/hooks/usePushSubscription'
import { useStudyBalanceStore } from '@/hooks/useStudyBalanceStore'
import { useTranslation } from '@/i18n/useTranslation'
// Styles
import './Settings.css'

function Settings() {
  const { t } = useTranslation()
  const push = usePushSubscription()
  const targetGermanPercent = useStudyBalanceStore((state) => state.targetGermanPercent)
  const setTargetGermanPercent = useStudyBalanceStore((state) => state.setTargetGermanPercent)

  return (
    <section>
      <h1>{t.pages.settings.title}</h1>
      <p>{t.pages.settings.description}</p>

      <div className="settings-balance">
        <h2>{t.settings.balanceHeading}</h2>
        <label className="settings-balance__field">
          <span>{t.settings.balanceTargetLabel}</span>
          <input
            type="number"
            min={0}
            max={100}
            value={targetGermanPercent}
            onChange={(event) => setTargetGermanPercent(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="settings-push">
        <h2>{t.settings.pushHeading}</h2>
        {push.supported ? (
          <>
            <button type="button" disabled={push.loading} onClick={push.subscribed ? push.disable : push.enable}>
              {push.subscribed ? t.settings.pushDisable : t.settings.pushEnable}
            </button>
            {push.error && <p className="settings-push__error">{push.error}</p>}
          </>
        ) : (
          <p>{t.settings.pushUnsupported}</p>
        )}
      </div>
    </section>
  )
}

export default Settings
