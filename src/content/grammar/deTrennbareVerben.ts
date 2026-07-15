// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const deTrennbareVerben: GrammarCategory = {
  id: 'de-trennbare-verben',
  language: 'de',
  title: 'Дієслова з відокремлюваними та невідокремлюваними префіксами',
  description:
    'Німецькі дієслівні префікси: ті, що завжди відокремлюються (trennbar) і переносяться в кінець речення, ті, що ніколи не відокремлюються (untrennbar) і не отримують ge- у Partizip II, та невелика група префіксів із подвійною поведінкою й значенням залежно від конкретного дієслова.',
  topics: [
    {
      id: 'separable-verbs',
      title: 'Trennbare Verben (ab-, an-, auf-, aus-, mit-, ...)',
      theory:
        'Дієслова з відокремлюваним префіксом (aufstehen, ankommen, einkaufen тощо) у головному реченні розпадаються на дві частини: відмінювана частина дієслова стоїть на другій позиції речення, а префікс переноситься в самий кінець: Ich stehe um sieben Uhr auf (aufstehen). Такий префікс завжди несе на собі наголос: AUFstehen, ANkommen. У інфінітиві, у Partizip II (з -ge- між префіксом і коренем: aufgestanden) та в підрядних реченнях (де дієслово й так іде в кінець) префікс і корінь знову пишуться разом одним словом: ..., weil ich um sieben Uhr aufstehe. У конструкції з zu-інфінітивом частка zu вставляється саме між префіксом і коренем: aufzustehen, einzukaufen. Найпоширеніші відокремлювані префікси: ab-, an-, auf-, aus-, ein-, mit-, vor-, weg-, zu-, zurück-.',
      examples: [
        { target: 'Ich stehe jeden Morgen um sieben Uhr auf.', uk: 'Я встаю щоранку о сьомій (aufstehen: префікс auf переноситься в кінець головного речення).' },
        { target: 'Er versucht, pünktlich aufzustehen.', uk: 'Він намагається встати вчасно (zu-інфінітив: aufzustehen — zu вставляється між префіксом і коренем).' },
        { target: 'Ich weiß, dass sie jeden Tag früh aufsteht.', uk: 'Я знаю, що вона щодня рано встає (підрядне речення: дієслово в кінці, префікс і корінь знову разом — aufsteht).' },
      ],
      exercises: [
        {
          id: 'sepv-1',
          type: 'multiple-choice',
          prompt: 'Wähle den korrekt gebauten Hauptsatz. (aufstehen, ich, um sieben Uhr)',
          options: ['Ich aufstehe um sieben Uhr.', 'Ich stehe um sieben Uhr auf.', 'Ich stehe auf um sieben Uhr.', 'Ich auf stehe um sieben Uhr.'],
          correctIndex: 1,
          explanation: 'У головному реченні відмінювана частина дієслова (stehe) стоїть на другій позиції, а відокремлюваний префікс (auf) переноситься в кінець речення.',
        },
        {
          id: 'sepv-2',
          type: 'fill-blank',
          prompt: 'Ich kaufe im Supermarkt ___. (einkaufen)',
          correctAnswers: ['ein'],
          explanation: 'Einkaufen — відокремлюваний префікс ein-; дієслово kaufe стоїть на другій позиції, а ein переноситься в кінець речення.',
        },
        {
          id: 'sepv-3',
          type: 'multiple-choice',
          prompt: 'Which sentence correctly places "ankommen" in a subordinate clause introduced by "weil"?',
          options: ['..., weil er um acht Uhr ankommt.', '..., weil er um acht Uhr kommt an.', '..., weil er ankommt um acht Uhr.', '..., weil er um acht Uhr an kommt.'],
          correctIndex: 0,
          explanation: 'У підрядному реченні дієслово йде в кінець, тож префікс і корінь знову пишуться разом одним словом: ankommt.',
        },
        {
          id: 'sepv-4',
          type: 'fill-blank',
          prompt: 'Er hat keine Zeit, das Fenster ___. (aufmachen, zu-Infinitiv)',
          correctAnswers: ['aufzumachen'],
          explanation: 'У zu-інфінітиві zu вставляється між префіксом і коренем: auf + zu + machen = aufzumachen.',
        },
        {
          id: 'sepv-5',
          type: 'multiple-choice',
          prompt: 'Which of these is a typical separable prefix in German?',
          options: ['ver-', 'be-', 'weg-', 'ent-'],
          correctIndex: 2,
          explanation: 'Weg- є типовим відокремлюваним префіксом (weggehen, wegwerfen); ver-, be-, ent- — невідокремлювані.',
        },
      ],
    },
    {
      id: 'inseparable-verbs',
      title: 'Untrennbare Verben (be-, ge-, er-, ver-, zer-, ent-, emp-, miss-)',
      theory:
        'Префікси be-, ge-, er-, ver-, zer-, ent-, emp-, miss- ніколи не відокремлюються від дієслівного кореня — вони завжди залишаються приєднаними: у головному й підрядному реченні, в інфінітиві та в Partizip II: besuchen, ich besuche, ich habe besucht. На відміну від відокремлюваних префіксів, які завжди наголошені, ці префікси НІКОЛИ не несуть наголосу — наголос падає на корінь дієслова: beSUCHen, verSTEHen, erKLÄREN. Найважливіша практична відмінність: дієслова з цими префіксами НЕ додають типове -ge- при утворенні Partizip II — besuchen → besucht (не *gebesucht), verstehen → verstanden (не *geverstanden), тоді як більшість інших дієслів отримують -ge- (machen → gemacht).',
      examples: [
        { target: 'Ich besuche meine Großmutter jeden Sonntag.', uk: 'Я відвідую бабусю щонеділі (besuchen — невідокремлюваний префікс be-, наголос на корені: beSUCHen).' },
        { target: 'Hast du das Buch schon verstanden?', uk: 'Ти вже зрозумів цю книгу? (Partizip II: verstanden, без додаткового -ge-).' },
        { target: 'Sie erklärt die Regel sehr geduldig.', uk: 'Вона дуже терпляче пояснює правило (erklären — префікс er- ніколи не відокремлюється).' },
      ],
      exercises: [
        {
          id: 'iv-1',
          type: 'multiple-choice',
          prompt: 'What is the Partizip II of "besuchen"?',
          options: ['gebesucht', 'besucht', 'besuchen', 'gebesuchen'],
          correctIndex: 1,
          explanation: 'Дієслова з невідокремлюваними префіксами (be-, ge-, er-, ver-, zer-, ent-, emp-, miss-) не додають -ge- у Partizip II: besuchen → besucht.',
        },
        {
          id: 'iv-2',
          type: 'fill-blank',
          prompt: 'Ich habe die Antwort nicht ___. (verstehen, Partizip II)',
          correctAnswers: ['verstanden'],
          explanation: 'Verstehen — невідокремлюваний префікс ver-; Partizip II утворюється без -ge-: verstanden.',
        },
        {
          id: 'iv-3',
          type: 'multiple-choice',
          prompt: 'Which of these is a typical inseparable (untrennbar) prefix in German?',
          options: ['auf-', 'mit-', 'ent-', 'zurück-'],
          correctIndex: 2,
          explanation: 'Ent- — невідокремлюваний префікс (entdecken, entscheiden); auf-, mit-, zurück- — відокремлювані.',
        },
        {
          id: 'iv-4',
          type: 'fill-blank',
          prompt: 'Er ___ (erzählen) eine spannende Geschichte. (Präsens, er-Form)',
          correctAnswers: ['erzählt'],
          explanation: 'Erzählen — невідокремлюваний префікс er-; дієслово відмінюється звично, а префікс завжди залишається приєднаним.',
        },
        {
          id: 'iv-5',
          type: 'multiple-choice',
          prompt: 'Why is the prefix in "verstehen" never stressed, unlike the prefix in "aufstehen"?',
          options: [
            'Because inseparable prefixes are always unstressed, while separable prefixes always carry the stress',
            'Because "verstehen" is an irregular verb',
            'Because it starts with a consonant',
            'There is no difference in stress between the two verbs',
          ],
          correctIndex: 0,
          explanation: 'Невідокремлювані префікси ніколи не несуть наголосу (verSTEHen), тоді як відокремлювані префікси завжди наголошені (AUFstehen).',
        },
      ],
    },
    {
      id: 'dual-prefixes',
      title: 'Prefixe mit doppelter Bedeutung (durch-, über-, um-, unter-, wieder-)',
      theory:
        'Невелика група префіксів — durch-, über-, um-, unter-, wieder- — може бути як відокремлюваною, так і невідокремлюваною залежно від конкретного дієслова, і цей вибір впливає одразу на наголос і часто на значення. Коли префікс відокремлюваний, він несе наголос і зазвичай має буквальне, конкретне значення: übersetzen (з наголосом на über-) означає "перевозити, переправляти через" (ich setze das Boot über). Коли той самий префікс невідокремлюваний, наголос падає на корінь дієслова, а значення стає переносним, абстрактним: übersetzen (з наголосом на -setzen) означає "перекладати" (ich übersetze den Text, без -ge- у Partizip II: übersetzt). Такі дієслова доводиться запам\'ятовувати парами, бо написання в обох випадках однакове, а вимова, поведінка при відмінюванні та значення різняться.',
      examples: [
        { target: 'Der Fährmann setzt die Passagiere ans andere Ufer über.', uk: 'Поромник переправляє пасажирів на інший берег (übersetzen, відокремлюваний, буквальне значення "переправляти").' },
        { target: 'Ich übersetze den Roman ins Ukrainische.', uk: 'Я перекладаю роман українською (übersetzen, невідокремлюваний, переносне значення "перекладати").' },
        { target: 'Der Fahrer umfährt die Baustelle, um pünktlich anzukommen.', uk: 'Водій об\'їжджає будівельний майданчик, щоб приїхати вчасно (umfahren, невідокремлюваний, переносне значення "об\'їжджати, оминати").' },
      ],
      exercises: [
        {
          id: 'dp-1',
          type: 'multiple-choice',
          prompt: 'Which sentence uses "übersetzen" in its separable, literal sense ("to ferry across")?',
          options: ['Ich übersetze das Buch ins Deutsche.', 'Der Fährmann setzt die Passagiere über.', 'Sie hat den Text übersetzt.', 'Wir übersetzen den Roman gemeinsam.'],
          correctIndex: 1,
          explanation: 'У відокремлюваному, буквальному значенні (переправляти) префікс über- переноситься в кінець речення: setzt ... über.',
        },
        {
          id: 'dp-2',
          type: 'fill-blank',
          prompt: 'Ich ___ (übersetzen, Präsens) den Text ins Ukrainische. (переносне значення "перекладати")',
          correctAnswers: ['übersetze'],
          explanation: 'У невідокремлюваному, переносному значенні (перекладати) префікс завжди залишається приєднаним: ich übersetze.',
        },
        {
          id: 'dp-3',
          type: 'multiple-choice',
          prompt: 'What changes between the separable and inseparable versions of prefixes like "durch-", "über-", "um-", "unter-", "wieder-"?',
          options: [
            'Only the meaning changes, stress stays the same',
            'Only the stress changes, meaning stays the same',
            'Both stress and often meaning change — separable is usually literal/concrete, inseparable often figurative/abstract',
            'Nothing changes; the two forms are fully interchangeable',
          ],
          correctIndex: 2,
          explanation: 'Ці префікси змінюють і наголос, і часто значення: відокремлюваний варіант зазвичай буквальний, невідокремлюваний — переносний, абстрактний.',
        },
        {
          id: 'dp-4',
          type: 'fill-blank',
          prompt: 'Der Radfahrer wurde beinahe ___. (umfahren, Partizip II, буквальне значення "збити/наїхати")',
          correctAnswers: ['umgefahren'],
          explanation: 'У відокремлюваному, буквальному значенні (збити) Partizip II утворюється з -ge- всередині: umgefahren.',
        },
        {
          id: 'dp-5',
          type: 'multiple-choice',
          prompt: 'Which Partizip II form is correct for the inseparable, figurative meaning of "umfahren" ("to drive around, avoid")?',
          options: ['umgefahren', 'umfahren', 'geumfahren', 'umgeführt'],
          correctIndex: 1,
          explanation: 'У невідокремлюваному значенні (об\'їжджати) Partizip II не отримує -ge-: umfahren.',
        },
      ],
    },
  ],
}
