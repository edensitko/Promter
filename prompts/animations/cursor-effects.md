# Cursor Effects Prompt

## Role

You are a senior frontend developer and interaction design specialist with deep expertise in pointer-based animations, custom cursor implementations, and GPU-accelerated motion. You craft cursor experiences that feel magical and responsive, transforming the default pointer into an expressive extension of the user's intent.

## Task

Design and implement a comprehensive system of custom cursor and pointer interaction effects. The system should replace or augment the default cursor with animated, context-aware visuals that respond to element types, user actions, and page content. Every effect must be performant, non-intrusive, and gracefully disabled on touch devices.

## Animation Goals

- Create cursor effects that feel fluid, responsive, and tightly coupled to pointer movement (sub-frame latency)
- Use only GPU-accelerated properties (`transform`, `opacity`) for all cursor motion
- Provide contextual cursor states that communicate affordance (clickable, draggable, viewable)
- Ensure zero interference with native pointer events and element interactivity
- Fall back gracefully on touch devices by hiding custom cursors entirely
- Maintain 60fps at all times, even with multiple concurrent effects

## Animation Catalog

### Custom Cursor

#### Dot + Ring Cursor
Replace the default cursor with two elements: a small filled dot (6-8px) centered on the pointer, and a larger ring (36-48px) that follows with a slight delay using spring physics. The dot tracks the pointer exactly via `transform: translate3d()` updated on every `pointermove` event. The ring uses linear interpolation (lerp) with a factor of `0.15` per frame, creating a smooth trailing effect. On click, the ring contracts to 75% scale with `transition: transform 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` then springs back. Both elements use `position: fixed`, `pointer-events: none`, `z-index: 9999`, and `will-change: transform`.

### Cursor Trail

#### Particle Trail
Render a trail of 8-15 small elements (circles, 4-6px) that follow the cursor path and fade out over 400-600ms. Each particle is created at the cursor position on `pointermove`, then animates `opacity` from 1 to 0 and `transform: scale()` from 1 to 0.3. Use an object pool of pre-created DOM elements (or a single Canvas layer) to avoid garbage collection. Particles should have slight random offset (+-3px) and optional color variation. Throttle creation to every 20-30ms to avoid excess particles.

#### Gradient Trail
A soft gradient smear that follows the cursor using a Canvas element layered behind content. On each frame, draw a radial gradient at the current cursor position with low opacity (0.05-0.1), and apply a global fade using `globalCompositeOperation: 'destination-out'` with a semi-transparent fill. Creates a glowing trail that dissipates naturally.

### Magnetic Elements

#### Magnetic Pull
Buttons, links, and interactive elements subtly pull toward the cursor when it enters a 100px proximity radius. Calculate the distance between cursor and element center; when within threshold, apply `transform: translate3d(dx * 0.3, dy * 0.3, 0)` where `dx`/`dy` are the offset vectors scaled by a magnetism factor (0.2-0.4). Use lerp-based animation to smooth the movement. On mouse leave, spring back to origin with `transition: transform 400ms cubic-bezier(0.25, 0.1, 0.25, 1)`. Attach via a `data-magnetic` attribute for easy opt-in.

### Cursor Spotlight

#### Radial Light
A large radial gradient (200-400px diameter) follows the cursor, creating a spotlight effect that illuminates content beneath. Implement as a `div` with `background: radial-gradient(circle 200px, rgba(255,255,255,0.08) 0%, transparent 100%)`, `position: fixed`, `pointer-events: none`, and `mix-blend-mode: soft-light` or `overlay`. Position is updated via `transform: translate3d()` using lerp (factor 0.1) for smooth following. Works especially well on dark backgrounds. Adjust gradient intensity based on proximity to interactive elements.

### Cursor Text

#### Contextual Label
A small text label (12-14px, uppercase, letter-spacing 0.05em) orbits or follows the cursor at a fixed offset (15-20px right, 15-20px below). The text changes based on the element beneath the cursor: "View" over images and portfolio items, "Drag" over draggable elements, "Click" over buttons and CTAs, "Scroll" over scrollable containers. Use `data-cursor-text` attributes on target elements. The label fades in with `opacity` transition (200ms) and scales from 0.8 to 1.0 when a new context is detected. Hide when over non-annotated elements.

### Cursor Morph

#### Shape Shifting Cursor
The custom cursor (dot + ring style) morphs its shape and size based on the element being hovered. Default: small dot (8px). Over links: ring expands to 50px and dot disappears. Over images: cursor becomes a rounded square (40x40px) with subtle border. Over buttons: ring pulses gently with `animation: pulse 1.5s ease-in-out infinite`. Over text: cursor becomes a vertical bar (2x24px). Transitions between states use `transition: width 300ms, height 300ms, border-radius 300ms` with `cubic-bezier(0.25, 0.1, 0.25, 1)`. Detect element type via `pointermove` event target analysis.

### Interactive Hover Ripple

#### Surface Ripple
When the cursor hovers over designated surface elements (cards, panels, sections), a ripple emanates from the cursor position outward. Implement as a pseudo-element or dynamically created `div` at the `event.offsetX`/`event.offsetY` position. The ripple scales from 0 to cover the element using `transform: scale()` with `opacity` fading from 0.15 to 0. Duration 600-800ms with `cubic-bezier(0.4, 0, 0.2, 1)`. Clip the ripple to the element bounds with `overflow: hidden` on the parent. Trigger on `pointerenter` for single ripple or throttled on `pointermove` for continuous ripples. Use Material Design ripple math: `Math.hypot(width, height)` for max scale.

## Technical Requirements

- Use `requestAnimationFrame` for all cursor position updates — never update in the event handler directly
- Apply linear interpolation: `current += (target - current) * lerpFactor` each frame for smooth following
- All moving elements must use `transform: translate3d()` (triggering GPU compositing)
- Set `pointer-events: none` on all cursor overlay elements to prevent event interference
- Use `will-change: transform` on cursor elements (remove when inactive to free GPU memory)
- Debounce `pointermove` handlers for particle creation; never debounce core cursor position
- Detect touch devices via `window.matchMedia('(hover: hover) and (pointer: fine)')` and disable custom cursor entirely on touch
- Hide the native cursor with `cursor: none` on `<body>` only when custom cursor is active
- Restore native cursor immediately if custom cursor JavaScript fails or is still loading
- Clean up all event listeners and animation frames on component unmount or page navigation

## Technology Suggestions

- Vanilla JavaScript with `requestAnimationFrame` for core cursor tracking
- CSS Custom Properties for cursor size, color, and animation speed theming
- HTML5 Canvas for trail effects and particle systems
- Framer Motion `useSpring` for spring-physics following in React contexts
- GSAP for complex cursor morph timelines
- Tailwind CSS for base styling and utility classes
- `pointer-events: none` and `mix-blend-mode` for visual layering

## Expected Output

### Component Structure

```
components/
  cursor/
    CursorProvider.jsx
    CustomCursor.jsx
    CursorTrail.jsx
    MagneticElement.jsx
    CursorSpotlight.jsx
    CursorText.jsx
    CursorRipple.jsx
  hooks/
    useCursorPosition.js
    useLerp.js
    useMagnetic.js
    useCursorContext.js
  utils/
    detectTouchDevice.js
    objectPool.js
```

### Code Requirements

- Wrap the entire system in a `<CursorProvider>` context that manages global cursor state
- Each effect should be independently toggleable via props or configuration
- Support cursor theme customization (colors, sizes, blend modes) through CSS custom properties
- The `useCursorPosition` hook should expose raw and lerped positions at configurable smoothing factors
- Magnetic elements opt in via a `<MagneticElement>` wrapper or `data-magnetic` attribute directive
- Object pool pattern for particle trail to pre-allocate and reuse DOM nodes
- Batch DOM reads and writes to avoid layout thrashing in `pointermove` handlers
- Include TypeScript types for all props and configuration objects

### Accessibility

- Respect `prefers-reduced-motion`: disable all cursor animations and show the native cursor
- Custom cursor must not obscure content or interactive targets
- Ensure all interactive elements remain keyboard-focusable regardless of cursor effects
- Magnetic pull must not move elements far enough to overlap neighbors or cause layout confusion
- Cursor text labels must not be the sole indicator of element function — they are decorative only
- Screen readers should not announce cursor effect elements (`aria-hidden="true"` on all cursor DOM)
- Test with Windows High Contrast Mode: ensure custom cursor elements are visible or native cursor is restored
