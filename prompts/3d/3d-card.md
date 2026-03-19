# 3D Card Component Prompt

## Role

You are a senior frontend designer and 3D web specialist with deep expertise in CSS 3D transforms, perspective projection, parallax layering, and micro-interaction design. You have built award-winning interactive card interfaces for portfolio sites, SaaS dashboards, and creative agencies. You understand how to use depth, motion, and lighting cues to create tactile UI elements that feel physically present on screen while remaining performant and accessible.

## Task

Design and build a collection of 3D card components that respond to mouse movement and device orientation with realistic perspective tilt, dynamic lighting shifts, parallax-separated content layers, and subtle depth-based shadows. The cards must feel like physical objects floating above the page -- tilting toward the cursor, catching light on their edges, and casting soft shadows that shift with the viewing angle. Each card variant (feature card, pricing card, testimonial card, image showcase card) should share a common interaction system but have distinct visual treatments. The system must be fully responsive, touch-friendly, and degrade gracefully on devices that do not support advanced CSS transforms.

## 3D Design Goals

- **Tactile depth perception**: Cards should feel like they exist in physical space with clear front-face, edge thickness, and shadow separation from the background surface beneath them.
- **Responsive to presence**: The card reacts to the user's cursor position (desktop) or device tilt (mobile gyroscope), creating a sense that the card is aware of the viewer.
- **Layered parallax**: Content within the card (background image, mid-ground text, foreground badge/icon) moves at different rates during tilt, reinforcing the illusion of internal depth.
- **Dynamic lighting**: A specular highlight gradient shifts across the card surface in response to tilt angle, simulating a glossy or holographic finish.
- **Subtle and refined**: Maximum tilt angle is constrained (15-20 degrees) to keep the effect elegant rather than gimmicky. Transitions use spring-based easing for organic motion.
- **Consistent across variants**: All card types share the same tilt engine and depth system, ensuring a unified feel across the interface.

## Scene Description

Each card is a rectangular element (aspect ratio approximately 3:4 for vertical cards or 16:9 for horizontal cards) that hovers 20-40px above the page surface via a layered box-shadow and `translateZ` offset. The card's container has a `perspective` value between 800px and 1200px applied to its parent, creating a shared vanishing point for cards in a grid.

The card itself is composed of multiple visual layers stacked along the Z-axis using `translateZ`:
- **Layer 0 (Background)**: A full-bleed image, gradient, or pattern that sits at Z = 0px.
- **Layer 1 (Content)**: The main text content (title, description) sitting at Z = 20px, moving slightly against the background during tilt.
- **Layer 2 (Foreground)**: Badges, icons, CTAs, or decorative elements at Z = 40px, exhibiting the most pronounced parallax shift.
- **Edge**: A visible 2-4px border or pseudo-element side panel that becomes more or less visible as the card tilts, reinforcing the 3D solid appearance.

A radial gradient overlay (white, 10-20% opacity) follows the cursor's relative position within the card to simulate a specular light reflection. The shadow beneath the card is a multi-layer `box-shadow` that shifts horizontally and vertically opposite to the tilt direction, as if a fixed overhead light casts the shadow.

## Interaction Model

- **Mouse Hover (Desktop)**: As the cursor enters the card, the card lifts slightly (scale 1.02, translateZ +10px) and begins tracking the cursor for tilt. The tilt angle is proportional to the cursor's offset from the card center, mapped to `rotateX` and `rotateY` values between -15 and +15 degrees. The specular highlight follows the cursor. On mouse leave, the card smoothly springs back to its neutral flat position over 600ms with spring easing (damping: 0.6, stiffness: 150).
- **Touch / Gyroscope (Mobile)**: On devices with a gyroscope, tilt is driven by the device's physical orientation (`DeviceOrientationEvent`), giving a natural window-into-a-box effect. On touch-only devices without gyroscope, a single-finger drag on the card triggers tilt proportional to drag distance from the initial touch point. Releasing snaps back to neutral.
- **Focus (Keyboard)**: When a card receives focus via Tab, it performs a single gentle "breathe" animation (slight lift and settle) to indicate selection. Arrow keys nudge the virtual tilt by 5 degrees for exploration, Enter activates the card link.
- **Click / Tap**: Clicking the card triggers a satisfying press animation (scale to 0.98, shadow compress, brief 150ms) before navigating or executing the card's action.
- **Reduced Motion**: If `prefers-reduced-motion` is enabled, all tilt and parallax effects are disabled. The card still lifts on hover via a simple opacity/shadow change, and the specular highlight is replaced with a static subtle sheen.

## Technical Requirements

- Built entirely with **CSS 3D transforms** (`perspective`, `rotateX`, `rotateY`, `translateZ`, `transform-style: preserve-3d`) and JavaScript for pointer tracking -- no WebGL or canvas dependency.
- All animations must run on the **compositor thread** (transforms and opacity only) to guarantee 60 fps. No layout-triggering properties (`width`, `height`, `top`, `left`) may be animated.
- Use `will-change: transform` sparingly and only on cards currently being interacted with. Remove the hint after interaction ends to free GPU memory.
- Pointer tracking must use `requestAnimationFrame` to throttle updates and avoid layout thrashing. Pointer position should be interpolated (lerped) toward the target each frame for buttery-smooth motion.
- The component must request `DeviceOrientationEvent` permission on iOS 13+ before accessing gyroscope data, and handle denial gracefully.
- Cards must be fully **responsive** -- the tilt system must recalculate card bounds on resize (debounced) and work correctly in CSS Grid or Flexbox layouts.
- Each card must be a **semantic HTML element** (`<article>` or `<a>`) with proper heading hierarchy, alt text for images, and ARIA attributes.
- The component must support **SSR** -- initial render produces valid static HTML/CSS with no JavaScript dependency for the base layout. The 3D interactivity enhances progressively on hydration.

## Technology Suggestions

- **React 18+** -- component framework with hooks for state and refs
- **Framer Motion** -- spring-based animations, `useMotionValue`, `useTransform`, and `useSpring` for silky tilt interpolation
- **CSS Custom Properties (Variables)** -- dynamically set `--rotateX`, `--rotateY`, `--lightX`, `--lightY` from JavaScript, consumed by CSS `transform` and `background` rules for a clean separation of logic and style
- **Tailwind CSS** -- utility-first styling for layout, spacing, typography, and responsive breakpoints
- **clsx / tailwind-merge** -- conditional class composition for variant styling
- **Zustand** (optional) -- shared state if cards need coordinated behavior (e.g., only one card tilts at a time in a showcase mode)
- **@use-gesture/react** (optional) -- unified gesture handling for mouse, touch, and drag with velocity and inertia data

## Performance Guidelines

- **GPU Layer Management**: Only promote the currently hovered card to a GPU layer (`will-change: transform`). Cards at rest should not consume GPU memory for compositing.
- **Batch DOM Reads**: Read `getBoundingClientRect` once on `pointerenter` and cache the result. Do not re-read on every `pointermove`. Invalidate cache on `resize` (debounced at 200ms).
- **Lerp Factor**: Use a lerp factor of 0.08-0.12 per frame for tilt interpolation. This provides smooth motion without feeling sluggish or overshooting.
- **Shadow Complexity**: Limit box-shadow to 2-3 layers maximum. Avoid `filter: blur()` for shadows as it forces rasterization on every frame during animation.
- **Image Optimization**: Card background images should use `loading="lazy"`, `srcset` for responsive sizes, and modern formats (WebP/AVIF). Dimensions must be set to prevent CLS.
- **Render Budget**: A grid of 12 cards on screen simultaneously must maintain 60 fps during a full-page scroll. Only cards within the viewport (Intersection Observer) should run their animation loops.
- **Mobile**: Reduce parallax layer count from 3 to 2 on devices with screens narrower than 768px. Disable gyroscope tracking when battery saver mode is detected (if available via Battery Status API).

## Expected Output

### Component Structure

```
Card3D/
  Card3D.tsx                 # Base 3D card with tilt engine, parallax, and lighting
  Card3DGroup.tsx            # Grid/flex wrapper that sets shared perspective context
  variants/
    FeatureCard.tsx           # Card with icon, title, description, CTA
    PricingCard.tsx           # Card with plan name, price, features list, button
    TestimonialCard.tsx       # Card with avatar, quote, author name, role
    ImageShowcaseCard.tsx     # Card with hero image, overlay title, tag badges
  hooks/
    useTiltEffect.ts          # Core hook: pointer tracking, lerp, spring, rAF loop
    useGyroscope.ts           # DeviceOrientation hook with permission handling
    useCardBounds.ts          # Cached bounding rect with resize invalidation
    useReducedMotion.ts       # Detects prefers-reduced-motion media query
  utils/
    mathUtils.ts              # clamp, lerp, mapRange, degreesToRadians helpers
    shadowUtils.ts            # Dynamic shadow offset calculator based on tilt angle
  styles/
    card3d.module.css         # CSS with 3D transform rules, custom property bindings
  types/
    card.types.ts             # TypeScript interfaces for card props and variants
```

### Code Requirements

- Written in **TypeScript** with strict mode and explicit prop typing for every component.
- All components must be **functional React components** using hooks and `forwardRef` where imperative access is needed.
- The tilt engine (`useTiltEffect`) must be **framework-agnostic** in its core math logic, with the React hook as a thin wrapper, so it can be ported to Vue or Svelte easily.
- Props must support **full customization**: max tilt angle, perspective distance, parallax intensity, spring config, glare toggle, and disabled state.
- Components must accept **className** and **style** overrides and spread remaining props onto the root element for composability.
- Follow **ESLint + Prettier** conventions. No inline styles except for dynamic CSS custom property assignments.
- Include **Storybook stories** for each variant with interactive controls (knobs) for tilt angle, parallax depth, spring stiffness, and glare intensity.
- Include **unit tests** for math utilities and integration tests verifying tilt behavior on simulated pointer events.

### Fallback Strategy

- On browsers that do not support `transform-style: preserve-3d` (detected via CSS `@supports`), render cards as **flat elevated surfaces** with a static box-shadow and a subtle scale-up on hover. All content remains fully readable and interactive.
- On devices where JavaScript fails to load or is disabled, the **base CSS** provides a complete card layout with proper spacing, typography, and a static shadow. No interactive effect, but zero visual breakage.
- If gyroscope permission is denied on mobile, fall back to **touch-drag tilt** automatically without prompting the user again.
- When `prefers-reduced-motion: reduce` is active, replace all transform animations with **opacity transitions** (hover: opacity 0.9 to 1.0, shadow darken) for a clean, accessible hover state that still communicates interactivity.
- For screen readers, each card's 3D tilt state is irrelevant -- the card announces as a standard **article or link** with a clear label, and decorative motion is hidden via `aria-hidden` on the glare overlay and parallax decoration elements.
