# Art Deco UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in Art Deco-inspired luxury design systems. You are steeped in the visual language of the 1920s and 1930s --- the geometric grandeur of the Chrysler Building, the opulent interiors of Gatsby-era ballrooms, the gilded symmetry of Art Deco posters, and the bold confidence of machine-age ornamentation. You understand how to translate the rich materiality of gold leaf, polished brass, dark marble, and etched glass into digital interfaces that feel luxurious, authoritative, and timeless. Your designs command attention through geometric precision, metallic shimmer, and the restrained use of ornament.

## Task

Design and build an Art Deco-inspired website UI that exudes luxury, geometric elegance, and gilded sophistication. The interface should feature deep, rich dark backgrounds accented with gold and brass metallic elements, geometric patterns (chevrons, sunbursts, fan shapes, stepped forms), symmetrical layouts with strong vertical emphasis, and ornate decorative borders that frame content with architectural precision. Every element should feel like it belongs in a grand 1920s hotel lobby --- simultaneously opulent and disciplined, decorative and functional. Despite the ornamental richness, the interface must remain navigable, readable, and responsive across devices.

## Design Goals

- **Geometric opulence**: The defining principle of Art Deco is geometry elevated to luxury. Chevrons, sunbursts, stepped forms, fan shapes, and diamond motifs should appear throughout the design as structural and decorative elements, creating a sense of mathematical elegance.
- **Metallic materiality**: Gold, brass, and bronze should be the primary accent materials, rendered through CSS gradients that simulate metallic surfaces. The interface should feel gilded --- as though real gold leaf has been applied to every accent element.
- **Symmetrical grandeur**: Layouts should favor strong symmetry and vertical emphasis, evoking the tall, imposing facades of Art Deco architecture. Center-aligned content, flanking decorative elements, and mirrored ornamental borders reinforce this architectural discipline.
- **Dark luxury**: Deep, rich dark backgrounds (navy, black, charcoal) provide the canvas that makes gold accents glow. The dark-to-gold contrast creates the premium, exclusive feeling central to the Art Deco aesthetic.
- **Restrained ornament**: Decorative elements should be precise and architectural, never fussy or cluttered. Every ornamental line, border, and pattern should feel deliberately placed, like the etched metalwork of a luxury elevator door.

## UI Requirements

- Deep, rich dark backgrounds: midnight navy (`#0a1628`), pure black (`#0d0d0d`), dark charcoal (`#1a1a2e`), or deep walnut (`#1c1410`). The background should feel like polished dark marble or lacquered wood.
- Gold/brass metallic accent system using CSS `linear-gradient` to simulate metallic surfaces: `linear-gradient(135deg, #b8860b 0%, #d4af37 25%, #ffd700 50%, #d4af37 75%, #b8860b 100%)` for gold, or `linear-gradient(135deg, #8b6914 0%, #c5a572 40%, #e8d5a3 60%, #c5a572 80%, #8b6914 100%)` for a more muted brass. Apply to borders, text, decorative lines, and accent elements.
- Geometric pattern backgrounds: SVG or CSS-generated patterns of chevrons, diamonds, fan shapes, or stepped zigzag lines in gold at low opacity (5--12%) used as section backgrounds or card decorations. Patterns should be precise and repeating, evoking Art Deco textile and architectural motifs.
- Sunburst motif --- the signature Art Deco radiating line pattern --- used as a hero background element, section accent, or decorative frame. Create with CSS `conic-gradient` (alternating gold and transparent segments) or inline SVG with radiating `<line>` or `<path>` elements.
- Thin gold line decorations: 1--2px lines in gold/brass color used extensively as dividers, frame borders, and structural elements. These architectural lines define the geometric discipline of the layout.
- Navigation bar with strong horizontal gold line borders (top and bottom), symmetrically spaced navigation links in uppercase serif type with wide letter-spacing, active state indicated by a gold underline or background highlight, and optional geometric ornament at center or flanks.
- Hero section with a dramatic sunburst background pattern, a large serif headline with gold gradient text treatment, symmetrically flanking decorative elements (stepped lines, fan shapes, or diamond motifs), and a gold-bordered CTA button with metallic shimmer on hover.
- Content cards with thin gold borders (1--2px), dark backgrounds, geometric corner ornaments (L-shaped gold brackets, diamond corner accents, or stepped corner details), and strong internal symmetry.
- Buttons with gold border outlines on dark fill, uppercase serif labels with wide letter-spacing, hover state that fills with gold gradient and switches text to dark, and an optional metallic shimmer animation on hover.
- Ornate section dividers: decorative horizontal rules using geometric Art Deco motifs --- a central diamond or chevron with extending horizontal lines, fan-shaped ornaments, or stepped zigzag patterns. Created as SVG or pure CSS.
- Fan-shaped decorative elements: semicircular shapes with radiating line divisions (like a hand fan or seashell), rendered in gold at low opacity as background accents or card decorations.
- Strong vertical proportions: sections should feel tall and imposing, with generous vertical padding (80px--120px), centered content with moderate max-width (700px--900px for text), and tall, narrow card proportions where appropriate.

## Color Palette Guidelines

A dark, luxurious palette illuminated by gold and brass metallics. The palette should evoke the interior of a grand 1920s hotel --- dark polished surfaces reflecting golden light.

- **Primary background**: Deep navy `#0a1628`, pure black `#0d0d0d`, or dark charcoal `#1a1a2e`. Rich and deep, never flat gray.
- **Secondary background**: Slightly lighter for elevated surfaces --- `#141e30`, `#1f1f3a`, or `#201a14` (warm dark brown).
- **Gold (primary accent)**: Bright gold `#d4af37` as the core accent color for text, borders, and interactive elements. This is the signature Art Deco luxury hue.
- **Gold gradient (metallic)**: `linear-gradient(135deg, #b8860b 0%, #d4af37 25%, #ffd700 50%, #d4af37 75%, #b8860b 100%)` --- simulates a polished gold surface with light variation. Use for headline text, borders, and decorative elements.
- **Brass (warm metal)**: Muted brass `#c5a572` --- a softer, warmer metallic for secondary accents, supporting borders, and body-level metallic touches.
- **Bronze (deep metal)**: Dark bronze `#8b6914` --- for shadow tones in metallic gradients and low-priority decorative elements.
- **Cream/ivory**: Warm light `#f5e6c8` or `#ede0c8` --- for body text on dark backgrounds and light surface variants if needed.
- **Text - primary**: Gold `#d4af37` or cream `#f5e6c8` for headings and important content on dark backgrounds.
- **Text - secondary**: Muted gold `#a09060` or warm gray `#8a8070` for body text and descriptions.
- **Text - on gold**: Dark navy `#0a1628` or black `#0d0d0d` for text on gold-filled buttons or gold backgrounds.
- **Pattern fill**: Gold at 6--12% opacity (`rgba(212, 175, 55, 0.08)`) for geometric pattern backgrounds --- visible enough to add texture, subtle enough to not distract from content.

## Typography

- **Heading font**: A high-contrast serif display face --- Playfair Display, Cormorant Garamond, Bodoni Moda, or Cinzel. These fonts echo the elegant, high-contrast serif typography of actual Art Deco posters and signage. Weight: bold (700) to extra-bold (800). Set in uppercase with generous letter-spacing (`0.08em` to `0.15em`) for architectural authority.
- **Body font**: A refined sans-serif --- Raleway, Montserrat, or Jost at 15px--17px base size with 1.7--1.8 line-height. These geometric sans-serifs have Art Deco DNA in their design lineage. Weight: regular (400) to medium (500).
- **Gold text treatment**: Apply the gold metallic gradient via `background-clip: text` and `-webkit-text-fill-color: transparent` for headlines. Add `text-shadow: 0 2px 4px rgba(0,0,0,0.5)` for depth against dark backgrounds.
- **Uppercase authority**: All headings, navigation labels, and button text should be uppercase. Art Deco typography is inherently uppercase --- the geometric letterforms gain power from uniform height.
- **Letter-spacing**: Wide letter-spacing is essential for the Art Deco feel. Headings at `0.1em` to `0.15em`, nav labels at `0.12em` to `0.2em`, body text at `0.02em` to `0.04em`.
- **Size hierarchy**: Dramatic size contrast --- display headlines at `clamp(2.5rem, 6vw, 5rem)`, subheadings significantly smaller, body text moderate. The hierarchy should feel architectural, like the progression from a building's facade to its interior detail.

## Technology Suggestions

- **Framework**: Next.js 14+ or React 18+ --- component encapsulation for managing geometric pattern systems, metallic gradient tokens, and ornamental SVG elements.
- **Styling**: Tailwind CSS with custom config: gold gradient utilities (`text-gold-gradient`, `border-gold`, `bg-gold-shimmer`), geometric border-decoration utilities, dark background tokens, and pattern background utilities.
- **SVG patterns**: Inline SVG for geometric patterns (chevrons, diamonds, fan shapes, sunbursts) used as repeating backgrounds via `<pattern>` elements or CSS `background-image: url('data:image/svg+xml,...')`. Ensure patterns are crisp at all resolutions.
- **Metallic effects**: CSS `linear-gradient` for all metallic surfaces. Use `@property` (CSS Houdini) for animating gradient angles on hover to create a shimmer/glint effect. Provide a static gradient fallback for browsers without `@property` support.
- **Ornamental dividers**: Custom SVG dividers with Art Deco motifs (central diamond with radiating lines, stepped chevron patterns, fan ornaments). Build as reusable React components with configurable width, color, and complexity.
- **Animations**: Minimal and elegant --- subtle gold shimmer on hover (gradient position shift), smooth opacity transitions for entrance effects, and gentle scale on buttons. Art Deco favors stillness and poise over movement.
- **Fonts**: Google Fonts (Playfair Display, Cinzel, Raleway, Montserrat) with `font-display: swap`, or self-hosted for reliability.
- **Icons**: Custom SVG icons with geometric Art Deco styling --- simple, angular, symmetrical forms. Alternatively, Lucide Icons in regular weight with gold coloring.

## Expected Output

### Component Structure

Generate the following components, each embodying the Art Deco design language:

- `DecoNavbar.tsx` --- Symmetrical navigation with thin gold line borders (top and bottom), uppercase serif nav labels with wide letter-spacing, gold underline active indicator, centered gold logo/monogram, and optional flanking geometric ornaments (diamond or chevron shapes).
- `SunburstHero.tsx` --- Full-viewport hero with a sunburst pattern background (radiating gold lines from a central vanishing point), dark gradient overlay for text readability, large gold-gradient serif headline in uppercase, geometric flanking decorations (stepped lines or fan shapes), and a gold-bordered CTA button.
- `DecoCard.tsx` --- Reusable card component with dark background, thin gold border (1--2px), geometric corner ornaments (configurable: L-brackets, diamond corners, stepped corners, or none), generous vertical padding, and hover state that subtly brightens the gold border.
- `GoldButton.tsx` --- Button with dark fill and gold border at rest, uppercase serif label with wide letter-spacing, hover state that fills with gold gradient and switches text to dark navy, optional metallic shimmer animation, and a pressed state that deepens the gold tone.
- `GeometricPattern.tsx` --- Reusable background pattern component generating Art Deco geometric patterns (chevrons, diamonds, fan grids, stepped zigzags) in gold at configurable opacity. Renders as SVG pattern or CSS background. Configurable: pattern type, color, opacity, scale.
- `OrnamentDivider.tsx` --- Decorative horizontal divider with Art Deco motifs: a central ornament (diamond, chevron, fan, or sunburst miniature) connected to extending horizontal gold lines on both sides. Configurable: ornament style, width, and gold tone.
- `FanShape.tsx` --- A decorative semicircular fan component with radiating line divisions, rendered in gold at configurable opacity and size. Used as background accents, card decorations, or section embellishments.
- `GoldText.tsx` --- Reusable component that applies the metallic gold gradient text effect to any heading, with fallback solid gold color and configurable gradient intensity.
- `Features.tsx` --- Grid of `DecoCard` components with gold-colored geometric icons, uppercase serif titles, and body descriptions. Cards arranged in a symmetrical layout with consistent vertical emphasis.
- `StatsSection.tsx` --- A dramatic stats display with large gold-gradient numbers in serif type, thin gold separator lines between stats, and a geometric pattern background.
- `Testimonials.tsx` --- Elegant quote cards with gold ornamental quotation marks, thin gold borders, geometric corner accents, and italic serif pull-quote text.
- `Footer.tsx` --- Dark footer with gold ornamental divider at the top, symmetrical column layout, uppercase serif section headings, gold link colors, and a bottom geometric pattern band.

### Code Requirements

- TypeScript with well-defined types for geometric pattern variants (`'chevron' | 'diamond' | 'fan' | 'sunburst' | 'zigzag'`), corner ornament styles, and gold gradient configurations.
- Tailwind CSS extended with gold color tokens (`gold-light: #ffd700`, `gold: #d4af37`, `gold-dark: #b8860b`, `brass: #c5a572`, `bronze: #8b6914`), metallic gradient utilities, and geometric border utilities.
- CSS custom properties for the gold system (`--gold-primary`, `--gold-gradient`, `--gold-border-opacity`, `--pattern-opacity`) enabling theme-wide adjustment of metallic intensity.
- Gold gradient text must include a solid `color: #d4af37` fallback for browsers or contexts that do not render `background-clip: text`. Use `@supports` for progressive enhancement.
- SVG patterns must use `viewBox` for resolution independence and render crisply at all screen densities. Test on retina displays to ensure thin gold lines (1px) remain sharp.
- Metallic shimmer animation (gradient position shift) should use `@property` for smooth gradient interpolation where supported, with a static gradient fallback.
- All ornamental SVG elements must be `aria-hidden="true"` and `pointer-events: none` --- purely decorative.
- Respect `prefers-reduced-motion`: disable shimmer animations, stop any pattern animation, and present a static but still luxurious gold-on-dark interface.
- Accessibility: Gold text on dark navy backgrounds must meet WCAG AA contrast (4.5:1 for body text). Bright gold `#d4af37` on `#0a1628` achieves approximately 7.5:1, which passes. However, muted gold/brass tones must be tested carefully --- `#c5a572` on `#0a1628` is approximately 5.2:1 (passes AA for body) but `#a09060` may not. Verify all combinations.
- Responsive: On mobile, simplify geometric patterns, reduce ornamental corner details to simpler variants, maintain symmetry in single-column layout, and ensure gold text remains legible at smaller sizes.

### Design Explanation

Accompany the code with an authoritative, culturally-grounded design narrative (4--5 paragraphs) covering:

1. The Art Deco design philosophy --- how the movement's fusion of geometric precision, industrial optimism, and decorative luxury translates into digital interfaces. Why the combination of strict symmetry and ornamental richness creates a visual language of authority and sophistication that remains powerful a century after its origin.
2. The metallic material system --- how CSS gradients simulate the material properties of gold, brass, and bronze, creating the illusion of gilded surfaces on screen. The specific gradient engineering that makes metallic text and borders feel three-dimensional and light-reactive.
3. The geometric pattern language --- how chevrons, sunbursts, fan shapes, and diamond motifs serve as both structural and decorative elements, creating visual rhythm and architectural order. Why these specific geometric forms define Art Deco and how they are implemented as scalable, responsive SVG systems.
4. Typography as architecture --- how uppercase high-contrast serifs with wide letter-spacing create the monumental, authoritative typographic voice of Art Deco, and how the serif/sans-serif pairing (display/body) balances grandeur with readability.
5. Dark luxury and accessibility --- how the deep navy/black backgrounds create the rich, exclusive atmosphere that makes gold accents feel precious and luminous, and how this high-contrast palette (gold on dark) actually supports accessibility while maintaining the premium aesthetic.
