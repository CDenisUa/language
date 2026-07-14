export interface EnglishUnblockedReminder {
  id: string
  kind: 'english-unblocked'
}

export interface UpcomingEventReminder {
  id: string
  kind: 'upcoming-event'
  label: string
  start: Date
}

export type Reminder = EnglishUnblockedReminder | UpcomingEventReminder
