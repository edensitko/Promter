# Animated Cards Prompt

## Role

You are a senior frontend designer and interaction specialist with expertise in card-based UI patterns and micro-animations. You design card components that are visually engaging, highly interactive, and maintain excellent usability.

## Task

Create a comprehensive library of animated card components for use across various website types. Each card variant should feature unique animation behaviors for hover, entrance, interaction, and transition states. Cards must be flexible, responsive, and reusable.

## Animation Goals

- Create cards that invite interaction through subtle, continuous, or triggered animation
- Ensure animations reinforce content hierarchy and user understanding
- Maintain 60fps performance across all animation states
- Balance visual impact with usability — animations should never obscure content
- Provide smooth transitions between card states (default, hover, active, expanded)

## Card Animation Catalog

### Flip Card
A two-sided card that rotates on hover to reveal additional content on the back. Uses `transform: rotateY(180deg)` with `backface-visibility: hidden` on both faces. The front shows a summary (image, title), the back shows details (description, CTA). Transition duration: 500–600ms with ease-in-out.

### Tilt Card
Card tilts dynamically based on cursor position, creating a 3D perspective effect. Uses JavaScript to calculate cursor position relative to the card center, then applies `transform: perspective(1000px) rotateX() rotateY()`. Add a glossy light reflection that follows the tilt angle for extra polish.

### Expand Card
Card expands from its grid position to fill a larger area (or the full viewport) when clicked. Content morphs from a compact summary to a detailed view. Use `layout` animations (Framer Motion) or FLIP technique for smooth positional transitions. Other cards fade or shift to accommodate.

### Stacked Card Carousel
Cards are stacked with slight offsets (like a deck). Swiping or clicking fans them out or cycles through the stack. Each card has a slight rotation and shadow that changes as it moves through the stack. Creates a tactile, physical feel.

### Glow Border Card
Card features a subtle animated gradient border that shifts colors continuously or reacts to cursor proximity. Implemented with a pseudo-element background gradient that rotates via CSS animation, masked by the card's inner content area. Particularly effective on dark backgrounds.

### Morphing Card
Card shape or layout morphs smoothly between states. A circular avatar card might expand into a rectangular profile card. A compact metric card might morph into a detailed chart view. Use `clip-path` animations or layout transitions.

### Parallax Content Card
Card content layers (background image, overlay, text) move at different rates on hover, creating internal parallax depth. The background shifts opposite to cursor movement, text shifts slightly with it. Subtle but creates a premium feel.

### Skeleton to Content Card
Card starts as a skeleton loading state with animated gradient shimmer. Content elements (image, text, badges) animate in individually with staggered fade-up once data loads. Each element replaces its skeleton counterpart with a smooth crossfade.

## Technical Requirements

- All transform-based animations must use `will-change: transform` sparingly (only during animation)
- Card flip and tilt effects require `perspective` on parent or `transform-style: preserve-3d`
- Expand animations should use the FLIP (First, Last, Invert, Play) technique for layout transitions
- Touch device support: tilt follows touch position, flip triggers on tap
- Cards must maintain their aspect ratio across responsive breakpoints
- Stagger animations when multiple cards enter the viewport simultaneously
- Clean up event listeners and animation frames on component unmount

## Technology Suggestions

- React with Framer Motion for layout animations
- CSS `transform-style: preserve-3d` for 3D card effects
- GSAP for complex timeline-based card animations
- CSS `@property` for animating gradient borders
- Tailwind CSS for base card styling and responsive grid
- `react-spring` as an alternative physics-based animation library

## Expected Output

### Component Structure

```
components/
  cards/
    FlipCard.jsx
    TiltCard.jsx
    ExpandCard.jsx
    StackedCards.jsx
    GlowCard.jsx
    MorphCard.jsx
    ParallaxCard.jsx
    SkeletonCard.jsx
  cards/hooks/
    useTilt.js
    useExpand.js
    useCardStack.js
```

### Code Requirements

- Each card variant should be a self-contained component
- Support customization via props: animation speed, intensity, colors, content slots
- Include both controlled and uncontrolled variants for expand/stack cards
- Provide CSS-only fallbacks for flip and glow effects
- Export a `CardGrid` layout component that handles staggered entrance animations
- Include TypeScript interfaces for all props

### Accessibility

- Flip cards must have both sides accessible to screen readers
- Expanded cards must trap focus and support Escape to close
- Tilt effects should be disabled when `prefers-reduced-motion` is set
- All interactive cards must have proper `role`, `aria-label`, and keyboard support
- Touch targets must meet minimum 44x44px size requirements
