// Hooks
import { useTranslation } from '@/i18n/useTranslation'

function Shadowing() {
  const { t } = useTranslation()

  return (
    <section>
      <h1>{t.pages.shadowing.title}</h1>
      <p>{t.pages.shadowing.description}</p>
    </section>
  )
}

export default Shadowing
