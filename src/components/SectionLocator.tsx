import { useEffect, useRef, useState } from 'react'
import type { Project } from '../data/site'
import { getMotionControls, setMotionMode } from '../lib/motion'

type SectionLocatorProps = {
  personalLabel: string
  workLabel: string
  archiveLabel: string
  counts: { personal: number; work: number; archive: number }
  personalProjects: Project[]
  workProjects: Project[]
  archiveProjects: Project[]
  activeProjectId: string
}

export const SectionLocator = ({
  personalLabel,
  workLabel,
  archiveLabel,
  counts,
  personalProjects,
  workProjects,
  archiveProjects,
  activeProjectId,
}: SectionLocatorProps) => {
  const progressRef = useRef<HTMLSpanElement | null>(null)
  const [activeSection, setActiveSection] = useState('personal')
  const [hasScrolled, setHasScrolled] = useState(false)
  const [motionMode, setMotionModeState] = useState(getMotionControls().mode)
  const activeIndex = Math.max(
    0,
    personalProjects.findIndex((project) => project.id === activeProjectId)
  )
  const projectSets = {
    personal: personalProjects,
    work: workProjects,
    archive: archiveProjects,
  }
  const visibleProjects =
    projectSets[activeSection as keyof typeof projectSets] ?? personalProjects

  useEffect(() => {
    const sections = ['personal', 'work', 'archive']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0, 0.1, 0.4] }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sync = () => setMotionModeState(getMotionControls().mode)
    window.addEventListener('portfolio-motion-change', sync)
    return () => window.removeEventListener('portfolio-motion-change', sync)
  }, [])

  const changeMotionPower = (value: string) => {
    if (value === 'max') {
      setMotionMode('overdrive')
      setMotionModeState('overdrive')
      return
    }
    setMotionMode('normal')
    setMotionModeState('normal')
  }

  const motionPower = motionMode === 'overdrive' ? 'max' : 'default'

  const motionPowerControl = (
    <label className="motion-power-control">
      <span>Power</span>
      <select
        aria-label="Animation power"
        value={motionPower}
        onChange={(event) => changeMotionPower(event.target.value)}
      >
        <option value="default">Default</option>
        <option value="max">Max (use with caution)</option>
      </select>
    </label>
  )

  useEffect(() => {
    const sync = () => setHasScrolled(window.scrollY > 12)
    sync()
    window.addEventListener('scroll', sync, { passive: true })
    return () => window.removeEventListener('scroll', sync)
  }, [])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      const element = progressRef.current
      if (!element) return
      element.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`
      element.parentElement?.setAttribute(
        'aria-valuenow',
        String(Math.round(progress * 100))
      )
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const sectionLinks = [
    { id: 'personal', label: personalLabel, count: counts.personal },
    { id: 'work', label: workLabel, count: counts.work },
    { id: 'archive', label: archiveLabel, count: counts.archive },
  ]

  return (
    <nav
      className={`section-locator${hasScrolled ? ' is-visible' : ''}`}
      aria-label="Portfolio sections"
    >
      <div className="section-locator__desktop">
        {sectionLinks.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={activeSection === section.id ? 'location' : undefined}
          >
            <span>{section.label}</span>
            <em>{section.count}</em>
          </a>
        ))}
        <span
          className="project-cells"
          aria-label={`${sectionLinks.find((section) => section.id === activeSection)?.label ?? personalLabel} project shortcuts`}
        >
          {visibleProjects.map((project, index) => (
            <a
              key={project.id}
              href={
                activeSection === 'work'
                  ? `#work-${project.id}`
                  : `#${project.id}`
              }
              aria-label={`${index + 1}. ${project.title}`}
              aria-current={
                activeSection === 'personal' && project.id === activeProjectId
                  ? 'location'
                  : undefined
              }
            />
          ))}
        </span>
        {motionPowerControl}
      </div>

      <details className="section-locator__mobile">
        <summary>
          {activeSection === 'personal'
            ? `${personalLabel} · ${activeIndex + 1}/${visibleProjects.length}`
            : sectionLinks.find((section) => section.id === activeSection)
                ?.label}
        </summary>
        <div>
          {sectionLinks.map((section) => (
            <div className="section-locator__mobile-group" key={section.id}>
              <a href={`#${section.id}`}>
                {section.label} <em>{section.count}</em>
              </a>
              {section.id === 'personal' ? (
                <div className="section-locator__mobile-personal-projects">
                  {personalProjects.map((project, index) => (
                    <a key={project.id} href={`#${project.id}`}>
                      {index + 1}. {project.title}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
      </div>
        <div className="motion-power-control--mobile">
          {motionPowerControl}
        </div>
      </details>

      <span
        className="document-progress"
        role="progressbar"
        aria-label="Document progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
      >
        <span ref={progressRef} />
      </span>
    </nav>
  )
}
