# 3D Dashboard Prompt

## Role

You are a senior frontend designer and 3D web specialist with deep expertise in data visualization, WebGL-powered charting, geospatial rendering, and executive dashboard UX. You have built real-time analytics platforms for fintech, logistics, and SaaS companies where clarity of insight and visual impact are equally critical. You understand how to translate complex multi-dimensional datasets into intuitive 3D representations that reveal patterns invisible in flat 2D charts, while maintaining readability, accuracy, and performance under continuous data updates.

## Task

Design and build a comprehensive analytics dashboard that incorporates 3D data visualizations as its primary display medium. The dashboard includes an interactive 3D globe showing geospatial data distribution, 3D bar/column charts with animated transitions, a 3D network/topology graph for relationship data, and 3D terrain/surface plots for multi-variable analysis. Each visualization is housed in its own dashboard panel and responds to shared filters (date range, region, category). The dashboard must stream real-time data updates with smooth animated transitions between states, support dark and light themes, and provide drill-down interactivity where clicking a data point reveals detailed breakdowns. The overall aesthetic should feel like a mission control center -- authoritative, data-dense, yet clean and navigable.

## 3D Design Goals

- **Clarity over spectacle**: Every 3D element must communicate data more effectively than a 2D alternative would. Depth, angle, and spatial position must encode meaningful dimensions -- never used purely for decoration.
- **Spatial data encoding**: Use the Z-axis to represent a genuine third data dimension (e.g., time, magnitude, category), with clear axis labels, gridlines, and reference planes so users can accurately read values.
- **Smooth real-time transitions**: When data updates (every 5-10 seconds), chart elements animate to their new positions/heights using spring-based easing over 800ms. No jarring pops or redraws.
- **Interactive exploration**: Users can orbit, zoom, and tilt each 3D visualization independently to find the best viewing angle. Smart default angles are pre-set but fully adjustable.
- **Consistent visual language**: All 3D charts share a unified material palette (frosted glass panels, soft emissive data elements, subtle grid planes) and lighting setup for visual cohesion across the dashboard.
- **Contextual detail on demand**: Hovering a data point reveals a floating tooltip anchored in 3D space. Clicking opens a side panel with a detailed 2D breakdown chart and tabular data.

## Scene Description

The dashboard is laid out in a responsive grid (typically 2x2 or 3-column layout on desktop, single column on mobile). Each panel contains an independent Three.js canvas with its own camera, controls, and scene, unified by shared theme variables.

**Globe Panel (top-left, large)**: A photorealistic Earth globe rendered with a high-resolution day/night texture and atmospheric glow shader. Data points are represented as extruded columns rising from the globe surface at their geographic coordinates, with height encoding magnitude and color encoding category. Arcs connect related locations (e.g., data flow paths) with animated dashed lines that pulse along the arc direction. The globe auto-rotates slowly (0.1 rad/s) and stops on interaction. Country borders are faintly outlined. A 2D mini-map in the corner shows the current viewport region.

**3D Bar Chart Panel (top-right)**: A multi-series 3D bar chart arranged on an X-Z grid plane. The X-axis represents categories, the Z-axis represents time periods, and the Y-axis (height) represents the metric value. Bars are rendered as rounded rectangular prisms with a frosted glass material and an inner emissive glow whose color intensity maps to the value. Grid lines on the floor plane and back walls provide reference. A perspective camera starts at a 30-degree elevated angle. Hovering a bar highlights it (emissive pulse) and displays a tooltip with the exact value, percentage change, and trend arrow.

**Network Graph Panel (bottom-left)**: A force-directed 3D graph where nodes represent entities and edges represent relationships. Nodes are spheres sized by importance (degree centrality) and colored by cluster assignment. Edges are thin tubes with opacity proportional to connection strength. The graph uses a 3D force simulation (adapted from d3-force-3d) with collision detection so nodes do not overlap. Users can drag individual nodes in 3D space, and the graph re-settles. Clicking a node isolates its neighborhood (fades out unconnected nodes) and opens a detail panel. A search bar at the top filters and highlights matching nodes with a pulsing ring.

**Surface Plot Panel (bottom-right)**: A 3D terrain/surface mesh visualizing a bivariate function or heatmap data. The mesh is a subdivided plane where vertex Y-positions encode the value, and a gradient color map (cool-to-warm, configurable) paints the surface. Wireframe overlay can be toggled. Contour lines at regular intervals are drawn on the surface for readability. A clipping plane slider allows the user to slice the surface at a given threshold to focus on peaks or valleys. An orthographic camera option is available alongside the default perspective for technical analysis.

## Interaction Model

- **Per-Panel Controls**: Each panel has independent orbit controls (left-drag to rotate, scroll to zoom, right-drag to pan). A small toolbar in the panel header offers: reset view, toggle projection (perspective/orthographic), toggle wireframe, fullscreen expand, and export as PNG.
- **Shared Filters**: A top-level filter bar with date range picker, region multi-select, and category toggles. Changing a filter triggers a data fetch and all four panels animate to reflect the new dataset simultaneously.
- **Tooltip System**: Hovering a data element in any panel shows a floating card with contextual metrics. The card is rendered as an HTML overlay (`drei Html` component) anchored to the 3D point, with smart positioning to stay within viewport bounds.
- **Drill-Down**: Clicking a data element (globe column, bar, node, surface point) opens a slide-out detail drawer on the right side with 2D charts (line, pie, table) providing granular breakdown of the selected data point.
- **Cross-Panel Highlighting**: Selecting a data entity in one panel highlights the corresponding representation in all other panels (e.g., selecting "USA" on the globe highlights the USA bars in the chart and the USA node in the network graph).
- **Keyboard Navigation**: Tab cycles through panels. Within a focused panel, arrow keys rotate the camera, +/- zoom, and Enter activates the hovered/selected element.

## Technical Requirements

- Each panel must run in its own **WebGL context** (separate `<canvas>` elements) to isolate rendering and allow independent lifecycle management. Evaluate WebGL context limits (typically 8-16 per page) and implement context pooling/virtualization if needed.
- Real-time data must arrive via **WebSocket** or **Server-Sent Events (SSE)**. Implement a data layer that batches incoming updates and dispatches them at a controlled rate (max 2 updates/second per panel) to prevent animation pile-up.
- All 3D geometry should be **instanced** where possible (instanced bars, instanced globe columns, instanced graph nodes) to minimize draw calls. Target under 50 draw calls per panel.
- Implement **Level of Detail** for the globe: high-resolution textures and detailed geometry when zoomed in, simplified when zoomed out. The network graph should cull edge rendering when zoomed out beyond a threshold and only show high-degree nodes.
- The dashboard must support **dark theme** (default, dark background with luminous data elements) and **light theme** (white background with solid-colored data elements). Theme switching must update all 3D materials, backgrounds, grid colors, and UI elements simultaneously via CSS custom properties and a theme context.
- Data formatting (numbers, dates, percentages) must respect the user's **locale** settings.
- The dashboard layout must be **responsive**: on tablet, collapse to a 2x1 or 1-column layout with horizontally scrollable panel tabs. On mobile, show one panel at a time with a bottom tab bar for switching.
- Implement **error boundaries** around each panel so that a crash in one visualization does not bring down the entire dashboard.

## Technology Suggestions

- **Three.js** -- core 3D rendering for all panels
- **React Three Fiber (@react-three/fiber)** -- declarative React integration for Three.js scenes
- **@react-three/drei** -- helpers: `OrbitControls`, `Html`, `Text`, `Line`, `Instances`, `Environment`, `GradientTexture`
- **@react-three/postprocessing** -- bloom for emissive data elements, tone mapping for HDR feel
- **d3-force-3d** -- 3D force simulation for the network graph layout
- **d3-scale / d3-color / d3-format** -- data scaling, color interpolation, and number formatting
- **GSAP** -- complex sequenced animations for data transitions and drill-down camera moves
- **Zustand** -- global state store for filters, active selection, theme, and cross-panel highlighting
- **TanStack Query (React Query)** -- data fetching, caching, and real-time subscription management
- **Tailwind CSS** -- layout, spacing, responsive grid, dark mode utility classes
- **Recharts or Nivo** -- 2D charts inside the detail drawer for drill-down breakdowns
- **date-fns** -- date range manipulation and formatting

## Performance Guidelines

- **Context Budget**: Keep total WebGL contexts at or below 4 (one per panel). If the browser limit is reached, implement a virtualization strategy where off-screen panels release their context and re-initialize when scrolled into view.
- **Draw Call Budget**: Target under 50 draw calls per panel. Use instanced meshes for repetitive geometry (bars, nodes, globe columns). Merge static geometry (grid planes, axis lines) into single buffer geometries.
- **Polygon Budget**: Globe: 50K triangles max (LOD). Bar chart: 1K per bar (rounded box), max 200 bars visible = 200K. Network: 500 nodes x 100 tris + 2000 edges x 20 tris = 90K. Surface: 100x100 grid = 20K. Total across all panels: under 500K triangles.
- **Animation Frame Budget**: Each panel's render loop must complete within 4ms (targeting 60 fps with 4 panels = 16ms total). Use `renderer.info` to monitor. Stagger panel renders across frames if needed using a round-robin scheduler.
- **Data Throttling**: Buffer incoming real-time data and apply updates in batches at a maximum of 2Hz. Use `lerp` to animate from current to target values so intermediate frames are smooth even if data arrives irregularly.
- **Texture Memory**: Globe textures (day + night + specular + bump) should stay under 8 MB total using compressed formats. Chart and graph panels use procedural materials (no textures).
- **Off-Screen Optimization**: Panels not in viewport (Intersection Observer) must pause their render loops entirely and release any transient GPU resources. Resume with a single catch-up frame when scrolled back into view.
- **Code Splitting**: Each panel component should be lazily loaded (`React.lazy`) so the initial bundle contains only the layout shell and filter bar. Panels load their Three.js dependencies on demand.

## Expected Output

### Component Structure

```
Dashboard3D/
  Dashboard3D.tsx              # Main layout: grid, filter bar, theme provider
  FilterBar.tsx                # Date range, region, category filter controls
  PanelWrapper.tsx             # Reusable panel chrome: header, toolbar, error boundary
  DetailDrawer.tsx             # Slide-out drill-down panel with 2D charts and table
  panels/
    GlobePanel/
      GlobePanel.tsx           # Canvas + scene for the 3D globe
      Globe.tsx                # Earth mesh, atmosphere shader, data columns
      GlobeArc.tsx             # Animated arc connections between locations
      GlobeControls.tsx        # Custom orbit controls with auto-rotate
    BarChartPanel/
      BarChartPanel.tsx        # Canvas + scene for the 3D bar chart
      BarGroup.tsx             # Instanced bar geometry with animated heights
      ChartAxes.tsx            # X, Y, Z axis labels, gridlines, reference planes
      BarTooltip.tsx           # Html overlay tooltip for hovered bar
    NetworkPanel/
      NetworkPanel.tsx         # Canvas + scene for the 3D network graph
      GraphSimulation.tsx      # d3-force-3d integration and node positioning
      GraphNode.tsx            # Instanced sphere nodes with selection state
      GraphEdge.tsx            # Instanced tube/line edges with opacity
      NodeSearch.tsx           # Search input with filter and highlight
    SurfacePanel/
      SurfacePanel.tsx         # Canvas + scene for the 3D surface plot
      SurfaceMesh.tsx          # Subdivided plane with vertex displacement
      ContourLines.tsx         # Iso-value contour lines on the surface
      ClippingPlane.tsx        # Interactive threshold slider and clip plane
  hooks/
    useDashboardStore.ts       # Zustand store: filters, theme, selection, cross-highlight
    useRealtimeData.ts         # WebSocket/SSE connection with batched dispatch
    usePanelVisibility.ts      # Intersection Observer for off-screen optimization
    useTheme.ts                # Theme context with 3D material palette mapping
  utils/
    dataTransformers.ts        # Raw data to 3D-ready geometry data mappers
    colorScales.ts             # d3-scale-chromatic wrappers for consistent palettes
    geoUtils.ts                # lat/lon to 3D cartesian coordinate conversion
    exportUtils.ts             # Canvas-to-PNG and data-to-CSV export functions
  types/
    dashboard.types.ts         # TypeScript interfaces for all data models and configs
```

### Code Requirements

- Written in **TypeScript** with strict mode, no implicit `any`, and comprehensive type coverage for all data structures, props, and store slices.
- Each panel must be a **self-contained module** that can be developed, tested, and deployed independently. Panels communicate only through the shared Zustand store.
- Data fetching and transformation must be **completely separated** from rendering logic. Raw API responses are transformed into panel-specific geometry data in dedicated transformer functions.
- All 3D materials and colors must be derived from the **theme configuration** -- no hardcoded hex values in scene code.
- Components must handle **loading**, **error**, and **empty data** states with appropriate UI (skeleton loaders, error messages with retry buttons, empty state illustrations).
- Follow **ESLint + Prettier** conventions with import sorting and no circular dependencies.
- Include **unit tests** for data transformers, geo-math utilities, and color scale functions. Include **integration tests** for filter changes propagating to all panels.
- Provide a **Storybook** setup with individual stories for each panel in isolation, fed by mock data generators.

### Fallback Strategy

- If WebGL is unavailable, the dashboard renders entirely with **2D chart equivalents**: the globe becomes a flat Mercator projection map (SVG with d3-geo), bars become a grouped 2D bar chart (Recharts), the network becomes a flat force-directed SVG graph (d3-force), and the surface becomes a 2D heatmap grid with color encoding.
- If only some WebGL contexts are available (fewer than 4), prioritize the **globe** and **bar chart** in 3D and render the network and surface as 2D SVG fallbacks.
- On mobile devices with limited GPU capability (detected via `renderer.capabilities` check on a probe canvas), **reduce all panels to 2D** by default with an opt-in "Enable 3D" toggle that warns about potential performance impact.
- If the WebSocket connection fails, the dashboard falls back to **polling** the REST API every 30 seconds, with a visible "Live updates paused -- reconnecting..." banner. The retry strategy uses exponential backoff (1s, 2s, 4s, 8s, max 30s).
- Each panel's error boundary catches rendering crashes and displays a **"Visualization unavailable"** message with a reload button, without affecting other panels.
- All data must remain accessible in a **table view** toggle available in every panel, ensuring that even with total visualization failure, users can still read and export the underlying numbers.
