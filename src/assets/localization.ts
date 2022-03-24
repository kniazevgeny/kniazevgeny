export const messages = {
  ru: {
    title: 'Евгений Князев',
    notFound: 'Страница не найдена',
    home: {
      privacy: 'bb'
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
        ]
      },
      {
        title: 'The Matrix: ЕГЭ',
        type: 'Видео',
        slides: [''],
        lazySlides: []
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
        ]
      },
    ]
  },
  en: {
    title: 'Evgeny Kniazev',
    notFound: 'Page not found',
  },
}
