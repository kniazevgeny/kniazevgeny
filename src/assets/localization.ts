export const messages = {
  ru: {
    title: 'Евгений Князев',
    notFound: 'Страница не найдена',
    home: {
      openSource: 'open source',
      showMore: 'Показать ещё',
      myStoryTitle: 'Обо мне',
      myProjectsTitle: 'Мои проекты',
      thank: 'Спасибо, что дочитали до конца!',
      myStory: [
        'Привет! Меня зовут Женя и мне интересно делать продукты. Отчасти я программист, отчасти аналитик. Учусь на втором курсе в <img style="height: 17px; margin-bottom: -2px" src="' +
          require('@/assets/ULille-nb.svg') +
          '"/>университете Лилля. Перепоступил сюда после двух лет обучения на экономическом факультете <img style="height: 17px; margin-bottom: -2px" src="' +
          require('@/assets/polytech.svg') +
          '"/> Политеха им. Петра (бизнес-информатика)',
        'Занимаюсь разработкой веб-сервисов и MVP. Люблю находить простые решения для сложных задач, создавая удобные и масштабируемые продукты. Мне важно, чтобы технологии работали на пользователя, а не наоборот. Когда нет ясного представления о конечном результате или нужно проверить гипотезы, провожу JTBD-исследования. С количественными исследованиями тоже <a class="grad-accent" href="#bspb">знаком</a>, хотя использую их реже.',
        'Мой любимый стек: React + getjustd (react-aria) + Tailwind + Typescript + Python/Node. Также знаком с MongoDB, Koa, Rollup',
        'У меня бэкграунд программиста: в школе участвовал в олимпиадах по программированию и посещал соответствующие кружки. Тогда же увлекся и разработкой сайтов. Первую страничку с архивом фотографий написал в 2016 году (тогда я впервые связал js с html/css). Спустя несколько лет, попал на образовательную программу, где научился писать ботов в телеграме и делать веб-приложения на vue.js+vuetify. С тех пор к этому стэку прибавились Vuex и другие библиотеки для более сложных приложений. В 2020 со знакомыми создали <a class="grad-accent" href="#keyzu">криптовалютный кошелек</a> — первая крупная работа не для личного использования, а для других людей. Оказалось, мои навыки могут помочь в упрощении использования сервисов и продуктов. К концу обучения в школе заинтересовался машинным обучением и похал в летнюю школу GoTo, после чего выиграл хакатон труда 2 (он про ML и обработку данных).',
        'Параллельно с развитием навыков программирования и верстки, я удовлетворял свое любопытство и в других областях: кружок типографии, где я познакомился с понятием кернинг, Мастерская Исаева, где я сделал свой первый ролик с незнакомыми людьми в кадре, опыт создания которого позволил 3 месяца спустя занять 2-е место на <a class="grad-accent" href="#miserables">конкурсе по созданию трейлеров к французским книгам</a> (приз — стажировка должна была пройти в Париже в апреле 2020).',
        'На этот бэкграунд мне интересно наложить другие слои создания продуктов: поведение пользователей, экономику и системный подход к продуктовой разработке. Это отражается в участии в <a class="grad-accent" href="#mckinsey">продуктовых кейс-чемпионатах</a> и тех <a class="grad-accent" href="#echarge">MVP </a>, что я создаю для своих знакомых — каждый из них это проект по изучению потребностей пользователей, контекста использования сервисов, их "работ" по JTBD.',
        '',
      ],
    },
    projects: [
      {
        year: 2025,
        projects: [
          {
            title: 'Munk',
            type: 'Web service',
            id: 'munk',
            link: 'https://munk.ru/',
            slides: [require('../assets/munk-1-m.webp')],
            lazySlides: [require('../assets/munk-1-l.webp')],
            paragraphs: [
              'Фанаты отправляют донаты, а авторы отвечают видео/аудио сообщениями',
              'Реализовал запись видео в браузере с использованием MediaRecorder API; использовал Plyr для плеера, кастомные React хуки для записи контента',
            ],
          },
          {
            title: 'PeerHub',
            type: 'Telegram Mini-App',
            id: 'peerhub',
            link: 'https://t.me/peerhub_bot',
            slides: [require('../assets/peerhub-1-m.png')],
            lazySlides: [require('../assets/thepakt-1-l.png')],
            paragraphs: [
              'Социальная сеть с фокусом на решение бизнесовых задач. Никаких "чему Clash of Clans меня научил о продажах B2B SaaS". Просто место для публикации запросов сообществу и связи с другими профессионалами',
              'В ходе разработки я освоил экосистему React, включая react-aria и getjustd. Для получения данных и управления состоянием использовался Tanstack query.',
            ],
          },
        ],
      },
      {
        year: 2024,
        projects: [
          {
            title: '/wip/ Протокол для хранения соглашений на TON',
            summary: '1-е место на парижском буткемпе TON Hackathon [2024]',
            type: 'Web Service',
            id: 'thepakt',
            link: 'https://thepakt.com/',
            slides: [require('../assets/thepakt-1-m.png')],
            lazySlides: [require('../assets/thepakt-1-l.png')],
            paragraphs: [
              'Протокол для хранения соглашений на TON',
              'Проект находится в процессе разработки. С открытым исходным кодом.',
            ],
          },
          {
            title: 'Soulbody.io',
            type: 'Web Service',
            id: 'soulbody',
            link: 'https://soulbody.io/',
            slides: [
              require('../assets/soulbody-1-m.webp'),
              require('../assets/soulbody-2-m.webp'),
              require('../assets/soulbody-3-m.webp'),
              require('../assets/soulbody-4-m.webp'),
              require('../assets/soulbody-5-m.webp'),
            ],
            lazySlides: [
              require('../assets/soulbody-1-l.webp'),
              require('../assets/soulbody-2-l.webp'),
              require('../assets/soulbody-3-l.webp'),
              require('../assets/soulbody-4-l.webp'),
              require('../assets/soulbody-5-l.webp'),
            ],
            paragraphs: [
              'Soulbody — это платформа с видео и аудио практиками для ментального здоровья',
              'Создал и реализовал ключевые пользовательские сценарии на основе дизайнов Figma, включая вход пользователей, просмотр каталога (без подписки), предпросмотр практик, путь подписчика и оформление заказа с промокодами.',
              'Разработал гибкую административную CMS, которая позволяет создавать и управлять практиками, интегрированную с Kinescope (аналог Vimeo), а также инструменты для управления промокодами.',
              'Внедрил сервис-воркер для включения веб-push уведомлений, помогающих пользователям поддерживать регулярность, напоминая им о сериях практик.',
              'Интегрировал видеоплеер Kinescope, обеспечивая плавные переходы видео и позволяя не подписчикам просматривать 30 секунд каждого видео, улучшая общий пользовательский опыт.',
            ],
          },
        ],
      },
      {
        year: 2023,
        projects: [
          {
            title: 'Самолёт+ Аренда',
            type: 'Web Service',
            id: 'smlt',
            link: 'https://arenda.samoletplus.ru/',
            slides: [
              require('../assets/smltplus-1-m.webp'),
              require('../assets/smltplus-2-m.webp'),
              require('../assets/smltplus-3-m.webp'),
              require('../assets/smltplus-4-m.webp'),
            ],
            lazySlides: [
              require('../assets/smltplus-1-l.webp'),
              require('../assets/smltplus-2-l.webp'),
              require('../assets/smltplus-3-l.webp'),
              require('../assets/smltplus-4-l.webp'),
            ],
            paragraphs: [
              'Сервис для аренды жилья.',
              'Работал над frontend частью сервиса: это и витрина для арендаторов, и ЛК для собственников, агентов, руководителей офисов',
              'На слайдах представлена витрина. По сути это несколько страниц с поиском, есть вид списком и на карте. Также страницы самого объекта, и дальнейшего флоу продвижения по аренде: от подписания документов и сверки состояния имущества и оплаты до управления арендой с, например, возможностью сообщить о страховом случае',
            ],
          },
          {
            title: 'Исследование банковских продуктов (кейс БСПб)',
            type: 'JTBD research',
            id: 'bspb',
            link: 'https://www.youtube.com/watch?v=SXk6whUHOFM',
            embedURL:
              'https://www.youtube-nocookie.com/embed/SXk6whUHOFM?autoplay=1&',
            hasDemo: true,
            slides: [
              require('../assets/bspb-1-m.webp'),
              require('../assets/bspb-2-m.webp'),
            ],
            lazySlides: [
              require('../assets/bspb-1-l.webp'),
              require('../assets/bspb-2-l.webp'),
            ],
            paragraphs: [
              'Маркетинговое jtbd-исследование. Изучили, какие задачи самые частые, а какие самые важные.',
              'Провели серию глубинных интервью и опросили 153 студента из Питера. На основе этих данных разработали концепцию продукта.',
            ],
          },
        ],
      },
      {
        year: 2022,
        projects: [
          {
            title: 'Ivankov Lab, сервис ProDDG',
            type: 'MVP ➡️ Web Service',
            id: 'ivankovlab',
            link: 'https://ivankovlab.ru/',
            slides: [
              require('../assets/ivankovlab-1-m.webp'),
              require('../assets/ivankovlab-2-m.webp'),
              require('../assets/ivankovlab-3-m.webp'),
              require('../assets/ivankovlab-4-m.webp'),
            ],
            lazySlides: [
              require('../assets/ivankovlab-1-l.webp'),
              require('../assets/ivankovlab-2-l.webp'),
              require('../assets/ivankovlab-3-l.webp'),
              require('../assets/ivankovlab-4-l.webp'),
            ],
            paragraphs: [
              'Сервис для анализа данных стабилизирующих мутаций. Я отвечал за техническую часть, а моя коллега аспирантка из Сколтеха была экспертом рынка, так как сама регулярно сталкивалась с подобными задачами.',
              'Задача: продумать и разработать сервис, опираясь на идею и первые наработки решения. Для начала были проведены несколько пользовательских jtbd интервтью для поиска продукта, так как сегмент уже был понятен: участники лаборатории уже неоднократно сталкивались с проблемой и принимали какие-то шаги для её решения. Как правило, люди нанимали себя на решение задачи и тратили на это примерно два рабочих дня.',
              'Исходя из результатов интервью был разработан документ по структурой working backwards - продуктового процесса Амазона, в котором всё начинается с избыточного описания того, что мы делаем и для кого, а также описываем работы по jtbd.',
              'Далее шли UX-тесты макетов интерфейсов и разработка сервиса. Стек: vue, vuetify на фронтенде, koa (typescript) и mongodb на бэкенде.',
              'В ходе проекта пришлось глубоко погрузиться в проблемы и задачи академического сообщества, что было достаточно интересно.',
            ],
          },
          // {
          //   title: 'ECharge',
          //   type: 'MVP',
          //   id: 'echarge',
          //   link: 'https://echargeenergy.com/',
          //   slides: [
          //     require('../assets/echarge-1-m.webp'),
          //     require('../assets/echarge-2-m.webp'),
          //     require('../assets/echarge-3-m.webp'),
          //     require('../assets/echarge-4-m.webp'),
          //   ],
          //   lazySlides: [
          //     require('../assets/echarge-1-l.webp'),
          //     require('../assets/echarge-2-l.webp'),
          //     require('../assets/echarge-3-l.webp'),
          //     require('../assets/echarge-4-l.webp'),
          //   ],
          //   paragraphs: [
          //     'MVP на тильде и на vue.js для проекта ECharge: зарядные станции для электромобилей в Северной Америке. Проект основан на технологии использования энергии проезжающих на шоссе автомобилей для зарядки электрокаров.',
          //     'Задача: перевести всё с технического описания проекта на язык потребителя; рассказать о том, кому может быть полезен проект ECharge, о технологии и сделать прототип страницы, на которой люди активируют зарядную станцию и следят за прогрессом зарядки (дашборд).',
          //     'В ходе проекта удалось познакомиться с созданием сайтов-визиток на тильде. Оказалось, всё становится очень нагроможденно, как только хочешь выйти за рамки дефолтного функционала, кастомизация оставляет желать лучшего. Так, эмуляция процесса загрузки выполнена на vue.js, 3D модель подгружается со sketchfab, а файлы с расчётами и моделями подгружаются с гугл диска.',
          //     'Более того, страница грузится черезчур долго, так как тильда использует устаревший jQuery. Возможно, удобство внутренней CRM и подключения форм перекрывает часть недостатков, но не в моём случае. Вероятно, дальше буду двигаться в сторону vue 3 и react.',
          //   ],
          // },
          {
            title: 'Стратегия развития банка для самозанятых',
            type: 'Кейс',
            id: 'mckinsey',
            link:
              'https://drive.google.com/drive/folders/18MBcrZjhHeYNf-u0qsv-5qplzX2CCWh0?usp=sharing',
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
              'В ходе анализа изучили документы в источниках от ЦБ РФ до бумаг с IPO Cian на sec.gov, поговорили с руководителем направления кредитования из Райфа, замоделировали рост пользовательской базы (через когорты), посчитали WACC и NPV',
              '',
            ],
          },
        ],
      },
      {
        year: 2021,
        projects: [
          // {
          //   title: 'Бронирование парковки',
          //   summary:
          //     '297+ посещений. Прототип помог команде "Честные спекулянты" занять 4 место на всероссийском кейс-чемпионате от ВШЭ (для 10-11 классов)',
          //   type: 'MVP',
          //   link: 'https://honestspeculators.github.io/',
          //   slides: [
          //     require('../assets/honestspeculators-1-m.webp'),
          //     require('../assets/honestspeculators-2-m.webp'),
          //     require('../assets/honestspeculators-3-m.webp'),
          //   ],
          //   lazySlides: [
          //     require('../assets/honestspeculators-1-l.webp'),
          //     require('../assets/honestspeculators-2-l.webp'),
          //     require('../assets/honestspeculators-3-l.webp'),
          //   ],
          //   paragraphs: [
          //     'MVP для проекта "Бронирование парковок". MVP состоит из карты, на которой можно выбрать ближайшее место парковки и дальнейших шагов по бронированию.',
          //     'Задача: продемонстрировать, как может быть реализована идея по переоборудованию старых зданий под автоматические парковки, а именно, как она будет выглядеть с точки зрения пользователя.',
          //   ],
          // },
          {
            title: 'Роль сообществ в цифровой экономике',
            summary: '1200+ просмотров',
            type: 'Аналитический обзор',
            link: 'https://habr.com/ru/post/598567/',
            slides: [require('../assets/cybereconomy-1-m.webp')],
            lazySlides: [require('../assets/cybereconomy-1-l.webp')],
            paragraphs: [
              'Этот аналитический обзор — компиляция работы лаборатории "Экономика цифровых сообществ" на "Архипелаге 2121", проходившего в 2021 году в Великом Новгороде. Наша лаборатория исследовала феномены цифровых сообществ и цифровой экономики.',
              'Сперва рассмотрели тексты Майка Монтейро, Пола Грэма, Дэвида Гребера, Джеймса Уильямса, Ваннкартеша Рао, Роберта Солоу и других, чтобы определить основные точки зрения на цифровую экономику. В результате удалось выделить позиции с помощью категорий Оптимизм-Скептицизм и Личная Выгода-Общественное развитие',
              'Затем перешли к анализу феномена цифровых сообществ. Нас заинтересовало, как можно связать размер сообщества (степень влияния) с видом деятельности. В этом помогли категории Процесс-Продукт. Оказалось, что чем глобальнее сообщество, тем более вероятно, что оно имеет целью деятельности создание продукта. Сюда относятся Википедия, moz://a, python. Более локальные известные сообщества скорее про процесс: сообщества выпускников — хороший пример.',
              'После публикации обзора на сайте альманаха практик будущего и на хабре, закрепили понимание устройства сообществ разбором значимых работ Виктора Слободчикова и Дэвида Макмиллана с Дэвидом Чевисом',
            ],
          },
          // {
          //   title: 'The Matrix: ЕГЭ',
          //   summary: '609+ просмотров',
          //   type: 'Видео',
          //   link: 'https://vk.com/video250210451_456239517',
          //   hasDemo: true,
          //   embedURL:
          //     'https://vk.com/video_ext.php?oid=250210451&id=456239517&hash=96cdf72be8c36f77&hd=2&autoplay=1&',
          //   slides: [
          //     require('../assets/matrix-1-m.webp'),
          //     require('../assets/matrix-2-m.webp'),
          //     require('../assets/matrix-3-m.webp'),
          //     require('../assets/matrix-4-m.webp'),
          //     require('../assets/matrix-5-m.webp'),
          //     require('../assets/matrix-6-m.webp'),
          //   ],
          //   lazySlides: [
          //     require('../assets/matrix-1-l.webp'),
          //     require('../assets/matrix-2-l.webp'),
          //     require('../assets/matrix-3-l.webp'),
          //     require('../assets/matrix-4-l.webp'),
          //     require('../assets/matrix-5-l.webp'),
          //     require('../assets/matrix-6-l.webp'),
          //   ],
          //   paragraphs: [
          //     'Фильм, в котором школьник автоматически решает ЕГЭ по информатике и затем уничтожает EGE-Machine',
          //     'Приурочили работу к окончанию школы. Показали на "последнем звонке", но видео получилось скорее для одноклассников, чем для учителей. Достаточно много динамики для показа на школьном проекторе.',
          //     'Самый запоминающийся момент съемок происходил на остатках заброшенного завода "Красный Треугольник". Чтобы повторить знаменитую сцену уклонения от пуль, взяли отцовскую альпинистскую страховку и пошли искать подходящее место для закрепления. Результатом остались довольны.)',
          //   ],
          // },
          {
            title: 'Сравнение уровня развития ВИЭ в РФ и Канаде',
            type: 'Исследование',
            link: 'https://kniazevgeny.github.io/russierenouvelables/',
            slides: [require('../assets/russierenouvelables-1-m.webp')],
            lazySlides: [require('../assets/russierenouvelables-1-l.webp')],
            paragraphs: [
              'Исследовал одну из ЦУР (целей устойчивого развития) в рамках проекта двуязычного отделения в старших классах. Этот проект следовало сдать на французском, когда большая часть материалов на английском, а редактировать я умею преимущественно на русском. Так я познакомился с переводчиком Deepl',
              'Проект оформил в виде лонгрида со схемками и настоящей инфографикой (не просто циферки в кружочках). Внутри: обзор потенциала развития каждой из 5 самых популярных ВИЭ, а также затронул рентабельность изменений status-quo.',
            ],
          },
        ],
      },
      {
        year: 2020,
        projects: [
          // {
          //   title: 'Криптовалютный кошелек keyzu.ru',
          //   type: 'MVP',
          //   id: 'keyzu',
          //   link: null,
          //   hasDemo: true,
          //   embedURL:
          //     'https://www.youtube-nocookie.com/embed/2FANMskvytA?autoplay=1&',
          //   slides: [
          //     require('../assets/keyzu-1-m.webp'),
          //     require('../assets/keyzu-2-m.webp'),
          //     require('../assets/keyzu-3-m.webp'),
          //     require('../assets/keyzu-4-m.webp'),
          //   ],
          //   lazySlides: [
          //     require('../assets/keyzu-1-l.webp'),
          //     require('../assets/keyzu-2-l.webp'),
          //     require('../assets/keyzu-3-l.webp'),
          //     require('../assets/keyzu-4-l.webp'),
          //   ],
          //   paragraphs: [
          //     'Небольшой проект, который вырос в полноценный криптовалютный кошелек. Создавался, как простой продукт для людей, не разбирающихся в крипте. Но никто из создателей не разбирался в маркетинге.',
          //   ],
          // },
          {
            title: 'Мониторинг нарушений прав человека в тюрьмах "Знай край"',
            summary:
              '881 учреждение на карте, показано более 377 нарушений. 2-е место на хакатоне "Прожектор 2020"',
            type: 'MVP ➡️ Сервис',
            id: 'znaikrai',
            link: 'https://znai-krai.zekovnet.ru',
            hasDemo: false,
            slides: [
              require('../assets/znaikrai-1-.webp'),
              require('../assets/znaikrai-2-.webp'),
              require('../assets/znaikrai-3-m.webp'),
              require('../assets/znaikrai-4-m.webp'),
            ],
            lazySlides: [
              require('../assets/znaikrai-1-l.webp'),
              require('../assets/znaikrai-2-l.webp'),
              require('../assets/znaikrai-3-l.webp'),
              require('../assets/znaikrai-4-l.webp'),
            ],
            paragraphs: [
              'Сервис наглядно показывает, где сколько нарушений совершалось, какого они были характера и предоставляет возможность сообщить о нарушениях.',
              'В феврале 2020 я участвовал в хакатоне "Прожектор 2020", организованный "Теплицей социальных технологий" и "Новой Газетой". На месте познакомился с частью команды — идейными вдохновителями. На хакатоне проект занял второе место, после чего команда разработчиков, включая меня, ушла дорабатывать проект.',
              '',
            ],
          },
        ],
      },
      {
        year: 2019,
        projects: [
          {
            title: 'Трейлер к роману "Отверженные" В. Гюго',
            summary: '2138+ просмотров',
            type: 'Видео',
            id: 'miserables',
            link: 'https://vk.com/video250210451_456239461',
            hasDemo: true,
            embedURL:
              'https://vk.com/video_ext.php?oid=250210451&id=456239461&hash=6901386fc6c2f72f&hd=2&autoplay=1',
            slides: [
              require('../assets/miserables-1-m.webp'),
              require('../assets/miserables-2-m.webp'),
              require('../assets/miserables-3-m.webp'),
              require('../assets/miserables-4-m.webp'),
            ],
            lazySlides: [
              require('../assets/miserables-1-l.webp'),
              require('../assets/miserables-2-l.webp'),
              require('../assets/miserables-3-l.webp'),
              require('../assets/miserables-4-l.webp'),
            ],
            paragraphs: [''],
          },
        ],
      },
    ],
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
      myStory: [
        'Hi! My name is Evgeny and I\'m interested in building products. I\'m a half developer, half analyst. I\'m  in the 2nd year at the <img style="height: 17px; margin-bottom: -2px" src="' +
          require('@/assets/ULille-nb.svg') +
          '"/>University of Lille. I re-enrolled at this university after two years of studies on the economic faculty of <img style="height: 17px; margin-bottom: -2px" src="' +
          require('@/assets/polytech.svg') +
          '"/> Saint-Petersburg Peter the Great Polytechnical Unviersity (business-informatics)',
        'I develop web services and MVPs. Excel at turning complex challenges into scalable, responsive solutions. Passionate about creating meaningful products that blend technology and human insight. If there is no clear vision of the result or there is a need to validate hypotheses, I conduct qualitative JTBD research. I also <a class="grad-accent" href="#bspb">did</a> quantitative research, but I don\'t do it regularly.',
        'My favorite stack is: React + getjustd (react-aria) + Tailwind + Typescript + Python/Node. Also familiar with MongoDB, Koa, Rollup, bash.',
        'I have a programming background: at school I\'ve taken part in programming contests and attended programming circles. Then I was also interested in web site development. I wrote my first page with an archive of photos in 2016 (then I first linked js with html/css). A few years later, got into an educational program where I learned how to write bots in telegram and make web apps on vue.js+vuetify. Since then Vuex and other libraries have been added to that stack for more complex applications. In 2020 I created a <a class="grad-accent" href="#keyzu">cryptocurrency wallet</a> with friends — the first major work not for personal use, but for other people. It turned out that my skills could help simplify the use of services and products. By the end of the school I was interested in machine learning and went to the GoTo summer school, after which I won the Truda 2 hackathon (it was about ML and data processing).',
        'In parallel with the development of programming and layout skills I satisfied my curiosity in other areas: the typography workshop, where I learned the concept of kerning, Isaev workshop, where I made my first video with strangers in the frame, which experience has allowed 3 months later to take 2nd place in <a class="grad-accent" href="#miserables">the competition to create trailers for French books</a> (the prize - an internship was to be held in Paris in April 2020).',
        'On this background I am interested in layering other layers of product creation: user behavior, economics, and a systems approach to product development. This is reflected in my participation in <a class="grad-accent" href="#mckinsey">product case championships</a> and the <a class="grad-accent" href="#echarge">MVPs I create</a> for my acquaintances - each of them is a project to study user needs, the context of service use, their "jobs" on JTBD.',
        '',
      ],
    },
    projects: [
      {
        year: 2025,
        projects: [
          {
            title: 'Munk',
            type: 'Web service',
            id: 'munk',
            link: 'https://munk.ru/',
            slides: [require('../assets/munk-1-m.webp')],
            lazySlides: [require('../assets/munk-1-l.webp')],
            paragraphs: [
              'Fans send donations, and authors respond with video/audio messages',
              'Implemented video recording in the browser using the MediaRecorder API; used Plyr for the player, custom React hooks for recording content',
            ],
          },
          {
            title: 'PeerHub',
            type: 'Telegram Mini-App',
            id: 'peerhub',
            link: 'https://t.me/peerhub_bot',
            slides: [require('../assets/peerhub-1-m.png')],
            lazySlides: [require('../assets/thepakt-1-l.png')],
            paragraphs: [
              'Basically a business-oriented social network. No "what Clash of Clans taught me about B2B SaaS sales". Just a place to publish requests to the community, reach out to other professionals',
              'During the development I familiarized myself with the React ecosystem incuding react-aria and justgetd. Tanstack query was used for data fetching and state management. ',
            ],
          },
        ],
      },
      {
        year: 2024,
        projects: [
          {
            title: '/wip/ Protocol for Agreement Keeper on TON',
            summary: "1st place at the TON Hackathon's Paris bootcamp [2024]",
            type: 'Web Service',
            id: 'thepakt',
            link: 'https://thepakt.com/',
            slides: [require('../assets/thepakt-1-m.png')],
            lazySlides: [require('../assets/thepakt-1-l.png')],
            paragraphs: [
              'Protocol for Agreement Keeper on TON',
              'The project is in the process of development. Open source.',
            ],
          },
          {
            title: 'Soulbody.io',
            type: 'Web Service',
            id: 'soulbody',
            link: 'https://soulbody.io/',
            slides: [
              require('../assets/soulbody-1-m.webp'),
              require('../assets/soulbody-2-m.webp'),
              require('../assets/soulbody-3-m.webp'),
              require('../assets/soulbody-4-m.webp'),
              require('../assets/soulbody-5-m.webp'),
            ],
            lazySlides: [
              require('../assets/soulbody-1-l.webp'),
              require('../assets/soulbody-2-l.webp'),
              require('../assets/soulbody-3-l.webp'),
              require('../assets/soulbody-4-l.webp'),
              require('../assets/soulbody-5-l.webp'),
            ],
            paragraphs: [
              'Soulbody is a platform with video and audio practices for the mental health',
              'Built and implemented key user flows based on Figma designs, including user sign-in, catalog browsing (without subscription), practice previews, subscriber journey, and checkout with promo codes.',
              'Developed a flexible admin CMS that allows for the creation and management of practices, integrated with Kinescope (similar to Vimeo), as well as tools for promo code management.',
              'Introduced a service worker to enable web-push notifications, helping users stay consistent by reminding them of their practice streaks.',
              'Integrated Kinescope’s video player, ensuring seamless video transitions and allowing non-subscribers to preview 30 seconds of each video, enhancing the overall user experience.',
            ],
          },
        ],
      },
      {
        year: 2023,
        projects: [
          {
            title: 'Samolet+ rental',
            summary:
              'Long-term rentals by the Samolet+, largest apartment building developer in Russia',
            type: 'Web Service',
            id: 'smlt',
            link: 'https://arenda.samoletplus.ru/',
            slides: [
              require('../assets/smltplus-1-m.webp'),
              require('../assets/smltplus-2-m.webp'),
              require('../assets/smltplus-3-m.webp'),
              require('../assets/smltplus-4-m.webp'),
            ],
            lazySlides: [
              require('../assets/smltplus-1-l.webp'),
              require('../assets/smltplus-2-l.webp'),
              require('../assets/smltplus-3-l.webp'),
              require('../assets/smltplus-4-l.webp'),
            ],
            paragraphs: [
              "I was working on the frontend part of the service. It's both dashboards for tenants, and some apartment management tools for landlords, rental agents and office owners",
            ],
          },
          {
            title: 'Research of banking products (BSPB case)',
            type: 'JTBD research',
            id: 'bspb',
            link: 'https://www.youtube.com/watch?v=SXk6whUHOFM',
            embedURL:
              'https://www.youtube-nocookie.com/embed/SXk6whUHOFM?autoplay=1&',
            hasDemo: true,
            slides: [
              require('../assets/bspb-1-m.webp'),
              require('../assets/bspb-2-m.webp'),
            ],
            lazySlides: [
              require('../assets/bspb-1-l.webp'),
              require('../assets/bspb-2-l.webp'),
            ],
            paragraphs: [
              'Marketing jobs-to-be-done research. We studied which tasks are most common and which are most important.',
              'Conducted a series of deep interviews and surveyed 153 students from St. Petersburg. Based on these data, we developed a product concept.',
            ],
          },
        ],
      },
      {
        year: 2022,
        projects: [
          {
            title: 'Datasets project',
            type: 'MVP ➡️ Web Service',
            id: 'ivankovlab',
            link: 'https://ivankovlab.ru/',
            slides: [
              require('../assets/ivankovlab-1-m.webp'),
              require('../assets/ivankovlab-2-m.webp'),
              require('../assets/ivankovlab-3-m.webp'),
              require('../assets/ivankovlab-4-m.webp'),
            ],
            lazySlides: [
              require('../assets/ivankovlab-1-l.webp'),
              require('../assets/ivankovlab-2-l.webp'),
              require('../assets/ivankovlab-3-l.webp'),
              require('../assets/ivankovlab-4-l.webp'),
            ],
            paragraphs: [
              'A service for analyzing stabilizing mutation data. I was responsible for the technical part, and my colleague, a postgraduate student from Skoltech, was a market expert, since she herself regularly encountered similar problems.',
              'The task: to think through and develop the service, based on the idea and the first developments of the solution. To begin with, several user jtbd interviews were conducted to find the product, since the segment was already clear: the lab participants had already encountered the problem repeatedly and had taken some steps to solve it. As a rule, people hired themselves to solve the problem and spent about two working days on it.',
              "Based on the results of the interviews, a document was developed on the structure of Amazon's working backwards, in which everything starts with a redundant description of what we do and for whom, as well as describing the work on jtbd.",
              'Next came UX tests of interface layouts and service development. Stack: vue, vuetify on the frontend, koa (typescript) and mongodb on the backend.',
              'During the project I had to dive deep into the problems and challenges of the academic community, which was quite interesting.',
            ],
          },
          // {
          //   title: 'ECharge',
          //   type: 'MVP',
          //   id: 'echarge',
          //   link: 'https://echargeenergy.com/',
          //   slides: [
          //     require('../assets/echarge-1-m.webp'),
          //     require('../assets/echarge-2-m.webp'),
          //     require('../assets/echarge-3-m.webp'),
          //     require('../assets/echarge-4-m.webp'),
          //   ],
          //   lazySlides: [
          //     require('../assets/echarge-1-l.webp'),
          //     require('../assets/echarge-2-l.webp'),
          //     require('../assets/echarge-3-l.webp'),
          //     require('../assets/echarge-4-l.webp'),
          //   ],
          //   paragraphs: [
          //     'MVP on tilda.cc and on vue.js for the ECharge project: charging stations for electric cars in North America. The project is based on the technology of using the energy of passing cars on the highway to charge electric cars.',
          //     'The task: to translate everything from the technical description of the project into the language of the consumer; to talk about who can benefit from the ECharge project, about the technology and to make a prototype page where people activate the charging station and follow the charging progress (dashboard).',
          //     'In the course of the project, I was able to get acquainted with the creation of business websites on tilda. It turned out that everything becomes very cluttered as soon as you want to go beyond the default functionality, customization leaves much to be desired. So, the loading process is emulated in vue.js, the 3D model is loaded from sketchfab, and the calculation and model files are loaded from google drive.',
          //     "Moreover, the page takes too long to load because tilda uses outdated jQuery. Maybe the convenience of internal CRM and form connectivity overrides some of the disadvantages, but not in my case. I'll probably move on to vue 3 and react.",
          //   ],
          // },
          {
            title: 'Bank development strategy for self-employed landlords',
            type: 'Case',
            id: 'mckinsey',
            link:
              'https://drive.google.com/drive/folders/18MBcrZjhHeYNf-u0qsv-5qplzX2CCWh0?usp=sharing',
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
              'Presentation and financial model for the semifinals of the McKinsey & HSE Case Club case championship. The team of three analysts analyzed the market of self-employed landlords, segmented the market, worked through initiatives and proposed a 5-year development strategy.',
              'In the course of the analysis we studied documents in sources from the Central Bank of Russia to the Cian IPO papers on sec.gov, talked to the head of lending from Raif, modeled the growth of the user base (through cohorts), calculated WACC and NPV',
              '',
              // “Umbrella Corporation” is a team of 3: me and 2 HSE students (1st tier Russian university, #305 in QS University Rankings)
              // - Leaded team to the semifinal of McKinsey & HCC Case Championship and supported colleagues by managing pipeline, organising 1-on-1 calls
              // - Analysed russian banking sector for self-employed landlords
              // - Created excel P&L plan, unit-economics metrics and modelled user cohorts growth
              // - Developed product strategy for neobank to acquire perspective segments
            ],
          },
        ],
      },
      {
        year: 2021,
        projects: [
          // {
          //   title: 'Parking reservations',
          //   summary:
          //     '297+ views. The prototype helped the "Honest Speculators" team to take 4th place at the All-Russian Case Championship from the Higher School of Economics (for grades 10-11)',
          //   type: 'MVP',
          //   link: 'https://honestspeculators.github.io/',
          //   slides: [
          //     require('../assets/honestspeculators-1-m.webp'),
          //     require('../assets/honestspeculators-2-m.webp'),
          //     require('../assets/honestspeculators-3-m.webp'),
          //   ],
          //   lazySlides: [
          //     require('../assets/honestspeculators-1-l.webp'),
          //     require('../assets/honestspeculators-2-l.webp'),
          //     require('../assets/honestspeculators-3-l.webp'),
          //   ],
          //   paragraphs: [
          //     'The MVP consists of a map on which you can select the nearest parking space and further steps for booking',
          //     "The task: to demonstrate how the idea of retrofitting old buildings for automatic parking can be implemented, specifically how it would look from the user's point of view.",
          //   ],
          // },
          {
            title: 'The role of communities in the digital economy',
            summary: '1200+ views',
            type: 'Analytical review',
            link: 'https://habr.com/ru/post/598567/',
            slides: [require('../assets/cybereconomy-1-m.webp')],
            lazySlides: [require('../assets/cybereconomy-1-l.webp')],
            paragraphs: [
              'This analytical review is a compilation of the work of the Digital Communities Economy Lab at Archipelago 2121, held in Veliky Novgorod in 2021. Our lab explored the phenomena of digital communities and the digital economy.',
              'We first looked at texts by Mike Monteiro, Paul Graham, David Graeber, James Williams, Wannkartesh Rao, Robert Solow, and others to identify key perspectives on the digital economy. As a result, we were able to identify positions through the categories Optimism-Skepticism and Personal Benefit-Public Development.',
              'Then we moved on to an analysis of the phenomenon of digital communities. We were interested in how we could relate the size of the community (degree of influence) to the type of activity. The Process-Product categories helped in this. It turned out that the more global a community is, the more likely it is that it has the purpose of the activity to create a product. This includes Wikipedia, moz://a, python. The more local well-known communities are more about process: alumni communities are a good example.',
              'After publishing a review on the Almanac of Future Practices website and on hubra, we consolidated our understanding of community organizing by parsing the significant work of Victor Slobodchikov and David McMillan with David Chevis.',
            ],
          },
          // {
          //   title: 'The Matrix: EGE',
          //   summary: '609+ views',
          //   type: 'Video',
          //   link: 'https://vk.com/video250210451_456239517',
          //   hasDemo: true,
          //   embedURL:
          //     'https://vk.com/video_ext.php?oid=250210451&id=456239517&hash=96cdf72be8c36f77&hd=2&autoplay=1&',
          //   slides: [
          //     require('../assets/matrix-1-m.webp'),
          //     require('../assets/matrix-2-m.webp'),
          //     require('../assets/matrix-3-m.webp'),
          //     require('../assets/matrix-4-m.webp'),
          //     require('../assets/matrix-5-m.webp'),
          //     require('../assets/matrix-6-m.webp'),
          //   ],
          //   lazySlides: [
          //     require('../assets/matrix-1-l.webp'),
          //     require('../assets/matrix-2-l.webp'),
          //     require('../assets/matrix-3-l.webp'),
          //     require('../assets/matrix-4-l.webp'),
          //     require('../assets/matrix-5-l.webp'),
          //     require('../assets/matrix-6-l.webp'),
          //   ],
          //   paragraphs: [
          //     'A movie in which a high school student automatically solves his EGE in computer science and then destroys the EGE-Machine.',
          //     'We did it to coincide with the end of school. We showed it at the "last call", but the video turned out more for classmates than for teachers. There are enough dynamics to show it on the school projector.',
          //     "The most memorable moment of filming took place on the remains of the abandoned Red Triangle factory. To repeat the famous dodging bullets scene, we took my father's mountain climbing harness and went looking for a suitable place to secure it. We were happy with the result).",
          //   ],
          // },
          {
            title:
              'Comparison of the level of RES development in Russia and Canada',
            type: 'Research',
            link: 'https://kniazevgeny.github.io/russierenouvelables/',
            slides: [require('../assets/russierenouvelables-1-m.webp')],
            lazySlides: [require('../assets/russierenouvelables-1-l.webp')],
            paragraphs: [
              "I researched one of the SDGs (Sustainable Development Goals) as part of a bilingual high school unit project. This project should have been handed in in French, when most of the material is in English, and I know how to edit mostly in Russian. That's how I got to know the Deepl translator.",
              'The project is in the form of a longread with diagrams and real infographics (not just numbers in circles). Inside: an overview of the development potential of each of the five most popular RES, as well as touched on the profitability of changes in the status-quo.',
            ],
          },
        ],
      },
      {
        year: 2020,
        projects: [
          // {
          //   title: 'Cryptocurrency wallet keyzu.ru',
          //   type: 'MVP',
          //   id: 'keyzu',
          //   link: null,
          //   hasDemo: true,
          //   embedURL:
          //     'https://www.youtube-nocookie.com/embed/2FANMskvytA?autoplay=1&',
          //   slides: [
          //     require('../assets/keyzu-1-m.webp'),
          //     require('../assets/keyzu-2-m.webp'),
          //     require('../assets/keyzu-3-m.webp'),
          //     require('../assets/keyzu-4-m.webp'),
          //   ],
          //   lazySlides: [
          //     require('../assets/keyzu-1-l.webp'),
          //     require('../assets/keyzu-2-l.webp'),
          //     require('../assets/keyzu-3-l.webp'),
          //     require('../assets/keyzu-4-l.webp'),
          //   ],
          //   paragraphs: [
          //     'A pet project that grew into a full-fledged cryptocurrency wallet. It was created as a simple product for people who do not know about crypto. But none of the creators knew anything about marketing.',
          //   ],
          // },
          {
            title: 'Monitoring Human Rights Violations in Prisons "Znai Krai"',
            summary:
              '881 institutions on the map, showing more than 377 violations. 2nd place at the Projector 2020 hackathon',
            type: 'MVP ➡️ Web Service',
            id: 'znaikrai',
            link: 'https://znai-krai.zekovnet.ru',
            hasDemo: false,
            slides: [
              require('../assets/znaikrai-1-.webp'),
              require('../assets/znaikrai-2-.webp'),
              require('../assets/znaikrai-3-m.webp'),
              require('../assets/znaikrai-4-m.webp'),
            ],
            lazySlides: [
              require('../assets/znaikrai-1-l.webp'),
              require('../assets/znaikrai-2-l.webp'),
              require('../assets/znaikrai-3-l.webp'),
              require('../assets/znaikrai-4-l.webp'),
            ],
            paragraphs: [
              'The service shows visually how many violations were committed, what kind of violations they were and provides an opportunity to report violations.',
              'In February 2020, I participated in the "Projector 2020" hackathon organized by the Social Technologies Hothouse and Novaya Gazeta. On the spot I met part of the team - the ideological inspirers. At the hackathon the project took second place, after which the development team, including me, left to finalize the project.',
              '',
            ],
          },
        ],
      },
      {
        year: 2019,
        projects: [
          {
            title: 'Trailer for the novel "Les Misérables" by V. Hugo',
            summary: '2138+ views',
            type: 'Video',
            id: 'miserables',
            link: 'https://vk.com/video250210451_456239461',
            hasDemo: true,
            embedURL:
              'https://vk.com/video_ext.php?oid=250210451&id=456239461&hash=6901386fc6c2f72f&hd=2&autoplay=1',
            slides: [
              require('../assets/miserables-1-m.webp'),
              require('../assets/miserables-2-m.webp'),
              require('../assets/miserables-3-m.webp'),
              require('../assets/miserables-4-m.webp'),
            ],
            lazySlides: [
              require('../assets/miserables-1-l.webp'),
              require('../assets/miserables-2-l.webp'),
              require('../assets/miserables-3-l.webp'),
              require('../assets/miserables-4-l.webp'),
            ],
            paragraphs: [''],
          },
        ],
      },
    ],
  },
}
