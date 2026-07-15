// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const deWortstellung: GrammarCategory = {
  id: 'de-wortstellung',
  language: 'de',
  title: 'Порядок слів (Wortstellung)',
  description:
    'Порядок слів у німецькому реченні: фіксована друга позиція дієслова в головному реченні (V2), винесення дієслова в кінець підрядного речення, конвенційний порядок обставин TeKaMoLo та дієслово на першому місці в питаннях і наказовому способі.',
  topics: [
    {
      id: 'v2-word-order',
      title: 'Verb-Zweit-Stellung (V2) im Hauptsatz',
      theory:
        'У німецькому розповідному головному реченні дієвідмінюване дієслово завжди займає другу позицію (Verb-Zweit-Stellung, V2) — незалежно від того, що саме стоїть на першому місці: підмет, обставина часу, додаток чи будь-який інший елемент. Якщо перше місце займає не підмет, а щось інше (наприклад, heute чи diesen Film), підмет не зникає, а переміщується одразу після дієслова: Heute gehe ich ins Kino (а не *Heute ich gehe ins Kino). Це явище — інверсія підмета й дієслова при винесенні іншого елемента на перше місце — є одним з головних джерел помилок для тих, хто говорить англійською, бо в англійській мові такої інверсії немає (Today I go to the cinema, підмет завжди перед дієсловом). Правило V2 стосується лише головних розповідних речень: у підрядних реченнях (див. Verb-Letzt-Stellung) та в наказових і деяких питальних реченнях (Verb-Erst-Stellung) діють інші правила.',
      examples: [
        { target: 'Ich gehe heute ins Kino.', uk: 'Я йду сьогодні в кіно (підмет ich на першому місці, дієслово gehe — друге).' },
        { target: 'Heute gehe ich ins Kino.', uk: 'Сьогодні я йду в кіно (обставина часу heute винесена на перше місце, дієслово gehe лишається другим, підмет ich переміщується після нього).' },
        { target: 'Diesen Film habe ich schon gesehen.', uk: 'Цей фільм я вже бачив (додаток Diesen Film винесений для акценту на перше місце, допоміжне дієслово habe — друге, підмет ich — після нього).' },
      ],
      exercises: [
        {
          id: 'v2-1',
          type: 'multiple-choice',
          prompt: 'Оберіть речення з правильним порядком слів, якщо на перше місце ставимо "Heute" (сьогодні).',
          options: ['Heute ich lese ein Buch.', 'Heute lese ich ein Buch.', 'Heute liest ich ein Buch.', 'Ich heute lese ein Buch.'],
          correctIndex: 1,
          explanation: 'Дієслово завжди на другій позиції: після Heute одразу йде дієслово lese, а підмет ich — одразу після нього.',
        },
        {
          id: 'v2-2',
          type: 'fill-blank',
          prompt: 'Morgen ___ (fahren — wir) nach München.',
          correctAnswers: ['fahren wir'],
          explanation: 'Коли обставина часу (morgen) займає перше місце, дієслово fahren лишається другим елементом, а підмет wir переміщується одразу після нього.',
        },
        {
          id: 'v2-3',
          type: 'multiple-choice',
          prompt: 'Diesen Film ___ ich schon zweimal gesehen. (haben)',
          options: ['habe', 'hat', 'habt', 'haben'],
          correctIndex: 0,
          explanation: 'Підмет ich вимагає форми habe; допоміжне дієслово стоїть на другій позиції речення, хоча перед ним стоїть додаток Diesen Film.',
        },
        {
          id: 'v2-4',
          type: 'fill-blank',
          prompt: 'Das Buch ___ (lesen — ich) gerade.',
          correctAnswers: ['lese ich'],
          explanation: 'Коли додаток (Das Buch) виноситься на перше місце для акценту, дієслово лишається другим, а підмет ich — одразу після нього.',
        },
        {
          id: 'v2-5',
          type: 'multiple-choice',
          prompt: 'What happens to the subject when a non-subject element (like a time expression) is placed in first position in a German main clause?',
          options: [
            'The subject is dropped',
            'The subject moves to the position right after the conjugated verb',
            'The subject stays in first position alongside the other element',
            'The verb moves to the end of the clause',
          ],
          correctIndex: 1,
          explanation: 'Це правило V2: дієслово завжди друге, тому підмет "поступається" першою позицією і опиняється одразу після дієслова.',
        },
      ],
    },
    {
      id: 'verb-final-subordinate',
      title: 'Verb-Letzt-Stellung im Nebensatz',
      theory:
        'У підрядному реченні, що починається сполучником weil, dass, wenn, obwohl, da чи ob, дієвідмінюване дієслово переміщується в самий кінець речення: Ich bleibe zu Hause, weil ich krank bin (а не *weil ich bin krank). Ця структура не має прямого відповідника в англійській мові, де порядок слів у підрядному реченні залишається таким самим, як у головному (SVO), тому вона є одним із головних джерел помилок у порядку слів. Якщо в підрядному реченні є допоміжне чи модальне дієслово, саме дієвідмінювана форма (habe, ist, kann...) стає останньою, а інфінітив або Partizip II стоїть безпосередньо перед нею: ..., weil ich das Buch gelesen habe. Кома завжди відокремлює головне речення від підрядного; якщо підрядне речення стоїть першим у всьому реченні, головне речення після нього починається одразу з дієслова (діє правило V2 з попередньої теми): Obwohl es regnet, gehen wir spazieren.',
      examples: [
        { target: 'Ich bleibe zu Hause, weil ich krank bin.', uk: 'Я залишаюсь удома, бо я хворий (weil-речення: дієслово bin — в кінці).' },
        { target: 'Sie sagt, dass sie morgen kommt.', uk: 'Вона каже, що прийде завтра (dass-речення: дієслово kommt — в кінці).' },
        { target: 'Obwohl es regnet, gehen wir spazieren.', uk: 'Хоча йде дощ, ми йдемо на прогулянку (obwohl-речення попереду, дієслово regnet в кінці; головне речення після коми починається з дієслова gehen — V2).' },
      ],
      exercises: [
        {
          id: 'vl-1',
          type: 'multiple-choice',
          prompt: 'Оберіть речення з правильним порядком слів у підрядному реченні (weil).',
          options: ['..., weil ich bin krank.', '..., weil ich krank bin.', '..., weil bin ich krank.', '..., weil krank ich bin.'],
          correctIndex: 1,
          explanation: 'У підрядному реченні після weil дієслово (bin) переміщується в кінець речення.',
        },
        {
          id: 'vl-2',
          type: 'fill-blank',
          prompt: 'Er sagt, dass er das Auto ___ (kaufen, Präsens — er).',
          correctAnswers: ['kauft'],
          explanation: 'У підрядному реченні з dass дієвідмінювана форма kauft стоїть у кінці речення.',
        },
        {
          id: 'vl-3',
          type: 'multiple-choice',
          prompt: 'Wenn es morgen ___ , bleiben wir zu Hause. (regnen)',
          options: ['regnet', 'es regnet', 'regnet es', 'wird regnen'],
          correctIndex: 0,
          explanation: 'Дієслово regnet завжди стоїть у кінці підрядного речення з wenn; окремий підмет es тут не повторюється.',
        },
        {
          id: 'vl-4',
          type: 'fill-blank',
          prompt: 'Obwohl ich müde ___ (sein — ich), arbeite ich weiter.',
          correctAnswers: ['bin'],
          explanation: 'У підрядному реченні з obwohl дієслово bin переміщується в кінець цієї частини речення.',
        },
        {
          id: 'vl-5',
          type: 'multiple-choice',
          prompt: 'Which English sentence structure is fundamentally different from its German equivalent when using a subordinating conjunction like "because" (weil)?',
          options: [
            'English also moves the verb to the end of the clause',
            'English keeps normal subject-verb-object order, unlike German which sends the verb to the end',
            'English drops the subject entirely',
            'English requires a comma but German does not',
          ],
          correctIndex: 1,
          explanation: 'На відміну від німецької, англійська зберігає звичайний порядок SVO в підрядному реченні — це і є головна причина помилок.',
        },
      ],
    },
    {
      id: 'tekamolo',
      title: 'TeKaMoLo — Reihenfolge der Adverbialien (Zeit, Kausalität, Art und Weise, Ort)',
      theory:
        'Коли в одному реченні одночасно з\'являються кілька обставин різних типів, вони, як правило, розташовуються у фіксованому порядку — TeKaMoLo: Temporal (коли?) → Kausal (чому?) → Modal (як?) → Lokal (де?/куди?). Наприклад: Ich fahre morgen (Te) wegen der Konferenz (Ka) mit dem Auto (Mo) nach Berlin (Lo). Це не абсолютний граматичний закон, а швидше практична модель за замовчуванням: навіть якщо в реченні присутні лише два-три типи обставин, порядок між ними все одно підпорядковується цій послідовності. Будь-яку окрему обставину можна винести на перше місце речення для акценту (за правилом V2 — дієслово залишається другим), але якщо кілька обставин лишаються всередині речення після дієслова, вони йдуть саме в порядку TeKaMoLo.',
      examples: [
        { target: 'Ich fahre morgen mit dem Auto nach Berlin.', uk: 'Я їду завтра машиною до Берліна (Te: morgen → Mo: mit dem Auto → Lo: nach Berlin).' },
        { target: 'Er lernt jeden Abend wegen der Prüfung fleißig zu Hause.', uk: 'Він старанно вчиться щовечора вдома через екзамен (Te: jeden Abend → Ka: wegen der Prüfung → Mo: fleißig → Lo: zu Hause).' },
        { target: 'Wir treffen uns heute wegen des Projekts im Büro.', uk: 'Ми зустрічаємось сьогодні в офісі через проєкт (Te: heute → Ka: wegen des Projekts → Lo: im Büro, без Modal).' },
      ],
      exercises: [
        {
          id: 'tkm-1',
          type: 'multiple-choice',
          prompt: 'Оберіть речення з правильним порядком обставин (TeKaMoLo): час — спосіб — місце.',
          options: [
            'Ich fahre mit dem Auto morgen nach Berlin.',
            'Ich fahre morgen mit dem Auto nach Berlin.',
            'Ich fahre nach Berlin morgen mit dem Auto.',
            'Ich fahre morgen nach Berlin mit dem Auto.',
          ],
          correctIndex: 1,
          explanation: 'Порядок TeKaMoLo: спочатку час (morgen), потім спосіб дії (mit dem Auto), потім місце (nach Berlin).',
        },
        {
          id: 'tkm-2',
          type: 'fill-blank',
          prompt: 'Er fährt ___ (jeden Tag / mit dem Bus) zur Arbeit. (Te + Mo, у правильному порядку)',
          correctAnswers: ['jeden Tag mit dem Bus'],
          explanation: 'Temporal (jeden Tag) йде перед Modal (mit dem Bus) згідно з правилом TeKaMoLo.',
        },
        {
          id: 'tkm-3',
          type: 'multiple-choice',
          prompt: 'Which adverbial type comes immediately after Temporal (Te) in the TeKaMoLo order?',
          options: ['Lokal', 'Modal', 'Kausal', 'None — Temporal is always last'],
          correctIndex: 2,
          explanation: 'Порядок TeKaMoLo: Temporal → Kausal → Modal → Lokal, тож одразу після часу йде причина (Kausal).',
        },
        {
          id: 'tkm-4',
          type: 'fill-blank',
          prompt: 'Wir bleiben ___ (heute / wegen des Regens) zu Hause. (Te + Ka, у правильному порядку)',
          correctAnswers: ['heute wegen des Regens'],
          explanation: 'Temporal (heute) стоїть перед Kausal (wegen des Regens) відповідно до TeKaMoLo.',
        },
        {
          id: 'tkm-5',
          type: 'multiple-choice',
          prompt: 'Оберіть речення, де порядок обставин відповідає TeKaMoLo (Te–Ka–Mo–Lo).',
          options: [
            'Sie arbeitet fleißig heute wegen der Deadline im Büro.',
            'Sie arbeitet heute wegen der Deadline fleißig im Büro.',
            'Sie arbeitet im Büro heute fleißig wegen der Deadline.',
            'Sie arbeitet wegen der Deadline heute fleißig im Büro.',
          ],
          correctIndex: 1,
          explanation: 'Правильний порядок: heute (Te) → wegen der Deadline (Ka) → fleißig (Mo) → im Büro (Lo).',
        },
      ],
    },
    {
      id: 'questions-imperative-word-order',
      title: 'Wortstellung in Fragen und im Imperativ',
      theory:
        'У питаннях без питального слова (так/ні-питання, Ja/Nein-Fragen) дієвідмінюване дієслово стоїть на першому місці речення (Verb-Erst-Stellung): Kommst du mit? Той самий порядок — дієслово на першому місці — використовується і в наказовому способі (Imperativ): Komm mit! У формі на "du" підмет узагалі опускається, а у формах на "Sie" та "wir" підмет зберігається одразу після дієслова: Kommen Sie mit!, Gehen wir! Натомість питання з питальним словом (W-Frage: wer, was, wo, wann, warum, wie) зберігають структуру V2 звичайного головного речення — питальне слово займає перше місце, а дієслово — друге: Wo wohnst du? Отже, ключова відмінність полягає в типі питання: без питального слова дієслово стоїть першим, а з питальним словом — другим, одразу після нього.',
      examples: [
        { target: 'Kommst du mit?', uk: 'Ти йдеш з нами? (Ja/Nein-Frage: дієслово kommst на першому місці).' },
        { target: 'Komm mit!', uk: 'Ходи з нами! (Imperativ, форма du: дієслово komm на першому місці, підмет du опущений).' },
        { target: 'Wo wohnst du?', uk: 'Де ти живеш? (W-Frage: питальне слово wo — перше, дієслово wohnst — друге).' },
      ],
      exercises: [
        {
          id: 'qi-1',
          type: 'multiple-choice',
          prompt: 'Оберіть правильний порядок слів для питання без питального слова (Ja/Nein-Frage).',
          options: ['Du kommst mit?', 'Kommst du mit?', 'Mit kommst du?', 'Du mit kommst?'],
          correctIndex: 1,
          explanation: 'У так/ні-питаннях дієслово (kommst) стоїть на першому місці речення.',
        },
        {
          id: 'qi-2',
          type: 'fill-blank',
          prompt: '___ (kommen — du) heute Abend vorbei? (Ja/Nein-Frage)',
          correctAnswers: ['Kommst du'],
          explanation: 'У питанні без питального слова дієслово kommst стоїть першим, а підмет du — одразу після нього.',
        },
        {
          id: 'qi-3',
          type: 'multiple-choice',
          prompt: 'Оберіть правильну форму наказового способу (Imperativ, форма "du") від дієслова "kommen": "___ bitte mit!"',
          options: ['Du kommst', 'Kommst du', 'Komm', 'Kommen'],
          correctIndex: 2,
          explanation: 'У наказовому способі форми "du" дієслово стоїть першим, а підмет du опускається: Komm mit!',
        },
        {
          id: 'qi-4',
          type: 'fill-blank',
          prompt: 'Wo ___ (wohnen — du)?',
          correctAnswers: ['wohnst du'],
          explanation: 'У W-Frage питальне слово (wo) стоїть першим, а дієслово (wohnst) — другим, підмет — одразу після дієслова.',
        },
        {
          id: 'qi-5',
          type: 'multiple-choice',
          prompt: 'What distinguishes the word order of a yes/no question from a wh-question (W-Frage) in German?',
          options: [
            'Yes/no questions put the verb first; wh-questions put the question word first and the verb second',
            'Both put the verb at the very end of the clause',
            'Yes/no questions never use a conjugated verb',
            'Wh-questions always drop the subject',
          ],
          correctIndex: 0,
          explanation: 'Так/ні-питання мають дієслово на першому місці (Verb-Erst-Stellung), а W-Frage — питальне слово першим і дієслово другим (як у звичайному головному реченні).',
        },
      ],
    },
  ],
}
