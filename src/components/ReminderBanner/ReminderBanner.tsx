// Hooks
import { useReminders } from '@/hooks/useReminders'
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { Reminder } from '@/types/reminder'
import type { TranslationDictionary } from '@/types/translations'
// Styles
import './ReminderBanner.css'

function describeReminder(reminder: Reminder, t: TranslationDictionary): string {
  if (reminder.kind === 'english-unblocked') {
    return t.reminders.englishUnblocked
  }
  const time = reminder.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return `${t.reminders.upcomingEvent} ${reminder.label} · ${time}`
}

function ReminderBanner() {
  const { t } = useTranslation()
  const { reminders, dismiss } = useReminders()

  if (reminders.length === 0) return null

  return (
    <div className="reminder-banner" role="status">
      {reminders.map((reminder) => (
        <div key={reminder.id} className="reminder-banner__item">
          <span>{describeReminder(reminder, t)}</span>
          <button
            type="button"
            className="reminder-banner__dismiss"
            aria-label={t.reminders.dismiss}
            onClick={() => dismiss(reminder.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default ReminderBanner
