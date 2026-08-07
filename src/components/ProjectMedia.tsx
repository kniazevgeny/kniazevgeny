import { useEffect, useRef, useState } from 'react'
import type { FeaturedMedia } from '../data/site'

export type ProjectMediaElement = HTMLImageElement | HTMLVideoElement

type ProjectMediaProps = {
  media: FeaturedMedia
  title: string
  active: boolean
  first: boolean
  reducedMotion: boolean
  animationKey?: number
  onElement: (element: ProjectMediaElement | null) => void
}

export const ProjectMedia = ({
  media,
  title,
  active,
  first,
  reducedMotion,
  animationKey = 0,
  onElement,
}: ProjectMediaProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || media.kind !== 'video') return

    const stop = () => {
      video.pause()
    }
    const sync = () => {
      if (!active || document.hidden) {
        stop()
      }
    }

    sync()
    document.addEventListener('visibilitychange', sync)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [active, media.kind, reducedMotion])

  if (media.kind === 'placeholder') {
    return (
      <div
        className="project-media project-media--placeholder"
        role="img"
        aria-label={media.alt}
      >
        <span aria-hidden="true">NO MEDIA / YET</span>
        <strong>{title}</strong>
      </div>
    )
  }

  if (media.kind === 'video') {
    return (
      <div className={`project-video${hasStarted ? ' is-started' : ''}`}>
        <video
          ref={(element) => {
            videoRef.current = element
          }}
          className="project-media project-video__source"
          src={media.src}
          aria-label={media.alt}
          controls
          controlsList="nofullscreen"
          muted
          playsInline
          preload={first ? 'metadata' : 'none'}
          onPlay={() => setHasStarted(true)}
        />
        {media.poster && !hasStarted ? (
          <>
            <img
              key={`${media.poster}-${animationKey}`}
              className="project-media project-video__poster"
              src={media.poster}
              alt=""
              aria-hidden="true"
              ref={onElement}
            />
            <button
              className="project-video__play"
              type="button"
              onClick={() => void videoRef.current?.play()}
            >
              Play demo
            </button>
          </>
        ) : null}
      </div>
    )
  }

  return (
    <img
      key={media.src}
      ref={onElement}
      className="project-media"
      src={media.src}
      alt={media.alt}
      loading={first ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
