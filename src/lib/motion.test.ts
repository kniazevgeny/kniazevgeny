import assert from 'node:assert/strict'
import test from 'node:test'
import { getMotionControls, setMotionMode } from './motion.ts'

test('motion presets use the default and maximum scales consistently', () => {
  setMotionMode('normal')
  assert.deepEqual(getMotionControls(), {
    mode: 'normal',
    timeScale: 1,
    power: 1,
  })

  setMotionMode('overdrive')
  assert.deepEqual(getMotionControls(), {
    mode: 'overdrive',
    timeScale: 2,
    power: 2.4,
  })

  setMotionMode('normal')
})
