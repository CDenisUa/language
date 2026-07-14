// Core
import { useState } from 'react'
// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { Language } from '@/types/language'
// Consts
import { WEEKDAY_ORDER } from '@/consts/scheduler'
// Styles
import './ScheduleForm.css'

export interface RecurringFormValues {
  kind: 'recurring'
  language: Language
  daysOfWeek: number[]
  startTime: string
  endTime: string
  label: string
}

export interface ExceptionFormValues {
  kind: 'exception'
  language: Language
  date: string
  action: 'skip' | 'add'
  startTime: string
  endTime: string
  label: string
}

export type ScheduleFormValues = RecurringFormValues | ExceptionFormValues

const DAY_LABEL_KEYS = {
  1: 'dayMon',
  2: 'dayTue',
  3: 'dayWed',
  4: 'dayThu',
  5: 'dayFri',
  6: 'daySat',
  0: 'daySun',
} as const

interface ScheduleFormProps {
  onSave: (values: ScheduleFormValues) => void
}

function ScheduleForm({ onSave }: ScheduleFormProps) {
  const { t } = useTranslation()
  const [kind, setKind] = useState<'recurring' | 'exception'>('recurring')
  const [language, setLanguage] = useState<Language>('de')
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([])
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('13:00')
  const [date, setDate] = useState('')
  const [action, setAction] = useState<'skip' | 'add'>('skip')
  const [label, setLabel] = useState('')

  const toggleDay = (day: number) => {
    setDaysOfWeek((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (kind === 'recurring') {
      if (daysOfWeek.length === 0 || !startTime || !endTime) return
      onSave({ kind: 'recurring', language, daysOfWeek, startTime, endTime, label })
    } else {
      if (!date) return
      onSave({ kind: 'exception', language, date, action, startTime, endTime, label })
    }

    setLabel('')
  }

  return (
    <form className="schedule-form" onSubmit={handleSubmit}>
      <h2>{t.scheduler.addEvent}</h2>

      <div className="schedule-form__row">
        <label className="schedule-form__field">
          <span>{t.scheduler.language}</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
            <option value="de">Deutsch</option>
            <option value="en">English</option>
          </select>
        </label>
        <div className="schedule-form__field schedule-form__field--kind" role="radiogroup">
          <label>
            <input
              type="radio"
              checked={kind === 'recurring'}
              onChange={() => setKind('recurring')}
            />
            {t.scheduler.typeRecurring}
          </label>
          <label>
            <input
              type="radio"
              checked={kind === 'exception'}
              onChange={() => setKind('exception')}
            />
            {t.scheduler.typeException}
          </label>
        </div>
      </div>

      {kind === 'recurring' ? (
        <div className="schedule-form__days" role="group" aria-label={t.scheduler.daysOfWeek}>
          {WEEKDAY_ORDER.map((day) => (
            <label key={day} className="schedule-form__day">
              <input
                type="checkbox"
                checked={daysOfWeek.includes(day)}
                onChange={() => toggleDay(day)}
              />
              {t.scheduler[DAY_LABEL_KEYS[day as keyof typeof DAY_LABEL_KEYS]]}
            </label>
          ))}
        </div>
      ) : (
        <div className="schedule-form__row">
          <label className="schedule-form__field">
            <span>{t.scheduler.date}</span>
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          </label>
          <label className="schedule-form__field">
            <span>{t.scheduler.action}</span>
            <select value={action} onChange={(event) => setAction(event.target.value as 'skip' | 'add')}>
              <option value="skip">{t.scheduler.actionSkip}</option>
              <option value="add">{t.scheduler.actionAdd}</option>
            </select>
          </label>
        </div>
      )}

      {(kind === 'recurring' || action === 'add') && (
        <div className="schedule-form__row">
          <label className="schedule-form__field">
            <span>{t.scheduler.startTime}</span>
            <input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} required />
          </label>
          <label className="schedule-form__field">
            <span>{t.scheduler.endTime}</span>
            <input type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} required />
          </label>
        </div>
      )}

      <label className="schedule-form__field">
        <span>{t.scheduler.label}</span>
        <input value={label} onChange={(event) => setLabel(event.target.value)} />
      </label>

      <button type="submit" className="schedule-form__submit">
        {t.scheduler.save}
      </button>
    </form>
  )
}

export default ScheduleForm
