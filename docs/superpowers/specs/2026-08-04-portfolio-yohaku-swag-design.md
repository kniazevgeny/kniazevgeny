# Portfolio redesign: yohaku, tension, and accessible swag

Date: 2026-08-04  
Status: Approved design direction

## Intent

The portfolio should be memorable through tension rather than constant visual volume. Its calm side is inspired by 余白 (yohaku): deliberate empty space, restraint, and readable structure. Its disruptive side uses bright micro-accents, irregular forms, stretched type, and short moments of digital deformation.

Neither side works alone. Pure restraint feels sterile; unrestricted provocation becomes noise. The site should remain informative and highly accessible while allowing a few controlled moments of visual possession.

## Goals

- Keep the main page informative enough for a visitor making a quick hiring or collaboration decision.
- Put self-directed projects before professional work.
- Let visitors understand the page's scope, their current position, and available shortcuts without opening a menu.
- Show personal projects one at a time through normal scrolling, without scroll hijacking.
- Use real MP4 demos and screenshots as the primary featured media.
- Add distinctive motion and distortion as progressive enhancement without making content depend on CSS effects, JavaScript, SVG filters, or WebGL.
- Meet WCAG 2.2 AA and remain usable with a keyboard, assistive technology, reduced motion, high contrast, zoom, slow hardware, or JavaScript disabled.

## Non-goals

- No dedicated internal case-study pages in this iteration.
- No heavy black page sections, full-screen red fields, or broad decorative gradients.
- No glass-based design system. Glass is not part of the approved swag language.
- No persistent RGB split, VHS scanlines, perpetual noise, shaking, or generic full-page glitch treatment. A very short chromatic-aberration burst is allowed only as part of a project reveal and must disappear before the media settles.
- No giant hero title that replaces useful information.
- No forced scroll snapping, nested page scrollers, or scroll hijacking.
- No decorative replacement for real project media.
- No information or controls available only through hover, animation, or color.

## Information architecture

The main page order is:

1. Hero
2. Personal Projects
3. Work
4. Archive

The useful parts of the existing Story/About copy are condensed into the hero introduction and its optional “More context” disclosure. There is no separate Story navigation destination or full-width Story section in this iteration.

### Hero

The hero remains calm and information-rich. It contains:

- name;
- full-stack engineer role;
- concise product/engineering positioning;
- two short introductory paragraphs;
- education;
- location when available;
- CV, GitHub, Telegram, LinkedIn, email, and writing links;
- language switcher.

The hero may include thin organic line art and small calibration-color marks, but no oversized display headline or large decorative gradient.

### Personal Projects

Personal projects appear in this fixed narrative order:

1. Loto+Art — a generator of loto tiles with artwork in selected cells;
2. Saved Spots Explorer — an explorer built from saved Google Maps places;
3. Whimbean;
4. TER research.

Each project is a scroll chapter, not an accordion and not a separate internal page. A chapter contains the project's name, year/type, concise explanation, role, state, output, technology or method where useful, and one external link. External destinations open in a new tab with clear accessible link text.

Loto+Art, Saved Spots Explorer, and Whimbean use real MP4 demos when supplied. TER uses a real screenshot. The implementation may temporarily show a neutral static poster with the project name when an asset has not yet been supplied; it must not invent substitute product imagery.

### Work

Professional and client work follows Personal Projects. It is denser and calmer than the featured section. Initial examples include LiP Drug Discovery Platform, Easytix, Soulbody, Samolet+ Rental, Munk, and other existing records.

Work entries retain useful metadata, a short description, and external links. They do not receive the full sticky poster treatment, so the personal work remains the page's primary authored statement.

### Archive

The Archive remains grouped by year. Existing hierarchy improvements remain valid: open years and projects receive visible spacing, a raised container, and a clear child lane. A year with one project may open that project automatically.

## Orientation and jump navigation

The selected navigation model is a compact sticky section map. It contains only navigation, not the portfolio owner's name.

Desktop labels:

- `Personal 4`
- `Work N`
- `Archive N`

The counts are derived from data rather than hard-coded. While Personal is active, four small project cells show the total and current project. Each section label and project cell is an anchor link. The active destination is conveyed through text/shape as well as color.

A thin progress line at the bottom of the map shows overall document progress. The progress indicator has an accessible name and value. The current section or project exposes `aria-current` where appropriate.

On mobile, the map collapses to a locator such as `Personal · 2/4`. Activating it opens a complete jump index with the three sections and four personal projects. The language switcher remains in the hero rather than this navigation map.

The navigation answers three visitor jobs:

1. Understand the portfolio's scope before committing to a long scroll.
2. Stay oriented within the current section and project.
3. Jump directly to relevant material.

## Featured layout

### Desktop

Personal Projects uses a two-column layout at sufficiently wide viewports:

- approximately 60% for a sticky visual stage;
- approximately 40% for the scrolling project chapters.

The visual stage is a light artboard, not a vertically cropped image. It is sticky below the navigation map with `height: min(72svh, 42rem)`. Sticky behavior is disabled below the content breakpoint where the two columns can no longer maintain a 60/40 split without either column becoming narrower than 20rem; the initial implementation breakpoint is 800px.

Each text chapter has a minimum rhythm close to 74svh but grows naturally when its content requires more space. There is no fixed chapter height and no clipped text.

The real media keeps its source ratio:

- square content renders at `1:1` and receives more side space;
- horizontal content renders at `16:9` and uses more of the stage width.

The stage does not jump when the active media ratio changes. Empty space around the media holds project number, labels, title treatment, fine lines, and short decorative mutations.

An `IntersectionObserver` active band selects the chapter nearest the meaningful center of the viewport. The initial observer uses `rootMargin: -35% 0px -45% 0px`; if two chapters intersect, the chapter whose center is closest to the active band's center wins. The active project changes only when the winner changes, preventing oscillation at chapter boundaries.

### Mobile and narrow layouts

Sticky positioning is disabled. Each personal project becomes normal document flow:

1. media at its natural `1:1` or `16:9` ratio;
2. title and metadata;
3. description and external link.

There is no fixed media height, horizontal scrolling, or snap behavior. The next project should be slightly discoverable through spacing and the compact locator, not by clipping content.

## Visual language

### Calm layer

- Warm off-white page field and near-black text.
- Generous negative space with a clear editorial grid.
- Human-scale serif/sans contrast rather than an oversized display hero.
- Fine organic or specimen-like line art at edges.
- Thin rules, visible hierarchy, and readable metadata.

### Disruptive layer

- Small high-saturation calibration accents: pink, green, blue, and yellow.
- Accent color covers only a small minority of any viewport and never becomes a full section background.
- Irregular stamps, line breaks, stretched decorative type copies, and shapes that escape the grid.
- Sparse 2000s-kitsch artifacts—such as a chrome micro-symbol, faux-system label, tiny flame/star/heart, pixel counter, or stretched wordmark—used as project-specific punctuation rather than a site-wide Y2K skin.
- One major disturbance per viewport, supported by smaller persistent irregularities.

The disruptive layer must not cover meaningful text or settled project media. It should feel like the interface's boundaries are briefly being stressed, not like the product screenshot is unreadable.

## Real media and swag behavior

The real MP4 demo or TER screenshot is always the primary visual evidence. Decorative project proxies are not part of the final design.

When a personal chapter becomes active:

1. Its real media enters or becomes visible at the correct aspect ratio.
2. An edge-incision line traces the temporary opening boundary of the media.
3. A delayed contour catches up to the opening while a decorative title briefly squeezes in the stage's empty space.
4. An optional chromatic-aberration burst may echo the changing edge for a fraction of the reveal; it never becomes a persistent filter.
5. The effect settles within roughly 400–950 ms.
6. The foreground media becomes fully sharp and unobstructed.
7. A supplied MP4 may run once, muted and inline, for at most about four seconds, then stop on a useful frame.

The settled state preserves 100% of meaningful media without persistent distortion. An offset or displaced duplicate may exist behind it as an echo, but never replaces the sharp foreground.

Swag lives primarily in:

- the reveal and handoff between projects;
- decorative type outside the media;
- project numbers, metadata, boundary lines, and edge forms;
- one project-specific kitsch artifact at a time, chosen from a restrained motif set rather than repeated everywhere;
- the contrast between a calm chapter and its brief poster-like activation.

The approved base reveal prototype is `edge incision → delayed contour → type squeeze`. Its chromatic accent is image-dependent but applies only to media: one short WebGL pass samples small opposing RGB offsets from the same image or video texture, then disappears before settle. Decorative type never receives chromatic aberration. The implementation uses one shared canvas and one media element rather than filtered raster copies; lightweight vector edge rings remain the fallback.

## Deterministic effect profiles

Featured projects rotate through a small authored effect vocabulary. Assignment is deterministic from the locale-independent project ID, so an effect never rerolls on reload and does not change when projects are reordered. A project may override the derived profile when its content needs a specific treatment.

Each activation combines at most:

- one major reveal;
- one inexpensive graphic accent;
- the shared settle into completely clean media.

Major reveals:

- `incision`: the approved irregular cut, delayed contour, and settle;
- `anamorphic`: a horizontally compressed image expands to its correct ratio while one narrow lens streak dissipates;
- `organic-matte`: three staggered alpha masks made from expanding spots merge from the composition's center toward its edges, resembling an ink-blot painting the image into view;
- `iris-gate`: a restrained aperture-like mask opens with a small amount of gate weave and exposure breathing.

Graphic accents:

- short media-only chromatic separation inspired by print misregistration, with a vector-edge fallback;
- the approved three-stroke prism frame;
- squeezed decorative type;
- one brief light streak, halation edge, calibration mark, or project-specific 2000s-kitsch artifact.

The mixer never combines two expensive raster effects, never randomizes while scrolling, and never runs a continuous ambient filter. A project's full reveal runs only on its first meaningful activation; later re-entry is immediate or uses a short opacity transition.

It does not live in a play button, fake product visualization, generic glass card, or continuous visual noise.

## Progressive enhancement architecture

The effect stack has three layers.

### Layer 1: semantic HTML and CSS

This layer is mandatory and complete. It provides all content, headings, links, section anchors, progress semantics, media posters, layout, focus states, and responsive behavior.

CSS may enhance the presentation with Grid, sticky positioning, `clip-path`, masks, transforms, blend modes, variable-font axes, and short transitions. Unsupported enhancements fall back to ordinary layout without losing information.

### Layer 2: decorative SVG

SVG supplies line art and optional displacement filters. SVG effects operate on decorative copies only and may be removed without changing content or interaction.

### Layer 3: optional WebGL

One WebGL canvas may live inside the sticky Personal visual stage. It is a decorative renderer that can use the active MP4 or screenshot as a texture during the short reveal. It may change shader behavior between projects, but it does not render headings, links, progress, or any interactive control.

WebGL is justified only if a prototype produces a materially better transition than CSS/SVG. Otherwise the CSS/SVG implementation remains the shipped behavior.

The canvas:

- is `aria-hidden` and presentational;
- has `pointer-events: none`;
- mounts lazily near Personal Projects;
- renders only while relevant and the document is visible;
- pauses when off-screen or when the tab is hidden;
- uses a capped device-pixel ratio and a bounded texture size;
- handles context loss by revealing the static media immediately;
- is disabled for reduced motion and may be disabled for constrained devices.

## Accessibility requirements

The target is WCAG 2.2 AA.

- DOM reading order matches the logical content order.
- A skip link precedes navigation.
- Every action is reachable and understandable by keyboard.
- Focus indicators remain clearly visible against all states.
- Scroll activation has an equivalent focus/touch activation path.
- Hover never exposes unique information or the only available action.
- Distorted title copies are `aria-hidden`; the real title remains stable, selectable text.
- Project links state their destination and indicate when they open a new tab.
- Counts, active states, and progress do not rely on color alone.
- Media has meaningful alternative text or a nearby text description.
- Decorative canvas and SVG are hidden from assistive technology.
- Text and controls retain required contrast; decorative low-contrast line art is not required for understanding.
- The page supports reflow at 320 CSS pixels and 400% zoom without two-dimensional page scrolling.
- `prefers-reduced-motion: reduce` removes scroll-linked displacement, WebGL, large transforms, and autoplay. Project changes become immediate or use a short opacity dissolve.
- `prefers-contrast` and forced-colors modes preserve navigation, focus, boundaries, and active states.

Motion bursts stay below one second. Any automatic project demo stops within approximately four seconds, preventing a perpetual parallel animation. No content flashes rapidly.

## Performance and resilience

- Reuse one visual-stage effect tree for all featured projects; do not mount a filtered effect stack inside every chapter.
- Trigger reveals from `IntersectionObserver` state changes rather than tying filter progress to every scroll event.
- After a reveal settles, remove or hide its decorative layers and stop every animation frame callback. There must be no sustained rendering cost while the page is idle.
- Implement image-dependent chromatic separation as one short pass over the active media texture. Never animate large SVG blur surfaces or three full-resolution raster/video copies; retain vector strokes as the fallback.
- Build organic-matte reveals from a small number of low-resolution or vector alpha layers. Animate their transforms/opacities once; do not regenerate blob geometry while scrolling.
- On constrained/mobile presentation, use the CSS/SVG fallback and omit the expensive modifier if it cannot stay within the frame budget.
- Reserve media aspect ratios to avoid layout shift.
- Use appropriate MP4 dimensions and poster images; do not load every featured video eagerly.
- Preload only the first relevant poster and metadata needed for the active chapter.
- Pause and release video resources when chapters are far from the viewport.
- Keep a single WebGL context rather than one canvas per project.
- Avoid unbounded device-pixel-ratio scaling and oversized textures.
- Preserve a static CSS path for WebGL failure, context loss, unsupported filters, slow updates, or JavaScript failure.
- The page remains navigable and complete when JavaScript is disabled; only sticky activation, progress updates, and decorative transitions are reduced.

## Data model implications

Projects need an explicit presentation category instead of deriving all hierarchy from year:

- `personal-featured`
- `work`
- `archive`

Personal projects also need:

- fixed display order;
- media type (`video` or `image`);
- media aspect (`square` or `wide`);
- poster/fallback asset;
- external destination;
- concise metadata used in the scroll chapter.

Counts in the navigation map derive from these categories. Existing archive year grouping remains derived from project dates.

## Verification

Implementation verification must include:

- production build;
- keyboard-only traversal;
- screen-reader landmark and heading-order check;
- reduced-motion behavior;
- forced-colors/high-contrast behavior;
- 320 px reflow and 400% zoom;
- desktop sticky behavior across short and tall viewports;
- square-to-16:9 active-project changes without layout jump;
- WebGL-disabled and context-loss fallbacks;
- JavaScript-disabled content and anchor navigation;
- video loading, pausing, poster fallback, and tab visibility behavior;
- mobile Safari and current Chromium/Firefox checks.

## Success criteria

The redesign succeeds when a new visitor can:

1. understand the owner's role and working style from the hero;
2. see that four personal projects precede professional work;
3. identify the active project and overall page position at a glance;
4. jump to Personal, Work, Archive, or a personal project without searching;
5. view every project with ordinary scrolling and no required internal click;
6. see real project media clearly after each short transition;
7. receive the same information and links with motion reduced, WebGL unavailable, or assistive technology active;
8. remember at least one controlled visual interruption without experiencing the site as noisy or inaccessible.
