// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const deGenusArtikel: GrammarCategory = {
  id: 'de-genus-artikel',
  language: 'de',
  title: 'Рід та артиклі (Genus & Artikel)',
  description:
    'Граматичний рід іменників, означений і неозначений артиклі в усіх відмінках, творення множини та випадки, коли артикль не вживається взагалі.',
  topics: [
    {
      id: 'der-die-das-gender-rules',
      title: 'Der, die, das — Genusregeln',
      theory:
        'Граматичний рід німецького іменника здебільшого не піддається логіці й просто запам\'ятовується разом зі словом (краще вчити не Hund, а der Hund). Проте є корисні, хоч і не абсолютні, підказки. За закінченням слова: -ung, -heit, -keit, -schaft, -ion, -tät майже завжди жіночий рід (die Zeitung, die Freiheit, die Nation); -chen, -lein завжди середній рід — це суфікси зменшувальності, і слово з ними зберігає середній рід незалежно від початкового роду (das Mädchen, хоча дівчина — вона). За значенням: дні тижня, місяці, пори року — чоловічий рід (der Montag, der Mai, der Sommer); більшість металів і хімічних елементів — середній рід (das Gold, das Eisen); іменники на -er, що позначають діяча-чоловіка — чоловічий рід (der Lehrer).',
      examples: [
        { target: 'Die Freundschaft zwischen ihnen ist stark.', uk: 'Дружба між ними міцна (-schaft → жіночий рід).' },
        { target: 'Das Mädchen spielt im Garten.', uk: 'Дівчинка грає в саду (-chen → завжди середній рід, попри значення).' },
        { target: 'Der Montag ist mein Lieblingstag.', uk: 'Понеділок — мій улюблений день (дні тижня — чоловічий рід).' },
      ],
      exercises: [
        {
          id: 'ddd-1',
          type: 'multiple-choice',
          prompt: '___ Zeitung liegt auf dem Tisch. (die Zeitung, -ung)',
          options: ['Der', 'Die', 'Das', 'Den'],
          correctIndex: 1,
          explanation: 'Іменники із закінченням -ung майже завжди жіночого роду.',
        },
        {
          id: 'ddd-2',
          type: 'multiple-choice',
          prompt: '___ Kindchen schläft schon. (das Kind + -chen)',
          options: ['Der', 'Die', 'Das', 'Dem'],
          correctIndex: 2,
          explanation: 'Суфікс -chen завжди дає середній рід, незалежно від початкового значення слова.',
        },
        {
          id: 'ddd-3',
          type: 'fill-blank',
          prompt: '___ (der/die/das) Freiheit ist wichtig für alle Menschen.',
          correctAnswers: ['Die'],
          explanation: 'Freiheit закінчується на -heit → жіночий рід.',
        },
        {
          id: 'ddd-4',
          type: 'fill-blank',
          prompt: 'Ich mag ___ (der/die/das) Winter am meisten.',
          correctAnswers: ['den'],
          explanation: 'Пори року — чоловічий рід: der Winter (тут Akkusativ після mögen: den Winter).',
        },
        {
          id: 'ddd-5',
          type: 'multiple-choice',
          prompt: 'Which ending reliably signals feminine gender?',
          options: ['-chen', '-keit', '-er', '-lein'],
          correctIndex: 1,
          explanation: '-keit, як і -heit/-ung/-schaft, майже завжди означає жіночий рід.',
        },
      ],
    },
    {
      id: 'bestimmter-unbestimmter-artikel',
      title: 'Bestimmter und unbestimmter Artikel',
      theory:
        'Означений артикль (der/die/das — "той/та/те", тобто "the") вживається для чогось конкретного чи вже відомого зі контексту. Неозначений артикль (ein/eine/ein — "якийсь", тобто "a/an") вживається для чогось неконкретного чи вперше згаданого. Обидва відмінюються за відмінками: означений — der/die/das (Nom.) → den/die/das (Akk.) → dem/der/dem (Dat.) → des/der/des (Gen.); неозначений — ein/eine/ein (Nom.) → einen/eine/ein (Akk.) → einem/einer/einem (Dat.) → eines/einer/eines (Gen.). У множині означений артикль завжди die (Nom./Akk.), den (Dat.), der (Gen.), а неозначений артикль у множині взагалі відсутній (просто Hunde, без артикля).',
      examples: [
        { target: 'Ich sehe einen Hund. Der Hund bellt laut.', uk: 'Я бачу собаку (невідомий). Собака (вже відомий) голосно гавкає.' },
        { target: 'Ich gebe einem Kind ein Eis.', uk: 'Я даю дитині морозиво (ein у Dativ: einem, після дієслова geben).' },
        { target: 'Das ist die Farbe eines Autos.', uk: 'Це колір машини (ein у Genitiv: eines, з закінченням -s на Auto).' },
      ],
      exercises: [
        {
          id: 'bua-1',
          type: 'multiple-choice',
          prompt: 'Ich habe ___ Bruder. (ein Bruder, Akkusativ)',
          options: ['ein', 'einen', 'einem', 'eines'],
          correctIndex: 1,
          explanation: 'Чоловічий рід в Akkusativ: ein → einen.',
        },
        {
          id: 'bua-2',
          type: 'multiple-choice',
          prompt: 'Ich helfe ___ Mann. (der Mann, Dativ)',
          options: ['der', 'den', 'dem', 'des'],
          correctIndex: 2,
          explanation: 'Чоловічий рід в Dativ: der → dem.',
        },
        {
          id: 'bua-3',
          type: 'fill-blank',
          prompt: 'Das ist das Auto ___ (ein / Frau). (Genitiv)',
          correctAnswers: ['einer Frau'],
          explanation: 'Жіночий рід в Genitiv: eine → einer.',
        },
        {
          id: 'bua-4',
          type: 'fill-blank',
          prompt: '___ (die / Kinder) spielen im Park. (Nominativ, множина)',
          correctAnswers: ['Die'],
          explanation: 'Означений артикль у множині завжди die в Nominativ.',
        },
        {
          id: 'bua-5',
          type: 'multiple-choice',
          prompt: 'Which article form is correct for plural nouns — there is no equivalent of "a/an" in the plural at all?',
          options: ['ein Hunde', 'eine Hunde', 'Hunde (no article)', 'einen Hunde'],
          correctIndex: 2,
          explanation: 'У множині неозначений артикль відсутній взагалі.',
        },
      ],
    },
    {
      id: 'plural-forms',
      title: 'Pluralbildung',
      theory:
        'На відміну від англійської, де майже завжди достатньо додати -s, німецька множина не має єдиного правила — кожен іменник потрібно вчити разом з його формою множини. Найпоширеніші типи: -e (der Hund → die Hunde), -er з умлаутом, де можливо (das Kind → die Kinder, без умлаута; das Buch → die Bücher, з умлаутом), -(e)n (die Frau → die Frauen, die Blume → die Blumen), -s переважно для запозичених слів (das Auto → die Autos, das Hotel → die Hotels), і взагалі без змін для деяких чоловічих/середніх іменників на -er/-el/-en (der Lehrer → die Lehrer, das Fenster → die Fenster). Незалежно від роду в однині, artikль множини завжди die.',
      examples: [
        { target: 'Ich habe zwei Hunde und drei Katzen.', uk: 'У мене дві собаки і три кішки (der Hund → die Hunde, -e).' },
        { target: 'Die Bücher liegen auf dem Tisch.', uk: 'Книги лежать на столі (das Buch → die Bücher, -er з умлаутом).' },
        { target: 'Meine Lehrer sind sehr nett.', uk: 'Мої вчителі дуже приємні (der Lehrer → die Lehrer, без змін).' },
      ],
      exercises: [
        {
          id: 'pf-1',
          type: 'multiple-choice',
          prompt: 'Wie ist der Plural von "das Kind"?',
          options: ['die Kinds', 'die Kinder', 'die Kinden', 'die Kinde'],
          correctIndex: 1,
          explanation: 'Das Kind утворює множину через -er: die Kinder.',
        },
        {
          id: 'pf-2',
          type: 'multiple-choice',
          prompt: 'Wie ist der Plural von "die Frau"?',
          options: ['die Fraus', 'die Frauer', 'die Frauen', 'die Frau'],
          correctIndex: 2,
          explanation: 'Die Frau утворює множину через -en: die Frauen.',
        },
        {
          id: 'pf-3',
          type: 'fill-blank',
          prompt: 'Der Plural von "das Auto" ist die ___.',
          correctAnswers: ['Autos'],
          explanation: 'Запозичені слова часто утворюють множину через -s: die Autos.',
        },
        {
          id: 'pf-4',
          type: 'fill-blank',
          prompt: 'Der Plural von "das Buch" ist die ___.',
          correctAnswers: ['Bücher'],
          explanation: 'Das Buch утворює множину через -er з умлаутом: die Bücher.',
        },
        {
          id: 'pf-5',
          type: 'multiple-choice',
          prompt: 'What article do ALL plural nouns take, regardless of their singular gender?',
          options: ['der', 'die', 'das', 'ein'],
          correctIndex: 1,
          explanation: 'Артикль множини завжди die, незалежно від роду в однині.',
        },
      ],
    },
    {
      id: 'null-artikel',
      title: 'Nullartikel',
      theory:
        'У кількох випадках німецька взагалі не вживає артикль. Більшість власних назв (імена людей, більшість країн): Deutschland ist groß, не *das Deutschland. Незлічувані/абстрактні іменники в загальному значенні: Ich trinke Wasser, Ich habe Hunger — без артикля. Множинні іменники в неконкретному, загальному значенні: Ich mag Hunde (собаки загалом, не конкретні). Професії та національності після дієслів sein/werden: Er ist Lehrer (не *ein Lehrer) — це протилежність типовій помилці, коли той, хто вивчає англійську, забуває артикль у "He is a teacher"; тут навпаки, той, хто вивчає німецьку, часто помилково вставляє ein там, де воно не потрібне.',
      examples: [
        { target: 'Deutschland liegt in Europa.', uk: 'Німеччина розташована в Європі (власна назва країни — без артикля).' },
        { target: 'Ich trinke gern Kaffee.', uk: 'Я люблю пити каву (незлічуваний іменник у загальному значенні — без артикля).' },
        { target: 'Sie ist Ärztin.', uk: 'Вона лікарка (професія після sein — без артикля, на відміну від англійського "a doctor").' },
      ],
      exercises: [
        {
          id: 'na-1',
          type: 'multiple-choice',
          prompt: 'Er ist ___ Lehrer. (профессия after sein)',
          options: ['ein', 'der', 'einen', '— (kein Artikel)'],
          correctIndex: 3,
          explanation: 'Професія після sein/werden вживається без артикля.',
        },
        {
          id: 'na-2',
          type: 'multiple-choice',
          prompt: 'Ich habe ___ Durst. (abstract noun, general)',
          options: ['ein', 'einen', 'der', '— (kein Artikel)'],
          correctIndex: 3,
          explanation: 'Абстрактний іменник у загальному значенні (спрага) — без артикля.',
        },
        {
          id: 'na-3',
          type: 'multiple-choice',
          prompt: '___ Frankreich ist ein schönes Land. (country name)',
          options: ['Das', 'Ein', 'Die', '— (kein Artikel)'],
          correctIndex: 3,
          explanation: 'Більшість назв країн вживаються без артикля.',
        },
        {
          id: 'na-4',
          type: 'multiple-choice',
          prompt: 'Mein Vater ist ___ Ingenieur. (profession after sein)',
          options: ['ein', 'einen', 'der', '— (kein Artikel)'],
          correctIndex: 3,
          explanation: 'Професія після sein — без артикля, без ein.',
        },
        {
          id: 'na-5',
          type: 'multiple-choice',
          prompt: 'Which sentence correctly omits the article for a general/plural statement?',
          options: ['Ich mag die Hunde generell.', 'Ich mag einen Hund generell.', 'Ich mag Hunde.', 'Ich mag der Hunde.'],
          correctIndex: 2,
          explanation: 'Загальне твердження про клас істот у множині — без артикля: Ich mag Hunde.',
        },
      ],
    },
  ],
}
