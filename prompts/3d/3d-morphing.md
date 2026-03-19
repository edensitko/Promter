# 3D Morphing Geometry Prompt

## Role

You are a creative developer specializing in procedural 3D geometry and real-time mesh deformation for the web. You have deep expertise with Three.js vertex shaders, noise-based displacement, and morphing algorithms that create hypnotic, organic 3D forms. Your work turns abstract mathematical functions into visual art that captivates users and elevates website aesthetics far beyond conventional design.

## Task

Create a collection of 3D morphing geometry effects that serve as hero visuals, section backgrounds, or interactive art pieces on a website. Each effect features geometry that continuously transforms — changing shape, topology, or surface characteristics — driven by time, scroll position, and user interaction. The results should feel alive, organic, and mesmerizing.

## Design Goals

- **Organic motion**: Geometry morphs should feel natural and fluid, like watching biological growth, liquid metal, or cosmic formation — never mechanical or robotic.
- **Mathematical beauty**: Leverage mathematical functions (noise, fractals, trigonometry) to create patterns that are endlessly fascinating and never repeat exactly.
- **Interactive sculpture**: Users should feel they are manipulating a digital sculpture — their mouse and scroll input directly shapes the geometry in real time.
- **Ambient presence**: At rest, the morphing geometry provides subtle, calming motion. On interaction, it becomes dramatic and responsive.

## Requirements

### Morphing Effects (implement at least 3)

1. **Shape Morphing**: Smooth transitions between geometric primitives — sphere morphs to torus, torus to icosahedron, icosahedron to Klein bottle, and back. Vertex positions interpolate between target shapes using customizable easing. The mesh maintains consistent vertex count across all shapes via subdivision matching. Scroll position drives morph progress (0% = shape A, 100% = shape B). Between shapes, vertices follow curved paths (not straight lines) for more organic motion. Surface normal recalculation ensures correct lighting during transitions.

2. **Terrain Morphing**: A high-resolution plane geometry (128x128+ subdivisions) whose height map morphs between different landscapes — flat plane → rolling hills → sharp mountain peaks → ocean waves → abstract crystalline formations. Displacement driven by layered noise functions (simplex/perlin) with animating parameters. Color maps to height: deep blue for valleys, green for mid-levels, white for peaks (or custom gradient). Mouse position shifts the noise offset, creating a "terraforming" effect where the user sculpts the landscape. Wireframe overlay option for a technical/data aesthetic.

3. **Organic Blob**: A sphere geometry with vertex displacement driven by 3D simplex noise, creating a breathing, pulsing organic form. The blob appears to be alive — surface undulates with varying frequency and amplitude. Mouse proximity causes localized deformation (the surface pushes away from or attracts toward the cursor). Multiple noise octaves create fine surface detail on top of broad shape changes. Reflective or iridescent material (environment mapping + Fresnel) gives the blob a liquid metal or soap bubble appearance. Optional: the blob splits into two smaller blobs and re-merges periodically.

4. **Mesh Distortion**: Take any 3D mesh (imported model, text geometry, or primitive) and apply real-time vertex distortion effects: (a) Twist — vertices rotate around an axis proportionally to their distance from center. (b) Bend — mesh curves along an axis. (c) Noise displacement — vertices offset along normals by noise values. (d) Explode — vertices move outward along normals, controlled by scroll or hover. All effects can be combined and animated. Distortion intensity maps to mouse distance from the mesh center.

5. **Liquid Metal**: A highly reflective sphere (chrome/mercury material) with dynamic surface deformation. The surface wobbles and ripples like liquid metal being disturbed. Deformation driven by multiple sine waves with different frequencies and amplitudes. Environment map reflects a custom HDR or stylized gradient environment. Fresnel effect creates bright edges and darker center. Mouse interaction causes ripple waves that propagate across the surface. Post-processing bloom adds a luminous quality.

### Visual Requirements

- Color and material configurable via props/CSS custom properties. Support for: solid color, gradient mapped to geometry properties (height, normal, curvature), environment-mapped reflections, iridescent/holographic shader.
- Lighting setup: combination of ambient, directional, and point lights. Optional rim lighting for dramatic silhouette effect.
- Background: transparent (composited over page content) or solid dark color with subtle gradient.
- Optional wireframe overlay rendered simultaneously with solid geometry (wireframe in accent color, slightly offset to avoid z-fighting).
- Post-processing chain: bloom (subtle), chromatic aberration (very subtle), optional film grain.
- All geometry should cast and receive shadows when placed in a scene with a ground plane.

### Interaction

- Mouse position maps to a 3D point via raycasting or projection. This point drives: deformation origin, morph progress, camera orbit offset, or force field position.
- Scroll position drives morph progress (shape A at section start → shape B at section end). Support for both continuous scroll-linked morphing and threshold-triggered transitions.
- Click triggers dramatic deformation events: ripple burst, shape scatter, color flash.
- Camera subtly follows mouse position (orbit offset of 5-10 degrees max) for a parallax depth effect.
- All interaction values smoothly interpolated with configurable damping.

### Performance

- Geometry subdivision balanced for visual quality vs performance: 64x64 (mobile) to 256x256 (desktop) for plane geometries, 32-128 segments for spherical geometries.
- ALL vertex displacement performed in the vertex shader — never update `geometry.attributes.position` from JavaScript per frame.
- Use uniform variables to pass time, mouse position, morph progress, and noise parameters to shaders.
- Implement adaptive quality: monitor frame rate and reduce subdivision on low-end devices.
- Material complexity tiered: full PBR with environment map on desktop, simplified Lambert/Phong on mobile.
- Rendering paused when element is off-screen (Intersection Observer) or tab is hidden.
- Full Three.js resource cleanup on unmount.

### Integration

```jsx
<MorphGeometry
  effect="blob"              // 'shapeMorph' | 'terrain' | 'blob' | 'distortion' | 'liquidMetal'
  colors={['#6C63FF', '#FF6584']}
  morphShapes={['sphere', 'torus', 'icosahedron']}  // for shapeMorph
  noiseScale={1.5}
  noiseSpeed={0.3}
  interactive={true}
  wireframe={false}
  bloom={true}
  scrollLinked={true}
  scrollRange={[0, 1]}       // morph progress mapped to this scroll range
/>
```

- Component renders a canvas that can be positioned fixed (background), absolute (within section), or inline.
- Must work at any container size — geometry and camera adjust responsively.
- Provide a static image fallback for non-WebGL environments.

### Accessibility

- Canvas has `aria-hidden="true"` — morphing geometry is purely decorative.
- No information conveyed solely through the visualization.
- `prefers-reduced-motion`: freeze morphing, show a static geometry state.
- No rapid flashing or strobing in any effect.

## Technology Suggestions

| Layer          | Recommended                                         |
|----------------|-----------------------------------------------------|
| 3D Engine      | Three.js (r160+) or React Three Fiber               |
| Shaders        | Custom GLSL vertex/fragment shaders                 |
| Noise          | GLSL simplex/perlin noise (no JS-side computation)  |
| Materials      | MeshPhysicalMaterial + custom shader injection       |
| Post-Process   | EffectComposer: bloom, chromatic aberration          |
| Interaction    | Pointer events → uniform updates via lerp            |
| Scroll         | Framer Motion useScroll or Intersection Observer     |
| Environment    | HDR environment maps or custom gradient cubemap      |
| Framework      | React / Next.js with TypeScript                      |

## Expected Output Structure

```
MorphGeometry/
  MorphGeometry.tsx             # Main React component
  MorphRenderer.ts              # Three.js scene setup
  effects/
    ShapeMorph.ts               # Shape-to-shape morphing logic
    TerrainMorph.ts             # Heightmap terrain displacement
    OrganicBlob.ts              # Noise-driven blob deformation
    MeshDistortion.ts           # Twist/bend/noise/explode effects
    LiquidMetal.ts              # Chrome blob with ripple physics
  shaders/
    morph.vert                  # Vertex shader: position interpolation
    morph.frag                  # Fragment shader: color/material
    terrain.vert                # Terrain displacement vertex shader
    terrain.frag                # Height-to-color mapping
    blob.vert                   # Noise displacement vertex shader
    blob.frag                   # Iridescent/reflective fragment shader
    distortion.vert             # Multi-effect distortion vertex shader
    liquid.vert                 # Liquid metal deformation
    liquid.frag                 # Chrome reflection fragment shader
  utils/
    geometry.ts                 # Subdivision, vertex matching utilities
    interaction.ts              # Mouse → 3D mapping, lerp state
    performance.ts              # Adaptive subdivision, quality tiers
    materials.ts                # Material factory with theme support
  MorphFallback.tsx             # Static image fallback component
```

## Code Requirements

- TypeScript with strict mode. Define types for `MorphEffect`, `MorphConfig`, `ShapeTarget`, `NoiseParams`.
- Vertex shaders must receive all dynamic data via uniforms (`uTime`, `uMouse`, `uMorphProgress`, `uNoiseScale`, `uNoiseSpeed`).
- Shape morphing requires all target shapes to have identical vertex counts. Implement a utility that subdivides simpler shapes to match the most complex target.
- Noise functions must be computed entirely in GLSL — no JavaScript-side noise computation per frame.
- Materials must support both light and dark color schemes via uniform-driven color values.
- Morph progress (0-1) must be mappable to scroll position via a configurable scroll range.
- The component must handle container resize via ResizeObserver, updating camera aspect ratio and renderer size.
- All shader source code should be defined as template literals or imported via a build plugin — not fetched at runtime.
