# Vaporwave UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in vaporwave and synthwave-inspired design systems. You are deeply versed in the visual culture of the 1980s and 1990s --- neon-lit shopping malls, early Macintosh interfaces, VHS aesthetics, Japanese city pop, and the dreamlike nostalgia of consumer capitalism filtered through an ironic, artistic lens. You understand how to channel the vaporwave movement's signature blend of retro-futurism, pastel surrealism, and digital nostalgia into functional, navigable web interfaces that feel like a fever dream of a 1990s internet that never existed.

## Task

Design and build a vaporwave-themed website UI that transports users into a retro-futuristic digital dreamscape. The interface should layer sunset gradients, chrome metallic text, grid perspective floors, VHS distortion effects, and nostalgic UI callback elements (Windows 95 windows, early Mac icons) into a cohesive aesthetic experience. Roman columns and Greek statue motifs should appear as decorative patterns, palm tree silhouettes frame key sections, and the overall color palette should drown in pastel pink, electric purple, and hot teal. Despite the heavy aesthetic commitment, the interface must remain navigable, readable, and responsive across devices.

## Design Goals

- **Nostalgic surrealism**: The interface should feel like a half-remembered dream of 1990s consumer technology --- familiar enough to trigger nostalgia, distorted enough to feel otherworldly. Every visual choice should walk the line between sincere retro homage and ironic reinterpretation.
- **Gradient saturation**: Gradients are the lifeblood of vaporwave. Sunset gradients (pink to orange to purple), chrome gradients (silver to white to silver), and pastel washes should cover every viable surface. The interface should feel drenched in color.
- **Retro-digital texture**: VHS scan lines, pixel art accents, dithering patterns, and early-digital artifacts should add texture and period authenticity without overwhelming content readability.
- **Typography as spectacle**: Display fonts should be dramatic --- chrome-effect serif headlines, pixel bitmap accents, and Japanese decorative text elements should make typography a visual centerpiece rather than a neutral content vessel.
- **Layered anachronism**: Combine visual references from different decades (80s neon, 90s desktop UI, Greek classical elements, Japanese text) into a coherent collage that feels intentionally eclectic rather than chaotic.

## UI Requirements

- Full-viewport hero section with an animated sunset gradient background (pink `#ff71ce` to orange `#ff9770` to purple `#7b2ff7` to deep blue `#0a0a2e`), a chrome-effect headline with metallic `linear-gradient` text treatment, and a perspective grid floor element receding toward a vanishing point at the bottom.
- Perspective grid floor created with CSS `linear-gradient` on a `transform: perspective(500px) rotateX(60deg)` element, using thin lines in neon pink or cyan on a dark or transparent base, fading with a gradient mask at the edges. This grid should appear behind hero content as a signature vaporwave motif.
- VHS scanline effect as a global or section-specific overlay: horizontal `repeating-linear-gradient` at 2--3px intervals with slight opacity variation, plus an optional slow vertical "tracking" animation (a bright horizontal bar that drifts up or down periodically).
- Navigation styled as a retro window title bar --- a colored bar with embossed-style text, optional close/minimize/maximize dots, and a slightly pixelated or bitmap-style font for nav labels.
- Content cards styled as retro OS windows: a colored title bar (gradient fill, dark text, window control dots), a 2--3px raised border with highlight/shadow edges simulating the beveled look of Windows 95/classic Mac OS, and a light or white content area with subtle pixel-grid texture.
- Chrome/metallic text effect for headings: `linear-gradient(180deg, #e8e8e8 0%, #ffffff 25%, #a0a0a0 50%, #ffffff 75%, #c0c0c0 100%)` applied via `background-clip: text`, creating a polished metal reflection appearance. Optionally animate the gradient position on hover for a glinting effect.
- Decorative Greek/Roman elements as SVG patterns or CSS backgrounds --- column silhouettes, bust outlines, or classical arch shapes used as watermarks, section backgrounds, or card decorations at low opacity (5--15%).
- Palm tree silhouettes as decorative elements flanking hero text or section transitions, rendered as SVG in neon pink or dark purple against sunset gradients.
- Japanese text used decoratively (not for content) --- katakana or kanji characters as watermark backgrounds, section labels, or decorative side elements, rendered in neon colors at reduced opacity.
- Sunset gradient stripe patterns --- horizontal bands of varying widths in the sunset palette, used as section dividers, card accents, or decorative backgrounds.
- Buttons styled with beveled 3D borders (highlight top-left, shadow bottom-right) mimicking classic OS button aesthetics, with a gradient fill and a "pressed" active state that inverts the bevel direction.
- At least one section featuring pixel art icons or 8-bit style decorative elements, paying homage to early digital graphics.

## Color Palette Guidelines

A saturated, warm palette dominated by sunset pinks and purples with cool teal and chrome accents. The overall impression should be "tropical sunset viewed through a CRT monitor."

- **Primary gradient (Sunset)**: Hot pink `#ff71ce` to warm orange `#ff9770` to golden peach `#ffd700` --- the signature vaporwave sunset, used for hero backgrounds, section washes, and decorative elements.
- **Secondary gradient (Night)**: Deep purple `#7b2ff7` to midnight blue `#0a0a2e` to black `#0d0d0d` --- the cooler counterpart, used for deeper sections, footer, and contrast areas.
- **Pastel pink**: Soft pink `#ffb8d0` or `#f5c2e7` --- the dominant surface color for cards, badges, and UI backgrounds. The most recognizable vaporwave hue.
- **Pastel purple**: Light lavender `#d0b3ff` or `#c4a7e7` --- secondary surface color and text accent.
- **Electric teal**: Bright teal `#01cdfe` or `#00d4aa` --- for links, active states, and accent borders. The cool counterpoint to the warm pinks.
- **Chrome silver**: Metallic gradient from `#e8e8e8` through `#ffffff` to `#a0a0a0` --- for headline text effects and decorative chrome elements.
- **Retro window colors**: Classic title bar gradients (blue `#0055aa` to light blue `#3399ff` for Windows-style, or gray `#c0c0c0` with colored stripes for Mac-style), beveled border highlights (`#ffffff`) and shadows (`#808080`).
- **Text - primary**: Deep purple-black `#1a0a2e` or dark navy `#0d0d2e` on light backgrounds. White `#ffffff` or soft pink `#ffddee` on dark backgrounds.
- **Text - secondary**: Muted purple `#7a6a9e` on light surfaces, desaturated pink `#c0a0b0` on dark surfaces.
- **Neon accents**: Hot magenta `#ff00ff`, electric blue `#0000ff`, or neon green `#00ff00` --- used extremely sparingly for pixel accents, retro icon outlines, or glowing highlights.

## Typography

- **Display/heading font**: A serif display face with chrome treatment --- Playfair Display, Cormorant Garamond, or Libre Baskerville. Applied with the metallic gradient `background-clip: text` effect. Alternatively, use a retro display font like Press Start 2P or VT323 for a more pixelated aesthetic on secondary headings.
- **Body font**: Space Grotesk, DM Sans, or IBM Plex Sans at 15px--17px base size with 1.6--1.7 line-height. A clean sans-serif to ensure readability amid the heavy visual aesthetic. Weight: regular (400) to medium (500).
- **Pixel/bitmap font**: Press Start 2P, VT323, or Silkscreen for retro UI elements (window title bars, badges, stat displays, navigation labels). Use at small sizes (11px--14px) for authenticity.
- **Japanese decorative text**: Noto Sans JP or M PLUS Rounded 1c for decorative Japanese characters. Used as visual texture only --- never for critical content. Apply at large sizes with low opacity.
- **Chrome text treatment**: Apply `background: linear-gradient(180deg, #e8e8e8 0%, #fff 25%, #a0a0a0 50%, #fff 75%, #c0c0c0 100%)` with `background-clip: text` and `-webkit-text-fill-color: transparent`. Add `text-shadow: 0 2px 4px rgba(0,0,0,0.3)` for depth. Optionally animate `background-position` on hover.
- **Size hierarchy**: Display headlines large and dramatic (`clamp(3rem, 8vw, 6rem)`), body text moderate, pixel-font labels small. The contrast between ornate display type and clean body type creates the aesthetic tension vaporwave thrives on.

## Technology Suggestions

- **Framework**: Next.js 14+ or React 18+ --- component encapsulation for managing the many decorative layers, gradient systems, and retro UI patterns.
- **Styling**: Tailwind CSS with extensive custom config: sunset gradient utilities, chrome text utilities, retro bevel shadow system, and custom color tokens for the vaporwave palette.
- **Animations**: CSS `@keyframes` for gradient cycling, VHS tracking bar drift, and chrome text glint. Framer Motion for scroll-triggered reveals and parallax effects on the perspective grid.
- **Retro window system**: A reusable CSS component system for Windows 95/classic Mac styled containers --- beveled borders, title bars, window control dots --- built as a self-contained design token set.
- **SVG assets**: Custom SVG illustrations for Greek column silhouettes, palm tree outlines, and classical bust watermarks. Inline SVG for styling control (fill, opacity, color animation).
- **Pixel art**: CSS-only pixel art for small decorative elements (using `box-shadow` grids) or imported SVG/PNG pixel sprites for icons.
- **Fonts**: Google Fonts (Playfair Display, Press Start 2P, Space Grotesk, Noto Sans JP) with `font-display: swap`.
- **Audio** (optional): A looped vaporwave/synthwave ambient track with a visible, user-controlled play/pause toggle. Never autoplay.

## Expected Output

### Component Structure

Generate the following components, each channeling the vaporwave visual language:

- `VaporNavbar.tsx` --- Navigation styled as a retro OS window title bar with colored gradient bar, embossed text labels in pixel font, window control dots (red/yellow/green circles), and a mobile menu styled as a retro dropdown window.
- `SunsetHero.tsx` --- Full-viewport hero with an animated sunset gradient background (slow hue cycling), perspective grid floor element receding toward a vanishing point, palm tree SVG silhouettes flanking the edges, a chrome-effect serif headline, subtitle in clean sans-serif, and a beveled retro-style CTA button.
- `PerspectiveGrid.tsx` --- Reusable component rendering the iconic vaporwave perspective grid: CSS `linear-gradient` lines on a `transform: perspective() rotateX()` plane, with configurable line color, spacing, and fade-out mask. Positioned behind content.
- `RetroWindowCard.tsx` --- Card component styled as a retro OS window: colored gradient title bar with window dots and title text in pixel font, beveled 3D border system (highlight top-left edge, shadow bottom-right edge), and a content area with optional pixel-grid texture background.
- `ChromeText.tsx` --- Reusable component that applies the metallic chrome gradient text effect to any heading, with configurable gradient stops, optional hover glint animation, and text-shadow depth.
- `VaporButton.tsx` --- Button with beveled 3D border (raised at rest, pressed on active), gradient fill from the sunset palette, pixel-font label, and a satisfying bevel-inversion animation on click.
- `VHSOverlay.tsx` --- A global or section-level overlay component with horizontal scanlines, optional slow-drifting tracking bar, and subtle color aberration at the edges. All set to `pointer-events: none` and `aria-hidden="true"`.
- `SunsetStripes.tsx` --- Decorative component rendering horizontal bands of varying widths in sunset palette colors, used as section dividers or card accents.
- `Features.tsx` --- Grid of `RetroWindowCard` components displaying features with pixel-art-style icons, titles, and descriptions. Each window card has a different title bar color.
- `Gallery.tsx` --- A section showcasing content in retro window frames, with Greek statue or classical bust SVG watermarks as decorative backgrounds, and Japanese text as subtle side labels.
- `Testimonials.tsx` --- Quote cards with sunset gradient backgrounds, chrome-text pull quotes, and palm-tree decorative accents.
- `Footer.tsx` --- Dark gradient footer (purple to midnight) with the perspective grid as a background element, pixel-font link labels, sunset gradient divider at the top, and Japanese decorative text as a watermark.

### Code Requirements

- TypeScript with well-defined types for retro window variants (`'win95' | 'macClassic' | 'custom'`), gradient presets (`'sunset' | 'night' | 'chrome'`), and bevel intensity levels.
- Tailwind CSS extended with custom gradient utilities (`bg-sunset`, `bg-night`, `bg-chrome-text`), bevel shadow system (`shadow-bevel-raised`, `shadow-bevel-pressed`), and vaporwave color tokens.
- CSS custom properties for the sunset gradient palette (`--vapor-pink`, `--vapor-orange`, `--vapor-purple`, `--vapor-teal`), bevel colors (`--bevel-highlight`, `--bevel-shadow`), and chrome gradient stops.
- The perspective grid must use `transform: perspective() rotateX()` with a CSS gradient mask (`mask-image: linear-gradient(to top, transparent 0%, black 40%)`) to fade naturally at the edges. Use `will-change: transform` and `contain: strict` for GPU compositing.
- Chrome text gradients must include a solid `color` fallback for browsers or assistive technologies that do not render `background-clip: text`. Use `@supports (background-clip: text)` or `@supports (-webkit-background-clip: text)`.
- VHS overlay must be purely decorative: `pointer-events: none`, `user-select: none`, `aria-hidden="true"`, and `z-index` managed to sit above content but below interactive overlays.
- Beveled borders must use the classic technique: `border-top` and `border-left` in highlight color (`#ffffff` or `rgba(255,255,255,0.6)`), `border-bottom` and `border-right` in shadow color (`#808080` or `rgba(0,0,0,0.3)`), with active/pressed state inverting the colors.
- Respect `prefers-reduced-motion`: stop gradient animations, freeze VHS tracking bar, disable chrome glint hover, and present a static but still-colorful vaporwave aesthetic.
- Responsive: On mobile, hide the perspective grid (too GPU-intensive on small devices), simplify palm tree decorations, stack retro window cards vertically, and ensure pixel fonts are legible at small viewport sizes.
- Ensure text readability on gradient backgrounds: all text on sunset gradients must have either a semi-opaque backdrop or sufficient text-shadow to maintain WCAG AA contrast.

### Design Explanation

Accompany the code with a nostalgic, culturally-aware design narrative (4--5 paragraphs) covering:

1. The vaporwave cultural context --- how the aesthetic emerged from internet art, electronic music, and ironic commentary on consumer capitalism, and why its visual language (sunset gradients, Greek statues, Japanese text, retro tech) creates such a potent emotional cocktail of nostalgia, irony, and beauty.
2. The retro-digital material system --- how beveled borders, pixel fonts, and window-frame UI patterns recreate the tactile feel of 1990s operating systems, and why this deliberate anachronism creates a sense of comfort and playful rebellion against modern flat design.
3. The gradient and color strategy --- how the sunset palette (pink-orange-purple) creates the signature vaporwave warmth, how chrome metallic text adds luxury and spectacle, and how the careful balance of warm and cool tones prevents the palette from becoming monotonous.
4. Typography as cultural artifact --- how the mix of serif chrome headlines, clean sans-serif body text, pixel bitmap labels, and decorative Japanese characters creates a typographic collage that mirrors the aesthetic's cultural sampling, and how this hierarchy keeps content readable despite the variety.
5. Performance and accessibility --- how heavy decorative elements (perspective grid, VHS overlay, gradient animations) are optimized for smooth rendering, how the strongly-colored palette requires careful contrast management, and how the retro aesthetic degrades gracefully on modern mobile devices.
