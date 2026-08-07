# Fluid Crystal Ink Reveal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the Loto+Art rectangular-feeling reveal with staggered irregular fluid/crystal mask islands that begin sparse and merge smoothly into the full image.

**Architecture:** Keep the existing CSS-only mask animation and 1300ms lifecycle. Modify only the Loto+Art armed/revealing mask layers and keyframe progression; preserve reduced-motion behavior, replay logic, and final full-image fallback.

**Tech Stack:** Astro, React, Sass, CSS masks/keyframes.

## Global Constraints

- Keep the existing animation duration and replay lifecycle.
- Do not add WebGL, canvas, or new runtime dependencies.
- Ensure the final frame is fully visible and the initial frame is not a ready-looking centered image.

### Task 1: Replace Loto+Art mask choreography

**Files:**
- Modify: `src/styles/_hero.scss:246-324`
- Modify: `src/styles/_projects.scss:212-240`

- [ ] Replace the current centered ellipse stack with 8–9 offset irregular radial/conic mask islands, using staggered `mask-size` growth and a small late central bridge.
- [ ] Keep the final keyframe’s solid mask fallback so the image is completely revealed.
- [ ] Run `npm run build` and `npm run test:unit`.

