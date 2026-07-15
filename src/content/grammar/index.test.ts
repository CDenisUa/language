// Core
import { describe, expect, it } from 'vitest'
// Consts
import { GRAMMAR_CATEGORIES } from '@/content/grammar'

describe('GRAMMAR_CATEGORIES', () => {
  it('has globally unique topic ids and exercise ids', () => {
    const topicIds = new Set<string>()
    const exerciseIds = new Set<string>()

    for (const category of GRAMMAR_CATEGORIES) {
      for (const topic of category.topics) {
        expect(topicIds.has(topic.id)).toBe(false)
        topicIds.add(topic.id)
        for (const exercise of topic.exercises) {
          expect(exerciseIds.has(exercise.id)).toBe(false)
          exerciseIds.add(exercise.id)
        }
      }
    }
  })

  it('has a valid correctIndex for every multiple-choice exercise', () => {
    for (const category of GRAMMAR_CATEGORIES) {
      for (const topic of category.topics) {
        for (const exercise of topic.exercises) {
          if (exercise.type !== 'multiple-choice') continue
          expect(exercise.correctIndex).toBeGreaterThanOrEqual(0)
          expect(exercise.correctIndex).toBeLessThan(exercise.options.length)
        }
      }
    }
  })

  it('has at least one non-empty correctAnswers entry for every fill-blank exercise', () => {
    for (const category of GRAMMAR_CATEGORIES) {
      for (const topic of category.topics) {
        for (const exercise of topic.exercises) {
          if (exercise.type !== 'fill-blank') continue
          expect(exercise.correctAnswers.length).toBeGreaterThan(0)
          for (const answer of exercise.correctAnswers) {
            expect(answer.trim().length).toBeGreaterThan(0)
          }
        }
      }
    }
  })

  it('includes both English and German categories', () => {
    const languages = new Set(GRAMMAR_CATEGORIES.map((category) => category.language))
    expect(languages).toEqual(new Set(['en', 'de']))
  })
})
