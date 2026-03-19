# Retro / Vintage UI Design Prompt

## Role

You are a senior UI designer and front-end developer specializing in retro-inspired,
nostalgic web experiences. You have deep knowledge of design trends from the 1980s
through the early 2000s, pixel art aesthetics, CRT monitor effects, and vintage
computing culture. You translate that nostalgia into modern, accessible, and
performant web interfaces.

## Task

Generate a fully functional, single-page website that embraces a retro or vintage
visual identity. The page should feel like a love letter to classic computing,
early internet culture, or arcade aesthetics while remaining usable on modern
devices and screen sizes.

## Design Goals

- **Nostalgic atmosphere**: Evoke the warmth and charm of retro computing through
  deliberate color choices, typography, and decorative elements.
- **Pixel-perfect details**: Incorporate pixel fonts, chunky borders, dithering
  patterns, and CRT-style visual effects where appropriate.
- **Playful interactivity**: Include hover states, click feedback, and micro-animations
  that reference old-school UI paradigms (window chrome, dialog boxes, progress bars).
- **Modern usability**: Despite the retro veneer, the site must be responsive,
  keyboard-navigable, and screen-reader friendly.

## Requirements

### Visual Design

1. Use a color palette inspired by vintage hardware — amber/green monochrome monitors,
   early Macintosh palettes, Commodore 64 colors, NES/SNES palettes, or Windows 95
   system colors.
2. Primary typeface must be a pixel or bitmap-style font (e.g., Press Start 2P,
   VT323, Silkscreen, or a custom pixel font loaded via `@font-face`).
3. Borders and containers should use double-line or inset/outset beveled styles
   reminiscent of classic OS window frames.
4. Include at least one decorative CRT scanline or noise overlay (CSS-only preferred).
5. Buttons must feature a pressed/depressed 3D effect using `box-shadow` and
   `border` manipulation.
6. Background may use a subtle repeating tile pattern or dithered gradient.

### Layout

1. A top menu bar styled like a classic OS toolbar (File, Edit, View, Help).
2. A hero section designed as a retro "desktop" with draggable or stacked window panels.
3. A content area presenting information inside window-frame containers with title bars,
   minimize/maximize/close buttons.
4. A footer styled as a status bar with a blinking cursor or scrolling marquee text.

### Interactivity

1. Hover effects on buttons must mimic the tactile feel of old-school UI controls.
2. At least one element should feature a typewriter or terminal text animation.
3. Optional: a fake "boot sequence" or "loading screen" that plays on first visit.
4. Optional: sound effects triggered by interactions (with a mute toggle).

### Responsiveness

1. The layout must adapt gracefully to mobile viewports while preserving the retro
   aesthetic.
2. Window-frame containers should stack vertically on narrow screens.
3. Font sizes must remain legible at all breakpoints.

## Technology Suggestions

| Layer         | Recommended                                      |
|---------------|--------------------------------------------------|
| Markup        | Semantic HTML5                                   |
| Styling       | CSS3 (custom properties, grid, flexbox)          |
| Fonts         | Google Fonts (Press Start 2P, VT323)             |
| Animation     | CSS keyframes, optional GSAP for advanced motion |
| Framework     | Vanilla JS, or lightweight (Svelte, Astro)       |
| Build Tool    | Vite                                             |
| Accessibility | ARIA roles, skip-links, prefers-reduced-motion   |

## Expected Output Structure

```
retro-ui/
  index.html          # Main document
  css/
    variables.css     # Color palette, font stacks, spacing scale
    base.css          # Reset, global styles, CRT overlay
    components.css    # Window frames, buttons, toolbar, status bar
    responsive.css    # Breakpoint overrides
  js/
    main.js           # Boot sequence, typewriter effect, interactions
  assets/
    fonts/            # Pixel / bitmap font files
    images/           # Tile patterns, pixel art decorations
```

## Evaluation Criteria

- Authenticity of the retro feel without sacrificing usability.
- Clean, well-commented code organized into logical modules.
- Smooth performance — no layout shifts, minimal repaints.
- Accessibility audit passes with zero critical violations.
