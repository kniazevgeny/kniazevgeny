export const messages = {
  ru: {
    title: 'Евгений Князев',
    notFound: 'Страница не найдена',
    home: {
      privacy: 'bb',
      showMore: 'Показать ещё'
    },
    projects: [
      {
        title: 'ECharge',
        type: 'MVP',
        slides: [
          // TODO: if mobile, show 600-700px width img 
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
          'Презентация и финмодель для полуфинала кейс-чемпионата McKinsey & HSE Case Club. В команде из трех аналитиков и дизайнера проработали анализ рынка самозанятых арендодателей, сегментировали рынок, проработали инициативы и предложили стратегию развития на 5 лет.',
          'В ходе анализа изучили документы в источниках от ЦБ РФ до бумаг с IPO Cian на sec.gov, поговорили с продактом из Райфа, замоделировали рост пользовательской базы (через когорты), посчитали WACC и NPV',
          ''
        ]
      },
      {
        title: 'Бронирование парковки',
        type: 'MVP',
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
          'Затем '
        ]
      },
      {
        title: 'The Matrix: ЕГЭ',
        type: 'Видео',
        hasDemo: true,
        embedURL: 'https://vk.com/video_ext.php?oid=250210451&id=456239517&hash=96cdf72be8c36f77&hd=2&autoplay=1&',
        slides: [''],
        lazySlides: [],
        paragraphs: [
          '',
        ]
      },
      {
        title: 'Сравнение уровня развития ВИЭ в РФ и Канаде',
        type: 'Исследование',
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
      showMore: 'Show more'
    }
  },
}
