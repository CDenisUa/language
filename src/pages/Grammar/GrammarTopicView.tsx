// Components
import GrammarExercise from '@/pages/Grammar/GrammarExercise'
// Hooks
import { useTranslation } from '@/i18n/useTranslation'
// Types
import type { GrammarTopic } from '@/types/grammarTopic'
import type { GrammarProgressRecord } from '@/types/grammarProgress'
// Styles
import './GrammarTopicView.css'

interface GrammarTopicViewProps {
  topic: GrammarTopic
  progress: GrammarProgressRecord[]
  onAnswered: (exerciseId: string, correct: boolean) => void
}

function GrammarTopicView({ topic, progress, onAnswered }: GrammarTopicViewProps) {
  const { t } = useTranslation()

  return (
    <div className="grammar-topic-view">
      <h2>{topic.title}</h2>
      <p className="grammar-topic-view__theory">{topic.theory}</p>

      <ul className="grammar-topic-view__examples">
        {topic.examples.map((example) => (
          <li key={example.en} className="grammar-topic-view__example">
            <span className="grammar-topic-view__example-en">{example.en}</span>
            <span className="grammar-topic-view__example-uk">{example.uk}</span>
          </li>
        ))}
      </ul>

      <h3 className="grammar-topic-view__exercises-heading">{t.grammar.exercisesHeading}</h3>
      <ul className="grammar-topic-view__exercise-list">
        {topic.exercises.map((exercise, index) => (
          <GrammarExercise
            key={exercise.id}
            exercise={exercise}
            index={index}
            savedResult={progress.find((record) => record.exerciseId === exercise.id)}
            onAnswered={onAnswered}
          />
        ))}
      </ul>
    </div>
  )
}

export default GrammarTopicView
