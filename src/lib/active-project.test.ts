import assert from 'node:assert/strict'
import test from 'node:test'
import { publishActiveProject } from './active-project.ts'

test('publishes a changed project before the active stage is updated', () => {
  const published: string[] = []

  const changed = publishActiveProject('loto-art', 'saved-spots', (projectId) => {
    published.push(projectId)
  })

  assert.equal(changed, true)
  assert.deepEqual(published, ['saved-spots'])
})

test('does not republish the current project', () => {
  const published: string[] = []

  const changed = publishActiveProject('loto-art', 'loto-art', (projectId) => {
    published.push(projectId)
  })

  assert.equal(changed, false)
  assert.deepEqual(published, [])
})
