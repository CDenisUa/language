// Hooks
import { useTranslation } from '@/i18n/useTranslation'

function Scheduler() {
  const { t } = useTranslation()

  return (
    <section>
      <h1>{t.pages.scheduler.title}</h1>
      <p>{t.pages.scheduler.description}</p>
    </section>
  )
}

export default Scheduler
