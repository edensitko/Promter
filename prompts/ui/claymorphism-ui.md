# Claymorphism UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in claymorphic (3D clay) design systems. You are an expert in crafting interfaces that feel like soft, tactile 3D objects --- as though every button, card, and container were molded from colorful modeling clay or rendered in a playful 3D illustration tool like Blender or Spline. Your designs bridge the gap between whimsical 3D illustration trends and professional, usable web interfaces, creating products that feel friendly, approachable, and delightful without sacrificing clarity or functionality.

## Task

Design and build a claymorphic website UI where every element appears to be a soft, puffy 3D object sitting on a colorful surface. Buttons should look inflated and squeezable, cards should feel like rounded clay tablets with gentle depth, and the overall interface should evoke the satisfying tactility of playing with modeling clay. The design should feel like a modern SaaS product reimagined by a 3D illustrator --- professional enough for a real business, playful enough to make users smile. The challenge is to maintain this 3D illusion purely through CSS while keeping the interface fast, accessible, and responsive.

## Design Goals

- **Soft 3D tangibility**: Every element should feel like it has physical volume and softness. The illusion of depth should come from carefully layered shadows, inner highlights, and subtle gradients that simulate light hitting a rounded surface.
- **Playful professionalism**: The aesthetic is friendly and inviting, like a Nintendo product or a Notion-style SaaS with 3D flair. It should charm without being childish, balancing warmth with clarity.
- **Bouncy interaction feedback**: Micro-animations should reinforce the clay metaphor --- buttons squish on press, cards bounce slightly on hover, toggles slide with elastic easing. The interface should feel physically responsive.
- **Colorful confidence**: The palette should be bold and cheerful with pastel foundations and vibrant accents. Color is a primary tool for hierarchy and emotional tone.
- **Rounded everything**: Sharp corners have no place here. Every element --- from containers to buttons to input fields --- should have generous border-radius (16px--32px) that reinforces the soft, molded aesthetic.

## UI Requirements

- Colorful, solid backgrounds in soft pastels (`#f0f0ff`, `#fef6e8`, `#f0faf4`) or warm light tones rather than white or gray, establishing a friendly, non-clinical canvas.
- Clay-effect elements created with a dual-shadow system: (1) an outer shadow for elevation and depth (`8px 8px 20px rgba(0,0,0,0.12), -4px -4px 12px rgba(255,255,255,0.8)`) and (2) an inner shadow/highlight for the puffy, rounded surface (`inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.06)`). The combination creates the illusion of a soft, inflated 3D object.
- Generous border-radius on all elements: 24px--32px for cards and containers, 16px--20px for buttons and inputs, 50% (full pill) for badges and small tags.
- Subtle surface gradients on cards and buttons --- a very soft linear gradient from slightly lighter at the top to slightly darker at the bottom (e.g., from the base color to 3--5% darker) simulating light hitting the top of a rounded object.
- Thick, rounded borders (2--3px) in a slightly darker shade of the element's background color, reinforcing the molded-edge appearance.
- Hero section with a large clay-style panel containing headline, description, and a prominent puffy CTA button, set against a pastel gradient background with decorative 3D-style floating shapes (circles, rounded rectangles) at various depths.
- Cards that appear to float above the surface with pronounced but soft shadows, generous padding (28px--36px), and a slight hover lift (transform: translateY(-4px)) with shadow expansion for an interactive depth effect.
- Buttons with three interaction states: (1) raised and puffy at rest, (2) slight lift with enhanced shadow on hover, (3) pressed/squished on active (scale 0.95, reduced shadow, inverted inner shadow). All transitions use elastic or spring easing for a bouncy feel.
- Toggle switches with a pill-shaped inset track and an elevated, round sliding knob that casts its own shadow. Active state fills the track with a vibrant accent color.
- Input fields with inset clay styling (recessed appearance via inner shadow), thick rounded borders, generous padding, and a focus state that adds a vibrant border color and subtle outer glow.
- Playful floating decorative elements --- small 3D-style circles, blobs, and rounded shapes at various positions, with soft shadows matching the clay aesthetic, adding depth and whimsy to the layout.
- Navigation bar with a clay-panel appearance: raised off the background with soft shadow, rounded pill-shaped nav items, active item highlighted with a vibrant accent background.

## Color Palette Guidelines

A cheerful, confident palette built on soft pastels with punchy vibrant accents. The palette should feel like a box of premium modeling clay --- each color distinct, harmonious, and inviting.

- **Page background**: Soft pastel base --- lavender mist `#f0f0ff`, warm cream `#fef6e8`, mint foam `#f0faf4`, or soft peach `#fff0eb`. Never pure white (too clinical) or gray (too flat).
- **Card/panel surface**: White or near-white (`#ffffff`, `#fafbff`) for the primary clay surface, providing contrast against the tinted page background.
- **Primary accent**: Vibrant blue `#4f46e5` or cheerful purple `#7c3aed` --- the main interactive color for primary buttons, active states, and key highlights.
- **Secondary accent**: Warm coral `#f97066` or energetic orange `#f59e0b` --- for secondary actions and attention-drawing elements.
- **Success accent**: Fresh green `#22c55e` --- for positive states, success messages, and active toggles.
- **Surface variants**: Soft tinted backgrounds for feature cards --- `#eef2ff` (blue tint), `#fef3c7` (warm tint), `#ecfdf5` (green tint), `#fce7f3` (pink tint) --- each card can have its own clay color.
- **Shadow colors**: Warm-tinted shadows rather than pure black --- `rgba(100, 80, 140, 0.12)` for the main shadow (purple-tinted), `rgba(0, 0, 0, 0.06)` for subtle depth. Light shadow: `rgba(255, 255, 255, 0.7)` to `rgba(255, 255, 255, 0.9)`.
- **Text - primary**: Warm dark charcoal `#1e1b4b` or `#1f2937` --- dark enough for clear readability but softer than pure black.
- **Text - secondary**: Muted purple-gray `#6b7280` or `#64748b` for supporting text and descriptions.
- **Border color**: 8--12% darker than the element's surface color, maintaining the same hue family for a natural molded-edge look.

## Typography

- **Heading font**: Nunito, Plus Jakarta Sans, or Quicksand --- rounded, friendly sans-serifs that complement the soft clay aesthetic. Weight: bold (700) to extra-bold (800) for headings, reinforcing the chunky, tactile feel.
- **Body font**: Inter, DM Sans, or the same heading family at 15px--17px base size with 1.65--1.75 line-height. Weight: regular (400) to medium (500). The body font should be clean and readable, not competing with the playful visual elements.
- **Display sizes**: Large and confident --- hero headlines at `clamp(2.5rem, 5vw, 4rem)` with tight line-height (1.1--1.2). The chunky type reinforces the bold, tactile aesthetic.
- **Color in typography**: Headings can use the primary accent color or dark charcoal. Consider gradient text on the hero headline using the primary-to-secondary accent gradient for extra vibrancy.
- **Hierarchy**: Strong size contrast between heading levels (1.3--1.4 ratio). The playful aesthetic needs clear typographic structure to maintain professionalism.
- **Letter-spacing**: Slightly negative letter-spacing on large headings (`-0.02em`) for a compact, bold feel. Default tracking on body text.

## Technology Suggestions

- **Framework**: Next.js 14+ or React 18+ --- component encapsulation is essential for managing the complex shadow systems and animation states per element.
- **Styling**: Tailwind CSS with an extensively customized config: custom `boxShadow` utilities for clay elevation (`shadow-clay-sm`, `shadow-clay-md`, `shadow-clay-lg`, `shadow-clay-inset`), custom `borderRadius` tokens, and pastel color palette tokens.
- **Animations**: Framer Motion for bouncy interactions using spring physics (`type: "spring", stiffness: 300, damping: 20`). CSS transitions for simpler hover/focus states with `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot easing) for the bouncy feel.
- **Decorative 3D shapes**: CSS-only rounded shapes with the clay shadow system, or lightweight SVG blobs generated with tools like blobmaker.app. Position absolutely with soft shadows for floating decorative elements.
- **CSS custom properties**: Define the clay shadow system as variables (`--clay-shadow-outer`, `--clay-shadow-inner`, `--clay-highlight`) so the entire elevation system can be adjusted from a single source.
- **Icons**: Lucide Icons or Heroicons in solid/filled style at 2px stroke width. Filled icons match the chunky clay aesthetic better than thin outlines. Consider wrapping icons in small clay-style circles with colored backgrounds.

## Expected Output

### Component Structure

Generate the following components, each implementing the claymorphic material system:

- `ClayNavbar.tsx` --- Navigation bar as a raised clay panel floating above the page background, with pill-shaped nav items, active item highlighted with a vibrant accent background and enhanced shadow, logo in bold type, and a clay-style mobile hamburger button.
- `ClayHero.tsx` --- Hero section with a pastel gradient background, a large clay card panel containing the headline, description, and primary CTA button. Decorated with floating clay shapes (circles, rounded squares) at various depths behind and beside the main panel.
- `ClayCard.tsx` --- Reusable card component with configurable elevation (`sm`, `md`, `lg`), surface color, hover lift animation (bouncy spring), and the full dual-shadow system (outer depth + inner highlight). Accepts children for flexible content.
- `ClayButton.tsx` --- Button component with three interaction states (raised/hover-lifted/pressed-squished), configurable variant (`primary`, `secondary`, `outline`, `ghost`), size (`sm`, `md`, `lg`), and spring-physics press animation. The pressed state should use `transform: scale(0.95)` with reduced shadows and increased inner shadow for a satisfying squish.
- `ClayInput.tsx` --- Text input with inset clay styling (recessed via inner shadow), thick rounded border, generous padding, pastel background tint, and focus state with vibrant accent border and soft outer glow.
- `ClayToggle.tsx` --- Toggle switch with a pill-shaped inset track and an elevated round knob. The knob slides with spring easing, the track fills with accent color when active, and the knob casts its own clay shadow.
- `ClayBadge.tsx` --- Small pill badge with a vibrant pastel background, subtle inner highlight, and miniature clay shadow for a puffy tag appearance.
- `Features.tsx` --- Grid of `ClayCard` components, each with a unique pastel tint, a clay-wrapped icon in a colored circle, title, and description. Staggered entrance animation with bouncy spring easing.
- `Pricing.tsx` --- Pricing cards using `ClayCard` at different elevations, with the featured plan elevated higher, using the primary accent color, and an extra-puffy clay shadow to draw attention.
- `Testimonials.tsx` --- Testimonial cards with soft clay styling, avatar images in clay-bordered circles, and a warm pastel background variant.
- `ClayFloatingShapes.tsx` --- A set of decorative floating shapes (circles, blobs, rounded rectangles) positioned absolutely, each with its own clay shadow system, slowly drifting via CSS animation. Used as background decoration.
- `Footer.tsx` --- Footer as a gentle clay panel (lower elevation), with rounded-pill link groups, pastel section backgrounds, and soft top-border shadow.

### Code Requirements

- TypeScript with well-defined types for clay elevation levels (`'sm' | 'md' | 'lg'`), surface color variants, and a `ClayShadowConfig` type mapping elevation to specific shadow values.
- A centralized `clayTheme` configuration object defining: shadow layers (outer dark, outer light, inner highlight, inner shadow), border-radius scale, surface colors, and spring animation parameters.
- Tailwind config must include custom `boxShadow` utilities encoding the full clay shadow system. Example: `'clay-md': '8px 8px 20px rgba(100,80,140,0.12), -4px -4px 12px rgba(255,255,255,0.8), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.06)'`.
- Spring animations via Framer Motion should use consistent physics parameters across all components (`stiffness: 300, damping: 20, mass: 0.8`) for a unified bouncy feel.
- All interactive elements must have smooth transitions (200--300ms) with overshoot easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`) for subtle bounce on CSS-only interactions.
- The shadow system must work on both light and tinted backgrounds --- test clay cards on all pastel background variants to ensure the depth illusion holds.
- Accessibility: The soft, low-contrast aesthetic can challenge accessibility. Ensure all text meets WCAG AA (4.5:1 for body, 3:1 for large headings). Add visible focus rings (3px solid in primary accent) that sit outside the clay shadow system.
- Responsive: On mobile, reduce shadow spread by 30--40% to avoid heavy rendering, scale down border-radius proportionally, and simplify floating decorative shapes.
- Respect `prefers-reduced-motion`: disable spring animations, remove floating shape drift, and use simple opacity transitions instead of bouncy transforms.
- Performance: The multi-layered shadow system is paint-heavy. Use `will-change: transform, box-shadow` on elements that animate, and `contain: layout style` on static clay panels to limit repaint scope.

### Design Explanation

Accompany the code with a warm, approachable design narrative (4--5 paragraphs) covering:

1. The clay material metaphor --- how dual-layered shadows (outer elevation + inner surface highlight) create the illusion of soft, inflated 3D objects purely through CSS, what real-world clay and 3D illustration properties are being simulated, and why this material choice creates an emotionally warm, approachable interface.
2. The color strategy --- how a pastel foundation with vibrant accents creates a cheerful, confident visual identity, why each card can have its own tinted surface color without breaking cohesion, and how the palette balances playfulness with professionalism.
3. The physics of interaction --- how spring-based animations and elastic easing create a tangible, satisfying feeling of squishing and bouncing that reinforces the clay metaphor, and why physical interaction feedback increases user delight and engagement.
4. Accessibility in a soft aesthetic --- the specific challenges claymorphism poses for contrast and element discoverability (low-contrast shadows, pastel backgrounds), and the strategies employed to maintain WCAG compliance without compromising the visual identity.
5. When to use claymorphism --- ideal contexts (SaaS dashboards, landing pages, children's products, creative tools, personal portfolios) versus situations where the playful aesthetic may undermine credibility (legal, medical, finance), and how to calibrate the clay intensity for different audiences.
