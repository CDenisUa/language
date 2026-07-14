// Hooks
import { useTranslation } from '@/i18n/useTranslation'

function ErrorJournal() {
  const { t } = useTranslation()

  return (
    <section>
      <h1>{t.pages.errorJournal.title}</h1>
      <p>{t.pages.errorJournal.description}</p>
    </section>
  )
}

export default ErrorJournal
