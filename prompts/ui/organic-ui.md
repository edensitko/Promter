# Organic UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in biophilic and nature-inspired design systems. You understand how to translate the warmth of natural materials, the flow of organic shapes, and the calm of earth-tone palettes into digital interfaces that feel grounded, welcoming, and human. Your designs draw from the visual language of handcrafted goods, botanical illustration, natural textures, and architectural spaces that prioritize connection with nature. You reject the cold precision of purely geometric design in favor of warmth, imperfection, and organic flow.

## Task

Design and build a nature-inspired website UI that replaces rigid geometric layouts with flowing organic shapes, warm earth tones, and natural textures. Every straight edge should become a gentle curve, every section divider should flow like a wave or hillside, and every surface should carry the subtle warmth of natural materials --- paper grain, linen weave, or weathered wood. The interface should feel like visiting a beautifully designed eco-lodge or browsing a handcrafted artisan catalog: warm, trustworthy, and deeply human. Despite the organic aesthetic, the interface must be structurally sound, responsive, and accessible.

## Design Goals

- **Natural warmth**: The interface should radiate the warmth of natural materials and earthy colors. Users should feel comforted and grounded, as though the digital experience connects them to the physical, natural world.
- **Organic flow**: Rigid grids and sharp rectangles should give way to flowing curves, blob shapes, and wave-like transitions between sections. The layout should feel like it grew naturally rather than being constructed on a grid.
- **Textural richness**: Surfaces should carry subtle natural textures --- paper grain, linen fiber, soft noise --- that give depth and tactility to flat digital surfaces. The textures should be felt rather than seen, adding warmth without pattern distraction.
- **Botanical accents**: Leaf shapes, botanical line illustrations, and plant-inspired decorative elements should weave through the design as natural embellishments, reinforcing the biophilic theme without overwhelming content.
- **Imperfect precision**: The design should feel handcrafted, not machine-generated. Slightly irregular shapes, hand-drawn-style illustrations, and warm color variation should suggest human touch and artisanal quality.

## UI Requirements

- Warm, layered backgrounds using earth tones: a base of cream (`#fefae0`) or warm off-white (`#faf8f1`), with sections alternating between sage (`#a3b18a` at 10--15% opacity wash), terracotta (`#c1666b` at 5--10% opacity wash), and natural linen (`#f5f0e8`).
- Organic section dividers using SVG `<path>` elements with bezier curves, creating wave shapes, gentle hillside profiles, or flowing organic lines between content sections. Never use straight horizontal lines to separate sections.
- Natural texture overlays --- subtle paper grain, linen weave, or soft noise textures applied as repeating background images or SVG filters at very low opacity (3--8%) to add tactile depth without visual distraction.
- SVG blob shapes as background decorative elements: organic, amoeba-like forms in muted earth tones positioned behind content sections. Generate using `clip-path: path()` or inline SVG with smooth bezier curves.
- Navigation bar with a clean, warm aesthetic: warm background with subtle texture, rounded pill-shaped nav items, active state using sage or forest green fill, and a logo that feels hand-lettered or artisanal.
- Hero section with a large organic blob shape framing the primary content (headline, description, CTA), warm background gradient, and botanical line illustrations as decorative accents. The blob shape should be asymmetric and natural-looking, not a perfect ellipse.
- Content cards with generous border-radius (20px--28px), warm off-white backgrounds, soft warm shadows (`0 4px 20px rgba(45, 80, 22, 0.08)`), subtle paper texture, and optional botanical corner decorations (small leaf or vine SVG in muted green).
- Buttons with rounded pill shapes (border-radius 50px), warm earth-tone fills (forest green for primary, terracotta for secondary), soft hover warmth (subtle brightness increase + slight shadow lift), and a gentle press animation.
- Input fields with rounded borders, warm off-white fill, sage or amber border color, and a focus state that adds a warm green glow ring. Placeholder text in muted warm gray.
- Curved container shapes using `border-radius` with asymmetric values (e.g., `border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%`) for blob-like cards and feature panels that feel organic rather than rectangular.
- Botanical decorative elements --- delicate line-art leaves, branches, and vine illustrations positioned as corner accents, section backgrounds, or divider embellishments. Rendered as SVG in muted earth tones.
- Flowing section transitions: each section should transition to the next via an organic wave or curved divider, with the background color shifting gradually through the warm palette. No abrupt color breaks.

## Color Palette Guidelines

A warm, grounded palette drawn directly from nature --- forest canopy, autumn earth, sun-warmed clay, and morning cream. Every color should feel like it could be found in a natural landscape.

- **Background - primary**: Warm cream `#fefae0` or parchment `#faf8f1` --- the foundation surface, warm and inviting like handmade paper.
- **Background - secondary**: Natural linen `#f5f0e8` or warm sand `#f0e6d3` --- for alternating sections and card backgrounds.
- **Forest green**: Deep forest `#2d5016` or rich olive `#3a5a1c` --- the primary accent color for headings, primary buttons, active states, and key interactive elements. Evokes deep foliage and grounded stability.
- **Sage green**: Soft sage `#a3b18a` --- the secondary green for backgrounds, card accents, borders, and softer interactive states. Calming and versatile.
- **Warm amber**: Honey amber `#d4a373` or golden wheat `#daa520` --- for secondary accents, highlights, warm decorative elements, and call-to-action secondary buttons.
- **Terracotta**: Earthy clay `#c1666b` or rust `#b5574e` --- for accent text, badges, warning states, and warm decorative touches. Grounding and natural.
- **Charcoal**: Warm dark `#3a3a3a` or espresso `#2c2c2c` --- for body text and dark UI elements. Warm-toned rather than blue-black for consistency with the earth palette.
- **Text - primary**: Warm charcoal `#3a3a3a` on light backgrounds, cream `#fefae0` on dark backgrounds.
- **Text - secondary**: Muted olive `#6b7c5e` or warm gray `#7a7567` for supporting content.
- **Shadow color**: Warm-tinted --- `rgba(45, 80, 22, 0.08)` (green-tinted) for card shadows, `rgba(60, 50, 30, 0.06)` for subtle depth. Never cool gray or blue-tinted shadows.
- **Decorative botanicals**: Sage green at 20--40% opacity for leaf illustrations, warm amber at 15--25% for vine accents.

## Typography

- **Heading font**: A warm serif typeface --- Lora, Libre Baskerville, Merriweather, or Playfair Display. Serifs add warmth, tradition, and a handcrafted quality that sans-serifs cannot match. Weight: semibold (600) to bold (700) for headings.
- **Body font**: A clean, readable sans-serif --- DM Sans, Source Sans 3, or Nunito at 16px--17px base size with 1.7--1.8 line-height for generous, comfortable reading. Weight: regular (400) to medium (500).
- **Accent/decorative font** (optional): A handwritten or script font like Caveat, Patrick Hand, or Dancing Script --- used sparingly for pull quotes, decorative labels, or the hero subtitle. Never for body text or navigation.
- **Display sizes**: Warm and confident but not aggressive --- hero headlines at `clamp(2rem, 4.5vw, 3.5rem)` with moderate line-height (1.15--1.25). The serif typeface provides elegance without needing extreme size.
- **Color in typography**: Forest green for headings, warm charcoal for body text, terracotta for accent labels and call-outs. Avoid pure black text --- always warm-tinted.
- **Letter-spacing**: Default to slightly positive tracking on headings (`0.01em`) for a refined, open feel. Body text at default tracking. Never tight or compressed --- the organic theme demands breathing room.

## Technology Suggestions

- **Framework**: Next.js 14+ or React 18+ --- component encapsulation for managing SVG decorative elements, organic shapes, and texture overlays per section.
- **Styling**: Tailwind CSS with custom config: earth-tone color palette tokens, warm shadow utilities (`shadow-warm-sm`, `shadow-warm-md`), custom `borderRadius` tokens for organic shapes, and texture background utilities.
- **SVG shapes**: Inline SVG for wave dividers, blob shapes, and botanical illustrations. Use tools like getwaves.io for wave generators, blobmaker.app for organic blobs, and hand-drawn SVG paths for botanical line art.
- **Textures**: Subtle CSS noise via `background-image: url('data:image/svg+xml,...')` using an inline SVG with `<feTurbulence>` filter, or a lightweight tiling PNG texture (paper grain, linen). Keep file sizes under 5KB for performance.
- **Animations**: CSS transitions for gentle hover effects (300--400ms with ease-out). Framer Motion for scroll-triggered entrance animations --- elements should fade in slowly from below with a natural, unhurried pace. No bounce or spring --- organic motion is smooth and gradual.
- **Botanical SVGs**: Custom hand-drawn-style SVG illustrations for leaf accents, vine corners, and botanical dividers. Style with CSS (stroke color, opacity) for theme consistency.
- **Fonts**: Google Fonts (Lora, DM Sans, Caveat) with `font-display: swap`, or self-hosted via Fontsource.
- **Icons**: Lucide Icons or Heroicons in outline style at 1.5px stroke width. Alternatively, custom hand-drawn-style SVG icons that match the organic aesthetic.

## Expected Output

### Component Structure

Generate the following components, each embodying the organic, nature-inspired design language:

- `OrganicNavbar.tsx` --- Warm navigation bar with subtle paper texture, rounded pill-shaped nav items, active state in sage green, logo in serif display font or hand-lettered SVG, and a gentle leaf-accent decorative element near the logo.
- `WaveDivider.tsx` --- Reusable SVG wave/organic curve section divider component. Configurable: wave style (gentle, rolling, asymmetric), color (accepts any earth tone), height, and flip direction. Positioned between sections to create flowing transitions.
- `OrganicHero.tsx` --- Hero section with warm cream/amber gradient background, a large asymmetric blob shape framing the headline area, botanical line-art decorations, serif display headline, clean sans-serif subtitle, and a rounded pill CTA button in forest green.
- `BlobShape.tsx` --- Reusable decorative organic blob component using `clip-path: path()` or inline SVG, with configurable color, opacity, size, and animation (slow drift/morph). Used as background decoration behind content sections.
- `OrganicCard.tsx` --- Card component with generous border-radius, warm off-white background with paper texture, soft warm-tinted shadow, optional botanical corner accent (leaf SVG), and hover state with gentle lift and shadow expansion. Accepts children.
- `EarthButton.tsx` --- Rounded pill button with earth-tone fills (forest green primary, terracotta secondary, amber outline variant), subtle hover warmth (brightness + shadow), gentle press scale (0.97), and smooth transitions.
- `WarmInput.tsx` --- Input field with rounded borders, warm off-white fill with paper texture, sage border color, focus state with warm green glow ring, and serif-style floating label.
- `Features.tsx` --- Grid of `OrganicCard` components with nature-themed icons (leaf, sun, water droplet), serif titles in forest green, and body text in warm charcoal. Alternating card positions create a non-rigid, organic layout.
- `Testimonials.tsx` --- Quote section with handwritten-style decorative quotation marks (using the accent script font), warm background section with botanical vine decorative borders, and organic blob shapes as background elements.
- `BotanicalAccent.tsx` --- A library of reusable botanical SVG elements (leaf sprigs, vine corners, branch dividers, flower outlines) that can be positioned as decorative accents throughout the page. Configurable: color, opacity, size, rotation.
- `StatsSection.tsx` --- A section displaying key metrics in large serif type with warm amber accents, separated by delicate botanical divider elements rather than rigid lines.
- `Footer.tsx` --- Warm footer with forest green or deep sage background, cream text, organic wave divider at the top, botanical accent decorations, and rounded-pill link groups.

### Code Requirements

- TypeScript with well-defined types for organic shape variants, earth-tone color tokens, and wave divider configurations.
- Tailwind CSS extended with earth-tone color tokens (`forest`, `sage`, `amber`, `terracotta`, `cream`, `linen`), warm shadow utilities, organic border-radius presets (`rounded-organic: '30% 70% 70% 30% / 30% 30% 70% 70%'`), and texture background utilities.
- CSS custom properties for the earth palette (`--color-forest`, `--color-sage`, `--color-amber`, `--color-terracotta`, `--color-cream`) enabling easy theme adjustment.
- SVG wave dividers must be responsive: use `viewBox` and `preserveAspectRatio="none"` with `width: 100%` to ensure waves scale cleanly across all viewport sizes without distortion.
- Texture overlays must be lightweight: use inline SVG `<feTurbulence>` for noise or PNG textures under 5KB. Apply via pseudo-elements with `pointer-events: none` and `opacity: 0.04--0.08`.
- All botanical SVG decorations must be `aria-hidden="true"` and `pointer-events: none` --- they are purely decorative and must not interfere with content or assistive technology.
- Animations should be slow and gentle: entrance animations at 500--800ms with ease-out easing. No bounce, no spring, no overshoot --- organic motion is smooth and gradual, like a leaf settling.
- Respect `prefers-reduced-motion`: disable all entrance animations and decorative drift, present a static but still warm and textured interface.
- Accessibility: The warm earth-tone palette has inherent contrast challenges --- sage green text on cream backgrounds can fail WCAG AA. Use forest green (`#2d5016`) instead of sage for body text. Test all color combinations with a contrast checker.
- Responsive: On mobile, simplify blob shapes, reduce botanical decoration density, adjust wave divider heights, and ensure the organic layout stacks naturally without awkward gaps from the flowing shapes.

### Design Explanation

Accompany the code with a warm, grounded design narrative (4--5 paragraphs) covering:

1. The biophilic design philosophy --- how incorporating natural shapes, earth tones, and organic textures into digital interfaces taps into the human psychological need for connection with nature (biophilia), reducing cognitive stress and creating feelings of warmth and trust.
2. The organic shape language --- how replacing rigid rectangles with flowing waves, blob shapes, and curved dividers creates a layout that feels grown rather than constructed, and why asymmetric organic shapes feel more natural and interesting than perfect geometric forms.
3. The texture and material strategy --- how subtle paper grain, warm shadows, and natural color tinting create the impression of physical materials (handmade paper, linen, clay) in a digital medium, and why this tactile quality increases emotional connection with the interface.
4. Typography as warmth --- how serif headings convey tradition, craftsmanship, and human touch, how the pairing with clean sans-serif body text maintains readability, and how warm-toned text colors reinforce the natural palette.
5. Accessibility and practical considerations --- how the warm, low-contrast earth palette requires careful calibration to meet accessibility standards, how organic shapes respond to responsive breakpoints, and why this aesthetic is ideal for wellness, sustainability, artisanal, food, and lifestyle brands.
