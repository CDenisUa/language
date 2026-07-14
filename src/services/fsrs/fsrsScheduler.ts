// Core
import { Rating, createEmptyCard, fsrs } from 'ts-fsrs'
import type { Card, Grade } from 'ts-fsrs'

export { Rating }
export type { Grade }

const scheduler = fsrs()

export function createNewCard(now: Date = new Date()): Card {
  return createEmptyCard(now)
}

export function scheduleReview(card: Card, grade: Grade, now: Date = new Date()): Card {
  return scheduler.next(card, now, grade).card
}

export function isDue(card: Card, now: Date = new Date()): boolean {
  return card.due.getTime() <= now.getTime()
}
