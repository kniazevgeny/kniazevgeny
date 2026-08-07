import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { Project } from '../data/site'
import { publishActiveProject } from '../lib/active-project'
import { getEffectProfile } from '../lib/effects'
import {
  getMotionDurationMs,
  installMotionControls,
  subscribeMotionControls,
} from '../lib/motion'
import { MediaEffectCanvas } from './MediaEffectCanvas'
import { ProjectMedia, type ProjectMediaElement } from './ProjectMedia'

type FeaturedProjectsProps = {
  projects: Project[]
  linkLabel: string
  onActiveProject: (projectId: string) => void
}

const isOutOfSight = (rect: DOMRect, viewportHeight: number) =>
  rect.bottom <= 0 || rect.top >= viewportHeight

const isAdjacentOutOfSight = (
  rect: DOMRect | undefined,
  direction: 'down' | 'up',
  viewportHeight: number
) =>
  rect
    ? direction === 'down'
      ? rect.top >= viewportHeight
      : rect.bottom <= 0
    : false

const isInPlayZone = (
  rect: DOMRect,
  viewportHeight: number
) => {
  const center = rect.top + rect.height / 2
  const offset = Math.abs(center - viewportHeight / 2)
  const enter = viewportHeight * 0.28
  return offset <= enter
}

const ProjectFacts = ({ project }: { project: Project }) => (
  <dl className="project-facts">
    <div>
      <dt>Role</dt>
      <dd>{project.role}</dd>
    </div>
    <div>
      <dt>State</dt>
      <dd>{project.state}</dd>
    </div>
    <div>
      <dt>Output</dt>
      <dd>{project.output}</dd>
    </div>
  </dl>
)

export const FeaturedProjects = ({
  projects,
  linkLabel,
  onActiveProject,
}: FeaturedProjectsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [activeId, setActiveId] = useState(projects[0]?.id ?? '')
  const [armedId, setArmedId] = useState<string | null>(null)
  const [mediaElement, setMediaElement] = useState<ProjectMediaElement | null>(
    null
  )
  const [playToken, setPlayToken] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [desktopStage, setDesktopStage] = useState(true)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [isArmed, setIsArmed] = useState(true)
  const [hasActivated, setHasActivated] = useState(false)
  const lastScrollY = useRef(0)
  const scrollDirection = useRef<'down' | 'up'>('down')
  const seenProjects = useRef(new Set<string>())
  const outOfSightProjects = useRef(new Set<string>())
  const previousActiveId = useRef(activeId)
  const armedIdRef = useRef<string | null>(null)
  const previousHasActivated = useRef(hasActivated)
  const startFrame = useRef<number | null>(null)
  const motionPhase = useRef<'idle' | 'armed' | 'playing'>('idle')
  const setArmedProject = (id: string | null) => {
    armedIdRef.current = id
    setArmedId(id)
  }
  const activeProject =
    projects.find((project) => project.id === activeId) ?? projects[0]
  const profile = useMemo(
    () => getEffectProfile(activeProject.id, activeProject.effectOverride),
    [activeProject]
  )
  const stageMotionClass = shouldAnimate
    ? ' is-revealing'
    : isArmed
      ? ' is-armed'
      : ''

  useEffect(() => {
    installMotionControls()
    const unsubscribe = subscribeMotionControls(() => {
      setPlayToken((token) => token + 1)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(min-width: 801px)')
    const sync = () => setDesktopStage(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const chapters = Array.from(
      container.querySelectorAll<HTMLElement>('[data-project-chapter]')
    )
    let frame = 0
    const updateActive = () => {
      frame = 0
      const currentScrollY = window.scrollY
      scrollDirection.current =
        currentScrollY >= lastScrollY.current ? 'down' : 'up'
      lastScrollY.current = currentScrollY
      // Hand off to the adjacent chapter while it is still just outside the
      // viewport. The shared stage can then hold its armed frame until that
      // chapter's centre reaches the play zone below.
      const currentIndex = Math.max(
        0,
        projects.findIndex((project) => project.id === previousActiveId.current)
      )
      const adjacentIndex =
        currentIndex + (scrollDirection.current === 'down' ? 1 : -1)
      const adjacent = chapters[adjacentIndex]
      const adjacentRect = adjacent?.getBoundingClientRect()
      // Prewarm the next chapter before it reaches the viewport. The larger
      // corridor prevents a fast scroll from skipping the armed state while
      // keeping playback gated by the separate play-zone check below.
      const adjacentReady = adjacentRect
        ? scrollDirection.current === 'down'
          ? adjacentRect.top <= window.innerHeight * 1.5
          : adjacentRect.bottom >= window.innerHeight * -0.5
        : false
      const currentId = projects[currentIndex]?.id
      const adjacentOutOfSight = isAdjacentOutOfSight(
        adjacentRect,
        scrollDirection.current,
        window.innerHeight
      )
      const currentOutOfSight = currentId
        ? outOfSightProjects.current.has(currentId)
        : false
      chapters.forEach((chapter) => {
        const rect = chapter.getBoundingClientRect()
        const id = chapter.dataset.projectChapter
        if (!id) return
        if (isOutOfSight(rect, window.innerHeight)) {
          outOfSightProjects.current.add(id)
        } else {
          outOfSightProjects.current.delete(id)
        }
      })
      const candidateId = adjacent?.dataset.projectChapter
      if (
        candidateId &&
        adjacentReady &&
        (adjacentOutOfSight ||
          (motionPhase.current === 'idle' && currentOutOfSight) ||
          (adjacentRect && !isInPlayZone(adjacentRect, window.innerHeight))) &&
        candidateId !== previousActiveId.current &&
        candidateId !== armedIdRef.current
      ) {
        setArmedProject(candidateId)
      }

      const armedChapter = armedIdRef.current
        ? chapters[projects.findIndex((project) => project.id === armedIdRef.current)]
        : undefined
      const armedRect = armedChapter?.getBoundingClientRect()
      const activeChapter = chapters[currentIndex]
      const activeRect = activeChapter?.getBoundingClientRect()
      const armedReady = armedRect
        ? isInPlayZone(armedRect, window.innerHeight)
        : false
      const activeReady = activeRect
        ? isInPlayZone(activeRect, window.innerHeight)
        : false

      if (armedIdRef.current && armedReady) {
        const nextId = armedIdRef.current
        setArmedProject(null)
        setHasActivated(true)
        publishActiveProject(previousActiveId.current, nextId, onActiveProject)
        setActiveId((current) => (current === nextId ? current : nextId))
      } else if (activeRect) {
        // Keep the stage armed while the chapter approaches. Playback only
        // begins once its centre reaches the middle of the viewport; this
        // makes the armed and playing states spatially distinct instead of
        // separated by a couple of animation frames.
        const activationEnter = activeReady
        const chapterCenter = activeRect.top + activeRect.height / 2
        const centerOffset = Math.abs(chapterCenter - window.innerHeight / 2)
        const activationExit = centerOffset > window.innerHeight * 0.4
        setHasActivated((current) =>
          current ? !activationExit : activationEnter
        )
      }
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActive)
    }
    updateActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [projects])

  useLayoutEffect(() => {
    onActiveProject(activeId)
    const activeChanged = previousActiveId.current !== activeId
    previousActiveId.current = activeId
    const activationRising = hasActivated && !previousHasActivated.current
    previousHasActivated.current = hasActivated

    // The stage is reused between chapters. If the previous chapter was still
    // revealing, React can otherwise keep `is-revealing` continuously set and
    // the next chapter's CSS animations will not get a fresh transition.
    if (activeChanged) {
      if (startFrame.current !== null) {
        window.cancelAnimationFrame(startFrame.current)
        startFrame.current = null
      }
      setShouldAnimate(false)
      setIsArmed(true)
      motionPhase.current = 'idle'
    }

    // The shared stage must animate whenever a different project becomes
    // active. Being completely out of sight still controls whether a project
    // is eligible for a later replay, but it must not prevent the newly active
    // project from entering once more.
    const shouldReplay =
      activeChanged ||
      activationRising ||
      !seenProjects.current.has(activeId) ||
      outOfSightProjects.current.has(activeId)

    const fullyOutOfSight = outOfSightProjects.current.has(activeId)

    if (reducedMotion) {
      if (fullyOutOfSight) {
        setShouldAnimate(false)
        setIsArmed(true)
      }
      return
    }

    if (!hasActivated || !shouldReplay) {
      if (fullyOutOfSight) {
        setShouldAnimate(false)
        setIsArmed(true)
      }
      return
    }

    seenProjects.current.add(activeId)
    outOfSightProjects.current.delete(activeId)
    setIsArmed(true)
    motionPhase.current = 'armed'
    startFrame.current = window.requestAnimationFrame(() => {
      startFrame.current = null
      setPlayToken((token) => token + 1)
      setIsArmed(false)
      setShouldAnimate(true)
      motionPhase.current = 'playing'
    })
    const settleTimer = window.setTimeout(() => {
      setShouldAnimate(false)
      setIsArmed(false)
      motionPhase.current = 'idle'
    }, getMotionDurationMs())
    return () => {
      if (startFrame.current !== null) {
        window.cancelAnimationFrame(startFrame.current)
        startFrame.current = null
      }
      motionPhase.current = 'idle'
      window.clearTimeout(settleTimer)
    }
  }, [activeId, hasActivated, onActiveProject, reducedMotion])

  return (
    <div className="featured-layout" ref={containerRef}>
      <div className="featured-stage-wrap">
        <div
          ref={stageRef}
          className={`featured-stage effect-${profile.major} accent-${profile.accent}${stageMotionClass}`}
          data-project-id={activeProject.id}
          data-play-token={playToken}
        >
          <div className="stage-meta" aria-hidden="true">
            <span>
              {String(projects.indexOf(activeProject) + 1).padStart(2, '0')}
            </span>
            <span>
              {activeProject.media.aspect === 'square' ? '1:1' : '16:9'}
            </span>
          </div>
          <div
            className={`media-frame media-frame--${activeProject.media.aspect}`}
          >
            <span className="delayed-contour" aria-hidden="true" />
            <ProjectMedia
              key={
                activeProject.media.kind === 'image'
                  ? `${activeProject.id}-${playToken}`
                  : activeProject.id
              }
              media={activeProject.media}
              title={activeProject.title}
              active={desktopStage}
              first
              reducedMotion={reducedMotion}
              animationKey={playToken}
              onElement={setMediaElement}
            />
            <MediaEffectCanvas
              source={mediaElement}
              profile={profile}
              playToken={playToken}
              reducedMotion={reducedMotion || !desktopStage}
            />
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
            <svg className="prism-frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <rect className="prism-edge prism-edge--pink" x="1" y="1" width="98" height="98" />
              <rect className="prism-edge prism-edge--blue" x="1" y="1" width="98" height="98" />
              <rect className="prism-edge prism-edge--yellow" x="1" y="1" width="98" height="98" />
            </svg>
            <span className="anamorphic-flare" aria-hidden="true" />
          </div>
          <span
            key={`${activeProject.id}-${playToken}`}
            className="stage-wordmark"
            aria-hidden="true"
          >
            {activeProject.title}
          </span>
          <span className="stage-artifact" aria-hidden="true">
            ✦
          </span>
          <span className="calibration-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>

      <div className="project-chapters">
        {projects.map((project, index) => (
          <article
            className="project-chapter"
            id={`project-${project.id}`}
            data-project-chapter={project.id}
            key={project.id}
          >
            <div
              className={`project-chapter__mobile-media media-frame media-frame--${project.media.aspect} effect-${getEffectProfile(project.id, project.effectOverride).major} accent-${getEffectProfile(project.id, project.effectOverride).accent}${activeId === project.id && shouldAnimate ? ' is-revealing' : (activeId === project.id && isArmed) || armedId === project.id ? ' is-armed' : ''}`}
              data-project-id={project.id}
            >
              <ProjectMedia
                key={
                  project.media.kind === 'image'
                    ? `${project.id}-${playToken}`
                    : project.id
                }
                media={project.media}
                title={project.title}
                active={!desktopStage && activeId === project.id}
                first
                reducedMotion={reducedMotion}
                animationKey={playToken}
                onElement={
                  !desktopStage && activeId === project.id
                    ? setMediaElement
                    : () => undefined
                }
              />
              <MediaEffectCanvas
                source={
                  !desktopStage && activeId === project.id ? mediaElement : null
                }
                profile={getEffectProfile(project.id, project.effectOverride)}
                playToken={playToken}
                reducedMotion={reducedMotion}
              />
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
              <svg className="prism-frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <rect className="prism-edge prism-edge--pink" x="1" y="1" width="98" height="98" />
                <rect className="prism-edge prism-edge--blue" x="1" y="1" width="98" height="98" />
                <rect className="prism-edge prism-edge--yellow" x="1" y="1" width="98" height="98" />
              </svg>
              <span className="anamorphic-flare" aria-hidden="true" />
            </div>
            <div className="project-chapter__copy">
              <div className="project-chapter__meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{project.year}</span>
                <span>{project.type}</span>
              </div>
              <h3>{project.title}</h3>
              {project.summary ? <p>{project.summary}</p> : null}
              <ProjectFacts project={project} />
              {project.links.map((link) => (
                <a
                  className="project-external-link"
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label || linkLabel} ↗
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
