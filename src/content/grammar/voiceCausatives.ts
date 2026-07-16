// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const voiceCausatives: GrammarCategory = {
  id: 'voice-causatives',
  language: 'en',
  title: 'Стан і каузативні конструкції',
  description:
    'Пасивний стан, безособові конструкції зі словами на кшталт said/thought та каузативні структури (have/get something done) — як в англійській зміщують фокус з виконавця дії на об\'єкт або результат.',
  topics: [
    {
      id: 'passive-voice',
      title: 'Passive Voice',
      engVidUrl: 'https://www.engvid.com/easy-introduction-to-passive/',
      theory:
        'Пасивний стан (be + V3) переносить увагу з виконавця дії на об\'єкт або результат: "Someone stole my bike" → "My bike was stolen" — виконавець (someone) уже не важливий. Форма be змінюється за часом (is/was/has been/will be), а V3 лишається незмінним: Present Simple — is/are done, Past Simple — was/were done, Present Perfect — has/have been done, Future — will be done, модальне дієслово + пасив — must/can/should be done. Пасив обирають, коли діяч невідомий, неважливий, очевидний з контексту, або коли треба підкреслити сам об\'єкт чи результат дії, а не того, хто її виконав.',
      examples: [
        { target: 'The new hospital will be finished next year.', uk: 'Нову лікарню добудують наступного року.' },
        { target: 'This report must be submitted by Friday.', uk: 'Цей звіт треба подати до п\'ятниці.' },
        { target: 'My car has been repaired.', uk: 'Мою машину відремонтували.' },
      ],
      exercises: [
        {
          id: 'pv-1',
          type: 'multiple-choice',
          prompt: 'English ___ in many countries.',
          options: ['speaks', 'is spoken', 'spoke', 'was spoken'],
          correctIndex: 1,
          explanation: 'Present Simple Passive: is/are + V3 — виконавець (хто саме розмовляє) неважливий.',
        },
        {
          id: 'pv-2',
          type: 'multiple-choice',
          prompt: 'Choose the correct passive version of: "They built this house in 1990."',
          options: [
            'This house was built in 1990.',
            'This house is built in 1990.',
            'This house has built in 1990.',
            'This house built in 1990.',
          ],
          correctIndex: 0,
          explanation: 'Past Simple Passive: was/were + V3; виконавця (they) не названо, бо він неважливий.',
        },
        {
          id: 'pv-3',
          type: 'fill-blank',
          prompt: 'The documents ___ (send) to the client tomorrow.',
          correctAnswers: ['will be sent'],
          explanation: 'Future Passive: will be + V3.',
        },
        {
          id: 'pv-4',
          type: 'fill-blank',
          prompt: 'This medicine ___ (must / take) twice a day.',
          correctAnswers: ['must be taken'],
          explanation: 'Модальне дієслово + пасив: must be + V3.',
        },
        {
          id: 'pv-5',
          type: 'multiple-choice',
          prompt: "Why do we use the passive here? 'A new law was passed last week.'",
          options: [
            'Бо виконавець (уряд/парламент) неважливий, у фокусі результат',
            'Бо дія відбувається зараз',
            'Бо це наказовий спосіб',
            'Бо підмет виконує дію сам',
          ],
          correctIndex: 0,
          explanation: 'Пасив використовують, коли діяч невідомий чи неважливий, а увага — на результаті або об\'єкті дії.',
        },
      ],
    },
    {
      id: 'impersonal-passive',
      title: 'Impersonal Passive (It is said/thought/believed that...)',
      engVidUrl: 'https://www.engvid.com/writing-passive-verbs-that-clauses/',
      theory:
        'Безособовий пасив дозволяє передати чутки, припущення чи неперевірені твердження, не називаючи джерело. Є дві типові моделі: "It is + V3 (said/thought/believed/reported) + that-clause" ("It is thought that he left the country") і "Subject + is + V3 + to-infinitive (або to have + V3 для минулого)" ("He is thought to have left the country"). Обидві конструкції типові для новинного, наукового чи офіційного стилю, коли автор навмисно дистанціюється від відповідальності за правдивість інформації.',
      examples: [
        { target: 'It is believed that the fire started in the kitchen.', uk: 'Вважається, що пожежа почалась на кухні.' },
        { target: 'He is thought to have left the country.', uk: 'Вважається, що він уже виїхав з країни.' },
        { target: 'The suspect is said to be hiding in the mountains.', uk: 'Кажуть, що підозрюваний ховається в горах.' },
      ],
      exercises: [
        {
          id: 'ip-1',
          type: 'multiple-choice',
          prompt: "Choose the correct impersonal passive: '___ that the company is planning layoffs.'",
          options: ['It is rumoured', 'It rumours', 'It is rumour', 'There is rumoured'],
          correctIndex: 0,
          explanation: 'Безособовий пасив першої моделі: It is + V3 (rumoured) + that-clause.',
        },
        {
          id: 'ip-2',
          type: 'multiple-choice',
          prompt: "Rewrite using the second pattern: 'It is reported that the CEO resigned.' → 'The CEO ___ resigned.'",
          options: ['is reported to have', 'is reported to', 'reported to have', 'is report to have'],
          correctIndex: 0,
          explanation: 'Друга модель: Subject + is reported + to have + V3 — дія сталась раніше за момент повідомлення.',
        },
        {
          id: 'ip-3',
          type: 'fill-blank',
          prompt: 'It ___ (think) that the ancient temple was built over 2,000 years ago.',
          correctAnswers: ['is thought'],
          explanation: '"It is thought that..." — формальна, дистанційована заява без вказівки джерела.',
        },
        {
          id: 'ip-4',
          type: 'fill-blank',
          prompt: 'The missing hikers ___ (believe / to be) somewhere near the ridge.',
          correctAnswers: ['are believed to be'],
          explanation: 'Subject + are believed + to be — другий безособовий пасивний патерн.',
        },
        {
          id: 'ip-5',
          type: 'multiple-choice',
          prompt: "Which style of writing typically uses impersonal passive constructions like 'It is said that...'?",
          options: [
            'Формальний/новинний стиль, коли джерело інформації не підтверджене',
            'Особистий щоденник',
            'Розмовна побутова мова',
            'Наказовий стиль інструкцій',
          ],
          correctIndex: 0,
          explanation: 'Ця конструкція типова для новин чи офіційних звітів, коли автор дистанціюється від неперевіреного твердження.',
        },
      ],
    },
    {
      id: 'causative',
      title: 'Causative (have/get something done)',
      engVidUrl: 'https://www.engvid.com/english-grammar-passive-causative/',
      theory:
        'Каузативна конструкція have/get + object + V3 (past participle) описує дію, яку для вас виконує хтось інший — ви лише організовуєте чи замовляєте її: "I had my hair cut" (мене підстригли, не я сама), "I\'m getting the car repaired" (машину ремонтує майстер). Це принципово відрізняється від простої активної форми "I cut my hair" чи "I repaired the car", де підмет сам фізично виконує дію. Get + object + V3 звучить трохи розмовніше за have + object + V3, а обидва можуть вживатися в будь-якому часі.',
      examples: [
        { target: 'I had my hair cut yesterday.', uk: 'Мені вчора підстригли волосся.' },
        { target: "We're getting our house painted next week.", uk: 'Нам пофарбують будинок наступного тижня.' },
        { target: 'She had her phone repaired at the shop.', uk: 'Їй відремонтували телефон у майстерні.' },
      ],
      exercises: [
        {
          id: 'caus-1',
          type: 'multiple-choice',
          prompt: "Choose the correct causative form: 'I don't cut my own hair — I ___ every month.'",
          options: ['cut it', 'have it cut', 'have cut it', 'am cutting it'],
          correctIndex: 1,
          explanation: 'Каузатив: have + object + V3 — дію виконує не сам мовець, а хтось інший.',
        },
        {
          id: 'caus-2',
          type: 'multiple-choice',
          prompt: "Compare: (A) 'I fixed my car.' (B) 'I had my car fixed.' What's the difference?",
          options: [
            '(A) я сам ремонтував машину, (B) хтось інший ремонтував для мене',
            'Різниці немає',
            '(B) означає, що машина зламана',
            '(A) формальніше за (B)',
          ],
          correctIndex: 0,
          explanation: 'Активна форма (A) — дію виконує сам підмет; каузативна (B) — виконавець хтось інший, підмет лише замовив послугу.',
        },
        {
          id: 'caus-3',
          type: 'fill-blank',
          prompt: 'We ___ (get / our kitchen / renovate) last month.',
          correctAnswers: ['got our kitchen renovated'],
          explanation: 'Get + object + V3 (у Past Simple: got) — розмовний варіант каузативної конструкції.',
        },
        {
          id: 'caus-4',
          type: 'fill-blank',
          prompt: 'He ___ (have / his suit / dry-clean) before the interview.',
          correctAnswers: ['had his suit dry-cleaned'],
          explanation: 'Have + object + V3 у Past Simple — замовлена послуга перед подією.',
        },
        {
          id: 'caus-5',
          type: 'multiple-choice',
          prompt: 'Which sentence means the speaker arranged for someone else to do the job?',
          options: [
            "I'm getting my nails done tomorrow.",
            'I did my nails myself.',
            'I always do my own nails.',
            "I'm painting my nails now.",
          ],
          correctIndex: 0,
          explanation: 'Getting + object + V3 (done) вказує, що роботу виконає інша людина, а не сам мовець.',
        },
      ],
    },
    {
      id: 'complex-object',
      title: 'Complex Object (verb + object + to-infinitive, e.g. "I want her to come")',
      theory:
        'Після дієслів want, expect, ask, would like, tell, advise (та подібних) в англійській вживається конструкція object + to-infinitive, а не підрядне речення з that: "I want her to come", а не "*I want that she comes". Носії української мови часто помиляються саме тут, бо в українській природно звучить "хочу, щоб вона прийшла" — і ця модель через кальку переноситься в англійську як that-clause, хоча англійська вимагає прямого об\'єкта з інфінітивом. Дієслова tell і advise завжди потребують object перед to-infinitive (told us to leave, advised him to rest), тоді як want і would like можуть вживатися і без об\'єкта (I want to leave) — але з об\'єктом значення зміщується на іншу особу.',
      examples: [
        { target: 'I want her to come to the party.', uk: 'Я хочу, щоб вона прийшла на вечірку.' },
        { target: 'The teacher told us to hand in our essays by Monday.', uk: 'Вчителька сказала нам здати есе до понеділка.' },
        { target: 'We would like you to join our team.', uk: 'Ми хотіли б, щоб ви приєднались до нашої команди.' },
      ],
      exercises: [
        {
          id: 'co-1',
          type: 'multiple-choice',
          prompt: 'Choose the correct sentence.',
          options: ['I want that she comes.', 'I want her to come.', 'I want she comes.', 'I want her come.'],
          correctIndex: 1,
          explanation: 'Після want вживається object + to-infinitive (her to come), а не that-clause.',
        },
        {
          id: 'co-2',
          type: 'multiple-choice',
          prompt: "'Мама попросила мене зачинити двері.' — Choose the correct translation.",
          options: [
            'My mum asked that I close the door.',
            'My mum asked me to close the door.',
            'My mum asked me close the door.',
            'My mum asked me closing the door.',
          ],
          correctIndex: 1,
          explanation: 'Ask + object + to-infinitive — типова помилка українців: вживати that-clause замість цієї моделі.',
        },
        {
          id: 'co-3',
          type: 'fill-blank',
          prompt: 'The doctor advised ___ (he / rest) for a week.',
          correctAnswers: ['him to rest'],
          explanation: 'Advise + object + to-infinitive: advised him to rest.',
        },
        {
          id: 'co-4',
          type: 'fill-blank',
          prompt: "I'd like ___ (you / meet) my parents this weekend.",
          correctAnswers: ['you to meet'],
          explanation: 'Would like + object + to-infinitive — ввічливе прохання чи побажання щодо іншої особи.',
        },
        {
          id: 'co-5',
          type: 'multiple-choice',
          prompt: "What mistake do Ukrainian speakers often make with verbs like 'want' and 'expect'?",
          options: [
            'Вживають that-clause замість object + to-infinitive (наприклад, *I want that you go)',
            'Забувають артикль the',
            'Плутають Present і Past Simple',
            'Забувають додавати -s у третій особі',
          ],
          correctIndex: 0,
          explanation: 'В українській природно "хочу, щоб ти пішов", тому виникає калька *I want that you go замість правильного I want you to go.',
        },
      ],
    },
  ],
}
