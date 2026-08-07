import { messages } from './messages'
import terImageUrl from '../assets/ter-cover.webp?url'
import lotoVideoUrl from '../assets/loto-art.mp4?url'
import lotoPosterUrl from '../assets/loto-art-poster.webp?url'
import savedSpotsVideoUrl from '../assets/saved-spots-explorer.mp4?url'
import savedSpotsPosterUrl from '../assets/saved-spots-explorer-poster.webp?url'
import whimbeanImageUrl from '../assets/whimbean.webp?url'
import type { EffectProfile } from '../lib/effects'

export type Locale = 'en' | 'ru'

export type ProjectLinkKind =
  'website' | 'paper' | 'repo' | 'demo' | 'case' | 'post' | 'video' | 'deck'

export type ProjectLink = {
  href: string
  label: string
  kind: ProjectLinkKind
}

export type Project = {
  id: string
  year: number
  title: string
  type: string
  summary?: string
  paragraphs: string[]
  slides: string[]
  links: ProjectLink[]
  featured: boolean
  section: ProjectSection
  media: FeaturedMedia
  role: string
  state: string
  output: string
  effectOverride?: Partial<EffectProfile>
  tag?: ProjectTag
  artwork?: 'logo'
}

export type ProjectSection = 'personal' | 'work' | 'archive'

export type FeaturedMedia =
  | {
      kind: 'image'
      src: string
      alt: string
      aspect: 'square' | 'wide'
    }
  | {
      kind: 'video'
      src: string
      poster?: string
      alt: string
      aspect: 'square' | 'wide'
    }
  | {
      kind: 'placeholder'
      alt: string
      aspect: 'square' | 'wide'
    }

export type ProjectTag = 'molecule' | 'globe' | 'discount' | 'building'

export type ProjectYear = {
  year: number
  projects: Project[]
  types: string[]
}

type RawProject = {
  id?: string
  title: string
  type: string
  summary?: string
  link?: string | null
  slides?: readonly string[]
  paragraphs?: readonly string[]
  hasDemo?: boolean
  artwork?: 'logo'
}

type RawProjectYear = {
  year: number
  projects: readonly RawProject[]
}

type RawLocale = {
  title: string
  projects: readonly RawProjectYear[]
}

const projectTags: Partial<Record<string, ProjectTag>> = {
  lip: 'molecule',
  whimbean: 'globe',
  easytix: 'discount',
  smlt: 'building',
}

const workIds = ['lip', 'easytix', 'soulbody', 'smlt', 'munk'] as const

const cvHref = 'https://kniazevgeny.github.io/docs/CV%20Kniazev%20-%202026.pdf'

const copy = {
  en: {
    meta: {
      title: 'Evgeny Kniazev',
      description:
        'Product-minded frontend engineer building web products, MVPs, and research-backed interfaces.',
    },
    language: {
      label: 'Language',
      en: 'EN',
      ru: 'RU',
    },
    hero: {
      role: 'fullstack engineer',
      education: [
        {
          icon: 'ulille',
          text: 'University of Lille',
          details:
            'Master in bioinformatics · 2026 →\nLicence MIASHS (applied maths & CS for social and life sciences) · 2023 → 2026',
        },
        {
          icon: 'polytech',
          text: 'Peter the Great St. Petersburg Polytechnic University',
          details: 'Business Informatics · 2021 → 2023',
        },
      ],
      intro: [
        'I build simple software for complex problems.',
        'I work across interfaces, data, and the machinery underneath, turning uncertain ideas into products people can actually use.',
      ],
      links: [
        { label: 'CV', href: cvHref },
        { label: 'Telegram', href: 'https://t.me/kniazevgeny' },
        { label: 'GitHub', href: 'https://github.com/kniazevgeny' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/kniazevgeny' },
        { label: 'Email', href: 'mailto:eugene.kniazev@gmail.com' },
        { label: 'Blog (RU)', href: 'https://t.me/golden_kniazevgeny' },
      ],
    },
    story: {
      title: 'My Story',
      intro: [
        'I work somewhere between frontend engineering, product analytics, and early-stage discovery. The common thread is simple: understand what job the product has to do, make the risky assumptions about why it might work explicit, then test them with the smallest interface that can produce useful evidence.',
        'My current stack is React, TypeScript, Vite, React Aria/getjustd, and whatever backend/API work is needed to make the product real.',
      ],
      detailsLabel: 'Show more',
      details: [
        'My work has moved from rental and location-based platforms to IoT tools and drug discovery systems, with research software and computational biology becoming the next direction.',
        'I started with programming contests and small websites, then moved into Telegram bots, Vue/Vuetify apps, and later React products. That path made me comfortable with both the interface layer and the messy product questions around it.',
        'Alongside engineering, I have done JTBD interviews, quantitative research, case championships, and MVPs for teams that needed a product direction before they needed a larger system.',
      ],
    },
    sections: {
      personal: 'Featured Projects',
      personalShort: 'Featured',
      featured: 'Selected Work',
      featuredKicker: '02 — Systems built from fog',
      featuredIntro:
        'A few shipped systems where ambiguity met structure and became useful.',
      personalIntro:
        'Self-directed tools, experiments, and research—one project at a time.',
      work: 'Work',
      workIntro:
        'Selected professional work, from frontend systems to full-stack products.',
      archive: 'Archive',
      archiveIntro: 'The full history stays here, grouped by year.',
      details: 'Details',
      previews: 'Previews',
      showMore: 'Show more',
      hide: 'Hide',
      source: 'Source code',
      thanks: 'Thanks for scrolling.',
    },
    projectLinks: {
      website: 'Website',
      paper: 'Research',
      repo: 'Source',
      demo: 'Demo',
      case: 'Case',
      post: 'Post',
      video: 'Video',
      deck: 'Deck',
    },
  },
  ru: {
    meta: {
      title: 'Евгений Князев',
      description:
        'Продуктовый фронтенд-разработчик: веб-продукты, MVP и интерфейсы, основанные на исследовании пользователей.',
    },
    language: {
      label: 'Язык',
      en: 'EN',
      ru: 'RU',
    },
    hero: {
      role: 'фулстек-разработчик',
      education: [
        {
          icon: 'ulille',
          text: 'Университет Лилля',
          details:
            'Магистратура по биоинформатике · 2026 →\nЛиценциат MIASHS (прикладная математика и информатика для социальных и естественных наук) · 2023 → 2026',
        },
        {
          icon: 'polytech',
          text: 'СПбПУ Петра Великого',
          details: 'Бизнес-информатика · 2021 → 2023',
        },
      ],
      intro: [
        'Я превращаю расплывчатые продуктовые ставки в запущенные интерфейсы: исследовать, собрать прототип, запустить, разобрать результат и решить, что оставлять.',
        'Последние циклы: маркетплейсы, инструменты для авторов, Telegram mini-apps, wellness-платформы, арендные сценарии и JTBD-исследования.',
      ],
      links: [
        { label: 'CV', href: cvHref },
        { label: 'Telegram', href: 'https://t.me/kniazevgeny' },
        { label: 'GitHub', href: 'https://github.com/kniazevgeny' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/kniazevgeny' },
        { label: 'Email', href: 'mailto:eugene.kniazev@gmail.com' },
        { label: 'Блог (RU)', href: 'https://t.me/golden_kniazevgeny' },
      ],
    },
    story: {
      title: 'Обо мне',
      intro: [
        'Я работаю на стыке фронтенд-разработки, продуктовой аналитики и раннего discovery. Общая идея простая: понять, какую работу должен выполнять продукт, а затем собрать минимальный интерфейс, который это проверит.',
        'Мой текущий стек: React, TypeScript, Vite, React Aria/getjustd и ровно столько backend/API-работы, сколько нужно, чтобы продукт заработал.',
      ],
      detailsLabel: 'Показать ещё',
      details: [
        'Я работал над сервисами аренды и геолокационными платформами, а затем перешёл к IoT-инструментам и системам для поиска лекарств. Сейчас хочу развиваться в области исследовательского ПО и вычислительной биологии.',
        'Я начинал с олимпиадного программирования и небольших сайтов, потом делал Telegram-ботов, приложения на Vue/Vuetify и уже после этого React-продукты. Этот путь помог спокойно работать и с интерфейсом, и с продуктовыми вопросами вокруг него.',
        'Помимо разработки, я проводил JTBD-интервью, делал количественные исследования, участвовал в кейс-чемпионатах и собирал MVP для команд, которым сначала нужно было понять продуктовый вектор.',
        'Поэтому для меня интерфейс — это не просто экран, а инструмент продукта: он должен показывать правильные ограничения, помогать пользователю принимать решения и оставаться поддерживаемым для команды.',
      ],
    },
    sections: {
      personal: 'Избранные проекты',
      personalShort: 'Избранное',
      featured: 'Избранные проекты',
      featuredKicker: '02 — Системы из тумана',
      featuredIntro:
        'Несколько запущенных продуктов, где неопределенность стала рабочей структурой.',
      personalIntro:
        'Самостоятельные инструменты, эксперименты и исследования — по одному за раз.',
      work: 'Работа',
      workIntro:
        'Профессиональные проекты: от frontend-систем до full-stack-продуктов.',
      archive: 'Архив',
      archiveIntro: 'Вся история остается доступной, сгруппированной по годам.',
      details: 'Подробнее',
      previews: 'Превью',
      showMore: 'Показать',
      hide: 'Скрыть',
      source: 'Исходный код',
      thanks: 'Спасибо, что дочитали.',
    },
    projectLinks: {
      website: 'Сайт',
      paper: 'Исследование',
      repo: 'Код',
      demo: 'Демо',
      case: 'Кейс',
      post: 'Пост',
      video: 'Видео',
      deck: 'Презентация',
    },
  },
} as const

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-+|-+$/g, '')

const isResearch = (project: RawProject) =>
  /research|исслед|jtbd|аналит/i.test(`${project.type} ${project.title}`)

const inferLinkKind = (project: RawProject): ProjectLinkKind => {
  const value = `${project.type} ${project.title}`.toLowerCase()

  if (project.hasDemo || /video|видео/.test(value)) return 'video'
  if (/case|кейс/.test(value)) return 'case'
  if (isResearch(project)) return 'paper'
  return 'website'
}

const normalizeProject = (
  project: RawProject,
  year: number,
  locale: Locale
): Project => {
  const id = project.id ?? slugify(project.title)
  const kind = inferLinkKind(project)
  const slides = [...(project.slides ?? [])]
  const primaryLink =
    project.link == null
      ? []
      : [
          {
            href: project.link,
            label: copy[locale].projectLinks[kind],
            kind,
          },
        ]

  return {
    id,
    year,
    title: project.title,
    type: project.type,
    summary: project.summary,
    paragraphs: [...(project.paragraphs ?? [])].filter(Boolean),
    slides,
    links: primaryLink,
    featured: false,
    section: 'archive',
    media: slides[0]
      ? {
          kind: 'image',
          src: slides[0],
          alt: `${project.title} preview`,
          aspect: 'wide',
        }
      : {
          kind: 'placeholder',
          alt: project.title,
          aspect: 'wide',
        },
    role: project.type,
    state: locale === 'en' ? 'Archive record' : 'Запись архива',
    output: project.type,
    tag: projectTags[id],
    artwork: project.artwork,
  }
}

const normalizeYears = (locale: Locale): ProjectYear[] => {
  const raw = messages[locale] as unknown as RawLocale

  return raw.projects.map((yearGroup) => {
    const projects = yearGroup.projects.map((project) =>
      normalizeProject(project, yearGroup.year, locale)
    )

    return {
      year: yearGroup.year,
      projects,
      types: [...new Set(projects.map((project) => project.type))],
    }
  })
}

const personalPresentation = {
  en: {
    loto: {
      title: 'Loto+Art',
      type: 'Generative tool',
      summary:
        'A generator of loto tiles with artwork placed into selected cells.',
      role: 'Concept and development',
      state: 'In progress',
      output: 'Tile generator',
    },
    saved: {
      title: 'Saved Spots Explorer',
      type: 'Personal utility',
      summary: 'A visual explorer for places saved from Google Maps.',
      role: 'Concept and development',
      state: 'In progress',
      output: 'Map explorer',
    },
    whimbean: {
      role: 'Product and full-stack development',
      state: 'Live',
      output: 'Web product',
    },
    ter: {
      title: 'Graph-based methods for analyzing and interpreting genomic data',
      type: 'Research',
      summary:
        'Algorithmic graph-based methods for analyzing and interpreting genomic data.',
      role: 'Research',
      state: 'Current edition',
      output: 'Research material',
    },
  },
  ru: {
    loto: {
      title: 'Loto+Art',
      type: 'Генеративный инструмент',
      summary:
        'Генератор карточек лото, где в выбранных клетках появляется искусство.',
      role: 'Концепция и разработка',
      state: 'В работе',
      output: 'Генератор карточек',
    },
    saved: {
      title: 'Saved Spots Explorer',
      type: 'Личный инструмент',
      summary: 'Визуальный исследователь мест, сохранённых из Google Maps.',
      role: 'Концепция и разработка',
      state: 'В работе',
      output: 'Исследователь карты',
    },
    whimbean: {
      role: 'Продукт и full-stack разработка',
      state: 'Запущен',
      output: 'Веб-продукт',
    },
    ter: {
      title: 'Графовые методы анализа и интерпретации геномных данных',
      type: 'Исследование',
      summary:
        'Алгоритмические методы на основе графов для анализа и интерпретации геномных данных.',
      role: 'Исследование',
      state: 'Текущая версия',
      output: 'Материал исследования',
    },
  },
} as const

const getPersonalProjects = (
  locale: Locale,
  projects: Project[]
): Project[] => {
  const presentation = personalPresentation[locale]
  const whimbean = projects.find((project) => project.id === 'whimbean')

  if (!whimbean) throw new Error('Missing project: whimbean')

  return [
    {
      id: 'loto-art',
      year: 2026,
      title: presentation.loto.title,
      type: presentation.loto.type,
      summary: presentation.loto.summary,
      paragraphs: [],
      slides: [],
      links: [{ href: 'https://kniazevgeny.github.io/loto', label: copy[locale].projectLinks.website, kind: 'website' }],
      featured: true,
      section: 'personal',
      media: {
        kind: 'video',
        src: lotoVideoUrl,
        poster: lotoPosterUrl,
        alt: presentation.loto.title,
        aspect: 'wide',
      },
      role: presentation.loto.role,
      state: presentation.loto.state,
      output: presentation.loto.output,
      effectOverride: { major: 'organic-matte' },
    },
    {
      id: 'saved-spots',
      year: 2026,
      title: presentation.saved.title,
      type: presentation.saved.type,
      summary: presentation.saved.summary,
      paragraphs: [],
      slides: [],
      links: [{ href: 'https://kniazevgeny.github.io/saved-spots-explorer/', label: copy[locale].projectLinks.website, kind: 'website' }],
      featured: true,
      section: 'personal',
      media: {
        kind: 'video',
        src: savedSpotsVideoUrl,
        poster: savedSpotsPosterUrl,
        alt: presentation.saved.title,
        aspect: 'wide',
      },
      role: presentation.saved.role,
      state: presentation.saved.state,
      output: presentation.saved.output,
      effectOverride: { major: 'anamorphic', accent: 'chromatic' },
    },
    {
      ...whimbean,
      year: 2026,
      featured: true,
      section: 'personal',
      media: {
        kind: 'image',
        src: whimbeanImageUrl,
        alt: `${whimbean.title} preview`,
        aspect: 'wide',
      },
      role: presentation.whimbean.role,
      state: presentation.whimbean.state,
      output: presentation.whimbean.output,
      effectOverride: { major: 'incision' },
    },
    {
      id: 'ter',
      year: 2026,
      title: presentation.ter.title,
      type: presentation.ter.type,
      summary: presentation.ter.summary,
      paragraphs: [],
      slides: [terImageUrl],
      links: [
        {
          href: 'https://kniazevgeny.github.io/docs/TER.pdf',
          label: copy[locale].projectLinks.paper,
          kind: 'paper',
        },
      ],
      featured: true,
      section: 'personal',
      media: {
        kind: 'image',
        src: terImageUrl,
        alt: `${presentation.ter.title} preview`,
        aspect: 'wide',
      },
      role: presentation.ter.role,
      state: presentation.ter.state,
      output: presentation.ter.output,
      effectOverride: { major: 'iris-gate' },
    },
  ]
}

const workRoles = {
  en: {
    lip: 'Full-stack product development',
    easytix: 'Frontend development',
    soulbody: 'Frontend and CMS development',
    smlt: 'Frontend development',
    munk: 'Frontend development',
  },
  ru: {
    lip: 'Full-stack разработка продукта',
    easytix: 'Frontend-разработка',
    soulbody: 'Frontend и разработка CMS',
    smlt: 'Frontend-разработка',
    munk: 'Frontend-разработка',
  },
} as const

export const getSiteContent = (locale: Locale) => {
  const years = normalizeYears(locale)
  const sourceProjects = years.flatMap((year) => year.projects)
  const personalProjects = getPersonalProjects(locale, sourceProjects)
  const workProjects = workIds.map((id) => {
    const project = sourceProjects.find((candidate) => candidate.id === id)
    if (!project) throw new Error(`Missing work project: ${id}`)

    return {
      ...project,
      section: 'work' as const,
      role: workRoles[locale][id],
      state: locale === 'en' ? 'Selected work' : 'Избранная работа',
      output: project.type,
    }
  })
  const excludedIds = new Set([
    ...personalProjects.map((project) => project.id),
    ...workProjects.map((project) => project.id),
  ])
  const archiveYears = years
    .map((year) => ({
      ...year,
      projects: year.projects.filter((project) => !excludedIds.has(project.id)),
      types: [
        ...new Set(
          year.projects
            .filter((project) => !excludedIds.has(project.id))
            .map((project) => project.type)
        ),
      ],
    }))
    .filter((year) => year.projects.length > 0)

  return {
    ...copy[locale],
    locale,
    years,
    projects: [
      ...personalProjects,
      ...workProjects,
      ...archiveYears.flatMap((year) => year.projects),
    ],
    personalProjects,
    workProjects,
    featuredProjects: personalProjects,
    archiveYears,
    counts: {
      personal: personalProjects.length,
      work: workProjects.length,
      archive: archiveYears.reduce(
        (count, year) => count + year.projects.length,
        0
      ),
    },
  }
}
