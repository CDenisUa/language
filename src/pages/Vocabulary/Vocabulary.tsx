// Hooks
import { useTranslation } from '@/i18n/useTranslation'

function Vocabulary() {
  const { t } = useTranslation()

  return (
    <section>
      <h1>{t.pages.vocabulary.title}</h1>
      <p>{t.pages.vocabulary.description}</p>
    </section>
  )
}

export default Vocabulary
