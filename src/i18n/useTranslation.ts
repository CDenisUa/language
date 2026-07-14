// Hooks
import { useLocaleStore } from '@/hooks/useLocaleStore'
// Consts
import { TRANSLATIONS } from '@/i18n/translations'

export function useTranslation() {
  const locale = useLocaleStore((state) => state.locale)
  const setLocale = useLocaleStore((state) => state.setLocale)

  return { t: TRANSLATIONS[locale], locale, setLocale }
}
