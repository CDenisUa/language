// Hooks
import { usePushSubscription } from '@/hooks/usePushSubscription'
import { useTranslation } from '@/i18n/useTranslation'
// Styles
import './Settings.css'

function Settings() {
  const { t } = useTranslation()
  const push = usePushSubscription()

  return (
    <section>
      <h1>{t.pages.settings.title}</h1>
      <p>{t.pages.settings.description}</p>

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
