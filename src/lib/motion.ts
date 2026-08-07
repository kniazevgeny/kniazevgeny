export type MotionMode = 'normal' | 'overdrive'

export type MotionControls = {
  mode: MotionMode
  timeScale: number
  power: number
}

export const baseRevealDurationMs = 1300

const normalControls: MotionControls = {
  mode: 'normal',
  timeScale: 1,
  power: 1,
}

const overdriveControls: MotionControls = {
  mode: 'overdrive',
  timeScale: 2,
  power: 2.4,
}

let controls = normalControls
const listeners = new Set<(next: MotionControls) => void>()

export const getMotionControls = () => controls

export const getMotionDurationMs = (base = baseRevealDurationMs) =>
  Math.round(base * controls.timeScale)

const publishMotionControls = () => {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.motionMode = controls.mode
    document.documentElement.style.setProperty(
      '--motion-time-scale',
      String(controls.timeScale)
    )
    document.documentElement.style.setProperty(
      '--motion-power',
      String(controls.power)
    )
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('portfolio-motion-change'))
  }
  listeners.forEach((listener) => listener(controls))
}

export const setMotionControls = (
  next: Partial<Pick<MotionControls, 'timeScale' | 'power'>> &
    Partial<Pick<MotionControls, 'mode'>>
) => {
  controls = {
    mode: next.mode ?? controls.mode,
    timeScale: Math.max(0.25, Math.min(4, next.timeScale ?? controls.timeScale)),
    power: Math.max(0, Math.min(4, next.power ?? controls.power)),
  }
  publishMotionControls()
}

export const setMotionMode = (mode: MotionMode) => {
  const preset = mode === 'overdrive' ? overdriveControls : normalControls
  setMotionControls(preset)
}

export const subscribeMotionControls = (
  listener: (next: MotionControls) => void
) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const installMotionControls = () => {
  if (typeof window === 'undefined') return
  const queryMode = new URLSearchParams(window.location.search).get('overdrive')
  setMotionMode(queryMode === '1' || queryMode === 'true' ? 'overdrive' : 'normal')
  window.portfolioMotion = {
    get: getMotionControls,
    setMode: setMotionMode,
    setControls: setMotionControls,
    setOverdrive: (enabled: boolean) =>
      setMotionMode(enabled ? 'overdrive' : 'normal'),
  }
}

declare global {
  interface Window {
    portfolioMotion?: {
      get: typeof getMotionControls
      setMode: typeof setMotionMode
      setControls: typeof setMotionControls
      setOverdrive: (enabled: boolean) => void
    }
  }
}
