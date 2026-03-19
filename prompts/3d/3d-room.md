# Interactive 3D Room Experience Prompt

## Role

You are a creative developer and 3D experience designer specializing in immersive, navigable 3D environments for the web. You build interactive virtual spaces using Three.js that replace or enhance traditional website navigation — users explore a 3D room, gallery, or abstract space where each object represents a section, project, or piece of content. Your work blurs the line between websites and video games, creating memorable experiences that visitors talk about.

## Task

Create an interactive 3D room or space that serves as the primary navigation and showcase interface for a website. Users explore a stylized environment — clicking objects to view content, navigating between viewpoints, and discovering interactive elements. The room replaces the conventional scroll-based page with a spatial, explorable experience while maintaining a fully accessible fallback for screen readers and non-WebGL browsers.

## Design Goals

- **Spatial storytelling**: The room layout itself tells a story. Object placement, lighting, and visual hierarchy guide users through the content in a deliberate order.
- **Discovery and delight**: Hidden details, subtle animations, and interactive surprises reward exploration. Users should want to click everything and look in every corner.
- **Cinematic quality**: Lighting, shadows, and camera angles should feel like a carefully art-directed 3D render — not a generic scene.
- **Intuitive navigation**: Despite being 3D, navigation must be immediately understandable. Clear visual affordances indicate what is clickable, and camera transitions are smooth and oriented.

## Requirements

### Room Styles (implement at least 2)

1. **Creative Workspace**: A stylized desk/office environment — monitor displaying project screenshots, bookshelf with interactive book spines (each is a section), a desk with interactive objects (phone for contact, notebook for blog, coffee cup as easter egg), window with a dynamic sky scene. Warm, focused lighting with a desk lamp as the primary light source.

2. **Gallery Space**: A modern art gallery with white walls, polished floor, and spotlight lighting. "Artworks" on the walls are project showcases — framed screenshots or videos that expand on click. Sculptures on pedestals represent skills or technologies. Visitors walk through the gallery via point-and-click navigation between viewpoints.

3. **Abstract Space**: A floating, surreal environment — platforms, geometric shapes, and portals suspended in a void or cosmic space. Each platform or portal represents a section of the website. Neon or emissive lighting. Moving between platforms involves dramatic camera transitions. Inspired by Monument Valley, Control, or sci-fi interfaces.

4. **Showroom**: A product showroom or exhibition hall — a large, well-lit space with product displays on pedestals, interactive kiosks, and a large screen or projection for featured content. Visitors orbit around objects of interest. Professional, commercial aesthetic.

### Interactive Objects

- Every meaningful object in the room is interactive. On hover: object highlights with an outline/glow effect and a cursor change to pointer. On click: triggers content display (modal, panel, page transition, or camera move).
- Object categories and their interactions:
  - **Content objects**: Display associated content when clicked (project details, blog post, about info). Content appears as an HTML overlay on top of the 3D scene.
  - **Navigation objects**: Move the camera to a new viewpoint when clicked (e.g., a door moves to the next room, a teleporter moves to a new area).
  - **Easter egg objects**: Small surprises — animations, sound effects, color changes, hidden messages. Reward curious users.
  - **Ambient objects**: Non-interactive decorative elements that add atmosphere (plants, books, light sources). These may have idle animations but don't respond to clicks.
- Object interaction feedback: subtle scale bounce on click, glow pulse on hover, tooltip label on proximity.

### Camera System

- **Preset viewpoints**: The room has 3-8 predefined camera positions (viewpoints) with associated look-at targets. Navigation moves the camera between these viewpoints with smooth interpolation.
- **Camera transitions**: Moving between viewpoints uses a cinematic bezier curve path — the camera doesn't just lerp linearly but follows a visually interesting arc. Transition duration: 1.5-2.5 seconds.
- **Entry sequence**: On first load, the camera executes a dramatic fly-in animation — starting from far away or a bird's-eye view and swooping into the initial viewpoint. This serves as the page loading experience.
- **Orbit at viewpoint**: At each viewpoint, the user can subtly orbit (limited angle, 15-20 degrees) by moving the mouse. This creates a natural look-around feeling without losing orientation.
- **Mobile**: On mobile, viewpoint navigation uses on-screen arrow buttons or swipe gestures. Orbit is driven by device gyroscope or touch drag.

### Lighting and Atmosphere

- Primary light source that creates dramatic shadows (directional or spot light). Shadow mapping enabled with appropriate resolution (1024-2048px shadow map).
- Accent lights (point lights or spot lights) highlighting key interactive objects — drawing the user's attention.
- Ambient light for base visibility — objects in shadow are visible but muted.
- Optional volumetric fog or haze for atmospheric depth. Light rays visible in fog.
- Dynamic time-of-day lighting option — the room subtly shifts between warm (golden hour), neutral (daylight), and cool (nighttime) based on actual local time or a cycle.
- Emissive materials on select objects (screens, neon signs, glowing orbs) provide self-illuminated accents.

### Content Integration

- When a content object is clicked, an HTML overlay panel appears on top of the 3D scene with the associated content (text, images, videos, links).
- The overlay panel slides or fades in from the right side or center, with a close button that returns focus to the 3D scene.
- While the content panel is open, the 3D scene dims slightly and camera movement is paused.
- Content is loaded lazily — only fetched when the associated object is first clicked.
- URL routing: each viewpoint and content object maps to a URL hash or route, enabling deep linking and browser back/forward navigation.

### Performance

- Target 60fps on mid-range hardware. The room should feel responsive, not sluggish.
- Geometry optimization: use low-poly meshes (1,000-5,000 triangles per object). Bake complex details into textures (normal maps, AO maps) rather than geometric complexity.
- Texture optimization: compressed textures (Basis/KTX2), mipmapping, max 1024px for most textures, 2048px only for hero objects.
- Light baking: pre-compute ambient occlusion and indirect lighting into lightmap textures for static objects. Use real-time lighting only for dynamic elements.
- Instanced rendering for repeated objects (books on a shelf, gallery frames).
- Progressive loading: load the room shell and closest objects first, then load distant objects and textures progressively. Show a loading progress indicator during initial load.
- LOD (Level of Detail): switch to simpler meshes for objects far from the camera.
- Frustum culling (built-in with Three.js) ensures off-screen objects are not rendered.
- Pause rendering when tab is hidden.
- Full resource disposal on unmount.

### Integration

```jsx
<Room3D
  style="workspace"          // 'workspace' | 'gallery' | 'abstract' | 'showroom'
  objects={[
    {
      id: 'project-1',
      type: 'content',
      position: [2, 1, -3],
      model: '/models/monitor.glb',
      content: { title: 'Project Alpha', body: '...', image: '/img/project1.png' }
    },
    {
      id: 'about',
      type: 'navigation',
      position: [-1, 0.5, -5],
      model: '/models/door.glb',
      targetViewpoint: 'about-area'
    }
  ]}
  viewpoints={[
    { id: 'home', position: [0, 2, 5], lookAt: [0, 1, 0] },
    { id: 'about-area', position: [-3, 2, -2], lookAt: [-3, 1, -5] }
  ]}
  lighting="warm"            // 'warm' | 'neutral' | 'cool' | 'dynamic'
  entryAnimation={true}
  onObjectClick={(id, data) => {}}
/>
```

- The component is full-viewport by default but can be sized to a container.
- HTML content overlays are rendered outside the canvas in the DOM for accessibility and styling flexibility.

### Accessibility

- **Full HTML fallback**: When WebGL is unavailable or for screen readers, display a standard HTML page with all content accessible via normal navigation. The 3D room is a progressive enhancement, not a requirement.
- Canvas has `aria-hidden="true"`. All content displayed within the 3D room must also exist in the DOM as accessible HTML (hidden visually but available to screen readers).
- Keyboard navigation: Tab through interactive objects (focus moves to each object sequentially, triggering camera move to that object). Enter/Space to activate. Escape to close content panels.
- `prefers-reduced-motion`: skip the entry animation (jump directly to the initial viewpoint), disable camera orbit on mouse move, make transitions instant.
- All interactive objects have accessible labels.

## Technology Suggestions

| Layer          | Recommended                                          |
|----------------|------------------------------------------------------|
| 3D Engine      | Three.js (r160+) or React Three Fiber                |
| Models         | GLTF/GLB format with Draco compression               |
| Textures       | KTX2 / Basis Universal for compressed textures        |
| Lighting       | Three.js DirectionalLight + PointLight + AmbientLight |
| Shadows        | PCF Shadow Maps or VSM Shadow Maps                    |
| Interaction    | Raycaster + custom event system                       |
| Camera         | Custom smooth camera controller (not OrbitControls)   |
| Animation      | Three.js AnimationMixer + GSAP for camera paths       |
| Loading        | GLTFLoader + DRACOLoader + KTX2Loader + LoadingManager|
| Framework      | React / Next.js with TypeScript                       |
| Modeling        | Blender (for creating room assets)                   |

## Expected Output Structure

```
Room3D/
  Room3D.tsx                    # Main React component
  RoomRenderer.ts               # Three.js scene, renderer, resize handling
  camera/
    CameraController.ts         # Custom camera with viewpoints and transitions
    CameraPath.ts               # Bezier curve path generation
    EntryAnimation.ts           # Fly-in loading sequence
  rooms/
    WorkspaceRoom.ts            # Creative workspace scene setup
    GalleryRoom.ts              # Gallery scene setup
    AbstractRoom.ts             # Abstract space scene setup
    ShowroomRoom.ts             # Showroom scene setup
  interaction/
    ObjectManager.ts            # Interactive object registration and events
    Raycaster.ts                # Hover/click detection
    OutlineEffect.ts            # Hover/select outline rendering
    Tooltip.ts                  # 3D-anchored tooltip positioning
  lighting/
    LightingPresets.ts          # Warm/neutral/cool/dynamic lighting configs
    ShadowSetup.ts              # Shadow map configuration
  loading/
    AssetLoader.ts              # Progressive GLTF/texture loading
    LoadingScreen.tsx           # Loading progress UI
  content/
    ContentOverlay.tsx          # HTML content panel overlay
    ContentRouter.ts            # URL hash ↔ viewpoint/content mapping
  RoomFallback.tsx              # Full HTML fallback for non-WebGL
  utils/
    performance.ts              # LOD, quality tiers, frame rate monitor
    keyboard.ts                 # Keyboard navigation handler
```

## Code Requirements

- TypeScript with strict mode. Define interfaces for `RoomConfig`, `InteractiveObject`, `Viewpoint`, `ContentData`, `LightingPreset`.
- The camera controller must be custom-built (not OrbitControls) to support: preset viewpoints, smooth bezier transitions, limited mouse-orbit at each viewpoint, and keyboard control.
- Interactive objects are registered declaratively via a config array — the system handles raycasting, hover effects, and click events automatically.
- Content overlays must be React portals rendered in the DOM, not HTML in the 3D scene, ensuring they are styleable with CSS and accessible to screen readers.
- URL routing must work with both hash-based routing and Next.js App Router.
- Progressive loading must show meaningful progress (percentage or named stages like "Loading room...", "Loading textures...", "Loading details...").
- The HTML fallback must contain ALL content that is accessible in the 3D room — it is the canonical accessible version.
- Models should be external GLB files, not procedural geometry, to enable non-developer asset creation in Blender.
