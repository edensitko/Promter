# Creative Loading Animations Prompt

## Role

You are a motion design specialist and front-end developer focused on creating
polished, purposeful loading states and progress indicators. You understand that
loading moments are opportunities to reinforce brand identity, reduce perceived
wait times, and keep users engaged. You craft loading animations that are
lightweight, accessible, and visually delightful.

## Task

Build a collection of creative loading state components: spinners, skeleton
screens, progress indicators, and full-page loading experiences. Each component
must be production-ready, performant, and easy to drop into any web project.
Deliver them as a showcase page where every loading pattern can be previewed
and its code inspected.

## Design Goals

- **Perceived performance**: Animations should make wait times feel shorter by
  providing visual feedback and a sense of forward momentum.
- **Brand-ready**: Each loader should be easily customizable through CSS custom
  properties (colors, sizes, timing) so teams can adapt them to any brand.
- **Lightweight**: All animations must be CSS-only or use minimal JavaScript.
  No heavy libraries. Total bundle impact should be negligible.
- **Accessible**: Every animation respects `prefers-reduced-motion`. Loaders
  include appropriate ARIA attributes (`role="status"`, `aria-live="polite"`,
  visually hidden status text).

## Requirements

### Spinner Variants (minimum 4)

1. **Dot spinner**: A ring of dots that pulse or rotate sequentially.
2. **Arc spinner**: A single animated arc that rotates around a circle, with
   varying stroke-dasharray for a "chasing" effect.
3. **Morphing spinner**: A shape (square, circle, triangle) that continuously
   morphs between forms while rotating.
4. **Logo spinner**: A placeholder brand mark that fills, pulses, or draws
   itself in using SVG stroke animation.

### Skeleton Screens (minimum 3)

1. **Card skeleton**: Mimics an article card — image placeholder, title lines,
   excerpt lines, and avatar circle. All placeholders feature a shimmer wave
   animation (left-to-right gradient sweep).
2. **Table skeleton**: Represents a data table with header row and 5 content
   rows. Column widths vary to look realistic.
3. **Profile skeleton**: User profile layout with a large avatar circle, name
   line, bio lines, and stat counters.

### Progress Indicators (minimum 3)

1. **Linear progress bar**: A horizontal bar with smooth fill animation. Must
   support both determinate (percentage-driven) and indeterminate (continuous
   sweep) modes.
2. **Circular progress ring**: An SVG circle whose `stroke-dashoffset` animates
   to show percentage completion. Centered percentage text updates in real time.
3. **Step progress tracker**: A horizontal row of numbered steps connected by
   lines. Completed steps are filled; the active step pulses; future steps are
   dimmed.

### Full-Page Loaders (minimum 2)

1. **Overlay loader**: A semi-transparent backdrop with a centered spinner and
   optional status message that updates ("Connecting...", "Loading assets...",
   "Almost there...").
2. **Branded splash screen**: A full-screen loader with a logo animation
   (draw-in, pulse, or fade) and a slim progress bar at the bottom. Transitions
   out with a smooth reveal (clip-path, opacity, or slide).

### Technical Requirements for Each Component

1. Built with semantic HTML and scoped CSS (no style leakage).
2. Colors, sizes, and animation durations controlled via CSS custom properties.
3. Every animation uses `will-change` or `transform`/`opacity` only to stay on
   the compositor thread (no animating `width`, `height`, `left`, `top`).
4. `prefers-reduced-motion: reduce` media query replaces motion with a static
   or faded alternative.
5. ARIA attributes: `role="status"`, `aria-live="polite"`, and a visually hidden
   `<span>` with descriptive text (e.g., "Loading content, please wait").

### Showcase Page

1. A gallery layout presenting all loaders organized by category (Spinners,
   Skeletons, Progress, Full-Page).
2. Each component is shown in a preview card with a label and brief description.
3. A toggle to simulate active / completed states for progress components.
4. A toggle to preview `prefers-reduced-motion` behavior.

## Technology Suggestions

| Layer         | Recommended                                         |
|---------------|-----------------------------------------------------|
| Markup        | Semantic HTML5, inline SVG for circular elements    |
| Styling       | CSS3 keyframes, custom properties, `@layer`         |
| SVG Animation | SMIL or CSS for stroke animations                   |
| JavaScript    | Minimal — Intersection Observer, toggles only       |
| Framework     | Vanilla JS or Web Components for encapsulation      |
| Build Tool    | Vite                                                |
| Accessibility | ARIA live regions, `prefers-reduced-motion`         |

## Expected Output Structure

```
loading-animations/
  index.html                # Showcase gallery page
  css/
    variables.css           # Shared tokens (colors, sizes, durations)
    base.css                # Reset, showcase page layout
    spinners.css            # All spinner animations
    skeletons.css           # Skeleton shimmer styles
    progress.css            # Progress bar and ring styles
    full-page.css           # Overlay and splash screen styles
    reduced-motion.css      # Simplified alternatives
  js/
    main.js                 # Toggle controls, progress simulation
  assets/
    svg/                    # Logo placeholder SVGs
```

## Evaluation Criteria

- Visual polish and variety of loading patterns.
- Animations run at 60fps with no layout thrashing.
- Every component is fully accessible (ARIA + reduced-motion).
- CSS custom properties make rebranding trivial.
- Code is modular — each loader can be extracted independently.
- Showcase page is clear, organized, and easy to navigate.
