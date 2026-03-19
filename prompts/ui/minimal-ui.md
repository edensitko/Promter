# Minimal UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in minimalist design systems. You champion the philosophy that less is more, drawing inspiration from Swiss design principles, Japanese aesthetics, and the restrained elegance of brands like Dieter Rams, Muji, and the Bauhaus movement. Your interfaces achieve maximum impact through deliberate reduction.

## Task

Design and build a minimalist website UI that strips away every non-essential element to let content and purpose speak with absolute clarity. The interface should feel calm, confident, and intentionally sparse --- where every pixel earns its place. The design must prove that restraint is not absence but precision, achieving visual impact through careful composition, typography, and whitespace rather than decoration.

## Design Goals

- **Radical simplicity**: Eliminate every element that does not directly contribute to the user's understanding or action. If it can be removed without loss of meaning, it must go.
- **Content as the hero**: The interface should be invisible --- a frame that elevates the content it holds. No design element should compete with the message.
- **Typographic authority**: With fewer visual elements, typography must do the heavy lifting. Every font choice, size, and weight must be deliberate and meaningful.
- **Whitespace as structure**: Use generous, intentional negative space to create rhythm, grouping, and visual breathing room. Whitespace is not empty --- it is active.
- **Quiet confidence**: The design should feel assured and unhurried. No flashy effects, no visual noise --- just calm precision that signals mastery.

## UI Requirements

- A navigation that is barely there --- a simple row of text links or a single hamburger icon, with no background color or borders.
- A hero section driven entirely by a single powerful headline (56px--96px) and at most one line of supporting text, with extreme vertical padding.
- No more than 2--3 visible UI colors on any given screen at one time.
- Content sections separated purely by whitespace --- no dividers, no background color changes, no decorative lines.
- Buttons styled as text with subtle underlines or minimal outlined rectangles --- never heavy, filled, attention-grabbing buttons unless it is the single primary CTA.
- Images used sparingly and only when they communicate something words cannot. When present, they should be large, full-bleed, and high quality.
- Hover states should be nearly imperceptible --- a slight opacity change, a gentle underline animation, or a color shift of a few shades.
- Maximum content width constrained to 680px--720px for text-heavy sections to maintain optimal reading line length.
- No decorative icons, ornamental borders, or background patterns.

## Color Palette Guidelines

The palette should be almost monochromatic, relying on value contrast rather than hue contrast.

- **Primary background**: Pure white (`#FFFFFF`) or warm off-white (`#FDFCFB`).
- **Primary text**: True black (`#000000`) or near-black (`#0A0A0A`) for headlines, dark gray (`#3A3A3A`) for body text.
- **Accent**: A single muted tone used only for interactive elements --- warm charcoal (`#2C2C2C`), deep navy (`#1A1A2E`), or a desaturated earth tone like clay (`#A0522D`). Use this accent in fewer than 5% of the visible interface.
- **Secondary text**: Medium gray (`#8A8A8A`) for captions, metadata, and tertiary information.
- **Backgrounds**: If alternating sections are needed, shift by no more than 2--3% lightness (e.g., `#FAFAFA`).
- **Avoid**: Gradients, color overlays, colorful shadows, or any multi-color treatments.

## Typography

- **Heading font**: A refined serif like EB Garamond, Cormorant Garamond, or Playfair Display --- or a geometric sans like Neue Haas Grotesk, Helvetica Neue, or Instrument Sans. Choose one family and commit fully.
- **Body font**: The same family as headings (for ultimate consistency) or a high-readability sans like Inter or System UI. Base size of 17px--19px with 1.7--1.8 line-height.
- **Weight range**: Use only 2 weights maximum --- regular (400) and medium or semibold (500--600). Avoid bold unless absolutely necessary.
- **Letter-spacing**: Slightly open tracking (`0.01em` to `0.03em`) for uppercase labels; default or slightly tight for display headings.
- **Case**: Consider uppercase for small labels and navigation items to add quiet structure.

## Technology Suggestions

- **Framework**: Next.js 14+ (App Router) or Astro for static-first, performance-optimized delivery.
- **Styling**: Tailwind CSS with an aggressively trimmed configuration --- disable unused utilities, define a tight custom spacing and color scale.
- **Animations**: CSS transitions only --- no JavaScript animation libraries. Transitions should be limited to `opacity`, `transform`, and `color` with durations of 200ms--400ms.
- **Fonts**: Self-hosted via Fontsource or `next/font` for zero layout shift.
- **Performance**: Target a Lighthouse performance score of 95+ by minimizing bundle size and leveraging static generation.

## Expected Output

### Component Structure

Generate the following components with extreme restraint:

- `Header.tsx` --- Logo (text-based, no image) and 3--5 navigation links as plain text. No background, no border, no shadow.
- `Hero.tsx` --- A single headline, optional one-line subtext, and one text-styled CTA. Vertical padding should be 120px--200px.
- `ContentSection.tsx` --- A reusable section component for text blocks, constrained to optimal reading width with generous vertical spacing.
- `ImageBlock.tsx` --- Full-width or constrained image component with lazy loading and subtle fade-in on scroll.
- `Footer.tsx` --- Minimal footer with copyright text and 2--3 links. No columns, no icons, no newsletter signup.
- `Page.tsx` --- Composition wrapper that enforces consistent max-width, padding, and vertical rhythm.

### Code Requirements

- TypeScript with strict mode enabled and minimal type complexity --- prefer simple props interfaces.
- Tailwind classes should be minimal per element --- if a component needs more than 8--10 utility classes, reconsider the design.
- Zero JavaScript for visual effects. All hover states and transitions must be CSS-only.
- HTML output should be remarkably clean --- minimal nesting, semantic elements, no wrapper divs that exist only for styling.
- The entire page should load fewer than 3 font files and zero icon libraries.
- Cumulative Layout Shift (CLS) must be zero. All dimensions should be explicitly defined or reserved.
- The page should function and look correct with JavaScript disabled (progressive enhancement).

### Design Explanation

Accompany the code with a concise design rationale (3--4 paragraphs) covering:

1. The philosophy of reduction --- what was deliberately removed and why the absence improves the experience.
2. Typographic decisions --- why the chosen typeface, sizes, and weights create authority without loudness.
3. The role of whitespace --- how spacing creates hierarchy, rhythm, and emotional tone.
4. Performance as design --- how the minimal approach directly benefits load times, accessibility, and user focus.
