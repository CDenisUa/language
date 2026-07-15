// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const deNebensaetze: GrammarCategory = {
  id: 'de-nebensaetze',
  language: 'de',
  title: 'Підрядні речення та сполучники',
  description:
    'Підрядні речення причини (weil, da), часу й умови (wenn, als), означальні речення (Relativsätze) із відносними займенниками, а також непрямі питання (ob, питальні слова) — усі з дієсловом у кінці підрядного речення.',
  topics: [
    {
      id: 'weil-da-subordinate-clauses',
      title: 'Kausalsätze mit weil und da',
      theory:
        'Weil та da вводять підрядне речення причини і, як і всі підрядні речення, вимагають дієслова в кінці. Da вживається у формальнішому, писемному стилі й зазвичай стоїть на самому початку речення, наводячи фонову причину перед головним реченням: Da es regnet, bleiben wir zu Hause. Weil набагато частіше вживається в усному мовленні і зазвичай іде одразу після головного речення: Ich bleibe zu Hause, weil es regnet. У розмовній німецькій дедалі поширенішою (але нестандартною) є тенденція вживати weil із порядком слів як у головному реченні (дієслово на другому місці): "weil ich hab keine Zeit" замість правильного "weil ich keine Zeit habe" — для екзаменів та письмового мовлення слід завжди використовувати дієслово в кінці.',
      examples: [
        { target: 'Ich bleibe zu Hause, weil ich krank bin.', uk: 'Я залишаюсь вдома, бо я хворію (weil одразу після головного речення, дієслово в кінці).' },
        { target: 'Da es schon spät ist, sollten wir gehen.', uk: 'Оскільки вже пізно, нам слід іти (da на початку речення — формальний, письмовий стиль).' },
        { target: 'Ich komme nicht mit, weil ich habe keine Zeit.', uk: 'Я не піду з вами, бо в мене немає часу (розмовний, нестандартний порядок слів: дієслово на другому місці замість кінця речення).' },
      ],
      exercises: [
        {
          id: 'wd-1',
          type: 'multiple-choice',
          prompt: 'Which sentence has the correct verb-final word order for a weil-clause?',
          options: [
            'Ich bleibe zu Hause, weil ich bin krank.',
            'Ich bleibe zu Hause, weil ich krank bin.',
            'Ich bleibe zu Hause, weil bin ich krank.',
            'Ich bleibe zu Hause, weil krank ich bin.',
          ],
          correctIndex: 1,
          explanation: 'У підрядному реченні з weil дієслово стоїть у кінці: ich krank bin.',
        },
        {
          id: 'wd-2',
          type: 'multiple-choice',
          prompt: '___ ich noch keine Erfahrung habe, arbeite ich langsamer als meine Kollegen.',
          options: ['Weil', 'Da', 'Wenn', 'Als'],
          correctIndex: 1,
          explanation: 'Da вживається на початку речення для формального наведення причини перед головним реченням; weil частіше йде після головного речення.',
        },
        {
          id: 'wd-3',
          type: 'fill-blank',
          prompt: 'Wir kaufen ein Auto, weil ___ (wir / brauchen / ein Auto für die Arbeit).',
          correctAnswers: ['wir ein Auto für die Arbeit brauchen'],
          explanation: 'У підрядному реченні з weil дієслово (brauchen) стоїть у самому кінці.',
        },
        {
          id: 'wd-4',
          type: 'fill-blank',
          prompt: '___ (Da) es Wochenende ist, schlafen wir länger.',
          correctAnswers: ['Da'],
          explanation: 'Da починає речення для наведення причини/фону — формальний, письмовий стиль.',
        },
        {
          id: 'wd-5',
          type: 'multiple-choice',
          prompt: 'Which sentence reflects the increasingly common, but grammatically non-standard, colloquial use of weil?',
          options: [
            'Ich bin müde, weil ich habe schlecht geschlafen.',
            'Ich bin müde, weil ich schlecht geschlafen habe.',
            'Weil ich schlecht geschlafen habe, bin ich müde.',
            'Da ich schlecht geschlafen habe, bin ich müde.',
          ],
          correctIndex: 0,
          explanation: 'У розмовній мові weil дедалі частіше вживають з порядком слів як у головному реченні (дієслово на другому місці) — це нестандартно, але поширено; правильний варіант має дієслово в кінці.',
        },
      ],
    },
    {
      id: 'wenn-als-temporal-clauses',
      title: 'Temporal- und Konditionalsätze: wenn vs. als',
      theory:
        'Als вживається виключно для ОДНІЄЇ конкретної, завершеної події в минулому: Als ich acht Jahre alt war, zog ich nach Berlin (коли мені було вісім років, я переїхав до Берліна). Wenn вживається для ПОВТОРЮВАНИХ/звичних подій у минулому: Wenn ich Zeit hatte, besuchte ich meine Oma (щоразу, коли в мене був час, я відвідував бабусю) — а також для БУДЬ-ЯКОГО теперішнього чи майбутнього часу та в умовних реченнях: Wenn du kommst, freue ich mich (і "коли ти прийдеш", і "якщо ти прийдеш"). Це класична пастка для тих, хто вивчає німецьку: плутанина виникає тому, що обидва слова перекладаються українською як "коли", але вибір залежить від того, чи подія одноразова минула (als), чи повторювана минула/теперішня/майбутня/умовна (wenn).',
      examples: [
        { target: 'Als ich acht Jahre alt war, zog ich nach Berlin.', uk: 'Коли мені було вісім років, я переїхав до Берліна (als — одна конкретна подія в минулому).' },
        { target: 'Wenn ich Zeit hatte, besuchte ich meine Oma.', uk: 'Щоразу, коли в мене був час, я відвідував бабусю (wenn — повторювана подія в минулому).' },
        { target: 'Wenn du kommst, freue ich mich.', uk: 'Коли/якщо ти прийдеш, я буду радий (wenn — теперішній/майбутній час або умова).' },
      ],
      exercises: [
        {
          id: 'wa-1',
          type: 'multiple-choice',
          prompt: '___ ich zum ersten Mal nach Deutschland reiste, konnte ich kein Deutsch.',
          options: ['Als', 'Wenn', 'Ob', 'Weil'],
          correctIndex: 0,
          explanation: 'Одна конкретна подія в минулому (перша поїздка) — вживається als.',
        },
        {
          id: 'wa-2',
          type: 'multiple-choice',
          prompt: '___ es regnete, blieben wir zu Hause. (щоразу, коли йшов дощ, у минулому)',
          options: ['Als', 'Wenn', 'Weil', 'Ob'],
          correctIndex: 1,
          explanation: 'Повторювана подія в минулому (щоразу, коли йшов дощ) → wenn, а не als.',
        },
        {
          id: 'wa-3',
          type: 'fill-blank',
          prompt: '___ (Wenn) du Hilfe brauchst, ruf mich an.',
          correctAnswers: ['Wenn'],
          explanation: 'Для теперішнього/майбутнього часу та умовних речень завжди вживається wenn, ніколи als.',
        },
        {
          id: 'wa-4',
          type: 'fill-blank',
          prompt: '___ (Als) ich das Ergebnis hörte, war ich sehr überrascht.',
          correctAnswers: ['Als'],
          explanation: 'Одна конкретна подія в минулому (почув результат один раз) → als.',
        },
        {
          id: 'wa-5',
          type: 'multiple-choice',
          prompt: 'Which rule correctly describes the difference between als and wenn?',
          options: [
            'Als is used for repeated past events, wenn for a single past event',
            'Als is used only for a single, completed event in the past; wenn is used for repeated past events and all present/future/conditional clauses',
            'Als and wenn are interchangeable in all contexts',
            'Als is used only in questions, wenn only in statements',
          ],
          correctIndex: 1,
          explanation: 'Als — лише для однієї конкретної завершеної події в минулому; wenn — для повторюваних подій у минулому та для всіх теперішніх/майбутніх і умовних речень.',
        },
      ],
    },
    {
      id: 'relativsaetze',
      title: 'Relativsätze',
      theory:
        'Relativsätze уточнюють іменник за допомогою відносних займенників der/die/das, які відмінюються так само, як означений артикль. Рід та число займенника завжди узгоджуються з іменником, до якого він відноситься (антецедентом у головному реченні), а відмінок визначається виключно роллю займенника ВСЕРЕДИНІ самого підрядного речення — його зв\'язком із дієсловом чи прийменником у цьому реченні, а не відмінком іменника в головному реченні. Наприклад, у реченні "Der Mann, den ich gestern gesehen habe, ist mein Nachbar" займенник den стоїть у Akkusativ, бо всередині підрядного речення він виступає прямим додатком дієслова sehen, попри те, що "der Mann" у головному реченні є підметом (Nominativ). Як і в усіх підрядних реченнях, дієслово в Relativsatz стоїть у кінці. Якщо займенник стоїть після прийменника (напр. mit, für), відмінок визначає саме цей прийменник: "die Frau, mit der ich arbeite" (Dativ, бо mit завжди вимагає Dativ).',
      examples: [
        { target: 'Der Mann, den ich gestern gesehen habe, ist mein Nachbar.', uk: 'Чоловік, якого я бачив учора, — мій сусід (den — Akkusativ, прямий додаток усередині підрядного речення).' },
        { target: 'Die Frau, die neben mir wohnt, ist Ärztin.', uk: 'Жінка, яка живе поруч зі мною, — лікарка (die — Nominativ, підмет підрядного речення, узгоджено з жіночим родом).' },
        { target: 'Das Buch, mit dem ich Deutsch gelernt habe, liegt auf dem Tisch.', uk: 'Книга, за допомогою якої я вивчив німецьку, лежить на столі (dem — Dativ після прийменника mit, середній рід).' },
      ],
      exercises: [
        {
          id: 'rel-1',
          type: 'multiple-choice',
          prompt: 'Der Lehrer, ___ ich eine Frage gestellt habe, war sehr geduldig. (jemandem eine Frage stellen)',
          options: ['der', 'den', 'dem', 'dessen'],
          correctIndex: 2,
          explanation: '"Jemandem eine Frage stellen" вимагає Dativ; чоловічий рід: der → dem.',
        },
        {
          id: 'rel-2',
          type: 'multiple-choice',
          prompt: 'Die Kinder, ___ im Garten spielen, sind meine Neffen.',
          options: ['die', 'denen', 'deren', 'der'],
          correctIndex: 0,
          explanation: 'Займенник виступає підметом підрядного речення (spielen) → Nominativ множини: die.',
        },
        {
          id: 'rel-3',
          type: 'fill-blank',
          prompt: 'Das ist die Frau, mit ___ (die) ich gestern gesprochen habe.',
          correctAnswers: ['der'],
          explanation: 'Прийменник mit вимагає Dativ; жіночий рід: die → der.',
        },
        {
          id: 'rel-4',
          type: 'fill-blank',
          prompt: 'Der Film, ___ (der) wir gestern gesehen haben, war fantastisch.',
          correctAnswers: ['den'],
          explanation: 'Займенник — прямий додаток дієслова sehen у підрядному реченні → Akkusativ: der → den.',
        },
        {
          id: 'rel-5',
          type: 'multiple-choice',
          prompt: 'How is the case of a relative pronoun (der/die/das) determined?',
          options: [
            'By the case of the antecedent noun in the main clause',
            'By the gender and number of the antecedent noun, and by its grammatical role inside the relative clause',
            'Relative pronouns never change for case, only for gender',
            'By whether the sentence is a question or a statement',
          ],
          correctIndex: 1,
          explanation: 'Рід і число займенника узгоджуються з іменником-антецедентом, а відмінок визначається його роллю всередині підрядного речення.',
        },
      ],
    },
    {
      id: 'indirekte-fragen',
      title: 'Indirekte Fragen',
      theory:
        'Непряме питання вбудовує питання всередину більшого речення і, як і всі підрядні речення, вимагає дієслова в кінці. Для так/ні-питань (без питального слова) вживається сполучник ob: "Kommt er?" → "Ich weiß nicht, ob er kommt." Для питань із питальним словом (wer, was, wo, wann, warum тощо) саме питальне слово стає сполучником, а дієслово переміщується в кінець речення: "Wo wohnt er?" → "Ich weiß nicht, wo er wohnt." Це кардинально відрізняється від прямого питання, де дієслово стоїть на першому місці в так/ні-питаннях (Verb-Erst) або одразу на другому місці після питального слова (Verb-Zweit).',
      examples: [
        { target: 'Ich weiß nicht, ob er kommt.', uk: 'Я не знаю, чи він прийде (так/ні-питання → ob, дієслово в кінці).' },
        { target: 'Ich weiß nicht, wo er wohnt.', uk: 'Я не знаю, де він живе (питальне слово wo стає сполучником, дієслово в кінці).' },
        { target: 'Kannst du mir sagen, warum sie so spät ist?', uk: 'Можеш сказати мені, чому вона так запізнюється? (непряме питання з warum, дієслово в кінці всередині більшого речення).' },
      ],
      exercises: [
        {
          id: 'indf-1',
          type: 'multiple-choice',
          prompt: 'Ich möchte wissen, ___ du morgen Zeit hast. (Direct: Hast du morgen Zeit?)',
          options: ['ob', 'wo', 'wann', 'dass'],
          correctIndex: 0,
          explanation: 'Пряме так/ні-питання (Hast du Zeit?) перетворюється на непряме за допомогою сполучника ob.',
        },
        {
          id: 'indf-2',
          type: 'multiple-choice',
          prompt: 'Which sentence has the correct word order for an indirect question?',
          options: [
            'Ich weiß nicht, wo wohnt er.',
            'Ich weiß nicht, wo er wohnt.',
            'Ich weiß nicht, er wo wohnt.',
            'Ich weiß nicht wohnt er wo.',
          ],
          correctIndex: 1,
          explanation: 'У непрямому питанні дієслово стоїть у кінці підрядного речення: wo er wohnt.',
        },
        {
          id: 'indf-3',
          type: 'fill-blank',
          prompt: 'Direct: "Regnet es?" → Indirect: Ich frage mich, ___ (ob) es regnet.',
          correctAnswers: ['ob'],
          explanation: 'Так/ні-питання без питального слова перетворюється на непряме за допомогою сполучника ob.',
        },
        {
          id: 'indf-4',
          type: 'fill-blank',
          prompt: 'Direct: "Warum ist sie traurig?" → Indirect: Er fragt sich, warum sie ___ (sein / traurig).',
          correctAnswers: ['traurig ist'],
          explanation: 'У непрямому питанні дієслово (ist) переміщується в кінець речення: traurig ist.',
        },
        {
          id: 'indf-5',
          type: 'multiple-choice',
          prompt: 'How does the word order of a direct question differ from an indirect question?',
          options: [
            'Direct questions always end in the verb, just like indirect questions',
            'Direct questions have the verb first (yes/no) or right after the question word (Verb-Zweit); indirect questions push the verb to the end',
            'There is no difference in word order',
            'Indirect questions never use a connector word',
          ],
          correctIndex: 1,
          explanation: 'Пряме питання: дієслово на першому місці (так/ні) або одразу після питального слова (Verb-Zweit); непряме питання: дієслово переміщується в кінець речення.',
        },
      ],
    },
  ],
}
