import type { HeroShaderConfig } from './hero-shader'

export type HeroRenderState = {
  shouldRender: boolean
  reason: 'ready' | 'reduced-motion' | 'hidden' | 'offscreen'
}

export const getHeroRenderState = (
  reducedMotion: boolean,
  isVisible: boolean,
  documentHidden: boolean
): HeroRenderState => {
  if (reducedMotion) return { shouldRender: false, reason: 'reduced-motion' }
  if (documentHidden) return { shouldRender: false, reason: 'hidden' }
  if (!isVisible) return { shouldRender: false, reason: 'offscreen' }
  return { shouldRender: true, reason: 'ready' }
}

export const getHeroCanvasActivity = (
  initialized: boolean,
  renderState: HeroRenderState
) => initialized && renderState.shouldRender

export const getHeroCanvasSize = (
  width: number,
  height: number,
  devicePixelRatio: number,
  config: HeroShaderConfig
) => {
  const pixelRatio = Math.min(Math.max(devicePixelRatio || 1, 1), config.pixelRatioCap)
  return {
    width: Math.min(config.maxWidth, Math.max(1, Math.round(width * pixelRatio))),
    height: Math.min(config.maxHeight, Math.max(1, Math.round(height * pixelRatio))),
  }
}
