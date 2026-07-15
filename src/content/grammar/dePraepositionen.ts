// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const dePraepositionen: GrammarCategory = {
  id: 'de-praepositionen',
  language: 'de',
  title: 'Прийменники',
  description:
    'Німецькі прийменники, що завжди вимагають конкретного відмінка (Akkusativ, Dativ або Genitiv) незалежно від контексту, а також стійкі дієслівно-прийменникові сполучення, які потрібно заучувати разом із дієсловом.',
  topics: [
    {
      id: 'akkusativ-prepositions',
      title: 'Präpositionen mit Akkusativ (durch, für, gegen, ohne, um)',
      theory:
        'П\'ять прийменників durch (через, крізь), für (для), gegen (проти, об), ohne (без) та um (навколо; о котрій годині) завжди вимагають Akkusativ — без жодних винятків і незалежно від того, йдеться про рух чи статичне положення (на відміну від Wechselpräpositionen, де відмінок залежить від контексту дії). Означений артикль чоловічого роду однини після цих прийменників завжди набуває форми den, а ein → einen, mein → meinen; жіночий, середній рід і множина не змінюються. Ці п\'ять прийменників найпростіше запам\'ятати просто як групу "завжди Akkusativ", і тоді вибір відмінка ніколи не буде проблемою.',
      examples: [
        { target: 'Wir gehen durch den Park.', uk: 'Ми йдемо через парк (durch + Akkusativ).' },
        { target: 'Das Auto fährt gegen den Baum.', uk: 'Машина врізається в дерево (gegen + Akkusativ).' },
        { target: 'Der Unterricht beginnt um acht Uhr.', uk: 'Заняття починається о восьмій годині (um + Akkusativ, час).' },
      ],
      exercises: [
        {
          id: 'akkp-1',
          type: 'multiple-choice',
          prompt: 'Er kämpft gegen ___ Ungerechtigkeit. (die Ungerechtigkeit)',
          options: ['die', 'der', 'den', 'des'],
          correctIndex: 0,
          explanation: 'Gegen вимагає Akkusativ; жіночий рід у Akkusativ не змінюється: die.',
        },
        {
          id: 'akkp-2',
          type: 'multiple-choice',
          prompt: 'Das Geschenk ist für ___ Freund. (der Freund)',
          options: ['der', 'den', 'dem', 'des'],
          correctIndex: 1,
          explanation: 'Für завжди вимагає Akkusativ: der → den.',
        },
        {
          id: 'akkp-3',
          type: 'fill-blank',
          prompt: 'Wir laufen durch ___ (der / Wald).',
          correctAnswers: ['den Wald'],
          explanation: 'Durch + Akkusativ: der → den.',
        },
        {
          id: 'akkp-4',
          type: 'fill-blank',
          prompt: 'Ohne ___ (ein / Regenschirm) wird es nass.',
          correctAnswers: ['einen Regenschirm'],
          explanation: 'Ohne + Akkusativ: ein → einen.',
        },
        {
          id: 'akkp-5',
          type: 'multiple-choice',
          prompt: 'Which of these prepositions always takes Akkusativ, regardless of motion or location?',
          options: ['in', 'um', 'auf', 'an'],
          correctIndex: 1,
          explanation: 'Um завжди вимагає Akkusativ; in, auf і an — це Wechselpräpositionen, що залежать від контексту.',
        },
      ],
    },
    {
      id: 'dativ-prepositions',
      title: 'Präpositionen mit Dativ (aus, bei, mit, nach, seit, von, zu)',
      theory:
        'Сім прийменників aus (з, звідки), bei (біля, у когось), mit (з, за допомогою), nach (після; до — напрямок для міст і країн), seit (з якогось часу), von (від) та zu (до) завжди вимагають Dativ — без винятків. У щоденному мовленні деякі з них зливаються з означеним артиклем в одне слово: zu + dem → zum, zu + der → zur, bei + dem → beim, von + dem → vom. Ці стягнені форми вживаються значно частіше за повні (zu dem, von dem), тож їх варто одразу запам\'ятовувати як стандартний варіант.',
      examples: [
        { target: 'Ich komme gerade vom Bahnhof.', uk: 'Я щойно з вокзалу (von + dem = vom, Dativ).' },
        { target: 'Wir gehen heute zum Arzt.', uk: 'Ми йдемо сьогодні до лікаря (zu + dem = zum, Dativ).' },
        { target: 'Seit einem Jahr lerne ich Deutsch.', uk: 'Я вивчаю німецьку вже рік (seit + Dativ).' },
      ],
      exercises: [
        {
          id: 'datp-1',
          type: 'multiple-choice',
          prompt: 'Ich wohne bei ___ Tante. (meine Tante)',
          options: ['meine', 'meiner', 'meinen', 'meines'],
          correctIndex: 1,
          explanation: 'Bei вимагає Dativ; жіночий рід: meine → meiner.',
        },
        {
          id: 'datp-2',
          type: 'multiple-choice',
          prompt: 'Which contraction correctly combines "bei" with "dem"?',
          options: ['beim', 'bei\'m', 'beidem', 'bei den'],
          correctIndex: 0,
          explanation: 'Bei + dem зливається в стягнену форму beim.',
        },
        {
          id: 'datp-3',
          type: 'fill-blank',
          prompt: 'Er kommt aus ___ (die / Schule) nach Hause.',
          correctAnswers: ['der Schule'],
          explanation: 'Aus + Dativ: die → der.',
        },
        {
          id: 'datp-4',
          type: 'fill-blank',
          prompt: 'Wir fahren morgen zu ___ (unser / Onkel).',
          correctAnswers: ['unserem Onkel'],
          explanation: 'Zu + Dativ, чоловічий рід: unser → unserem.',
        },
        {
          id: 'datp-5',
          type: 'multiple-choice',
          prompt: 'Which sentence correctly uses the contracted form "vom" with "das Kino"?',
          options: ['Ich komme vom Kino.', 'Ich komme von das Kino.', 'Ich komme von der Kino.', 'Ich komme vom das Kino.'],
          correctIndex: 0,
          explanation: 'Das Kino в Dativ → dem Kino; von + dem = vom Kino.',
        },
      ],
    },
    {
      id: 'genitiv-prepositions',
      title: 'Präpositionen mit Genitiv (während, trotz, wegen, statt)',
      theory:
        'Прийменники während (протягом), trotz (незважаючи на), wegen (через, з причини) та statt (замість) у формальній та письмовій німецькій вимагають Genitiv: während des Sommers, trotz des Regens, wegen der Prüfung, statt eines Kaffees. У розмовній мові trotz і wegen дедалі частіше вживають з Dativ (wegen dem Regen) — цю тенденцію докладніше розглянуто в темі Genitiv категорії Kasus. Statt і während натомість і в розмовній мові майже завжди лишаються з Genitiv.',
      examples: [
        { target: 'Während des Unterrichts darf man nicht telefonieren.', uk: 'Під час уроку не можна телефонувати (während + Genitiv).' },
        { target: 'Trotz des schlechten Wetters spielen die Kinder draußen.', uk: 'Незважаючи на погану погоду, діти граються надворі (trotz + Genitiv).' },
        { target: 'Statt eines Kaffees trinke ich einen Tee.', uk: 'Замість кави я п\'ю чай (statt + Genitiv).' },
      ],
      exercises: [
        {
          id: 'genp-1',
          type: 'multiple-choice',
          prompt: 'Wegen ___ Prüfung bin ich sehr nervös. (die Prüfung)',
          options: ['die', 'der', 'den', 'dem'],
          correctIndex: 1,
          explanation: 'Wegen у формальному стилі вимагає Genitiv: die → der.',
        },
        {
          id: 'genp-2',
          type: 'multiple-choice',
          prompt: 'Which two prepositions are increasingly used with Dativ in casual spoken German, even though Genitiv is the formal norm?',
          options: ['während and statt', 'trotz and wegen', 'aus and bei', 'durch and für'],
          correctIndex: 1,
          explanation: 'Trotz і wegen у розмовній мові дедалі частіше вживають з Dativ замість Genitiv.',
        },
        {
          id: 'genp-3',
          type: 'fill-blank',
          prompt: 'Statt ___ (ein / Auto) kaufen wir ein Fahrrad.',
          correctAnswers: ['eines Autos'],
          explanation: 'Statt + Genitiv, середній рід: ein → eines, Auto → Autos.',
        },
        {
          id: 'genp-4',
          type: 'fill-blank',
          prompt: 'Während ___ (die / Ferien) fahren wir ans Meer.',
          correctAnswers: ['der Ferien'],
          explanation: 'Während + Genitiv, множина: die → der.',
        },
        {
          id: 'genp-5',
          type: 'multiple-choice',
          prompt: 'Wegen ___ Kindes durften wir nicht laut sein. (das Kind)',
          options: ['das', 'der', 'des', 'dem'],
          correctIndex: 2,
          explanation: 'Genitiv середнього роду: das → des, Kind отримує -es: Kindes.',
        },
      ],
    },
    {
      id: 'verb-preposition-combinations',
      title: 'Verben mit festen Präpositionen (warten auf, sich freuen über, denken an ...)',
      theory:
        'Багато німецьких дієслів утворюють стійку пару з конкретним прийменником, чий відмінок потрібно просто вивчити напам\'ять разом із дієсловом: warten auf + Akkusativ (чекати на), sich freuen über + Akkusativ (радіти з приводу), denken an + Akkusativ (думати про), teilnehmen an + Dativ (брати участь у). Прийменник у таких сполученнях часто не збігається з тим, який очікувано вжити за аналогією з англійською чи українською мовою — наприклад, teilnehmen вживається з an, хоча за змістом хочеться інтуїтивно іншого прийменника. Такі дієслівно-прийменникові пари — одне з найпоширеніших джерел помилок, і їх варто заучувати як нерозривні одиниці, а не перекладати прийменник окремо.',
      examples: [
        { target: 'Ich warte auf den Bus.', uk: 'Я чекаю на автобус (warten auf + Akkusativ).' },
        { target: 'Sie freut sich über das Geschenk.', uk: 'Вона радіє подарунку (sich freuen über + Akkusativ).' },
        { target: 'Wir nehmen am Kurs teil.', uk: 'Ми беремо участь у курсі (teilnehmen an + Dativ, an + dem = am).' },
      ],
      exercises: [
        {
          id: 'vpk-1',
          type: 'multiple-choice',
          prompt: 'Ich denke oft ___ meine Familie.',
          options: ['an', 'für', 'auf', 'über'],
          correctIndex: 0,
          explanation: 'Denken an + Akkusativ (думати про).',
        },
        {
          id: 'vpk-2',
          type: 'multiple-choice',
          prompt: 'Er wartet schon zwei Stunden ___ seinen Freund.',
          options: ['für', 'auf', 'an', 'über'],
          correctIndex: 1,
          explanation: 'Warten auf + Akkusativ (чекати на).',
        },
        {
          id: 'vpk-3',
          type: 'fill-blank',
          prompt: 'Sie freut sich sehr ___ (über / die Nachricht).',
          correctAnswers: ['über die Nachricht'],
          explanation: 'Sich freuen über + Akkusativ; жіночий рід не змінюється: die.',
        },
        {
          id: 'vpk-4',
          type: 'fill-blank',
          prompt: 'Wir nehmen ___ (an / der Wettbewerb) teil.',
          correctAnswers: ['am Wettbewerb', 'an dem Wettbewerb'],
          explanation: 'Teilnehmen an + Dativ: der → dem, an + dem зливається в am.',
        },
        {
          id: 'vpk-5',
          type: 'multiple-choice',
          prompt: 'Why are verb-preposition combinations like "warten auf" or "denken an" especially tricky for learners?',
          options: [
            'Because the preposition never changes case',
            'Because the fixed preposition often does not match the equivalent English or Ukrainian preposition',
            'Because these verbs are always irregular',
            'Because they only exist in the Perfekt tense',
          ],
          correctIndex: 1,
          explanation: 'Такі сполучення варто заучувати цілісно, бо прийменник часто не збігається з англійським чи українським відповідником.',
        },
      ],
    },
  ],
}
