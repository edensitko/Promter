# Microinteractions Prompt

## Role

You are a senior UI engineer and interaction designer with expertise in delightful, purposeful microinteractions. You understand that the smallest animations — a toggling switch, a bouncing heart, a sliding tab indicator — are what make interfaces feel alive, responsive, and trustworthy. You design feedback loops that confirm user actions instantly and reduce cognitive load.

## Task

Design and implement a comprehensive library of microinteraction components covering form controls, action feedback, navigation patterns, and loading states. Each interaction should provide clear, immediate visual feedback that communicates state changes, successful actions, and system responses. Components must be reusable, composable, and production-ready.

## Animation Goals

- Create microinteractions that feel instant — primary feedback within 100ms, full animation within 300-500ms
- Use spring physics for natural, organic motion (avoid linear or overly mechanical easing)
- Ensure every animation communicates meaning: state change, success, error, or progress
- Keep animations subtle — they should delight without distracting or slowing the user down
- Support chaining: multiple microinteractions should compose into coherent sequences
- Maintain consistency: similar actions should have similar animation patterns across the system

## Animation Catalog

### Toggle Switch

#### Smooth Toggle
Custom toggle switch replacing the native checkbox. The knob (20px circle) slides from left to right over 250ms with `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring overshoot). Background color transitions from `#CBD5E1` (off) to brand color (on) with 200ms fade. Optional bounce: knob scales to 0.9x on press, 1.1x at midpoint, 1.0x at rest. Add a subtle shadow on the knob that shifts direction with movement. The track width should be 44px minimum for touch targets. Implementation: `<button role="switch" aria-checked>` with CSS transitions on `transform: translateX()` and `background-color`.

### Custom Checkbox

#### Checkmark Draw
Custom checkbox with an SVG checkmark that draws itself on check. The box border transitions from `#CBD5E1` to brand color over 150ms. Background fills with brand color simultaneously. Then the checkmark path animates in using `stroke-dashoffset`: start at full dash length, animate to 0 over 200ms with `cubic-bezier(0.65, 0, 0.35, 1)`. The checkmark SVG path: `M6 12l4 4 8-8` (stroke-width 2, stroke-linecap round). Total animation: 350ms. On uncheck, reverse with checkmark fading (opacity 150ms) rather than un-drawing. Use `<input type="checkbox">` visually hidden with custom `<label>` for native form compatibility.

### Input Focus

#### Floating Label
Input field with a label that floats from placeholder position to above the field on focus or when filled. Label starts at `transform: translateY(0)` inside the input, font-size 16px, color `#94A3B8`. On focus: `transform: translateY(-24px) scale(0.75)`, color transitions to brand color, 200ms `cubic-bezier(0.4, 0, 0.2, 1)`. Border-bottom transitions from 1px `#CBD5E1` to 2px brand color with a left-to-right reveal: pseudo-element `scaleX(0)` to `scaleX(1)` with `transform-origin: left`, 300ms. Add subtle box-shadow glow: `0 0 0 3px rgba(brand, 0.1)` on focus. On blur with content: label stays floated. On blur without content: label returns to placeholder position.

### Like / Heart Animation

#### Bouncing Heart
Heart icon animates on click with multi-stage feedback. **Stage 1 (0-100ms)**: Heart scales from 1.0 to 0.8 (press squish) with `cubic-bezier(0.4, 0, 1, 1)`. **Stage 2 (100-300ms)**: Heart scales from 0.8 to 1.2 (overshoot bounce) and fills from outline to solid, color transitions to `#EF4444`. Use `cubic-bezier(0.34, 1.56, 0.64, 1)`. **Stage 3 (300-400ms)**: Heart settles from 1.2 to 1.0 with gentle ease-out. Optional particle burst: 6-8 small circles (4px) burst outward from the heart center in random directions, fading over 400ms. Unlike animation: simple scale 1.0 to 0.9 to 1.0 (200ms) with color revert. No particles on unlike.

### Add to Cart

#### Flying Product
Product image thumbnail (or a ghost copy) flies from its position to the cart icon in the header. **Step 1**: Clone the product image, position it absolutely at the product's `getBoundingClientRect()`. **Step 2**: Animate along a bezier arc trajectory to the cart icon position. X movement is linear, Y follows a parabolic arc (`translateY` with negative peak then positive end). Duration: 600-800ms, `cubic-bezier(0.2, 0, 0.2, 1)`. Scale from 1.0 to 0.3 during flight. Opacity fades in last 20%. **Step 3**: On arrival, cart icon bounces: scale 1.0 to 1.3 to 1.0 over 300ms with spring easing. Cart badge number increments with a brief scale pulse.

### Notification Badge

#### Pulsing Badge
Notification count badge that animates when the count changes. On increment: badge scales from 1.0 to 1.4 to 1.0 over 400ms with `cubic-bezier(0.34, 1.56, 0.64, 1)`. The number inside crossfades: old number fades and translates up while new number fades in from below. When going from 0 to 1 (first notification), badge enters with scale from 0 to 1.2 to 1.0 (300ms) plus a subtle ring pulse: a circle expands outward from the badge and fades, similar to a radar ping. Badge color: `#EF4444` background. Size: minimum 20x20px, expanding to fit multi-digit numbers.

### Accordion / Collapse

#### Smooth Expand
Accordion panel that expands and collapses with smooth height animation. Use the `grid-template-rows: 0fr` to `1fr` technique for animatable height (avoids `max-height` hacks). Transition duration: 300ms with `cubic-bezier(0.4, 0, 0.2, 1)`. Content inside fades from `opacity: 0` to `1` with a 100ms delay (appears after expansion starts). Chevron icon rotates 180 degrees with matching timing. On collapse: content fades first (150ms), then height collapses (300ms). Ensure the inner wrapper has `overflow: hidden` during animation. Use `<details>`/`<summary>` as the semantic base with JavaScript enhancement for animated transitions.

### Tab Switching

#### Sliding Indicator
Active tab indicator (underline or pill) that slides to the selected tab with spring physics. The indicator is an absolutely positioned element beneath the tab bar. On tab change, the indicator's `left` position and `width` morph to match the new tab using `transform: translateX()` and `scaleX()`. Animation: 350ms with `cubic-bezier(0.34, 1.56, 0.64, 1)` for slight overshoot. Tab content crossfades: outgoing content fades and shifts slightly in the exit direction, incoming content fades in from the entry direction. Tab label color transitions: inactive `#64748B` to active brand color, 200ms.

### Toast Notification

#### Slide-In Toast
Toast notification slides in from the bottom-right (or configurable edge). Entry: `transform: translateX(120%)` to `translateX(0)` over 300ms with `cubic-bezier(0.4, 0, 0.2, 1)`. A progress bar at the bottom fills from 100% to 0% width over the auto-dismiss duration (default 5 seconds), using `transition: width 5s linear`. Swipe-to-dismiss: track touch/pointer drag, if `deltaX > 100px`, dismiss with `translateX(120%)` animation (200ms). Stack multiple toasts vertically with 8px gap, pushing older toasts upward when new ones arrive using `transform: translateY()`. Types: success (green), error (red), warning (amber), info (blue), each with corresponding icon.

### Copy to Clipboard

#### Button Confirm
Copy button transforms to show a checkmark confirmation. **Initial state**: button shows copy icon (two overlapping rectangles). **On click**: button background flashes to success green (150ms transition). Copy icon morphs to a checkmark via SVG path transition or opacity swap (icon 1 fades out, icon 2 fades in, 200ms crossfade). Text changes from "Copy" to "Copied!" with a fade swap. After 2 seconds, reverts to initial state with reverse animation. If copy fails, show an X icon with error red instead. Button should be `disabled` during the confirmation period to prevent double-copy.

### Pull to Refresh

#### Stretch and Spin
Pull-to-refresh interaction for scrollable containers. **Phase 1 - Pull**: As user pulls down, a refresh indicator stretches into view. Show a circular arrow icon that rotates proportionally to pull distance (0-360deg over the 80px threshold). The container content shifts down with rubber-band resistance: `translateY(pullDistance * 0.4)`. **Phase 2 - Threshold**: At 80px pull, the icon snaps to a spinning loader with `animation: spin 600ms linear infinite`. Haptic feedback trigger point (if available via `navigator.vibrate`). **Phase 3 - Loading**: Icon continues spinning, content stays offset. **Phase 4 - Complete**: Spinner morphs to checkmark, hold 500ms, then slide back to position with spring easing (400ms).

### Skeleton Loading

#### Shimmer Wave
Placeholder skeleton shapes with an animated shimmer that sweeps across them. Skeleton shapes match the layout of the content they replace: rectangles for text lines (varying widths: 100%, 80%, 60%), circles for avatars, rounded rectangles for images. Base color: `#E2E8F0`. Shimmer implemented as a `linear-gradient(90deg, transparent 0%, #F8FAFC 50%, transparent 100%)` animated via `background-position` shifting from `-200%` to `200%` over 1.5 seconds, `ease-in-out`, infinite. Apply `background-size: 200% 100%` to allow the gradient to travel across the element. Use CSS `@keyframes shimmer { from { background-position: -200% 0 } to { background-position: 200% 0 } }`. Stagger animation-delay by 100ms per skeleton row for a cascading wave effect.

## Technical Requirements

- Use CSS transitions for simple state changes (toggle, checkbox, input focus) — no JavaScript animation needed
- Use spring-based easing curves: `cubic-bezier(0.34, 1.56, 0.64, 1)` for overshoot, `cubic-bezier(0.25, 0.1, 0.25, 1)` for smooth settle
- For complex sequences (like/heart, add-to-cart), use Framer Motion keyframes or GSAP timelines
- SVG animations (checkmark draw, icon morphs) should use `stroke-dashoffset` and `stroke-dasharray` manipulation
- All microinteractions must complete within 500ms for primary feedback (toast dismiss timing is separate)
- `getBoundingClientRect()` calls for position calculations must be batched to avoid layout thrashing
- Accordion height animation must use `grid-template-rows` technique — not `max-height` with arbitrary large values
- Touch targets for toggle and checkbox must meet minimum 44x44px (WCAG 2.5.8)
- Form control microinteractions must not interfere with native form submission or validation

## Technology Suggestions

- CSS Transitions and Custom Properties for simple state animations
- Framer Motion with `useSpring`, `AnimatePresence`, and `layout` for React implementations
- GSAP for multi-step timeline animations (add-to-cart, complex sequences)
- SVG `stroke-dasharray` / `stroke-dashoffset` for checkmark and icon draw effects
- React Spring for physics-based animations in the React ecosystem
- Radix UI or Headless UI for accessible base components (toggle, accordion, tabs)
- Tailwind CSS for styling and responsive design
- `@formkit/auto-animate` for simple list and layout transitions

## Expected Output

### Component Structure

```
components/
  micro/
    Toggle.jsx
    Checkbox.jsx
    FloatingInput.jsx
    LikeButton.jsx
    AddToCart.jsx
    NotificationBadge.jsx
    Accordion.jsx
    TabBar.jsx
    Toast.jsx
    CopyButton.jsx
    PullToRefresh.jsx
    SkeletonLoader.jsx
  providers/
    ToastProvider.jsx
  hooks/
    useToggle.js
    useAccordion.js
    useToast.js
    usePullToRefresh.js
    useClipboard.js
```

### Code Requirements

- Each microinteraction should be a self-contained component with built-in animation logic
- Support customization via props: `duration`, `easing`, `colors`, `size`, and effect-specific options
- Form controls (Toggle, Checkbox, FloatingInput) must work with `react-hook-form` and native forms
- `ToastProvider` manages toast stack with `useToast()` hook returning `{ toast, dismiss, dismissAll }`
- All components must forward refs and accept className for style overrides
- Include compound component patterns where appropriate (Accordion.Item, TabBar.Tab, TabBar.Panel)
- Export both controlled and uncontrolled versions of stateful components
- Bundle size budget: each component under 5KB gzipped

### Accessibility

- Respect `prefers-reduced-motion`: reduce all animations to instant state changes (opacity: 0/1, no motion)
- Toggle: use `role="switch"` with `aria-checked`, announce state change to screen readers
- Checkbox: use hidden native `<input type="checkbox">` for form compatibility, `aria-label` on custom visual
- Accordion: use `aria-expanded`, `aria-controls`, and `id` linking between trigger and panel
- Tabs: implement full WAI-ARIA Tabs pattern with `role="tablist"`, `role="tab"`, `role="tabpanel"`, arrow key navigation
- Toast: use `role="status"` for informational, `role="alert"` for errors; auto-dismiss must be pausable on hover/focus
- Skeleton: use `aria-busy="true"` on the loading container and `aria-hidden="true"` on skeleton shapes
- All interactive components must be operable via keyboard with visible focus indicators
- Like button: announce "Liked" / "Unliked" via `aria-live="polite"` region
