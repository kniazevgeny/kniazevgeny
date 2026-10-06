import { useCallback, useEffect, useRef, useState } from 'react'
import type { Project } from '../data/site'
import { getEffectProfile } from '../lib/effects'
import { MediaEffectCanvas } from './MediaEffectCanvas'
import { ProjectMedia, type ProjectMediaElement } from './ProjectMedia'

type FeaturedProjectsProps = {
  projects: Project[]
  linkLabel: string
  onActiveProject: (projectId: string) => void
}

type FeaturedProjectCardProps = {
  project: Project
  index: number
  isVisible: boolean
  isActive: boolean
  reducedMotion: boolean
  linkLabel: string
  onActivate: (projectId: string) => void
}

const FeaturedProjectCard = ({
  project,
  index,
  isVisible,
  isActive,
  reducedMotion,
  linkLabel,
  onActivate,
}: FeaturedProjectCardProps) => {
  const profile = getEffectProfile(project.id, project.effectOverride)
  const [mediaElement, setMediaElement] = useState<ProjectMediaElement | null>(null)
  const [playToken, setPlayToken] = useState(0)

  useEffect(() => {
    if (!isActive || !isVisible || reducedMotion) return
    setPlayToken((token) => token + 1)
  }, [isActive, isVisible, reducedMotion])

  const isRevealing = isActive && isVisible && !reducedMotion
  const replayOnDesktopHover = () => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    onActivate(project.id)
    if (isActive && !reducedMotion) {
      setPlayToken((token) => token + 1)
    }
  }

  return (
    <article
      className="featured-card"
      id={project.id}
      data-featured-card={project.id}
    >
      <div
        className={`featured-card__media-shell effect-${profile.major} accent-${profile.accent}${isRevealing ? ' is-revealing' : ''}`}
        data-project-id={project.id}
        onPointerEnter={replayOnDesktopHover}
      >
        <div
          className={`featured-card__media media-frame media-frame--${project.media.aspect}`}
        >
          <ProjectMedia
            media={project.media}
            title={project.title}
            active={isActive}
            first={index === 0}
            reducedMotion={reducedMotion}
            animationKey={playToken}
            onElement={setMediaElement}
          />
          <MediaEffectCanvas
            source={isActive ? mediaElement : null}
            profile={profile}
            playToken={playToken}
            reducedMotion={reducedMotion}
          />
          <span className="delayed-contour" aria-hidden="true" />
          <svg
            className="incision-layer"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="39,43 47,31 58,39 68,35 64,51 75,61 61,67 52,78 43,65 30,70 35,54 25,45" />
            <polygon points="31,39 45,25 61,34 77,29 71,49 84,64 65,72 55,87 39,70 22,76 28,56 16,45" />
            <polygon points="43,37 52,20 68,31 83,27 76,48 92,59 72,70 62,90 47,73 28,82 34,58 19,48" />
          </svg>
          <svg
            className="prism-frame"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect className="prism-edge prism-edge--pink" x="1" y="1" width="98" height="98" />
            <rect className="prism-edge prism-edge--blue" x="1" y="1" width="98" height="98" />
            <rect className="prism-edge prism-edge--yellow" x="1" y="1" width="98" height="98" />
          </svg>
          <span className="anamorphic-flare" aria-hidden="true" />
        </div>
      </div>

      <div className="featured-card__copy">
        <p className="featured-card__meta">
          <span>{project.year}</span>
          <span>{project.type}</span>
        </p>
        <h3>{project.title}</h3>
        {project.summary ? <p>{project.summary}</p> : null}
        {project.links.length > 0 ? (
          <ul className="project-links" aria-label={`${project.title} links`}>
            {project.links.map((link) => (
              <li key={`${project.id}-${link.href}`}>
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {link.label || linkLabel} ↗
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

export const FeaturedProjects = ({
  projects,
  linkLabel,
  onActiveProject,
}: FeaturedProjectsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const visibleRatios = useRef(new Map<string, number>())
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set())
  const [activeId, setActiveId] = useState(projects[0]?.id ?? '')
  const [reducedMotion, setReducedMotion] = useState(false)

  const activateProject = useCallback((projectId: string) => {
    setActiveId(projectId)
    onActiveProject(projectId)
  }, [onActiveProject])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('[data-featured-card]')
    )
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.featuredCard
          if (id) {
            visibleRatios.current.set(
              id,
              entry.isIntersecting ? entry.intersectionRatio : 0
            )
          }
        })

        const visible = [...visibleRatios.current]
          .filter(([, ratio]) => ratio > 0)
          .sort((a, b) => b[1] - a[1])
        const activeId = visible[0]?.[0]
        if (activeId) {
          activateProject(activeId)
        }

        const nextVisibleIds = new Set(visible.map(([id]) => id))
        setVisibleIds((current) => {
          if (
            current.size === nextVisibleIds.size &&
            [...current].every((id) => nextVisibleIds.has(id))
          ) {
            return current
          }
          return nextVisibleIds
        })
      },
      { threshold: [0, 0.15, 0.4, 0.7] }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [activateProject, projects])

  return (
    <div className="featured-layout" ref={containerRef}>
      {projects.map((project, index) => {
        return (
          <FeaturedProjectCard
            project={project}
            index={index}
            isVisible={visibleIds.has(project.id)}
            isActive={activeId === project.id}
            reducedMotion={reducedMotion}
            linkLabel={linkLabel}
            onActivate={activateProject}
            key={project.id}
          />
        )
      })}
    </div>
  )
}
