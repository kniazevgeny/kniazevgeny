export const messages = {
  ru: {
    title: 'Евгений Князев',
    notFound: 'Страница не найдена',
    home: {
      openSource: 'open source',
      showMore: 'Показать ещё',
      myStoryTitle: 'Обо мне',
      myProjectsTitle: 'Мои проекты',
      thank: 'Спасибо, что долистали!',
      myStory: [
        'Привет! Меня зовут Женя и мне интересно делать продукты. Отчасти я программист, отчасти аналитик. Учусь на первом курсе экономического факультета <img style="height: 17px; margin-bottom: -2px" src="' + require("@/assets/polytech.svg") + '"/> Политеха им. Петра (бизнес-информатика)',
        'Мой любимый стек: Vue + Vuetify + Typescript + Python/Node. Для задач машинного обучения использую TensorFlow и PyTorch. Пишу также на C++, C#, знаком с bash.',
        'У меня бэкграунд программиста: в школе я участвовал в олимпиадах по программированию и посещал соответствующие кружки. Тогда же увлекся и разработкой сайтов. Свою первую страничку с архивом фотографий я написал в 2016 году (тогда я впервые связал js с html/css). Спустя несколько лет, попал на образовательную программу, где научился ботов в телеграме и писать веб-приложения на vue.js+vuetify. С тех пор к этому стэку прибавились Vuex и другие библиотеки для более сложных приложений. В 2020 со знакомыми мы создали <a class="grad-accent" href="#keyzu">криптовалютный кошелек</a> — первая крупная работа не для личного использования, а для других людей. Оказалось, мои навыки могут помочь в упрощении использования сервисов и продуктов. К концу обучения в школе я заинтересовался машинным обучением и похал в летнюю школу GoTo, после чего выиграл хакатон труда 2 (он про ML и обработку данных).',
        'Параллельно с развитием навыков программирования и верстки, я удовлетворял свое любопытство и в других областях: кружок типографии, где я познакомился с понятием кернинг, Мастерская Исаева, где я сделал свой первый ролик с незнакомыми людьми в кадре, опыт создания которого позволил 3 месяца спустя занять 2-е место на <a class="grad-accent" href="#miserables">конкурсе по созданию трейлеров к французским книгам</a> (приз — стажировка должна была пройти в Париже в апреле 2020).',
        'На бэкграунд программиста мне интересно наложить другие слои создания продуктов: поведение пользователей, экономику и системный подход к продуктовой разработке. Это отражается в участии в <a class="grad-accent" href="#mckinsey">продуктовых кейс-чемпионатах</a> и тех <a class="grad-accent" href="#echarge">MVP </a>, что я создаю для своих знакомых — каждый из них это проект по изучению потребностей пользователей, контекста использования сервисов, их "работ" по JTBD.',
        '',
      ]
    },
    projects: [
      {
        title: 'ECharge',
        type: 'MVP',
        id: 'echarge',
        link: 'https://echargeenergy.com/',
        slides: [
          require('../assets/echarge-1-m.webp'),
          require('../assets/echarge-2-m.webp'),
          require('../assets/echarge-3-m.webp'),
        ],
        lazySlides: [
          require('../assets/echarge-1-l.webp'),
          require('../assets/echarge-2-l.webp'),
          require('../assets/echarge-3-l.webp'),
        ],
        paragraphs: [
          'MVP на тильде и на vue.js для проекта ECharge: зарядные станции для электромобилей.',
        ]
      },
      {
        title: 'Стратегия развития банка для самозанятых',
        type: 'Кейс',
        id: 'mckinsey',
        link: null,
        slides: [
          require('../assets/mckinsey-1-m.webp'),
          require('../assets/mckinsey-2-m.webp'),
          require('../assets/mckinsey-3-m.webp'),
          require('../assets/mckinsey-4-m.webp'),
        ],
        lazySlides: [
          require('../assets/mckinsey-1-l.webp'),
          require('../assets/mckinsey-2-l.webp'),
          require('../assets/mckinsey-3-l.webp'),
          require('../assets/mckinsey-4-l.webp'),
        ],
        paragraphs: [
          'Презентация и финмодель для полуфинала кейс-чемпионата McKinsey & HSE Case Club. В команде из трех аналитиков проработали анализ рынка самозанятых арендодателей, сегментировали рынок, проработали инициативы и предложили стратегию развития на 5 лет.',
          'В ходе анализа изучили документы в источниках от ЦБ РФ до бумаг с IPO Cian на sec.gov, поговорили с продактом из Райфа, замоделировали рост пользовательской базы (через когорты), посчитали WACC и NPV',
          ''
        ]
      },
      {
        title: 'Бронирование парковки',
        type: 'MVP',
        link: 'https://honestspeculators.github.io/',
        slides: [
          require('../assets/honestspeculators-1-m.webp'),
          require('../assets/honestspeculators-2-m.webp'),
          require('../assets/honestspeculators-3-m.webp'),
        ],
        lazySlides: [
          require('../assets/honestspeculators-1-l.webp'),
          require('../assets/honestspeculators-2-l.webp'),
          require('../assets/honestspeculators-3-l.webp'),
        ],
        paragraphs: [
          'MVP для проекта "Бронирование парковок". MVP состоит из карты (GMaps), на которой можно выбрать ближайшее место парковки и дальнейших шагов по бронированию.',
          'Задача: продемонстрировать, как может быть реализована идея по переоборудованию старых зданий под автоматические парковки, а именно, как она будет выглядеть с точки зрения пользователя.'
        ]
      },
      {
        title: 'Роль сообществ в цифровой экономике',
        type: 'Аналитический обзор',
        link: 'https://habr.com/ru/post/598567/',
        slides: [
          require('../assets/cybereconomy-1-m.webp'),
          require('../assets/cybereconomy-2-m.webp'),
          require('../assets/cybereconomy-3-m.webp'),
        ],
        lazySlides: [
          require('../assets/cybereconomy-1-l.webp'),
          require('../assets/cybereconomy-2-l.webp'),
          require('../assets/cybereconomy-3-l.webp'),
        ],
        paragraphs: [
          'Этот аналитический обзор — компиляция работы лаборатории "Экономика цифровых сообществ" на "Архипелаге 2121", проходившего в 2021 году в Великом Новгороде. Наша лаборатория исследовала феномены цифровых сообществ и цифровой экономики.',
          'Сперва рассмотрели тексты Майка Монтейро, Пола Грэма, Дэвида Гребера, Джеймса Уильямса, Ваннкартеша Рао, Роберта Солоу и других, чтобы определить основные точки зрения на цифровую экономику. В результате удалось выделить позиции с помощью категорий Оптимизм-Скептицизм и Личная Выгода-Общественное развитие',
          'Затем // TODO'
        ]
      },
      {
        title: 'The Matrix: ЕГЭ',
        type: 'Видео',
        link: 'https://vk.com/video250210451_456239517',
        hasDemo: true,
        embedURL: 'https://vk.com/video_ext.php?oid=250210451&id=456239517&hash=96cdf72be8c36f77&hd=2&autoplay=1&',
        slides: [
          require('../assets/matrix-1-m.webp'),
          require('../assets/matrix-2-m.webp'),
          require('../assets/matrix-3-m.webp'),
          require('../assets/matrix-4-m.webp'),
          require('../assets/matrix-5-m.webp'),
          require('../assets/matrix-6-m.webp'),
        ],
        lazySlides: [
          require('../assets/matrix-1-l.webp'),
          require('../assets/matrix-2-l.webp'),
          require('../assets/matrix-3-l.webp'),
          require('../assets/matrix-4-l.webp'),
          require('../assets/matrix-5-l.webp'),
          require('../assets/matrix-6-l.webp'),
        ],
        paragraphs: [
          '',
        ]
      },
      {
        title: 'Сравнение уровня развития ВИЭ в РФ и Канаде',
        type: 'Исследование',
        link: 'https://kniazevgeny.github.io/russierenouvelables/',
        slides: [
          require('../assets/russierenouvelables-1-m.webp'),
          require('../assets/russierenouvelables-2-m.webp'),
          require('../assets/russierenouvelables-3-m.webp'),
        ],
        lazySlides: [
          require('../assets/russierenouvelables-1-l.webp'),
          require('../assets/russierenouvelables-2-l.webp'),
          require('../assets/russierenouvelables-3-l.webp'),
        ],
        paragraphs: [
          'Исследовал одну из ЦУР (целей устойчивого развития) в рамках прокета двуязычного отделения в старших классах. ',
        ]
      },
      {
        title: 'Криптовалютный кошелек keyzu.ru',
        type: 'MVP',
        id: 'keyzu',
        link: null,
        hasDemo: true,
        embedURL: 'https://www.youtube.com/embed/2FANMskvytA?autoplay=1&',
        slides: [
          require('../assets/keyzu-1-m.webp'),
          require('../assets/keyzu-2-m.webp'),
          require('../assets/keyzu-3-m.webp'),
          require('../assets/keyzu-4-m.webp'),
        ],
        lazySlides: [
          require('../assets/keyzu-1-l.webp'),
          require('../assets/keyzu-2-l.webp'),
          require('../assets/keyzu-3-l.webp'),
          require('../assets/keyzu-4-l.webp'),
        ],
        paragraphs: [
          '',
        ]
      },
    ]
  },
  en: {
    title: 'Evgeny Kniazev',
    notFound: 'Page not found',
    home: {
      showMore: 'Show more',
      myStoryTitle: 'My Story',
      myProjectsTitle: 'My Projects',
      openSource: 'open source',
      thank: 'Thanks for scrolling!',
    }
  },
}
