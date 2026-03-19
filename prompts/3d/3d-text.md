# 3D Typography Prompt

## Role

You are a creative technologist who combines typographic design with real-time 3D
rendering on the web. You specialize in creating dimensional, material-rich,
beautifully lit text using WebGL and Three.js. You understand font geometry,
extrusion, bevel profiles, PBR materials, and lighting design, and you use that
knowledge to make type feel physical, tangible, and cinematic.

## Task

Build a showcase of 3D typography effects: extruded text with realistic materials,
dynamic lighting, environment reflections, and animation. Each effect should
demonstrate a different combination of geometry, material, lighting, and motion.
Deliver them as a scrollable gallery page where each 3D text scene occupies a
section and activates as the user scrolls into it.

## Design Goals

- **Physicality**: Text should feel like it exists in real space — with weight,
  surface texture, and light response. It should look like you could reach out
  and touch it.
- **Cinematic lighting**: Lighting is not an afterthought. Each scene should have
  a deliberate lighting setup that sculpts the text and creates mood.
- **Purposeful animation**: Text rotates, floats, assembles, or reacts to input
  in ways that feel intentional and polished.
- **Typographic respect**: Font choice matters. Geometry should preserve the
  character of the typeface — avoid distortion or artifacts from low-poly
  extrusion.

## Requirements

### 3D Text Scenes (minimum 5)

1. **Chrome Headline**: Extruded bold sans-serif text with a mirror-like chrome
   material (high metalness, low roughness, environment map reflections). Slowly
   rotates on the Y axis. Lit by an HDRI environment map.

2. **Neon Glow**: Flat or slightly extruded text with emissive neon material and
   a bloom post-processing effect. Text pulses gently. Background is dark. Color
   is configurable (classic neon: pink, blue, green).

3. **Concrete / Stone**: Heavily extruded text with a rough, matte material using
   a displacement map and normal map to simulate concrete or carved stone. Lit by
   a single dramatic directional light casting long shadows.

4. **Glass / Crystal**: Transparent text with refraction and caustics. Uses
   MeshPhysicalMaterial with transmission, thickness, and IOR properties. Sits
   on a surface with visible light refraction patterns beneath it.

5. **Kinetic Assembly**: Text starts as scattered individual letter meshes that
   fly in from random positions and assemble into the final word. Each letter
   has slight rotation during flight. Assembly is triggered on scroll.

6. **Wireframe Morph** (bonus): Text geometry rendered as wireframe that morphs
   between two different words by interpolating vertex positions. Uses morph
   targets or custom vertex animation.

### Geometry Requirements

1. Use `TextGeometry` from Three.js (via `FontLoader` and a typeface JSON file)
   or `troika-three-text` for SDF-based rendering.
2. For extruded text, configure:
   - Extrude depth: appropriate for the scene (shallow for neon, deep for stone).
   - Bevel enabled with configurable segments, size, and thickness for smooth edges.
   - Curve segments high enough to preserve letter curves (minimum 8).
3. Center text geometry using `computeBoundingBox` and translating to center.
4. For the kinetic assembly scene, each letter is a separate mesh so it can be
   individually animated.

### Materials

1. **Chrome**: `MeshStandardMaterial` with metalness: 1.0, roughness: 0.05,
   envMap from an HDRI or cube map. Optional: `MeshPhysicalMaterial` with
   clearcoat.
2. **Neon**: `MeshBasicMaterial` or `MeshStandardMaterial` with emissive color.
   Bloom is applied via `UnrealBloomPass` in the post-processing pipeline.
3. **Concrete**: `MeshStandardMaterial` with roughness: 0.9, a normal map for
   surface detail, and optional displacement map.
4. **Glass**: `MeshPhysicalMaterial` with transmission: 1.0, roughness: 0.1,
   ior: 1.5, thickness: configurable.
5. All materials must be disposed of properly when the scene is torn down.

### Lighting

1. Each scene has its own lighting rig appropriate to its mood:
   - Chrome: HDRI environment map + optional rim light.
   - Neon: Minimal ambient, bloom handles the glow.
   - Concrete: Single strong directional light at a dramatic angle + ambient fill.
   - Glass: Bright environment map + spot light from above.
   - Kinetic: Soft three-point lighting (key, fill, rim).
2. Shadows enabled for scenes where they add value (concrete, kinetic).
   Use `PCFSoftShadowMap` for quality.
3. Light colors and intensities exposed as configurable parameters.

### Animation

1. Chrome: Continuous slow Y-axis rotation. Mouse X position subtly influences
   rotation speed or direction.
2. Neon: Emissive intensity oscillates (pulse) using a sine function.
   Optional flicker effect (brief random intensity dips).
3. Concrete: Camera slowly orbits around the text. Scroll controls orbit progress.
4. Glass: Text gently bobs up and down (floating). Mouse moves the spot light
   position, shifting refraction patterns.
5. Kinetic: Letters scatter on load, assemble on scroll trigger, and can
   re-scatter on click.
6. All animations use `requestAnimationFrame` and pause when the tab is not
   visible.

### Interaction

1. Mouse position influences at least one parameter per scene (rotation, light
   position, camera angle).
2. Scroll position triggers or controls animation progress for the kinetic and
   concrete scenes.
3. Click on text triggers a reaction (burst of particles, re-scatter, color shift).
4. Interactions are smoothly interpolated with lerp — no snapping.

### Performance

1. Target 60fps on mid-range devices.
2. Only render the scene that is currently in the viewport (Intersection Observer
   activates/deactivates render loops per section).
3. Limit geometry complexity: use appropriate curve segments and bevel detail.
4. Textures and environment maps are compressed and appropriately sized.
5. Dispose of all GPU resources when a scene leaves the viewport.
6. `prefers-reduced-motion`: disable rotation and assembly animations; show text
   in its final assembled, static state.

### Showcase Page

1. Vertical scroll through all scenes, each occupying a full viewport section.
2. Each section has a semi-transparent overlay with the effect name and a brief
   description.
3. A floating navigation for jumping between scenes.
4. An input field to type custom text that updates the 3D geometry in real time
   (or on submit).

## Technology Suggestions

| Layer         | Recommended                                              |
|---------------|----------------------------------------------------------|
| 3D Engine     | Three.js (r160+)                                         |
| Text Geometry | Three.js TextGeometry + FontLoader, or troika-three-text |
| Materials     | MeshStandardMaterial, MeshPhysicalMaterial                |
| Post-Process  | EffectComposer, UnrealBloomPass, SSAOPass                |
| Environment   | HDRI loader (RGBELoader) or CubeTextureLoader            |
| Animation     | requestAnimationFrame, GSAP for complex timelines        |
| Interaction   | Pointer events + lerp, Intersection Observer             |
| Framework     | Vanilla JS or React Three Fiber                          |
| Build Tool    | Vite with asset handling for HDRI, fonts, textures       |

## Expected Output Structure

```
3d-text/
  index.html                    # Showcase page with scroll sections
  css/
    variables.css               # Color tokens, layout settings
    page.css                    # Section layout, overlays, navigation
  js/
    main.js                     # Section observer, scene lifecycle manager
    scenes/
      chrome.js                 # Chrome text scene
      neon.js                   # Neon glow text scene
      concrete.js               # Concrete/stone text scene
      glass.js                  # Glass/crystal text scene
      kinetic.js                # Kinetic assembly scene
      wireframe-morph.js        # Bonus wireframe morph scene
    utils/
      text-geometry.js          # Shared text geometry creation helper
      materials.js              # Material factory functions
      lighting.js               # Lighting rig presets
      interaction.js            # Mouse/scroll input handler with lerp
      performance.js            # Adaptive quality, visibility management
  shaders/
    neon-bloom.frag             # Custom bloom adjustments if needed
  assets/
    fonts/                      # Typeface JSON files for TextGeometry
    hdri/                       # Environment maps (.hdr files)
    textures/                   # Normal maps, displacement maps
```

## Evaluation Criteria

- Visual fidelity and cinematic quality of each 3D text scene.
- Material authenticity — chrome looks like chrome, glass looks like glass.
- Lighting design is deliberate and enhances the mood of each scene.
- Animations are smooth, purposeful, and well-timed.
- Mouse/scroll interactions feel responsive and natural.
- Scroll-based scene activation prevents unnecessary GPU work.
- Custom text input works reliably across all scenes.
- Code is modular, each scene is self-contained and independently usable.
- Reduced-motion fallback shows text clearly without animation.
