# Advanced 3D Particle Systems Prompt

## Role

You are a creative developer specializing in GPU-accelerated particle systems for the web. You build mesmerizing, high-performance particle experiences using Three.js, instanced rendering, and custom GLSL shaders. Your particle systems transform websites from static pages into living, breathing visual experiences — from galaxies to DNA helices to audio-reactive visualizations.

## Task

Create an advanced 3D particle system library with multiple preset formations and behaviors. Each formation renders thousands of particles in real-time with smooth transitions, interactive mouse response, and configurable visual properties. The systems must be performant enough to serve as persistent page backgrounds or hero sections.

## Design Goals

- **Mesmerizing formations**: Particles arranged in recognizable, beautiful patterns — spirals, helices, text, organic clusters — not just random scatter.
- **Fluid transitions**: Particles smoothly morph between formations, creating magical transformation moments.
- **Interactive depth**: Mouse and scroll interaction make the scene feel alive and responsive.
- **Scalable performance**: From 1,000 particles on mobile to 50,000+ on desktop, adapting automatically.

## Requirements

### Particle Formations (implement at least 4)

1. **Galaxy Spiral**: Thousands of particles arranged in a logarithmic spiral galaxy formation with 2-4 arms. Particles vary in brightness (core is dense and bright, arms are sparser). Slow rotation around the central axis. Color gradient from warm gold/white at the center to cool blue/purple at the edges. Dust lane effect with darker regions between arms. Star twinkle via randomized opacity oscillation.

2. **DNA Helix**: Double helix formation — two intertwined spirals of particles with connecting "rungs" between them. Smooth continuous rotation. Particles along the backbone glow brighter than connecting particles. Color-coded base pairs (A-T in blue, C-G in green). Optional labels or tooltips on hover. Vertical scrolling drives the helix rotation.

3. **Particle Text**: Particles arranged to form readable 3D text (configurable string). Text is extruded in 3D space with particle density along the letter shapes. On hover or click, particles scatter explosively outward with physics-based motion, then reassemble after a delay. During scatter, particles move with velocity, friction, and optional gravity. Text can morph between different strings by particles relocating to new positions.

4. **Morphing Cloud**: A particle cloud that smoothly morphs between predefined 3D shapes — sphere, cube, torus, pyramid, heart, custom mesh. Transition uses per-particle interpolation with randomized easing, creating a flowing, organic transformation. Each shape holds for a configurable duration before morphing to the next.

5. **Attraction Field**: Particles float freely in 3D space. The mouse cursor creates an attraction or repulsion force field that particles respond to with physics-based motion (velocity, damping). Multiple force points can exist simultaneously. Particles have trails (rendered as short lines pointing in their velocity direction). Creates fluid-like collective motion.

6. **Neural Network**: Particles as nodes in a 3D neural network. Organized in layers with connections (lines) between adjacent layers. Activation pulses travel along connections — a glowing signal that moves from input layer to output layer. Interactive: clicking a node sends a new activation pulse. Nodes pulse in size when activated.

### Visual Requirements

- Color palettes configurable via a simple array of hex colors or CSS custom properties.
- Each particle can have: position, size (varying), opacity (varying), color (from palette), and optional velocity.
- Particle shapes: circular (default), square, star, or custom texture sprite.
- Depth-based fog or size attenuation — distant particles appear smaller and more transparent.
- Optional bloom post-processing for a glowing, ethereal look.
- Smooth color transitions when morphing between formations.
- Connection lines (where applicable) use opacity based on distance — lines fade as connected particles move apart.

### Interaction

- Mouse position maps to a 3D point in the scene via raycasting onto an invisible plane. This point drives force fields, highlights, or camera orientation.
- Scroll position drives at least one parameter: formation morph progress, rotation speed, color shift, or zoom level.
- Click triggers formation-specific events: scatter text, pulse network, add force point.
- Touch support: use touch position as mouse equivalent. Pinch-to-zoom if orbit controls are enabled.
- All interaction values are smoothly interpolated (lerp) to prevent jerky motion.

### Performance

- All particles rendered via `InstancedBufferGeometry` or `Points` with `BufferGeometry` — never individual meshes.
- Particle positions updated in a vertex shader where possible (GPU-side) rather than JavaScript (CPU-side).
- Use `Float32Array` typed arrays for all buffer attributes.
- Implement adaptive particle count: detect GPU capability and reduce particle count on low-end devices.
- Target 60fps with 10,000 particles on a MacBook Air M1. Degrade gracefully to 30fps before reducing quality.
- Connection lines use instanced line rendering or a single `LineSegments` geometry — not individual `Line` objects.
- Pause animation loop when tab is not visible (`document.visibilitychange`).
- Full cleanup on unmount: dispose all geometries, materials, textures, and buffer attributes.

### Integration

```js
<ParticleSystem
  formation="galaxy"        // 'galaxy' | 'dna' | 'text' | 'morph' | 'field' | 'network'
  particleCount={10000}
  colors={['#6C63FF', '#FF6584', '#43E97B', '#F8D800']}
  text="HELLO"              // for 'text' formation
  morphShapes={['sphere', 'cube', 'torus']}  // for 'morph' formation
  interactive={true}
  bloom={true}
  autoRotate={true}
  onParticleClick={(index) => {}}
/>
```

- Component positioned as a fixed background or within a container.
- Colors driven by CSS custom properties for easy theming.
- Provide a canvas-free fallback (CSS gradient) when WebGL is unavailable.

### Accessibility

- Canvas has `aria-hidden="true"`.
- No information conveyed solely through the particle visualization.
- `prefers-reduced-motion`: stop all animation, show a static snapshot of the particle formation.
- No flashing or strobing effects that could trigger photosensitive reactions.

## Technology Suggestions

| Layer          | Recommended                                        |
|----------------|----------------------------------------------------|
| 3D Engine      | Three.js (r160+) or React Three Fiber              |
| Particles      | InstancedBufferGeometry or Points                   |
| Shaders        | Custom GLSL vertex/fragment for GPU animation       |
| Post-Process   | Three.js EffectComposer + UnrealBloomPass           |
| Physics        | Custom velocity/damping in shader or JS             |
| Text Geometry  | Three.js TextGeometry or msdf-bmfont for sampling   |
| Noise          | simplex-noise library or GLSL noise functions       |
| Interaction    | Raycaster + pointer events + lerp interpolation     |
| Framework      | React / Next.js with TypeScript                     |

## Expected Output Structure

```
ParticleSystem/
  ParticleSystem.tsx            # Main component
  ParticleRenderer.ts           # Three.js scene, camera, renderer setup
  formations/
    GalaxyFormation.ts          # Spiral galaxy positions and animation
    DNAFormation.ts             # Double helix positions and rotation
    TextFormation.ts            # Text-to-particle sampling and scatter
    MorphFormation.ts           # Shape morphing interpolation
    FieldFormation.ts           # Force field physics simulation
    NetworkFormation.ts         # Neural network layout and pulses
  shaders/
    particle.vert               # Vertex shader (position, size, animation)
    particle.frag               # Fragment shader (color, shape, opacity)
    connection.vert             # Connection line vertex shader
    connection.frag             # Connection line fragment shader
  utils/
    buffers.ts                  # Typed array and buffer attribute helpers
    physics.ts                  # Velocity, damping, force calculations
    sampling.ts                 # Mesh-to-point sampling for text/shapes
    performance.ts              # Adaptive quality and particle count
    interaction.ts              # Mouse/touch to 3D position mapping
  ParticleFallback.tsx          # CSS gradient fallback
```

## Code Requirements

- TypeScript with strict mode. Define types for `Formation`, `ParticleConfig`, `ForceField`, `ParticleState`.
- Each formation is a class or module that computes initial particle positions and per-frame updates.
- Transitioning between formations smoothly interpolates each particle's position using per-particle random delay and easing.
- Buffer attributes must be allocated once and updated in place — never recreate buffers per frame.
- The vertex shader must handle: base position, formation offset, time-based animation, mouse-driven displacement, and size attenuation.
- Fragment shader must handle: color (from attribute), opacity (distance fade + per-particle variation), and particle shape (circle discard or texture).
- All numeric constants (rotation speed, damping, force strength) must be exposed as configurable uniforms, not hardcoded in shaders.
