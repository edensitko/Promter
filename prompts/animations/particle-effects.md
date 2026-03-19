# Particle Effects Prompt

## Role

You are a creative frontend engineer and visual effects specialist with deep expertise in particle systems, Canvas/WebGL rendering, and physics-based animation. You build particle effects that are visually stunning yet performance-conscious, understanding the trade-offs between visual fidelity and frame budget.

## Task

Design and implement a comprehensive library of decorative and interactive particle systems for web applications. Effects range from ambient background decoration to user-triggered celebrations. Each system must be configurable, performant on mid-range hardware, and easy to integrate into any page or component.

## Animation Goals

- Create particle effects that enhance visual storytelling without overwhelming content
- Maintain 60fps with up to 500 concurrent particles on mid-range devices
- Use Canvas 2D as the default renderer, with WebGL option for high-particle-count scenarios
- Implement object pooling to eliminate garbage collection pauses
- Provide mouse/touch interactivity where appropriate (parallax response, click triggers)
- All effects must be non-blocking — rendering happens off the main thread where possible

## Animation Catalog

### Confetti Burst

#### Celebration Confetti
Triggered on specific actions (button click, form submission, achievement unlock). Emits 80-150 particles from a configurable origin point (default: center-top). Particles are small rectangles (8x4px), circles (5px), and star shapes with randomized colors from a customizable palette (default: `['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD']`). Physics: initial velocity burst (random angle within a 120-degree cone, speed 300-800px/s), gravity at 980px/s^2, air resistance factor 0.97 per frame, rotation velocity 180-720deg/s. Particles fade out over the last 30% of their 2-3 second lifespan. Each particle has randomized wobble using `Math.sin(age * wobbleFreq) * wobbleAmp` on the X axis. Remove particles when they exit viewport or opacity reaches 0.

### Floating Particles

#### Ambient Drift
Persistent background particles (40-80 count) that drift in gentle, randomized directions. Each particle is a soft circle (2-6px) with varying opacity (0.1-0.5) and slight blur (`filter: blur(1px)` on smaller particles for depth). Movement uses simplex noise for organic, non-linear paths at 10-30px/s. Particles wrap around screen edges rather than bouncing. Add parallax response to mouse movement: particles shift position based on `(mouseX - centerX) * depthFactor` where `depthFactor` is proportional to particle size (larger = closer = more movement). Render on a full-viewport Canvas behind all content with `pointer-events: none`.

### Connection Particles

#### Network Constellation
Particles (60-100 count) move slowly in random directions across the viewport. When two particles are within a proximity threshold (120-150px), draw a line between them with `opacity = 1 - (distance / threshold)`. Line style: 1px stroke, color matching particle color at reduced opacity. Add mouse interaction: an invisible particle follows the cursor and connects to nearby particles, creating a dynamic web around the pointer. The cursor particle has a larger connection radius (200px). Optimize with spatial hashing: divide viewport into grid cells of `threshold` size, only check particles in adjacent cells. This reduces proximity checks from O(n^2) to approximately O(n).

### Snow / Rain

#### Snowfall
Seasonal weather particles simulating realistic snowfall. Spawn 100-200 snowflake particles at random X positions above the viewport. Each has randomized size (2-8px), opacity (0.4-1.0), and fall speed (30-80px/s, proportional to size). Add horizontal drift using sine wave: `x += Math.sin(age * driftFreq + phase) * driftAmp` with per-particle randomized frequency (0.5-2.0) and amplitude (20-50px). Larger flakes fall faster and have less drift (heavier). Spawn rate maintains constant visible density. Particles reset to top when exiting bottom.

#### Rainfall
Similar structure to snow but with elongated particles (1x8px to 2x16px lines), faster fall speed (400-800px/s), slight angular tilt (5-15 degrees from vertical based on wind), and optional splash effect: when a raindrop reaches the bottom, spawn 3-5 tiny splatter particles that arc outward and fade in 200ms. Use `ctx.strokeStyle` with motion blur via slightly transparent lines (alpha 0.6).

### Fireworks

#### Burst Fireworks
Multi-stage firework effect. **Stage 1 - Launch**: A single bright particle (trail of 5-8 fading points) shoots upward from bottom of viewport at 400-600px/s, decelerating under gravity. **Stage 2 - Explode**: At peak (velocity near zero), the launcher despawns and emits 60-100 particles in a spherical burst pattern. Burst uses `angle = (i / count) * Math.PI * 2` with randomized speed variation (+-20%). Particle colors are uniform per burst with 2-3 color options per firework. **Stage 3 - Sparkle and Fade**: Burst particles decelerate (air resistance 0.96/frame), fall under gravity (200px/s^2), and fade over 1.5-2.5 seconds. Optional crackle: some particles split into 2-3 smaller sparks mid-flight. Trigger on click at click position, or auto-fire at random intervals (2-5s).

### Bubble Effect

#### Rising Bubbles
Translucent bubble particles rising from the bottom of a container or viewport. Each bubble is a circle (8-30px) with a gradient fill simulating light reflection: `radialGradient` from white (10% opacity) at top-left offset to transparent. Subtle stroke at 0.1 opacity. Rise speed 20-60px/s (inverse to size — smaller bubbles rise faster). Horizontal wobble via `Math.sin(age * freq) * amp` with per-bubble randomized parameters. Bubbles slightly compress and stretch vertically during wobble using `scaleX`/`scaleY` modulation. Pop animation when reaching top: rapid scale to 1.3x then 0 over 200ms with opacity fade. Spawn rate: 1-3 per second.

### Disintegration

#### Thanos Snap Effect
On trigger (hover, click, or programmatic), a target DOM element breaks apart into particles. **Step 1**: Capture the element's visual appearance using `html2canvas` or by reading pixel data from a Canvas render. **Step 2**: Divide the captured image into a grid of small tiles (4x4px to 8x8px). Each tile becomes a particle colored with the average color of that region. **Step 3**: Animate particles outward with randomized velocity vectors, rotation, and fade. Use staggered start times (particles on one side start first, creating a dissolve wave). Physics: initial velocity 50-200px/s, gravity 100px/s^2, rotation 90-360deg/s. Particles fade to 0 opacity over 1-2 seconds. The original element's opacity fades to 0 simultaneously. Provide a `reverse` option to reassemble.

## Technical Requirements

- Use HTML5 Canvas 2D as the primary rendering surface for all particle systems
- Implement object pooling: pre-allocate particle arrays and reuse dead particles instead of creating new ones
- Use spatial hashing (grid-based) for proximity detection in connection particles — avoid O(n^2) distance checks
- Run particle updates in `requestAnimationFrame` with delta-time calculations for frame-rate-independent physics
- Canvas element must be `position: fixed`, `pointer-events: none`, `z-index` below interactive content
- Use `ctx.clearRect()` or semi-transparent fill overlay for trails (not full clear for trail effects)
- Batch all `ctx.fillRect()` and `ctx.arc()` calls to minimize Canvas state changes
- Set `canvas.width`/`canvas.height` to `window.innerWidth * devicePixelRatio` for sharp rendering on retina displays, then scale with CSS
- Throttle resize handlers to recalculate canvas dimensions at most every 200ms
- Pause particle systems when the tab is not visible (`document.visibilitychange` event)
- Memory budget: keep particle arrays under 1000 objects; recycle aggressively

## Technology Suggestions

- HTML5 Canvas 2D API for most effects
- WebGL (via Three.js or custom shaders) for particle counts exceeding 1000
- `simplex-noise` library for organic floating particle movement
- `html2canvas` for disintegration effect element capture
- Framer Motion `useAnimation` for React-based trigger coordination
- GSAP for timeline-based firework sequencing
- Tailwind CSS for container and overlay styling
- Web Workers for physics calculations on high-count systems (optional)

## Expected Output

### Component Structure

```
components/
  particles/
    ParticleCanvas.jsx
    ConfettiBurst.jsx
    FloatingParticles.jsx
    ConnectionParticles.jsx
    WeatherParticles.jsx
    Fireworks.jsx
    Bubbles.jsx
    Disintegration.jsx
  core/
    ParticleSystem.js
    ObjectPool.js
    SpatialHash.js
    PhysicsEngine.js
  hooks/
    useParticleSystem.js
    useCanvasRenderer.js
    useVisibilityPause.js
```

### Code Requirements

- Each particle effect should be a standalone component wrapping a shared `ParticleCanvas` renderer
- Expose trigger methods via refs or callbacks: `burst()`, `start()`, `stop()`, `reset()`
- Support configuration via props: `particleCount`, `colors`, `speed`, `gravity`, `spread`, `duration`
- `ParticleSystem` class manages the update loop, object pool, and lifecycle for any effect
- `SpatialHash` class provides O(1) average-case neighbor lookups for connection particles
- Include a `<ParticleCanvas>` component that handles canvas setup, resize, DPI scaling, and visibility pausing
- Export both React components and vanilla JS classes for framework-agnostic use
- Include TypeScript types for all configuration objects and public APIs

### Accessibility

- Respect `prefers-reduced-motion`: disable all particle animations entirely (show static background or nothing)
- All Canvas elements must have `role="presentation"` and `aria-hidden="true"`
- Particle effects must never obscure text content or interactive controls
- Confetti and fireworks triggered by user action should not auto-repeat (avoid seizure risk from rapid flashing)
- Provide a global kill switch: `window.__DISABLE_PARTICLES = true` to stop all systems programmatically
- Ensure particle colors have sufficient contrast against the background for decorative visibility
- Disintegration effect must not remove content from the accessibility tree — hide visually only, keep `aria-label`
