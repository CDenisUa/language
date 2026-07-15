// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const deKasus: GrammarCategory = {
  id: 'de-kasus',
  language: 'de',
  title: 'Відмінки (Kasus)',
  description:
    'Чотири німецькі відмінки — Nominativ, Akkusativ, Dativ, Genitiv — та прийменники подвійного керування, що обирають Akkusativ або Dativ залежно від руху чи місця.',
  topics: [
    {
      id: 'nominativ-akkusativ',
      title: 'Nominativ und Akkusativ',
      theory:
        'Nominativ — відмінок підмета (хто/що виконує дію): der Mann schläft. Akkusativ — відмінок прямого додатка (кого/що бачимо, маємо, купуємо): ich sehe den Mann. Різниця між ними видно лише в чоловічому роді однини: der → den (артикль), ein → einen, mein → meinen. Жіночий, середній рід і множина в Nominativ та Akkusativ виглядають однаково (die Frau = die Frau, das Kind = das Kind). Akkusativ також вживається після певних прийменників (durch, für, gegen, ohne, um) незалежно від руху чи місця.',
      examples: [
        { target: 'Der Hund läuft schnell.', uk: 'Собака швидко біжить (Nominativ — підмет).' },
        { target: 'Ich sehe den Hund.', uk: 'Я бачу собаку (Akkusativ — прямий додаток, der→den).' },
        { target: 'Das Geschenk ist für meinen Bruder.', uk: 'Подарунок для мого брата (für + Akkusativ).' },
      ],
      exercises: [
        {
          id: 'nomakk-1',
          type: 'multiple-choice',
          prompt: 'Ich kaufe ___ Apfel. (der Apfel)',
          options: ['der', 'den', 'dem', 'des'],
          correctIndex: 1,
          explanation: 'Прямий додаток чоловічого роду в Akkusativ: der → den.',
        },
        {
          id: 'nomakk-2',
          type: 'multiple-choice',
          prompt: '___ Lehrer erklärt die Aufgabe. (der Lehrer, підмет)',
          options: ['Der', 'Den', 'Dem', 'Des'],
          correctIndex: 0,
          explanation: 'Підмет речення завжди в Nominativ: der Lehrer.',
        },
        {
          id: 'nomakk-3',
          type: 'fill-blank',
          prompt: 'Wir haben ___ (ein / Hund) zu Hause.',
          correctAnswers: ['einen Hund'],
          explanation: 'Прямий додаток чоловічого роду: ein → einen у Akkusativ.',
        },
        {
          id: 'nomakk-4',
          type: 'fill-blank',
          prompt: 'Das Geschenk ist für ___ (mein / Vater).',
          correctAnswers: ['meinen Vater'],
          explanation: 'Прийменник für завжди вимагає Akkusativ: mein → meinen.',
        },
        {
          id: 'nomakk-5',
          type: 'multiple-choice',
          prompt: 'Which sentence correctly uses Akkusativ for the direct object?',
          options: ['Ich sehe der Mann.', 'Ich sehe den Mann.', 'Ich sehe dem Mann.', 'Ich sehe des Mannes.'],
          correctIndex: 1,
          explanation: 'Прямий додаток чоловічого роду в Akkusativ: den Mann.',
        },
      ],
    },
    {
      id: 'dativ',
      title: 'Dativ',
      theory:
        'Dativ — відмінок непрямого додатка (кому/чому щось дають, допомагають, дякують): ich gebe dem Mann das Buch. Артиклі в Dativ: der/das → dem, die → der, множина → den + -n на кінці іменника (den Kindern). Деякі дієслова вимагають Dativ для ЄДИНОГО додатка, не Akkusativ — helfen, danken, gefallen, gehören, folgen (ich helfe dir, не *ich helfe dich). Dativ також вживається після прийменників aus, bei, mit, nach, seit, von, zu — завжди, незалежно від контексту.',
      examples: [
        { target: 'Ich gebe dem Kind ein Buch.', uk: 'Я даю дитині книгу (Dativ — непрямий додаток).' },
        { target: 'Kannst du mir helfen?', uk: 'Можеш мені допомогти? (helfen вимагає Dativ: mir).' },
        { target: 'Ich fahre mit dem Bus zur Arbeit.', uk: 'Я їду на роботу автобусом (mit + Dativ).' },
      ],
      exercises: [
        {
          id: 'dat-1',
          type: 'multiple-choice',
          prompt: 'Ich helfe ___ Frau. (die Frau)',
          options: ['die', 'der', 'den', 'dem'],
          correctIndex: 1,
          explanation: 'Helfen вимагає Dativ; die → der у жіночому роді Dativ.',
        },
        {
          id: 'dat-2',
          type: 'multiple-choice',
          prompt: 'Das Auto gehört ___ Mann. (der Mann)',
          options: ['der', 'den', 'dem', 'des'],
          correctIndex: 2,
          explanation: 'Gehören вимагає Dativ; der → dem у чоловічому роді Dativ.',
        },
        {
          id: 'dat-3',
          type: 'fill-blank',
          prompt: 'Ich komme aus ___ (die / Schweiz).',
          correctAnswers: ['der Schweiz'],
          explanation: 'Aus завжди вимагає Dativ: die → der.',
        },
        {
          id: 'dat-4',
          type: 'fill-blank',
          prompt: 'Wir geben ___ (die / Kinder) Geschenke.',
          correctAnswers: ['den Kindern'],
          explanation: 'Множина в Dativ: die → den, а іменник отримує закінчення -n: Kinder → Kindern.',
        },
        {
          id: 'dat-5',
          type: 'multiple-choice',
          prompt: 'Which verb below always takes a Dativ object, not Akkusativ?',
          options: ['sehen', 'kaufen', 'danken', 'brauchen'],
          correctIndex: 2,
          explanation: 'Danken (дякувати) належить до групи дієслів, що вимагають Dativ: ich danke dir.',
        },
      ],
    },
    {
      id: 'genitiv',
      title: 'Genitiv',
      theory:
        'Genitiv виражає приналежність (чий/чиє): das Auto des Mannes (машина чоловіка). Артиклі: der/das → des + іменник отримує закінчення -s/-es (der Mann → des Mannes, das Kind → des Kindes), die → der (без змін іменника). У розмовній німецькій Genitiv дедалі частіше заміняють конструкцією von + Dativ (das Auto von dem Mann / vom Mann) — але в письмовій та формальній мові Genitiv лишається нормою. Деякі прийменники завжди вимагають Genitiv: während (протягом), trotz (незважаючи на), wegen (через/з причини), statt (замість) — хоча в розмовній мові wegen і trotz дедалі частіше вживають з Dativ.',
      examples: [
        { target: 'Das ist das Auto meines Bruders.', uk: 'Це машина мого брата (Genitiv — приналежність).' },
        { target: 'Wegen des schlechten Wetters bleiben wir zu Hause.', uk: 'Через погану погоду ми залишаємось вдома (wegen + Genitiv).' },
        { target: 'Das Auto von meinem Vater ist neu.', uk: 'Машина мого батька нова (розмовний варіант: von + Dativ замість Genitiv).' },
      ],
      exercises: [
        {
          id: 'gen-1',
          type: 'multiple-choice',
          prompt: 'Das ist das Haus ___ Lehrers. (der Lehrer)',
          options: ['der', 'den', 'dem', 'des'],
          correctIndex: 3,
          explanation: 'Приналежність чоловічого роду в Genitiv: der → des, і Lehrer отримує -s: Lehrers.',
        },
        {
          id: 'gen-2',
          type: 'multiple-choice',
          prompt: '___ (Trotz) des Regens gehen wir spazieren.',
          options: ['Trotz', 'Wegen', 'Während', 'Statt'],
          correctIndex: 0,
          explanation: 'Trotz (незважаючи на) + Genitiv.',
        },
        {
          id: 'gen-3',
          type: 'fill-blank',
          prompt: 'Die Farbe ___ (das / Auto) gefällt mir.',
          correctAnswers: ['des Autos'],
          explanation: 'Genitiv середнього роду: das → des, Auto отримує -s: Autos.',
        },
        {
          id: 'gen-4',
          type: 'fill-blank',
          prompt: '___ (Während) der Ferien fahren wir nach Italien.',
          correctAnswers: ['Während'],
          explanation: 'Während (протягом) + Genitiv.',
        },
        {
          id: 'gen-5',
          type: 'multiple-choice',
          prompt: 'What is the informal, increasingly common alternative to the Genitiv in spoken German?',
          options: ['using Akkusativ instead', 'using von + Dativ', 'dropping the case entirely', 'using Nominativ instead'],
          correctIndex: 1,
          explanation: 'У розмовній мові Genitiv часто заміняють конструкцією von + Dativ.',
        },
      ],
    },
    {
      id: 'wechselprapositionen',
      title: 'Wechselpräpositionen (in, an, auf, über, unter, vor, hinter, neben, zwischen)',
      theory:
        'Дев\'ять прийменників (in, an, auf, über, unter, vor, hinter, neben, zwischen) можуть вимагати або Akkusativ, або Dativ — залежно від значення. Якщо описуємо РУХ У НАПРЯМКУ (питання "куди? — wohin?"), вживаємо Akkusativ: ich gehe in die Schule (я йду В школу). Якщо описуємо МІСЦЕ, СТАТИЧНЕ ПОЛОЖЕННЯ (питання "де? — wo?"), вживаємо Dativ: ich bin in der Schule (я В школі, перебуваю там). Це одне з найскладніших правил для тих, хто вивчає німецьку, бо один і той самий прийменник змінює відмінок залежно від контексту дії.',
      examples: [
        { target: 'Ich lege das Buch auf den Tisch.', uk: 'Я кладу книгу на стіл (рух, wohin? → Akkusativ).' },
        { target: 'Das Buch liegt auf dem Tisch.', uk: 'Книга лежить на столі (місце, wo? → Dativ).' },
        { target: 'Er geht in die Küche.', uk: 'Він іде на кухню (рух → Akkusativ).' },
      ],
      exercises: [
        {
          id: 'wp-1',
          type: 'multiple-choice',
          prompt: 'Ich gehe in ___ Schule. (wohin? — die Schule)',
          options: ['die', 'der', 'den', 'dem'],
          correctIndex: 0,
          explanation: 'Рух у напрямку (wohin?) → Akkusativ: die лишається die (жіночий рід не змінюється в Akkusativ).',
        },
        {
          id: 'wp-2',
          type: 'multiple-choice',
          prompt: 'Ich bin in ___ Schule. (wo? — die Schule)',
          options: ['die', 'der', 'den', 'des'],
          correctIndex: 1,
          explanation: 'Місце (wo?) → Dativ: die → der.',
        },
        {
          id: 'wp-3',
          type: 'fill-blank',
          prompt: 'Die Katze liegt unter ___ (der / Tisch). (wo?)',
          correctAnswers: ['dem Tisch'],
          explanation: 'Wo? (місце) → Dativ: der → dem.',
        },
        {
          id: 'wp-4',
          type: 'fill-blank',
          prompt: 'Die Katze springt unter ___ (der / Tisch). (wohin?)',
          correctAnswers: ['den Tisch'],
          explanation: 'Wohin? (рух) → Akkusativ: der → den.',
        },
        {
          id: 'wp-5',
          type: 'multiple-choice',
          prompt: 'How do you decide between Akkusativ and Dativ with a Wechselpräposition?',
          options: [
            'Akkusativ is always used with "auf"',
            'Ask wohin? (direction/motion) → Akkusativ; wo? (location) → Dativ',
            'Dativ is used only in questions',
            'It depends on the verb tense, not the meaning',
          ],
          correctIndex: 1,
          explanation: 'Питання wohin?/wo? визначає, чи це рух (Akkusativ), чи місце (Dativ).',
        },
      ],
    },
  ],
}
