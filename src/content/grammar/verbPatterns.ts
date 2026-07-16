// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const verbPatterns: GrammarCategory = {
  id: 'verb-patterns',
  language: 'en',
  title: 'Неособові форми дієслова',
  description:
    'Інфінітив із to й без нього, герундій та дієслова, чиє значення змінюється залежно від того, який патерн іде далі, а також дієприкметникові звороти для елегантнішого стилю.',
  topics: [
    {
      id: 'infinitive-with-without-to',
      title: 'Infinitive With and Without "to"',
      theory:
        'Більшість дієслів (want, decide, agree, hope, promise, refuse) вимагають після себе інфінітив із to. Проте після модальних дієслів (can, must, should) і після make/let (у значенні "змушувати/дозволяти") вживається "голий" інфінітив без to: `She made him apologise`, `Let me help you`. Дієслова сприйняття (see, hear, watch, feel) `+ object + bare infinitive` описують дію, яку побачили/почули від початку до кінця повністю (`I saw him cross the street`), тоді як той самий патерн з -ing описує дію в процесі, спостережену частково (`I saw him crossing the street` — я побачив, як він переходив, можливо не до кінця).',
      examples: [
        { target: 'She decided to leave early.', uk: 'Вона вирішила поїхати раніше (to-infinitive після decide).' },
        { target: 'My parents let me stay out late.', uk: 'Батьки дозволили мені гуляти допізна (bare infinitive після let).' },
        { target: 'I saw him cross the street.', uk: 'Я побачив, як він перейшов вулицю (повна дія, bare infinitive).' },
      ],
      exercises: [
        {
          id: 'iwt-1',
          type: 'multiple-choice',
          prompt: 'She agreed ___ us with the project.',
          options: ['help', 'to help', 'helping', 'helped'],
          correctIndex: 1,
          explanation: 'Agree вимагає to-infinitive після себе.',
        },
        {
          id: 'iwt-2',
          type: 'multiple-choice',
          prompt: 'My boss made me ___ the report again.',
          options: ['to rewrite', 'rewrite', 'rewriting', 'rewrote'],
          correctIndex: 1,
          explanation: 'Make (у значенні "змушувати") + object + bare infinitive без to.',
        },
        {
          id: 'iwt-3',
          type: 'fill-blank',
          prompt: 'I heard the door ___ (open) — someone came in.',
          correctAnswers: ['open'],
          explanation: 'See/hear + object + bare infinitive описує повністю почуту/побачену дію.',
        },
        {
          id: 'iwt-4',
          type: 'fill-blank',
          prompt: 'You can\'t ___ (leave) before the meeting ends.',
          correctAnswers: ['leave'],
          explanation: 'Після модального can — bare infinitive без to.',
        },
        {
          id: 'iwt-5',
          type: 'multiple-choice',
          prompt: 'Choose the sentence describing an action seen only partly in progress.',
          options: [
            'I saw her enter the building.',
            'I saw her entering the building as I was passing by.',
            'I saw her to enter the building.',
            'I saw her entered the building.',
          ],
          correctIndex: 1,
          explanation: 'Perception verb + object + -ing описує дію в процесі, спостережену частково.',
        },
      ],
    },
    {
      id: 'gerund',
      title: 'The Gerund (-ing form)',
      engVidUrl: 'https://www.engvid.com/6-ways-to-use-gerunds/',
      theory:
        'Герундій (-ing форма дієслова) поводиться як іменник: може бути підметом речення (`Swimming is great exercise`), вживається після прийменників (`interested in learning`, `good at cooking`) і після певного списку дієслів, що вимагають саме -ing, а не to-infinitive: enjoy, avoid, finish, suggest, mind, admit, deny, practise, risk, imagine. На відміну від інфінітива, який часто описує намір чи мету, герундій зазвичай описує дію як загальну концепцію, звичну активність або вже здійснений факт.',
      examples: [
        { target: 'Swimming is my favourite way to relax.', uk: 'Плавання — мій улюблений спосіб розслабитись (герундій як підмет).' },
        { target: "I'm not interested in watching TV tonight.", uk: 'Мені не цікаво дивитись телевізор сьогодні (герундій після прийменника in).' },
        { target: 'She suggested going for a walk.', uk: 'Вона запропонувала прогулятись (suggest вимагає герундій).' },
      ],
      exercises: [
        {
          id: 'ger-1',
          type: 'multiple-choice',
          prompt: '___ a new language takes a lot of patience.',
          options: ['Learn', 'To learn', 'Learning', 'Learned'],
          correctIndex: 2,
          explanation: 'Герундій як підмет речення.',
        },
        {
          id: 'ger-2',
          type: 'multiple-choice',
          prompt: 'She is good at ___ difficult problems.',
          options: ['solve', 'to solve', 'solving', 'solved'],
          correctIndex: 2,
          explanation: 'Після прийменника at завжди герундій, а не інфінітив.',
        },
        {
          id: 'ger-3',
          type: 'fill-blank',
          prompt: 'He finally finished ___ (write) his thesis.',
          correctAnswers: ['writing'],
          explanation: 'Finish завжди вимагає герундій після себе.',
        },
        {
          id: 'ger-4',
          type: 'fill-blank',
          prompt: 'Would you mind ___ (open) the window?',
          correctAnswers: ['opening'],
          explanation: 'Mind + герундій — типовий ввічливий запит.',
        },
        {
          id: 'ger-5',
          type: 'multiple-choice',
          prompt: 'Which verb below is followed by the gerund, not the to-infinitive?',
          options: ['decide', 'want', 'avoid', 'promise'],
          correctIndex: 2,
          explanation: 'Avoid належить до списку дієслів, що вимагають герундій.',
        },
      ],
    },
    {
      id: 'verbs-changing-meaning',
      title: 'Verbs that Change Meaning: infinitive vs. gerund (remember, forget, stop, regret, try)',
      engVidUrl: 'https://www.engvid.com/english-resource/verbs-followed-by-gerunds-and-infinitives/',
      theory:
        'Кілька дієслів кардинально змінюють значення залежно від того, чи йде після них to-infinitive, чи -ing. `Remember/forget + to-infinitive` стосується завдання, яке треба (не) забути зробити (`Remember to lock the door` — не забудь замкнути); `+ -ing` стосується спогаду про подію в минулому (`I remember locking the door` — я пам\'ятаю, як замикав). `Stop + to-infinitive` означає перервати одну дію, щоб зробити іншу (`He stopped to smoke` — зупинився, щоб покурити); `+ -ing` означає припинити саму дію (`He stopped smoking` — кинув курити). `Try + to-infinitive` означає докласти зусиль, часто безуспішно (`Try to open the door` — спробуй, доклавши зусиль); `+ -ing` означає поекспериментувати з методом (`Try opening the door with this key` — спробуй цей спосіб). `Regret + to-infinitive` — формальне повідомлення поганої новини (`We regret to inform you...`); `+ -ing` — жаль за вже зробленою дією (`I regret telling him that`).',
      examples: [
        { target: 'I remember locking the door — I clearly recall doing it.', uk: 'Я пам\'ятаю, як замикав двері — чітко пригадую цю дію (спогад).' },
        { target: 'Please remember to lock the door before you leave.', uk: 'Будь ласка, не забудь замкнути двері, коли підеш (завдання на майбутнє).' },
        { target: 'He stopped smoking two years ago.', uk: 'Він кинув курити два роки тому (припинив дію).' },
      ],
      exercises: [
        {
          id: 'vcm-1',
          type: 'multiple-choice',
          prompt: 'Did you remember ___ the milk on your way home?',
          options: ['buying', 'to buy', 'buy', 'bought'],
          correctIndex: 1,
          explanation: 'Remember + to-infinitive — завдання, яке треба не забути виконати.',
        },
        {
          id: 'vcm-2',
          type: 'multiple-choice',
          prompt: 'I clearly remember ___ him at the conference last year.',
          options: ['to meet', 'meeting', 'meet', 'met'],
          correctIndex: 1,
          explanation: 'Remember + -ing — спогад про подію, що вже сталася.',
        },
        {
          id: 'vcm-3',
          type: 'fill-blank',
          prompt: 'On the way to the office, he stopped ___ (buy) a coffee.',
          correctAnswers: ['to buy'],
          explanation: 'Stop + to-infinitive — перервав одну дію (ходьбу), щоб зробити іншу.',
        },
        {
          id: 'vcm-4',
          type: 'fill-blank',
          prompt: 'She finally stopped ___ (bite) her nails after years of trying.',
          correctAnswers: ['biting'],
          explanation: 'Stop + -ing — припинення самої звички/дії.',
        },
        {
          id: 'vcm-5',
          type: 'multiple-choice',
          prompt: 'Which sentence means "experiment with a different method"?',
          options: [
            'Try to fix the printer — it might take a while.',
            'Try restarting the printer — that often works.',
            'She tried to fix the printer but failed.',
            'He is trying to understand the manual.',
          ],
          correctIndex: 1,
          explanation: 'Try + -ing пропонує спробувати конкретний метод, а не просто докладати зусиль.',
        },
      ],
    },
    {
      id: 'participle-clauses',
      title: 'Participle Clauses (Having finished..., Seen from...)',
      engVidUrl: 'https://www.engvid.com/having-past-participle-advanced-english-grammar/',
      theory:
        'Дієприкметникові звороти дозволяють об\'єднати два речення в одне елегантніше, типове для формального чи літературного стилю. `Present participle (-ing)` виражає одночасну дію чи причину: `Feeling tired, she went to bed early` (= Because she felt tired...). `Past participle (V3)` має пасивне значення й часто виражає причину чи умову: `Seen from above, the city looks like a maze` (= When it is seen from above...). `Perfect participle (having + V3)` підкреслює, що дія в звороті завершилась ДО дії в головному реченні: `Having finished his homework, he went out to play` (= After he had finished...). Підмет дієприкметникового звороту має збігатися з підметом головного речення — інакше вийде "звисаючий дієприкметник" (dangling participle), типова помилка.',
      examples: [
        { target: 'Having finished the report, she left the office.', uk: 'Закінчивши звіт, вона пішла з офісу (дія в звороті сталась раніше).' },
        { target: 'Seen from the plane, the island looked tiny.', uk: 'Побачений з літака, острів здавався крихітним (пасивне значення).' },
        { target: 'Not knowing what to say, he just smiled.', uk: 'Не знаючи, що сказати, він просто усміхнувся (причина/одночасна дія).' },
      ],
      exercises: [
        {
          id: 'partc-1',
          type: 'multiple-choice',
          prompt: '___ his keys, he had to call a locksmith.',
          options: ['Lose', 'Losing', 'Having lost', 'Lost'],
          correctIndex: 2,
          explanation: 'Having lost (perfect participle) — дія завершилась до дії в головному реченні.',
        },
        {
          id: 'partc-2',
          type: 'multiple-choice',
          prompt: 'Choose the correct combination for: "The bridge, ___ in 1930, is now a historic landmark."',
          options: ['building', 'having built', 'built', 'build'],
          correctIndex: 2,
          explanation: 'Past participle (built) виражає пасивне значення — міст був збудований.',
        },
        {
          id: 'partc-3',
          type: 'fill-blank',
          prompt: '___ (feel) exhausted, she decided to skip the gym.',
          correctAnswers: ['Feeling'],
          explanation: 'Present participle виражає причину, одночасну з головною дією.',
        },
        {
          id: 'partc-4',
          type: 'fill-blank',
          prompt: '___ (finish) their meal, they asked for the bill.',
          correctAnswers: ['Having finished'],
          explanation: 'Perfect participle підкреслює завершеність дії перед наступною подією.',
        },
        {
          id: 'partc-5',
          type: 'multiple-choice',
          prompt: 'Which sentence contains a dangling (misplaced) participle?',
          options: [
            'Walking down the street, I saw an old friend.',
            'Walking down the street, the shops all seemed closed.',
            'Having finished my homework, I went to bed.',
            'Seen from here, the mountain looks huge.',
          ],
          correctIndex: 1,
          explanation: 'Підмет звороту (walking) не збігається з підметом речення (the shops) — звисаючий дієприкметник.',
        },
      ],
    },
  ],
}
