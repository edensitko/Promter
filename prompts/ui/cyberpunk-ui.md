# Cyberpunk UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in cyberpunk and dystopian-future design systems. You draw deep inspiration from Blade Runner, Akira, Ghost in the Shell, and Cyberpunk 2077 --- neon-drenched cityscapes, overloaded data streams, and the tension between high technology and urban decay. You know how to translate the raw visual energy of neon signs bleeding through rain-soaked glass into functional, navigable web interfaces. Your designs feel like hacking into a megacorporation's mainframe while remaining accessible to real human users.

## Task

Design and build a cyberpunk-themed website UI that plunges users into a neon-soaked, data-saturated digital underworld. The interface should layer dark, almost-black backgrounds with aggressive neon accent lighting, glitch artifacts, scanline textures, and terminal-inspired typography to create an atmosphere of illicit technology and digital danger. CRT screen distortion, holographic shimmer, and data-stream animations should reinforce the narrative of a world where information is currency. Despite the visual intensity, the interface must remain readable, navigable, and performant.

## Design Goals

- **Neon-on-void contrast**: The interface should feel like neon signs glowing in total darkness. The background is the void; interface elements are the light source. Every glow, border, and accent should feel self-illuminated against the abyss.
- **Controlled chaos**: Glitch effects, noise overlays, and scanlines add texture and atmosphere, but they must never obscure content or impair interaction. The chaos is aesthetic, not functional.
- **Terminal authenticity**: Monospace typography, blinking cursors, command-line aesthetics, and data-readout patterns should weave through the design, grounding it in a hacker-culture visual language.
- **Layered information density**: The UI should feel data-rich --- status indicators, decorative data streams, grid overlays, and micro-labels that suggest a world of constant surveillance and information overload.
- **Angular aggression**: Forget soft curves. Shapes should be sharp, angular, and geometric --- clipped corners, diagonal slashes, hexagonal motifs, and chevron patterns that evoke military-tech and corporate dystopia.

## UI Requirements

- Deep black backgrounds (`#0a0a0f`, `#0d0221`, `#050510`) as the foundational void, with no visible background color --- only darkness and light.
- Neon-glow borders on all containers using layered `box-shadow` in accent colors (e.g., `0 0 5px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1)`) creating a realistic neon tube diffusion.
- Scanline overlay applied globally via a repeating-linear-gradient pseudo-element (`repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)`) with `pointer-events: none` to simulate a CRT monitor.
- Noise/grain texture overlay using an SVG filter (`feTurbulence`) or a tiling noise PNG at low opacity (3--6%) to add analog grit to the digital surface.
- Glitch effect on hover for headings and interactive elements --- achieved via CSS `clip-path` animation, RGB channel splitting (`text-shadow` with offset red and cyan copies), and brief positional jitter using `@keyframes`.
- Hero section with a full-viewport dark environment, animated data-stream background (vertical falling characters or horizontal scrolling binary), a large neon-glow headline with holographic gradient text, and an angular CTA button.
- Cards styled as terminal windows with a monospace title bar (showing fake path like `> /sys/node_0x7F/`), thin neon-accent top border, dark translucent body (`rgba(10, 10, 15, 0.85)` with `backdrop-filter: blur(4px)`), and clipped corners using `clip-path: polygon()` for an angular silhouette.
- Navigation bar with a HUD-style layout: thin neon border bottom, monospace labels in uppercase with wide letter-spacing, active state indicated by a neon underline glow, and optional decorative corner brackets `[ ]` around the active item.
- Input fields with dark inset backgrounds, neon-accent border that glows brighter on focus, monospace placeholder text styled as command prompts (`> enter_query...`), and a blinking cursor animation.
- Holographic badge/tag components using animated `linear-gradient` with shifting angle for a rainbow-oil-slick shimmer effect.
- Data-stream decorative elements --- columns of randomly scrolling characters (Matrix-style) rendered on a `<canvas>` element behind content sections.
- Animated neon glow pulse on primary buttons: a `@keyframes` loop that subtly intensifies and relaxes the `box-shadow` glow radius every 2--3 seconds.

## Color Palette Guidelines

A pitch-black void illuminated exclusively by neon light. Color is rare, precious, and always glowing.

- **Primary background**: Absolute near-black --- `#0a0a0f` (blue-black void), `#0d0221` (deep purple-black), or `#050510` (pure digital black).
- **Secondary background**: Barely lighter dark tones for elevated surfaces --- `#111125`, `#0f0f2a`, or `rgba(10, 10, 30, 0.9)`.
- **Primary neon accent (Cyan)**: Electric cyan `#00f0ff` --- the dominant neon color for borders, highlights, active states, and primary interactive elements. Glow: `0 0 10px #00f0ff, 0 0 40px rgba(0, 240, 255, 0.3)`.
- **Secondary neon accent (Pink)**: Hot pink `#ff2d95` --- used for secondary actions, warning states, decorative accents, and the red channel in glitch effects. Glow: `0 0 10px #ff2d95, 0 0 40px rgba(255, 45, 149, 0.3)`.
- **Tertiary accent (Green)**: Toxic green `#39ff14` --- reserved for success states, terminal-style text, data readouts, and "system online" indicators. Evokes classic terminal phosphor.
- **Warning accent (Amber)**: Warning amber `#ffb800` --- alerts, caution states, and decorative hazard elements.
- **Text - primary**: Cool white `#e0e8ff` for headings and important content, with optional neon text-shadow.
- **Text - secondary**: Muted steel blue `#5a6a8a` or desaturated cyan `#4a7a8a` for body text and descriptions.
- **Text - terminal**: Toxic green `#39ff14` at reduced opacity (80%) for terminal-style and code-display text.
- **Holographic gradient**: A multi-stop gradient for badges and decorative text --- `linear-gradient(135deg, #00f0ff, #ff2d95, #39ff14, #ffb800, #00f0ff)` animated via `background-position` shift.

## Typography

- **Heading font**: Orbitron, Rajdhani, or Share Tech for primary headings --- angular, geometric, technical fonts that feel machine-generated. Set in uppercase with aggressive letter-spacing (`0.08em` to `0.2em`). Apply neon `text-shadow` glow in the primary accent color.
- **Body font**: Space Grotesk, Exo 2, or IBM Plex Sans at 15px--16px base size with 1.6--1.7 line-height. Weight: light (300) to regular (400) for the sleek, thin cyberpunk aesthetic.
- **Monospace font**: JetBrains Mono, Fira Code, or Share Tech Mono for terminal blocks, data readouts, navigation labels, stat counters, and any text that should feel "system-generated." Base size 13px--15px.
- **Glitch text treatment**: Headings on hover should display a glitch animation --- duplicate the text via `::before` and `::after` pseudo-elements offset by 2--3px in opposing directions, colored in cyan and pink respectively, with `clip-path: inset()` animation cycling rapidly to create a channel-split flicker.
- **Holographic text**: For hero headlines, apply `background: linear-gradient(...)` with the holographic palette, `background-clip: text`, `-webkit-text-fill-color: transparent`, and animate `background-position` for a slow iridescent shift.
- **Weight contrast**: Headings bold (700) to extra-bold (800), body light (300) to regular (400). The contrast between heavy headings and thin body text mirrors the neon-on-void contrast philosophy.

## Technology Suggestions

- **Framework**: Next.js 14+ or React 18+ --- component encapsulation is critical for managing complex layered effects (glow, glitch, scanlines) per element.
- **Styling**: Tailwind CSS extended with custom utilities for neon glow shadows (`shadow-neon-cyan`, `shadow-neon-pink`, `shadow-neon-green`), scanline overlays, and dark background tokens.
- **Animations**: CSS `@keyframes` for looping effects (neon pulse, glitch flicker, scanline drift, data-stream scroll). Framer Motion for scroll-triggered entrance animations (elements "booting up" with a flicker).
- **Canvas effects**: A lightweight `<canvas>` implementation for the Matrix-style data rain background --- use `requestAnimationFrame` with column-based character rendering. Keep it to 30fps max for performance.
- **Glitch library**: Consider `glitch-canvas` or custom CSS-only glitch via pseudo-elements and `clip-path` animation. Avoid JavaScript-driven per-frame glitch on text for performance.
- **Fonts**: Google Fonts (Orbitron, Share Tech Mono, Space Grotesk) with `font-display: swap`, or self-hosted via Fontsource for reliability.
- **Icons**: Custom SVG icons with thin stroke styling, or Phosphor Icons in thin weight. Consider adding a subtle neon glow filter to icon SVGs via CSS `filter: drop-shadow()`.
- **Audio** (optional): A subtle ambient synth hum or keystroke sound on interaction, gated behind a user opt-in toggle. Never autoplay.

## Expected Output

### Component Structure

Generate the following components, each embodying the cyberpunk visual language:

- `CyberNavbar.tsx` --- HUD-style navigation with thin neon border bottom, monospace uppercase link labels with wide letter-spacing, active link indicated by neon underline glow and bracket decorations `[ LINK ]`, logo rendered in holographic gradient text, and a hamburger menu on mobile styled as three neon lines.
- `DataRainBackground.tsx` --- Full-screen `<canvas>` component rendering vertical columns of falling random characters (katakana, ASCII, numbers) in toxic green at varying opacity and speed. Configurable density, speed, character set, and color. Must use `requestAnimationFrame`, run at capped framerate, and set `pointer-events: none`.
- `ScanlineOverlay.tsx` --- A global overlay component using a `::after` pseudo-element with `repeating-linear-gradient` scanlines and optional noise texture. Positioned fixed, full viewport, `pointer-events: none`, `z-index` above content but below modals.
- `CyberHero.tsx` --- Full-viewport section with data-rain background, centered holographic gradient headline with glitch-on-hover effect, monospace subtitle styled as terminal output (`> initializing...`), and an angular CTA button with neon glow pulse animation and clipped corners.
- `GlitchText.tsx` --- Reusable component that wraps any heading text with the glitch hover effect (pseudo-element RGB split, clip-path jitter). Configurable: glitch intensity (subtle/medium/heavy), accent colors, trigger (hover/always/scroll).
- `TerminalCard.tsx` --- Card component styled as a terminal window: monospace title bar with fake file path and colored dots, thin neon top border, dark translucent body, clipped angular corners via `clip-path`, and content area with optional scrolling text effect.
- `NeonButton.tsx` --- Button with dark background, neon border glow, uppercase monospace label, hover state that intensifies glow and adds background fill at 10% accent opacity, active state that briefly flickers, and angular clipped corners. Variants: `primary` (cyan), `danger` (pink), `success` (green).
- `HoloBadge.tsx` --- Small badge/tag component with animated holographic gradient background, dark text, rounded-but-angular shape (small border-radius with one clipped corner), and subtle shimmer animation.
- `CyberInput.tsx` --- Input field with dark inset background, neon border (dim at rest, bright on focus), monospace font, command-prompt-style placeholder (`> enter query...`), blinking cursor via `@keyframes`, and optional prefix label (e.g., `SYS://`).
- `Features.tsx` --- Grid of `TerminalCard` components displaying features with neon-colored icons, technical titles, and body text. Staggered entrance animation simulating "systems coming online."
- `StatsPanel.tsx` --- Horizontal band showing animated numeric counters in large monospace type with neon glow, decorative labels, and thin neon separator lines between stats.
- `Footer.tsx` --- Dark footer with a top neon border gradient (cyan to pink), grid layout, monospace text, muted neon link colors, and a decorative ASCII art or geometric pattern element.

### Code Requirements

- TypeScript with well-defined types for neon color variants (`'cyan' | 'pink' | 'green' | 'amber'`), glitch intensity levels, and component configuration props.
- Tailwind CSS extended config with custom colors (`neon-cyan`, `neon-pink`, `neon-green`, `neon-amber`), custom `boxShadow` utilities for each neon glow tier (subtle, medium, intense), and custom `animation` utilities for pulse, glitch, and flicker.
- CSS custom properties for all neon colors and glow values (`--neon-primary`, `--neon-glow-spread`, `--scanline-opacity`) enabling easy theme swapping (e.g., switch from cyan-primary to green-primary).
- All glitch animations must use only GPU-accelerated properties (`transform`, `opacity`, `clip-path`). Never animate `box-shadow` in high-frequency loops --- use `filter: drop-shadow` or pre-computed keyframes instead.
- The `DataRainBackground` canvas must run on a capped animation loop (30fps), use `will-change: contents` sparingly, and pause entirely when the tab is not visible (`document.hidden` check).
- `ScanlineOverlay` must never intercept pointer events or keyboard focus. Set `pointer-events: none`, `user-select: none`, and `aria-hidden="true"`.
- Respect `prefers-reduced-motion`: disable all glitch animations, pause data rain, stop neon pulse, and reduce scanline opacity to near-zero. Provide a static, clean dark-neon UI as the reduced-motion baseline.
- Ensure all text meets WCAG AA contrast against `#0a0a0f` backgrounds --- cool white `#e0e8ff` on void black passes comfortably, but verify muted secondary text colors.
- Dark mode is the only mode. No light theme toggle. The cyberpunk aesthetic is defined by darkness.
- Responsive: On mobile, simplify data rain to fewer columns, reduce glow intensity to save GPU, stack angular cards vertically, and ensure touch targets are minimum 44x44px despite the angular aesthetic.

### Design Explanation

Accompany the code with an immersive design narrative (4--5 paragraphs) covering:

1. The neon-on-void philosophy --- how the complete absence of ambient light makes every neon glow feel electric and alive, drawing from the visual language of rain-soaked cyberpunk cityscapes where neon signs are the only light source. Explain how the color hierarchy (cyan primary, pink secondary, green terminal, amber warning) creates a functional system within the aesthetic.
2. The glitch and texture layer --- how scanlines, noise grain, and glitch effects add analog imperfection to the digital surface, creating the feeling of accessing a system through degraded or hacked hardware. Why controlled visual corruption enhances rather than hinders the user experience.
3. The terminal and data-density narrative --- how monospace typography, command-prompt patterns, and decorative data streams ground the interface in hacker culture and suggest a world of information overload. How the UI tells a story of navigating through a data underworld.
4. Performance and accessibility strategy --- how heavy visual effects (canvas rendering, layered glow shadows, pseudo-element animations) are optimized for 60fps, how reduced-motion preferences are respected, and how the dark-on-dark palette is carefully calibrated for readability.
5. The emotional architecture --- how cyberpunk UI creates feelings of danger, excitement, and empowerment simultaneously, and why this emotional cocktail is effective for tech products, gaming interfaces, creative portfolios, and any brand that wants to signal cutting-edge rebellion.
