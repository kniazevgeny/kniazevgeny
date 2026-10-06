import { messages } from './messages'
import terImageUrl from '../assets/ter-cover.webp?url'
import lotoVideoUrl from '../assets/loto-art.mp4?url'
import lotoPosterUrl from '../assets/loto-art-poster.webp?url'
import atmospherePaperUrl from '../assets/atmosphere-aware-place-discovery.webp?url'
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
      fit?: 'cover' | 'contain'
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
  linkLabel?: string
  links?: readonly ProjectLink[]
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

const workIds = ['lip', 'easytix', 'smlt'] as const

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
      education: [
        {
          icon: 'ulille',
          text: 'University of Lille',
          details: [
            { program: 'Master in bioinformatics', years: '2026 →' },
            { program: 'Licence MIASHS (applied maths & CS)', years: '2023 → 2026' },
          ],
        },
        {
          icon: 'polytech',
          text: 'Peter the Great St. Petersburg Polytechnic University',
          details: [{ program: 'Business Informatics', years: '2021 → 2023' }],
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
      paragraphs: [
        'I work across frontend engineering, product analytics, and discovery, using small interfaces to test risky assumptions. My current tools are React, TypeScript, Vite, and the backend work needed to make products real.',
        'I have built rental and location-based platforms, IoT tools, and drug discovery systems; now I am moving toward research software and computational biology. Alongside engineering, I do JTBD interviews, quantitative research, and MVPs.',
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
      education: [
        {
          icon: 'ulille',
          text: 'Университет Лилля',
          details: [
            { program: 'Магистратура по биоинформатике', years: '2026 →' },
            { program: 'Лиценциат MIASHS (прикладная математика и информатика для социальных и естественных наук)', years: '2023 → 2026' },
          ],
        },
        {
          icon: 'polytech',
          text: 'СПбПУ Петра Великого',
          details: [{ program: 'Бизнес-информатика', years: '2021 → 2023' }],
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
      paragraphs: [
        'Я работаю на стыке фронтенд-разработки, продуктовой аналитики и discovery, собирая небольшие интерфейсы для проверки рискованных гипотез. Использую React, TypeScript, Vite и backend-инструменты, нужные для запуска продукта.',
        'Я работал с сервисами аренды и геолокационными платформами, IoT-инструментами и системами для поиска лекарств. Сейчас развиваюсь в сфере исследовательского ПО и вычислительной биологии; также провожу JTBD-интервью, количественные исследования и собираю MVP.',
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
            label: project.linkLabel ?? copy[locale].projectLinks[kind],
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
    links: [...primaryLink, ...(project.links ?? [])],
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
    },
    atmosphere: {
      title: 'Atmosphere-Aware Place Discovery',
      type: 'Research',
      summary: 'M. Aizinov, W. Ling, E. Kniazev, C. Liu, Z. Li · 34th ACM SIGSPATIAL',
      paragraphs: [
        'Architected and built a multimodal enrichment pipeline leveraging Qwen3-VL embeddings.',
        'Applied PCA and Leiden micro-clustering to partition the graph into fine-grained review themes.',
      ],
    },
    ter: {
      title: 'Graph-based methods for analyzing and interpreting genomic data',
      type: 'Research',
      summary:
        'Algorithmic graph-based methods for analyzing and interpreting genomic data.',
    },
  },
  ru: {
    loto: {
      title: 'Loto+Art',
      type: 'Генеративный инструмент',
      summary:
        'Генератор карточек лото, где в выбранных клетках появляется искусство.',
    },
    atmosphere: {
      title: 'Atmosphere-Aware Place Discovery',
      type: 'Исследование',
      summary: 'M. Aizinov, W. Ling, E. Kniazev, C. Liu, Z. Li · 34th ACM SIGSPATIAL',
      paragraphs: [
        'Спроектировал и создал мультимодальный конвейер обогащения данных на основе эмбеддингов Qwen3-VL.',
        'Применил PCA и микрокластеризацию Leiden, чтобы разделить граф на детализированные темы отзывов.',
      ],
    },
    ter: {
      title: 'Графовые методы анализа и интерпретации геномных данных',
      type: 'Исследование',
      summary:
        'Алгоритмические методы на основе графов для анализа и интерпретации геномных данных.',
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
      effectOverride: { major: 'organic-matte' },
    },
    {
      id: 'atmosphere-aware-place-discovery',
      year: 2026,
      title: presentation.atmosphere.title,
      type: presentation.atmosphere.type,
      summary: presentation.atmosphere.summary,
      paragraphs: [...presentation.atmosphere.paragraphs],
      slides: [],
      links: [{ href: 'https://doi.org/10.1145/3841645.3843038', label: copy[locale].projectLinks.paper, kind: 'paper' }],
      featured: true,
      section: 'personal',
      media: {
        kind: 'image',
        src: atmospherePaperUrl,
        alt: presentation.atmosphere.title,
        aspect: 'wide',
        fit: 'contain',
      },
      effectOverride: { major: 'iris-gate', accent: 'chromatic' },
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
      effectOverride: { major: 'iris-gate' },
    },
  ]
}

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
