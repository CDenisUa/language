// Types
import type { GrammarCategory } from '@/types/grammarTopic'

export const cohesion: GrammarCategory = {
  id: 'cohesion',
  language: 'en',
  title: "Зв'язність та організація тексту",
  description:
    "Непряма мова, дискурсивні маркери, еліпсис і субституція та звороти there is/are — засоби, що з'єднують окремі речення в цілісний, природно звучний текст.",
  topics: [
    {
      id: 'reported-speech',
      title: 'Reported Speech',
      theory:
        'У непрямій мові часи зазвичай зсуваються на один крок у минуле (backshift): Present Simple → Past Simple, Present Perfect → Past Perfect, will → would ("I am tired" → "She said she was tired"). Займенники й вказівники часу/місця також змінюються відповідно до нової точки зору: today → that day, tomorrow → the next day, here → there, this → that. Непрямі питання зберігають порядок слів стверджувального речення (без інверсії) і додають if/whether для питань без питального слова: "Are you coming?" → "He asked if I was coming." Непрямі накази передаються через to-infinitive: "Close the door!" → "She told him to close the door."',
      examples: [
        { target: '"I am tired," she said. → She said she was tired.', uk: 'Present Simple зсувається в Past Simple.' },
        { target: '"Are you coming tomorrow?" → He asked if I was coming the next day.', uk: 'Питання без wh-слова отримує if, а tomorrow стає the next day.' },
        { target: '"Close the door," she told him. → She told him to close the door.', uk: 'Наказ передається через to-infinitive.' },
      ],
      exercises: [
        {
          id: 'rs-1',
          type: 'multiple-choice',
          prompt: '"I like this song," she said. → She said she ___ that song.',
          options: ['likes', 'liked', 'like', 'has liked'],
          correctIndex: 1,
          explanation: 'Present Simple зсувається в Past Simple у непрямій мові.',
        },
        {
          id: 'rs-2',
          type: 'multiple-choice',
          prompt: '"Are you free tomorrow?" he asked. → He asked if I ___ free the next day.',
          options: ['am', 'was', 'will be', 'have been'],
          correctIndex: 1,
          explanation: 'Present Simple → Past Simple; tomorrow → the next day.',
        },
        {
          id: 'rs-3',
          type: 'fill-blank',
          prompt: '"Don\'t touch that!" she said. → She told him ___ (not / touch) that.',
          correctAnswers: ['not to touch'],
          explanation: 'Заперечний наказ у непрямій мові: not + to-infinitive.',
        },
        {
          id: 'rs-4',
          type: 'fill-blank',
          prompt: '"I will call you tomorrow," he said. → He said he ___ (will) call me the next day.',
          correctAnswers: ['would'],
          explanation: 'Will зсувається у would у непрямій мові.',
        },
        {
          id: 'rs-5',
          type: 'multiple-choice',
          prompt: 'Which sentence correctly reports the question "Where do you live?"',
          options: [
            'She asked where did I live.',
            'She asked where I lived.',
            'She asked where I live.',
            'She asked me where do I live.',
          ],
          correctIndex: 1,
          explanation: 'Непряме питання зберігає прямий порядок слів (без do) і зсуває час.',
        },
      ],
    },
    {
      id: 'discourse-markers',
      title: 'Discourse Markers (however, despite, although, because)',
      theory:
        'Для контрасту: however вводить нове речення (часто після крапки чи з комою) — "The plan was risky. However, it worked." Although/though вводять повне підрядне речення з підметом і дієсловом ("Although it was raining, we went out"), тоді як despite/in spite of вимагають іменника чи -ing форми, а не повного речення ("Despite the rain, we went out" / "Despite raining"). Для причини: because вводить повне речення ("because it was raining"), тоді as/since — теж повне речення, але звучать формальніше й ставлять причину на перший план, а because of/due to вимагають іменника, як despite. Для наслідку: therefore, as a result, consequently вводять новий результат, типово у формальному письмовому стилі.',
      examples: [
        { target: 'Despite the heavy rain, the match continued.', uk: 'Незважаючи на сильний дощ, матч тривав (despite + іменник).' },
        { target: 'Although it was raining heavily, the match continued.', uk: 'Хоча йшов сильний дощ, матч тривав (although + повне речення).' },
        { target: 'She was exhausted; therefore, she went to bed early.', uk: 'Вона була виснажена, тому рано лягла спати (наслідок).' },
      ],
      exercises: [
        {
          id: 'dm-1',
          type: 'multiple-choice',
          prompt: '___ the traffic, we arrived on time.',
          options: ['Although', 'Despite', 'Because', 'Therefore'],
          correctIndex: 1,
          explanation: 'Despite + іменник (the traffic), без повного речення.',
        },
        {
          id: 'dm-2',
          type: 'multiple-choice',
          prompt: '___ she was very tired, she finished the report.',
          options: ['Despite', 'In spite of', 'Although', 'Because of'],
          correctIndex: 2,
          explanation: 'Although + повне підрядне речення (she was very tired).',
        },
        {
          id: 'dm-3',
          type: 'fill-blank',
          prompt: 'The flight was delayed ___ (due to) bad weather.',
          correctAnswers: ['due to'],
          explanation: 'Due to + іменник — причина, як і because of.',
        },
        {
          id: 'dm-4',
          type: 'fill-blank',
          prompt: "He didn't study at all. ___, he failed the exam.",
          correctAnswers: ['As a result', 'Therefore', 'Consequently'],
          explanation: 'Ці слова вводять наслідок попередньої причини.',
        },
        {
          id: 'dm-5',
          type: 'multiple-choice',
          prompt: 'Which sentence correctly uses "however"?',
          options: [
            'However the plan was risky, it worked.',
            'The plan was risky. However, it worked.',
            'The plan however was risky it worked.',
            'However risky the plan, however it worked.',
          ],
          correctIndex: 1,
          explanation: 'However зазвичай починає нове речення після крапки чи з комою.',
        },
      ],
    },
    {
      id: 'ellipsis-and-substitution',
      title: 'Ellipsis and Substitution',
      theory:
        'Еліпсис — це пропуск слів, які повторюються й зрозумілі з контексту, щоб уникнути зайвої тавтології: "I\'d like to go, but I can\'t [go]" — дієслово go опущене вдруге. Субституція замінює вже сказану інформацію коротким словом замість повторення: so/not замінюють цілу пропозицію ("Will it rain? I think so" / "I hope not"), one/ones замінюють іменник ("I don\'t like this shirt — I\'ll take the blue one"), а do/does/did замінюють цілу дієслівну групу ("She loves jazz, and so do I" = and I love jazz too).',
      examples: [
        { target: "I wanted to help, but I couldn't.", uk: 'Я хотів допомогти, але не зміг (help опущено — еліпсис).' },
        { target: '"Will she come?" "I hope so."', uk: '"Вона прийде?" "Сподіваюсь, що так" (so замінює "she will come").' },
        { target: "He likes tea, and so does she.", uk: 'Йому подобається чай, і їй теж (so does — субституція дієслівної групи).' },
      ],
      exercises: [
        {
          id: 'eas-1',
          type: 'multiple-choice',
          prompt: '"Is it going to snow?" "I think ___."',
          options: ['it', 'so', 'that', 'yes it'],
          correctIndex: 1,
          explanation: 'So замінює цілу попередню пропозицію ("it is going to snow").',
        },
        {
          id: 'eas-2',
          type: 'multiple-choice',
          prompt: 'I don\'t like this hat — can I try the blue ___?',
          options: ['it', 'hat', 'one', 'that'],
          correctIndex: 2,
          explanation: 'One замінює вже назване злічуване іменник (hat), уникаючи повторення.',
        },
        {
          id: 'eas-3',
          type: 'fill-blank',
          prompt: 'He can play the guitar, and so ___ his sister.',
          correctAnswers: ['can'],
          explanation: 'Субституція допоміжним дієсловом can, що повторює структуру попереднього речення.',
        },
        {
          id: 'eas-4',
          type: 'fill-blank',
          prompt: 'A: Will they come to the party? B: I hope ___.',
          correctAnswers: ['not'],
          explanation: 'Not замінює цілу заперечну пропозицію ("they won\'t come").',
        },
        {
          id: 'eas-5',
          type: 'multiple-choice',
          prompt: 'Which sentence demonstrates ellipsis (omission of repeated words)?',
          options: [
            "She wanted to dance, and he wanted to dance too.",
            "She wanted to dance, and he did too.",
            "She wanted to dance, and he wanted to.",
            "She wanted to dance, and so did he.",
          ],
          correctIndex: 2,
          explanation: 'Дієслово dance опущене після to — класичний приклад еліпсису.',
        },
      ],
    },
    {
      id: 'there-is-there-are',
      title: 'There is / There are',
      theory:
        'Конструкція there is/are вводить нову інформацію про існування чогось — уперше повідомляє слухачеві, що щось є ("There is a café around the corner"). Дієслово узгоджується з іменником, що йде після нього: there is/was для однини й незлічуваних, there are/were для множини. Конструкція працює в будь-якому часі: there has been, there will be, there used to be. Важливо не плутати з it is, яке натомість посилається на щось уже відоме зі контексту ("There is a book on the table" уводить книгу вперше; "It is on the table" вказує, де перебуває вже згадана книга).',
      examples: [
        { target: "There is a new restaurant on Main Street.", uk: 'На Мейн-стріт є новий ресторан (нова інформація, that/it непридатне тут).' },
        { target: "There used to be a cinema here.", uk: 'Тут раніше було кіно (there used to be — минуле, що зникло).' },
        { target: "There will be a meeting at 5 p.m.", uk: 'О 17:00 буде зустріч (майбутнє існування).' },
      ],
      exercises: [
        {
          id: 'tit-1',
          type: 'multiple-choice',
          prompt: '___ a lot of people at the concert last night.',
          options: ['There was', 'There were', 'It was', 'They were'],
          correctIndex: 1,
          explanation: '"A lot of people" — множина, тому there were.',
        },
        {
          id: 'tit-2',
          type: 'multiple-choice',
          prompt: '___ some milk left in the fridge.',
          options: ['There are', 'There is', 'It is', 'They are'],
          correctIndex: 1,
          explanation: 'Milk — незлічуваний іменник, тому there is.',
        },
        {
          id: 'tit-3',
          type: 'fill-blank',
          prompt: '___ (there / be) a big storm tomorrow, according to the forecast.',
          correctAnswers: ['There will be'],
          explanation: 'There + will be для існування чогось у майбутньому.',
        },
        {
          id: 'tit-4',
          type: 'fill-blank',
          prompt: '___ (there / be) a castle here in the Middle Ages, but it no longer exists.',
          correctAnswers: ['There used to be'],
          explanation: 'There used to be — щось існувало в минулому, а тепер ні.',
        },
        {
          id: 'tit-5',
          type: 'multiple-choice',
          prompt: 'Which sentence correctly introduces new information (rather than referring back to something known)?',
          options: [
            'It is a nice park near my house.',
            'There is a nice park near my house.',
            'It was on the table.',
            'It has been raining all day.',
          ],
          correctIndex: 1,
          explanation: 'There is вводить існування парку вперше; it is натомість посилалось би на щось уже відоме.',
        },
      ],
    },
  ],
}
