// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const dePassiv: GrammarCategory = {
  id: 'de-passiv',
  language: 'de',
  title: 'Пасивний стан',
  description:
    'Пасивний стан у німецькій мові: Vorgangspassiv (процес дії), Zustandspassiv (результативний стан) та пасив у поєднанні з модальними дієсловами.',
  topics: [
    {
      id: 'vorgangspassiv',
      title: 'Vorgangspassiv (werden + Partizip II)',
      theory:
        'Vorgangspassiv («пасив дії») утворюється допоміжним дієсловом `werden + Partizip II` і описує дію, що відбувається з підметом, незалежно від того, хто її виконує: `Das Haus wird gebaut` (будинок будується — хтось його будує, але в фокусі сам процес, а не виконавець). Виконавця дії за бажанням можна додати: `von + Dativ` вводить особу чи інституцію, що діє свідомо (von den Arbeitern), а `durch + Akkusativ` вводить безособову причину чи засіб (durch den Sturm). Vorgangspassiv відмінюється за часами так само, як активний стан: `Präsens — wird gebaut`, `Präteritum — wurde gebaut`, `Perfekt — ist gebaut worden`. У Perfekt Passiv важливо запам\'ятати особливу форму: замість звичайного Partizip II дієслова werden (geworden) у пасиві вживається коротка форма worden — `ist gebaut worden`, а не `*ist gebaut geworden`.',
      examples: [
        { target: 'Das Haus wird von den Arbeitern gebaut.', uk: 'Будинок будується робітниками (Präsens Passiv: wird + Partizip II; виконавець — von + Dativ).' },
        { target: 'Die Ernte wurde durch den Sturm vernichtet.', uk: 'Врожай був знищений бурею (Präteritum Passiv: wurde + Partizip II; безособова причина — durch + Akkusativ).' },
        { target: 'Das Haus ist gebaut worden.', uk: 'Будинок було побудовано (Perfekt Passiv: ist + Partizip II + worden, а не geworden).' },
      ],
      exercises: [
        {
          id: 'vp-1',
          type: 'multiple-choice',
          prompt: 'Das Fenster ___ jeden Tag geputzt. (Präsens Passiv, putzen)',
          options: ['wird', 'ist', 'wurde', 'hat'],
          correctIndex: 0,
          explanation: 'Vorgangspassiv у Präsens утворюється допоміжним дієсловом werden (wird) + Partizip II (geputzt).',
        },
        {
          id: 'vp-2',
          type: 'multiple-choice',
          prompt: 'Der Kuchen wird ___ meiner Oma gebacken. (виконавець дії — особа)',
          options: ['durch', 'von', 'mit', 'bei'],
          correctIndex: 1,
          explanation: 'Особу, яка свідомо виконує дію, вводить прийменник von + Dativ: von meiner Oma.',
        },
        {
          id: 'vp-3',
          type: 'fill-blank',
          prompt: 'Das Auto ___ (Präteritum Passiv: reparieren) letzte Woche.',
          correctAnswers: ['wurde repariert'],
          explanation: 'Präteritum Passiv: wurde + Partizip II (repariert).',
        },
        {
          id: 'vp-4',
          type: 'fill-blank',
          prompt: 'Die Brücke ___ (Perfekt Passiv: bauen) im Jahr 1990.',
          correctAnswers: ['ist gebaut worden'],
          explanation: 'Perfekt Passiv: sein (ist) + Partizip II (gebaut) + worden — не geworden.',
        },
        {
          id: 'vp-5',
          type: 'multiple-choice',
          prompt: 'Why does the passive Perfekt use "worden" instead of "geworden"?',
          options: [
            '"Geworden" is only used in Konjunktiv II',
            'In the passive Perfekt, werden takes the special short participle "worden" instead of its normal "geworden"',
            '"Worden" is used only with irregular verbs',
            'There is no difference; both are equally correct',
          ],
          correctIndex: 1,
          explanation: 'У пасивному Perfekt дієслово werden має особливу коротку форму дієприкметника "worden" замість звичайної "geworden", яка вживається в активному стані (er ist Lehrer geworden).',
        },
      ],
    },
    {
      id: 'zustandspassiv',
      title: 'Zustandspassiv (sein + Partizip II)',
      theory:
        'Zustandspassiv («пасив стану») утворюється допоміжним дієсловом `sein + Partizip II` і описує РЕЗУЛЬТАТ завершеної дії — стан, у якому щось перебуває, а не сам процес: `Das Fenster ist geöffnet` (вікно вже відчинене, хтось його відчинив раніше, і зараз воно перебуває в стані відчиненості). Це принципово відрізняється від Vorgangspassiv: `Das Fenster wird geöffnet` означає, що вікно відчиняють ПРЯМО ЗАРАЗ, дія триває. Оскільки обидві конструкції зовні схожі (допоміжне дієслово + Partizip II), учні часто їх плутають — ключове питання: описується процес (wird) чи вже готовий результат (ist). На відміну від Vorgangspassiv, Zustandspassiv зазвичай не супроводжується вказівкою на виконавця дії (von/durch), бо в фокусі не дія, а стан речі.',
      examples: [
        { target: 'Das Fenster ist geöffnet.', uk: 'Вікно відчинене (Zustandspassiv — стан як результат завершеної дії, а не процес).' },
        { target: 'Der Laden ist geschlossen.', uk: 'Магазин зачинений (стан; порівняйте з Der Laden wird geschlossen — магазин зачиняють прямо зараз).' },
        { target: 'Die Aufgabe ist schon erledigt.', uk: 'Завдання вже виконане (Zustandspassiv підкреслює готовий результат).' },
      ],
      exercises: [
        {
          id: 'zp-1',
          type: 'multiple-choice',
          prompt: 'Die Tür ___ geschlossen. (стан: двері вже зачинені й лишаються такими)',
          options: ['wird', 'ist', 'hat', 'wurde'],
          correctIndex: 1,
          explanation: 'Стан як результат дії виражає Zustandspassiv: sein (ist) + Partizip II.',
        },
        {
          id: 'zp-2',
          type: 'multiple-choice',
          prompt: 'Which sentence describes an ongoing process, not a finished state?',
          options: ['Der Brief ist geschrieben.', 'Der Brief wird geschrieben.', 'Der Brief war geschrieben.', 'Der Brief ist geschrieben worden.'],
          correctIndex: 1,
          explanation: 'Wird + Partizip II — це Vorgangspassiv (процес, що триває); ist + Partizip II — Zustandspassiv (готовий результат).',
        },
        {
          id: 'zp-3',
          type: 'fill-blank',
          prompt: 'Das Geschäft ___ (Zustandspassiv: schließen) schon seit 20 Uhr.',
          correctAnswers: ['ist geschlossen'],
          explanation: 'Zustandspassiv: sein (ist) + Partizip II (geschlossen) — стан, що триває від певного моменту.',
        },
        {
          id: 'zp-4',
          type: 'fill-blank',
          prompt: 'Die Hausaufgabe ___ (Zustandspassiv: machen) bereits.',
          correctAnswers: ['ist gemacht'],
          explanation: 'Zustandspassiv: ist + Partizip II (gemacht) — результат уже завершеної дії.',
        },
        {
          id: 'zp-5',
          type: 'multiple-choice',
          prompt: 'What is the key difference between Vorgangspassiv and Zustandspassiv?',
          options: [
            'Vorgangspassiv uses sein, Zustandspassiv uses werden',
            'Vorgangspassiv describes an ongoing action/process; Zustandspassiv describes the resulting state after the action is complete',
            'They are fully interchangeable in meaning',
            'Zustandspassiv can only be used in the Präteritum',
          ],
          correctIndex: 1,
          explanation: 'Vorgangspassiv (werden + Partizip II) описує дію в процесі; Zustandspassiv (sein + Partizip II) описує стан як результат уже завершеної дії.',
        },
      ],
    },
    {
      id: 'passiv-mit-modalverben',
      title: 'Passiv mit Modalverben',
      theory:
        'Пасив із модальними дієсловами утворюється поєднанням відмінюваного модального дієслова (müssen, können, sollen, dürfen тощо) з пасивним інфінітивом — Partizip II основного дієслова + werden (в інфінітивній, невідмінюваній формі): `Das muss gemacht werden` (модальне дієслово — на другій позиції, Partizip II + werden — у кінці речення). Ця конструкція виражає обов\'язковість (müssen), можливість (können), дозвіл (dürfen) чи пораду (sollen), що стосується підмета, без прив\'язки до конкретного виконавця дії: `Der Fehler kann korrigiert werden` (помилку можна виправити — байдуже ким). У підрядному реченні, де фінітне дієслово стоїть у самому кінці, порядок змінюється: `..., dass der Fehler korrigiert werden kann` (спочатку Partizip II + werden, модальне дієслово — в самому кінці). Ця конструкція надзвичайно поширена в інструкціях, правилах та офіційних текстах, бо дозволяє сформулювати вимогу безособово й нейтрально.',
      examples: [
        { target: 'Das muss sofort gemacht werden.', uk: 'Це треба зробити негайно (müssen + Partizip II + werden — обов\'язковість).' },
        { target: 'Der Fehler kann leicht korrigiert werden.', uk: 'Помилку легко можна виправити (können + Partizip II + werden — можливість).' },
        { target: 'Ich weiß, dass das Problem gelöst werden muss.', uk: 'Я знаю, що проблему треба вирішити (підрядне речення: Partizip II + werden + модальне дієслово в кінці).' },
      ],
      exercises: [
        {
          id: 'pmv-1',
          type: 'multiple-choice',
          prompt: 'Das Zimmer ___ aufgeräumt werden. (müssen, Präsens)',
          options: ['muss', 'musst', 'müsst', 'gemusst'],
          correctIndex: 0,
          explanation: 'Модальне дієслово відмінюється за підметом (das Zimmer → muss) і стоїть на другій позиції; Partizip II + werden — у кінці.',
        },
        {
          id: 'pmv-2',
          type: 'multiple-choice',
          prompt: 'Which sentence correctly forms the modal passive ("the mistake can be corrected")?',
          options: ['Der Fehler kann korrigieren werden.', 'Der Fehler kann korrigiert werden.', 'Der Fehler kann werden korrigiert.', 'Der Fehler korrigiert werden kann.'],
          correctIndex: 1,
          explanation: 'Правильний порядок: модальне дієслово (kann) на другій позиції, далі Partizip II (korrigiert), а werden — в самому кінці.',
        },
        {
          id: 'pmv-3',
          type: 'fill-blank',
          prompt: 'Die Rechnung ___ (sollen, Passiv: bezahlen) bis Freitag.',
          correctAnswers: ['soll bezahlt werden'],
          explanation: 'Sollen + Partizip II (bezahlt) + werden — порада/вимога у пасиві.',
        },
        {
          id: 'pmv-4',
          type: 'fill-blank',
          prompt: 'Er sagt, dass das Auto ___ (können, Passiv: reparieren).',
          correctAnswers: ['repariert werden kann'],
          explanation: 'У підрядному реченні (після dass) модальне дієслово йде в самому кінці, після Partizip II + werden.',
        },
        {
          id: 'pmv-5',
          type: 'multiple-choice',
          prompt: 'In "Das muss gemacht werden," what does "werden" function as?',
          options: [
            'The main verb in the Präsens tense',
            'The passive infinitive marker, combined with the Partizip II to form "gemacht werden" (to be done)',
            'An auxiliary for the Perfekt tense',
            'A second modal verb',
          ],
          correctIndex: 1,
          explanation: '"Gemacht werden" — це пасивний інфінітив (Partizip II + werden), який виступає смисловим доповненням до модального дієслова muss.',
        },
      ],
    },
  ],
}
