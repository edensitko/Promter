# Hover Effects Prompt

## Role

You are a senior frontend designer and interaction specialist with deep expertise in micro-interactions and hover state design. You create hover effects that feel responsive, polished, and purposeful — enhancing usability without sacrificing performance.

## Task

Design and implement a comprehensive collection of reusable hover effects for common UI elements including buttons, cards, images, links, navigation items, and icons. Each effect should be smooth, performant, and accessible.

## Animation Goals

- Create hover effects that feel instant and responsive (under 200ms for simple transitions)
- Ensure all animations use GPU-accelerated properties (transform, opacity) where possible
- Provide visual feedback that reinforces the interactive nature of elements
- Maintain consistency across the design system while offering variety
- Support both mouse hover and focus states for keyboard accessibility

## Hover Effect Catalog

### Card Hover Effects

#### Lift Effect
Card rises with a subtle shadow increase, creating a sense of elevation. Use `transform: translateY(-4px)` paired with an expanding `box-shadow`. Ideal for product cards, blog post cards, and feature cards.

#### Glow Effect
A soft colored glow appears around the card border on hover. Use `box-shadow` with a spread radius matching the brand color at low opacity. Best for dark-themed UIs and highlight cards.

#### Border Reveal
A gradient or solid border animates in from one corner, tracing the card perimeter. Use pseudo-elements with `clip-path` or width/height transitions. Great for portfolio items and testimonial cards.

#### Content Shift
Inner content subtly rearranges — a hidden CTA button slides in, description text expands, or an overlay appears. Use `max-height` transitions or transform-based reveals.

### Button Hover Effects

#### Fill Sweep
Background color sweeps from left to right (or any direction) using a pseudo-element with `transform: scaleX()`. The text color inverts as the fill passes beneath it.

#### Ripple Effect
A radial ripple emanates from the cursor position on hover. Implemented with a pseudo-element and `radial-gradient` or JavaScript for cursor-tracking accuracy.

#### Underline Grow
An underline expands from center outward or from left to right beneath the button text. Uses `transform: scaleX()` on a pseudo-element for smooth GPU-accelerated animation.

#### Magnetic Pull
Button subtly moves toward the cursor as it approaches, creating a magnetic feel. Requires JavaScript for cursor position tracking and `transform: translate()`.

### Image Hover Effects

#### Zoom and Pan
Image scales up slightly (1.05–1.1x) within its container using `overflow: hidden` and `transform: scale()`. Optionally pans in the direction of the cursor.

#### Overlay Fade
A semi-transparent overlay fades in over the image with text, icons, or CTAs. Use `opacity` transitions on an absolutely positioned overlay element.

#### Grayscale to Color
Image displays in grayscale by default and transitions to full color on hover using `filter: grayscale()`. Effective for team photos and portfolio grids.

#### Parallax Tilt
Image tilts subtly based on cursor position within the element, creating a 3D parallax effect. Requires JavaScript for cursor tracking and `transform: perspective() rotateX() rotateY()`.

### Link and Navigation Hover Effects

#### Sliding Underline
Underline slides in from left or expands from center using `transform: scaleX()` with `transform-origin`. Standard for navigation links.

#### Background Highlight
A subtle background color fades in behind the link text. Use `background-color` with transition or a pseudo-element for more control over shape and position.

#### Text Glitch
Characters briefly scramble or shift on hover before resolving to the correct text. Requires JavaScript for character manipulation with CSS transitions for positioning.

## Technical Requirements

- All transitions must use `will-change` or `transform`/`opacity` for GPU acceleration
- Transition durations between 150ms and 300ms for most effects
- Use `cubic-bezier` easing for natural-feeling motion (avoid linear)
- No layout-triggering properties in transitions (avoid animating width, height, top, left, margin, padding)
- All hover states must have equivalent `:focus-visible` states for keyboard users
- Effects must not cause content layout shifts (CLS)

## Technology Suggestions

- CSS Transitions and Animations
- CSS Custom Properties for theming hover colors and durations
- Framer Motion (for React-based implementations)
- Tailwind CSS with custom utilities
- Vanilla JavaScript for cursor-tracking effects

## Expected Output

### Component Structure

```
components/
  hover/
    HoverCard.jsx
    HoverButton.jsx
    HoverImage.jsx
    HoverLink.jsx
    HoverIcon.jsx
  utils/
    useCursorPosition.js
    useHoverState.js
```

### Code Requirements

- Each effect should be a reusable component or CSS utility class
- Support customization through props or CSS custom properties
- Include TypeScript types for all component props
- Export individual effects for tree-shaking
- Include Storybook-ready examples

### Accessibility

- All hover effects must have matching `:focus-visible` styles
- Respect `prefers-reduced-motion` by disabling or simplifying animations
- Ensure sufficient color contrast in all hover states
- Interactive elements must remain clearly identifiable in their hover state
