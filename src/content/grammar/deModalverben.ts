// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const deModalverben: GrammarCategory = {
  id: 'de-modalverben',
  language: 'de',
  title: 'Модальні дієслова',
  description:
    'Шість німецьких модальних дієслів (können, müssen, dürfen, sollen, wollen, mögen/möchten), їхня нерегулярна теперішня форма, вживання в минулому часі з подвійним інфінітивом та Konjunktiv II як стандартна форма ввічливості.',
  topics: [
    {
      id: 'modal-verbs-present',
      title: 'Modalverben im Präsens (können, müssen, dürfen, sollen, wollen, mögen/möchten)',
      theory:
        'Шість модальних дієслів виражають різні відтінки ставлення до дії: können — фізична чи ментальна здатність або можливість, müssen — необхідність, dürfen — дозвіл, sollen — обов\'язок або порада, що надійшла від когось іншого (не власна думка мовця), wollen — бажання чи намір, а mögen/möchten — симпатію (mögen) або ввічливе бажання (möchten). У теперішньому часі всі шість дієслів нерегулярні: в однині (ich, du, er/sie/es) голосний основи змінюється, а типові особові закінчення -e/-st/-t зникають — ich kann, du kannst, er kann; ich muss, du musst, er muss; так само darf/darfst/darf, soll/sollst/soll, will/willst/will, möchte/möchtest/möchte. У множині (wir, ihr, sie/Sie) форми регулярні: wir können, ihr könnt, sie können. Структура речення з модальним дієсловом фіксована: модальне дієслово стоїть на другій позиції (як звичайне відмінюване дієслово), а смислове дієслово йде в самому кінці речення у формі голого інфінітива без zu.',
      examples: [
        { target: 'Ich kann sehr gut schwimmen.', uk: 'Я вмію дуже добре плавати (können — здатність; schwimmen як голий інфінітив у кінці речення).' },
        { target: 'Du musst das Formular ausfüllen.', uk: 'Ти маєш заповнити цю форму (müssen — необхідність; ausfüllen на другому місці за модальним у сенсі позиції, але фізично в кінці).' },
        { target: 'Möchtest du heute Abend ins Kino gehen?', uk: 'Хочеш сьогодні ввечері піти в кіно? (möchten — ввічливе бажання; форма для "du" без типового -st-закінчення дієслів I групи).' },
      ],
      exercises: [
        {
          id: 'mvp-1',
          type: 'multiple-choice',
          prompt: 'Er ___ sehr gut Klavier spielen. (können)',
          options: ['kann', 'kannst', 'könnt', 'können'],
          correctIndex: 0,
          explanation: 'У 3-й особі однини (er) голосний основи змінюється (a→a залишається, але зникає -t): kann, без особового закінчення -t.',
        },
        {
          id: 'mvp-2',
          type: 'multiple-choice',
          prompt: '___ ich hier parken? (dürfen — питання про дозвіл)',
          options: ['Darf', 'Darfst', 'Dürft', 'Dürfen'],
          correctIndex: 0,
          explanation: 'Форма для "ich" у dürfen — darf, без закінчення -e, зі зміною голосного основи.',
        },
        {
          id: 'mvp-3',
          type: 'fill-blank',
          prompt: 'Ich ___ (müssen) heute länger arbeiten.',
          correctAnswers: ['muss'],
          explanation: 'Müssen в 1-й особі однини: ich muss (голосний ü→u, без закінчення -e).',
        },
        {
          id: 'mvp-4',
          type: 'fill-blank',
          prompt: 'Was ___ (wollen) du am Wochenende machen?',
          correctAnswers: ['willst'],
          explanation: 'Wollen у 2-й особі однини: du willst (голосний o→i, закінчення -st зберігається).',
        },
        {
          id: 'mvp-5',
          type: 'multiple-choice',
          prompt: 'Which sentence correctly places the modal verb and the infinitive?',
          options: [
            'Ich kann gut Deutsch sprechen.',
            'Ich kann Deutsch sprechen gut.',
            'Ich spreche kann Deutsch gut.',
            'Kann ich Deutsch gut sprechen spreche.',
          ],
          correctIndex: 0,
          explanation: 'Модальне дієслово (kann) стоїть на 2-й позиції, а смислове дієслово (sprechen) — голим інфінітивом у самому кінці речення.',
        },
      ],
    },
    {
      id: 'modal-verbs-past',
      title: 'Modalverben im Präteritum und Perfekt',
      theory:
        'На відміну від більшості дієслів, які в розмовній німецькій перевагу віддають Perfekt, модальні дієслова майже завжди вживаються в Präteritum навіть в усному мовленні: ich konnte, ich musste, ich durfte, ich sollte, ich wollte, ich mochte. Perfekt модальних дієслів (ich habe gekonnt, ich habe gemusst) трапляється рідко і лише тоді, коли модальне дієслово вжите самостійно, без іншого інфінітива. Якщо ж Perfekt потрібен разом з іншим інфінітивом, німецька мова використовує особливу конструкцію "подвійний інфінітив" (Doppelinfinitiv): замість очікуваного дієприкметника модальне дієслово саме з\'являється в формі голого інфінітива в самому кінці речення, після інфінітива смислового дієслова, а допоміжним завжди виступає haben — Ich habe nicht kommen können (а не *Ich habe nicht kommen gekonnt). Ця конструкція особливо складна для тих, хто вивчає мову, бо в кінці речення опиняються одразу два інфінітиви замість звичного одного дієприкметника.',
      examples: [
        { target: 'Ich konnte gestern nicht kommen.', uk: 'Я не міг прийти вчора (Präteritum — стандартна форма для модальних дієслів навіть у розмовній мові).' },
        { target: 'Sie musste den ganzen Tag arbeiten.', uk: 'Їй довелося працювати цілий день (musste — Präteritum від müssen).' },
        { target: 'Ich habe nicht kommen können.', uk: 'Я не зміг прийти (Perfekt + подвійний інфінітив: können замість очікуваного gekonnt, бо в реченні є ще одне дієслово kommen).' },
      ],
      exercises: [
        {
          id: 'mvpa-1',
          type: 'multiple-choice',
          prompt: 'Ich ___ als Kind sehr gut schwimmen. (können, Präteritum)',
          options: ['konnte', 'habe gekonnt', 'kann', 'könnte'],
          correctIndex: 0,
          explanation: 'Модальні дієслова про минуле майже завжди вживаються в Präteritum: ich konnte.',
        },
        {
          id: 'mvpa-2',
          type: 'multiple-choice',
          prompt: 'Which sentence correctly uses the "double infinitive" construction in Perfekt?',
          options: [
            'Ich habe nicht kommen können.',
            'Ich habe nicht kommen gekonnt.',
            'Ich habe gekonnt nicht kommen.',
            'Ich bin nicht kommen gekonnt.',
          ],
          correctIndex: 0,
          explanation: 'Коли Perfekt модального дієслова вжитий разом з іншим інфінітивом, замість дієприкметника gekonnt використовується інфінітив können — подвійний інфінітив.',
        },
        {
          id: 'mvpa-3',
          type: 'fill-blank',
          prompt: 'Er ___ (müssen, Präteritum) gestern arbeiten.',
          correctAnswers: ['musste'],
          explanation: 'Müssen у Präteritum для 3-ї особи однини: er musste.',
        },
        {
          id: 'mvpa-4',
          type: 'fill-blank',
          prompt: 'Wir ___ (wollen, Präteritum) letztes Jahr nach Spanien reisen.',
          correctAnswers: ['wollten'],
          explanation: 'Wollen у Präteritum для множини: wir wollten.',
        },
        {
          id: 'mvpa-5',
          type: 'multiple-choice',
          prompt: 'In spoken German, how do modal verbs usually express the past?',
          options: [
            'Almost always in Präteritum, even in speech',
            'Almost always in Perfekt, like other verbs',
            'Only in Konjunktiv II',
            'They have no past tense',
          ],
          correctIndex: 0,
          explanation: 'На відміну від більшості дієслів, модальні дієслова навіть в усному мовленні майже завжди стоять у Präteritum.',
        },
      ],
    },
    {
      id: 'konjunktiv-ii-modals',
      title: 'Konjunktiv II der Modalverben (möchte, könnte, sollte, dürfte)',
      theory:
        'Форми Konjunktiv II модальних дієслів — möchte, könnte, sollte, dürfte (а також рідше müsste, wollte) — вживаються в повсякденній німецькій мові значно частіше, ніж Konjunktiv II звичайних дієслів, бо вони пом\'якшують прохання, виражають ввічливі побажання й позначають гіпотетичні або невпевнені твердження. Möchte (хотів би) — стандартний ввічливий спосіб виразити бажання, ввічливіший за пряме will (ich möchte einen Kaffee проти категоричнішого ich will einen Kaffee). Könnte виражає можливість або ввічливе прохання (Könntest du mir helfen? — Не міг би ти мені допомогти?). Sollte виражає пораду чи рекомендацію, м\'якішу за категоричне müssen (Du solltest mehr schlafen — Тобі варто більше спати). Dürfte ж виражає епістемічну можливість — здогад мовця про те, що, ймовірно, є правдою (Das dürfte richtig sein — Це, мабуть, правильно), і це значення відрізняється від звичайного значення dürfen як дозволу.',
      examples: [
        { target: 'Ich möchte bitte einen Tee.', uk: 'Я хотів би, будь ласка, чаю (möchte — ввічливе бажання, ввічливіше за пряме will).' },
        { target: 'Könntest du mir bitte helfen?', uk: 'Не міг би ти мені допомогти? (könnte — ввічливе прохання чи можливість).' },
        { target: 'Das dürfte der richtige Weg sein.', uk: 'Це, мабуть, правильний шлях (dürfte — епістемічна можливість, здогад, а не дозвіл).' },
      ],
      exercises: [
        {
          id: 'k2m-1',
          type: 'multiple-choice',
          prompt: '___ du bitte das Fenster schließen? (ввічливе прохання)',
          options: ['Könntest', 'Kannst', 'Konntest', 'Kannest'],
          correctIndex: 0,
          explanation: 'Könntest — форма Konjunktiv II для "du", вживається для ввічливого прохання.',
        },
        {
          id: 'k2m-2',
          type: 'multiple-choice',
          prompt: "Which form is the more polite way to say 'I want a coffee'?",
          options: ['Ich möchte einen Kaffee.', 'Ich will einen Kaffee.', 'Ich mag einen Kaffee.', 'Ich mochte einen Kaffee.'],
          correctIndex: 0,
          explanation: 'Möchte (Konjunktiv II від mögen) — ввічливіший спосіб виразити бажання, ніж категоричне will.',
        },
        {
          id: 'k2m-3',
          type: 'fill-blank',
          prompt: 'Du ___ (sollen, Konjunktiv II) mehr Wasser trinken.',
          correctAnswers: ['solltest'],
          explanation: 'Sollen у Konjunktiv II для "du": solltest — м\'яка порада, менш категорична за müssen.',
        },
        {
          id: 'k2m-4',
          type: 'fill-blank',
          prompt: 'Er ist nicht da; er ___ (dürfen, Konjunktiv II) krank sein.',
          correctAnswers: ['dürfte'],
          explanation: 'Dürfte тут виражає епістемічну можливість (здогад "мабуть"), а не дозвіл.',
        },
        {
          id: 'k2m-5',
          type: 'multiple-choice',
          prompt: "What does 'dürfte' typically express in a sentence like 'Das dürfte stimmen'?",
          options: [
            'Epistemic possibility — a likely guess, not permission',
            'A strict obligation',
            'A direct order',
            'A simple past action',
          ],
          correctIndex: 0,
          explanation: 'У таких реченнях dürfte виражає не дозвіл, а припущення мовця про ймовірну правдивість твердження.',
        },
      ],
    },
  ],
}
