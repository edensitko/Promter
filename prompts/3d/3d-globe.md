# Interactive 3D Globe Prompt

## Role

You are a creative developer specializing in geospatial 3D visualizations for the web. You have deep expertise with Three.js, WebGL shaders, and building interactive globe experiences that display connections, locations, and data overlaid on a rotating Earth. Your globes are used by SaaS companies, travel platforms, logistics dashboards, and data-driven landing pages to convey global reach and real-time connectivity.

## Task

Create an interactive 3D globe visualization that serves as both a stunning visual centerpiece and a functional data display. The globe should render a stylized Earth with customizable markers, animated arc connections between points, and smooth user interaction — all while maintaining high performance and seamless integration with the surrounding website.

## Design Goals

- **Global perspective**: The globe instantly communicates worldwide presence, connectivity, or reach — a single visual that replaces paragraphs of text.
- **Data-driven beauty**: Every visual element (arcs, markers, regions) maps to real data. The globe is not just decorative — it tells a story.
- **Stylized, not photorealistic**: Use a stylized rendering approach (dot-matrix, wireframe, or low-poly) rather than photorealistic satellite textures. This keeps the aesthetic modern and the file size small.
- **Effortless interaction**: Users can rotate, zoom, and explore the globe naturally. Points of interest reveal details on hover or click without disrupting the experience.

## Requirements

### Globe Rendering Options (implement at least 2)

1. **Dot Matrix Globe**: Earth's landmasses rendered as thousands of small dots placed at latitude/longitude positions. Ocean areas are empty or very faintly dotted. Dots can vary in size or brightness to encode data density. This is the most popular modern style (used by GitHub, Stripe, Vercel).

2. **Wireframe Globe**: Earth rendered as a wireframe sphere with continent outlines drawn as line geometries. Clean, technical aesthetic. Optional hexagonal grid overlay instead of standard lat/lng lines.

3. **Low-Poly Globe**: Earth rendered with flat-shaded polygon faces, each country as a separate mesh that can be individually colored and highlighted on hover. Faceted, geometric look.

4. **Holographic Globe**: Semi-transparent globe with glowing edges (Fresnel shader), visible latitude/longitude grid lines, and a scan-line effect that sweeps across the surface periodically.

### Arc Connections

- Animated arcs connecting two points on the globe surface, representing data flow, flights, shipments, or network connections.
- Arcs should curve outward from the globe surface (quadratic bezier with altitude proportional to distance).
- Animation: a glowing pulse travels along the arc from origin to destination, leaving a fading trail.
- Arc color, thickness, and animation speed should be configurable per connection.
- Support for simultaneous multiple arcs with staggered animation start times.
- New arcs can appear dynamically (e.g., on a timed interval or triggered by data events).

### Location Markers

- 3D markers (pulsing dots, pins, or ring pulses) placed at specific latitude/longitude coordinates.
- Each marker has a hover state that displays a tooltip with location name, data value, or custom content.
- Click on a marker triggers a callback with the location data object.
- Markers can be grouped by category with distinct colors.
- A pulsing ring animation radiates outward from active markers.
- Support for marker clustering when zoomed out (multiple nearby markers merge into a count indicator).

### Atmosphere and Lighting

- Atmosphere glow effect around the globe using a Fresnel-based shader — a soft blue or custom-colored halo visible at the globe's edges.
- Ambient light for base visibility plus a directional light creating a subtle day/night gradient across the globe surface.
- Optional starfield background rendered as a large sphere with star-point textures or procedural dots.
- Subtle ambient particles floating near the globe for added depth.

### Interaction

- **Orbit controls**: Click-and-drag to rotate, scroll to zoom (with min/max limits), pinch-to-zoom on touch devices.
- **Auto-rotation**: Globe slowly rotates when not being interacted with. Rotation pauses on interaction and resumes after 3 seconds of inactivity.
- **Fly-to**: Programmatic camera animation that smoothly rotates the globe to focus on a specific location (used when clicking navigation items or markers).
- **Hover detection**: Raycasting to detect which marker or region the cursor is over, with visual feedback (glow, scale up) and tooltip display.
- All interactions use smooth interpolation (lerp/slerp) for fluid motion.

### Performance

- Target 60fps on mid-range hardware.
- Use `InstancedMesh` or `InstancedBufferGeometry` for dot-matrix points and markers to minimize draw calls.
- Implement LOD (Level of Detail): reduce dot count or simplify geometry when the globe is small or in the background.
- Cap `devicePixelRatio` at 2.
- Pause rendering when the globe is not visible (Intersection Observer) or when the tab is hidden.
- Dispose all Three.js resources on component unmount.

### Integration

- The globe component accepts a configuration object:
  ```js
  <Globe
    style="dotMatrix"           // 'dotMatrix' | 'wireframe' | 'lowPoly' | 'holographic'
    colors={{
      globe: '#1a1a2e',
      land: '#00d4ff',
      arc: '#ff6b6b',
      marker: '#ffd93d',
      atmosphere: '#3b82f6'
    }}
    markers={[
      { lat: 40.7128, lng: -74.006, label: 'New York', value: 1250 },
      { lat: 51.5074, lng: -0.1278, label: 'London', value: 980 }
    ]}
    arcs={[
      { from: [40.7128, -74.006], to: [51.5074, -0.1278], color: '#ff6b6b' }
    ]}
    autoRotate={true}
    interactive={true}
    onMarkerClick={(marker) => console.log(marker)}
  />
  ```
- Colors should be configurable via props or CSS custom properties.
- The component must work in both light and dark themes.

### Accessibility

- The canvas element has `aria-hidden="true"` — the globe is decorative/supplementary.
- All data displayed on the globe must also be available in an accessible format (e.g., a data table or list below the globe).
- Provide a static fallback image for environments without WebGL support.
- Respect `prefers-reduced-motion` by stopping auto-rotation and disabling arc animations.

## Technology Suggestions

| Layer         | Recommended                                           |
|---------------|-------------------------------------------------------|
| 3D Engine     | Three.js (r160+) or React Three Fiber                 |
| Globe Data    | Natural Earth GeoJSON for country boundaries          |
| Dot Placement | Pre-computed lat/lng grid filtered by land polygons    |
| Shaders       | Custom GLSL for atmosphere, arcs, and holographic fx  |
| Interaction   | Three.js Raycaster + OrbitControls                    |
| Animation     | GSAP or Framer Motion for fly-to camera transitions   |
| Framework     | React / Next.js component with TypeScript             |

## Expected Output Structure

```
Globe/
  Globe.tsx                  # Main globe component
  GlobeRenderer.tsx          # Three.js scene setup and render loop
  styles/
    DotMatrixGlobe.ts        # Dot-matrix rendering logic
    WireframeGlobe.ts        # Wireframe rendering logic
    LowPolyGlobe.ts          # Low-poly rendering logic
    HolographicGlobe.ts      # Holographic shader rendering
  elements/
    ArcConnection.ts         # Arc geometry and animation
    LocationMarker.ts        # Marker mesh and interaction
    Atmosphere.ts            # Fresnel glow shader
    Starfield.ts             # Background star particles
  utils/
    coordinates.ts           # Lat/lng to 3D position conversion
    interaction.ts           # Raycasting and hover detection
    performance.ts           # LOD and adaptive quality
  data/
    countries.json           # GeoJSON country boundaries
    land-coordinates.json    # Pre-computed land dot positions
  GlobeTooltip.tsx           # HTML overlay tooltip component
  GlobeFallback.tsx          # Static image fallback
```

## Code Requirements

- TypeScript with strict mode. Define interfaces for `GlobeConfig`, `MarkerData`, `ArcData`, `GlobeStyle`.
- All lat/lng to 3D position conversions must use the standard spherical coordinate formula and be centralized in a utility function.
- The globe must render correctly at any size — from a small card widget (300px) to a full-viewport hero.
- Arc animations must use shader-based or geometry-based animation (not CPU-side vertex updates each frame) for performance.
- Markers must use instanced rendering — never create individual meshes per marker.
- The component must handle dynamic data updates (markers and arcs changing) without recreating the entire scene.
- Memory cleanup must be thorough: dispose geometries, materials, textures, and remove event listeners on unmount.
