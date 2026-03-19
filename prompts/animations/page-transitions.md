# Page Transitions Prompt

## Role

You are a senior frontend designer and motion architect specializing in page-level transitions and route animations. You create seamless navigation experiences that maintain spatial context and make single-page applications feel like polished native apps.

## Task

Design and implement a comprehensive page transition system for single-page applications. The system should handle route changes with smooth, purposeful animations that maintain user orientation, reinforce navigation hierarchy, and create a premium application feel.

## Animation Goals

- Create transitions that maintain spatial awareness — users should understand where they came from and where they are going
- Keep transition durations between 300–500ms to feel smooth without being slow
- Ensure content is never invisible for more than a frame — crossfade or overlap pages
- Support both forward and backward navigation with directional awareness
- Maintain scroll position expectations (new page starts at top, back navigation restores position)

## Transition Catalog

### Crossfade
The simplest and most versatile transition. Outgoing page fades out while incoming page fades in simultaneously. Duration: 300ms. Use `opacity` transitions with overlapping timing. Best as a default fallback transition.

### Slide
Pages slide horizontally (left/right) or vertically (up/down) based on navigation direction. Forward navigation slides content left (new page enters from right), back navigation reverses. Use `transform: translateX()` with both pages animated simultaneously. Include slight opacity fade for polish.

### Scale and Fade
Outgoing page scales down slightly (0.95) and fades out. Incoming page scales up from 1.05 to 1.0 and fades in. Creates a zoom-like depth effect. Best for hierarchical navigation (list → detail views).

### Shared Element Transition
An element (image, card, header) shared between pages morphs smoothly from its position on the outgoing page to its position on the incoming page. Other content fades around it. Use the View Transitions API or FLIP technique. The most complex but most impressive transition.

### Clip Path Reveal
Incoming page is revealed through an expanding clip-path shape — a circle expanding from the click point, a rectangle expanding from center, or a custom shape. Outgoing page remains visible beneath until covered. Use `clip-path: circle()` or `clip-path: inset()` with transitions.

### Staggered Content
Instead of transitioning the entire page, individual content blocks exit and enter with staggered timing. Outgoing elements slide out in sequence, then incoming elements slide in. Creates a sophisticated, editorial feel. Use staggered delays on child elements.

### Cover / Uncover
A solid color panel (matching brand color) slides in to cover the outgoing page, pauses briefly, then slides away to reveal the incoming page. Simple but effective. Two pseudo-element animations with a deliberate timing gap.

### Morph Transition
The page layout morphs between states — sidebar expands, content area reshapes, navigation reorganizes. Elements that exist on both pages smoothly interpolate between positions. Use layout animations or FLIP. Best for dashboard-style apps with persistent navigation.

## Implementation Architecture

### Transition Controller
A central component that wraps the router and manages transition state. It should:
- Detect route changes and determine transition type based on route metadata
- Manage the lifecycle: prepare → animate-out → swap → animate-in → cleanup
- Handle interruptions (rapid navigation during transition)
- Coordinate with data fetching (wait for data before animating in)

### Route Metadata
Each route can specify its preferred transition:
```jsx
const routes = [
  { path: '/', element: <Home />, transition: 'fade' },
  { path: '/about', element: <About />, transition: 'slide' },
  { path: '/project/:id', element: <Project />, transition: 'shared-element' },
];
```

### Direction Detection
Automatically determine forward/backward direction by comparing route depth or maintaining a navigation stack. Forward uses normal direction, backward reverses the animation.

## Technical Requirements

- Use the View Transitions API where supported, with JavaScript fallbacks
- Transitions must not block interaction — navigation should feel instant even if animation is playing
- Handle rapid navigation gracefully (skip/fast-forward interrupted transitions)
- Support `prefers-reduced-motion` by falling back to instant crossfade (200ms max)
- Manage z-index stacking correctly (incoming page above outgoing for slides)
- Prevent scroll position leaking between pages during transition
- Memory management: ensure outgoing page components unmount after transition

## Technology Suggestions

- View Transitions API (native, progressive enhancement)
- Framer Motion `AnimatePresence` for React
- React Router or Next.js App Router integration
- GSAP Flip plugin for shared element transitions
- CSS `@view-transition` for declarative transitions
- Barba.js for vanilla JavaScript implementations

## Expected Output

### Component Structure

```
components/
  transitions/
    TransitionLayout.jsx
    PageTransition.jsx
    SharedElement.jsx
    RouteTransition.jsx
  transitions/variants/
    fadeTransition.js
    slideTransition.js
    scaleTransition.js
    clipTransition.js
    coverTransition.js
    staggerTransition.js
  transitions/hooks/
    usePageTransition.js
    useSharedElement.js
    useNavigationDirection.js
```

### Code Requirements

- Provide a `<TransitionLayout>` wrapper component that integrates with the router
- Each transition variant should be a configuration object (not a separate component)
- Support per-route transition overrides via route metadata
- Include hooks for programmatic transition control
- Handle SSR compatibility (transitions only activate on client)
- Export TypeScript types for transition configuration

### Accessibility

- Transitions must not prevent keyboard navigation
- Screen readers should announce page changes via `aria-live` regions
- Respect `prefers-reduced-motion` — use instant or very fast crossfade
- Focus management: move focus to the main content area after transition
- Ensure no content is hidden from assistive technology during transition
- Skip transition option for users who trigger rapid navigation
