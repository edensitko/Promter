# Bold Gradient UI Design Prompt

## Role

You are an expert UI designer and front-end engineer who specializes in vibrant,
gradient-heavy web design. You understand color theory, mesh gradient generation,
and how to combine bold color transitions with clean typography to produce striking
yet readable interfaces. You keep performance and accessibility top of mind even
when pushing visual boundaries.

## Task

Create a fully functional, single-page website that uses bold gradients as its
primary visual language. Every major surface — backgrounds, cards, buttons, text
highlights — should leverage gradients, mesh gradients, or animated color
transitions to deliver a vivid, modern aesthetic.

## Design Goals

- **Color-forward identity**: Gradients are not decoration; they *are* the design
  system. The palette should feel intentional and cohesive.
- **Depth and dimension**: Use gradient layering, glassmorphism, and soft shadows
  to create a sense of spatial depth without relying on flat blocks of color.
- **Smooth motion**: Animated gradient shifts should feel organic and fluid, never
  jarring or distracting.
- **Readability first**: Despite heavy color usage, all text must pass WCAG AA
  contrast ratios against its gradient background.

## Requirements

### Visual Design

1. Define a primary gradient spectrum of 3-5 anchor colors that blend harmoniously
   (e.g., violet to pink to orange, or teal to emerald to lime).
2. Use CSS `linear-gradient`, `radial-gradient`, and `conic-gradient` for surfaces.
3. Implement at least one mesh gradient section (using layered radial gradients or
   an SVG/Canvas approach).
4. Cards and containers should use frosted-glass (glassmorphism) overlays with
   `backdrop-filter: blur()` sitting on top of gradient backgrounds.
5. Buttons must feature gradient fills that shift color on hover via `background-position`
   animation or CSS transition.
6. At least one section should use an animated gradient background that slowly cycles
   through the color spectrum using CSS `@keyframes`.

### Typography

1. Use a clean sans-serif font (Inter, Satoshi, General Sans, or similar).
2. Headings may feature gradient text fills via `background-clip: text`.
3. Ensure a solid fallback color behind every gradient text element for
   accessibility and graceful degradation.

### Layout

1. A full-viewport hero section with a large animated mesh gradient background,
   centered headline, sub-headline, and CTA button.
2. A features/benefits section with gradient-bordered or gradient-filled cards
   arranged in a responsive grid.
3. A testimonial or social-proof section with glassmorphic quote cards.
4. A CTA / newsletter section with a vibrant gradient backdrop.
5. A minimal footer with gradient divider line.

### Animation

1. Hero gradient must animate continuously (subtle hue rotation or position shift).
2. Cards should reveal with a staggered fade-and-slide on scroll.
3. Buttons must have a smooth gradient transition on hover (no abrupt color jump).
4. Respect `prefers-reduced-motion` by disabling or simplifying all animations.

### Responsiveness

1. All gradient effects must render correctly on mobile and tablet viewports.
2. Glassmorphism fallback for browsers that do not support `backdrop-filter`.
3. Layout must reflow from multi-column to single-column without breaking
   gradient overlays.

## Technology Suggestions

| Layer         | Recommended                                          |
|---------------|------------------------------------------------------|
| Markup        | Semantic HTML5                                       |
| Styling       | CSS3 custom properties, `@property` for Houdini      |
| Animation     | CSS keyframes, optional GSAP or Framer Motion         |
| Mesh Gradient | CSS layered radials, or Canvas (e.g., Granim.js)      |
| Framework     | React, Svelte, or Vanilla JS                         |
| Build Tool    | Vite                                                 |
| Accessibility | ARIA labels, color contrast checks, reduced-motion   |

## Expected Output Structure

```
gradient-ui/
  index.html              # Main document
  css/
    variables.css         # Gradient definitions, color tokens, spacing
    base.css              # Reset, typography, global gradient utilities
    components.css        # Cards, buttons, glassmorphic containers
    animations.css        # Keyframe definitions for gradient motion
    responsive.css        # Breakpoint overrides
  js/
    main.js               # Scroll-triggered reveals, optional mesh canvas
  assets/
    images/               # Fallback static gradient images for old browsers
```

## Evaluation Criteria

- Visual impact and cohesion of the gradient palette.
- Smoothness and subtlety of animated gradients.
- Text readability over every gradient surface (WCAG AA minimum).
- Graceful degradation on older browsers and reduced-motion preferences.
- Clean, modular, well-documented code.
