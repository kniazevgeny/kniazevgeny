import { useCallback, useState } from 'react'
import type { getSiteContent, Locale, Project, ProjectYear } from '../data/site'
import avatarUrl from '../assets/avatar.webp?url'
import polytechUrl from '../assets/polytech.svg?url'
import ulilleUrl from '../assets/ULille-nb.svg?url'
import githubUrl from '../assets/github.svg?url'
import telegramUrl from '../assets/telegram.svg?url'
import linkedinUrl from '../assets/linkedin.svg?url'
import emailUrl from '../assets/email.svg?url'
import { FeaturedProjects } from './FeaturedProjects'
import { HeroBlackHoleCanvas } from './HeroBlackHoleCanvas'
import { SectionLocator } from './SectionLocator'

type SiteContent = ReturnType<typeof getSiteContent>

type PortfolioProps = {
  content: SiteContent
  locale: Locale
}

const localePath = (locale: Locale) => (locale === 'en' ? '/' : '/ru/')

const pluralizeProject = (count: number, locale: Locale) => {
  if (locale === 'ru') {
    if (count % 10 === 1 && count % 100 !== 11) return 'проект'
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
      return 'проекта'
    }
    return 'проектов'
  }

  return count === 1 ? 'project' : 'projects'
}

const externalAttrs = (href: string) =>
  href.startsWith('http')
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {}

const contactIcons: Record<string, string> = {
  Telegram: telegramUrl,
  GitHub: githubUrl,
  LinkedIn: linkedinUrl,
  Email: emailUrl,
}

const ProjectLinks = ({ project }: { project: Project }) => {
  if (project.links.length === 0) return null

  return (
    <ul className="project-links" aria-label={`${project.title} links`}>
      {project.links.map((link) => (
        <li key={`${project.id}-${link.href}`}>
          <a href={link.href} {...externalAttrs(link.href)}>
            {link.label} ↗
          </a>
        </li>
      ))}
    </ul>
  )
}

const ToggleLabel = ({ content }: { content: SiteContent }) => (
  <span className="toggle-label" aria-hidden="true">
    <span className="toggle-label__more">{content.sections.showMore}</span>
    <span className="toggle-label__less">{content.sections.hide}</span>
  </span>
)

const storyInlineLinks = [
  {
    phrase: 'rental and location-based platforms',
    href: '#work',
  },
  {
    phrase: 'research software and computational biology',
    href: '#personal',
  },
  {
    phrase: 'Telegram bots, Vue/Vuetify apps',
    href: '#archive',
  },
  {
    phrase: 'сервисами аренды и геолокационными платформами',
    href: '#work',
  },
  {
    phrase: 'исследовательского ПО и вычислительной биологии',
    href: '#personal',
  },
  {
    phrase: 'Telegram-ботов, приложения на Vue/Vuetify',
    href: '#archive',
  },
] as const

const StoryParagraph = ({ paragraph }: { paragraph: string }) => {
  const link = storyInlineLinks.find(({ phrase }) => paragraph.includes(phrase))
  if (!link) return <p>{paragraph}</p>

  const index = paragraph.indexOf(link.phrase)
  return (
    <p>
      {paragraph.slice(0, index)}
      <a href={link.href}>{link.phrase}</a>
      {paragraph.slice(index + link.phrase.length)}
    </p>
  )
}

const PreviewStrip = ({
  project,
  label,
}: {
  project: Project
  label: string
}) => {
  if (project.slides.length === 0) return null

  return (
    <figure className="preview-strip" aria-label={`${project.title} ${label}`}>
      {project.slides.map((slide, index) => (
        <img
          key={`${project.id}-${slide}`}
          src={slide}
          alt={`${project.title} preview ${index + 1}`}
          loading="lazy"
          decoding="async"
        />
      ))}
    </figure>
  )
}

const ProjectDetails = ({
  project,
  content,
  openByDefault = false,
}: {
  project: Project
  content: SiteContent
  openByDefault?: boolean
}) => (
  <details className="project-details" id={project.id} open={openByDefault}>
    <summary>
      <span className="project-title">{project.title}</span>
      <span className="project-type">{project.type}</span>
      <ToggleLabel content={content} />
    </summary>
    <div className="project-body">
      <div className="project-body__copy">
        {project.summary ? (
          <p className="project-summary">{project.summary}</p>
        ) : null}
        <ProjectLinks project={project} />
        {project.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <PreviewStrip project={project} label={content.sections.previews} />
    </div>
  </details>
)

const ArchiveYear = ({
  year,
  content,
  locale,
}: {
  year: ProjectYear
  content: SiteContent
  locale: Locale
}) => (
  <details className="archive-year">
    <summary>
      <span className="archive-year__year">{year.year}</span>
      <span className="archive-year__count">
        {year.projects.length} {pluralizeProject(year.projects.length, locale)}
      </span>
      <span className="archive-year__types">{year.types.join(' / ')}</span>
      <ToggleLabel content={content} />
    </summary>
    <div className="archive-year__projects">
      {year.projects.map((project) => (
        <ProjectDetails
          key={project.id}
          project={project}
          content={content}
          openByDefault={year.projects.length === 1}
        />
      ))}
    </div>
  </details>
)

const WorkCard = ({
  project,
  content,
}: {
  project: Project
  content: SiteContent
}) => {
  const visibleParagraph = project.summary ?? project.paragraphs[0]
  const extraParagraphs = project.summary
    ? project.paragraphs
    : project.paragraphs.slice(1)

  return (
    <article className="work-card" id={`work-${project.id}`}>
      <figure
        className={`work-card__media${project.artwork === 'logo' ? ' work-card__media--logo' : ''}`}
      >
        {project.media.kind === 'image' ? (
          <img
            src={project.media.src}
            alt={project.media.alt}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span>{project.title}</span>
        )}
        {project.tag ? <i data-tag={project.tag} aria-hidden="true" /> : null}
      </figure>
      <div className="work-card__copy">
        <div className="work-card__meta">
          <span>{project.year}</span>
          <span>{project.type}</span>
        </div>
        <h3>{project.title}</h3>
        {visibleParagraph ? <p>{visibleParagraph}</p> : null}
        <dl>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Output</dt>
            <dd>{project.output}</dd>
          </div>
        </dl>
        <ProjectLinks project={project} />
      </div>
      {extraParagraphs.length > 0 ? (
        <details className="work-card__details">
          <summary>
            <ToggleLabel content={content} />
          </summary>
          <div className="work-card__details-body">
            {extraParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
      ) : null}
    </article>
  )
}

const educationIcon = { polytech: polytechUrl, ulille: ulilleUrl } as const

export const Portfolio = ({ content, locale }: PortfolioProps) => {
  const [activeProjectId, setActiveProjectId] = useState(
    content.personalProjects[0]?.id ?? ''
  )
  const [contextOpen, setContextOpen] = useState(false)
  const onActiveProject = useCallback((projectId: string) => {
    setActiveProjectId(projectId)
  }, [])

  return (
    <main className="site-shell">
      <SectionLocator
        personalLabel={content.sections.personalShort}
        workLabel={content.sections.work}
        archiveLabel={content.sections.archive}
        counts={content.counts}
        personalProjects={content.personalProjects}
        workProjects={content.workProjects}
        archiveProjects={content.archiveYears.flatMap((year) => year.projects)}
        activeProjectId={activeProjectId}
      />

      <section className="hero" aria-labelledby="intro-title">
        <HeroBlackHoleCanvas />
        <div
          className="hero-organic-line hero-organic-line--left"
          aria-hidden="true"
        />
        <div
          className="hero-organic-line hero-organic-line--right"
          aria-hidden="true"
        />
        <nav className="language-switcher" aria-label={content.language.label}>
          {(['en', 'ru'] as const).map((language) => (
            <a
              key={language}
              className={language === locale ? 'is-active' : undefined}
              href={localePath(language)}
              aria-current={language === locale ? 'page' : undefined}
            >
              {content.language[language]}
            </a>
          ))}
        </nav>

        <div className="hero__content">
          <header className="identity">
            <img
              src={avatarUrl}
              alt=""
              width="96"
              height="96"
              decoding="async"
            />
            <div>
              <h1 id="intro-title">{content.meta.title}</h1>
              <ul className="inline-links" aria-label="Primary links">
                {content.hero.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...externalAttrs(link.href)}
                      aria-label={link.label}
                      className={
                        contactIcons[link.label]
                          ? 'inline-link--icon'
                          : link.label === 'CV'
                            ? 'inline-link--cv'
                            : link.label === 'Blog (RU)' || link.label === 'Блог (RU)'
                              ? 'inline-link--blog'
                              : undefined
                      }
                    >
                      {contactIcons[link.label] ? (
                        <img
                          src={contactIcons[link.label]}
                          alt=""
                          aria-hidden="true"
                        />
                      ) : null}
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <div className="hero__information">
            <div className="intro-copy">
              {content.hero.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className={`hero-context${contextOpen ? ' is-open' : ''}`}>
                <button
                  className="hero-context__trigger"
                  type="button"
                  aria-expanded={contextOpen}
                  aria-controls="hero-context-panel"
                  onClick={() => setContextOpen((open) => !open)}
                >
                  {content.story.detailsLabel}
                </button>
                <div id="hero-context-panel">
                  {[...content.story.intro, ...content.story.details].map(
                    (paragraph) => (
                      <StoryParagraph key={paragraph} paragraph={paragraph} />
                    )
                  )}
                </div>
              </div>
            </div>
            <ul className="education-list" aria-label="Education">
              {content.hero.education.map((item) => (
                <li key={item.text} tabIndex={0}>
                  <img
                    className={
                      item.icon === 'ulille'
                        ? 'education-icon--invert'
                        : undefined
                    }
                    src={educationIcon[item.icon]}
                    alt=""
                  />
                  <span className="education-entry">
                    <span className="education-entry__label">{item.text}</span>
                    {'details' in item && item.details ? (
                      <span className="education-entry__details">
                        {item.details}
                      </span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      <section
        className="personal-section"
        id="personal"
        aria-labelledby="personal-title"
      >
        <header className="section-heading section-heading--wide">
          <span>01 / FEATURED</span>
          <h2 id="personal-title">{content.sections.personal}</h2>
          <p>{content.sections.personalIntro}</p>
        </header>
        <FeaturedProjects
          projects={content.personalProjects}
          linkLabel={content.projectLinks.website}
          onActiveProject={onActiveProject}
        />
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <header className="section-heading">
          <span>02 / WORK</span>
          <h2 id="work-title">{content.sections.work}</h2>
          <p>{content.sections.workIntro}</p>
        </header>
        <div className="work-list">
          {content.workProjects.map((project) => (
            <WorkCard key={project.id} project={project} content={content} />
          ))}
        </div>
      </section>

      <section
        className="archive-section"
        id="archive"
        aria-labelledby="archive-title"
      >
        <header className="section-heading">
          <span>03 / ARCHIVE</span>
          <h2 id="archive-title">{content.sections.archive}</h2>
          <p>{content.sections.archiveIntro}</p>
        </header>
        <div className="archive-list">
          {content.archiveYears.map((year) => (
            <ArchiveYear
              key={year.year}
              year={year}
              content={content}
              locale={locale}
            />
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>{content.sections.thanks}</p>
        <a
          href="https://github.com/kniazevgeny/kniazevgeny/tree/master"
          target="_blank"
          rel="noopener noreferrer"
        >
          {content.sections.source}
        </a>
      </footer>
    </main>
  )
}
