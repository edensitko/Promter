# 3D Product Viewer Prompt

## Role

You are a senior frontend designer and 3D web specialist with deep expertise in interactive product visualization, physically-based rendering (PBR), and e-commerce user experience. You have extensive experience building high-fidelity 3D product configurators for luxury brands, consumer electronics, and retail platforms. You understand how to balance visual realism with web performance constraints, and you design experiences that drive user engagement and conversion.

## Task

Design and build a fully interactive 3D product viewer component that allows users to examine a product from every angle with smooth orbital rotation, intuitive pinch-to-zoom, and real-time material/variant switching. The viewer must feel native and responsive across desktop and mobile devices, load progressively to minimize time-to-interactive, and provide a premium, app-like experience directly in the browser. The component should be embeddable in any product detail page and support dynamic product data via props or an external configuration object.

## 3D Design Goals

- **Photorealistic rendering**: Achieve near-photographic quality using PBR materials, HDR environment maps, and accurate light reflections so the 3D model can replace traditional product photography.
- **Fluid interactivity**: Rotation, zoom, and pan must feel frictionless at a locked 60 fps, with inertia-based damping that mimics physical behavior.
- **Material fidelity**: Support metallic, glossy, matte, translucent, and textured surfaces with correct roughness, normal mapping, and ambient occlusion.
- **Conversion-driven UX**: Every interaction should build confidence in the product -- annotations, hotspots, and exploded views help users understand features without leaving the viewer.
- **Accessible exploration**: Provide keyboard navigation and screen-reader descriptions so all users can interact with the 3D scene.

## Scene Description

The scene centers on a single hero product model placed on an invisible ground plane with a subtle contact shadow beneath it. The environment uses an HDR image-based lighting (IBL) setup -- a soft studio HDRI with a warm key light from the upper-left and a cool fill light from the lower-right to create gentle specular highlights and natural shadow gradients. A faint rim light outlines the product silhouette against the background. The background itself is a smooth neutral gradient (light gray to white) that keeps full visual focus on the product. The camera starts at a three-quarter front angle, slightly above eye level, providing an editorial first impression. Orbit controls allow full 360-degree horizontal rotation with vertical rotation clamped between 10 and 80 degrees to prevent disorienting under-views. Zoom is constrained to a sensible min/max range so the user cannot clip through or lose the model. Optional annotation hotspots float as small glowing dots on the model surface; clicking one smoothly animates the camera to a close-up angle and opens an info tooltip.

## Interaction Model

- **Mouse / Trackpad (Desktop)**: Left-click drag to orbit, scroll wheel to zoom, right-click drag to pan. Double-click resets the camera to the default position with a smooth transition.
- **Touch (Mobile / Tablet)**: Single-finger drag to orbit, two-finger pinch to zoom, two-finger drag to pan. Swipe momentum provides natural deceleration. A "reset view" button is always accessible in the corner.
- **Keyboard**: Arrow keys rotate in 15-degree increments, +/- keys zoom, Home key resets view. Tab cycles through annotation hotspots.
- **Material Switching**: A floating pill-bar or swatch strip below the viewer lets users tap color/material variants. Switching triggers a smooth crossfade on the affected mesh materials (duration ~400ms) without reloading geometry.
- **Auto-Rotate**: When idle for 5 seconds, the model begins a gentle continuous rotation (0.3 rad/s). Any user interaction immediately halts auto-rotate, and the idle timer restarts.
- **Fullscreen Toggle**: A button expands the viewer to fullscreen mode with an animated transition for an immersive inspection experience.

## Technical Requirements

- Must use WebGL 2.0 with an automatic fallback to WebGL 1.0 on older devices.
- All 3D models must be in glTF 2.0 / GLB format with Draco or meshopt compression to minimize file size.
- Textures should use KTX2 / Basis Universal compression and be loaded via a texture loader that selects the optimal format per device (ASTC on iOS, ETC2/BC7 on desktop).
- Implement progressive loading: display a blurred low-resolution placeholder or skeleton shimmer while the full model and textures stream in, with a visible loading progress indicator.
- Maintain 60 fps on mid-range devices (e.g., iPhone 12, Galaxy S21, M1 MacBook Air). Use `requestAnimationFrame`-gated rendering and pause the render loop when the viewer is off-screen (Intersection Observer).
- Shadow mapping should use a single soft shadow (PCF or VSM) with a limited shadow map resolution (1024x1024) for performance.
- The component must be fully responsive and resize fluidly within any container without layout shifts.
- Implement proper resource disposal (`geometry.dispose()`, `material.dispose()`, `texture.dispose()`) on component unmount to prevent memory leaks.
- Support SSR-safe rendering -- the component should not crash during server-side rendering and should hydrate cleanly on the client.

## Technology Suggestions

- **Three.js** -- core 3D rendering engine
- **React Three Fiber (@react-three/fiber)** -- declarative React bindings for Three.js
- **@react-three/drei** -- pre-built helpers: `OrbitControls`, `Environment`, `useGLTF`, `useTexture`, `ContactShadows`, `Html` (for annotations), `useProgress`
- **@react-three/postprocessing** -- optional bloom, tone mapping, or ambient occlusion effects
- **GSAP (GreenSock)** -- smooth camera transitions, material crossfades, and UI animations
- **Leva or dat.gui** -- development-time controls for tweaking lights, materials, and camera parameters
- **three-stdlib / meshopt-decoder** -- mesh decompression utilities
- **Zustand or Jotai** -- lightweight state management for active variant, camera state, and UI toggles
- **Tailwind CSS** -- styling the surrounding UI controls (swatches, buttons, tooltips)

## Performance Guidelines

- **Model Budget**: Target under 100K triangles for the display mesh. Use LOD (Level of Detail) with 2-3 tiers that swap based on camera distance or device capability.
- **Texture Budget**: Keep combined texture memory under 16 MB (compressed). Use power-of-two resolutions (512, 1024, 2048) and avoid anything above 2048x2048 on mobile.
- **Initial Load**: The viewer shell (canvas + skeleton) should render in under 500ms. The full model should be interactive within 3 seconds on a 4G connection. Use lazy loading (`React.lazy` + `Suspense`) so the 3D bundle does not block the main page.
- **Mobile Optimizations**: Reduce pixel ratio to `Math.min(window.devicePixelRatio, 1.5)` on mobile, disable post-processing effects, use simplified environment maps (256x256 cubemap), and lower shadow map resolution to 512x512.
- **Memory Management**: Implement aggressive disposal on unmount. Cache loaded models and textures across variant switches to avoid redundant network requests.
- **Monitoring**: Log GPU frame timings in development mode using `renderer.info` and flag any frame exceeding 16ms.

## Expected Output

### Component Structure

```
ProductViewer/
  ProductViewer.tsx          # Main wrapper: Canvas, Suspense boundary, UI overlay
  Scene.tsx                  # 3D scene: model, lights, environment, shadows
  ProductModel.tsx           # GLTF loader, material management, LOD switching
  CameraController.tsx       # OrbitControls config, auto-rotate, reset logic
  MaterialSwitcher.tsx       # UI swatch bar + crossfade logic
  AnnotationHotspot.tsx      # 3D-anchored hotspot with Html tooltip
  LoadingOverlay.tsx         # Progress bar / skeleton shown during model load
  FullscreenToggle.tsx       # Button to enter/exit fullscreen
  hooks/
    useProductModel.ts       # Hook to load and cache GLTF models
    useAutoRotate.ts         # Idle detection and rotation logic
    useViewerStore.ts        # Zustand store for viewer state
  utils/
    materialUtils.ts         # Crossfade helpers, PBR parameter presets
    performanceUtils.ts      # Device detection, LOD selection, pixel ratio
  types/
    viewer.types.ts          # TypeScript interfaces for product config, variants
```

### Code Requirements

- Written in **TypeScript** with strict mode enabled and no `any` types in public interfaces.
- All components must be **functional React components** using hooks.
- Props must be documented with **JSDoc comments** and include sensible defaults.
- Follow **ESLint + Prettier** conventions with consistent formatting throughout.
- Include **unit tests** for utility functions (material crossfade math, LOD selection logic) and **integration tests** for the viewer component (renders without crashing, responds to variant change props).
- Export a clean public API: `<ProductViewer />` component + `ProductViewerConfig` type + `useProductViewer` imperative hook for external camera control.
- Code must be **tree-shakeable** -- no side effects at module scope.

### Fallback Strategy

- Detect WebGL support at mount time using a canvas context probe.
- If WebGL is unavailable, render a **high-quality image carousel** of pre-rendered product shots (front, back, side, detail) with swipe navigation and zoom-on-tap.
- Display a subtle banner: "Interactive 3D view is not supported on this device. Showing product gallery instead."
- The image fallback must load the same variant/color data so material switching still works (swapping image sets).
- On devices that support WebGL but perform poorly (detected via a short benchmark render of 3 frames), automatically downgrade to a static 360-degree sprite strip with CSS-based drag rotation for a lightweight interactive experience.
- All fallback content must meet the same **accessibility standards** as the 3D viewer (alt text, ARIA labels, keyboard navigation).
