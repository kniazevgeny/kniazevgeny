import assert from 'node:assert/strict'
import test from 'node:test'
import { getEffectProfile, revealDurationMs } from './effects.ts'

test('reveal cleanup is aligned with the visual effect duration', () => {
  assert.equal(revealDurationMs, 1300)
})

test('effect assignment is stable and covers one major plus one accent', () => {
  const first = getEffectProfile('whimbean')

  assert.deepEqual(first, getEffectProfile('whimbean'))
  assert.ok(
    ['incision', 'anamorphic', 'organic-matte', 'iris-gate'].includes(
      first.major
    )
  )
  assert.ok(
    ['chromatic', 'prism', 'type-squeeze', 'halation'].includes(first.accent)
  )
})

test('an explicit project override wins without randomizing the other axis', () => {
  const derived = getEffectProfile('ter')
  const overridden = getEffectProfile('ter', { major: 'organic-matte' })

  assert.equal(overridden.major, 'organic-matte')
  assert.equal(overridden.accent, derived.accent)
})
