import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getHeroPaletteIndex,
  getHeroShaderConfig,
  heroFragmentShaderSource,
  heroVertexShaderSource,
} from './hero-shader.ts'

test('reduced motion disables the hero shader without changing its render limits', () => {
  const normal = getHeroShaderConfig(false)
  const reduced = getHeroShaderConfig(true)

  assert.equal(normal.motionEnabled, true)
  assert.equal(reduced.motionEnabled, false)
  assert.equal(reduced.pixelRatioCap, normal.pixelRatioCap)
  assert.equal(reduced.maxWidth, normal.maxWidth)
  assert.equal(reduced.maxHeight, normal.maxHeight)
})

test('hero shader sources expose the procedural field uniforms', () => {
  assert.match(heroVertexShaderSource, /aPosition/)
  assert.match(heroFragmentShaderSource, /uTime/)
  assert.match(heroFragmentShaderSource, /uResolution/)
  assert.match(heroFragmentShaderSource, /uCenter/)
  assert.match(heroFragmentShaderSource, /uSecondCenter/)
  assert.match(heroFragmentShaderSource, /uIntensity/)
  assert.match(heroFragmentShaderSource, /uSecondIntensity/)
  assert.match(heroFragmentShaderSource, /uPalette/)
  assert.match(heroFragmentShaderSource, /gl_FragColor/)
})

test('entry palette selection stays within the four curated choices', () => {
  assert.equal(getHeroPaletteIndex(0), 0)
  assert.equal(getHeroPaletteIndex(0.24), 0)
  assert.equal(getHeroPaletteIndex(0.25), 1)
  assert.equal(getHeroPaletteIndex(0.99), 3)
})
