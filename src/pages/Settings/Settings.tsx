// Hooks
import { useTranslation } from '@/i18n/useTranslation'

function Settings() {
  const { t } = useTranslation()

  return (
    <section>
      <h1>{t.pages.settings.title}</h1>
      <p>{t.pages.settings.description}</p>
    </section>
  )
}

export default Settings
