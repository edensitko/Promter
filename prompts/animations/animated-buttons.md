# Animated Buttons Prompt

## Role

You are a senior frontend designer and micro-interaction specialist. You create button components that feel alive, responsive, and satisfying to interact with — transforming simple clicks into memorable micro-experiences.

## Task

Design and implement a comprehensive library of animated button components. Each button variant should feature unique animation behaviors for hover, click, loading, success, and error states. Buttons must be accessible, performant, and adaptable to any design system.

## Animation Goals

- Create buttons that provide immediate, satisfying feedback on interaction
- Ensure animations are fast enough to feel responsive (hover: 150–200ms, click: 200–400ms)
- Communicate state changes clearly through motion (loading, success, error)
- Maintain text readability and clickability throughout all animation states
- Support seamless transitions between states without jarring jumps

## Button Animation Catalog

### Ripple Button
A Material Design-inspired ripple emanates from the click point. The ripple is a circle that scales up and fades out simultaneously. Color is a lighter or darker variant of the button background. Requires JavaScript to capture click coordinates and create/remove ripple elements dynamically.

### Gradient Shift Button
Background gradient continuously animates or shifts on hover. Use `background-size: 200% 200%` with `background-position` animation. On hover, the gradient shifts direction or speed increases. Creates a dynamic, living feel.

### Morphing Button
Button morphs between states: resting → loading (shrinks to circle with spinner) → success (expands back with checkmark) → error (shakes with X icon). Each transition is smooth and continuous. The width, border-radius, and content animate together.

### Magnetic Button
Button is attracted to the cursor as it approaches, with the button surface subtly deforming toward the mouse position. On hover, the button translates slightly toward the cursor. On leave, it springs back with elastic easing. Creates an organic, physical interaction.

### Neon Glow Button
Button has an animated neon glow effect. On hover, the glow intensifies and pulses. The border and text emit light using layered `box-shadow` and `text-shadow`. Particularly effective on dark backgrounds with vibrant accent colors.

### Liquid Fill Button
A liquid-like fill animation rises from the bottom on hover, as if the button is filling with color. Use `clip-path` with a wavy SVG path that animates upward, or a pseudo-element with a wave animation on top edge. Text color inverts as the fill passes.

### Elastic Press Button
Button squishes on press with elastic physics — compresses vertically and expands horizontally slightly, then bounces back on release. Use `transform: scaleX() scaleY()` with spring-physics easing. Provides satisfying tactile feedback.

### Split Text Button
On hover, each character of the button text animates individually — rising up, fading in, changing color, or shuffling. Characters are wrapped in spans and staggered with CSS animation-delay or GSAP stagger. Text appears to reform or assemble.

### Border Draw Button
Button border draws itself on hover. Starting from one corner, the border traces the full perimeter. Implemented with four pseudo-elements (or SVG `stroke-dasharray`) that animate in sequence. Clean and minimal.

### Particle Burst Button
On click, particles burst outward from the button — confetti, sparks, or geometric shapes. Particles are generated dynamically with randomized velocity, rotation, and fade. Use `canvas` or DOM elements with `requestAnimationFrame`.

## Technical Requirements

- Hover transitions must be under 200ms for perceived responsiveness
- Click/press animations should provide feedback within 100ms
- Loading state transitions should be smooth (300–500ms morph)
- All animations must use `transform` and `opacity` for GPU acceleration
- Button must remain clickable and functional during all animation states
- Prevent double-click issues during loading/morphing states
- Support both `<button>` and `<a>` element rendering

## Technology Suggestions

- CSS Transitions and Keyframe Animations
- Framer Motion for React implementations
- CSS Custom Properties for theming (colors, durations, intensity)
- GSAP for complex timeline animations (morph, particle burst)
- Tailwind CSS for base styling
- `canvas` API for particle effects

## Expected Output

### Component Structure

```
components/
  buttons/
    RippleButton.jsx
    GradientButton.jsx
    MorphButton.jsx
    MagneticButton.jsx
    NeonButton.jsx
    LiquidButton.jsx
    ElasticButton.jsx
    SplitTextButton.jsx
    BorderDrawButton.jsx
    ParticleButton.jsx
  buttons/hooks/
    useRipple.js
    useMagnetic.js
    useButtonState.js
```

### Code Requirements

- Each button should accept standard button props (onClick, disabled, type, children)
- Support size variants (sm, md, lg) and color themes
- Include loading, success, and error state support where applicable
- Export a `ButtonGroup` component for consistent spacing
- Provide CSS-only versions for ripple, gradient, and border-draw effects
- Include TypeScript types for all props and states

### Accessibility

- All buttons must be focusable and operable via keyboard (Enter and Space)
- Focus styles must be visible and not rely solely on animation
- Respect `prefers-reduced-motion` by falling back to simple opacity transitions
- Loading states must announce to screen readers via `aria-busy` and `aria-label`
- Disabled state must be visually distinct and set `aria-disabled`
- Minimum touch target size of 44x44px
