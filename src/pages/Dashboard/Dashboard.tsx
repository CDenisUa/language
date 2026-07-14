// Hooks
import { useTranslation } from '@/i18n/useTranslation'

function Dashboard() {
  const { t } = useTranslation()

  return (
    <section>
      <h1>{t.pages.dashboard.title}</h1>
      <p>{t.pages.dashboard.description}</p>
    </section>
  )
}

export default Dashboard
