# Liquid Animations Prompt

## Role

You are a senior creative developer and motion designer specializing in fluid dynamics simulation, SVG filter techniques, and organic motion on the web. You create liquid, gooey, and morphing effects that feel natural and tactile, blurring the line between digital interfaces and physical materials.

## Task

Design and implement a comprehensive collection of liquid and fluid animation effects for modern web interfaces. Effects should include interactive button fills, morphing blobs, wave dividers, page transitions, and filter-based gooey effects. Each effect must be visually rich while remaining performant and accessible.

## Animation Goals

- Create fluid animations that feel organic, tactile, and physically plausible
- Use SVG filters and CSS filter tricks to achieve gooey, liquid visual effects
- Ensure all animations run at 60fps by leveraging GPU-composited properties and efficient SVG rendering
- Provide fallback styles for browsers with limited SVG filter support
- Make effects interactive where appropriate — responding to cursor position, scroll, or user actions
- Balance visual complexity with performance: simpler effects use CSS, complex effects use Canvas

## Animation Catalog

### Liquid Button Fills

#### Wave Fill Button
On hover, the button fills from the bottom with an animated liquid wave. Implementation: a pseudo-element inside the button starts positioned below the visible area (`transform: translateY(100%)`), then rises to `translateY(0)` over 500ms. The top edge of the fill is an SVG wave path animated via CSS keyframes shifting `background-position` horizontally to create wave motion. Wave parameters: amplitude 6-10px, wavelength matching button width, animation duration 1.5s linear infinite for continuous wave. Text color inverts as the fill passes using `mix-blend-mode: difference` or duplicate text layers. Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for the fill rise. On hover out, the liquid drains back down with slightly slower timing (600ms).

### Blob Morphing

#### Organic Blob
An SVG blob shape that continuously morphs between 3-5 organic forms. Each form is a `<path>` with the same number of control points (8-12 points on an elliptical base with randomized radial offsets of 10-30%). Morphing uses CSS `d: path()` transitions (in supporting browsers) or JavaScript interpolation between path data arrays. Animation duration: 4-8 seconds per morph cycle with `ease-in-out` timing. The blob should feel alive — use layered blobs at different scales and opacity (0.3-0.7) with offset timing for depth. Apply gradient fills or `filter: blur(40px)` for a soft ambient background effect. Blobs can optionally respond to cursor position, shifting their center point toward the pointer.

### Wave Section Dividers

#### Multi-Layer Waves
Animated SVG waves used as section dividers between content blocks. Render 2-4 wave layers at different vertical offsets, each with unique amplitude (15-40px), wavelength, and animation speed. Each wave is an SVG `<path>` using cubic bezier curves, animated by horizontally translating the path. Layer 1 (back): slowest speed (20s cycle), lowest opacity (0.3), largest amplitude. Layer 4 (front): fastest speed (8s cycle), full opacity, smallest amplitude. Colors should form a gradient from the section above to the section below. Implementation: inline SVG with `preserveAspectRatio="none"` to stretch full width. Animate via CSS `transform: translateX()` on a path that is double the viewport width, creating seamless horizontal looping. Total divider height: 80-150px.

### Liquid Page Transitions

#### Dissolve and Reform
Full-page transition where the current page content appears to dissolve into liquid, then reforms as the new page. **Phase 1 - Dissolve (400ms)**: Apply an SVG displacement filter (`feTurbulence` + `feDisplacementMap`) to the page content with increasing `scale` attribute (0 to 80), creating a rippling distortion. Simultaneously fade opacity to 0. **Phase 2 - Liquid Bridge (200ms)**: A full-screen liquid blob or wave animation plays as the interstitial. **Phase 3 - Reform (400ms)**: New page content fades in from opacity 0 with the displacement filter reversing (scale 80 to 0). Use `feTurbulence` parameters: `type="fractalNoise"`, `baseFrequency="0.015"`, `numOctaves="3"`. Coordinate with client-side routing for SPA page changes.

### Drip Effects

#### Melting Elements
Elements appear to melt or drip on scroll or interaction. Apply an SVG filter chain: `feTurbulence` for distortion pattern + `feDisplacementMap` applied to the bottom portion of the element, increasing `scale` based on scroll progress or hover state. The distortion creates a dripping appearance at the element's bottom edge. Enhance with pseudo-element drip shapes: absolute-positioned tear-drop SVGs that scale and drop downward with `transform: translateY()` and `scaleY()` animation, timing 800-1200ms with `cubic-bezier(0.55, 0.085, 0.68, 0.53)` (accelerating, like gravity). Color-match drips to the element's background.

### Gooey Filter Effect

#### Sticky Merge
SVG filter-based gooey effect that makes elements appear to merge and separate like sticky liquid. The core filter chain: `feGaussianBlur(stdDeviation="10")` to blur elements, then `feColorMatrix(type="matrix", values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7")` to re-sharpen edges with high contrast on the alpha channel. Apply this filter to a container element. When child elements (circles, buttons, nav items) are close enough, the blur causes their edges to visually merge, and the color matrix re-sharpens them into a connected gooey shape. Animate child positions via `transform: translate()` to create merge and separate motions. Works beautifully for navigation indicators, toggle groups, and decorative blobs. Filter values are critical: `stdDeviation` controls merge distance, matrix values `18 -7` control the sharpness threshold.

### Fluid Gradient

#### Living Gradient Background
A background gradient that flows and shifts like liquid, optionally responding to cursor position. Create 3-5 radial gradient layers using CSS `background` with multiple `radial-gradient()` values or a Canvas implementation. Each gradient blob has a position that moves along a smooth path (Lissajous curves or simplex noise). Animation: each blob's `background-position` shifts over 10-20 second cycles using CSS `@keyframes` with percentage-based position changes. For cursor interactivity: one gradient blob follows the mouse with lerp smoothing (factor 0.05), blending with the ambient animation. Colors should be rich and harmonious — use analogous or triadic schemes with low saturation for subtlety. Apply `filter: blur(60-100px)` to the gradient layer for soft blending. For Canvas: render gradient circles and apply Gaussian blur via the Canvas filter property.

## Technical Requirements

- SVG filters must be defined in an inline `<svg>` block (not external file) for reliable cross-browser rendering
- Use `feGaussianBlur` + `feColorMatrix` alpha manipulation as the core gooey filter technique
- All SVG filter animations should modify attributes via CSS transitions or JavaScript `setAttribute` — avoid SMIL
- Wave animations must use `transform: translateX()` for GPU compositing — never animate path data on every frame
- For liquid page transitions, cache the outgoing page as an image (via `getComputedStyle` or screenshot) to avoid animating live DOM
- Canvas-based fluid gradients should use `requestAnimationFrame` with delta-time calculations
- Test SVG filter performance on Safari specifically — apply `will-change: filter` or isolate filtered content in its own compositing layer
- Gooey filter `stdDeviation` above 15 can be expensive — keep it between 8 and 12 for production use
- Use `contain: paint` on elements with applied SVG filters to limit the filter's repaint area
- Provide CSS-only fallbacks: simple `background-color` transitions or `opacity` fades when SVG filters are not supported

## Technology Suggestions

- SVG filters (`feTurbulence`, `feDisplacementMap`, `feGaussianBlur`, `feColorMatrix`) for liquid and gooey effects
- CSS `clip-path` and `@keyframes` for wave dividers
- GSAP with MorphSVGPlugin for blob path morphing
- Framer Motion for React-based liquid button and transition orchestration
- Canvas 2D API with `filter: blur()` for fluid gradient backgrounds
- `simplex-noise` for organic gradient motion paths
- CSS `mix-blend-mode` and `backdrop-filter` for layered gradient effects
- Tailwind CSS for layout and base styling

## Expected Output

### Component Structure

```
components/
  liquid/
    LiquidButton.jsx
    BlobMorph.jsx
    WaveDivider.jsx
    LiquidTransition.jsx
    DripEffect.jsx
    GooeyContainer.jsx
    FluidGradient.jsx
  filters/
    GooeyFilter.svg
    DisplacementFilter.svg
    TurbulenceFilter.svg
  hooks/
    useLiquidFill.js
    useBlobPath.js
    useFluidGradient.js
    useDisplacement.js
  utils/
    pathInterpolation.js
    svgFilterBuilder.js
```

### Code Requirements

- Each effect should be a self-contained component with its required SVG filter definitions inlined
- Support theme customization via props: `colors`, `speed`, `intensity`, `blurAmount`, `waveAmplitude`
- `GooeyContainer` must accept children and apply the gooey filter to the group — children opt in by being inside the container
- `WaveDivider` accepts `topColor`, `bottomColor`, `layers` (1-4), `amplitude`, and `speed` props
- `LiquidTransition` integrates with React Router or Next.js page transitions via `onExitComplete` callbacks
- Blob morphing paths must all have identical point counts for smooth interpolation — include a path normalization utility
- Export reusable SVG filter definitions as separate components for composition in custom effects
- Include TypeScript types for all component props and configuration objects

### Accessibility

- Respect `prefers-reduced-motion`: replace all liquid animations with instant transitions (`transition-duration: 0ms`) or static gradients
- SVG filter elements must be hidden from assistive technology (`aria-hidden="true"` on the `<svg>` containing filter definitions)
- Liquid page transitions must not exceed 1 second total — users should not wait for decorative animation
- Wave dividers are decorative: mark with `role="presentation"` and `aria-hidden="true"`
- Ensure text over fluid gradients maintains WCAG AA contrast ratio (4.5:1 minimum) at all gradient positions
- Gooey filter effects must not be used on text or interactive controls where clarity is critical
- Provide `motion-safe` and `motion-reduce` CSS custom property tokens for easy system-wide toggle
