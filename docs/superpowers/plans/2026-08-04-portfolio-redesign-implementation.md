# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Astro portfolio around an informative hero, a persistent section locator, scroll-led personal project chapters, calmer work cards, a hierarchical archive, and accessible deterministic media effects for screenshots or 1–2 MB muted MP4 demos.

**Architecture:** Keep all content server-rendered through the existing React component, then hydrate that single island for `IntersectionObserver`, progress, media playback, and the one reusable effect stage. Put stable effect assignment and project grouping in pure TypeScript modules; keep WebGL decorative, single-context, short-lived, and backed by complete CSS/SVG fallbacks.

**Tech Stack:** Astro 7 static output, React 19, TypeScript 6, Sass, native IntersectionObserver, native WebGL 1, native HTML image/video/details elements, Node test runner.

## Global Constraints

- Personal order is Loto+Art, Saved Spots Explorer, Whimbean, TER research.
- PeerHub is not featured.
- Page order is Hero, Personal Projects, Work, Archive.
- External project destinations open in a new tab; there are no internal case-study routes.
- Actual image/video media stays sharp after each reveal and is never replaced by decorative content.
- Featured media supports square or 16:9 images and silent inline MP4 files around 1–2 MB.
- Desktop uses an approximately 60/40 sticky-stage layout; mobile uses normal media-then-copy flow.
- Effects combine at most one major reveal and one accent, are stable by project ID, run only on first meaningful activation, and settle within 950 ms.
- Chromatic aberration is image-dependent, applies only to media, and never applies to text.
- `prefers-reduced-motion` removes displacement, autoplay, WebGL, and large transforms.
- No scroll snapping, nested scrollers, scroll hijacking, persistent filters, permanent animation loops, heavy black sections, broad decorative gradients, or glass design system.
- Reserve every media ratio and keep decorative layers absolutely positioned so expected CLS stays below 0.05.

---

### Task 1: Deterministic Effect and Project Grouping Contracts

**Files:**
- Create: `src/lib/effects.ts`
- Create: `src/lib/effects.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `type MajorEffect = 'incision' | 'anamorphic' | 'organic-matte' | 'iris-gate'`
- Produces: `type EffectAccent = 'chromatic' | 'prism' | 'type-squeeze' | 'halation'`
- Produces: `type EffectProfile = { major: MajorEffect; accent: EffectAccent }`
- Produces: `getEffectProfile(projectId: string, override?: Partial<EffectProfile>): EffectProfile`

- [ ] **Step 1: Write the failing deterministic-profile test**

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { getEffectProfile } from './effects.ts'

test('effect assignment is stable and covers one major plus one accent', () => {
  const first = getEffectProfile('whimbean')
  assert.deepEqual(first, getEffectProfile('whimbean'))
  assert.ok(['incision', 'anamorphic', 'organic-matte', 'iris-gate'].includes(first.major))
  assert.ok(['chromatic', 'prism', 'type-squeeze', 'halation'].includes(first.accent))
})

test('an explicit project override wins without randomizing the other axis', () => {
  const derived = getEffectProfile('ter')
  const overridden = getEffectProfile('ter', { major: 'organic-matte' })
  assert.equal(overridden.major, 'organic-matte')
  assert.equal(overridden.accent, derived.accent)
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test --experimental-strip-types src/lib/effects.test.ts`
Expected: FAIL because `src/lib/effects.ts` does not exist.

- [ ] **Step 3: Implement the stable FNV-1a mixer**

```ts
export type MajorEffect = 'incision' | 'anamorphic' | 'organic-matte' | 'iris-gate'
export type EffectAccent = 'chromatic' | 'prism' | 'type-squeeze' | 'halation'
export type EffectProfile = { major: MajorEffect; accent: EffectAccent }

const majors: readonly MajorEffect[] = ['incision', 'anamorphic', 'organic-matte', 'iris-gate']
const accents: readonly EffectAccent[] = ['chromatic', 'prism', 'type-squeeze', 'halation']

const stableHash = (value: string) => {
  let hash = 0x811c9dc5
  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

export const getEffectProfile = (
  projectId: string,
  override: Partial<EffectProfile> = {}
): EffectProfile => {
  const hash = stableHash(projectId)
  return {
    major: override.major ?? majors[hash % majors.length],
    accent: override.accent ?? accents[(hash >>> 8) % accents.length],
  }
}
```

- [ ] **Step 4: Add and run the unit-test script**

Add `"test:unit": "node --test --experimental-strip-types src/lib/*.test.ts"` to `package.json`.

Run: `npm run test:unit`
Expected: two passing tests.

- [ ] **Step 5: Commit**

```bash
git add package.json src/lib/effects.ts src/lib/effects.test.ts
git commit -m "test: define deterministic portfolio effects"
```

### Task 2: Presentation-Aware Portfolio Data

**Files:**
- Modify: `src/data/site.ts`
- Create: `tests/portfolio-output.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Adds: `ProjectSection = 'personal' | 'work' | 'archive'`
- Adds: `FeaturedMedia = { kind: 'image'; src: string; alt: string; aspect: 'square' | 'wide' } | { kind: 'video'; src: string; poster: string; alt: string; aspect: 'square' | 'wide' } | { kind: 'placeholder'; alt: string; aspect: 'square' | 'wide' }`
- Adds to `Project`: `section`, `media`, `role`, `state`, `output`, and optional `effectOverride`
- Produces from `getSiteContent`: `personalProjects`, `workProjects`, `archiveYears`, and derived counts.

- [ ] **Step 1: Write the failing rendered-content test**

```js
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('English page renders the approved information hierarchy', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8')
  const personal = html.indexOf('id="personal"')
  const work = html.indexOf('id="work"')
  const archive = html.indexOf('id="archive"')
  assert.ok(personal > -1 && personal < work && work < archive)
  for (const title of ['Loto+Art', 'Saved Spots Explorer', 'Whimbean', 'TER research']) {
    assert.match(html, new RegExp(title.replace('+', '\\+')))
  }
  assert.doesNotMatch(html.slice(personal, work), /PeerHub/)
})
```

- [ ] **Step 2: Run current build and verify the new test fails**

Run: `npm run build && node --test tests/portfolio-output.test.mjs`
Expected: FAIL because the current page has neither `#personal` nor `#work` and lacks the new personal records.

- [ ] **Step 3: Extend types and add localized personal records**

Import `whimbean-1-m.png?url` and `bspb-1-m.webp?url`. Add localized synthetic records for:

```ts
const personalRecords = {
  en: [
    { id: 'loto-art', title: 'Loto+Art', summary: 'A generator of loto tiles with artwork placed into selected cells.', type: 'Generative tool' },
    { id: 'saved-spots', title: 'Saved Spots Explorer', summary: 'A visual explorer for places saved from Google Maps.', type: 'Personal utility' },
    { id: 'whimbean', title: 'Whimbean', summary: 'Vibe-based place discovery: explore a city by mood, not categories.', type: 'AI place discovery' },
    { id: 'ter', title: 'TER research', summary: 'Current research material; a clearer English edition will follow.', type: 'Research' },
  ],
  ru: [
    { id: 'loto-art', title: 'Loto+Art', summary: 'Генератор карточек лото, где в выбранных клетках появляется искусство.', type: 'Генеративный инструмент' },
    { id: 'saved-spots', title: 'Saved Spots Explorer', summary: 'Визуальный исследователь мест, сохранённых из Google Maps.', type: 'Личный инструмент' },
    { id: 'whimbean', title: 'Whimbean', summary: 'Поиск мест по атмосфере: исследуйте город по настроению, а не по категориям.', type: 'AI-поиск мест' },
    { id: 'ter', title: 'TER research', summary: 'Текущий материал исследования; ясная английская версия появится позже.', type: 'Исследование' },
  ],
} as const
```

Use placeholders for Loto+Art and Saved Spots, the Whimbean image/logo for Whimbean, and the existing BSPB research screenshot as the temporary TER media. Preserve support for a future `{ kind: 'video' }` without requiring a video asset now.

- [ ] **Step 4: Classify work and archive without duplication**

Use work IDs `lip`, `easytix`, `soulbody`, `smlt`, and `munk`. Remove personal and work IDs from `archiveYears`; PeerHub remains in Archive. Keep the one-project-year child open behavior.

- [ ] **Step 5: Add render-test scripts and verify data compiles**

Add `"test:render": "npm run build && node --test tests/portfolio-output.test.mjs"`.

Run: `npm run test:unit && npm run test:render`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add package.json src/data/site.ts tests/portfolio-output.test.mjs
git commit -m "feat: model personal work and archive projects"
```

### Task 3: Hydrated Locator and Scroll Chapters

**Files:**
- Create: `src/components/SectionLocator.tsx`
- Create: `src/components/FeaturedProjects.tsx`
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/ru/index.astro`
- Modify: `tests/portfolio-output.test.mjs`

**Interfaces:**
- `SectionLocator` consumes counts, active section/project, progress, localized labels.
- `FeaturedProjects` consumes personal projects and reports `onActiveProject(projectId)`.
- `Portfolio` owns the observer state and supplies `aria-current` and the stable active project.

- [ ] **Step 1: Extend the failing render test for locator semantics**

Assert that built HTML contains `aria-label="Portfolio sections"`, links to `#personal`, `#work`, `#archive`, four project-cell links, and a progress element with `role="progressbar"`.

- [ ] **Step 2: Verify RED**

Run: `npm run test:render`
Expected: FAIL because locator markup is absent.

- [ ] **Step 3: Implement the sticky locator**

Render only navigation in its sticky header—no repeated name. Desktop text is `Personal 4`, `Work N`, `Archive N`; Personal also renders four cells. Mobile renders `Personal · 1/4` inside a native `<details>` jump index. Use anchor links for every destination and `aria-current="location"` for the active one.

- [ ] **Step 4: Implement normal-scroll project chapters**

Use a 60/40 grid. The left stage is sticky with `height:min(72svh,42rem)` and a stable inner aspect box. Right chapters have `min-height:74svh`, semantic headings, metadata, copy, and visible external links. Observe `[data-project-chapter]` with `rootMargin: '-35% 0px -45% 0px'`; choose the chapter center nearest the viewport center and do not use scroll snapping.

- [ ] **Step 5: Hydrate the single React island**

Change both Astro pages to `<Portfolio client:load content={content} locale="…" />`. Keep all headings, copy, links, media fallback, Work, and Archive server-rendered.

- [ ] **Step 6: Implement progress without React scroll rerenders**

Use one passive scroll listener plus one pending `requestAnimationFrame`. Write `transform: scaleX(progress)` directly to the progress bar ref and update `aria-valuenow`; remove the listener and cancel the frame on cleanup.

- [ ] **Step 7: Verify**

Run: `npm run test:unit && npm run test:render`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/components/SectionLocator.tsx src/components/FeaturedProjects.tsx src/components/Portfolio.tsx src/pages/index.astro src/pages/ru/index.astro tests/portfolio-output.test.mjs
git commit -m "feat: add scroll-led personal project chapters"
```

### Task 4: Reusable Media Stage, Video Lifecycle, and Effects

**Files:**
- Create: `src/components/ProjectMedia.tsx`
- Create: `src/components/MediaEffectCanvas.tsx`
- Modify: `src/components/FeaturedProjects.tsx`
- Modify: `src/styles/main.scss`

**Interfaces:**
- `ProjectMedia` consumes `FeaturedMedia`, `active`, `first`, and a media-element ref callback.
- `MediaEffectCanvas` consumes the active image/video element, `EffectProfile`, `playToken`, and `reducedMotion`.
- The canvas exposes no interaction, uses `aria-hidden="true"`, and stops all rendering after the reveal.

- [ ] **Step 1: Add a unit test for the four project profiles**

Assert the four approved personal IDs yield stable profiles and that an explicit override remains stable. Verify RED only if additional mixer behavior is required; otherwise keep the existing tests green while adding the consumer.

- [ ] **Step 2: Implement image, video, and placeholder media**

Images get meaningful `alt`, intrinsic width/height where known, `decoding="async"`, and only the first image loads eagerly. Videos use `muted`, `playsInline`, `preload="metadata"`, a poster, and no loop. On activation play once for at most four seconds; on deactivation, tab hide, or reduced motion, pause immediately. Placeholders contain only project title/type and never imitate product UI.

- [ ] **Step 3: Implement one-pass image-dependent WebGL aberration**

Use one texture and one fragment shader. Sample red, green, and blue at small opposing UV offsets, multiply the result by a smooth media-edge falloff, and render only while `elapsed < 650 ms`. For video, update the same texture from the current frame; never create duplicate video elements. Stop `requestAnimationFrame`, clear the canvas, and set it hidden after settle or context loss.

- [ ] **Step 4: Implement CSS/SVG major-effect fallbacks**

- `incision`: irregular clip path, delayed contour, and type squeeze.
- `anamorphic`: `scaleX(.22)` to `scaleX(1)` with one horizontal SVG flare.
- `organic-matte`: three static radial-gradient alpha masks whose scale/size is staggered from center to edges.
- `iris-gate`: circle/ellipse clip reveal with subtle exposure opacity and at most 2 px gate weave.

All fixed sequences use strong custom ease-out/ease-in-out curves, run only on first activation, and settle under 950 ms. Re-entry uses at most a 160 ms opacity transition.

- [ ] **Step 5: Implement fallbacks and accessibility**

If WebGL setup, texture upload, or context restoration fails, reveal the normal image/video immediately and retain the vector media-edge accent. Under `prefers-reduced-motion`, render static media and do not autoplay video or create a WebGL context.

- [ ] **Step 6: Verify build and runtime cleanup**

Run: `npm run build`
Expected: Astro check and static build pass with no TypeScript errors.

Manually confirm in browser DevTools that no animation frame callback continues after settle, only one canvas/context exists, and inactive videos are paused.

- [ ] **Step 7: Commit**

```bash
git add src/components/ProjectMedia.tsx src/components/MediaEffectCanvas.tsx src/components/FeaturedProjects.tsx src/styles/main.scss
git commit -m "feat: add accessible deterministic media reveals"
```

### Task 5: Hero, Work, Archive, and Complete Visual System

**Files:**
- Modify: `src/components/Portfolio.tsx`
- Modify: `src/styles/main.scss`
- Modify: `src/data/site.ts`
- Modify: `tests/portfolio-output.test.mjs`

**Interfaces:**
- Consumes the presentation groups from Task 2 and locator state from Task 3.
- Produces final semantic sections `#personal`, `#work`, and `#archive` with no duplicated projects.

- [ ] **Step 1: Extend render assertions**

Assert the hero contains the name, role, education, intro, links, and language switcher; Work precedes Archive; Munk and Soulbody occur in Work; Archive year summaries remain native `<details>`.

- [ ] **Step 2: Verify RED for the final section markup**

Run: `npm run test:render`
Expected: FAIL until the Work section and revised hero are present.

- [ ] **Step 3: Rebuild the hero**

Keep mobile near `80svh`. Remove the broad decorative gradient and old black wave. Use warm off-white, useful copy, restrained organic edge lines, two initially white circles, tiny calibration marks, and one controlled irregular notch/spike. Keep the name human-scale rather than a giant `FULLSTACK ENGINEER` headline.

- [ ] **Step 4: Build Work cards with media on the left**

Render a calmer responsive grid/list. Existing images stay on the left; title, year/type, concise summary, role/output metadata, and external link stay visible on the right. Do not give Work the sticky Personal treatment.

- [ ] **Step 5: Refine Archive hierarchy**

Keep native year/project details. Increase margin, boundary contrast, and background distinction while open. If a year has one project, render that child `open` so the single click exposes its content. Keep image previews horizontally scrollable without bloating page width.

- [ ] **Step 6: Apply the tabloid-kitsch graphic language sparingly**

Use one artifact per active personal project: a chrome micro-symbol, faux-system label, star/heart/flame, pixel counter, or stretched wordmark. Keep one large headline, no more than two small annotations, and one graphic artifact around the media; settled content remains clear.

- [ ] **Step 7: Finish responsive, focus, contrast, and forced-color rules**

At `800px` disable sticky positioning and render each media before its chapter. Support 320 CSS px and 400% zoom without page-level horizontal scrolling. Add visible `:focus-visible`, non-color active states, touch-safe hover media queries, reduced motion, `prefers-contrast`, and `forced-colors` fallbacks.

- [ ] **Step 8: Verify**

Run: `npm run test:unit && npm run test:render`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/components/Portfolio.tsx src/data/site.ts src/styles/main.scss tests/portfolio-output.test.mjs
git commit -m "feat: complete yohaku portfolio redesign"
```

### Task 6: Final Verification and Performance Audit

**Files:**
- Modify if evidence requires: files changed in Tasks 1–5
- Modify: `README.md`

- [ ] **Step 1: Run automated verification**

Run: `npm run test:unit && npm run test:render`
Expected: all tests, Astro check, and static build pass with no errors.

- [ ] **Step 2: Run static quality checks**

Run: `npx prettier --check src package.json astro.config.mjs tsconfig.json`
Expected: all matched files use Prettier formatting.

Run: `git diff --check`
Expected: no whitespace errors.

- [ ] **Step 3: Run accessibility checks manually**

Verify keyboard-only traversal, heading order, landmarks, `aria-current`, locator links, external-link behavior, reduced motion, forced colors, 320 px reflow, and 400% zoom. Confirm no information requires hover, animation, canvas, or JavaScript.

- [ ] **Step 4: Run motion/performance checks manually**

Record one complete Personal scroll in Chromium Performance tools and one physical mobile browser if available. Confirm no long task over 50 ms during activation, no sustained frames after settle, no more than one WebGL context, inactive videos paused, and CLS below 0.05. If a constrained device misses frame budget, disable the expensive modifier there and retain the CSS/SVG fallback.

- [ ] **Step 5: Document media replacement**

Update README with the `ProjectMedia` image/video fields, the 1–2 MB muted MP4 recommendation, poster requirement, square/wide aspect values, and the rule that only the active video plays.

- [ ] **Step 6: Final commit**

```bash
git add README.md src tests package.json
git commit -m "docs: document portfolio media and verification"
```
