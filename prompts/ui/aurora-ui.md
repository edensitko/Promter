# Aurora UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in ethereal, atmosphere-driven design systems. You draw inspiration from natural light phenomena --- the Aurora Borealis, bioluminescent oceans, and cosmic nebulae. You understand how to translate the slow, flowing majesty of the Northern Lights into digital interfaces that evoke wonder, serenity, and cosmic scale. Your designs make users feel as though they are gazing into the night sky while interacting with a beautifully functional interface.

## Task

Design and build an aurora-inspired website UI that immerses users in a dreamlike atmosphere of flowing color, soft ambient glow, and celestial depth. The interface should feature deep dark-sky backgrounds animated with curtain-like gradient waves that mimic the Aurora Borealis, complemented by star-field particles, frosted content panels, and gentle pulsing light effects. The result should feel meditative and awe-inspiring --- a digital observatory where content floats serenely against a living sky. Despite the atmospheric richness, navigation must be intuitive, text must be crisp, and performance must be smooth.

## Design Goals

- **Living sky atmosphere**: The background should never feel static. Slow, flowing gradient animations should create the impression of aurora curtains rippling across a polar sky, making the page feel alive even when the user is not interacting.
- **Cosmic depth**: Multiple visual layers --- distant stars, mid-ground aurora gradients, and foreground content panels --- should create a parallax-like sense of depth, as though peering into infinite space.
- **Serene interaction**: Every interaction should feel gentle and unhurried. Hover effects brighten softly, transitions ease slowly, and elements appear with graceful fade-ins. The UI should lower the user's heart rate, not raise it.
- **Ethereal legibility**: Content panels must feel like frosted windows floating in the aurora, providing enough contrast for text readability while allowing the atmospheric background to glow through at the edges.
- **Wonder and discovery**: The interface should reward exploration. Subtle details --- a gentle shimmer on a button, a slow color shift in a heading, a distant star that pulses --- should create moments of delight for attentive users.

## UI Requirements

- Deep dark sky backgrounds (`#0a0e27`, `#0f1729`, `#060d1f`) as the cosmic void, with no pure black --- always a hint of deep blue or indigo to suggest a night sky rather than emptiness.
- Aurora gradient animations created with multiple layered `radial-gradient` or `conic-gradient` elements, each on a separate pseudo-element or div, animated independently with different speeds, directions, and hues. Use `@keyframes` to shift `background-position`, `opacity`, and subtle `scale` transforms to simulate the organic movement of aurora curtains.
- Star-field particle layer using either CSS (hundreds of small `box-shadow` dots on a single element) or a lightweight `<canvas>` implementation with varying star sizes (1--3px), subtle twinkle animation (opacity oscillation), and occasional slow-moving shooting stars.
- Frosted glass content panels with `backdrop-filter: blur(16px--24px)`, semi-transparent backgrounds (`rgba(10, 14, 39, 0.6)` to `rgba(15, 23, 41, 0.75)`), subtle 1px border in `rgba(255, 255, 255, 0.08)`, and a faint luminous edge glow that picks up the aurora colors behind it.
- Navigation bar with frosted glass treatment, navigation links that glow softly on hover with the aurora palette, and an active state indicated by a gentle underline gradient (emerald to teal).
- Hero section featuring the most dramatic aurora animation --- wide, sweeping gradient curtains at peak intensity --- with a large, luminous headline that uses `background-clip: text` with an aurora gradient, floating subtitle, and a softly glowing CTA button.
- Content cards as frosted panels with subtle aurora-colored top or side border accents, gentle hover lift (transform + enhanced glow), and content that fades in on scroll with a slow upward drift.
- Buttons with semi-transparent dark backgrounds, aurora gradient borders, soft glow on hover that expands outward like a light bloom, and a smooth press animation (scale 0.97 with glow contraction).
- Ambient glow spots --- large (300--600px), heavily blurred (`filter: blur(100px--160px)`) aurora-colored orbs positioned absolutely, animated to slowly drift and shift color, creating the impression of light sources behind the content layer.
- Section dividers as subtle horizontal aurora gradient lines (1--2px height, fading at the edges) rather than hard borders.

## Color Palette Guidelines

A deep cosmic darkness illuminated by the soft, flowing hues of the Aurora Borealis. Colors should feel luminous and atmospheric, never harsh or saturated to the point of artificiality.

- **Primary background**: Deep night sky --- `#0a0e27` (ink blue), `#0f1729` (midnight navy), `#060d1f` (abyss blue). Always tinted blue or indigo, never pure black.
- **Aurora green**: Emerald `#00ff87` --- the signature aurora color, used for primary accents, active states, and the dominant hue in the gradient animations.
- **Aurora teal**: Deep teal `#00d4aa` --- a cooler complement to the green, used for secondary accents, link hover states, and gradient transitions.
- **Aurora violet**: Rich violet `#7b2ff7` --- the upper-atmosphere purple of intense aurora displays, used for decorative gradient peaks and tertiary accents.
- **Aurora cyan**: Bright cyan `#00d2ff` --- the electric edge of the aurora, used for focus states, borders, and the brightest gradient highlights.
- **Aurora magenta**: Soft magenta `#c471ed` --- the rare pink-purple of extreme aurora events, used sparingly for gradient peaks and special highlights.
- **Aurora gradient**: The signature multi-stop gradient for backgrounds and text treatments --- `linear-gradient(135deg, #00ff87, #00d4aa, #00d2ff, #7b2ff7, #c471ed)` or as a radial/conic variant for organic shapes.
- **Glass fill**: `rgba(10, 14, 39, 0.55)` to `rgba(15, 23, 41, 0.75)` for frosted content panels.
- **Glass border**: `rgba(255, 255, 255, 0.06)` to `rgba(255, 255, 255, 0.12)` --- ultra-subtle to maintain the ethereal feel.
- **Text - primary**: Soft white `#f0f4ff` with a faint cool tint, for headings and key content.
- **Text - secondary**: Muted silver-blue `#8892b0` or `#7a88a8` for body text and descriptions.
- **Star color**: Warm white `#fffdf5` for star particles, with occasional tinted stars in aurora colors at low opacity.

## Typography

- **Heading font**: Plus Jakarta Sans, Outfit, or Sora --- modern, slightly rounded geometric sans-serifs that feel contemporary and inviting without being playful. Weight: semibold (600) for elegance. Avoid heavy or ultra-bold weights that would clash with the ethereal atmosphere.
- **Body font**: Inter, DM Sans, or the same heading family at 15px--17px base size with 1.7--1.8 line-height for generous, airy reading rhythm. Weight: regular (400) to medium (500).
- **Display treatment**: Hero headlines should use `background-clip: text` with the aurora gradient, creating text that appears lit from within by the aurora. Optionally add a subtle `text-shadow: 0 0 40px rgba(0, 255, 135, 0.3)` for a soft glow halo.
- **Text rendering**: Apply `-webkit-font-smoothing: antialiased` universally. The cool-tinted text on dark backgrounds benefits from subpixel smoothing disabled.
- **Hierarchy**: Size-based hierarchy with generous spacing. Headings should breathe --- `margin-bottom` of 1.5--2x the body line-height. The serene atmosphere demands whitespace.
- **Letter-spacing**: Slightly open letter-spacing on headings (`0.01em` to `0.03em`) for a refined, spaced-out celestial feel. Body text at default tracking.

## Technology Suggestions

- **Framework**: Next.js 14+ or React 18+ --- component isolation is essential for managing independently animated aurora layers, particle systems, and frosted panels.
- **Styling**: Tailwind CSS with extended config for aurora color tokens, custom `backdropBlur` values, glass background utilities, and ambient glow shadow presets.
- **Aurora animation**: CSS `@keyframes` animating `background-position`, `opacity`, and `transform` on layered gradient pseudo-elements. For more organic motion, consider GSAP with sine-easing timelines that create the slow, sinusoidal drift characteristic of real auroras.
- **Star field**: CSS `box-shadow` technique for static stars (a single positioned element with hundreds of `box-shadow` values generated programmatically), plus a lightweight `<canvas>` layer for twinkle animations and occasional shooting stars.
- **Ambient glow**: Absolutely positioned divs with large `border-radius: 50%`, aurora background colors, and `filter: blur(120px--180px)`, animated with CSS or Framer Motion to drift slowly.
- **Scroll animations**: Framer Motion `useScroll` and `useTransform` for parallax depth between star layer, aurora layer, and content layer. Content panels fade in with `whileInView`.
- **Compatibility**: Include `-webkit-backdrop-filter` for Safari. Provide solid semi-opaque backgrounds as fallback for browsers without `backdrop-filter` support.
- **Icons**: Lucide Icons or Phosphor Icons in light weight, with optional aurora-colored `filter: drop-shadow()` on hover.

## Expected Output

### Component Structure

Generate the following components, each contributing to the celestial atmosphere:

- `AuroraBackground.tsx` --- The core atmospheric layer: multiple absolutely positioned gradient elements (3--5 layers) animated independently with different speeds, scales, and hues to simulate aurora curtains. Each layer uses `radial-gradient` or `conic-gradient` with aurora colors, animated via `@keyframes` for organic, sinusoidal motion. Configurable: intensity (subtle/medium/vivid), speed, and dominant hue.
- `StarField.tsx` --- A cosmic background layer rendering hundreds of stars via CSS `box-shadow` on a single pseudo-element, plus an optional `<canvas>` layer for twinkle effects and shooting stars. Configurable: star density, twinkle speed, and shooting star frequency.
- `AuroraNavbar.tsx` --- Frosted glass navigation bar with semi-transparent dark background, aurora gradient active indicator (thin underline or background highlight), soft glow on hover, and a logo with subtle aurora shimmer.
- `AuroraHero.tsx` --- Full-viewport hero with the most vivid aurora animation at peak intensity, a large headline using aurora gradient `background-clip: text`, ethereal subtitle, and a softly pulsing CTA button. Ambient glow orbs positioned behind the text for a halo effect.
- `FrostPanel.tsx` --- Reusable frosted glass content panel with `backdrop-filter: blur()`, configurable opacity and blur intensity, subtle aurora-tinted border, hover state that gently brightens the glow, and smooth entrance animation (fade-up with blur clear). Accepts children.
- `AuroraButton.tsx` --- Button with semi-transparent dark fill, aurora gradient border (visible at 1px, glowing on hover), soft bloom glow effect on hover, gentle press feedback (scale + glow contraction), and text in aurora-tinted white.
- `ShimmerBadge.tsx` --- Small badge component with a slow-moving aurora gradient background, rounded pill shape, and subtle shimmer animation that sweeps across the surface.
- `GlowInput.tsx` --- Input field with dark frosted background, thin aurora-tinted border, focus state that activates a soft aurora glow ring, and clean white text.
- `Features.tsx` --- Grid of `FrostPanel` cards with aurora-colored icons, titles, and descriptions. Each card has a unique aurora accent color (green, teal, violet, cyan). Staggered entrance animation on scroll.
- `Testimonials.tsx` --- Frosted glass quote cards with aurora gradient decorative quotation marks, soft inner glow, and a parallax offset from the aurora background.
- `AuroraDivider.tsx` --- A section divider rendered as a thin (1--2px) horizontal line with an aurora gradient that fades to transparent at both ends, optionally animated with a slow shimmer.
- `Footer.tsx` --- Dark footer with aurora gradient top border, frosted glass treatment at reduced intensity, text links that glow in aurora green on hover, and a subtle star-field background.

### Code Requirements

- TypeScript with well-defined types for aurora intensity (`'subtle' | 'medium' | 'vivid'`), frost levels (`'light' | 'medium' | 'heavy'`), and aurora color variants.
- Tailwind CSS extended with aurora color tokens (`aurora-green`, `aurora-teal`, `aurora-violet`, `aurora-cyan`, `aurora-magenta`), glass backdrop utilities, and ambient glow shadow presets.
- CSS custom properties for all aurora colors (`--aurora-green`, `--aurora-teal`, etc.) and animation speeds (`--aurora-speed`, `--twinkle-speed`) enabling runtime theme adjustments.
- Aurora gradient layers must use `will-change: transform, opacity` and run on the GPU compositor. Avoid animating `background-position` on large elements --- prefer `transform: translateX/Y` on pseudo-elements for smoother performance.
- The `StarField` canvas (if used) must run on a capped animation loop, pause when the tab is hidden, and use `devicePixelRatio` for crisp rendering on retina displays.
- `backdrop-filter` must always be paired with `-webkit-backdrop-filter`. Provide a `@supports` fallback with higher-opacity solid backgrounds for non-supporting browsers.
- Respect `prefers-reduced-motion`: pause all aurora animations, stop star twinkle, freeze ambient glow, and display a static aurora gradient as a serene fallback. The interface should still feel atmospheric without motion.
- All text on frosted panels must meet WCAG AA contrast. Test `#f0f4ff` text against the darkest possible panel state (`rgba(10, 14, 39, 0.75)` over `#0a0e27` background).
- Responsive: On mobile, reduce aurora layers from 5 to 2--3, decrease blur radius for performance, simplify star density, and ensure frosted panels are fully readable on smaller viewports.
- Performance budget: Limit simultaneously animated elements to avoid GPU memory pressure. Use `contain: paint` on aurora layers and `isolation: isolate` on the main content layer.

### Design Explanation

Accompany the code with a contemplative design narrative (4--5 paragraphs) covering:

1. The natural phenomenon as design language --- how the Aurora Borealis provides a uniquely organic motion vocabulary (sinusoidal curtains, slow color transitions, layered depth) that creates an atmosphere impossible to achieve with static gradients. Why nature-inspired animation feels fundamentally different from mechanical UI animation.
2. The depth architecture --- how three visual layers (distant stars, mid-ground aurora, foreground frost panels) create a parallax sense of cosmic depth, making the user feel they are looking into space rather than at a flat screen.
3. The serenity principle --- how every design decision (slow animations, soft glows, generous whitespace, gentle interactions) is calibrated to create a calming emotional response, and why this atmosphere is effective for brands that want to communicate wonder, trust, and sophistication.
4. Frosted glass and readability --- how the frosted panel system balances atmospheric transparency (allowing the aurora to glow through) with content clarity, and the specific calibration of blur, opacity, and border values that achieve this balance.
5. Performance and accessibility --- how multiple animated gradient layers, particle systems, and blur effects are optimized for smooth rendering, how reduced-motion preferences create a graceful static fallback, and why the dark cosmic palette requires careful contrast management.
