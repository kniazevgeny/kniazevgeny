import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('English page renders the approved information hierarchy', async () => {
  const html = await readFile(
    new URL('../dist/index.html', import.meta.url),
    'utf8'
  )
  const personal = html.indexOf('id="personal"')
  const work = html.indexOf('id="work"')
  const archive = html.indexOf('id="archive"')

  assert.ok(personal > -1 && personal < work && work < archive)

  for (const title of [
    'Loto+Art',
    'Atmosphere-Aware Place Discovery',
    'Whimbean',
    'Graph-based methods for analyzing and interpreting genomic data',
  ]) {
    assert.match(html, new RegExp(title.replace('+', '\\+')))
  }

  assert.doesNotMatch(html.slice(personal, work), /PeerHub/)

  assert.match(html, /section-locator__mobile-personal-projects/)
  assert.match(html, /class="hero-black-hole-canvas"/)
  assert.match(html, /aria-hidden="true"/)
  assert.match(html, /hero-organic-line hero-organic-line--right/)
  assert.match(html, /class="work-card__body"/)
  assert.match(html, /soulbody-1-m\.[^" ]+\.webp/)
})

test('archive opens its first project and keeps other rows label-free', async () => {
  const html = await readFile(
    new URL('../dist/index.html', import.meta.url),
    'utf8'
  )
  const archive = html.slice(html.indexOf('id="archive"'))
  const entries = [...archive.matchAll(/<details\b[^>]*class="project-details[^>]*>/g)]

  assert.ok(entries.length > 1)
  assert.match(entries[0][0], /\sopen(?:\s|=|>)/)
  assert.doesNotMatch(archive, /class="toggle-label"/)
})
