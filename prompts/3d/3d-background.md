# Immersive 3D Animated Background Prompt

## Role

You are a creative developer specializing in real-time 3D graphics for the web.
You have deep expertise with WebGL, Three.js, and shader programming (GLSL). You
build immersive, GPU-accelerated visual experiences that serve as living
backgrounds for websites — captivating without overwhelming the foreground content.
You balance visual spectacle with performance, ensuring smooth frame rates across
devices.

## Task

Create an immersive, full-viewport 3D animated background that can sit behind
website content. The background should feature dynamic elements — particles, waves,
geometric shapes, or organic forms — rendered in real time with WebGL. It must be
interactive (responding to mouse or scroll) and performant enough to serve as a
persistent page background without degrading the user experience.

## Design Goals

- **Atmospheric depth**: The 3D scene creates a sense of space and immersion that
  flat CSS backgrounds cannot achieve.
- **Subtlety at rest**: When the user is not interacting, the animation is calm
  and ambient — slow drifts, gentle pulses, soft color shifts.
- **Responsive to interaction**: Mouse movement, scroll position, or device
  orientation subtly influences the scene (camera angle, particle behavior,
  wave amplitude).
- **Content harmony**: The background enhances but never competes with foreground
  text and UI. It should feel like a living canvas beneath the page.

## Requirements

### Scene Options (implement at least 2)

1. **Particle Field**: Thousands of floating particles in 3D space connected by
   faint lines when within proximity. Particles drift slowly, react to mouse
   position (repel or attract), and shift color over time. Camera slowly orbits.

2. **Undulating Wave Mesh**: A subdivided plane geometry whose vertices displace
   vertically using sine/noise functions, creating a rolling ocean or terrain
   effect. Color maps to height. Mouse influences wave origin or amplitude.

3. **Geometric Constellation**: Floating 3D primitives (icosahedrons, octahedrons,
   torus knots) that rotate independently, connected by thin lines or light beams.
   Mouse proximity causes shapes to scatter or cluster.

4. **Gradient Blob / Metaball**: Soft organic shapes rendered with raymarching in
   a fragment shader. Blobs merge and separate like a lava lamp. Colors shift
   through a defined palette.

### Visual Requirements

1. Color palette driven by CSS custom properties passed to the shader via
   JavaScript, so the background can be re-themed without editing shader code.
2. Subtle depth-of-field or fog effect to create atmospheric perspective.
3. Smooth color transitions — no harsh jumps. Use gradient palettes or HSL
   interpolation.
4. Optional post-processing: bloom, chromatic aberration, or film grain at
   low intensity.

### Interaction

1. Mouse/pointer position influences at least one parameter (camera rotation,
   force field origin, wave amplitude, light position).
2. Scroll position maps to at least one visual change (zoom level, color shift,
   scene rotation, particle density).
3. On touch devices, use device orientation (gyroscope) as an alternative to
   mouse input, with a fallback to touch position.
4. All interactions must be smoothly interpolated (lerp) to avoid jerky
   transitions.

### Performance

1. Target 60fps on mid-range hardware (e.g., MacBook Air M1, iPhone 12,
   Samsung Galaxy S21).
2. Implement a performance monitor that automatically reduces particle count,
   disables post-processing, or lowers resolution if frame rate drops below 30fps.
3. Canvas resolution should respect `window.devicePixelRatio` but cap at 2x to
   avoid GPU strain on high-DPI displays.
4. Use `requestAnimationFrame` for the render loop. Pause rendering when the
   tab is not visible (`document.visibilitychange`).
5. Dispose of all Three.js geometries, materials, and textures on unmount to
   prevent memory leaks.

### Integration

1. The 3D canvas is positioned `fixed` behind all page content with
   `z-index: -1` and `pointer-events: none` (except for mouse tracking via a
   transparent overlay or document-level listener).
2. Foreground content scrolls normally on top of the canvas.
3. Provide a simple API or configuration object to initialize the background:
   ```js
   initBackground({
     container: '#bg-canvas',
     scene: 'particles',  // or 'waves', 'geometric', 'blobs'
     colors: ['#6C63FF', '#FF6584', '#43E97B'],
     intensity: 0.7,       // 0-1 scale
     interactive: true
   });
   ```
4. Include a "reduce motion" mode that freezes the scene to a static state when
   `prefers-reduced-motion` is active.

### Accessibility

1. The canvas element has `aria-hidden="true"` since it is purely decorative.
2. No critical information is conveyed through the 3D scene.
3. A `prefers-reduced-motion` listener stops all animation and shows a static
   gradient or blurred snapshot instead.

## Technology Suggestions

| Layer         | Recommended                                          |
|---------------|------------------------------------------------------|
| 3D Engine     | Three.js (r160+)                                     |
| Shaders       | Custom GLSL vertex/fragment shaders                  |
| Post-Process  | Three.js EffectComposer or custom passes             |
| Interaction   | Pointer events + lerp, optional DeviceOrientation    |
| Noise         | simplex-noise or GLSL noise functions                |
| Framework     | Vanilla JS, React Three Fiber, or Svelte Threlte     |
| Build Tool    | Vite with GLSL import plugin                          |
| Performance   | Stats.js for dev, adaptive quality system            |

## Expected Output Structure

```
3d-background/
  index.html                  # Demo page with foreground content + 3D bg
  css/
    variables.css             # Color tokens consumed by JS
    page.css                  # Foreground content styles
  js/
    background.js             # Main init, config, and API
    scenes/
      particles.js            # Particle field scene
      waves.js                # Wave mesh scene
      geometric.js            # Geometric constellation scene
      blobs.js                # Metaball / blob shader scene
    utils/
      performance.js          # Adaptive quality manager
      interaction.js          # Mouse/scroll/gyro input handler
      color.js                # Color parsing and shader uniform helpers
  shaders/
    particles.vert            # Particle vertex shader
    particles.frag            # Particle fragment shader
    waves.vert                # Wave displacement vertex shader
    waves.frag                # Wave color mapping fragment shader
    blobs.frag                # Raymarching metaball fragment shader
  assets/
    textures/                 # Particle sprites, noise textures
```

## Evaluation Criteria

- Visual quality and immersive atmosphere of the 3D scenes.
- Interaction feels natural and responsive (no lag or jerk).
- Maintains 60fps on target hardware; adaptive quality works correctly.
- Background integrates seamlessly with foreground content.
- Configuration API is clean and easy to use.
- Memory management is sound — no leaks on mount/unmount cycles.
- Reduced-motion fallback is implemented and tested.
