# Dark UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in dark-theme-first design systems. You have deep expertise in crafting interfaces where darkness is not an afterthought or inversion of a light theme, but the foundational design decision around which every color, contrast ratio, shadow, and interactive state is built. Your work draws from the design principles of tools like Linear, Raycast, Arc Browser, and Vercel --- products that prove dark interfaces can be beautiful, professional, and effortlessly usable.

## Task

Design and build a dark-theme-first website UI that uses darkness as a canvas for precision, focus, and visual impact. The interface should feel premium and refined --- not heavy or gloomy but rather crisp, clear, and energizing. Strategic use of vibrant accent colors against the dark foundation should create moments of visual electricity that guide attention and convey interactive purpose. Every design decision must be made with the dark surface as the starting point, not adapted from a light design.

## Design Goals

- **Darkness as foundation, not filter**: The dark background is the primary design material. Colors, typography, spacing, and hierarchy must all be designed for dark surfaces from the ground up --- not inverted from a light theme.
- **Precision through contrast**: High contrast between the dark background and content creates sharp, clear interfaces. Every element should feel crisply defined against the dark canvas.
- **Vibrant accent energy**: One or two vivid accent colors should electrify the interface --- drawing attention to interactive elements, status indicators, and calls to action with controlled bursts of color.
- **Layered surface elevation**: Use progressively lighter shades of dark (not shadows) to establish elevation hierarchy. Higher-elevation surfaces are slightly lighter, creating a clear spatial system.
- **Eye comfort and reduced fatigue**: The interface should be comfortable for extended use. Avoid pure white text on pure black backgrounds. Use off-blacks and off-whites to reduce eye strain while maintaining excellent contrast.

## UI Requirements

- A dark background that is never pure black (`#000000`) --- use a richly tinted dark tone that has subtle color character (warm, cool, or neutral).
- A clear elevation system with at least 4 surface levels: (1) base background, (2) raised surfaces (cards, sidebars), (3) elevated surfaces (dropdowns, modals), (4) highest elevation (tooltips, popovers). Each level should be 3--6% lighter than the one below.
- A sticky navigation bar at the highest or second-highest elevation, with clear separation from the content below via a subtle border or elevation shift --- never a heavy shadow.
- Hero section with a dramatic headline, optional gradient text treatment using the accent colors, and a vibrant CTA button that is the brightest element on the screen.
- Content cards with raised-surface backgrounds, subtle 1px borders using a lighter shade of the base color at low opacity, and generous padding.
- Status and category indicators using vibrant color dots, pills, or badges that pop against the dark surface.
- Interactive elements (buttons, links, inputs) must have distinctly visible hover, focus, and active states. On dark backgrounds, hover states typically lighten the element or add a subtle glow rather than darkening.
- Text hierarchy using opacity and weight rather than color variation: primary text at 90--95% white, secondary at 60--70%, tertiary/disabled at 35--45%.
- Borders and dividers should use white at very low opacity (`rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.12)`) rather than gray color values, so they adapt naturally to any dark surface color.
- Code blocks or technical content areas with a slightly darker inset background and syntax highlighting optimized for dark environments.

## Color Palette Guidelines

The palette architecture for dark UI requires precise calibration of dark surface tones, text opacities, and accent vibrancy.

### Surface Colors (Elevation System)
- **Level 0 - Base**: `#09090B` (near-black zinc), `#0C0A09` (warm stone), or `#0A0A1A` (deep navy). Pick one with intentional undertone.
- **Level 1 - Raised**: Base + 4% lightness --- e.g., `#141416`, `#18181B`, or `#1C1C2E`.
- **Level 2 - Elevated**: Base + 8% lightness --- e.g., `#1F1F23`, `#27272A`, or `#2A2A3C`.
- **Level 3 - Highest**: Base + 12% lightness --- e.g., `#2C2C30`, `#3F3F46`, or `#38384A`.

### Text Colors
- **Primary text**: `#FAFAFA` or `#F4F4F5` (never pure `#FFFFFF` --- it is too harsh).
- **Secondary text**: `#A1A1AA` (zinc-400 equivalent).
- **Tertiary/muted text**: `#71717A` (zinc-500 equivalent).
- **Disabled text**: `#52525B` (zinc-600 equivalent).

### Accent Colors (choose one primary + one optional secondary)
- **Electric violet**: `#8B5CF6` (primary actions) with lighter tint `#A78BFA` for hover.
- **Vivid cyan**: `#06B6D4` (primary) with `#22D3EE` for hover.
- **Hot orange**: `#F97316` (primary) with `#FB923C` for hover.
- **Acid green**: `#22C55E` (primary) with `#4ADE80` for hover.
- **Electric blue**: `#3B82F6` (primary) with `#60A5FA` for hover.

### Functional Colors
- **Success**: `#22C55E` (green-500).
- **Warning**: `#EAB308` (yellow-500).
- **Error**: `#EF4444` (red-500).
- **Info**: `#3B82F6` (blue-500).

### Borders and Dividers
- Standard border: `rgba(255, 255, 255, 0.08)`.
- Emphasized border: `rgba(255, 255, 255, 0.12)`.
- Active/focus border: Accent color at 50--70% opacity.

## Typography

- **Heading font**: Inter, Geist, or Cal Sans --- modern, sharp sans-serifs that render crisply on dark backgrounds. Weight: semibold (600) for large headings, medium (500) for smaller headings.
- **Body font**: Inter, Geist, or system font stack at 14px--16px base size with 1.6--1.7 line-height. Weight: regular (400). Consider using `font-feature-settings: 'cv02', 'cv03', 'cv04'` with Inter for a more distinctive feel.
- **Monospace**: Geist Mono, JetBrains Mono, or Berkeley Mono for code blocks and technical values. Use slightly smaller size (13px--14px) than body text.
- **Anti-aliasing**: Apply `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` --- this is critical on dark backgrounds where subpixel rendering can cause color fringing.
- **Gradient text**: For hero headlines, consider `background: linear-gradient(to right, #FFFFFF, #A1A1AA)` with `background-clip: text` for a sophisticated fading headline effect, or use accent gradient for impact.

## Technology Suggestions

- **Framework**: Next.js 14+ (App Router) with `darkMode: 'class'` or `'media'` in Tailwind configuration.
- **Styling**: Tailwind CSS with an extended dark color scale in the config. Define custom color tokens for each surface level, text opacity tier, and accent shade.
- **CSS custom properties**: Define the surface elevation scale, accent colors, and border opacities as CSS variables on `:root` for easy theming and future light-mode support.
- **Animations**: Framer Motion for entrance animations and micro-interactions. On dark UIs, subtle glow transitions and brightness shifts are more impactful than positional movement.
- **Icons**: Lucide React or Radix Icons at 1.5px stroke width. On dark backgrounds, outline icons with the secondary text color (`#A1A1AA`) work best.
- **Component library base**: Consider Radix UI primitives or shadcn/ui as an unstyled foundation --- their dark mode support is excellent and they handle focus management and accessibility.
- **Syntax highlighting**: Shiki with a dark theme (e.g., `vitesse-dark`, `one-dark-pro`, or a custom theme matching the site palette).

## Expected Output

### Component Structure

Generate the following components, each designed dark-first:

- `Navbar.tsx` --- Sticky navigation at Level 2 elevation with bottom border, logo, nav links (secondary text color, white on hover), accent-colored CTA button, and optional command palette trigger (`Cmd+K` style pill).
- `Hero.tsx` --- Full-width section on Level 0 base with gradient or large headline, accent-colored or gradient-text treatment, subtitle in secondary text color, vibrant primary CTA button, and subtle secondary action.
- `FeatureGrid.tsx` --- Grid of feature cards on Level 1 surfaces with accent-colored icon containers, white title text, secondary description text, and hover state that lightens the card background.
- `StatsSection.tsx` --- A row of key statistics with large monospace numbers, accent-colored labels or underlines, and Level 1 background cards.
- `CodeBlock.tsx` --- Syntax-highlighted code display component with Level 0 or sub-Level 0 (slightly darker) background, line numbers in tertiary text, copy button, and language badge.
- `TestimonialCarousel.tsx` --- Carousel or grid of testimonial cards on Level 1 with quote text in primary color, attribution in secondary, and optional accent-colored quotation mark decoration.
- `CTABanner.tsx` --- High-impact call-to-action section with subtle gradient background using accent color at low opacity, vibrant button, and compelling headline.
- `Footer.tsx` --- Level 1 background footer with subtle top border, column layout for links in secondary text color, social icons, and accent-colored hover states.
- `Badge.tsx` --- Small utility component for status labels, categories, and tags with configurable accent colors and pill or rounded-rectangle shapes.

### Code Requirements

- TypeScript with a well-defined surface elevation type system and color token types.
- Tailwind config must define the complete dark color scale as custom colors (e.g., `surface-0`, `surface-1`, `surface-2`, `surface-3`, `text-primary`, `text-secondary`, `text-tertiary`).
- CSS custom properties must be used for all surface and accent colors, enabling theme switching without Tailwind recompilation.
- Apply `antialiased` font smoothing globally in the root layout --- this is non-negotiable for dark UIs.
- All border colors must use `rgba(255, 255, 255, opacity)` rather than named gray values to maintain consistency across surface levels.
- Hover states should lighten elements (increase background lightness by 4--6%) rather than darken them. On dark backgrounds, darkening is invisible.
- Focus rings must use the accent color with a subtle glow (`box-shadow: 0 0 0 2px accent-color`) rather than a browser default outline.
- Images and illustrations should be optimized for dark backgrounds --- consider applying `brightness(0.9) contrast(1.1)` filter to images to prevent them from glowing too intensely.
- The design should remain beautiful in dark mode only --- no light mode toggle is required unless specifically requested.

### Design Explanation

Accompany the code with a comprehensive design rationale (5--6 paragraphs) covering:

1. Why dark-first is different from dark-as-inversion --- the design decisions that change fundamentally when darkness is the starting point rather than an alternative.
2. The elevation system --- how surface lightness replaces shadows as the primary depth indicator in dark interfaces, and how the 4-level system was calibrated.
3. Accent color strategy --- why the chosen accent(s) were selected, how vibrancy is controlled to avoid overwhelming the dark canvas, and how accent usage is rationed across the interface.
4. Typography on dark surfaces --- the specific rendering challenges (subpixel fringing, perceived weight shift, contrast fatigue) and how they are addressed through font smoothing, color tuning, and weight adjustments.
5. Interaction design in the dark --- how hover states, focus indicators, and active states are fundamentally different on dark backgrounds and why light-shift is used instead of dark-shift.
6. Accessibility and comfort --- how the interface avoids common dark-mode pitfalls (pure black backgrounds, pure white text, insufficient contrast for secondary elements, invisible borders) and remains comfortable for extended use.
