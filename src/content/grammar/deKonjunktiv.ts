// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const deKonjunktiv: GrammarCategory = {
  id: 'de-konjunktiv',
  language: 'de',
  title: 'Konjunktiv I та II',
  description:
    'Konjunktiv II для гіпотетичних і нереальних ситуацій (переважно через würde + Infinitiv) та Konjunktiv I для непрямої мови у формальному й журналістському стилі.',
  topics: [
    {
      id: 'konjunktiv-ii-hypothetical',
      title: 'Konjunktiv II — hypothetische und irreale Situationen',
      theory:
        'Konjunktiv II виражає нереальні або гіпотетичні ситуації в теперішньому чи минулому, а також ввічливі прохання та побажання. У сучасній розмовній німецькій для більшості дієслів він утворюється перифрастично: würde + Infinitiv (Ich würde das nicht machen), а не власною — часто застарілою на слух — формою Konjunktiv II самого дієслова. Виняток становить невелика група дуже вживаних дієслів, що зберігають власні сильні форми Konjunktiv II в побутовому мовленні: sein → wäre, haben → hätte, werden → würde, а також модальні дієслова (мають свої поширені форми, розглянуті в окремій темі Modalverben). Для минулого часу Konjunktiv II утворюється за допомогою hätte/wäre + Partizip II: Ich hätte das gewusst, wenn... (я б знав це, якби...).',
      examples: [
        {
          target: 'Wenn ich Zeit hätte, würde ich dich besuchen.',
          uk: 'Якби в мене був час, я б тебе відвідав (гіпотетична умова: hätte + würde + Infinitiv).',
        },
        {
          target: 'An deiner Stelle wäre ich vorsichtiger.',
          uk: 'На твоєму місці я був би обережнішим (sein → wäre, власна форма Konjunktiv II).',
        },
        {
          target: 'Wenn wir früher losgefahren wären, hätten wir den Zug nicht verpasst.',
          uk: 'Якби ми виїхали раніше, ми б не спізнилися на потяг (минулий Konjunktiv II: wären/hätten + Partizip II).',
        },
      ],
      exercises: [
        {
          id: 'k2h-1',
          type: 'multiple-choice',
          prompt: 'Ich ___ das nicht machen, wenn ich du wäre. (machen — hypothetische Form)',
          options: ['mache', 'machte', 'würde machen', 'gemacht'],
          correctIndex: 2,
          explanation: 'Для більшості дієслів гіпотетичну дію в Konjunktiv II виражають конструкцією würde + Infinitiv.',
        },
        {
          id: 'k2h-2',
          type: 'multiple-choice',
          prompt: 'Wenn ich reich ___, würde ich ein Haus kaufen. (sein)',
          options: ['bin', 'war', 'wäre', 'sei'],
          correctIndex: 2,
          explanation: 'Sein зберігає власну форму Konjunktiv II: wäre (а не описову форму з würde).',
        },
        {
          id: 'k2h-3',
          type: 'fill-blank',
          prompt: 'Wenn ich das gewusst ___ (haben), hätte ich anders reagiert.',
          correctAnswers: ['hätte'],
          explanation: 'Дієслово haben у Konjunktiv II має власну форму: hätte.',
        },
        {
          id: 'k2h-4',
          type: 'fill-blank',
          prompt: 'Wenn wir früher losgefahren ___ (sein), hätten wir den Zug nicht verpasst.',
          correctAnswers: ['wären'],
          explanation: 'Минулий Konjunktiv II для дієслів руху типу losfahren утворюється з wären + Partizip II.',
        },
        {
          id: 'k2h-5',
          type: 'multiple-choice',
          prompt: 'Which construction is normally used to form Konjunktiv II for most ordinary verbs in spoken German?',
          options: [
            "the verb's own Konjunktiv II form, e.g. Ich schriebe",
            'würde + infinitive, e.g. Ich würde schreiben',
            'the Perfekt tense, e.g. Ich habe geschrieben',
            'the Präsens tense, e.g. Ich schreibe',
          ],
          correctIndex: 1,
          explanation: 'У розмовній мові власні форми Konjunktiv II для більшості дієслів звучать застаріло, тому їх замінює würde + Infinitiv.',
        },
      ],
    },
    {
      id: 'konjunktiv-i-reported-speech',
      title: 'Konjunktiv I — indirekte Rede',
      theory:
        'Konjunktiv I вживається майже виключно для непрямої (переказаної) мови у формальному та журналістському стилі — коли автор передає чужі слова, не підтверджуючи й не заперечуючи їхню правдивість: Er sagte, er sei müde (він сказав, що він втомлений). Утворюється від основи дієслова + закінчення -e/-est/-e/-en/-et/-en (наприклад, sein: ich sei, du seiest, er sei, wir seien, ihr seiet, sie seien). Якщо форма Konjunktiv I збігається з формою Indikativ — а це найчастіше трапляється у множині, — таку неоднозначну форму замінюють на Konjunktiv II, щоб зберегти чіткість переказаної мови. У розмовній і побутовій німецькій Konjunktiv I практично не вживається: люди або цитують пряму мову, або використовують підрядні речення з dass.',
      examples: [
        {
          target: 'Der Minister sagte, die Lage sei ernst.',
          uk: 'Міністр сказав, що ситуація серйозна (Konjunktiv I: sei — непряма мова в новинах).',
        },
        {
          target: 'Sie behauptete, sie habe das Dokument nie gesehen.',
          uk: 'Вона стверджувала, що ніколи не бачила цей документ (Konjunktiv I: habe, дистанціювання від чужого твердження).',
        },
        {
          target: 'Die Journalisten berichteten, die Zeugen hätten widersprüchliche Aussagen gemacht.',
          uk: 'Журналісти повідомили, що свідки дали суперечливі свідчення (форма Konjunktiv I sie haben збіглася б з Indikativ, тому замінена на Konjunktiv II hätten).',
        },
      ],
      exercises: [
        {
          id: 'k1rs-1',
          type: 'multiple-choice',
          prompt: 'Der Sprecher sagte, der Präsident ___ krank. (sein — indirekte Rede)',
          options: ['ist', 'war', 'sei', 'wäre'],
          correctIndex: 2,
          explanation: 'Konjunktiv I дієслова sein для 3-ї особи однини: sei — стандартна форма непрямої мови.',
        },
        {
          id: 'k1rs-2',
          type: 'multiple-choice',
          prompt: 'Why is Konjunktiv II sometimes used instead of Konjunktiv I in reported speech?',
          options: [
            'Konjunktiv I does not exist for irregular verbs',
            'When the Konjunktiv I form is identical to the indicative, Konjunktiv II replaces it to avoid ambiguity',
            'Konjunktiv II is more polite',
            'Konjunktiv I is only used in questions',
          ],
          correctIndex: 1,
          explanation: 'Якщо форма Konjunktiv I збігається з Indikativ (найчастіше у множині), її замінюють на Konjunktiv II.',
        },
        {
          id: 'k1rs-3',
          type: 'fill-blank',
          prompt: 'Er sagte, er ___ (haben) keine Zeit. (Konjunktiv I, 3. Person Singular)',
          correctAnswers: ['habe'],
          explanation: 'Konjunktiv I дієслова haben для 3-ї особи однини утворюється від основи hab- + -e: habe.',
        },
        {
          id: 'k1rs-4',
          type: 'fill-blank',
          prompt: 'Die Zeugen sagten, sie ___ (haben) nichts gesehen. (форма замінена, бо Konjunktiv I збігається з Indikativ)',
          correctAnswers: ['hätten'],
          explanation: 'У множині Konjunktiv I sie haben збігається з Indikativ, тому вживають Konjunktiv II: hätten.',
        },
        {
          id: 'k1rs-5',
          type: 'multiple-choice',
          prompt: 'In which context is Konjunktiv I most typically used?',
          options: [
            'Everyday spoken conversation between friends',
            'Formal and journalistic reported/indirect speech',
            'Hypothetical wishes about the present',
            'Polite requests, e.g. Könnten Sie mir helfen?',
          ],
          correctIndex: 1,
          explanation: 'Konjunktiv I типовий для формальної та журналістської непрямої мови, а не для повсякденного спілкування.',
        },
      ],
    },
  ],
}
