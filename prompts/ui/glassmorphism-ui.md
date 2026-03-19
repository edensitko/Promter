# Glassmorphism UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in glassmorphism design systems. You are an expert in creating layered, translucent interfaces that evoke depth and dimensionality through frosted-glass effects, backdrop blurs, and luminous color interplay. Your designs are inspired by Apple's visionOS, Windows 11 Fluent Design, and modern dashboard interfaces that treat the screen as a window into a three-dimensional space.

## Task

Design and build a glassmorphism-styled website UI that creates a sense of physical depth and material sophistication through translucent panels, layered blur effects, and carefully orchestrated lighting. The interface should feel like looking through layers of frosted glass stacked in space --- each panel revealing hints of what lies behind it while maintaining its own clarity. The result must be visually stunning and luxurious without sacrificing text readability or interaction clarity.

## Design Goals

- **Tangible depth**: The interface should feel three-dimensional. Users should perceive foreground, midground, and background layers, each with distinct levels of translucency and blur.
- **Material elegance**: Every glass panel should feel like a real material --- with consistent light behavior, edge highlights, and subtle inner shadows that suggest physical presence.
- **Luminous atmosphere**: The background should be rich and colorful (gradients, abstract shapes, or imagery) because glassmorphism depends on having something beautiful to see through the glass.
- **Readable above all**: Despite the translucency, all text must be crisp and easily readable. The blur intensity, background opacity, and text contrast must be carefully calibrated.
- **Cohesive layering system**: Establish a clear system for glass layers --- primary panels, secondary panels, and elevated elements --- each with defined blur, opacity, and border values.

## UI Requirements

- A vibrant, animated gradient background or abstract mesh gradient that provides the colorful foundation visible through all glass layers.
- Glass navigation bar with `backdrop-filter: blur(20px)`, semi-transparent white or dark background (`rgba(255, 255, 255, 0.15)` for light or `rgba(255, 255, 255, 0.08)` for dark), subtle 1px white/light border at `0.2` opacity, and a faint top-edge highlight.
- Hero section with a large glass panel containing the headline, supporting text, and CTA --- floating over the gradient background with visible depth separation.
- Content cards built as glass panels with consistent border-radius (16px--24px), inner shadow for depth, and a thin luminous border that catches the background light.
- At least 3 distinct glass layer levels: (1) background elements at high blur and low opacity, (2) primary content panels at medium blur and moderate opacity, (3) elevated elements like modals or tooltips at lower blur and higher opacity.
- Hover states that subtly increase panel brightness or border luminosity, as if light is shifting across the glass surface.
- Floating decorative elements --- soft, colorful gradient orbs or blurred shapes --- positioned behind glass panels to enhance the sense of depth and provide color variation.
- Input fields and form elements styled as inner-glass (inset) elements with subtle inner shadows and semi-transparent backgrounds.
- Shadow system using layered, colored shadows rather than plain black --- shadows should pick up ambient color from the background.

## Color Palette Guidelines

Glassmorphism requires a rich, colorful environment. The palette defines both the background atmosphere and the glass material properties.

- **Background gradient**: A multi-stop gradient using saturated, harmonious colors --- e.g., deep violet (`#4A00E0`) to ocean blue (`#2196F3`) to teal (`#00BFA5`), or warm sunset tones from coral (`#FF6B6B`) to gold (`#FFD93D`) to rose (`#C850C0`).
- **Glass fill (light variant)**: `rgba(255, 255, 255, 0.12)` to `rgba(255, 255, 255, 0.25)` depending on layer depth.
- **Glass fill (dark variant)**: `rgba(0, 0, 0, 0.20)` to `rgba(0, 0, 0, 0.40)` for dark-theme glass panels.
- **Glass border**: `rgba(255, 255, 255, 0.18)` to `rgba(255, 255, 255, 0.35)` --- a thin (1px) border that simulates light catching the glass edge.
- **Text on glass (light)**: White (`#FFFFFF`) for headings, off-white (`#F0F0F0`) for body, with optional subtle text-shadow for legibility.
- **Text on glass (dark)**: Dark charcoal (`#1A1A2E`) for headings on lighter glass panels.
- **Accent color**: One vibrant color pulled from the background gradient --- used for buttons, active states, and highlights.
- **Floating orbs**: Large (200px--500px), heavily blurred (`filter: blur(80px--120px)`) gradient circles in 2--3 colors from the palette, positioned absolutely behind content.

## Typography

- **Heading font**: SF Pro Display, Inter, or Poppins --- clean, geometric sans-serifs that remain sharp against translucent backgrounds. Weight: semibold (600) to bold (700).
- **Body font**: Inter, SF Pro Text, or DM Sans at 15px--17px base size with 1.6--1.7 line-height. Weight: regular (400) to medium (500).
- **Text rendering**: Apply `-webkit-font-smoothing: antialiased` and consider a faint `text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1)` on light glass to ensure text pops from the translucent background.
- **Contrast safety**: Always test text readability against the worst-case background scenario (where the glass overlaps the lightest part of the gradient). Ensure a minimum contrast ratio of 4.5:1.
- **Hierarchy**: Use size and weight contrast aggressively --- the translucent environment can flatten hierarchy, so typographic differentiation must be strong.

## Technology Suggestions

- **Framework**: Next.js 14+ or React 18+ --- glassmorphism benefits from component encapsulation where each glass panel manages its own blur and opacity.
- **Styling**: Tailwind CSS with custom utilities for `backdrop-filter`, glass fills, and layered shadow systems. Extend the config with custom `backdropBlur`, `backgroundColor` opacity tokens, and border-opacity utilities.
- **Animations**: Framer Motion for parallax-style floating effects on decorative orbs, smooth panel entrance animations, and hover-triggered brightness shifts.
- **Background**: CSS gradient meshes via `conic-gradient` or `radial-gradient` layering, or an SVG/Canvas-based mesh gradient for more organic shapes.
- **Compatibility**: Include `-webkit-backdrop-filter` for Safari support. Provide a solid semi-transparent fallback for browsers that do not support `backdrop-filter`.
- **Icons**: Phosphor Icons or Lucide in regular weight --- outline style works best against glass since filled icons can look heavy.

## Expected Output

### Component Structure

Generate the following components, each implementing the glassmorphism material system:

- `GlassNavbar.tsx` --- Sticky navigation with frosted-glass background, luminous border, logo, nav links, and a glass-styled CTA button. Must transition smoothly from fully transparent to glass-blurred on scroll.
- `GradientBackground.tsx` --- The atmospheric background layer with animated multi-color gradient, floating decorative orbs, and configurable color scheme.
- `Hero.tsx` --- A large glass panel floating over the gradient background containing headline, description, and CTA. Should include subtle entrance animation (fade-up with blur clear).
- `GlassCard.tsx` --- Reusable card component with configurable glass intensity (light/medium/heavy), border luminosity, inner shadow, and hover brightening effect. Accepts children for flexible content.
- `Features.tsx` --- Grid of `GlassCard` components showcasing features with icons, titles, and descriptions.
- `Pricing.tsx` --- Pricing table using glass panels at different elevation levels (recommended plan at a higher, brighter glass tier).
- `GlassInput.tsx` --- Form input component styled as an inset glass element with subtle inner shadow, translucent fill, and focus glow in the accent color.
- `Footer.tsx` --- Wide glass panel footer with navigation columns, social links, and subtle top-border highlight.

### Code Requirements

- TypeScript with a well-defined `GlassVariant` type system (e.g., `'light' | 'medium' | 'heavy'`) that maps to specific blur, opacity, and border values.
- A centralized glass style configuration object or Tailwind plugin that defines the glass tiers so styles are consistent and maintainable.
- `backdrop-filter` must always be paired with a `-webkit-backdrop-filter` declaration for cross-browser compatibility.
- Provide a CSS `@supports` fallback for environments without `backdrop-filter` support --- fall back to a higher-opacity solid background.
- Floating orb elements must use `will-change: transform` and `pointer-events: none` to ensure they are GPU-composited and do not interfere with interactions.
- All glass panels must maintain text readability when the page is scrolled and the background behind the glass changes. Test against all gradient regions.
- Performance: Limit the number of overlapping `backdrop-filter` elements visible simultaneously to avoid GPU memory issues. Use `contain: paint` where appropriate.
- Responsive behavior: On mobile, reduce blur intensity and increase background opacity slightly to maintain readability on smaller screens with less powerful GPUs.

### Design Explanation

Accompany the code with a detailed design rationale (4--5 paragraphs) covering:

1. The material system --- how different glass tiers were defined, what real-world glass properties they simulate, and how they create spatial hierarchy.
2. Background and atmosphere --- why the chosen gradient colors and floating orbs create the right foundation for the glass effect, and how they enhance rather than distract.
3. Readability strategy --- the specific techniques used to ensure text remains crisp and accessible despite the translucent, shifting backgrounds.
4. Cross-browser and performance approach --- how `backdrop-filter` limitations are handled, what fallbacks are provided, and how rendering performance is maintained.
5. The emotional impact --- how glassmorphism creates a premium, futuristic, and tactile feel, and why that serves the brand and user experience.
