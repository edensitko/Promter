# Stagger Animations Prompt

## Role

You are a senior motion designer and frontend developer with expertise in choreographed, sequenced animation systems. You understand the art of timing — how stagger delays, easing curves, and directional patterns create rhythm, hierarchy, and narrative in interface animation. You design orchestrated reveals that guide the eye and communicate structure.

## Task

Design and implement a comprehensive system of staggered and orchestrated group animations. The system should provide configurable stagger patterns for grids, lists, text, galleries, navigation, and multi-element page sections. Each pattern should support multiple directional modes, timing configurations, and trigger mechanisms.

## Animation Goals

- Create stagger patterns that establish visual hierarchy and guide the user's eye through content
- Use stagger delays intentionally — too little feels simultaneous, too much feels sluggish (sweet spot: 50-100ms per item)
- Ensure total animation sequences complete within 1-2 seconds for groups of 10-20 items
- Support multiple stagger directions: sequential, reverse, center-out, edges-in, diagonal, random
- Provide scroll-triggered activation via Intersection Observer for on-demand reveals
- Make all stagger timing configurable without modifying component internals

## Animation Catalog

### Grid Stagger

#### Directional Grid Reveal
Items in a grid appear one by one with configurable delay and direction patterns. Each item has a base enter animation (configurable: fade, slide-up, scale, or combination) with a stagger delay calculated by position. **Direction modes**: (1) **Top-left to bottom-right diagonal**: delay = `(row + col) * staggerDelay`. (2) **Center-out radial**: delay = `Math.hypot(row - centerRow, col - centerCol) * staggerDelay`, items closest to center appear first. (3) **Row-by-row**: delay = `row * staggerDelay`, entire rows appear together. (4) **Column-by-column**: delay = `col * staggerDelay`. (5) **Random**: delay = `Math.random() * maxDelay`. Default stagger per item: 50-80ms. Base animation: `opacity: 0, transform: translateY(20px)` to `opacity: 1, transform: translateY(0)` over 400ms with `cubic-bezier(0.25, 0.1, 0.25, 1)`. Apply via CSS custom property `--stagger-delay` set by JavaScript, consumed by `animation-delay: var(--stagger-delay)`.

### List Cascade

#### Sequential List Reveal
List items animate in sequence from top to bottom, each with a slight delay. Each item enters with a configurable animation: **Fade**: `opacity: 0` to `1`. **Slide-left**: `transform: translateX(-30px), opacity: 0` to `translateX(0), opacity: 1`. **Slide-right**: mirror of slide-left. **Scale-up**: `transform: scale(0.85), opacity: 0` to `scale(1), opacity: 1`. **Flip-in**: `transform: perspective(600px) rotateX(-15deg), opacity: 0` to `rotateX(0), opacity: 1`. Stagger delay: 60-100ms per item. Duration per item: 350-450ms. Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for standard, `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy. For exit animations, reverse the stagger (bottom-to-top) with slightly faster timing (80% of enter duration). Cap total visible stagger at 800ms: if items exceed ~10, reduce per-item delay proportionally.

### Text Split Stagger

#### Character / Word / Line Reveal
Text content split into individual units (characters, words, or lines) with each unit animating separately in staggered sequence. **Character split**: Each character wrapped in `<span style="display: inline-block">`, parent has `overflow: hidden` per line for clean masking. Characters animate from `transform: translateY(110%)` to `translateY(0)` with stagger of 20-30ms per character. Duration: 300-400ms per character. **Word split**: Words animate similarly with 60-80ms stagger. Better for body text where per-character feels excessive. **Line split**: Auto-detect line breaks via computed layout, wrap each line, stagger by 100-150ms. Best for multi-line paragraphs. Easing for all: `cubic-bezier(0.25, 0.1, 0.25, 1)`. Optional rotation: characters rotate from 5-10deg to 0deg during entry for a playful feel. Text splitting must happen at runtime to handle dynamic content and responsive reflow.

### Image Gallery Stagger

#### Clip-Path / Scale Reveal
Images in a gallery reveal with staggered animation using clip-path or scale effects. **Clip-path reveal**: Each image starts with `clip-path: inset(0 100% 0 0)` (clipped from right) and animates to `clip-path: inset(0 0% 0 0)` (fully visible). Direction alternates per row or follows a pattern. Duration: 500-700ms with `cubic-bezier(0.77, 0, 0.175, 1)`. Stagger: 80-120ms per image. **Scale reveal**: Images start at `transform: scale(1.2), opacity: 0` inside `overflow: hidden` containers, animating to `scale(1), opacity: 1`. The slight zoom creates a cinematic reveal. **Overlay wipe**: A colored overlay div slides across the image (`transform: translateX(-100%)` to `translateX(100%)`), revealing the image beneath. Two-phase: overlay enters (300ms), pauses briefly, overlay exits (300ms). Stagger each image's sequence by 100ms.

### Navigation Stagger

#### Menu Item Cascade
Navigation items animate in sequence when a menu opens (mobile menu, dropdown, sidebar). Each item enters from a starting state with staggered timing. **Slide and fade**: Items start at `transform: translateX(-20px), opacity: 0` and resolve to resting position. **Scale up**: Items start at `transform: scale(0.9), opacity: 0`. Stagger delay: 40-60ms per item (navigation items are typically fewer, so faster stagger works). Duration: 250-350ms per item. Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)`. On menu close, items exit in reverse order with 30ms stagger and faster duration (200ms). Total open animation for 6 items should complete within 500ms. The menu backdrop/overlay should animate first (200ms), then items stagger after a 100ms initial delay.

### Counter Stagger

#### Offset Counting
Multiple counter elements (statistics section, dashboard metrics) begin counting at slightly different times. Each counter animates from 0 to its target value over 1.5-2 seconds with `ease-out` deceleration. Stagger start times by 150-200ms between counters. The count uses `requestAnimationFrame` with eased progress: `value = target * easeOutCubic(elapsed / duration)` where `easeOutCubic(t) = 1 - Math.pow(1 - t, 3)`. Format numbers with locale-appropriate separators during counting. Optional effects: digit scale pulse at completion (scale 1.0 to 1.05 to 1.0, 200ms), counter label fades in 200ms before its number starts, suffix/prefix text ("+", "%", "$") appears with the final value.

### Masonry Reveal

#### Viewport-Triggered Stagger
Items in a masonry/Pinterest-style layout reveal as they enter the viewport with stagger timing based on their visual position. Use Intersection Observer with `threshold: 0.1` and `rootMargin: "0px 0px -50px 0px"` (trigger slightly before fully in view). When a batch of items enters the viewport simultaneously, calculate stagger delay based on their X position: items further left appear first (`delay = (item.offsetLeft / containerWidth) * maxStagger`). Or use column index: `delay = columnIndex * 80ms`. Base animation: `opacity: 0, transform: translateY(30px) scale(0.95)` to `opacity: 1, transform: translateY(0) scale(1)`. Duration: 450ms, `cubic-bezier(0.4, 0, 0.2, 1)`. Re-observe items when layout changes (window resize, filter change) and re-trigger reveals for newly visible items.

### Orchestrated Sections

#### Choreographed Section Reveal
Multiple elements within a page section animate in a carefully choreographed sequence, creating a narrative reveal. **Timeline**: (1) **Background** (0ms): Section background color or image fades in, `opacity: 0` to `1`, 300ms. (2) **Decorative elements** (100ms): Lines, shapes, or borders draw in via `scaleX`/`scaleY` or `stroke-dashoffset`, 400ms. (3) **Heading** (200ms): Main title animates in via character split stagger or slide-up, 500ms. (4) **Subtitle/body** (500ms): Supporting text fades and slides up, 350ms. (5) **CTA button** (700ms): Button scales from 0.9 to 1.0 with bounce easing, 400ms. (6) **Secondary elements** (900ms): Tags, metadata, or additional items cascade in, 300ms. Total sequence: ~1200ms. Each step uses `animation-delay` relative to the section entering the viewport. Build as a GSAP timeline or Framer Motion sequence with labeled checkpoints for easy adjustment.

## Technical Requirements

- Use Intersection Observer API with configurable `threshold` and `rootMargin` for scroll-triggered staggers
- Calculate stagger delays in JavaScript and apply as CSS custom properties (`--stagger-delay`) or inline `animation-delay`
- Cap total stagger duration: if `itemCount * staggerDelay > maxTotalDuration`, reduce `staggerDelay` proportionally
- Text splitting must re-run on window resize to handle responsive line break changes (debounce at 200ms)
- Use `will-change: transform, opacity` on staggering elements during animation, remove via `animationend` listener
- For grid stagger, calculate position indices only once on mount and on layout changes — cache in a data attribute
- All stagger animations must use compositor-friendly properties only: `transform` and `opacity`
- Exit animations should mirror enter animations in reverse order with 80% of the enter duration
- Support `AnimatePresence` (Framer Motion) or `TransitionGroup` (React) for mount/unmount staggering
- Batch Intersection Observer entries: when multiple items intersect in the same frame, sort by position before assigning delays

## Technology Suggestions

- Intersection Observer API for scroll-triggered activation
- CSS `animation-delay` with custom properties for pure-CSS stagger
- GSAP `stagger` utility and `timeline()` for complex orchestrations
- Framer Motion `variants` with `staggerChildren`, `delayChildren`, and `when: "beforeChildren"`
- `split-type` or custom text splitter for character/word/line splitting
- CSS `@keyframes` with `animation-fill-mode: both` for holding start/end states
- Tailwind CSS `animate-` utilities with custom delay classes
- `@formkit/auto-animate` for simple list transitions
- Lenis or native `scroll-behavior: smooth` for scroll-linked timing

## Expected Output

### Component Structure

```
components/
  stagger/
    StaggerGrid.jsx
    StaggerList.jsx
    TextSplitReveal.jsx
    GalleryStagger.jsx
    NavStagger.jsx
    CounterStagger.jsx
    MasonryReveal.jsx
    OrchestratedSection.jsx
  hooks/
    useStagger.js
    useInViewStagger.js
    useTextSplit.js
    useCountUp.js
    useTimeline.js
  utils/
    staggerCalculators.js
    textSplitter.js
    positionSorter.js
```

### Code Requirements

- `useStagger` hook accepts `count`, `delay`, `direction` and returns an array of delay values
- `useInViewStagger` combines Intersection Observer with stagger — returns `{ ref, inView, getDelay(index) }`
- `StaggerGrid` accepts `columns`, `direction` (diagonal, radial, row, column, random), `delay`, `animation` props
- `StaggerList` accepts `animation` (fade, slide-left, slide-right, scale, flip), `delay`, and `exitReverse` props
- `TextSplitReveal` accepts `splitBy` (character, word, line), `delay`, `animation`, and `trigger` (inView, immediate)
- `OrchestratedSection` accepts a `timeline` array of `{ selector, animation, delay, duration }` objects
- Stagger calculator utilities exported separately: `diagonalStagger()`, `radialStagger()`, `randomStagger()`
- `textSplitter.js` splits text nodes at runtime, preserving original HTML and handling responsive reflow
- All components use `data-stagger-index` attributes for CSS-based stagger fallback
- TypeScript types for all direction enums, animation presets, and configuration objects

### Accessibility

- Respect `prefers-reduced-motion`: show all items immediately with no stagger or animation delay
- Stagger-revealed content must be in the DOM from the start (not lazy-mounted) — only visually hidden with `opacity: 0`
- Screen readers should access all content immediately regardless of animation state — use `aria-hidden` on animation wrappers, not on content
- Text split spans must preserve the original text for assistive technology: use `aria-label` on the parent with full text, `aria-hidden="true"` on individual character/word spans
- Navigation stagger must not delay keyboard focus availability — focusable items should be accessible even during animation
- Counter stagger must show final values immediately for screen readers via `aria-label` or `aria-valuenow`
- Orchestrated section delays must not exceed 1.5 seconds total — users should not wait for decorative animation to access content
- Provide a CSS class `.stagger-complete` that is added after all items have finished animating, for use in integration tests
