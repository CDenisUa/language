// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const deAdjektivdeklination: GrammarCategory = {
  id: 'de-adjektivdeklination',
  language: 'de',
  title: 'Відмінювання прикметників',
  description:
    'Три типи закінчень німецького прикметника — слабкі, змішані та сильні — залежать від того, який (якщо взагалі) артикль чи означальне слово стоїть перед прикметником.',
  topics: [
    {
      id: 'weak-declension',
      title: 'Schwache Deklination (nach der/die/das)',
      theory:
        'Слабка деклінація прикметників діє тоді, коли перед прикметником стоїть означений артикль (der/die/das) або der-слово (dieser, jeder, welcher, jener) — вони вже однозначно показують рід, відмінок і число іменника, тому прикметник не повторює цю інформацію і отримує лише мінімальне закінчення. У Nominativ однини для всіх трьох родів прикметник має закінчення -e: `der gute Mann, die gute Frau, das gute Kind`. Так само -e з\'являється в Akkusativ однини жіночого й середнього роду (die gute Frau, das gute Kind), адже в цих випадках Nominativ і Akkusativ збігаються. У решті позицій — Akkusativ чоловічого роду, весь Dativ і Genitiv, а також уся множина — прикметник отримує закінчення -en: `den guten Mann, dem guten Kind, die guten Männer`.',
      examples: [
        { target: 'Der kleine Junge spielt im Garten.', uk: 'Малий хлопчик грає в саду (Nominativ чоловічого роду після der — слабке закінчення -e).' },
        { target: 'Das kleine Mädchen singt ein Lied.', uk: 'Маленька дівчинка співає пісню (Nominativ середнього роду після das — слабке закінчення -e).' },
        { target: 'Die kleinen Kinder spielen zusammen.', uk: 'Маленькі діти грають разом (множина після die — слабке закінчення -en).' },
      ],
      exercises: [
        {
          id: 'schw-1',
          type: 'multiple-choice',
          prompt: 'Der ___ Mann arbeitet hier. (klug)',
          options: ['klug', 'kluge', 'klugen', 'klugem'],
          correctIndex: 1,
          explanation: 'Nominativ чоловічого роду після der: слабке закінчення -e.',
        },
        {
          id: 'schw-2',
          type: 'multiple-choice',
          prompt: 'Ich sehe den ___ Mann. (klug)',
          options: ['kluge', 'klugen', 'klugem', 'kluges'],
          correctIndex: 1,
          explanation: 'Akkusativ чоловічого роду після den: закінчення -en, бо den уже однозначно показує рід і відмінок.',
        },
        {
          id: 'schw-3',
          type: 'fill-blank',
          prompt: 'Die ___ (klug) Frau löst das Problem.',
          correctAnswers: ['kluge'],
          explanation: 'Nominativ жіночого роду після die: слабке закінчення -e.',
        },
        {
          id: 'schw-4',
          type: 'fill-blank',
          prompt: 'Diese ___ (nett) Kinder spielen zusammen.',
          correctAnswers: ['netten'],
          explanation: 'Множина після der-слова diese: слабке закінчення -en (у множині завжди -en, незалежно від Nominativ чи Akkusativ).',
        },
        {
          id: 'schw-5',
          type: 'multiple-choice',
          prompt: 'Why do adjectives after der/die/das (or der-words like dieser, jeder) take only "weak" endings (-e or -en)?',
          options: [
            'Because the article/der-word already signals gender, case, and number, so the adjective does not need to repeat that information',
            'Because weak endings are used only with irregular adjectives',
            'Because German nouns dictate the adjective ending, not the article',
            'Because -e and -en are randomly distributed and must be memorized case by case',
          ],
          correctIndex: 0,
          explanation: 'Артикль або der-слово вже несе всю граматичну інформацію (рід, відмінок, число), тому прикметник отримує лише мінімальне, «слабке» закінчення.',
        },
      ],
    },
    {
      id: 'mixed-declension',
      title: 'Gemischte Deklination (nach ein/kein/Possessivpronomen)',
      theory:
        'Змішана деклінація вживається після ein-слів — неозначеного артикля ein, заперечення kein і присвійних займенників (mein, dein, sein, ihr, unser, euer): на відміну від означеного артикля, саме ein не завжди однозначно показує рід іменника. Рівно у трьох позиціях, де ein-слово граматично «двозначне», прикметник бере на себе сильне закінчення означеного артикля: Nominativ чоловічого роду (`ein guter Mann`, як der), Nominativ середнього роду (`ein gutes Kind`, як das) і Akkusativ середнього роду (`ein gutes Kind`, оскільки в середньому роді Nominativ і Akkusativ збігаються). У решті позицій — Akkusativ чоловічого роду, Nominativ/Akkusativ жіночого роду, весь Dativ і Genitiv, уся множина — ein-слово вже однозначне (einen, einem, einer, meine тощо), тому прикметник отримує слабке закінчення, як у слабкій деклінації: `einen guten Mann, eine gute Frau, meinen guten Freunden`.',
      examples: [
        { target: 'Ein guter Freund hilft immer.', uk: 'Хороший друг завжди допомагає (Nominativ чоловічого роду після ein — сильне закінчення -er, бо ein не показує роду).' },
        { target: 'Das ist ein gutes Auto.', uk: 'Це хороша машина (Nominativ середнього роду після ein — сильне закінчення -es).' },
        { target: 'Ich habe einen guten Freund.', uk: 'У мене є хороший друг (Akkusativ чоловічого роду після einen — слабке закінчення -en, бо einen уже однозначне).' },
      ],
      exercises: [
        {
          id: 'gem-1',
          type: 'multiple-choice',
          prompt: 'Ein ___ Mann steht vor der Tür. (klug)',
          options: ['kluge', 'kluger', 'klugen', 'klugem'],
          correctIndex: 1,
          explanation: 'Nominativ чоловічого роду після ein: ein саме по собі не показує роду, тому прикметник бере сильне закінчення -er.',
        },
        {
          id: 'gem-2',
          type: 'multiple-choice',
          prompt: 'Ich habe einen ___ Hund. (klug)',
          options: ['kluger', 'kluges', 'klugen', 'klugem'],
          correctIndex: 2,
          explanation: 'Akkusativ чоловічого роду після einen: einen уже однозначно показує рід і відмінок, тому прикметник отримує слабке закінчення -en.',
        },
        {
          id: 'gem-3',
          type: 'fill-blank',
          prompt: 'Das ist ein ___ (klug) Kind.',
          correctAnswers: ['kluges'],
          explanation: 'Nominativ/Akkusativ середнього роду після ein: ein не розрізняє середній рід від чоловічого, тому прикметник бере сильне закінчення -es.',
        },
        {
          id: 'gem-4',
          type: 'fill-blank',
          prompt: 'Meine ___ (klug) Schwester wohnt in Berlin.',
          correctAnswers: ['kluge'],
          explanation: 'Nominativ жіночого роду після присвійного meine: жіночий рід уже однозначний, тому прикметник отримує слабке закінчення -e.',
        },
        {
          id: 'gem-5',
          type: 'multiple-choice',
          prompt: 'In the mixed declension (after ein/kein/possessives), in exactly how many grammatical slots does the adjective take a "strong" ending instead of weak -en?',
          options: ['1', '2', '3', '4'],
          correctIndex: 2,
          explanation: 'Ein-слова не показують рід лише у трьох місцях: Nominativ чоловічого роду та Nominativ/Akkusativ середнього роду — саме там прикметник «позичає» сильне закінчення.',
        },
      ],
    },
    {
      id: 'strong-declension',
      title: 'Starke Deklination (ohne Artikel)',
      theory:
        'Сильна деклінація діє тоді, коли перед прикметником немає жодного артикля чи означального слова — типово з незліченними іменниками, узагальненнями чи іменниками в множині без артикля (guter Kaffee schmeckt gut — кава загалом, без конкретизації). Оскільки означального слова немає, сам прикметник повинен нести всю граматичну інформацію про рід, відмінок і число, тому він набуває сильних закінчень, які буквально повторюють закінчення означеного артикля: `guter Wein` (як der), `gutes Bier` (як das), `gute Milch` (як die), `gute Weine` (як die в множині). Це стосується всіх відмінків: Dativ без артикля отримує -em/-er/-en за зразком dem/der/den (`mit frischem Obst`, `aus kalter Milch`, `zu neuen Zeiten`), а в Genitiv однини чоловічого й середнього роду є виняток — прикметник отримує -en, а не очікуване -es (`guten Weines`), бо сам іменник уже має закінчення -(e)s.',
      examples: [
        { target: 'Guter Wein kommt oft aus Frankreich.', uk: 'Хороше вино часто походить з Франції (Nominativ чоловічого роду без артикля — сильне закінчення -er, як у der).' },
        { target: 'Ich trinke gern kalte Milch.', uk: 'Я люблю пити холодне молоко (Akkusativ жіночого роду без артикля — сильне закінчення -e, як у die).' },
        { target: 'Mit frischem Obst schmeckt der Kuchen besser.', uk: 'Зі свіжими фруктами торт смачніший (Dativ середнього роду без артикля — сильне закінчення -em, як у dem).' },
      ],
      exercises: [
        {
          id: 'stark-1',
          type: 'multiple-choice',
          prompt: '___ Kaffee schmeckt am Morgen besonders gut. (stark)',
          options: ['Starke', 'Starker', 'Starken', 'Starkem'],
          correctIndex: 1,
          explanation: 'Без артикля, Nominativ чоловічого роду: прикметник бере сильне закінчення -er, як у der (der starke Kaffee → starker Kaffee).',
        },
        {
          id: 'stark-2',
          type: 'multiple-choice',
          prompt: 'Ich mag ___ Bier. (kalt)',
          options: ['kaltes', 'kalter', 'kalten', 'kaltem'],
          correctIndex: 0,
          explanation: 'Без артикля, Nominativ/Akkusativ середнього роду: закінчення -es, як у das (das kalte Bier → kaltes Bier).',
        },
        {
          id: 'stark-3',
          type: 'fill-blank',
          prompt: 'Mit ___ (frisch) Wasser fühlt man sich besser.',
          correctAnswers: ['frischem'],
          explanation: 'Без артикля, Dativ середнього роду: закінчення -em, як у dem (mit dem frischen Wasser → mit frischem Wasser).',
        },
        {
          id: 'stark-4',
          type: 'fill-blank',
          prompt: '___ (Frisch) Milch schmeckt besser als H-Milch.',
          correctAnswers: ['Frische'],
          explanation: 'Без артикля, Nominativ жіночого роду: закінчення -e, як у die (die frische Milch → frische Milch).',
        },
        {
          id: 'stark-5',
          type: 'multiple-choice',
          prompt: 'Why do adjectives without any article take "strong" endings that mirror the definite article\'s own endings?',
          options: [
            'Because there is no article/der-word to signal gender, case, and number, so the adjective itself must carry that grammatical information',
            'Because strong endings are used only in formal writing',
            'Because German requires doubling every ending for emphasis',
            'Because plural nouns always require strong adjective endings, even with articles',
          ],
          correctIndex: 0,
          explanation: 'Без артикля саме прикметник — єдиний сигнал роду, відмінка й числа, тому він «сильний» і повторює закінчення означеного артикля.',
        },
      ],
    },
  ],
}
