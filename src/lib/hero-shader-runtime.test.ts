import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getHeroCanvasActivity,
  getHeroCanvasSize,
  getHeroRenderState,
} from './hero-shader-runtime.ts'

test('render policy waits for visibility and document availability', () => {
  assert.deepEqual(getHeroRenderState(false, true, false), {
    shouldRender: true,
    reason: 'ready',
  })
  assert.equal(getHeroRenderState(true, true, false).shouldRender, false)
  assert.equal(getHeroRenderState(false, false, false).reason, 'offscreen')
  assert.equal(getHeroRenderState(false, true, true).reason, 'hidden')
})

test('canvas size respects device-pixel and maximum bounds', () => {
  const size = getHeroCanvasSize(2000, 1200, 2, {
    pixelRatioCap: 1.25,
    maxWidth: 1400,
    maxHeight: 900,
    motionEnabled: true,
  })

  assert.deepEqual(size, { width: 1400, height: 900 })
})

test('a successfully initialized canvas becomes active again when rendering resumes', () => {
  assert.equal(
    getHeroCanvasActivity(true, getHeroRenderState(false, true, false)),
    true
  )
  assert.equal(
    getHeroCanvasActivity(true, getHeroRenderState(false, false, false)),
    false
  )
})
