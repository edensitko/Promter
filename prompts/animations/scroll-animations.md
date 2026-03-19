# Scroll Animations Prompt

## Role

You are a senior frontend designer and motion design specialist with expertise in scroll-driven animations and parallax effects. You create scroll experiences that guide users through content with purposeful, performant motion.

## Task

Design and implement a comprehensive system of scroll-triggered animations including entrance reveals, parallax layers, progress indicators, and scroll-linked transformations. The system should be modular, performant, and easy to apply across any page layout.

## Animation Goals

- Create scroll animations that enhance storytelling and content hierarchy
- Ensure buttery-smooth 60fps performance even on mid-range devices
- Use the Intersection Observer API for efficient scroll detection
- Provide progressive enhancement — content is fully readable without animations
- Support both vertical and horizontal scroll contexts

## Animation Catalog

### Entrance Animations

#### Fade Up
Elements fade in while translating upward (20–40px). The most common and versatile scroll animation. Apply to text blocks, cards, and section content. Stagger siblings by 100–150ms for sequential reveals.

#### Slide In
Elements slide in from left, right, or bottom with a fade. Use for feature sections, alternating content blocks, and image-text pairs. Direction should follow reading flow.

#### Scale Reveal
Elements scale from 0.9 to 1.0 while fading in. Creates a subtle zoom effect. Best for hero images, key statistics, and focal-point content.

#### Clip Reveal
Content is revealed through an animated `clip-path` — a rectangle that expands, a circle that grows, or a polygon that morphs. High-impact effect for hero sections and featured media.

### Parallax Effects

#### Layer Parallax
Multiple layers move at different speeds relative to scroll position, creating depth. Background moves slowest, midground at medium speed, foreground fastest. Use for hero sections and storytelling pages.

#### Element Parallax
Individual elements translate at different rates on scroll. Images, shapes, and decorative elements drift at varied speeds. Creates a floating, dynamic feel without full parallax layers.

#### Text Parallax
Headline text moves at a different rate than body text or surrounding elements. Creates visual hierarchy through motion. Effective for section transitions.

### Progress Animations

#### Scroll Progress Bar
A horizontal bar at the top of the viewport fills based on page scroll percentage. Use `scroll()` timeline or JavaScript scroll listener with `requestAnimationFrame`.

#### Section Progress
Individual sections show completion progress — a vertical line that fills, dots that activate, or a step indicator. Helps users understand their position in long-form content.

#### Counter Animation
Numbers count up from zero to their target value as they scroll into view. Use for statistics, metrics, and achievement sections. Apply easing for natural deceleration.

### Scroll-Linked Transformations

#### Pin and Transform
Elements pin in place while scroll drives transformations — rotation, scale, color change, or content swap. Creates an interactive, app-like feel.

#### Horizontal Scroll Section
Vertical scroll drives horizontal movement of a content panel. Used for timelines, process flows, and portfolio showcases. Requires careful scroll-hijacking UX.

#### Morph on Scroll
Elements smoothly morph between states as the user scrolls — a circle becomes a rectangle, a logo transforms, or layout shifts between configurations.

## Technical Requirements

- Use Intersection Observer API for triggering (not scroll event listeners)
- Use CSS `scroll-timeline` or `animation-timeline: scroll()` where browser support allows
- Fallback to `requestAnimationFrame`-based scroll listeners with throttling
- All animated properties must be compositor-friendly (transform, opacity)
- Animations must not block the main thread
- Support `prefers-reduced-motion` by disabling parallax and reducing entrance animations to simple fades
- Lazy-load heavy assets triggered by scroll proximity

## Technology Suggestions

- Intersection Observer API (native)
- CSS Scroll-Driven Animations (progressive enhancement)
- Framer Motion with `useScroll` and `useTransform`
- GSAP ScrollTrigger
- Lenis for smooth scroll behavior
- Tailwind CSS for base styling

## Expected Output

### Component Structure

```
components/
  scroll/
    ScrollReveal.jsx
    ParallaxLayer.jsx
    ScrollProgress.jsx
    CounterAnimation.jsx
    PinSection.jsx
    HorizontalScroll.jsx
  hooks/
    useScrollProgress.js
    useInView.js
    useParallax.js
```

### Code Requirements

- Each animation should be a composable component or hook
- Support configuration via props: direction, delay, duration, threshold, offset
- Include a `<ScrollReveal>` wrapper component for the most common entrance animations
- Provide both CSS-only and JavaScript-enhanced versions where possible
- Handle cleanup of observers and listeners on unmount

### Accessibility

- Respect `prefers-reduced-motion` media query globally
- Ensure all content is visible and readable without JavaScript
- Scroll-hijacking sections must still allow keyboard navigation
- Provide skip links for long scroll-driven sections
- Counter animations should show final values immediately for screen readers
